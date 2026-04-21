import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPropertySubmissions } from "../services/propertySubmissionService";

export default function PropertySubmissionsList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getPropertySubmissions();

      // ✅ FIX HERE
      setData(res.results || []);
    } catch (err) {
      console.error(err);
      setData([]); // fallback
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Property Submissions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/admin/properties/${item.id}`)}
            className="bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer overflow-hidden"
          >
            {/* Image */}
            <img
              src={item.images?.[0]?.image_url}
              alt=""
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-4">
              <h2 className="font-bold text-lg">{item.title}</h2>
              <p className="text-sm text-gray-500">{item.address}</p>

              <p className="mt-2 font-semibold text-black">
                ₹ {item.price}
              </p>

              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded mt-2 inline-block">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}