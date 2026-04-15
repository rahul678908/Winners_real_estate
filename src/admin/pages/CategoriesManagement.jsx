import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  Grid2x2,
  ArrowLeft,
} from "lucide-react";
import Swal from "sweetalert2";
import CategoryModal from "../components/CategoryModal";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

export default function CategoriesManagement() {
  const [activeSection, setActiveSection] = useState(null); // null | "category"

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (activeSection === "category") {
      fetchCategories();
    }
  }, [activeSection]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to fetch categories", "error");
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
        await updateCategory(selectedItem.id, payload);
        Swal.fire("Updated!", "Category updated successfully", "success");
      } else {
        await createCategory(payload);
        Swal.fire("Created!", "Category added successfully", "success");
      }

      setIsModalOpen(false);
      setSelectedItem(null);
      fetchCategories();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Category?",
      text: "This category will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f172a",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await deleteCategory(id);
        Swal.fire("Deleted!", "Category removed successfully", "success");
        fetchCategories();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete category", "error");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* =========================
          MAIN CATEGORY PAGE
      ========================= */}
      {!activeSection && (
        <>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Categories Management
            </h1>
            <p className="text-slate-600">
              Manage property categories from here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Manage Categories Card */}
            <div
              onClick={() => setActiveSection("category")}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-slate-200 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-4">
                <Grid2x2 size={26} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Manage Categories
              </h2>
              <p className="text-slate-600 text-sm">
                Add, edit, view, and delete property categories.
              </p>
            </div>

            {/* Future Card */}
            <div className="bg-white rounded-3xl shadow-md p-6 border border-slate-200 opacity-70">
              <div className="w-14 h-14 rounded-2xl bg-slate-300 text-white flex items-center justify-center mb-4">
                <Plus size={26} />
              </div>
              <h2 className="text-xl font-bold text-slate-700 mb-2">
                More Coming Soon
              </h2>
              <p className="text-slate-500 text-sm">
                More category-related tools can be added here.
              </p>
            </div>
          </div>
        </>
      )}

      {/* =========================
          CATEGORY MANAGEMENT SECTION
      ========================= */}
      {activeSection === "category" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <button
                onClick={() => setActiveSection(null)}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-3"
              >
                <ArrowLeft size={18} />
                Back to Categories Management
              </button>

              <h1 className="text-3xl font-bold text-slate-900">
                Category Management
              </h1>
              <p className="text-slate-600 mt-1">
                Manage property categories here.
              </p>
            </div>

            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition"
            >
              <Plus size={18} />
              Add Category
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-slate-700">
                      ID
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-700">
                      Image
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-700">
                      Name
                    </th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center px-6 py-10 text-slate-500"
                      >
                        Loading categories...
                      </td>
                    </tr>
                  ) : categories.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center px-6 py-10 text-slate-500"
                      >
                        No categories found.
                      </td>
                    </tr>
                  ) : (
                    categories.map((item) => (
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

                        <td className="px-6 py-4 font-medium text-slate-900">
                          {item.name}
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

          {/* Modal */}
          <CategoryModal
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
      )}
    </div>
  );
}