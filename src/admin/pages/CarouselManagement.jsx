import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CarouselModal from "../components/CarouselModal";
import {
  getCarousels,
  createCarousel,
  updateCarousel,
  deleteCarousel,
} from "../services/carouselManagement";

export default function CarouselManagement() {
  const navigate = useNavigate();

  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchCarousels();
  }, []);

  const fetchCarousels = async () => {
    try {
      setLoading(true);
      const data = await getCarousels();
      setCarousels(data || []);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to fetch carousel items", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    try {
      setLoading(true);

      if (editItem) {
        await updateCarousel(editItem.id, payload);
        Swal.fire("Updated!", "Carousel updated successfully", "success");
      } else {
        await createCarousel(payload);
        Swal.fire("Created!", "Carousel added successfully", "success");
      }

      setIsModalOpen(false);
      setEditItem(null);
      fetchCarousels();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Carousel?",
      text: "This item will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f172a",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await deleteCarousel(id);
        Swal.fire("Deleted!", "Carousel removed successfully", "success");
        fetchCarousels();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete item", "error");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <button
            onClick={() => navigate("/admin/website-management")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-3"
          >
            <ArrowLeft size={18} />
            Back to Website Management
          </button>

          <h1 className="text-3xl font-bold text-slate-900">
            Carousel Management
          </h1>
          <p className="text-slate-600 mt-1">
            Manage homepage carousel banners here.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition"
        >
          <Plus size={18} />
          Add Carousel
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">ID</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Image</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Title</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Subtitle</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-700">Created At</th>
                <th className="text-center px-6 py-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center px-6 py-10 text-slate-500">
                    Loading carousel items...
                  </td>
                </tr>
              ) : carousels.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center px-6 py-10 text-slate-500">
                    No carousel items found.
                  </td>
                </tr>
              ) : (
                carousels.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-200 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 text-slate-800">{item.id}</td>

                    <td className="px-6 py-4">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-24 h-14 object-cover rounded-xl border"
                        />
                      ) : (
                        <div className="w-24 h-14 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500 text-sm">
                          No Image
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-900">{item.title}</td>
                    <td className="px-6 py-4 text-slate-600">{item.subtitle || "-"}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
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

      <CarouselModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditItem(null);
        }}
        onSubmit={handleSubmit}
        initialData={editItem}
        loading={loading}
      />
    </div>
  );
}