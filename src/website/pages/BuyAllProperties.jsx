import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import { getPropertyItems } from "../services/propertyService";

function BuyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await getPropertyItems();

      const formatted = data.results.map((item) => {
        // 1️⃣ Thumbnail priority
        let image = item.thumbnail;

        // 2️⃣ If no thumbnail → use primary image
        if (!image && item.images.length > 0) {
          const primary = item.images.find((img) => img.is_primary);
          image = primary
            ? primary.image_url
            : item.images[0].image_url;
        }

        // 3️⃣ Final fallback
        if (!image) {
          image =
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800";
        }

        return {
          id: item.id,
          title: item.title,
          address: item.address,
          beds: item.bedrooms,
          baths: item.bathrooms,
          area: item.sqft,
          price: item.price,
          image: image,
          type: item.property_type,
        };
      });

      setProperties(formatted);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5f5f5] py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        
        {/* LEFT FILTER */}
        <div className="col-span-3 bg-white p-5 rounded-xl shadow-sm h-fit">
          
          <h3 className="font-semibold mb-4">⚙ Filters</h3>

          {/* Location */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Location</p>
            <input
              type="text"
              placeholder="Search location"
              className="w-full border p-2 rounded-md text-sm"
            />
          </div>

          {/* Categories */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Categories</p>
            <div className="space-y-2 text-sm">
              <label><input type="checkbox" /> Villas</label><br/>
              <label><input type="checkbox" /> Houses</label><br/>
              <label><input type="checkbox" /> Flats</label>
            </div>
          </div>

          {/* Sqft */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Sqft</p>
            <div className="space-y-2 text-sm">
              <label><input type="checkbox" /> 1000 - 1500</label><br/>
              <label><input type="checkbox" /> 1500 - 2000</label><br/>
              <label><input type="checkbox" /> 2000+</label>
            </div>
          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="col-span-9">
          
          {/* Header */}
          <h2 className="text-2xl font-semibold mb-4">
            Find Properties
          </h2>

          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search Here"
            className="w-full border p-3 rounded-lg mb-6"
          />

          <h3 className="font-medium mb-4">
            {loading ? "Loading..." : `${properties.length} Results`}
          </h3>

          {/* Grid */}
          {loading ? (
            <div className="text-gray-500">Loading properties...</div>
          ) : properties.length === 0 ? (
            <div className="text-gray-500">No properties found</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {properties.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default BuyProperties;