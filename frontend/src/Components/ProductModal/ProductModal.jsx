import React, { useContext, useRef } from "react";
import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Slider from "react-slick";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Rating from "@mui/material/Rating";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import "./ProductModal.css";
import QuantityBox from "../QuantityBox/QuantityBox";
import { MyContext } from "../../App";
const ProductModal = (props) => {
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
  };

  var settings2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: false,
  };

  const goto = (index) => {
    zoomSlider.current.slickGoTo(index);
    zoomSliderBig.current.slickGoTo(index);
  };

  const context = useContext(MyContext)
  return (
    <div>
      <Dialog
        className="productModal"
        open={true}
        onClose={() => context.setisOpenProductModal(false)}
      >
        <Button
          className="closeModal"
          onClick={() => context.setisOpenProductModal(false)}
        >
          <IoIosCloseCircleOutline />
        </Button>
        <h4 className="mb-1 font-weight-bold">
          All Natural Italian-Style Chicken Meatballs
        </h4>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center mr-4">
            <span>Brands: </span>
            <span className="ml-2">
              <b>Welch's</b>
            </span>
          </div>
          <Rating
            name="read-only"
            value={5}
            readOnly
            size="small"
            precision={0.5}
            className="rating"
          />
        </div>

        <hr />

        <div className="row mt-2 productDetailsModal">
          <div className="col-md-5">
            <div className="productZoom position-relative">
              <div className="badge badge-primary">28%</div>
              <Slider
                {...settings2}
                className="zoomSliderBig"
                ref={zoomSliderBig}
              >
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                  />
                </div>
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                  />
                </div>
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                  />
                </div>
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                  />
                </div>
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                  />
                </div>
              </Slider>
            </div>
            <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
              <div className="item">
                <img
                  className="w-100"
                  onClick={() => goto(0)}
                  src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                />
              </div>
              <div className="item">
                <img
                  className="w-100"
                  onClick={() => goto(1)}
                  src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                />
              </div>
              <div className="item">
                <img
                  className="w-100"
                  onClick={() => goto(2)}
                  src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                />
              </div>
              <div className="item">
                <img
                  className="w-100"
                  onClick={() => goto(3)}
                  src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                />
              </div>
              <div className="item">
                <img
                  className="w-100"
                  onClick={() => goto(4)}
                  src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                />
              </div>
            </Slider>
          </div>
          <div className="col-md-7">
            <div className="d-flex info align-items-center mb-3">
              <span className="oldPrice mr-2">$222.0</span>
              <span className="netPrice text-danger">$99.0</span>
            </div>
            <span className="badge bg-success">IN STOCK</span>
            <p className="mt-3">
              Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus
              malesuada tincidunt. Class aptent taciti sociosqu ad litora
              torquent
            </p>
            <div className="d-flex info align-items-center">
              <QuantityBox />
              <Button className="btn-blue btn-lg btn-big btn-round ml-3">
                Add to cart
              </Button>
            </div>
            <div className="d-flex align-items-center mt-5 actions">
              <Button className="btn-round btn-sml" variant="outlined">
                <IoIosHeartEmpty />
                &nbsp; ADD TO WISHLIST
              </Button>
              <Button className="btn-round btn-sml ml-4" variant="outlined">
                <MdCompareArrows />
                &nbsp; Compare
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductModal;
