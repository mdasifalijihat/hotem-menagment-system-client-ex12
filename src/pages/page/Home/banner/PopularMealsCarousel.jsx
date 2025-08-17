import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaHeart, FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useAxiosSecure from "../../../../api/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PopularMealsCarousel = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popularMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popular-meals");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center py-10">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 py-4">
        Failed to load popular meals.
      </p>
    );

  return (
    <section className="my-10 px-4 md:px-10 py-4">
      <h2 className="text-3xl font-bold text-center mb-6">🍽️ Popular Meals</h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {data.map((meal) => (
          <SwiperSlide key={meal._id}>
            <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-transform hover:scale-[1.03] mb-8">
              {/* Meal Image */}
              <img
                src={meal.image}
                alt={meal.title}
                className="w-full h-48 sm:h-56 object-cover"
              />

              {/* Content */}
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {meal.title}
                </h3>

                {/* Likes & Rating */}
                <div className="flex justify-between items-center text-gray-600 text-sm mt-2">
                  <span className="flex items-center gap-1">
                    <FaHeart className="text-red-500" /> {meal.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />{" "}
                    {meal.rating.toFixed(1)}
                  </span>
                </div>

                {/* Category / Price (Optional) */}
                <div className="flex justify-between items-center mt-2 text-gray-500 text-xs">
                  <span>{meal.category}</span>
                  <span>৳ {meal.price}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PopularMealsCarousel;
