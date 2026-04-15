import api from "./api";

// GET all carousel items
export const getCarousels = async () => {
  const response = await api.get("carousel/list/");
  return response.data;
};

// CREATE carousel item
export const createCarousel = async (formData) => {
  const response = await api.post("carousel/create/", formData);
  return response.data;
};

// UPDATE carousel item
export const updateCarousel = async (id, formData) => {
  const response = await api.put(`carousel/update/${id}/`, formData);
  return response.data;
};

// DELETE carousel item
export const deleteCarousel = async (id) => {
  const response = await api.delete(`carousel/delete/${id}/`);
  return response.data;
};