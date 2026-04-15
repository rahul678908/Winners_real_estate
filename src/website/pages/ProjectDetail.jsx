import { useParams, useNavigate } from "react-router-dom";

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      title: "Luxury Villa Project",
      location: "Kochi",
      description:
        "A premium villa project with modern architecture, swimming pool, garden, and smart home features.",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      ],
    },
    {
      id: 2,
      title: "Modern Apartment",
      location: "Trivandrum",
      description:
        "Affordable modern apartments with gym, parking, and security.",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      ],
    },
  ];

  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) return <div className="p-10">Project not found</div>;

  return (
    <div className="bg-[#f5f5f5] py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-blue-600"
        >
          ← Back
        </button>

        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-2">
          {project.title}
        </h1>
        <p className="text-gray-500 mb-6">
          {project.location}
        </p>

        {/* IMAGES */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {project.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className="w-full h-64 object-cover rounded-lg"
            />
          ))}
        </div>

        {/* DESCRIPTION */}
        <h2 className="text-lg font-semibold mb-2">
          Project Details
        </h2>
        <p className="text-gray-600">
          {project.description}
        </p>

      </div>
    </div>
  );
}

export default ProjectDetail;