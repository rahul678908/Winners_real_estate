import { Link } from "react-router-dom";
import { BedDouble, Bath, Square } from "lucide-react";

function PropertyCard({ property }) {
  return (
    <Link to={`/property/${property.id}`} className="block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 cursor-pointer group border border-gray-100">
        
        {/* Image */}
        <div className="relative h-60 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />

          {/* Type Badge */}
          {property.type && (
            <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full capitalize">
              {property.type}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold line-clamp-1">
            {property.title}
          </h3>

          <p className="text-sm text-gray-500 mt-1 line-clamp-1">
            {property.address}
          </p>

          <p className="text-xl font-bold text-black mt-3">
            ₹ {Number(property.price || 0).toLocaleString()}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-600 mt-4 flex-wrap">
            <span className="flex items-center gap-1">
              <BedDouble size={16} /> {property.beds ?? 0}
            </span>
            <span className="flex items-center gap-1">
              <Bath size={16} /> {property.baths ?? 0}
            </span>
            <span className="flex items-center gap-1">
              <Square size={16} /> {property.area ?? 0} sqft
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;