import { useEffect, useRef, useState } from "react";
import { getLocationItems } from "../services/locationService";

function Properties() {
  const scrollRef = useRef();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const data = await getLocationItems();

      const formatted = data.map((item) => ({
        id: item.id,
        name: item.name,
        img: item.image_url,
        properties: "", // intentionally blank for now
      }));

      setCities(formatted);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div className="bg-[#f5f5f5] py-16 px-6">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-[24px] font-semibold">
              Properties by Cities
            </h2>
            <p className="text-gray-500 text-sm">
              Explore locations where properties are available
            </p>
          </div>

          <button className="flex items-center gap-1 text-sm font-medium">
            All Cities ↗
          </button>
        </div>

        {/* Loading / Empty */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading locations...
          </div>
        ) : cities.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No locations found
          </div>
        ) : (
          <>
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-[58%] -translate-y-1/2 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center z-10 hover:shadow-lg transition"
            >
              ‹
            </button>

            {/* Cities Scroll */}
            <div
              ref={scrollRef}
              className="flex gap-10 overflow-x-auto scrollbar-hide px-10 scroll-smooth"
            >
              {cities.map((city) => (
                <div key={city.id} className="text-center min-w-[140px] group cursor-pointer">
                  
                  {/* Image */}
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-sm group-hover:shadow-lg transition">
                    <img
                      src={city.img}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=300";
                      }}
                    />
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-[15px] text-[#1e1e1e]">
                    {city.name}
                  </h3>

                  {/* Properties (blank for now) */}
                  <p className="text-gray-500 text-[13px] min-h-[20px]">
                    {city.properties}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="absolute right-0 top-[58%] -translate-y-1/2 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center z-10 hover:shadow-lg transition"
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Properties;