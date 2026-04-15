import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LocationModal from "../components/LocationModal";
import {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../services/locationList";

export default function LocationManagement() {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const data = await getLocations();
      setLocations(data || []);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to fetch locations", "error");
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
        await updateLocation(selectedItem.id, payload);
        Swal.fire("Updated!", "Location updated successfully", "success");
      } else {
        await createLocation(payload);
        Swal.fire("Created!", "Location added successfully", "success");
      }

      setIsModalOpen(false);
      setSelectedItem(null);
      fetchLocations();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Location?",
      text: "This location will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f172a",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await deleteLocation(id);
        Swal.fire("Deleted!", "Location removed successfully", "success");
        fetchLocations();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete location", "error");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <button
            onClick={() => navigate("/admin/website")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-3"
          >
            <ArrowLeft size={18} />
            Back to Website Management
          </button>

          <h1 className="text-3xl font-bold text-slate-900">
            Location Management
          </h1>
          <p className="text-slate-600 mt-1">
            Manage website locations here.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition"
        >
          <Plus size={18} />
          Add Location
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">ID</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Image</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Name</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center px-6 py-10 text-slate-500">
                    Loading locations...
                  </td>
                </tr>
              ) : locations.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center px-6 py-10 text-slate-500">
                    No locations found.
                  </td>
                </tr>
              ) : (
                locations.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-200 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 text-slate-800">{item.id}</td>

                    <td className="px-6 py-4">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-24 h-14 object-cover rounded-xl border"
                        />
                      ) : (
                        <div className="w-24 h-14 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500 text-sm">
                          No Image
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                      <MapPin size={16} className="text-slate-500" />
                      {item.name}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

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

      <LocationModal
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