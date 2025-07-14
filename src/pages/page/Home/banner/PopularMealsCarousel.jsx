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
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["popularMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popular-meals"); // backend route needed
      return res.data;
    },
  });

  if (isLoading) return <p>Loading popular meals...</p>;
  if (isError) return <p>Error loading popular meals.</p>;

  return (
    <section className="popular-meals my-8">
      <h2 className="text-2xl font-bold mb-4">Popular Meals</h2>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {data.map((meal) => (
          <SwiperSlide key={meal._id}>
            <div className="meal-card p-4 border rounded shadow">
              <img
                src={meal.image}
                alt={meal.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{meal.title}</h3>
              <p>Likes: {meal.likes}</p>
              <p>Rating: {meal.rating.toFixed(1)}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PopularMealsCarousel;
