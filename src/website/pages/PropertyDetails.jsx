import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyDetail } from "../services/propertyService";
import AuthModal from "./AuthModal";
import {
  BedDouble,
  Bath,
  Square,
  MapPin,
  Car,
  Sofa,
  PlayCircle,
  ExternalLink,
} from "lucide-react";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    fetchPropertyDetail();
  }, [id]);

  const fetchPropertyDetail = async () => {
    try {
      setLoading(true);

      // ✅ CHECK TOKEN FIRST
      const token = localStorage.getItem("user_access_token");

      if (!token) {
        setAuthMessage("You are not logged in. Please login to view more details.");
        setShowAuthModal(true);
        setProperty(null);
        return;
      }

      // ✅ IF TOKEN EXISTS, FETCH DETAIL
      const data = await getPropertyDetail(id);
      setProperty(data);

      // Default selected image
      let defaultImage = data.thumbnail;

      if (!defaultImage && data.images?.length > 0) {
        const primary = data.images.find((img) => img.is_primary);
        defaultImage = primary ? primary.image_url : data.images[0].image_url;
      }

      setSelectedImage(defaultImage);
    } catch (error) {
      console.error("Failed to fetch property detail:", error);

      if (error.response?.status === 401) {
        setAuthMessage("You are not logged in. Please login to view more details.");
        setShowAuthModal(true);
      } else if (error.response?.status === 404) {
        setProperty(null);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500 text-lg">
        Loading property details...
      </div>
    );
  }

  // ✅ If user not logged in
  if (!property && showAuthModal) {
    return (
      <>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          message={authMessage}
        />

        <div className="min-h-screen flex items-center justify-center px-4 bg-[#f7f7f7]">
          <div className="bg-white shadow-md rounded-2xl p-8 max-w-lg text-center">
            <h2 className="text-2xl font-bold text-black mb-3">
              Login Required
            </h2>
            <p className="text-gray-600 mb-6">
              You are not logged in. Please login to view more details.
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition"
            >
              Login Now
            </button>
          </div>
        </div>
      </>
    );
  }

  // ✅ If property not found
  if (!property) {
    return (
      <div className="py-20 text-center text-red-500 text-lg">
        Property not found.
      </div>
    );
  }

  return (
    <>
      {/* AUTH MODAL */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        message={authMessage}
      />

      <div className="bg-[#f7f7f7] min-h-screen py-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-8">

              {/* Main Image */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <img
                  src={selectedImage}
                  alt={property.title}
                  className="w-full h-[450px] object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              {property.images?.length > 0 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {property.images.map((img) => (
                    <img
                      key={img.id}
                      src={img.image_url}
                      alt="Property"
                      onClick={() => setSelectedImage(img.image_url)}
                      className={`w-28 h-20 object-cover rounded-xl cursor-pointer border-2 transition ${
                        selectedImage === img.image_url
                          ? "border-black"
                          : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 leading-7">
                  {property.description || "No description available."}
                </p>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">
                  Property Features
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <BedDouble size={18} /> {property.bedrooms} Bedrooms
                  </div>

                  <div className="flex items-center gap-2">
                    <Bath size={18} /> {property.bathrooms} Bathrooms
                  </div>

                  <div className="flex items-center gap-2">
                    <Square size={18} /> {property.sqft} sqft
                  </div>

                  <div className="flex items-center gap-2">
                    <Car size={18} />{" "}
                    {property.parking ? "Parking Available" : "No Parking"}
                  </div>

                  <div className="flex items-center gap-2">
                    <Sofa size={18} />{" "}
                    {property.furnished ? "Furnished" : "Unfurnished"}
                  </div>

                  <div className="flex items-center gap-2 capitalize">
                    {property.listing_type}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">

                <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
                  For {property.listing_type}
                </p>

                <h1 className="text-3xl font-bold mb-3">{property.title}</h1>

                <p className="text-2xl font-semibold text-black mb-4">
                  ₹ {Number(property.price).toLocaleString()}
                </p>

                <div className="flex items-start gap-2 text-gray-600 mb-6">
                  <MapPin size={18} className="mt-1" />
                  <span>{property.address}</span>
                </div>

                <div className="border-t border-b py-4 space-y-3 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Listing Type</span>
                    <span className="capitalize font-medium">
                      {property.listing_type}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Bedrooms</span>
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Bathrooms</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Area</span>
                    <span className="font-medium">{property.sqft} sqft</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 space-y-3">
                  {property.map_link && (
                    <a
                      href={property.map_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition"
                    >
                      <ExternalLink size={18} />
                      Open Location
                    </a>
                  )}

                  {property.video_url && (
                    <a
                      href={property.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition"
                    >
                      <PlayCircle size={18} />
                      Watch Video Tour
                    </a>
                  )}

                  <button className="w-full bg-[#c89b6d] text-white py-3 rounded-xl hover:opacity-90 transition">
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyDetails;