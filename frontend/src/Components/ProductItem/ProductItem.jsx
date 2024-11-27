import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import React, { useContext, useState } from 'react';
import { BsArrowsFullscreen } from 'react-icons/bs';
import { FaRegHeart } from 'react-icons/fa';
import { MyContext } from '../../App';
import './ProductItem.css';
const ProductItem = (props) => {
  const context = useContext(MyContext);

  const viewProductDetails = (_id) => {
    context.setisOpenProductModal({
      id: _id,
      open: true
    });
  };
  return (
    <>
      <div className={`productItem ${props.itemView}`}>
        <div className="imgWrapper">
          <img
            src={props.item?.images[0]}
            alt=""
            className="w-100 img_rapper"
          />
          <div className="badge badge-primary">{props.item?.discount}%</div>
          <div className="actions">
            <Button onClick={() => viewProductDetails(props.item?._id)}>
              <BsArrowsFullscreen />
            </Button>
            <Button>
              <FaRegHeart />
            </Button>
          </div>
        </div>
        <div className="info">
          <h4>{props.item?.name.substr(0, 30) + '...'}</h4>
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
            <span className="oldPrice">đ{props.item?.oldPrice}</span>
            <span className="netPrice text-danger ml-2">
              đ
              {(props.item?.price &&
                parseFloat(props.item?.price).toFixed(3)) ||
                0}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
