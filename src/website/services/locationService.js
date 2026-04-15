import api from "./api";

export const getLocationItems = async () => {
  const response = await api.get("location/public/");
  return response.data;
};