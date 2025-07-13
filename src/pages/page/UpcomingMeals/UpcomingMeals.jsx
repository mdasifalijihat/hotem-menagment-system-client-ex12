import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../api/useAxiosSecure";
import { FaThumbsUp } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const UpcomingMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [meals, setMeals] = useState([]);
  const { user } = useAuth();
  const [userPackage, setUserPackage] = useState("");

  useEffect(() => {
    // Fetch all upcoming meals
    axiosSecure.get("/upcoming-meals").then((res) => {
      setMeals(res.data);
    });

    // Fetch user info to check package
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setUserPackage(res.data?.badge || "Bronze");
      });
    }
  }, [axiosSecure, user?.email]);

  const handleLike = async (mealId) => {
    if (!user) {
      return Swal.fire("Login Required", "Please login to like meals", "info");
    }

    if (!["Silver", "Gold", "Platinum"].includes(userPackage)) {
      return Swal.fire(
        "Upgrade Required",
        "Only premium users can like meals",
        "warning"
      );
    }

    try {
      const res = await axiosSecure.patch(`/upcoming-meals/${mealId}/like`, {
        email: user.email,
      });

      if (res.data?.success) {
        Swal.fire("Liked!", "You have liked this meal.", "success");
        // Update UI
        setMeals((prev) =>
          prev.map((meal) =>
            meal._id === mealId
              ? {
                  ...meal,
                  likes: meal.likes + 1,
                  likedUsers: [...meal.likedUsers, user.email],
                }
              : meal
          )
        );
      }
    } catch (err) {
      if (err.response?.status === 409) {
        Swal.fire("Already Liked", "You already liked this meal", "info");
      } else {
        Swal.fire("Error", "Failed to like the meal", "error");
      }
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <div
          key={meal._id}
          className="bg-white rounded-2xl shadow hover:shadow-md"
        >
          <img
            src={meal.image}
            alt={meal.title}
            className="w-full h-48 object-cover rounded-t-2xl"
          />
          <div className="p-4 space-y-1">
            <h2 className="text-xl font-bold">{meal.title}</h2>
            <p className="text-gray-600">Category: {meal.category}</p>
            <p className="text-gray-500 text-sm">
              Post Time: {new Date(meal.postTime).toLocaleString()}
            </p>

            <div className="flex items-center justify-between mt-2">
              <span className="flex items-center gap-1 text-blue-600 font-medium">
                <FaThumbsUp /> {meal.likes}
              </span>

              {["Silver", "Gold", "Platinum"].includes(userPackage) &&
                !meal.likedUsers?.includes(user?.email) && (
                  <button
                    onClick={() => handleLike(meal._id)}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Like
                  </button>
                )}

              {meal.likedUsers?.includes(user?.email) && (
                <span className="text-sm text-green-600">Liked ✔</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingMeals;
