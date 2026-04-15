import api from "./api";

export const getCategoryItems = async () => {
  const response = await api.get("category/public/");
  return response.data;
};