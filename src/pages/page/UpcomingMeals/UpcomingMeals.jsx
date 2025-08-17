import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaThumbsUp } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../api/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const UpcomingMeals = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // ✅ Fetch upcoming meals
  const {
    data: meals = [],
    isLoading: mealsLoading,
    isError: mealsError,
  } = useQuery({
    queryKey: ["upcoming-meals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/upcoming-meals");
      return res.data;
    },
  });

  // ✅ Fetch user package info
  const { data: userInfo, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const userPackage = userInfo?.badge || "Bronze";

  // ✅ Mutation for liking a meal
  const likeMutation = useMutation({
    mutationFn: async (mealId) => {
      const res = await axiosSecure.patch(`/upcoming-meals/${mealId}/like`, {
        email: user.email,
      });
      return res.data;
    },
    onSuccess: (data, mealId) => {
      // Directly update the local cache (no full re-fetch needed)
      queryClient.setQueryData(["upcoming-meals"], (old) =>
        old.map((meal) =>
          meal._id === mealId
            ? {
                ...meal,
                likes: meal.likes + 1,
                likedUsers: [...(meal.likedUsers || []), user.email],
              }
            : meal
        )
      );
      Swal.fire("Liked!", "You have liked this meal.", "success");
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        Swal.fire("Already Liked", "You already liked this meal", "info");
      } else {
        Swal.fire("Error", "Failed to like the meal", "error");
      }
    },
  });

  const handleLike = (mealId) => {
    if (!user) {
      return Swal.fire("Login Required", "Please login to like meals", "info");
    }

    if (!["Basic", "Standard", "Premium"].includes(userPackage)) {
      return Swal.fire(
        "Upgrade Required",
        "Only premium users can like meals",
        "warning"
      );
    }

    likeMutation.mutate(mealId);
  };

  if (mealsLoading || userLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (mealsError) {
    return (
      <div className="text-center text-red-500">Failed to load meals.</div>
    );
  }

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <div
          key={meal._id}
          className="rounded-2xl shadow-lg bg-gradient-to-b from-yellow-50 to-white overflow-hidden hover:shadow-xl transition"
        >
          {/* Top Image */}
          <div className="bg-yellow-100 flex justify-center p-4">
            <img
              src={meal.image}
              alt={meal.title}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
          </div>

          {/* Content */}
          <div className="bg-white rounded-t-3xl -mt-4 p-5 space-y-2">
            <h2 className="text-lg font-bold text-gray-800 text-center">
              {meal.title}
            </h2>

            <p className="text-gray-600 text-center">{meal.description}</p>

            <p className="text-gray-500 text-sm pl-4">
              Category: {meal.category}
            </p>

            <p className="text-gray-500 text-xs pl-4">
              Posted: {new Date(meal.postTime).toLocaleString()}
            </p>

            <p className="text-gray-500 text-xs pl-4">
              Distributor: {meal.distributor}
            </p>

            {/* Likes & Actions
            <div className="flex justify-center items-center gap-3 mt-3">
              <span className="flex items-center gap-1 text-blue-600 font-medium">
                <FaThumbsUp /> {meal.likes}
              </span>

              {["Silver", "Gold", "Platinum"].includes(userPackage) &&
                !meal.likedUsers?.includes(user?.email) && (
                  <button
                    onClick={() => handleLike(meal._id)}
                    className="px-3 py-1 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition text-sm"
                  >
                    Like
                  </button>
                )}

              {meal.likedUsers?.includes(user?.email) && (
                <span className="text-sm text-green-600 font-medium">
                  Liked ✔
                </span>
              )}
            </div> */}

            {/* Likes & Actions */}
            <div className="flex justify-center items-center gap-3 mt-3">
              <span className="flex items-center gap-1 text-blue-600 font-medium">
                <FaThumbsUp /> {meal.likes}
              </span>

              {/* Like Button */}
              {!meal.likedUsers?.includes(user?.email) ? (
                <button
                  onClick={() => handleLike(meal._id)}
                  className="px-3 py-1 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition text-sm"
                >
                  Like
                </button>
              ) : (
                <button
                  disabled
                  className="px-3 py-1 rounded-xl border border-green-500 bg-green-500 text-white text-sm cursor-not-allowed"
                >
                  Liked ✔
                </button>
              )}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingMeals;
