import api from "./api";

// 🔹 GET all testimonials
export const fetchTestimonials = async () => {
  const res = await api.get("/testimonials/");
  return res.data;
};
