import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Projects() {
  const navigate = useNavigate();

  const [projects] = useState([
    {
      id: 1,
      title: "Luxury Villa Project",
      location: "Kochi",
      type: "Villa",
      area: "2500 sqft",
      price: "₹1.2 Cr",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    },
    {
      id: 2,
      title: "Modern Apartment",
      location: "Trivandrum",
      type: "Flat",
      area: "1200 sqft",
      price: "₹65 Lakh",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    },
  ]);

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Explore Our Projects</h1>
          <p className="text-gray-500 mt-1">
            Find your dream property easily
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">

          {/* LEFT FILTER */}
          <div className="col-span-3 bg-white p-6 rounded-2xl shadow-sm h-fit sticky top-5">
            <h3 className="font-semibold mb-5 text-lg">Filters</h3>

            <input
              type="text"
              placeholder="📍 Location"
              className="w-full border p-2 rounded-lg mb-5"
            />

            <div className="mb-5">
              <p className="font-medium mb-2">Property Type</p>
              <label className="block text-sm">
                <input type="checkbox" className="mr-2" /> Villa
              </label>
              <label className="block text-sm">
                <input type="checkbox" className="mr-2" /> House
              </label>
              <label className="block text-sm">
                <input type="checkbox" className="mr-2" /> Flat
              </label>
            </div>

            <button className="w-full bg-black text-white py-2 rounded-lg">
              Apply Filters
            </button>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-9">

            {/* SEARCH BAR */}
            <input
              type="text"
              placeholder="🔍 Search projects..."
              className="w-full border p-3 rounded-xl mb-6"
            />

            {/* PROJECT LIST */}
            <div className="space-y-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="flex bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
                >
                  {/* IMAGE */}
                  <img
                    src={project.image}
                    alt=""
                    className="w-64 h-48 object-cover"
                  />

                  {/* CONTENT */}
                  <div className="p-5 flex flex-col justify-between w-full">
                    
                    <div>
                      <h2 className="text-xl font-semibold">
                        {project.title}
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        📍 {project.location}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-gray-600 space-x-4">
                        <span>🏠 {project.type}</span>
                        <span>📐 {project.area}</span>
                      </div>

                      <div className="text-lg font-bold text-black">
                        {project.price}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Projects;