import React from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { MdDeleteForever } from "react-icons/md";
import QuantityBox from "../../Components/QuantityBox/QuantityBox";
const Cart = () => {
  return (
    <>
      <section className="section cartPage">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h2 className="hd mb-2 mt-2">Giỏ hàng của bạn</h2>
              <p className="mb-4">
                Có <b>3</b> sản phẩm trong giỏ hàng của bạn
              </p>

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th width="45%">Sản phẩm</th>
                      <th width="10%">Giá</th>
                      <th width="20%">Số lượng</th>
                      <th width="15%">Tổng tiền</th>
                      <th width="10%">Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td width="45%">
                        <Link to="/product/1">
                          <div className="d-flex align-items-center cartItemImgWrapper">
                            <div className="imgWrapper">
                              <img
                                src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                                alt=""
                                className="w-100"
                              />
                            </div>
                            <div className="info px-3 ml-4">
                              <h6>
                                All Natural Italian-Style Chicken Meatballs
                              </h6>
                              <Rating
                                name="read-only"
                                value={4.5}
                                readOnly
                                precision={0.5}
                                size="large"
                              />
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td width="15%">$999</td>
                      <td width="20%">
                        <QuantityBox />
                      </td>
                      <td width="15%">$999</td>
                      <td width="10%">
                        <span className="remove cursor">
                          <MdDeleteForever />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td width="45%">
                        <Link to="/product/1">
                          <div className="d-flex align-items-center cartItemImgWrapper">
                            <div className="imgWrapper">
                              <img
                                src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                                alt=""
                                className="w-100"
                              />
                            </div>
                            <div className="info px-3 ml-4">
                              <h6>
                                All Natural Italian-Style Chicken Meatballs
                              </h6>
                              <Rating
                                name="read-only"
                                value={4.5}
                                readOnly
                                precision={0.5}
                                size="large"
                              />
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td width="15%">$999</td>
                      <td width="20%">
                        <QuantityBox />
                      </td>
                      <td width="15%">$999</td>
                      <td width="10%">
                        <span className="remove cursor">
                          <MdDeleteForever />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td width="45%">
                        <Link to="/product/1">
                          <div className="d-flex align-items-center cartItemImgWrapper">
                            <div className="imgWrapper">
                              <img
                                src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                                alt=""
                                className="w-100"
                              />
                            </div>
                            <div className="info px-3 ml-4">
                              <h6>
                                All Natural Italian-Style Chicken Meatballs
                              </h6>
                              <Rating
                                name="read-only"
                                value={4.5}
                                readOnly
                                precision={0.5}
                                size="large"
                              />
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td width="15%">$999</td>
                      <td width="20%">
                        <QuantityBox />
                      </td>
                      <td width="15%">$999</td>
                      <td width="10%">
                        <span className="remove cursor">
                          <MdDeleteForever />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td width="45%">
                        <Link to="/product/1">
                          <div className="d-flex align-items-center cartItemImgWrapper">
                            <div className="imgWrapper">
                              <img
                                src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                                alt=""
                                className="w-100"
                              />
                            </div>
                            <div className="info px-3 ml-4">
                              <h6>
                                All Natural Italian-Style Chicken Meatballs
                              </h6>
                              <Rating
                                name="read-only"
                                value={4.5}
                                readOnly
                                precision={0.5}
                                size="large"
                              />
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td width="15%">$999</td>
                      <td width="20%">
                        <QuantityBox />
                      </td>
                      <td width="15%">$999</td>
                      <td width="10%">
                        <span className="remove cursor">
                          <MdDeleteForever />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border p-3 cartDetails">
                <h4>CART TOTALS</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
