import { useNavigate } from "react-router-dom";

export default function ContentManagement() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Content Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage carousel, location, and testimonials
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Carousel */}
        <div
          onClick={() => navigate("/admin/website-management/carousel")}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition cursor-pointer"
        >
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              🎞️
            </div>

            <h2 className="text-lg font-semibold text-slate-800">
              Carousel Management
            </h2>

            <p className="text-sm text-slate-500">
              Manage homepage carousel images and content.
            </p>
          </div>
        </div>

        {/* Location */}
        <div
          onClick={() => navigate("/admin/website-management/location")}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition cursor-pointer"
        >
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              📍
            </div>

            <h2 className="text-lg font-semibold text-slate-800">
              Location Management
            </h2>

            <p className="text-sm text-slate-500">
              Manage property locations and related details.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div
          onClick={() => navigate("/admin/website-management/testimonials")}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition cursor-pointer"
        >
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              💬
            </div>

            <h2 className="text-lg font-semibold text-slate-800">
              Testimonial Management
            </h2>

            <p className="text-sm text-slate-500">
              Manage customer testimonials and reviews.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}