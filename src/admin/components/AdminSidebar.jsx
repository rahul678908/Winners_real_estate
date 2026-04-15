import {
  LayoutDashboard,
  Globe,
  Building2,
  Tags,
  ShieldCheck,
  Users,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../services/authService";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAdmin();
    navigate("/admin/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Website Management",
      path: "/admin/website-management",
      icon: <Globe size={20} />,
    },
    {
      name: "Properties Management",
      path: "/admin/properties-management",
      icon: <Building2 size={20} />,
    },
    {
      name: "Categories Management",
      path: "/admin/categories-management",
      icon: <Tags size={20} />,
    },
    {
      name: "Roles & Permissions",
      path: "/admin/roles-permissions",
      icon: <ShieldCheck size={20} />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users size={20} />,
    },
  ];

  return (
    <div className="w-72 h-screen bg-slate-900 text-white flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-wide">Admin Panel</h1>
        <p className="text-sm text-slate-400 mt-1">Real Estate Management</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                isActive
                  ? "bg-white text-slate-900 shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition-all duration-300 font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}