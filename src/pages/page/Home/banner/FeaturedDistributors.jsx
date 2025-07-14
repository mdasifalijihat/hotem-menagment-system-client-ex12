import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../api/useAxiosSecure";

const FeaturedDistributors = () => {
  const axiosSecure = useAxiosSecure();

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
    <section className="distributors my-8">
      <h2 className="text-2xl font-bold mb-4">Featured Distributors</h2>
      <ul className="list-disc pl-6 space-y-2">
        {data.map((distributor, idx) => (
          <li key={idx}>
            {distributor.distributor} ({distributor.mealsCount} meals)
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeaturedDistributors;
