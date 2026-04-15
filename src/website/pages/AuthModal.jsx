import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaPhoneAlt,
} from "react-icons/fa";
import {
  registerUser,
  loginUser,
  forgotPassword,
} from "../services/authService";
import { saveUserTokens } from "../utils/userAuthStorage";

function AuthModal({ isOpen, onClose, message = "" }) {
  const [view, setView] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= LOGIN STATE =================
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // ================= SIGNUP STATE =================
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
  });

  // ================= RESET STATE =================
  const [resetEmail, setResetEmail] = useState("");

  // ================= FEEDBACK =================
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  // ================= LOGIN =================
  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (!loginData.username || !loginData.password) {
        setError("Please fill all login fields.");
        return;
      }

      const res = await loginUser(loginData);

      // if backend returns access + refresh
      saveUserTokens(res.access, res.refresh);

      // save username for navbar
      localStorage.setItem("username", res.username || loginData.username);
      
      setSuccess("Login successful!");
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= REGISTER =================
  const handleSignup = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (
        !signupData.username ||
        !signupData.email ||
        !signupData.phone ||
        !signupData.password ||
        !signupData.repeatPassword
      ) {
        setError("Please fill all registration fields.");
        return;
      }

      if (signupData.password !== signupData.repeatPassword) {
        setError("Passwords do not match.");
        return;
      }

      await registerUser({
        username: signupData.username,
        email: signupData.email,
        phone: signupData.phone,
        password: signupData.password,
      });

      setSuccess("Registration successful! Please login now.");
      setView("login");

      setSignupData({
        username: "",
        email: "",
        phone: "",
        password: "",
        repeatPassword: "",
      });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= FORGOT PASSWORD =================
  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (!resetEmail) {
        setError("Please enter your email.");
        return;
      }

      const res = await forgotPassword({ email: resetEmail });

      setSuccess(res.message || "Reset link sent to your email.");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "Failed to send reset email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
        
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 60 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-7 border border-white/20"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-black text-lg"
          >
            ✕
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">
              {view === "login"
                ? "Welcome Back 👋"
                : view === "signup"
                ? "Create Account 🚀"
                : "Reset Password 🔐"}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {view === "login"
                ? "Login to continue exploring properties"
                : view === "signup"
                ? "Join us and find your dream home"
                : "We’ll send you a reset link"}
            </p>
          </div>

          {/* External Message */}
          {message && (
            <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
              {message}
            </div>
          )}

          {/* Error / Success */}
          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-600 text-sm p-3 rounded-lg mb-4 text-center">
              {success}
            </div>
          )}

          {/* ================= LOGIN ================= */}
          {view === "login" && (
            <>
              <div className="relative mb-4">
                <FaUser className="absolute top-4 left-3 text-gray-400" />
                <input
                  placeholder="Username"
                  value={loginData.username}
                  onChange={(e) =>
                    setLoginData({ ...loginData, username: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              <div className="relative mb-4">
                <FaLock className="absolute top-4 left-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
                <span
                  className="absolute top-4 right-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="flex justify-between text-sm mb-5">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember
                </label>

                <button
                  onClick={() => {
                    setError("");
                    setSuccess("");
                    setView("reset");
                  }}
                  className="text-[#c89b6d] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="text-sm mt-5 text-center">
                Don’t have an account?{" "}
                <span
                  onClick={() => {
                    setError("");
                    setSuccess("");
                    setView("signup");
                  }}
                  className="text-[#c89b6d] cursor-pointer font-medium"
                >
                  Register
                </span>
              </p>
            </>
          )}

          {/* ================= SIGNUP ================= */}
          {view === "signup" && (
            <>
              <div className="relative mb-3">
                <FaUser className="absolute top-4 left-3 text-gray-400" />
                <input
                  placeholder="Username"
                  value={signupData.username}
                  onChange={(e) =>
                    setSignupData({ ...signupData, username: e.target.value })
                  }
                  className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              <div className="relative mb-3">
                <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
                <input
                  placeholder="Email"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              <div className="relative mb-3">
                <FaPhoneAlt className="absolute top-4 left-3 text-gray-400" />
                <input
                  placeholder="Phone"
                  value={signupData.phone}
                  onChange={(e) =>
                    setSignupData({ ...signupData, phone: e.target.value })
                  }
                  className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              <div className="relative mb-3">
                <FaLock className="absolute top-4 left-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              <div className="relative mb-4">
                <FaLock className="absolute top-4 left-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="Repeat Password"
                  value={signupData.repeatPassword}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      repeatPassword: e.target.value,
                    })
                  }
                  className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>

              <p className="text-sm mt-5 text-center">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setError("");
                    setSuccess("");
                    setView("login");
                  }}
                  className="text-[#c89b6d] cursor-pointer font-medium"
                >
                  Login
                </span>
              </p>
            </>
          )}

          {/* ================= RESET ================= */}
          {view === "reset" && (
            <>
              <div className="relative mb-4">
                <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
                <input
                  placeholder="Email Address"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              <button
                onClick={handleForgotPassword}
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <p
                onClick={() => {
                  setError("");
                  setSuccess("");
                  setView("login");
                }}
                className="text-sm mt-5 text-center text-[#c89b6d] cursor-pointer"
              >
                Back to Login
              </p>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default AuthModal;