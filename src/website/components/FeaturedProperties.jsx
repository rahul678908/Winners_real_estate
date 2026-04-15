import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { getLocationItems } from "../services/locationService";

function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const data = await getLocationItems();

      const formattedProperties = data.map((item) => ({
        id: item.id,
        title: item.name || "Untitled Location",
        address: item.address || "Location Available",
        beds: item.beds || 0,
        baths: item.baths || 0,
        area: item.area || 0,
        price: item.price || "0",
        image:
          item.image_url ||
          item.image ||
          "https://via.placeholder.com/400x300?text=No+Image",
        featured: item.featured || false,
      }));

      setProperties(formattedProperties);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Featured Properties</h2>
          <p className="text-gray-500 mt-2">
            Aliquam lacinia diam quis lacus euismod
          </p>
        </div>

        {/* Loading / Empty / Data */}
        {loading ? (
          <div className="text-center text-gray-500 text-lg">
            Loading properties...
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No properties found.
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              {properties.map((item, index) => (
                <PropertyCard key={item.id || index} property={item} />
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-black transition">
                View All Properties ↗
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FeaturedProperties;