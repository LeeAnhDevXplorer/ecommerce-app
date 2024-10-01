import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { RiMenu2Fill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";
import "./Navigation.css";
const Navigation = () => {
  const [isopenSidebarVal, setisopenSidebarVal] = useState(false);
  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-2 navPart1">
            <div className="catWrapper">
              <Button
                className="allCatTab align-items-center"
                onClick={() => setisopenSidebarVal(!isopenSidebarVal)}
              >
                <span className="icon1 mr-2">
                  <RiMenu2Fill />
                </span>
                <span className="text">All Categories</span>
                <span className="icon2 ml-2">
                  <FaAngleDown />
                </span>
              </Button>
              <div
                className={`sidebarNav ${
                  isopenSidebarVal === true ? "open" : ""
                }`}
              >
                <ul>
                  <li>
                    <Link to="/">
                      <Button>
                        Men <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Men</Button>
                      </Link>
                      <Link to="/">
                        <Button>Women</Button>
                      </Link>
                      <Link to="/">
                        <Button>Boys</Button>
                      </Link>
                      <Link to="/">
                        <Button>Girls</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Women <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Men</Button>
                      </Link>
                      <Link to="/">
                        <Button>Women</Button>
                      </Link>
                      <Link to="/">
                        <Button>Boys</Button>
                      </Link>
                      <Link to="/">
                        <Button>Girls</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Bag <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Men</Button>
                      </Link>
                      <Link to="/">
                        <Button>Women</Button>
                      </Link>
                      <Link to="/">
                        <Button>Boys</Button>
                      </Link>
                      <Link to="/">
                        <Button>Girls</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Watches <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Men</Button>
                      </Link>
                      <Link to="/">
                        <Button>Women</Button>
                      </Link>
                      <Link to="/">
                        <Button>Boys</Button>
                      </Link>
                      <Link to="/">
                        <Button>Girls</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Beauty <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Men</Button>
                      </Link>
                      <Link to="/">
                        <Button>Women</Button>
                      </Link>
                      <Link to="/">
                        <Button>Boys</Button>
                      </Link>
                      <Link to="/">
                        <Button>Girls</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Điện thoại <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Men</Button>
                      </Link>
                      <Link to="/">
                        <Button>Women</Button>
                      </Link>
                      <Link to="/">
                        <Button>Boys</Button>
                      </Link>
                      <Link to="/">
                        <Button>Girls</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Laptop <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Men</Button>
                      </Link>
                      <Link to="/">
                        <Button>Women</Button>
                      </Link>
                      <Link to="/">
                        <Button>Boys</Button>
                      </Link>
                      <Link to="/">
                        <Button>Girls</Button>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-10 navPart2 d-flex align-items-center">
            <ul className="list list-inline ml-auto">
              <li className="list-inline-item">
                <Link to="/">
                  <Button> Home </Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button> Thời trang </Button>
                </Link>
                <div className="submenu shadow">
                  <Link to="/">
                    <Button>Men</Button>
                  </Link>
                  <Link to="/">
                    <Button>Women</Button>
                  </Link>
                  <Link to="/">
                    <Button>Boys</Button>
                  </Link>
                  <Link to="/">
                    <Button>Girls</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button> Điện tử </Button>
                </Link>
                <div className="submenu shadow">
                  <Link to="/">
                    <Button>Men</Button>
                  </Link>
                  <Link to="/">
                    <Button>Women</Button>
                  </Link>
                  <Link to="/">
                    <Button>Boys</Button>
                  </Link>
                  <Link to="/">
                    <Button>Girls</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button> Hàng tạp hóa </Button>
                </Link>
                <div className="submenu shadow">
                  <Link to="/">
                    <Button>Men</Button>
                  </Link>
                  <Link to="/">
                    <Button>Women</Button>
                  </Link>
                  <Link to="/">
                    <Button>Boys</Button>
                  </Link>
                  <Link to="/">
                    <Button>Girls</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button> Giày dép </Button>
                </Link>
                <div className="submenu shadow">
                  <Link to="/">
                    <Button>Men</Button>
                  </Link>
                  <Link to="/">
                    <Button>Women</Button>
                  </Link>
                  <Link to="/">
                    <Button>Boys</Button>
                  </Link>
                  <Link to="/">
                    <Button>Girls</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button> Sắc đẹp </Button>
                </Link>
                <div className="submenu shadow">
                  <Link to="/">
                    <Button>Men</Button>
                  </Link>
                  <Link to="/">
                    <Button>Women</Button>
                  </Link>
                  <Link to="/">
                    <Button>Boys</Button>
                  </Link>
                  <Link to="/">
                    <Button>Girls</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button> Sức khỏe </Button>
                </Link>
                <div className="submenu shadow">
                  <Link to="/">
                    <Button>Men</Button>
                  </Link>
                  <Link to="/">
                    <Button>Women</Button>
                  </Link>
                  <Link to="/">
                    <Button>Boys</Button>
                  </Link>
                  <Link to="/">
                    <Button>Girls</Button>
                  </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button> Túi xách </Button>
                </Link>
                <div className="submenu shadow">
                  <Link to="/">
                    <Button>Men</Button>
                  </Link>
                  <Link to="/">
                    <Button>Women</Button>
                  </Link>
                  <Link to="/">
                    <Button>Boys</Button>
                  </Link>
                  <Link to="/">
                    <Button>Girls</Button>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
