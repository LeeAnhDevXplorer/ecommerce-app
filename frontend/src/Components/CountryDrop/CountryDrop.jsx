import React from "react";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa";
import "./CountryDrop.css";
const CountryDrop = () => {
  return (
    <div>
      <Button className="countryDrop">
        <div className="info d-flex flex-column">
          <span className="lable">Your Location</span>
          <span className="name">VietNam</span>
        </div>
        <span className="ml-auto icon-angle">
          <FaAngleDown />
        </span>
      </Button>
    </div>
  );
};

export default CountryDrop;
