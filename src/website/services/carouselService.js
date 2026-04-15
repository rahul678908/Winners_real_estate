import api from "./api";

export const getCarouselItems = async () => {
  const response = await api.get("carousel/public/");
  return response.data;
};