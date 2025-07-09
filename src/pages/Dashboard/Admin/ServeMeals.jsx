import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const ServeMeals = () => {
  const queryClient = useQueryClient();

  // Fetch requested meals from server
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['mealRequests'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/requested-meals`);
      return res.data.data;
    }
  });

  // Mutation to serve a meal
  const serveMealMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/requested-meals/serve/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Served!', 'Meal marked as delivered.', 'success');
      queryClient.invalidateQueries(['mealRequests']);
    }
  });

  const handleServe = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Mark this meal as delivered?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, serve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        serveMealMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center my-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Serve Requested Meals</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requested meals found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Meal Title</th>
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
                  <td>{req.mealTitle}</td>
                  <td>{req.userEmail}</td>
                  <td>{req.userName}</td>
                  <td>
                    <span className={`badge ${req.status === 'delivered' ? 'badge-success' : 'badge-warning'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === 'pending' ? (
                      <button
                        onClick={() => handleServe(req._id)}
                        className="btn btn-sm btn-primary"
                      >
                        Serve
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">Already served</span>
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
