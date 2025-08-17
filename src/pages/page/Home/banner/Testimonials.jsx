import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import "swiper/css";

const Testimonials = ({ testimonials }) => {
  return (
    <section className="testimonials p-10 my-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        What Students Say
      </h2>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000 }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map(({ id, name, role, feedback, avatar, rating }) => (
          <SwiperSlide
            key={id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition"
          >
            {/* Quote Icon */}
            <FaQuoteLeft className="text-blue-400 text-3xl mb-4" />

            {/* Feedback */}
            <p className="italic text-gray-600 mb-4">"{feedback}"</p>

            {/* Avatar */}
            <img
              src={avatar}
              alt={name}
              className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 mb-3"
            />

            {/* Name + Role */}
            <h3 className="font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">{role}</p>

            {/* Rating */}
            <div className="flex justify-center mt-2 text-yellow-400">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"} />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
