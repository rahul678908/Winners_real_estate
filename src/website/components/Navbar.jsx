import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaArrowRight, FaPlusCircle, FaUserCircle } from "react-icons/fa";
import AuthModal from "../pages/AuthModal";
import PropertySubmitModal from "./PropertySubmitModal";
import logo from "../../assets/winner_logo-1.png";
import { logoutUser, getUsername, getUserAccessToken } from "../utils/userAuthStorage";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [open, setOpen] = useState(false); // auth modal
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Keep YOUR original route names exactly as they are
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Buy Properties", path: "/buy-properties" },
    { name: "Categories", path: "/categories" },
    { name: "Our Projects", path: "/projects" },
    { name: "Contact Us", path: "/contact" },
  ];

  // Function to load auth state from localStorage
  const loadAuthState = () => {
    const token = getUserAccessToken();
    const storedUsername = getUsername();

    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  };

  useEffect(() => {
    // Load auth state on component mount
    loadAuthState();

    // Listen for storage changes (useful for multi-tab sync)
    const handleStorageChange = (e) => {
      if (e.key === "user_access_token" || e.key === "username") {
        loadAuthState();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setUsername("");
    setMenuOpen(false);
    navigate("/");
    window.location.reload();
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `relative text-white font-semibold text-[15px] lg:text-[16px] tracking-wide after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#c89b6d] after:transition-all after:duration-300 ${
      isActive(path)
        ? "after:w-full text-[#f5d2b1]"
        : "after:w-0 hover:after:w-full"
    }`;

  const mobileLinkClass = (path) =>
    `block text-lg font-medium py-4 border-b border-white/10 transition ${
      isActive(path) ? "text-[#c89b6d]" : "text-white hover:text-[#c89b6d]"
    }`;

  return (
    <>
      {/* NAVBAR */}
      <header className="w-full h-22 md:h-24 bg-black/40 backdrop-blur-md fixed top-0 left-0 z-50 border-b border-white/10">
        <div className="max-w-8xl mx-auto flex items-center justify-between px-4 md:px-6 h-full">
          
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Winner Homes Logo"
              className="w-40 sm:w-52 md:w-64 object-contain"
            />
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((item, index) => (
              <Link key={index} to={item.path} className={linkClass(item.path)}>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Desktop Auth Section */}
            {!isLoggedIn ? (
              <button
                onClick={() => setOpen(true)}
                className="hidden md:block cursor-pointer text-white font-medium hover:text-[#f5d2b1] transition"
              >
                Login / Register
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 text-white font-medium bg-white/10 px-4 py-2 rounded-full">
                  <FaUserCircle className="text-[#c89b6d]" />
                  <span className="max-w-[120px] truncate">{username}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-white border border-white/20 px-4 py-2 rounded-full font-medium hover:bg-white/10 transition"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Desktop Add Property */}
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    setOpen(true); // login modal
                  } else {
                    setPropertyModalOpen(true);
                  }
                }}
                className="hidden md:flex bg-white text-black px-5 py-2.5 rounded-full items-center gap-2 font-semibold"
              >
                Add Property
              </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-white text-3xl"
              aria-label="Open menu"
            >
              <HiMenuAlt3 />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* MOBILE MENU PANEL */}
      <aside
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#111] z-[70] shadow-2xl transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <img
            src={logo}
            alt="Winner Homes Logo"
            className="w-28 object-contain"
          />

          <button
            onClick={() => setMenuOpen(false)}
            className="text-white text-3xl"
            aria-label="Close menu"
          >
            <HiX />
          </button>
        </div>

        {/* Mobile Links */}
        <div className="px-6 py-6 flex flex-col">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={mobileLinkClass(item.path)}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile Auth Section */}
          <div className="mt-8 space-y-4">
            {!isLoggedIn ? (
              <button
                onClick={() => {
                  setOpen(true);
                  setMenuOpen(false);
                }}
                className="w-full border border-white/20 text-white py-3 rounded-xl font-medium hover:bg-white/10 transition"
              >
                Login / Register
              </button>
            ) : (
              <>
                <div className="w-full border border-white/10 text-white py-3 px-4 rounded-xl font-medium bg-white/5 flex items-center gap-3">
                  <FaUserCircle className="text-[#c89b6d] text-lg" />
                  <span className="truncate">{username}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full border border-red-400/30 text-red-300 py-3 rounded-xl font-medium hover:bg-red-500/10 transition"
                >
                  Logout
                </button>
              </>
            )}

            <button onClick={() => {
              if (!isLoggedIn) {
                setOpen(true);
                setMenuOpen(false);
              } else {
                setPropertyModalOpen(true);
                setMenuOpen(false);
              }
            }}
             className="w-full bg-white text-black py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#f5d2b1] transition shadow-md">
              <FaPlusCircle size={14} />
              Add Property
              <FaArrowRight size={11} />
            </button>
          </div>
        </div>
      </aside>

      {/* AUTH MODAL */}
      <AuthModal isOpen={open} onClose={() => setOpen(false)} />

      {/* PROPERTY SUBMIT MODAL */}
      <PropertySubmitModal isOpen={propertyModalOpen} onClose={() => setPropertyModalOpen(false)} />
    </>
  );
}

export default Navbar;