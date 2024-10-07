import React, { useState } from "react";
import "./HomeCat.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { bgColor, menu_list } from "../../assets/assets";
const HomeCat = () => {
  const [itemBg, setItemBg] = useState(bgColor);
  return (
    <section className="homeCat">
      <div className="container">
        <h3 className="hd mb-4">Fetured Products</h3>
        <Swiper
          slidesPerView={10}
          spaceBetween={8}
          navigation={true}
          slidesPerGroup={1}
          modules={[Navigation]}
          className="mySwiper"
        >
          {menu_list.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  className="item text-center"
                  style={{ backgroundColor: itemBg[index] }}
                >
                  <img src={item.menu_image} alt="" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeCat;
