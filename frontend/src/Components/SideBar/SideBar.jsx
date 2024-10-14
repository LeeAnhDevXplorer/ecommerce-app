import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Checkbox from "@mui/material/Checkbox";

import "./SideBar.css";
import { assets } from "../../assets/assets";
const SideBar = () => {
  const [value, setValue] = useState([100, 60000]);
  const [value2, setValue2] = useState(0);
  return (
    <div className="sideBar">
      <div className="sticky">
        <div className="filterBox">
          <h6>DANH MỤC SẢN PHẨM</h6>
          <div className="scroll">
            <ul>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Men"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Women"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Boys"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Girls"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Điện tử"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Giày dép"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sức khỏe"
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="filterBox">
          <h6>LỌC THEO GIÁ</h6>
          <RangeSlider
            value={value}
            onInput={setValue}
            min={100}
            max={60000}
            step={5}
          />
          <div className="d-flex pt-2 pb-2 priceRange">
            <span>
              From: <strong className="text-dark">Rs: {value[0]}</strong>
            </span>
            <span className="ml-auto">
              To: <strong className="text-dark">Rs: {value[1]}</strong>
            </span>
          </div>
        </div>
        <div className="filterBox">
          <h6>TÌNH TRẠNG</h6>
          <div className="scroll">
            <ul>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="In Stock"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="On Sale"
                />
              </li>
            </ul>
          </div>
        </div>

        <div className="filterBox">
          <h6>THƯƠNG HIỆU</h6>
          <div className="scroll">
            <ul>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Louis Vuitton"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Gucci"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Chanel"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Dior"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Adidas"
                />
              </li>
            </ul>
          </div>
        </div>
        <Link to="#">
          <img className="w-100" src={assets.sidebar_banner} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
