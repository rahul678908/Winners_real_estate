import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  mode = "add", // add | edit | view
  loading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        image: null,
      });
      setPreview(initialData.image || null);
    } else {
      setFormData({
        name: "",
        image: null,
      });
      setPreview(null);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const isView = mode === "view";

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files && files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          image: file,
        }));
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);

    if (formData.image instanceof File) {
      payload.append("image", formData.image);
    }

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-2xl font-bold text-slate-900">
            {mode === "add" && "Add Category"}
            {mode === "edit" && "Edit Category"}
            {mode === "view" && "View Category"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-red-500 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
              disabled={isView}
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Upload Image
            </label>
            {!isView && (
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300"
              />
            )}
          </div>

          {/* Preview */}
          {preview && (
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">
                Image Preview
              </p>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-56 object-cover rounded-2xl border"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
              Close
            </button>

            {!isView && (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
              >
                {loading
                  ? "Saving..."
                  : mode === "edit"
                  ? "Update Category"
                  : "Add Category"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}