import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import { GrMenu } from "react-icons/gr";
import { TbGridDots } from "react-icons/tb";
import { HiViewGrid } from "react-icons/hi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { TfiAngleDown } from "react-icons/tfi";
import "./Listing.css";
import SideBar from "../../Components/SideBar/SideBar";
import { assets } from "../../assets/assets";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProductItem from "../../Components/ProductItem/ProductItem";
const Listing = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [productView, setProductView] = useState("four");
  const open = Boolean(anchorEl);
  const handleClick = (even) => {
    setAnchorEl(even.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <section className="product_Listing_Page">
        <div className="container">
          <div className="productListing d-flex">
            <SideBar />
            <div className="content_right">
              <img
                className="w-100"
                src={assets.banner3}
                style={{ borderRadius: "8px" }}
                alt=""
              />
              <div className="showBy mt-3 mb-3 d-flex align-items-center">
                <div className="d-flex align-items-center btnWrapper">
                  <Button className={productView === "one" && "atc"} onClick={() => setProductView("one")}>
                    <GrMenu />
                  </Button>
                  <Button className={productView === "two" && "atc"} onClick={() => setProductView("two")}>
                    <HiViewGrid />
                  </Button>
                  <Button className={productView === "three" && "atc"} onClick={() => setProductView("three")}>
                    <TbGridDots />
                  </Button>
                  <Button className={productView === "four" && "atc"} onClick={() => setProductView("four")}>
                    <TfiLayoutGrid4Alt />
                  </Button>
                </div>
                <div className="ml-auto showByFilter">
                  <Button onClick={handleClick}>
                    Show 9 <TfiAngleDown />
                  </Button>
                  <Menu
                    className="w-100 showPerDrop"
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>10</MenuItem>
                    <MenuItem onClick={handleClose}>30</MenuItem>
                    <MenuItem onClick={handleClose}>50</MenuItem>
                    <MenuItem onClick={handleClose}>70</MenuItem>
                  </Menu>
                </div>
              </div>

              <div className="productListings">
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
              </div>

              <div className="d-flex align-items-center justify-content-center mt-5">
                <Pagination count={10} color="primary" size="large"/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Listing;
