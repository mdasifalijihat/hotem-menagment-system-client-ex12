import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../api/useAxiosSecure";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";

const TopRatedMeals = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["topRatedMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-rated-meals");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading top rated meals...</p>;
  if (isError) return <p>Error loading top rated meals.</p>;

  return (
    <section className="top-rated my-12">
      <h2 className="text-3xl font-bold text-center mb-10">Top Rated Meals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.map((meal, index) => (
          <div
            key={meal._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden text-center hover:shadow-xl transition"
          >
            {/* Product Image */}
            <div className="w-full flex items-center justify-center bg-gray-50">
              <img
                src={meal.image}
                alt={meal.title}
                className="w-full h-64  object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="p-5">
              <h3 className="text-lg font-bold uppercase text-gray-800">
                {meal.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {meal.description.length > 50
                  ? meal.description.slice(0, 50) + "..."
                  : meal.description}
              </p>

              {/* Price */}
              <p className="mt-3 text-xl font-semibold text-green-600">
                ${meal.price}
              </p>

              {/* Rating */}
              <div className="flex justify-center items-center mt-2 text-yellow-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={i < meal.rating ? "text-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>

            {/* Details Button */}
            <button
              onClick={() => navigate(`/meals/${meal._id}`)}
              className={`w-full py-2 font-semibold text-white rounded-b-lg transition ${
                index % 3 === 0
                  ? "bg-green-500 hover:bg-green-600"
                  : index % 3 === 1
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedMeals;
