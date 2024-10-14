import React from "react";
import Button from "@mui/material/Button";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaArrowRight } from "react-icons/fa";
import "./Relatedproducts.css";
import ProductItem from "../../../Components/ProductItem/ProductItem";
const Relatedproducts = () => {
  return (
    <>
      <div className="d-flex align-items-center mt-4">
        <div className="info w-75">
          <h3 className="mb-0 hd">RELATED PRODUCTS</h3>
        </div>
      </div>
      <div className="product-row mt-4 w-100">
        <Swiper
          slidesPerView={4}
          spaceBetween={0}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide className="mr-2">
            <ProductItem />
          </SwiperSlide>
          <SwiperSlide className="mr-2">
            <ProductItem />
          </SwiperSlide>
          <SwiperSlide className="mr-2">
            <ProductItem />
          </SwiperSlide>
          <SwiperSlide className="mr-2">
            <ProductItem />
          </SwiperSlide>
          <SwiperSlide className="mr-2">
            <ProductItem />
          </SwiperSlide>
          <SwiperSlide className="mr-2">
            <ProductItem />
          </SwiperSlide>
          <SwiperSlide className="mr-2">
            <ProductItem />
          </SwiperSlide>
          <SwiperSlide className="mr-2">
            <ProductItem />
          </SwiperSlide>
          <SwiperSlide className="mr-2">
            <ProductItem />
          </SwiperSlide>
          <SwiperSlide className="mr-2">
            <ProductItem />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Relatedproducts;
