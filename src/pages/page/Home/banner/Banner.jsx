import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useAxiosSecure from "../../../../api/useAxiosSecure";

const Banner = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const fallbackImage = "https://i.ibb.co/ymHdf9KT/download-4.jpg";

  const { data: bannerData = [], isLoading, isError } = useQuery({
    queryKey: ["bannerData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banners/meals");
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
    </div>;
  }

  if (isError) {
    return <div className="h-[80vh] flex items-center justify-center">
      Error loading banner
    </div>;
  }

  return (
    <div className="relative h-[80vh] w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        {bannerData.length > 0 ? (
          bannerData.map((slide, index) => {
            const imageUrl = slide?.image?.startsWith('http') ? slide.image : fallbackImage;
            
            return (
              <SwiperSlide key={index}>
                <div 
                  className="w-full h-full flex items-center justify-center bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url('${imageUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="relative z-10 text-center text-white px-5 max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-xl mb-8 drop-shadow-md">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <SwiperSlide>
            <div className="w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="relative z-10 text-center text-white px-5 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  Delicious Meals Await You
                </h1>
                <p className="text-xl mb-8 drop-shadow-md">
                  Discover the best meals in town with authentic reviews from food lovers
                </p>
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {/* Search form remains the same */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 z-20">
        <form onSubmit={handleSearch} className="join w-full">
          <input
            type="text"
            placeholder="Search for meals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered join-item w-full focus:outline-none"
          />
          <button type="submit" className="btn btn-primary join-item">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;