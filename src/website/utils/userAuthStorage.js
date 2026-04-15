// ================= USER TOKENS =================
export const saveUserTokens = (access, refresh) => {
  localStorage.setItem("user_access_token", access);
  localStorage.setItem("user_refresh_token", refresh);
};

export const getUserAccessToken = () => {
  return localStorage.getItem("user_access_token");
};

export const getUserRefreshToken = () => {
  return localStorage.getItem("user_refresh_token");
};

export const clearUserTokens = () => {
  localStorage.removeItem("user_access_token");
  localStorage.removeItem("user_refresh_token");
};

// ================= ADMIN TOKENS =================
export const saveAdminTokens = (access, refresh) => {
  localStorage.setItem("admin_access_token", access);
  localStorage.setItem("admin_refresh_token", refresh);
};

export const getAdminAccessToken = () => {
  return localStorage.getItem("admin_access_token");
};

export const getAdminRefreshToken = () => {
  return localStorage.getItem("admin_refresh_token");
};

export const clearAdminTokens = () => {
  localStorage.removeItem("admin_access_token");
  localStorage.removeItem("admin_refresh_token");
};

// ================= CLEAR ALL =================
export const clearAllTokens = () => {
  clearUserTokens();
  clearAdminTokens();
};