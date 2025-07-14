import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../api/useAxiosSecure";
import { FaMoneyBill, FaUtensils, FaStar } from "react-icons/fa";

const DashboardUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ✅ Query: Payments
  const { data: payments = [], isLoading: loadingPayments } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  // ✅ Query: Reviews
  const { data: reviews = [], isLoading: loadingReviews } = useQuery({
    queryKey: ["my-reviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-reviews?email=${user.email}`);
      return res.data;
    },
  });

  // ✅ Query: Meal Requests
  const { data: meals = [], isLoading: loadingMeals } = useQuery({
    queryKey: ["myMealRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/requested-meals?email=${user.email}`);
      return res.data?.data || [];
    },
  });

  const isLoading = loadingPayments || loadingReviews || loadingMeals;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Payment Card */}
      <div className="card bg-gradient-to-r from-green-100 to-green-300 shadow-xl text-center p-6">
        <div className="text-4xl text-green-600 mb-2 mx-auto">
          <FaMoneyBill />
        </div>
        <h2 className="text-2xl font-bold">Total Payments</h2>
        <p className="text-3xl font-extrabold text-green-800 mt-2">{payments.length}</p>
      </div>

      {/* Meal Request Card */}
      <div className="card bg-gradient-to-r from-yellow-100 to-yellow-300 shadow-xl text-center p-6">
        <div className="text-4xl text-yellow-600 mb-2 mx-auto">
          <FaUtensils />
        </div>
        <h2 className="text-2xl font-bold">Requested Meals</h2>
        <p className="text-3xl font-extrabold text-yellow-800 mt-2">{meals.length}</p>
      </div>

      {/* Review Card */}
      <div className="card bg-gradient-to-r from-blue-100 to-blue-300 shadow-xl text-center p-6">
        <div className="text-4xl text-blue-600 mb-2 mx-auto">
          <FaStar />
        </div>
        <h2 className="text-2xl font-bold">My Reviews</h2>
        <p className="text-3xl font-extrabold text-blue-800 mt-2">{reviews.length}</p>
      </div>
    </div>
  );
};

export default DashboardUser;
