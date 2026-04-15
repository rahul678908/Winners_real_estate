import api from "./api";

// GET all admin users
export const getUsers = async () => {
  const response = await api.get("admin-users/");
  return response.data;
};

// CREATE admin user
export const createUser = async (payload) => {
  const response = await api.post("admin-users/create/", payload);
  return response.data;
};

// UPDATE admin user
export const updateUser = async (id, payload) => {
  const response = await api.put(`admin-users/${id}/update/`, payload);
  return response.data;
};

// DELETE admin user
export const deleteUser = async (id) => {
  const response = await api.delete(`admin-users/${id}/delete/`);
  return response.data;
};

// FORGOT PASSWORD - send OTP
export const forgotPassword = async (email) => {
  const response = await api.post("forgot-password/", { email });
  return response.data;
};

// RESET PASSWORD - verify OTP and set new password
export const resetPassword = async (payload) => {
  const response = await api.post("reset-password/", payload);
  return response.data;
};