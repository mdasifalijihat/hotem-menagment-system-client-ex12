import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaThumbsUp } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../api/useAxiosSecure";

const UpcomingMeal = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch upcoming meals
  const {
    data: meals = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/upcoming-meals");
      return res.data;
    },
  });

  // ✅ Publish meal mutation
  const publishMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/upcoming-meals/${id}/publish`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Published!", "Meal is now live.", "success");
      queryClient.invalidateQueries(["upcomingMeals"]);
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong.", "error");
    },
  });

  // ✅ Confirm and publish
  const handlePublish = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to publish this meal?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Publish it!",
    });

    if (confirm.isConfirmed) {
      publishMutation.mutate(id);
    }
  };

  // ✅ Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load meals: {error.message}
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <div
          key={meal._id}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
        >
          <img
            src={meal.image}
            alt={meal.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">{meal.title}</h2>
            <p className="text-gray-600">Category: {meal.category}</p>
            <p className="text-gray-600">
              Post Time: {new Date(meal.postTime).toLocaleString()}
            </p>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1 text-gray-700">
                <FaThumbsUp className="text-blue-500" /> {meal.likes}
              </p>
              <button
                onClick={() => handlePublish(meal._id)}
                className="btn btn-sm btn-success text-white"
                disabled={publishMutation.isLoading}
              >
                {publishMutation.isLoading ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingMeal;
