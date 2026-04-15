import api from "./api";

// GET all categories
export const getCategories = async () => {
  const response = await api.get("category/list/");
  return response.data;
};

// CREATE category
export const createCategory = async (formData) => {
  const response = await api.post("category/create/", formData);
  return response.data;
};

// UPDATE category
export const updateCategory = async (id, formData) => {
  const response = await api.put(`category/update/${id}/`, formData);
  return response.data;
};

// DELETE category
export const deleteCategory = async (id) => {
  const response = await api.delete(`category/delete/${id}/`);
  return response.data;
};