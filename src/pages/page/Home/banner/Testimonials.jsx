import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Testimonials = ({ testimonials }) => {
  return (
    <section className="testimonials p-8 my-8 bg-white rounded shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">What Students Say</h2>
      <Swiper spaceBetween={20} slidesPerView={1} loop autoplay={{ delay: 4000 }}>
        {testimonials.map(({ id, name, feedback, avatar }) => (
          <SwiperSlide key={id} className="p-6 border rounded">
            <p className="italic mb-4">"{feedback}"</p>
            <div className="flex items-center gap-4">
              <img
                src={avatar}
                alt={name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <p className="font-semibold">{name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
