import axios from "axios";

const AdminApi = axios.create({
  baseURL: "http://192.168.1.72:8002/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
AdminApi.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("admin_access_token");

    const isAdminAuthRoute =
      config.url.includes("login/") ||
      config.url.includes("forgot") ||
      config.url.includes("reset");

    if (adminToken && !isAdminAuthRoute) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default AdminApi;