import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function LocationModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  mode = "add", // add | edit | view
  loading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    image_url: null,
    is_active: true,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        image_url: null,
        is_active: initialData.is_active ?? true,
      });
      setPreview(initialData.image_url || null);
    } else {
      setFormData({
        name: "",
        image_url: null,
        is_active: true,
      });
      setPreview(null);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const isView = mode === "view";

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === "image") {
      const file = files && files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          image_url: file,
        }));
        setPreview(URL.createObjectURL(file));
      }
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
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
    payload.append("is_active", formData.is_active);

    if (formData.image_url instanceof File) {
      payload.append("image", formData.image_url);
    }

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-2xl font-bold text-slate-900">
            {mode === "add" && "Add Location"}
            {mode === "edit" && "Edit Location"}
            {mode === "view" && "View Location"}
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
              Location Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter location name"
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

          {/* Active */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              disabled={isView}
              className="w-5 h-5"
            />
            <label
              htmlFor="is_active"
              className="text-sm font-medium text-slate-700"
            >
              Active
            </label>
          </div>

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
                  ? "Update Location"
                  : "Add Location"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}