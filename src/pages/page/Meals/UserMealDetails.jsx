// src/pages/UserMealDetails/UserMealDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../api/useAxiosSecure";

const UserMealDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/addMeals/${id}`).then((res) => {
      setMeal(res.data);
    });
  }, [axiosSecure, id]);

  if (!meal) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow my-8">
      <img
        src={meal.image}
        alt={meal.title}
        className="w-full h-60 sm:h-72 md:h-80 lg:h-[400px] object-cover rounded-md mb-4"
      />
      <h2 className="text-3xl font-bold mb-2">{meal.title}</h2>
      <p className="text-gray-600 mb-2">Category: {meal.category}</p>
      <p className="text-gray-800 mb-2">Price: ${meal.price}</p>
      <p className="text-gray-800 mb-2">Rating: {meal.rating}</p>
      <p className="text-gray-600 mb-4">{meal.description}</p>
      <div className="text-sm text-gray-500">
        Distributor: {meal.distributor_name} ({meal.distributor_email})
      </div>
    </div>
  );
};

export default UserMealDetails;
