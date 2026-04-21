import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import {
  getPropertySubmissionDetail,
  markSubmissionInReview,
  markSubmissionComplete,
  publishSubmission,
} from "../services/propertySubmissionService";

export default function PropertySubmissionDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await getPropertySubmissionDetail(id);
      setProperty(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= STATUS BADGE =================

  const getStatusStyle = (status) => {
    switch (status) {
      case "new":
        return "bg-gray-100 text-gray-700";
      case "in_review":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "approved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  // ================= CONFIRM ACTION =================

  const confirmAction = async (title, actionFn) => {
    const result = await Swal.fire({
      title,
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      try {
        await actionFn();
        Swal.fire("Success", "Action completed", "success");
        fetchDetail();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };

  // ================= ACTION HANDLERS =================

  const handleReview = () =>
    confirmAction("Mark as In Review?", () =>
      markSubmissionInReview(property.id)
    );

  const handleComplete = () =>
    confirmAction("Mark as Completed?", () =>
      markSubmissionComplete(property.id)
    );

  const handlePublish = () =>
    confirmAction("Publish this property?", () =>
      publishSubmission(property.id)
    );

  // ================= UI =================

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!property) return <div className="p-6 text-center">No data</div>;

  return (
    <div className="p-6 space-y-6">

      {/* TITLE */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          {property.title}
        </h1>
        <p className="text-slate-500">{property.address}</p>
      </div>

      {/* STATUS BADGE */}
      <span
        className={`inline-block px-3 py-1 text-sm rounded ${getStatusStyle(
          property.status
        )}`}
      >
        {property.status}
      </span>

      {/* IMAGES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {property.images?.map((img) => (
          <img
            key={img.id}
            src={img.image_url}
            className="w-full h-40 object-cover rounded-xl"
          />
        ))}
      </div>

      {/* DESCRIPTION */}
      <div>
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="text-slate-600">{property.description}</p>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <p><b>Price:</b> ₹ {property.price}</p>
        <p><b>Bedrooms:</b> {property.bedrooms}</p>
        <p><b>Bathrooms:</b> {property.bathrooms}</p>
        <p><b>Sqft:</b> {property.sqft}</p>
        <p><b>Parking:</b> {property.parking ? "Yes" : "No"}</p>
        <p><b>Furnished:</b> {property.furnished}</p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-3 mt-6">

        {/* REVIEW */}
        <button
          disabled={property.status !== "new"}
          onClick={handleReview}
          className={`px-5 py-2 rounded-xl text-white transition ${
            property.status === "new"
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Mark In Review
        </button>

        {/* COMPLETE */}
        <button
          disabled={property.status !== "in_review"}
          onClick={handleComplete}
          className={`px-5 py-2 rounded-xl text-white transition ${
            property.status === "in_review"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Mark Complete
        </button>

        {/* PUBLISH */}
        <button
          disabled={property.status !== "completed"}
          onClick={handlePublish}
          className={`px-5 py-2 rounded-xl text-white transition ${
            property.status === "completed"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Publish
        </button>

      </div>

    </div>
  );
} 