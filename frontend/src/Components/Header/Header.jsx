import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { IoSearch } from "react-icons/io5";
import "./Header.css";
import { assets } from "../../assets/assets";
import CountryDrop from "../CountryDrop/CountryDrop";
const Header = () => {
  return (
    <>
      <div className="headerWrapper">
        <div className="top-strip bg">
          <div className="container">
            <p className="mb-0 mt-0 text-center">
              <b>e-Commerce</b> Bảo vệ bạn từ khâu thanh toán đến khâu giao hàng
              bằng
            </p>
          </div>
        </div>
        <div className="header">
          <div className="container">
            <div className="row">
              <div className="logoWrapper col-sm-2 d-flex align-items-center">
                <Link to={"/"}>
                  <img src={assets.logo} alt="" />
                </Link>
              </div>
              <div className="col-sm-10 d-flex align-items-center part2">
                <CountryDrop />
                <div class="headerSearchWrapper d-flex align-items-center">
                  <div class="headerSearch ml-3 mr-3">
                    <input type="text" placeholder="Search for products..." />
                    <Button>
                      <IoSearch />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
