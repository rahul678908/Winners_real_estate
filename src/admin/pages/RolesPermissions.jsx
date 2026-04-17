import { useEffect, useState } from "react";
import {
  getPermissions, createRole, updateRole,
  deleteRole, assignRoleToUser, getRoles
} from "../services/RolesPermission";

const MODAL = { NONE: null, CREATE: "create", EDIT: "edit", DELETE: "delete", ASSIGN: "assign" };

export default function RolesPermissions() {
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [modal, setModal] = useState(MODAL.NONE);
  const [newRoleName, setNewRoleName] = useState("");
  const [createPerms, setCreatePerms] = useState([]);
  const [editPerms, setEditPerms] = useState([]);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [assignUserId, setAssignUserId] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchPermissions = async () => {
    try { setPermissions(await getPermissions()); }
    catch (err) { console.error(err); }
  };

    const fetchAll = async () => {
    try {
      const perms = await getPermissions();
      const rolesData = await getRoles();

      setPermissions(perms);
      setRoles(rolesData);
    } catch (err) {
      console.error(err);
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const selectedRole = roles.find((r) => r.id === selectedRoleId);

  // ── CREATE ──
  const openCreateModal = () => {
    setNewRoleName(""); setCreatePerms([]); setModal(MODAL.CREATE);
  };

  const handleCreate = async () => {
    if (!newRoleName.trim()) return;

    await createRole({
      name: newRoleName,
      permissions: createPerms, // ✅ send to backend
    });

    await fetchAll(); // 🔥 VERY IMPORTANT
    setModal(MODAL.NONE);
    showToast(`Role "${newRoleName}" created`);
  };

  const toggleCreatePerm = (id) =>
    setCreatePerms((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  // ── EDIT ──
  const openEditModal = (role) => {
    setSelectedRoleId(role.id);
    setEditPerms(role.permissions || []);
    setModal(MODAL.EDIT);
  };

  const handleUpdate = async () => {
    await updateRole(selectedRoleId, selectedRole.name, editPerms);

    await fetchAll(); // 🔥 FIX
    setModal(MODAL.NONE);
    showToast("Permissions updated");
  };

  const toggleEditPerm = (id) =>
    setEditPerms((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  // ── DELETE ──
  const openDeleteModal = (id) => { setPendingDeleteId(id); setModal(MODAL.DELETE); };
  const handleDelete = async () => {
    const role = roles.find((r) => r.id === pendingDeleteId);

    await deleteRole(pendingDeleteId);
    await fetchAll(); // 🔥 FIX

    if (selectedRoleId === pendingDeleteId) setSelectedRoleId(null);

    setModal(MODAL.NONE);
    showToast(`Role "${role.name}" deleted`);
  };

  // ── ASSIGN ──
  const openAssignModal = () => {
    if (!selectedRoleId) { showToast("Select a role first"); return; }
    setModal(MODAL.ASSIGN);
  };
  const handleAssign = async () => {
    if (!assignUserId || !selectedRoleId) return;
    await assignRoleToUser(assignUserId, selectedRoleId);
    setModal(MODAL.NONE);
    setAssignUserId("");
    showToast(`Role "${selectedRole.name}" assigned to user #${assignUserId}`);
  };

  const PermGrid = ({ selected, onToggle }) => (
    <div className="grid grid-cols-2 gap-2 mt-2">
      {permissions.map((p) => (
        <label key={p.id}
          className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer text-sm transition-colors
            ${selected.includes(p.id) ? "border-blue-400 bg-blue-50 text-blue-800" : "border-slate-200 bg-slate-50"}`}>
          <input type="checkbox" checked={selected.includes(p.id)} onChange={() => onToggle(p.id)} className="accent-blue-600" />
          {p.name}
        </label>
      ))}
    </div>
  );

  const Modal = ({ title, onClose, children, footer }) => (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none">✕</button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && <div className="px-5 py-4 border-t border-slate-100 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Roles & Permissions</h1>
        <button onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
          + New Role
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-slate-800">{roles.length}</p>
          <p className="text-sm text-slate-500 mt-1">Total roles</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-slate-800">{permissions.length}</p>
          <p className="text-sm text-slate-500 mt-1">Permissions available</p>
        </div>
      </div>

      {/* Roles list */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-5">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Defined Roles</h2>
        {roles.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-8">No roles yet — click "New Role" to get started.</p>
        ) : (
          <div className="space-y-2">
            {roles.map((role) => {
              const permNames = (role.permissions || [])
                .map((pid) => permissions.find((p) => p.id === pid)?.name).filter(Boolean);
              return (
                <div key={role.id}
                  onClick={() => setSelectedRoleId(selectedRoleId === role.id ? null : role.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all
                    ${selectedRoleId === role.id ? "border-blue-400 bg-blue-50" : "border-slate-100 hover:border-slate-200 bg-slate-50"}`}>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{role.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {permNames.length ? permNames.join(", ") : "No permissions assigned"}
                    </p>
                  </div>
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => openEditModal(role)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600">
                      ✏ Edit
                    </button>
                    <button onClick={() => openDeleteModal(role.id)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Assign role to user */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Assign Role to User</h2>
        <p className="text-sm text-slate-500 mb-3">
          Select a role from the list above, then assign it to a user.
        </p>
        <div className="flex gap-3">
          <input type="number" placeholder="Enter user ID"
            className="border border-slate-200 rounded-lg px-3 py-2 w-full text-sm"
            value={assignUserId} onChange={(e) => setAssignUserId(e.target.value)} />
          <button onClick={openAssignModal}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm whitespace-nowrap">
            Assign Role
          </button>
        </div>
        {selectedRole && (
          <p className="text-xs text-blue-600 mt-2">Selected role: "{selectedRole.name}"</p>
        )}
      </div>

      {/* ── MODALS ── */}

    {modal === MODAL.CREATE && (
      <Modal title="Create new role" onClose={() => setModal(MODAL.NONE)}
        footer={<>
          <button onClick={() => setModal(MODAL.NONE)} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
          <button onClick={handleCreate} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create role</button>
        </>}>
        <label className="text-xs font-medium text-slate-500 block mb-1">Role name</label>
        <input
          autoFocus
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm mb-4 focus:ring-2 focus:ring-blue-300 outline-none"
          placeholder="e.g. Editor, Moderator, Viewer"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
        />
        <label className="text-xs font-medium text-slate-500 block mb-2">Permissions (optional)</label>
        <div className="max-h-52 overflow-y-auto pr-1 rounded-lg border border-slate-100">
          <PermGrid selected={createPerms} onToggle={toggleCreatePerm} />
        </div>
      </Modal>
    )}

    {modal === MODAL.EDIT && selectedRole && (
      <Modal title="Edit permissions" onClose={() => setModal(MODAL.NONE)}
        footer={<>
          <button onClick={() => setModal(MODAL.NONE)} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
          <button onClick={handleUpdate} className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">Save changes</button>
        </>}>
        <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-sm text-blue-700 mb-4">
          Editing: <strong>{selectedRole.name}</strong>
        </div>
        <label className="text-xs font-medium text-slate-500 block mb-2">Select permissions</label>
        <div className="max-h-52 overflow-y-auto pr-1 rounded-lg border border-slate-100">
          <PermGrid selected={editPerms} onToggle={toggleEditPerm} />
        </div>
      </Modal>
    )}

      {modal === MODAL.DELETE && (
        <Modal title="Delete role" onClose={() => setModal(MODAL.NONE)}
          footer={<>
            <button onClick={() => setModal(MODAL.NONE)} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
            <button onClick={handleDelete} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">Yes, delete</button>
          </>}>
          <div className="bg-red-50 rounded-xl p-5 text-center">
            <p className="text-3xl mb-2">⚠️</p>
            <p className="font-semibold text-red-800">
              Delete "{roles.find((r) => r.id === pendingDeleteId)?.name}"?
            </p>
            <p className="text-sm text-red-600 mt-1">
              This cannot be undone. Users with this role will lose their permissions.
            </p>
          </div>
        </Modal>
      )}

      {modal === MODAL.ASSIGN && selectedRole && (
        <Modal title="Assign role to user" onClose={() => setModal(MODAL.NONE)}
          footer={<>
            <button onClick={() => setModal(MODAL.NONE)} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
            <button onClick={handleAssign} className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700">Assign</button>
          </>}>
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-sm text-blue-700 mb-4">
            Assigning role: <strong>{selectedRole.name}</strong>
          </div>
          <label className="text-xs font-medium text-slate-500 block mb-1">User ID</label>
          <input autoFocus type="number" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-300 outline-none"
            placeholder="Enter user ID"
            value={assignUserId} onChange={(e) => setAssignUserId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAssign()} />
        </Modal>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-800 text-green-100 px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg z-50 pointer-events-none">
          {toast}
        </div>
      )}
    </div>
  );
}