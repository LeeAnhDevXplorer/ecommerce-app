import React from "react";
import Slider from "react-slick";
import "./HomeBanner.css";
import { banner_list, banners } from "../../assets/assets";
const HomeBanner = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };
  return (
    <div className="homeBannerSection">
      <Slider {...settings}>
        {banners.map((item, index) => {
          return (
            <div className="item" key={index}>
              <img className="w-100" src={item} alt={`Banner ${index + 1}`} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default HomeBanner;
