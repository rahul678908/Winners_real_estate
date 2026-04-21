import AdminApi from "./api";

// 🔹 GET all testimonials
export const fetchTestimonials = async () => {
  const res = await AdminApi.get("/testimonials/");
  return res.data;
};

// 🔹 CREATE testimonial
export const createTestimonial = async (formData) => {
  const res = await AdminApi.post("/testimonials/create/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// 🔹 UPDATE testimonial
export const updateTestimonial = async (id, formData) => {
  const res = await AdminApi.put(`/testimonials/${id}/update/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// 🔹 DELETE testimonial
export const deleteTestimonial = async (id) => {
  const res = await AdminApi.delete(`/testimonials/${id}/delete/`);
  return res.data;
};