import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react';
import { BiSolidDashboard } from 'react-icons/bi';
import {
  FaAngleRight,
  FaBell,
  FaCartArrowDown,
  FaRegUserCircle,
} from 'react-icons/fa';
import { FaProductHunt } from 'react-icons/fa6';
import { HiOutlineLogout } from 'react-icons/hi';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiMessengerFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { MyContext } from '../../App';
import './SideBar.css';

const SideBar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
  const context = useContext(MyContext);
  const handleTabClick = (index) => {
    if (activeTab === index) {
      setIsToggleSubmenu(!isToggleSubmenu);
    } else {
      setActiveTab(index);
      setIsToggleSubmenu(true);
    }
  };

  return (
    <div className="sideBar">
      <ul>
        <li>
          <Link to={'/'}>
            <Button
              className={`w-100 ${activeTab === 0 ? 'act' : ''}`}
              onClick={() => handleTabClick(0)}
            >
              <span className="icon">
                <BiSolidDashboard />
              </span>
              Dashboard
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
          </Link>
        </li>
        <li>
          <Button
            className={`w-100 ${activeTab === 1 ? 'act' : ''}`}
            onClick={() => handleTabClick(1)}
          >
            <span className="icon">
              <FaProductHunt />
            </span>
            Sản phẩm
            <span className="arrow">
              <FaAngleRight />
            </span>
          </Button>
          <div
            className={`submenuWrapper ${
              activeTab === 1 && isToggleSubmenu ? 'colapse' : 'colapsed'
            }`}
          >
            <ul className="submenu">
              <li>
                <Link to={'/product/productlist'}>Danh sách sản phẩm</Link>
              </li>
              {/* <li>
                <Link to={'#'}>Xem sản phẩm</Link>
              </li> */}
              <li>
                <Link to={'/product/productupload'}>Tải lên sản phẩm</Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <Button
            className={`w-100 ${activeTab === 2 ? 'act' : ''}`}
            onClick={() => handleTabClick(2)}
          >
            <span className="icon">
              <FaProductHunt />
            </span>
            Danh mục sản phẩm
            <span className="arrow">
              <FaAngleRight />
            </span>
          </Button>
          <div
            className={`submenuWrapper ${
              activeTab === 2 && isToggleSubmenu ? 'colapse' : 'colapsed'
            }`}
          >
            <ul className="submenu">
              <li>
                <Link to={'/category/categorylist'}>Danh mục sản phẩm</Link>
              </li>
              {/* <li>
                <Link to={'#'}>Xem sản phẩm</Link>
              </li> */}
              <li>
                <Link to={'/category/categoryadd'}>Tải lên Danh mục</Link>
              </li>
            </ul>
          </div>
        </li>
        {/* <li>
          <Link>
            <Button
              className={`w-100 ${activeTab === 2 ? 'act' : ''}`}
              onClick={() => handleTabClick(2)}
            >
              <span className="icon">
                <FaCartArrowDown />
              </span>
              Đặt hàng
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
          </Link>
        </li>
        <li>
          <Link>
            <Button
              className={`w-100 ${activeTab === 3 ? 'act' : ''}`}
              onClick={() => handleTabClick(3)}
            >
              <span className="icon">
                <FaRegUserCircle />
              </span>
              Tài khoản người dùng
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
          </Link>
        </li>
        <li>
          <Link>
            <Button
              className={`w-100 ${activeTab === 4 ? 'act' : ''}`}
              onClick={() => handleTabClick(4)}
            >
              <span className="icon">
                <RiMessengerFill />
              </span>
              Tin nhắn
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
          </Link>
        </li>
        <li>
          <Link>
            <Button
              className={`w-100 ${activeTab === 5 ? 'act' : ''}`}
              onClick={() => handleTabClick(5)}
            >
              <span className="icon">
                <FaBell />
              </span>
              Thông báo
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
          </Link>
        </li>
        <li>
          <Link>
            <Button
              className={`w-100 ${activeTab === 6 ? 'act' : ''}`}
              onClick={() => handleTabClick(6)}
            >
              <span className="icon">
                <IoSettingsOutline />
              </span>
              Cài đặt
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
          </Link>
        </li> */}
      </ul>
      <br />
      <hr />
      <div className="logoutWrapper">
        <div className="logoutBox">
          <Button variant="contained">
            <HiOutlineLogout /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
