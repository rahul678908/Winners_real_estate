import AdminApi from "./api";

// GET ALL PROPERTIES (ADMIN)
export const getProperties = async () => {
  const response = await AdminApi.get("property/list/");
  return response.data;
};

// GET SINGLE PROPERTY
export const getPropertyById = async (id) => {
  const response = await AdminApi.get(`property/${id}/`);
  return response.data;
};

// CREATE PROPERTY
export const createProperty = async (payload) => {
  const response = await AdminApi.post("property/create/", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// UPDATE PROPERTY
export const updateProperty = async (id, payload) => {
  const response = await AdminApi.put(`property/update/${id}/`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// DELETE PROPERTY
export const deleteProperty = async (id) => {
  const response = await AdminApi.delete(`property/delete/${id}/`);
  return response.data;
};