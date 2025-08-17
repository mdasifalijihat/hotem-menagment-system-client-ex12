import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../api/useAxiosSecure";
import { FaUserTie, FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router";

const FeaturedDistributors = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["featuredDistributors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-distributors");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading featured distributors...</p>;
  if (isError) return <p>Error loading distributors.</p>;

  return (
    <section className="my-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Distributors
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.map((distributor, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md border-t-4 border-blue-500 
                       p-6 flex flex-col items-center text-center 
                       hover:shadow-2xl hover:scale-105 transition transform duration-300"
          >
            {/* Icon */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-4xl p-4 rounded-full shadow-md mb-4">
              <FaUserTie />
            </div>

            {/* Distributor Name */}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {distributor.distributor}
            </h3>

            {/* Meals Count */}
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full mb-4">
              <FaUtensils /> {distributor.mealsCount} Meals
            </span>

            {/* Button */}
            <button
              onClick={() => navigate(`/meals`)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 
                         text-white px-6 py-2 rounded-lg font-medium transition transform hover:scale-105"
            >
              View Meals
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDistributors;
