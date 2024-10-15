import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import React, { useContext, useRef, useState } from "react";
import { FaBox } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { IoIosCloseCircleOutline, IoIosHeartEmpty } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MyContext } from "../../App";
import ProductZoom from "../ProductZoom/ProductZoom";
import QuantityBox from "../QuantityBox/QuantityBox";
import "./ProductModal.css";
const ProductModal = (props) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSlider.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 3000);
  };

  const context = useContext(MyContext);
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
            <ProductZoom />
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
              <div className="btn-blue pt-1 btn-round ml-3">
              <Button
                  className={`cart-btn ${clicked ? "clicked" : ""}`}
                  onClick={handleClick}
                >
                  <span className="btn-blue btn-lg btn-big btn-round add-to-cart">
                    {clicked ? "Thêm thành công" : "Thêm vào giỏ hàng"}
                  </span>
                  {clicked && <span className="added">Thêm thành công</span>}
                  <FaCartShopping className="icon1" />
                  <FaBox className="icon2" />
                </Button>
              </div>
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
