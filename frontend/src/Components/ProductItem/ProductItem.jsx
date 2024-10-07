import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import "./ProductItem.css";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { assets } from "../../assets/assets";
import ProductModal from "../ProductModal/ProductModal";
const ProductItem = () => {
  const [isOpenProductModal, setisOpenProductModal] = useState(false);
  const viewProductDetails = (id) => {
    setisOpenProductModal(true);
  };

  const closeProductModal = () => {
    setisOpenProductModal(false);
  };
  return (
    <>
      <div className="item productItem">
        <div className="imgWrapper w-100">
          <img src={assets.product_1} alt="" className="w-100" />
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

      {isOpenProductModal === true && <ProductModal closeProductModal={closeProductModal}/>}
    </>
  );
};

export default ProductItem;
