import AdminApi from "./api";

// ================= LIST =================
export const getPropertySubmissions = async () => {
  const res = await AdminApi.get("property/submissions/");
  return res.data;
};

// ================= DETAIL =================
export const getPropertySubmissionDetail = async (id) => {
  const res = await AdminApi.get(`property/submissions/${id}/`);
  return res.data;
};

// ================= MARK REVIEW =================
export const markSubmissionInReview = async (id) => {
  const res = await AdminApi.put(`property/submissions/${id}/review/`);
  return res.data;
};

// ================= EDIT =================
export const editSubmission = async (id, payload) => {
  const res = await AdminApi.put(
    `property/submissions/${id}/edit/`,
    payload
  );
  return res.data;
};

// ================= MARK COMPLETE =================
export const markSubmissionComplete = async (id) => {
  const res = await AdminApi.put(
    `property/submissions/${id}/complete/`
  );
  return res.data;
};

// ================= CONVERT TO PROPERTY =================
export const publishSubmission = async (id) => {
  const res = await AdminApi.post(
    `property/submissions/${id}/convert/`
  );
  return res.data;
};