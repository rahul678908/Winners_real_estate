import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function CarouselModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        subtitle: initialData.subtitle || "",
        image: null,
      });
      setPreview(initialData.image_url || null); // ✅ FIXED
    } else {
      setFormData({
        title: "",
        subtitle: "",
        image: null,
      });
      setPreview(null);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

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
    payload.append("title", formData.title);
    payload.append("subtitle", formData.subtitle || "");

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
            {initialData ? "Edit Carousel" : "Add Carousel"}
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
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter carousel title"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Enter subtitle"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              name="image" // ✅ FIXED
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300"
            />
          </div>

          {preview && (
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">
                Image Preview
              </p>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-52 object-cover rounded-2xl border"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
            >
              {loading
                ? "Saving..."
                : initialData
                ? "Update Carousel"
                : "Add Carousel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}