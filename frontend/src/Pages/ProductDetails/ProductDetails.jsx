import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import "./ProductDetails.css";
import ProductZoom from "../../Components/ProductZoom/ProductZoom";
import QuantityBox from "../../Components/QuantityBox/QuantityBox";
import { Button } from "@mui/material";
import { FaCartShopping } from "react-icons/fa6";
import { FaBox } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import Relatedproducts from "./Relatedproducts/Relatedproducts";
const ProductDetails = () => {
  const [clicked, setClicked] = useState(false);
  const [activeSize, setActiveSize] = useState(null);
  const [activeTabs, setActiveTabs] = useState(0);
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 3000);
  };

  const isActive = (index) => {
    setActiveSize(index);
  };
  return (
    <>
      <section className="productDetails section">
        <div className="container">
          <div className="row">
            <div className="col col-12 col-lg-5 pl-5">
              <ProductZoom />
            </div>
            <div className="col col-12 col-lg-7 pl-5 pr-5">
              <h2 className="hd text-capitalize">
                All Natural Italian-Style Chicken Meatballs
              </h2>
              <ul className="list list-inline d-flex align-items-center">
                <li className="list-inline-item">
                  <div className="d-flex align-items-center">
                    <span className="text-light mr-2">Brands: </span>
                    <span>Welch's</span>
                  </div>
                </li>
                <li className="list-inline-item">
                  <div className="d-flex align-items-center">
                    <Rating
                      name="read-only"
                      value={4.5}
                      readOnly
                      precision={0.5}
                      size="small"
                    />
                    <span className="text-light cursor ml-2">1 Review</span>
                  </div>
                </li>
              </ul>
              <div className="d-flex price mb-3">
                <span className="oldPrice">$1000</span>
                <span className="netPrice text-danger ml-3">$999</span>
              </div>
              <div className="badge badge-success">IN STOCK</div>
              <p className="mt-3">
                Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus
                malesuada tincidunt. Class aptent taciti sociosqu ad litora
                torquent
              </p>
              <div className="productSize d-flex align-items-center">
                <span>Size / Weight</span>
                <ul className="list list-inline mb-0 pl-4">
                  <li className="list-inline-item">
                    <a
                      className={`tag ${activeSize === 0 ? "active" : ""}`}
                      onClick={() => isActive(0)}
                    >
                      50g
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className={`tag ${activeSize === 1 ? "active" : ""}`}
                      onClick={() => isActive(1)}
                    >
                      100g
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className={`tag ${activeSize === 2 ? "active" : ""}`}
                      onClick={() => isActive(2)}
                    >
                      200g
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className={`tag ${activeSize === 3 ? "active" : ""}`}
                      onClick={() => isActive(3)}
                    >
                      300g
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className={`tag ${activeSize === 4 ? "active" : ""}`}
                      onClick={() => isActive(4)}
                    >
                      500g
                    </a>
                  </li>
                </ul>
              </div>
              <div className="d-flex align-items-center mt-3">
                <QuantityBox />
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
                <Tooltip title="Add to Wishlist" placement="top">
                  <Button className="btn-blue btn-lg btn-big btn-circle ml-4">
                    <IoIosHeartEmpty />
                  </Button>
                </Tooltip>
                <Tooltip title="Add to Compare" placement="top">
                  <Button className="btn-blue btn-lg btn-big btn-circle ml-4">
                    <MdCompareArrows />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="card mt-5 p-5 detailsPageTabs">
            <div className="customTabs">
              <ul className="list list-inline">
                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 0 && "active"}`}
                    onClick={() => {
                      setActiveTabs(0);
                    }}
                  >
                    Mô tả sản phẩm
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 1 && "active"}`}
                    onClick={() => {
                      setActiveTabs(1);
                    }}
                  >
                    Thông tin chi tiết
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 2 && "active"}`}
                    onClick={() => {
                      setActiveTabs(2);
                    }}
                  >
                    Đánh giá
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 3 && "active"}`}
                    onClick={() => {
                      setActiveTabs(3);
                    }}
                  >
                    Description
                  </Button>
                </li>
              </ul>
              {activeTabs === 0 && (
                <div className="tabContent">
                  <p>Đây là mô tả sản phẩm</p>
                </div>
              )}
              {activeTabs === 1 && (
                <div className="tabContent">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        <tr className="stand-up">
                          <th>Stand Up</th>
                          <td>
                            <p>35"L x 24"w x 37-45"H(front to back wheel)</p>
                          </td>
                        </tr>
                        <tr className="folded-wo-wheels">
                          <th>Folded (w/o wheels)</th>
                          <td>
                            <p>35"L x 24"w x 37-45"H</p>
                          </td>
                        </tr>
                        <tr className="folded-w-wheels">
                          <th>Folded (w/ wheels)</th>
                          <td>
                            <p>35"L x 24"w x 37-45"H</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeTabs === 2 && (
                <div className="tabContent">
                  <div className="row">
                    <div className="col-md-8">
                      <h2>Đánh giá của khách hàng</h2>
                      <div className="card p-4 reviewsCard flex-row">
                        <div className="image">
                          <div className="rounded-circle">
                            <img
                              src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                              alt=""
                            />
                          </div>
                          <span className="text-g d-block text-center font-weight-bold mt-2">
                            Đình anh
                          </span>
                        </div>
                        <div className="info pl-5">
                          <div className="d-flex align-items-center w-100">
                            <h5 className="text-light">13/1/2003</h5>
                            <div className="ml-auto">
                              <Rating
                                name="read-only"
                                value={5}
                                readOnly
                                size="small"
                                precision={0.5}
                                className="rating"
                              />
                            </div>
                          </div>
                          <p>Sản phẩm chất lươngj</p>
                        </div>
                      </div>
                      <br className="res-hide" />
                      <br className="res-hide" />
                      <form className="reviewForm">
                        <h3>Thêm 1 đánh giá</h3>
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            placeholder="Viết đánh giá"
                            name="review"
                          ></textarea>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập tên của bạn"
                                name="userName"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <Rating
                                name="read-only"
                                value={5}
                                readOnly
                                size="small"
                                precision={0.5}
                                className="rating"
                              />
                            </div>
                          </div>
                        </div>
                        <br />
                        <div className="form-group">
                          <Button className="btn-blue btn-lg btn-big btn-round">
                            Gửi đánh giá
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <br />

          <Relatedproducts />
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
