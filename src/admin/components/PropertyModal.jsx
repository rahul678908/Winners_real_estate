import { useEffect, useState } from "react";
import { X, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { getLocations } from "../services/locationList";

const initialForm = {
  title: "",
  description: "",
  price: "",
  location: "",
  category: "",
  address: "",
  property_type: "villa",
  listing_type: "sale",
  bedrooms: "",
  bathrooms: "",
  sqft: "",
  parking: false,
  furnished: false,
  map_link: "",
  video_url: "",
};

export default function PropertyModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode = "add",
  loading,
}) {
  const [formData, setFormData] = useState(initialForm);
  const [locations, setLocations] = useState([]);

  // New image upload state
  const [newImages, setNewImages] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(null);

  const isView = mode === "view";

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        location: initialData.location || "",
        category: initialData.category || "",
        address: initialData.address || "",
        property_type: initialData.property_type || "villa",
        listing_type: initialData.listing_type || "sale",
        bedrooms: initialData.bedrooms || "",
        bathrooms: initialData.bathrooms || "",
        sqft: initialData.sqft || "",
        parking: initialData.parking || false,
        furnished: initialData.furnished || false,
        map_link: initialData.map_link || "",
        video_url: initialData.video_url || "",
      });

      setNewImages([]);
      setThumbnailIndex(null);
    } else {
      setFormData(initialForm);
      setNewImages([]);
      setThumbnailIndex(null);
    }
  }, [initialData]);

  const fetchLocations = async () => {
    try {
      const data = await getLocations();
      setLocations(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add empty image slot
  const handleAddImageField = () => {
    setNewImages((prev) => [...prev, { file: null, preview: null }]);
  };

  // Change image
  const handleImageChange = (index, file) => {
    if (!file) return;

    const updated = [...newImages];
    updated[index] = {
      file,
      preview: URL.createObjectURL(file),
    };
    setNewImages(updated);

    // First uploaded image becomes default thumbnail
    if (thumbnailIndex === null) {
      setThumbnailIndex(index);
    }
  };

  // Remove image
  const handleRemoveImage = (index) => {
    const updated = newImages.filter((_, i) => i !== index);
    setNewImages(updated);

    if (thumbnailIndex === index) {
      setThumbnailIndex(updated.length > 0 ? 0 : null);
    } else if (thumbnailIndex > index) {
      setThumbnailIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();

    // Normal fields
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });

    // Images
    newImages.forEach((img, index) => {
      if (img.file) {
        payload.append("images", img.file);
      }
    });

    // Thumbnail index
    if (thumbnailIndex !== null) {
      payload.append("thumbnail_index", thumbnailIndex);
    }

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">
            {mode === "add"
              ? "Add Property"
              : mode === "edit"
              ? "Edit Property"
              : "View Property"}
          </h2>
          <button onClick={onClose}>
            <X className="text-slate-600 hover:text-slate-900" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          
          {/* BASIC INFO */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  disabled={isView}
                  placeholder="Enter property title"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Price
                </label>
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  disabled={isView}
                  placeholder="Enter price"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  disabled={isView}
                  rows={4}
                  placeholder="Enter property description"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Address
                </label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={isView}
                  placeholder="Enter address"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />
              </div>
            </div>
          </div>

          {/* CLASSIFICATION */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Classification
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={isView}
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
              >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>

              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={isView}
                placeholder="Enter category ID"
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
              />

              <select
                name="property_type"
                value={formData.property_type}
                onChange={handleChange}
                disabled={isView}
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
              >
                <option value="villa">Villa</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="office">Office</option>
                <option value="townhome">Townhome</option>
                <option value="bungalow">Bungalow</option>
              </select>

              <select
                name="listing_type"
                value={formData.listing_type}
                onChange={handleChange}
                disabled={isView}
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
              >
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
              </select>
            </div>
          </div>

          {/* PROPERTY DETAILS */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Property Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                disabled={isView}
                placeholder="Bedrooms"
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
              />
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                disabled={isView}
                placeholder="Bathrooms"
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
              />
              <input
                type="number"
                name="sqft"
                value={formData.sqft}
                onChange={handleChange}
                disabled={isView}
                placeholder="Sqft"
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
              />
            </div>

            <div className="flex flex-wrap gap-6 mt-5">
              <label className="flex items-center gap-3 text-slate-700">
                <input
                  type="checkbox"
                  name="parking"
                  checked={formData.parking}
                  onChange={handleChange}
                  disabled={isView}
                />
                Parking Available
              </label>

              <label className="flex items-center gap-3 text-slate-700">
                <input
                  type="checkbox"
                  name="furnished"
                  checked={formData.furnished}
                  onChange={handleChange}
                  disabled={isView}
                />
                Furnished
              </label>
            </div>
          </div>

          {/* MEDIA & LINKS */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Media & Links
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                name="map_link"
                value={formData.map_link}
                onChange={handleChange}
                disabled={isView}
                placeholder="Google Maps link"
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
              />

              <input
                name="video_url"
                value={formData.video_url}
                onChange={handleChange}
                disabled={isView}
                placeholder="YouTube / video URL"
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
              />
            </div>

            {/* Add Images Button */}
            {!isView && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleAddImageField}
                  className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition"
                >
                  <Plus size={18} />
                  Add Image
                </button>
              </div>
            )}

            {/* New Upload Fields */}
            {newImages.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {newImages.map((img, index) => (
                  <div
                    key={index}
                    className={`border rounded-2xl p-4 relative ${
                      thumbnailIndex === index
                        ? "border-slate-900 ring-2 ring-slate-900/20"
                        : "border-slate-300"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-slate-800">
                        Image {index + 1}
                      </h4>

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {img.preview ? (
                      <img
                        src={img.preview}
                        alt={`preview-${index}`}
                        className="w-full h-40 object-cover rounded-xl mb-3 border"
                      />
                    ) : (
                      <div className="w-full h-40 bg-slate-100 rounded-xl flex items-center justify-center mb-3 border">
                        <ImageIcon className="text-slate-400" size={32} />
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(index, e.target.files[0])
                      }
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm"
                    />

                    <label className="flex items-center gap-2 mt-3 text-sm text-slate-700">
                      <input
                        type="radio"
                        name="thumbnail"
                        checked={thumbnailIndex === index}
                        onChange={() => setThumbnailIndex(index)}
                      />
                      Set as Thumbnail
                    </label>
                  </div>
                ))}
              </div>
            )}

            {/* Existing Images */}
            {initialData?.images?.length > 0 && (
              <div className="mt-8">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Existing Images
                </label>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {initialData.images.map((img) => (
                    <div key={img.id} className="relative">
                      <img
                        src={img.image_url}
                        alt="property"
                        className="w-full h-28 object-cover rounded-xl border"
                      />
                      {img.is_primary && (
                        <span className="absolute top-2 left-2 bg-slate-900 text-white text-xs px-2 py-1 rounded-full">
                          Thumbnail
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          {!isView && (
            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                type="submit"
                disabled={loading}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition disabled:opacity-60"
              >
                {loading
                  ? "Saving..."
                  : mode === "edit"
                  ? "Update Property"
                  : "Add Property"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}