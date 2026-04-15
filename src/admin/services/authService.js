import AdminApi from "./api";
import {
  saveAdminTokens,
  clearAdminTokens,
} from "../../website/utils/userAuthStorage";

// ================= LOGIN =================
export const loginAdmin = async (data) => {
  try {
    const response = await AdminApi.post("login/", {
      username: data.email, // backend expects username
      password: data.password,
    });

    const resData = response.data;

    // ✅ Save admin tokens properly
    saveAdminTokens(
      resData.access || resData.access_token,
      resData.refresh || resData.refresh_token
    );

    // Optional: save username
    localStorage.setItem("admin_username", resData.username || data.email);

    return resData;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// ================= LOGOUT =================
export const logoutAdmin = async () => {
  try {
    await AdminApi.post("logout/");
  } catch (error) {
    console.log("Logout error", error);
  } finally {
    clearAdminTokens();
    localStorage.removeItem("admin_username");
  }
};

// ================= GET DASHBOARD =================
export const getDashboard = async () => {
  const response = await AdminApi.get("dashboard/");
  return response.data;
};

// ================= GET USERS =================
export const getUsers = async () => {
  const response = await AdminApi.get("users/");
  return response.data;
};