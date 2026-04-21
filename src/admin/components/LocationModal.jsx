import { useState, useEffect } from "react";

export default function LocationModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
  loading,
}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setIsActive(initialData.is_active ?? true);
      setImage(null);
    } else {
      setName("");
      setImage(null);
      setIsActive(true);
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", name);
    payload.append("is_active", isActive ? "True" : "False");

    // ✅ Only append image if a NEW file was actually selected
    if (image && image instanceof File) {
      payload.append("image", image);
    }

    onSubmit(payload);
  };

  if (!isOpen) return null;

  const isView = mode === "view";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[440px] shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-slate-900">
          {mode === "view"
            ? "View Location"
            : mode === "edit"
            ? "Edit Location"
            : "Add Location"}
        </h2>

        {/* VIEW MODE */}
        {isView ? (
          <div className="space-y-3 text-sm text-slate-700">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-slate-500">ID</span>
              <span>{initialData?.id ?? "—"}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-slate-500">Name</span>
              <span>{initialData?.name ?? "—"}</span>
            </div>

            <div className="flex flex-col gap-1 border-b pb-2">
              <span className="font-medium text-slate-500">Image</span>
              {initialData?.image_url ? (
                <img
                  src={initialData.image_url}
                  alt={initialData.name}
                  className="w-full h-40 object-cover rounded-xl border mt-1"
                />
              ) : (
                <span className="text-slate-400 italic">No image uploaded</span>
              )}
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-slate-500">Status</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  initialData?.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {initialData?.is_active ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-slate-500">Property Count</span>
              <span>{initialData?.property_count ?? "—"}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-slate-500">Created At</span>
              <span>
                {initialData?.created_at
                  ? new Date(initialData.created_at).toLocaleString()
                  : "—"}
              </span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* ADD / EDIT MODE */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Location Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                required
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Image
              </label>
              {/* Show existing image in edit mode */}
              {mode === "edit" && initialData?.image_url && (
                <img
                  src={initialData.image_url}
                  alt="Current"
                  className="w-full h-32 object-cover rounded-xl border mb-2"
                />
              )}
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full text-sm text-slate-600"
                accept="image/*"
              />
              {mode === "edit" && (
                <p className="text-xs text-slate-400 mt-1">
                  Leave empty to keep the current image.
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Status
              </label>
              <select
                value={isActive}
                onChange={(e) => setIsActive(e.target.value === "true")}
                className="w-full border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : mode === "edit" ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}