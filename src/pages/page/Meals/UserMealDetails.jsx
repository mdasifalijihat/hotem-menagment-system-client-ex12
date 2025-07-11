import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2";
import { FaHeart, FaRegHeart, FaCommentDots, FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../api/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const UserMealDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [meal, setMeal] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [hasRated, setHasRated] = useState(false);

  // Fetch meal details
  useEffect(() => {
    axiosSecure.get(`/addMeals/${id}`).then((res) => {
      setMeal(res.data);
      // Check if user already liked this meal
      if (user && res.data.likedUsers?.includes(user.email)) {
        setHasLiked(true);
      } else {
        setHasLiked(false);
      }
    });
  }, [id, axiosSecure, user]);

  // Fetch logged-in user's info (to verify subscription)
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => setUserInfo(res.data));
    }
  }, [user, axiosSecure]);

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await axiosSecure.get(`/meals/${id}/reviews`);
      setReviews(res.data || []);

      // Check if the current user has already submitted a review with a rating
      if (user?.email && res.data) {
        const currentUserReview = res.data.find(
          (review) => review.userEmail === user.email
        );
        if (currentUserReview && currentUserReview.rating !== undefined) {
          setHasRated(true);
        } else {
          setHasRated(false);
        }
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id, axiosSecure, user]);

  // Handle like button click
  const handleLike = async () => {
    if (!user) {
      return Swal.fire("Login Required", "Please login to like meals", "info");
    }

    if (hasLiked) return; // Prevent multiple likes

    try {
      await axiosSecure.patch(`/meals/${id}/like`, {
        email: user.email,
      });

      setMeal((prev) => ({
        ...prev,
        likes: (prev.likes || 0) + 1,
        likedUsers: prev.likedUsers
          ? [...prev.likedUsers, user.email]
          : [user.email],
      }));
      setHasLiked(true);
      Swal.fire("Liked!", "You have liked this meal.", "success");
    } catch (err) {
      console.error("Error liking meal", err);
      Swal.fire("Error", "Failed to like the meal", "error");
    }
  };

  // Handle meal request
  const handleRequest = async () => {
    if (!user) {
      return Swal.fire(
        "Login Required",
        "Please login to request meals",
        "info"
      );
    }

    if (userInfo?.status !== "active") {
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "You must be an active subscriber to request meals.",
        showConfirmButton: true,
        confirmButtonText: "Go to Membership Page",
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to membership section
          window.location.href = "/membershipSection";
        }
      });
      return;
    }

    const requestInfo = {
      mealId: id,
      userEmail: user.email,
      userName: user.displayName,
      status: "pending",
      requestedAt: new Date(),
      mealTitle: meal.title,
      mealImage: meal.image,
    };

    try {
      await axiosSecure.post("/meal-requests", requestInfo);
      Swal.fire("Requested!", "Meal request submitted successfully", "success");
    } catch (err) {
      console.error("Request failed", err);
      if (err.response && err.response.status === 409) {
        Swal.fire(
          "Already Requested",
          "You have already requested this meal.",
          "info"
        );
      } else {
        Swal.fire("Error", "Failed to request meal", "error");
      }
    }
  };



  // Submit a new review AND rating
  const handleReviewAndRatingSubmit = async () => {
    if (!user) {
      return Swal.fire(
        "Login Required",
        "Please login to post reviews",
        "info"
      );
    }

    if (!newComment.trim()) {
      return Swal.fire("Warning", "Comment cannot be empty", "warning");
    }
    if (newRating === 0) {
      return Swal.fire(
        "Warning",
        "Please select a rating (1-5 stars)",
        "warning"
      );
    }

    const review = {
      mealId: id,
      userEmail: user.email,
      userName: user.displayName,
      comment: newComment,
      photoURL: user.photoURL,
      postedAt: new Date(),
      rating: newRating,
    };

    try {
      await axiosSecure.post(`/meals/${id}/reviews`, review);
      Swal.fire(
        "Review & Rating Submitted!",
        "Your review and rating have been posted.",
        "success"
      );

      setNewComment("");
      setNewRating(0);
      fetchReviews();
      setHasRated(true);
    } catch (err) {
      console.error("Failed to post review", err);
      if (err.response && err.response.status === 409) {
        Swal.fire(
          "Already Reviewed",
          "You have already submitted a review for this meal.",
          "info"
        );
      } else {
        Swal.fire("Error", "Failed to post review and rating", "error");
      }
    }
  };

  if (!meal)
    return (
      <p className="text-center mt-10 text-lg text-gray-700">
        Loading meal details...
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl my-8">
      <div className="relative mb-6">
        <img
          src={meal.image}
          alt={meal.title}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        {/* Removed absolute positioning for like button from here */}
      </div>

      <div className="p-4">
        {/* Title and Like Button side-by-side */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-2">
          {" "}
          {/* Use flex-wrap for responsiveness */}
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {meal.title}
          </h2>
          <button
            onClick={handleLike}
            disabled={hasLiked}
            className={`btn btn-sm ${
              hasLiked ? "btn-error" : "btn-outline btn-info hover:text-red-500"
            } flex items-center gap-1`}
          >
            {hasLiked ? (
              <FaHeart className="text-xl" />
            ) : (
              <FaRegHeart className="text-xl" />
            )}
            <span className="text-lg font-semibold">
              Like ({meal.likes || 0})
            </span>
          </button>
        </div>

        <p className="text-lg text-gray-700 mb-2">
          Category: <span className="font-semibold">{meal.category}</span>
        </p>
        <p className="text-lg text-gray-700 mb-2">
          Price:{" "}
          <span className="font-semibold text-green-600">${meal.price}</span>
        </p>

        {/* Display Meal's Average Rating */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg text-gray-700">Average Rating:</span>
          <div className="rating rating-sm">
            {[...Array(5)].map((_, i) => (
              <input
                key={i}
                type="radio"
                name="meal-display-rating"
                className="mask mask-star-2 bg-yellow-400"
                checked={i + 1 <= Math.round(meal.rating || 0)}
                readOnly
              />
            ))}
          </div>
          <span className="text-gray-600">
            ({(meal.rating || 0).toFixed(1)} out of 5)
          </span>
        </div>

        <p className="text-gray-600 leading-relaxed mb-4">{meal.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="font-semibold text-gray-700">Ingredients:</span>
          {Array.isArray(meal.ingredients) ? (
            meal.ingredients.map((ing, i) => (
              <span
                key={i}
                className="badge badge-outline badge-info text-sm px-3 py-1.5"
              >
                {ing}
              </span>
            ))
          ) : (
            <span className="badge badge-outline badge-info text-sm px-3 py-1.5">
              {meal.ingredients}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Posted at: {new Date(meal.postTime).toLocaleString()}
        </p>

        <div className="text-sm text-gray-500 mb-6">
          Distributor:{" "}
          <span className="font-medium">
            {meal.distributor_name || meal.distributor || "N/A"}
          </span>{" "}
          (
          <span className="font-medium">
            {meal.distributor_email || meal.email || "N/A"}
          </span>
          )
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleRequest}
            className="btn btn-primary btn-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            Request Meal
          </button>
        </div>

        {/* Reviews and Comment Section */}
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={() => setShowComments(!showComments)}
            className="btn btn-ghost btn-block text-blue-600 hover:text-blue-700 justify-center items-center gap-2 text-lg"
          >
            <FaCommentDots className="text-2xl" />{" "}
            {showComments ? "Hide" : "Show"} Comments ({reviews.length})
          </button>

          {showComments && (
            <div className="mt-6 space-y-5">
              {reviews.length === 0 ? (
                <p className="text-center text-gray-500">
                  No reviews yet. Be the first to comment!
                </p>
              ) : (
                reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={
                          rev.photoURL ||
                          "https://www.gravatar.com/avatar/?d=mp"
                        }
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-300"
                      />
                      <div>
                        <span className="font-semibold text-gray-800">
                          {rev.userName}
                        </span>
                        <p className="text-xs text-gray-500">
                          {new Date(rev.postedAt).toLocaleString()}
                        </p>
                      </div>
                      {/* Display individual review rating */}
                      {rev.rating !== undefined && (
                        <div className="rating rating-xs ml-auto">
                          {[...Array(5)].map((_, i) => (
                            <input
                              key={i}
                              type="radio"
                              name={`review-rating-${idx}`}
                              className="mask mask-star-2 bg-yellow-400"
                              checked={i + 1 <= rev.rating}
                              readOnly
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 text-base">{rev.comment}</p>
                  </div>
                ))
              )}

              {/* New Comment and Rating Input Section */}
              <div className="mt-8 p-4 bg-white rounded-lg shadow-md border border-gray-200">
                <h4 className="text-xl font-semibold mb-4 text-gray-800">
                  Add Your Review & Rating
                </h4>

                {user ? (
                  hasRated ? (
                    <p className="text-center text-green-600 font-medium">
                      You have already submitted a review and rating for this
                      meal.
                    </p>
                  ) : (
                    <>
                      {/* Rating Input */}
                      <div className="form-control mb-4">
                        <label className="label">
                          <span className="label-text text-gray-700">
                            Your Rating:
                          </span>
                        </label>
                        <div className="rating rating-lg">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <input
                              key={star}
                              type="radio"
                              name="user-rating"
                              className="mask mask-star-2 bg-yellow-400"
                              onClick={() => setNewRating(star)}
                              checked={newRating === star}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Comment Textarea */}
                      <div className="form-control mb-4">
                        <label className="label">
                          <span className="label-text text-gray-700">
                            Your Comment:
                          </span>
                        </label>
                        <textarea
                          rows={3}
                          className="textarea textarea-bordered w-full resize-none focus:ring focus:ring-blue-200 focus:border-blue-400"
                          placeholder="Share your thoughts on this meal..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                      </div>
                      <button
                        onClick={handleReviewAndRatingSubmit}
                        className="btn btn-accent w-full text-lg"
                        disabled={!newComment.trim() || newRating === 0}
                      >
                        Submit Review & Rating
                      </button>
                    </>
                  )
                ) : (
                  <p className="text-center text-gray-500">
                    Please login to submit a review and rating.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMealDetails;
