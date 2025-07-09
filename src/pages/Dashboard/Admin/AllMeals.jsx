import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../api/useAxiosSecure";

const AllMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [meals, setMeals] = useState([]);
  const [sortBy, setSortBy] = useState("");

  // Fetch meals from server
  const fetchMeals = async () => {
    try {
      const res = await axiosSecure.get(`/allMeals?sortBy=${sortBy}`);
      setMeals(res.data);
    } catch (error) {
      console.error("Error fetching meals:", error);
      Swal.fire("Error", "Could not fetch meals", "error");
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [sortBy]);

  // Handle delete
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
        fetchMeals();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete meal", "error");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">All Meals</h2>

      <div className="mb-4 flex flex-col md:flex-row gap-3 justify-between items-center">
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
            Reviews Count
          </button>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setSortBy("")}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Meal Title</th>
              <th>Likes</th>
              <th>Reviews Count</th>
              <th>Rating</th>
              <th>Distributor</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, index) => (
              <tr key={meal._id}>
                <th>{index + 1}</th>
                <td>{meal.title}</td>
                <td>{meal.likes}</td>
                <td>{meal.reviews}</td>
                <td>{meal.rating}</td>
                <td>{meal.distributor}</td>
                <td className="flex flex-wrap gap-2 justify-center">
                  <Link to={`/dashboard/updateMeal/${meal._id}`}>
                    <button className="btn btn-xs btn-warning">Update</button>
                  </Link>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(meal._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/meal/${meal._id}`}>
                    <button className="btn btn-xs btn-info">View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {meals.length === 0 && (
          <div className="text-center text-gray-500 py-6">No meals found.</div>
        )}
      </div>
    </div>
  );
};

export default AllMeals;
