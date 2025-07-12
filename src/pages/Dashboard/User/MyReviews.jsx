import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../api/useAxiosSecure";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure.get(`/my-reviews?email=${user.email}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.error("Failed to fetch reviews", err))
      .finally(() => setLoading(false));
  }, [user, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`)
          .then(() => {
            setReviews(reviews.filter(r => r._id !== id));
            Swal.fire("Deleted!", "Your review has been removed.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Could not delete the review.", "error");
          });
      }
    });
  };

  if (loading) return <p className="text-center my-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center">You haven’t reviewed any meals yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Meal Title</th>
                <th>Likes</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr key={review._id}>
                  <td>{index + 1}</td>
                  <td>{review.mealTitle}</td>
                  <td>{review.likes || 0}</td>
                  <td>{review.rating || 0}</td>
                  <td>{review.comment?.slice(0, 30)}...</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => setSelectedReview(review)}
                      className="btn btn-sm btn-info"
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(review._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Review Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50  bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-2">{selectedReview.mealTitle}</h3>
            <p><strong>Rating:</strong> {selectedReview.rating}</p>
            <p><strong>Likes:</strong> {selectedReview.likes || 0}</p>
            <p className="mt-3 text-gray-700"><strong>Comment:</strong><br /> {selectedReview.comment}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
