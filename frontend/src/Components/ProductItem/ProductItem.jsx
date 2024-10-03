import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "@mui/material/Rating";
import { Navigation } from "swiper/modules";
import Button from "@mui/material/Button";
import "./ProductItem.css";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { products } from "../../assets/assets";
const ProductItem = () => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        // navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {products.map((item) => {
          return (
            <SwiperSlide className="mr-2" key={item.id}>
              <div className="item productItem">
                <div className="imgWrapper w-100">
                  <img src={item.image} alt="" className="w-100" />
                  <div className="badge badge-primary">28%</div>
                  <div className="actions">
                    <Button>
                      <BsArrowsFullscreen />
                    </Button>
                    <Button>
                      <FaRegHeart />
                    </Button>
                  </div>
                </div>
                <div className="info">
                  <h4>{item.name}</h4>
                  <span className="text-success d-block">In Stock</span>
                  <Rating
                    className="mt-2 mb-2"
                    name={`rating-${item.id}`}
                    value={item.rating}
                    readOnly
                    size="small"
                    precision={0.5}
                  />
                  <div className="d-flex">
                    <span className="oldPrice">${item.priceOld}</span>
                    <span className="netPrice text-danger ml-2">
                      ${item.nextPrice}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default ProductItem;
