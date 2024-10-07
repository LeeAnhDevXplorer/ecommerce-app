import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./HomeBanner.css";
import { assets } from "../../assets/assets";
const HomeBanner = () => {
  return (
    <div className="container mt-3">
      <div className="homeBannerSection">
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          navigation={true}
          loop={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="item">
              <img className="w-100" src={assets.banner_1} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <img className="w-100" src={assets.banner_2} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <img className="w-100" src={assets.banner_3} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <img className="w-100" src={assets.banner_4} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <img className="w-100" src={assets.banner_5} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">
              <img className="w-100" src={assets.banner_6} alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeBanner;
