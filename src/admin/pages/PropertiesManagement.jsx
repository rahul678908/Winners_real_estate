import { useNavigate } from "react-router-dom";
import { Building2, Plus } from "lucide-react";

export default function PropertiesManagement() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Properties Management
        </h1>
        <p className="text-slate-600">
          Manage property-related sections from here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Property Listings */}
        <div
          onClick={() => navigate("/admin/properties/list")}
          className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-slate-200 hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-4">
            <Building2 size={26} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Property Listings
          </h2>
          <p className="text-slate-600 text-sm">
            Add, edit, view, and delete property listings.
          </p>
        </div>

        {/* Future */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-slate-200 opacity-70">
          <div className="w-14 h-14 rounded-2xl bg-slate-300 text-white flex items-center justify-center mb-4">
            <Plus size={26} />
          </div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">
            More Coming Soon
          </h2>
          <p className="text-slate-500 text-sm">
            Property types, amenities, and more can be added here.
          </p>
        </div>
      </div>
    </div>
  );
}