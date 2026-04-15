import api from "./api";

// GET ALL PROPERTIES (ADMIN)
export const getProperties = async () => {
  const response = await api.get("property/list/");
  return response.data;
};

// GET SINGLE PROPERTY
export const getPropertyById = async (id) => {
  const response = await api.get(`property/${id}/`);
  return response.data;
};

// CREATE PROPERTY
export const createProperty = async (payload) => {
  const response = await api.post("property/create/", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// UPDATE PROPERTY
export const updateProperty = async (id, payload) => {
  const response = await api.put(`property/update/${id}/`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// DELETE PROPERTY
export const deleteProperty = async (id) => {
  const response = await api.delete(`property/delete/${id}/`);
  return response.data;
};