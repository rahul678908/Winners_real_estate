import { useEffect, useState, useRef } from "react";
import {
  fetchTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../services/testimonialService";

const MODAL = { NONE: null, CREATE: "create", EDIT: "edit", DELETE: "delete" };

const defaultForm = { name: "", message: "", image: null };

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(MODAL.NONE);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState("");
  const fileRef = useRef();

  useEffect(() => {
    loadTestimonials();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await fetchTestimonials();
      setTestimonials(data);
    } catch (err) {
      showToast("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((f) => ({ ...f, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("message", form.message);
    if (form.image instanceof File) fd.append("image", form.image);
    return fd;
  };

  const openCreate = () => {
    setForm(defaultForm);
    setPreview(null);
    setModal(MODAL.CREATE);
  };

  const handleCreate = async () => {
    if (!form.name.trim() || !form.message.trim()) return;

    try {
      setSubmitting(true);
      const res = await createTestimonial(buildFormData());
      setTestimonials((prev) => [res.data, ...prev]);
      setModal(MODAL.NONE);
      showToast("Created successfully");
    } catch {
      showToast("Create failed");
    } finally {
      setSubmitting(false);
    }
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setForm({ name: item.name, message: item.message, image: null });
    setPreview(item.image);
    setModal(MODAL.EDIT);
  };

  const handleUpdate = async () => {
    try {
      setSubmitting(true);
      const res = await updateTestimonial(editId, buildFormData());
      setTestimonials((prev) =>
        prev.map((t) => (t.id === editId ? res.data : t))
      );
      setModal(MODAL.NONE);
      showToast("Updated successfully");
    } catch {
      showToast("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  const openDelete = (id) => {
    setDeleteId(id);
    setModal(MODAL.DELETE);
  };

  const handleDelete = async () => {
    try {
      setSubmitting(true);
      await deleteTestimonial(deleteId);
      setTestimonials((prev) => prev.filter((t) => t.id !== deleteId));
      setModal(MODAL.NONE);
      showToast("Deleted successfully");
    } catch {
      showToast("Delete failed");
    } finally {
      setSubmitting(false);
    }
  };

  // 🔥 MODAL (TAILWIND ONLY)
  const Modal = ({ title, onClose, children, footer }) => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-200 scale-100">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-sm text-gray-500">Manage testimonials</p>
        </div>

        <button
          onClick={openCreate}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          + Add
        </button>
      </div>

      {/* List */}
      {loading ? (
        <p>Loading...</p>
      ) : testimonials.length === 0 ? (
        <p>No testimonials</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-xl shadow">
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.message}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => openEdit(item)}
                  className="flex-1 py-1.5 text-sm border rounded-lg hover:bg-slate-50"
                >
                  ✏ Edit
                </button>
                <button
                  onClick={() => openDelete(item.id)}
                  className="flex-1 py-1.5 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE */}
      {modal === MODAL.CREATE && (
        <Modal
          title="Add Testimonial"
          onClose={() => setModal(null)}
          footer={
            <>
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 border rounded-xl hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Create
              </button>
            </>
          }
        >
          <input
            className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
            onChange={(e) =>
              setForm((f) => ({ ...f, name: e.target.value }))
            }
          />
          <textarea
            className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="Message"
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
          />
          <input type="file" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
        </Modal>
      )}

      {/* EDIT */}
      {modal === MODAL.EDIT && (
        <Modal
          title="Edit Testimonial"
          onClose={() => setModal(null)}
          footer={
            <>
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 border rounded-xl hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
              >
                Save
              </button>
            </>
          }
        >
          <input
            className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500"
            value={form.name}
            onChange={(e) =>
              setForm((f) => ({ ...f, name: e.target.value }))
            }
          />
          <textarea
            className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500"
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
          />
        </Modal>
      )}

      {/* DELETE */}
      {modal === MODAL.DELETE && (
        <Modal
          title="Delete Testimonial"
          onClose={() => setModal(null)}
          footer={
            <>
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 border rounded-xl hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
              >
                Delete
              </button>
            </>
          }
        >
          <p className="text-center text-sm text-slate-600">
            Are you sure you want to delete this testimonial?
          </p>
        </Modal>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-5 py-2 rounded-xl shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}