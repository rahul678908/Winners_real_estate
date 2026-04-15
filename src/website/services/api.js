import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.72:8002/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("user_access_token");

    const url = config.url || "";

    // ✅ Auth routes where token should NOT be sent
    const isAuthRoute =
      url.includes("login/") ||
      url.includes("register/") ||
      url.includes("forgot") ||
      url.includes("reset");

    // ✅ Public routes where token should NOT be sent
    const isPublicRoute = url.includes("/public/") || url.includes("public/");

    if (userToken && !isAuthRoute && !isPublicRoute) {
      config.headers.Authorization = `Bearer ${userToken}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;