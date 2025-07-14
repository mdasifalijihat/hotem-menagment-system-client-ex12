import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../api/useAxiosSecure";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [reviews, setReviews] = useState([]);

  // ✅ Fetch all meals with useQuery
  const {
    data: meals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allMeals");
      return res.data;
    },
  });

  // ✅ Delete meal handler
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This meal and its data will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/meals/${id}`);
        Swal.fire("Deleted!", "Meal has been deleted.", "success");
        refetch(); // ✅ Refresh meal list
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire("Error", "Failed to delete meal", "error");
      }
    }
  };

  // ✅ View reviews modal
  const handleViewReviews = async (meal) => {
    try {
      const res = await axiosSecure.get(`/meals/${meal._id}/reviews`);
      setSelectedMeal(meal);
      setReviews(res.data || []);
      document.getElementById("review_modal").showModal();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to load reviews", "error");
    }
  };

  // ✅ Loading spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Reviews (Meals Overview)</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Meal Title</th>
            <th className="border border-gray-300 px-4 py-2">Likes</th>
            <th className="border border-gray-300 px-4 py-2">Reviews</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meals.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No meals found
              </td>
            </tr>
          ) : (
            meals.map((meal) => (
              <tr key={meal._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {meal.title}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {meal.likes || 0}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {meal.reviews_count || 0}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleViewReviews(meal)}
                  >
                    View Reviews
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(meal._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 🔵 Review Modal */}
      <dialog id="review_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-2">
            Reviews for: {selectedMeal?.title}
          </h3>
          {reviews.length > 0 ? (
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {reviews.map((r) => (
                <div
                  key={r._id}
                  className="border p-3 rounded bg-gray-50 shadow-sm"
                >
                  <p className="text-sm text-gray-600">
                    <strong>{r.name}</strong> ({r.rating}/5)
                  </p>
                  <p className="text-gray-800">{r.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No reviews found.</p>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllReviews;
