import React from "react";
import { useQuery } from "@tanstack/react-query";
import Banner from "../banner/banner";
import TopRatedMeals from "../banner/TopRatedMeals";
import FeaturedDistributors from "../banner/FeaturedDistributors";
import PopularMealsCarousel from "../banner/PopularMealsCarousel";
import MealOfTheDay from "../banner/MealOfTheDay";
import Testimonials from "../banner/Testimonials";
import StatsCounter from "../banner/StatsCounter";
import useAxiosSecure from "../../../../api/useAxiosSecure";

const Home = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: mealOfTheDay,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["mealOfTheDay"],
    queryFn: async () => {
      const res = await axiosSecure.get("/meal-of-the-day");
      return res.data;
    },
  });

  const testimonials = [
    {
      id: 1,
      name: "Rahim",
      feedback: "The meals here are delicious and the service is excellent!",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Sumi",
      feedback: "I love the variety of meals. The admin is very helpful.",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Kamal",
      feedback: "Great place to find healthy and tasty meals.",
      avatar: "https://randomuser.me/api/portraits"      
    },
      {
    id: 3,
    name: "Tanvir",
    role: "Teacher",
    feedback: "Healthy meals, quick service, and great quality overall!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },

  ];

  return (
    <div className="container mx-auto px-4 py-4">
      <Banner />
      <PopularMealsCarousel />

      {/*  Proper loading state */}
      {isPending && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}

      {/*  Error handling */}
      {isError && (
        <p className="text-red-500 text-center">Error: {error.message}</p>
      )}

      {/*  Show Meal of the Day if available */}
      {mealOfTheDay && <MealOfTheDay meal={mealOfTheDay} />}

      <TopRatedMeals />
      <StatsCounter />
      <FeaturedDistributors />
      <Testimonials testimonials={testimonials} />
    </div>
  );
};

export default Home;
