import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../api/useAxiosSecure";

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch all requested meals
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["mealRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requested-meals-admin");
      return res.data.data; // ✅ Correctly return the array
    },
  });

  // ✅ Mutation to mark meal as delivered
  const serveMealMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/requested-meals/serve/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("✅ Served!", "Meal marked as delivered.", "success");
      queryClient.invalidateQueries(["mealRequests"]);
    },
    onError: () => {
      Swal.fire("❌ Failed!", "Could not serve the meal.", "error");
    },
  });

  const handleServe = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Mark this meal as delivered?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, serve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        serveMealMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        🍽 Serve Requested Meals
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requested meals found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Meal</th>
                <th>Title</th>
                <th>User Email</th>
                <th>User Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={req.mealImage || "/default.png"}
                      alt={req.mealTitle}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td>{req.mealTitle}</td>
                  <td>{req.userEmail}</td>
                  <td>{req.userName}</td>
                  <td>
                    <span
                      className={`badge ${
                        req.status === "delivered"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === "pending" ? (
                      <button
                        onClick={() => handleServe(req._id)}
                        disabled={serveMealMutation.isLoading}
                        className="btn btn-sm btn-primary"
                      >
                        {serveMealMutation.isLoading ? "Serving..." : "Serve"}
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">
                        ✅ Already served
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServeMeals;
