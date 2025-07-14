import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../api/useAxiosSecure";

const TopRatedMeals = () => {
  const axiosSecure = useAxiosSecure();

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
    <section className="top-rated my-8">
      <h2 className="text-2xl font-bold mb-4">Top Rated Meals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((meal) => (
          <div key={meal._id} className="meal-card p-4 border rounded shadow">
            <img
              src={meal.image}
              alt={meal.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">{meal.title}</h3>
            <p>Rating: {meal.rating.toFixed(1)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedMeals;
