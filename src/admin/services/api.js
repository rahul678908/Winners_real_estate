// import axios from "axios";

// const AdminApi = axios.create({
//   baseURL: "http://192.168.1.53:8000/api/",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// // Request interceptor
// AdminApi.interceptors.request.use(
//   (config) => {
//     const adminToken = localStorage.getItem("admin_access_token");

//     const isAdminAuthRoute =
//       config.url.includes("login/") ||
//       config.url.includes("forgot") ||
//       config.url.includes("reset");

//     if (adminToken && !isAdminAuthRoute) {
//       config.headers.Authorization = `Bearer ${adminToken}`;
//     } else {
//       delete config.headers.Authorization;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default AdminApi;



import axios from "axios";

const AdminApi = axios.create({
  baseURL: "http://192.168.1.53:8000/api/",
  headers: {
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

    // If sending FormData, remove JSON content type
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default AdminApi;