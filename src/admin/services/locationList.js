import AdminApi from "./api";

// GET all locations
export const getLocations = async () => {
  const response = await AdminApi.get("location/list/");
  return response.data;
};

// CREATE location
export const createLocation = async (formData) => {
  const response = await AdminApi.post("location/create/", formData);
  return response.data;
};

// UPDATE location
export const updateLocation = async (id, formData) => {
  const response = await AdminApi.put(`location/update/${id}/`, formData);
  return response.data;
};

// DELETE location
export const deleteLocation = async (id) => {
  const response = await AdminApi.delete(`location/delete/${id}/`);
  return response.data;
};