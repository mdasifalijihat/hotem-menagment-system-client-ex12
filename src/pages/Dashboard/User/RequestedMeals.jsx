import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../api/useAxiosSecure";

const RequestedMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["myMealRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/requested-meals?email=${user.email}`);
      return res.data.data; // ✅ access .data from response
    },
  });

  if (isLoading) return <p className="text-center my-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🍱 My Requested Meals</h2>
      {meals.length === 0 ? (
        <p className="text-center text-gray-500">You haven't requested any meals yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Meal</th>
                <th>Title</th>
                <th>Status</th>
                <th>Requested At</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal, index) => (
                <tr key={meal._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={meal.mealImage}
                      alt={meal.mealTitle}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{meal.mealTitle}</td>
                  <td>
                    <span
                      className={`badge ${
                        meal.status === "delivered"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {meal.status}
                    </span>
                  </td>
                  <td>{new Date(meal.requestedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestedMeals;
