import React, { useRef } from "react";
import { Dialog} from "@mui/material";
import Button from "@mui/material/Button";
import InnerImageZoom from "react-inner-image-zoom";
import Slider from "react-slick";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Rating from "@mui/material/Rating";
import "./ProductModal.css";
import { assets } from "../../assets/assets";
const ProductModal = (props) => {

    const zoomSliderBig = useRef()
    const zoomSlider = useRef()

    var settings2 = {
        dots:false,
        infinite: false,
        speed:700,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: false
    }
  return (
    <div>
      <Dialog
        className="productModal"
        open={true}
        onClick={() => props.closeProductModal()}
      >
        <Button
          className="closeModal"
          onClick={() => props.closeProductModal()}
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
                <div className="productZoom">
                    <Slider {...settings2} className="zoomSliderBig" ref={zoomSliderBig}>
                        <div className="item">
                            <InnerImageZoom zoomType="hover" zoomScale={1} src={assets.product_1}/>
                        </div>
                    </Slider>
                </div>
            </div>
            <div className="col-md-7"></div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductModal;
