import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../api/useAxiosSecure";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useNavigate } from "react-router-dom";

const Meals = () => {
  const axiosSecure = useAxiosSecure();
  const [filteredMeals, setFilteredMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    all: [],
  });

  const [showAll, setShowAll] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get("/addMeals").then((res) => {
      setFilteredMeals({
        breakfast: res.data.filter((meal) => meal.category === "Breakfast"),
        lunch: res.data.filter((meal) => meal.category === "Lunch"),
        dinner: res.data.filter((meal) => meal.category === "Dinner"),
        all: res.data,
      });
    });
  }, [axiosSecure]);

  const renderMealCards = (mealsArray, category) => {
    const isExpanded = showAll[category];
    const displayMeals = category
      ? isExpanded
        ? mealsArray
        : mealsArray.slice(0, 3)
      : mealsArray;

    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {displayMeals.map((meal) => (
            <div key={meal._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={meal.image}
                  alt={meal.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{meal.title}</h2>

                <div className="flex items-center justify-between text-sm mt-1">
                  <p>
                    ⭐ {meal.rating ? meal.rating.toFixed(1) : "N/A"} (
                    {meal.reviews_count || 0} reviews)
                    <span className="text-red-500 mt-2">Like: {meal.likes || 0}</span>
                  </p>
                </div>

                <p className="mt-2 text-base text-gray-700 font-medium">
                  Price: ${meal.price.toFixed(2)}
                </p>

                <div className="card-actions justify-end mt-3">
                  <button
                    onClick={() => navigate(`/meals/${meal._id}`)}
                    className="btn btn-primary btn-sm"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {category && mealsArray.length > 3 && (
          <div className="text-center mt-4">
            <button
              onClick={() =>
                setShowAll((prev) => ({ ...prev, [category]: !prev[category] }))
              }
              className="btn btn-sm btn-outline"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Meals by Category</h2>
      <Tabs>
        <TabList className="tabs tabs-boxed justify-center">
          <Tab className="tab">Breakfast</Tab>
          <Tab className="tab">Lunch</Tab>
          <Tab className="tab">Dinner</Tab>
          <Tab className="tab">All Meals</Tab>
        </TabList>

        <TabPanel>
          {renderMealCards(filteredMeals.breakfast, "breakfast")}
        </TabPanel>
        <TabPanel>{renderMealCards(filteredMeals.lunch, "lunch")}</TabPanel>
        <TabPanel>{renderMealCards(filteredMeals.dinner, "dinner")}</TabPanel>
        <TabPanel>{renderMealCards(filteredMeals.all)}</TabPanel>
      </Tabs>
    </div>
  );
};

export default Meals;
