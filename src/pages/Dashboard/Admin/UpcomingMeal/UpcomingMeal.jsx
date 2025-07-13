import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../api/useAxiosSecure";

const UpcomingMeal = () => {
  const axiosSecure = useAxiosSecure();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axiosSecure.get("/upcoming-meals").then((res) => {
      setMeals(res.data);
    });
  }, [axiosSecure]);

  const handlePublish = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to publish this meal?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Publish it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/upcoming-meals/${id}/publish`);
        if (res.data.success) {
          Swal.fire("Published!", "Meal is now live.", "success");
          setMeals((prev) => prev.filter((meal) => meal._id !== id));
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <div
          key={meal._id}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
        >
          <img
            src={meal.image}
            alt={meal.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">{meal.title}</h2>
            <p className="text-gray-600">Category: {meal.category}</p>
            <p className="text-gray-600">
              Post Time: {new Date(meal.postTime).toLocaleString()}
            </p>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1 text-gray-700">
                <FaThumbsUp className="text-blue-500" /> {meal.likes}
              </p>
              <button
                onClick={() => handlePublish(meal._id)}
                className="btn btn-sm btn-success text-white"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingMeal;
