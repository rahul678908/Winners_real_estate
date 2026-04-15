import api from "./api";

export const getPropertyItems = async () => {
  const response = await api.get("property/public/");
  return response.data;
};

export const getPropertyDetail = async (id) => {
  const response = await api.get(`property/detail/${id}/`);
  return response.data;
};