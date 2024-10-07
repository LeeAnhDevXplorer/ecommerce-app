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
import "./Home.css";
import HomeBanner from "../../Components/HomeBanner/HomeBanner";
import { assets } from "../../assets/assets";
import { FaArrowRight } from "react-icons/fa";
import ProductItem from "../../Components/ProductItem/ProductItem";
import HomeCat from "../../Components/HomeCat/HomeCat";

import { IoMailOutline } from "react-icons/io5";
const Home = () => {
  return (
    <div>
      <HomeBanner />
      <HomeCat />
      <section className="homeProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="sticky">
                <div className="banner">
                  <img
                    src={assets.product_banner}
                    alt=""
                    className="cursor w-100"
                  />
                </div>

                <div className="banner mt-3">
                  <img
                    src={assets.product_banner2}
                    alt=""
                    className="cursor w-100"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-9 homeProductRow">
              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0 hd">BEST SELLERS</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>
                <Button className="viewAllBtn ml-auto">
                  View All <FaArrowRight />
                </Button>
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

              <div className="d-flex align-items-center mt-5">
                <div className="info w-75">
                  <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                  <p className="text-light text-sml mb-0">
                    New products with updated stocks.
                  </p>
                </div>
                <Button className="viewAllBtn ml-auto">
                  View All <FaArrowRight />
                </Button>
              </div>
              <div className="product-row productRow2 mt-4 w-100 d-flex">
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
              </div>
              <div className="d-flex mt-4 mb-5 bannerSec">
                <div className="banner">
                  <img src={assets.banner1} alt="" />
                </div>
                <div className="banner">
                  <img src={assets.banner2} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white mb-1">
                $20 discount for your first order
              </p>
              <h3 className="text-white">Join our newsletter and get...</h3>
              <p className="text-light">
                Join our email subscription <br /> now to get updates on
                promotions and coupons.
              </p>

              <form>
                <IoMailOutline />
                <input type="text" placeholder="Your Email Address"/>
                <Button>Subscribe</Button>
              </form>
            </div>
            <div className="col-md-6">
              <img src={assets.newsLetterImg} alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
