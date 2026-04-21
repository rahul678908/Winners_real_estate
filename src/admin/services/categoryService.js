import AdminApi from "./api";

// GET all categories
export const getCategories = async () => {
  const response = await AdminApi.get("category/list/");
  return response.data;
};

// CREATE category
export const createCategory = async (formData) => {
  const response = await AdminApi.post("category/create/", formData);
  return response.data;
};

// UPDATE category
export const updateCategory = async (id, formData) => {
  const response = await AdminApi.put(`category/update/${id}/`, formData);
  return response.data;
};

// DELETE category
export const deleteCategory = async (id) => {
  const response = await AdminApi.delete(`category/delete/${id}/`);
  return response.data;
};