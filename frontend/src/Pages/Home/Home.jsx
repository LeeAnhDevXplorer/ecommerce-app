import React from "react";
import Button from "@mui/material/Button";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper/modules";

import Rating from "@mui/material/Rating";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Home.css";
import HomeBanner from "../../Components/HomeBanner/HomeBanner";
import { assets, products } from "../../assets/assets";
import { FaArrowRight } from "react-icons/fa";
import ProductItem from "../../Components/ProductItem/ProductItem";
import HomeCat from "../../Components/HomeCat/HomeCat";

const Home = () => {
  var productSliderOptions = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <div>
      <HomeBanner />
      <HomeCat />
      <section className="homeProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
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
              <div className="product-row mt-4">
                <ProductItem />
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
              <div className="product-row mt-4">
                <ProductItem />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
