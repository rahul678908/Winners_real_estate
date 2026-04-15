import { useEffect, useState } from "react";
import {
  UserPlus,
  Pencil,
  Trash2,
  X,
  Check,
  KeyRound,
  Mail,
  Search,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
} from "../services/userService";

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ toast, onDismiss }) {
  if (!toast) return null;
  const colors =
    toast.type === "success"
      ? "bg-emerald-500"
      : toast.type === "error"
      ? "bg-red-500"
      : "bg-blue-500";
  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl text-white shadow-2xl ${colors} transition-all duration-300`}
    >
      {toast.type === "success" ? (
        <Check size={18} />
      ) : (
        <ShieldAlert size={18} />
      )}
      <span className="text-sm font-medium">{toast.message}</span>
      <button onClick={onDismiss}>
        <X size={16} />
      </button>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────

function Field({ label, type = "text", value, onChange, placeholder, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm text-slate-800 placeholder-slate-400 transition-all"
      />
    </div>
  );
}

// ─── Delete Confirm ───────────────────────────────────────────────────────────

function DeleteConfirmModal({ user, onConfirm, onClose, loading }) {
  return (
    <Modal title="Delete User" onClose={onClose}>
      <p className="text-slate-600 text-sm mb-6">
        Are you sure you want to delete{" "}
        <span className="font-semibold text-slate-900">{user.username}</span>?
        This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
          Delete
        </button>
      </div>
    </Modal>
  );
}

// ─── Create / Edit Modal ──────────────────────────────────────────────────────

function UserFormModal({ user, onClose, onSave, loading }) {
  const isEdit = !!user?.id;
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  });

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <Modal title={isEdit ? "Edit User" : "Create Admin User"} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Field
          label="Username"
          value={form.username}
          onChange={set("username")}
          placeholder="e.g. johndoe"
          required
        />
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={set("email")}
          placeholder="john@example.com"
          required
        />
        <Field
          label={isEdit ? "New Password (leave blank to keep)" : "Password"}
          type="password"
          value={form.password}
          onChange={set("password")}
          placeholder="••••••••"
          required={!isEdit}
        />
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Check size={16} />
          )}
          {isEdit ? "Save Changes" : "Create User"}
        </button>
      </div>
    </Modal>
  );
}

// ─── Forgot / Reset Password Modal ───────────────────────────────────────────

function ForgotPasswordModal({ onClose, showToast }) {
  const [step, setStep] = useState(1); // 1 = send OTP, 2 = reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await forgotPassword(email);
      showToast("OTP sent to email if it exists", "success");
      setStep(2);
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!email || !otp || !password) return;
    setLoading(true);
    try {
      await resetPassword({ email, otp, password });
      showToast("Password reset successfully", "success");
      onClose();
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Reset Password" onClose={onClose}>
      {step === 1 ? (
        <>
          <p className="text-sm text-slate-500 mb-4">
            Enter the admin email address to receive an OTP.
          </p>
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="admin@example.com"
            required
          />
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60 hover:bg-slate-700 transition-colors"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Mail size={16} />
              )}
              Send OTP
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm text-slate-500 mb-4">
            Enter the OTP sent to <strong>{email}</strong> and your new password.
          </p>
          <div className="flex flex-col gap-4">
            <Field
              label="OTP"
              value={otp}
              onChange={setOtp}
              placeholder="6-digit OTP"
              required
            />
            <Field
              label="New Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={handleReset}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60 hover:bg-slate-700 transition-colors"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <KeyRound size={16} />
              )}
              Reset Password
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Modals
  const [showCreate, setShowCreate] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
      setFiltered(data);
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      users.filter(
        (u) =>
          u.username.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      )
    );
  }, [search, users]);

  const handleCreate = async (form) => {
    setActionLoading(true);
    try {
      await createUser(form);
      showToast("User created successfully");
      setShowCreate(false);
      fetchUsers();
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (form) => {
    setActionLoading(true);
    try {
      const payload = { username: form.username, email: form.email };
      if (form.password) payload.password = form.password;
      await updateUser(editUser.id, payload);
      showToast("User updated successfully");
      setEditUser(null);
      fetchUsers();
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await deleteUser(deleteUser.id);
      showToast("User deleted successfully");
      setDeleteUser(null);
      fetchUsers();
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const avatarColor = (name) => {
    const colors = [
      "bg-violet-500",
      "bg-blue-500",
      "bg-emerald-500",
      "bg-orange-500",
      "bg-rose-500",
      "bg-teal-500",
    ];
    return colors[name?.charCodeAt(0) % colors.length];
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8">
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage admin accounts and access
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowForgotPassword(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
          >
            <KeyRound size={16} />
            Reset Password
          </button>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-colors shadow-sm"
          >
            <UserPlus size={16} />
            Add User
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Users", value: users.length, color: "text-slate-900" },
          {
            label: "Showing",
            value: filtered.length,
            color: "text-blue-600",
          },
          {
            label: "Latest",
            value:
              users.length > 0
                ? formatDate(
                    users.reduce((a, b) =>
                      a.created_at > b.created_at ? a : b
                    ).created_at
                  )
                : "—",
            color: "text-emerald-600",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-100"
          >
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
              {s.label}
            </p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by username or email…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {["User", "Email", "Phone", "Joined", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-16 text-center text-slate-400">
                  <Loader2
                    size={24}
                    className="animate-spin mx-auto mb-2 text-slate-300"
                  />
                  Loading users…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center text-slate-400">
                  No users found.
                </td>
              </tr>
            ) : (
              filtered.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${avatarColor(
                          user.username
                        )} flex items-center justify-center text-white text-xs font-bold uppercase flex-shrink-0`}
                      >
                        {user.username[0]}
                      </div>
                      <span className="font-medium text-slate-800">
                        {user.username}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{user.email}</td>
                  <td className="px-6 py-4 text-slate-400">
                    {user.phone || (
                      <span className="text-slate-300 italic">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditUser(user)}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteUser(user)}
                        className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showCreate && (
        <UserFormModal
          user={null}
          onClose={() => setShowCreate(false)}
          onSave={handleCreate}
          loading={actionLoading}
        />
      )}

      {editUser && (
        <UserFormModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={handleUpdate}
          loading={actionLoading}
        />
      )}

      {deleteUser && (
        <DeleteConfirmModal
          user={deleteUser}
          onConfirm={handleDelete}
          onClose={() => setDeleteUser(null)}
          loading={actionLoading}
        />
      )}

      {showForgotPassword && (
        <ForgotPasswordModal
          onClose={() => setShowForgotPassword(false)}
          showToast={showToast}
        />
      )}
    </div>
  );
}