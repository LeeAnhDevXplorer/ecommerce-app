import React, { useContext, useState } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import "./ProductItem.css";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { assets } from "../../assets/assets";
import ProductModal from "../ProductModal/ProductModal";
import { MyContext } from "../../App";
const ProductItem = (props) => {

  const context = useContext(MyContext)

  const viewProductDetails = (id) => {
    context.setisOpenProductModal(true);
  };

  // const closeProductModal = () => {
  //   context.setisOpenProductModal(false);
  // };
  return (
    <>
      <div className={`productItem ${props.itemView}`}>
        <div className="imgWrapper">
          <img src={assets.product_1} alt="" className="w-100 img_rapper" />
          <div className="badge badge-primary">28%</div>
          <div className="actions">
            <Button onClick={() => viewProductDetails(1)}>
              <BsArrowsFullscreen />
            </Button>
            <Button>
              <FaRegHeart />
            </Button>
          </div>
        </div>
        <div className="info">
          <h4>Product Name</h4>
          <span className="stock text-success d-block">In Stock</span>
          <Rating
            name="read-only"
            value={5}
            readOnly
            size="small"
            precision={0.5}
            className="rating"
          />
          <div className="d-flex">
            <span className="oldPrice">$199</span>
            <span className="netPrice text-danger ml-2">$99</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
