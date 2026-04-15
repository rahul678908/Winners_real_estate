import api from "./api";

// GET all locations
export const getLocations = async () => {
  const response = await api.get("location/list/");
  return response.data;
};

// CREATE location
export const createLocation = async (formData) => {
  const response = await api.post("location/create/", formData);
  return response.data;
};

// UPDATE location
export const updateLocation = async (id, formData) => {
  const response = await api.put(`location/update/${id}/`, formData);
  return response.data;
};

// DELETE location
export const deleteLocation = async (id) => {
  const response = await api.delete(`location/delete/${id}/`);
  return response.data;
};