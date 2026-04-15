import api from "./api";
import AdminApi from "../../admin/services/api";

// ================= USER =================
export const registerUser = async (data) => {
  const response = await api.post("register/", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("user-login/", data);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await api.post("forgot-password/", data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post("reset-password/", data);
  return response.data;
};

// ================= ADMIN =================
export const loginAdmin = async (data) => {
  const response = await AdminApi.post("admin/login/", data);
  return response.data;
};