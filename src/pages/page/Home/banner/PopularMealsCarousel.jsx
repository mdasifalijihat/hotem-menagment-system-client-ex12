import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
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
      <p className="text-center text-red-500 py-4">Failed to load popular meals.</p>
    );

  return (
    <section className="my-10 px-4 md:px-10 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        🍽️ Popular Meals
      </h2>

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
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
              <img
                src={meal.image}
                alt={meal.title}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{meal.title}</h3>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>❤️ Likes: {meal.likes}</p>
                  <p>⭐ Rating: {meal.rating.toFixed(1)}</p>
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
