import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ArrowLeft, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PropertyModal from "../components/PropertyModal";
import {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../services/propertyService";

export default function PropertyListManagement() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await getProperties();
      setProperties(data?.results || data || []);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to fetch properties", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    try {
      setLoading(true);

      if (modalMode === "edit" && selectedItem) {
        await updateProperty(selectedItem.id, payload);
        Swal.fire("Updated!", "Property updated successfully", "success");
      } else {
        await createProperty(payload);
        Swal.fire("Created!", "Property added successfully", "success");
      }

      setIsModalOpen(false);
      setSelectedItem(null);
      fetchProperties();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Property?",
      text: "This property will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f172a",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await deleteProperty(id);
        Swal.fire("Deleted!", "Property removed successfully", "success");
        fetchProperties();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete property", "error");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <button
            onClick={() => navigate("/admin/properties-management")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-3"
          >
            <ArrowLeft size={18} />
            Back to Properties Management
          </button>

          <h1 className="text-3xl font-bold text-slate-900">
            Property Listings
          </h1>
          <p className="text-slate-600 mt-1">
            Manage property listings here.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition"
        >
          <Plus size={18} />
          Add Property
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">ID</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Image</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Title</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Price</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Type</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Listing</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Bedrooms</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Bathrooms</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center px-6 py-10 text-slate-500">
                    Loading properties...
                  </td>
                </tr>
              ) : properties.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center px-6 py-10 text-slate-500">
                    No properties found.
                  </td>
                </tr>
              ) : (
                properties.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-200 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4">{item.id}</td>

                    <td className="px-6 py-4">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-24 h-14 object-cover rounded-xl border"
                        />
                      ) : (
                        <div className="w-24 h-14 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500 text-sm">
                          No Image
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 font-medium">{item.title}</td>
                    <td className="px-6 py-4">₹ {item.price}</td>
                    <td className="px-6 py-4 capitalize">{item.property_type}</td>
                    <td className="px-6 py-4 capitalize">{item.listing_type}</td>
                    <td className="px-6 py-4">{item.bedrooms}</td>
                    <td className="px-6 py-4">{item.bathrooms}</td>

                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleView(item)}
                          className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PropertyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        onSubmit={handleSubmit}
        initialData={selectedItem}
        mode={modalMode}
        loading={loading}
      />
    </div>
  );
}