import api from "./api";

// =============================
// 🔹 PERMISSIONS
// =============================

// GET all permissions
export const getPermissions = async () => {
  try {
    const res = await api.get("/permissions/list/");
    return res.data;
  } catch (error) {
    console.error("Error fetching permissions:", error);
    throw error;
  }
};





// =============================
// 🔹 ROLES
// =============================


// GET all roles
export const getRoles = async () => {
  try {
    const res = await api.get("/roles/list/");
    return res.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};


// CREATE role
export const createRole = async (name) => {
  try {
    const res = await api.post("/roles/create/", { name });
    return res.data;
  } catch (error) {
    console.error("Error creating role:", error);
    throw error;
  }
};

// UPDATE role (name + permissions)
export const updateRole = async (id, name, permissions) => {
  try {
    const res = await api.put(`/roles/${id}/update/`, {
      name,
      permissions,
    });
    return res.data;
  } catch (error) {
    console.error("Error updating role:", error);
    throw error;
  }
};

// DELETE role
export const deleteRole = async (id) => {
  try {
    const res = await api.delete(`/roles/${id}/delete/`);
    return res.data;
  } catch (error) {
    console.error("Error deleting role:", error);
    throw error;
  }
};


// =============================
// 🔹 ASSIGN ROLE TO USER
// =============================

export const assignRoleToUser = async (user_id, role_id) => {
  try {
    const res = await api.post("/assign-role/", {
      user_id,
      role_id,
    });
    return res.data;
  } catch (error) {
    console.error("Error assigning role:", error);
    throw error;
  }
};