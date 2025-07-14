import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../api/useAxiosSecure";

const AllMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [sortBy, setSortBy] = useState("");

  // ✅ Fetch meals using react-query
  const {
    data: meals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allMeals", sortBy],
    queryFn: async () => {
      const url = sortBy ? `/allMeals?sortBy=${sortBy}` : `/allMeals`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This meal will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/meals/${id}`);
        Swal.fire("Deleted!", "Meal has been deleted.", "success");
        refetch(); // ✅ Refresh data
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete meal", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">All Meals</h2>

      <div className="mb-6 flex flex-col md:flex-row gap-3 justify-between items-center">
        <div className="text-lg font-semibold">Sort By:</div>
        <div className="flex gap-2">
          <button
            className={`btn btn-sm ${
              sortBy === "likes" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setSortBy("likes")}
          >
            Likes
          </button>
          <button
            className={`btn btn-sm ${
              sortBy === "reviews" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setSortBy("reviews")}
          >
            Reviews
          </button>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setSortBy("")}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Meal Title</th>
              <th>Likes</th>
              <th>Reviews</th>
              <th>Rating</th>
              <th>Distributor</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meals.length > 0 ? (
              meals.map((meal, index) => (
                <tr key={meal._id}>
                  <th>{index + 1}</th>
                  <td className="font-medium">{meal.title}</td>
                  <td>
                    <span className="badge badge-primary">{meal.likes}</span>
                  </td>
                  <td>
                    <span className="badge badge-secondary">
                      {meal.reviews || meal.reviews_count || 0}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-accent">
                      {meal.rating?.toFixed(1) || "0.0"}
                    </span>
                  </td>
                  <td>{meal.distributor}</td>
                  <td>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Link to={`/adminDashboard/updateMeal/${meal._id}`}>
                        <button className="btn btn-xs btn-warning">
                          Update
                        </button>
                      </Link>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleDelete(meal._id)}
                      >
                        Delete
                      </button>
                      <Link to={`/adminDashboard/meal/${meal._id}`}>
                        <button className="btn btn-xs btn-info">View</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-6">
                  No meals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMeals;
