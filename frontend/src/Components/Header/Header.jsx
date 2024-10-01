import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaRegUser } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import "./Header.css";
import { assets } from "../../assets/assets";
import CountryDrop from "../CountryDrop/CountryDrop";
import SearchBox from "./SearchBox/SearchBox";
import Navigation from "./Navigation/Navigation";
import { MyContext } from "../../App";
const Header = () => {
  const context = useContext(MyContext)
  return (
    <>
      <div className="headerWrapper">
        <div className="top-strip bg">
          <div className="container">
            <p className="mb-0 mt-0 text-center">
              <b>e-Commerce Shop</b> Bảo vệ bạn từ khâu thanh toán đến khâu giao
              hàng bằng
            </p>
          </div>
        </div>
        <header className="header">
          <div className="container">
            <div className="row">
              <div className="logoWrapper col-sm-2 d-flex align-items-center">
                <Link to={"/"}>
                  <img src={assets.logo} alt="" />
                </Link>
              </div>
              <div className="col-sm-10 d-flex align-items-center part2">
                {context.countryList.length !== 0 && <CountryDrop />}

                <SearchBox />
                <div className="d-flex align-items-center part3 ml-auto">
                  <Button className="circle mr-3">
                    <FaRegUser />
                  </Button>
                  <div className="ml-auto cartTab d-flex align-items-center">
                    <span className="price">$3.40</span>
                    <div className="position-relative d-flex align-items-center ml-2">
                      <Button className="circle">
                        <IoBagHandleOutline />
                      </Button>
                      <span className="count d-flex align-items-center justify-content-center">
                        1
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Navigation />
      </div>
    </>
  );
};

export default Header;
