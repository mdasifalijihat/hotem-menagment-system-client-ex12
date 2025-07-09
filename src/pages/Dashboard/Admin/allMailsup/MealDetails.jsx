import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../api/useAxiosSecure";

const MealDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await axiosSecure.get(`/meals/${id}`);
        setMeal(res.data);
      } catch (error) {
        console.error("Error fetching meal details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id, axiosSecure]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">Loading...</div>
    );
  }

  if (!meal) {
    return (
      <div className="text-center mt-10 text-red-500">Meal not found!</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 shadow rounded">
      <img
        src={meal.image}
        alt={meal.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-3xl font-bold mb-2">{meal.title}</h2>
      <p className="mb-1">
        <strong>Category:</strong> {meal.category}
      </p>
      <p className="mb-1">
        <strong>Price:</strong> ${meal.price}
      </p>
      <p className="mb-1">
        <strong>Ingredients:</strong> {meal.ingredients}
      </p>
      <p className="mb-2">
        <strong>Description:</strong> {meal.description}
      </p>
      <p className="mb-1">
        <strong>Distributor:</strong> {meal.distributor}
      </p>
      <p className="mb-1">
        <strong>Email:</strong> {meal.email}
      </p>
      <p className="mb-1">
        <strong>Post Time:</strong> {meal.postTime}
      </p>
      <div className="mt-4 flex gap-4">
        <span className="badge badge-primary">Likes: {meal.likes}</span>
        <span className="badge badge-secondary">Reviews: {meal.reviews}</span>
        <span className="badge badge-accent">Rating: {meal.rating}</span>
      </div>
    </div>
  );
};

export default MealDetails;
