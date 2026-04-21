import { useState } from "react";
import api from "../services/api";

export default function PropertySubmitModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    category: 1,
    listing_type: "sale", // ✅ REQUIRED
    address: "",
    map_link: "",
    video_url: "",
    bedrooms: "",
    bathrooms: "",
    floor_number: "",
    sqft: "",
    parking: false,
    furnished: true, // ✅ BOOLEAN
  });

  const [images, setImages] = useState([]);

  if (!isOpen) return null;

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "furnished"
          ? value === "true"
          : value,
    }));
  };

  // ================= IMAGE =================
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "parking" || key === "furnished") {
          payload.append(key, formData[key] ? "True" : "False");
        } else {
          payload.append(key, formData[key]);
        }
      });

      images.forEach((img) => {
        payload.append("images", img);
      });

      await api.post("property/submit/", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Property submitted successfully!");
      onClose();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Submission failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-slate-50 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-slate-800">
            Add Property
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-black text-lg"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 max-h-[80vh] overflow-y-auto"
        >

          {/* BASIC INFO */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-700">
              Basic Info
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input name="title" placeholder="Title" onChange={handleChange} className="input-box" />

              <input name="price" type="number" placeholder="Price" onChange={handleChange} className="input-box" />

              <input name="location" placeholder="Location ID" onChange={handleChange} className="input-box" />

              <select name="listing_type" onChange={handleChange} className="input-box">
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
              </select>

              <textarea
                name="description"
                placeholder="Description"
                onChange={handleChange}
                className="input-box col-span-2 h-24"
              />

              <input name="address" placeholder="Address" onChange={handleChange} className="input-box col-span-2" />

            </div>
          </div>

          {/* PROPERTY DETAILS */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-700">
              Property Details
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <input name="bedrooms" type="number" placeholder="Bedrooms" onChange={handleChange} className="input-box" />

              <input name="bathrooms" type="number" placeholder="Bathrooms" onChange={handleChange} className="input-box" />

              <input name="floor_number" type="number" placeholder="Floor" onChange={handleChange} className="input-box" />

              <input name="sqft" type="number" placeholder="Sqft" onChange={handleChange} className="input-box" />

            </div>

            {/* OPTIONS */}
            <div className="flex gap-6 mt-4 flex-wrap">

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="parking" onChange={handleChange} />
                Parking
              </label>

              <select name="furnished" onChange={handleChange} className="input-box w-48">
                <option value="true">Furnished</option>
                <option value="false">Not Furnished</option>
              </select>

            </div>
          </div>

          {/* MEDIA */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-700">
              Media & Links
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                name="map_link"
                placeholder="Google Map URL"
                onChange={handleChange}
                className="input-box"
              />

              <input
                name="video_url"
                placeholder="YouTube Video URL"
                onChange={handleChange}
                className="input-box"
              />

            </div>

            {/* IMAGE UPLOAD */}
            <div className="mt-4 border-2 border-dashed rounded-xl p-4 text-center">
              <p className="text-sm text-slate-500 mb-2">
                Upload Property Images
              </p>
              <input type="file" multiple onChange={handleImageChange} />
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-4 border-t">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-black text-white hover:bg-slate-800"
            >
              Submit Property
            </button>

          </div>
        </form>
      </div>
    </div>
  );
  }