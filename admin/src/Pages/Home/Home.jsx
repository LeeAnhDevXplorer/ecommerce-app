import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import { FaEye, FaPencilAlt, FaRegUserCircle } from 'react-icons/fa';
import { FaBagShopping, FaCartShopping } from 'react-icons/fa6';
import { GiStarsStack } from 'react-icons/gi';
import { HiDotsVertical } from 'react-icons/hi';
import { IoTimerOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import DashboardBox from './Components/DashboardBox';

import './Home.css';
import { Link } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const data = [
  ['Year', 'Sales', 'Expenses'],
  ['2013', 1000, 400],
  ['2014', 1170, 460],
  ['2015', 660, 1120],
  ['2016', 1030, 540],
];

export const options = {
  chartArea: { width: '100%', height: '100%' },
  backgroundColor: 'transparent',
};

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showBy, setShowBy] = useState('');
  const [showCat, setShowCat] = useState('');
  const [showBrand, setshowBrand] = useState('');
  const [showSearch, setshowSearch] = useState('');

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="right-content w-100">
      <div className="row dashboardBoxWrapperRow">
        <div className="col-md-8">
          <div className="dashboardBoxWrapper d-flex">
            <DashboardBox
              color={['#1da256', '#48d483']}
              icon={<FaRegUserCircle />}
              grow={true}
            />
            <DashboardBox
              color={['#c012e2', '#eb64fe']}
              icon={<FaCartShopping />}
            />
            <DashboardBox
              color={['#2c78e5', '#60aff5']}
              icon={<FaBagShopping />}
            />
            <DashboardBox
              color={['#e1950e', '#f3cd29']}
              icon={<GiStarsStack />}
            />
          </div>
        </div>
        <div className="col-md-4 pl-0">
          <div className="box graphBox">
            <div className="d-flex align-items-center w-100 mt-5 bottomElm">
              <h4 className="text-white mb-0 mt-0">Total Sales</h4>
              <Button
                className="ml-auto toggleIcon"
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <HiDotsVertical />
              </Button>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    style: {
                      maxHeight: ITEM_HEIGHT * 5.0,
                      width: '35ch',
                    },
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <IoTimerOutline />
                  Last Day
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <IoTimerOutline />
                  Last Week
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <IoTimerOutline />
                  Last Month
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <IoTimerOutline />
                  Last Year
                </MenuItem>
              </Menu>
            </div>
            <h3 className="text-white font-weight-bold">#3,123,23,235.00</h3>
            <p className="text-white">$3,567,32.0 in last month</p>
            <Chart
              chartType="PieChart"
              data={data}
              options={options}
              width={'100%'}
              height={'220px'}
            />
          </div>
        </div>
      </div>
      <div className="card shadow border-0 p-3 mt-4 w-100">
        <h3 className="hd">Best Selling Products</h3>
        <div className="row cardFilter mt-4">
          <div className="col-md-3">
            <h4>SHOW BY</h4>
            <Select
              value={showBy}
              onChange={(e) => setShowBy(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              className="w-100"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
          <div className="col-md-3">
            <h4>CATEGORY BY</h4>
            <Select
              value={showCat}
              onChange={(e) => setShowCat(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              className="w-100"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
          <div className="col-md-3">
            <h4>BRAND BY</h4>
            <Select
              value={showBrand}
              onChange={(e) => setshowBrand(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              className="w-100"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
          <div className="col-md-3">
            <h4>SEARCH BY</h4>
            <Select
              value={showSearch}
              onChange={(e) => setshowSearch(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              className="w-100"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
        </div>
        <div className="table-responsive w-100 mt-5">
          <table className="table table-bordered v-align">
            <thead className="thead-dark">
              <tr>
                <th>UID</th>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>RATING</th>
                <th>ORDER</th>
                <th>SALES</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <div className="d-flex align-items-center productBox">
                    <div className="imgWrapper">
                      <div className="img">
                        <img
                          src="https://tronhouse.com/assets/data/editor/source/nhung-cach-chup-hinh-quan-ao-duoc-uu-chuong-nhat/chup-hinh-sang-tao-1.jpg"
                          alt=""
                          className="w-100"
                        />
                      </div>
                    </div>
                    <div className="info">
                      <h6>Product 1 hahahahahahahahahahahaha</h6>
                      <p>Description hahahahahahhahahahahahahha</p>
                    </div>
                  </div>
                </td>
                <td>Category 1</td>
                <td>Brand 1</td>
                <td>
                  <span className="old">$100</span>
                  <span className="new text-danger">$59</span>
                </td>
                <td>10</td>
                <td>4.5 (16)</td>
                <td>Order</td>
                <td>$99k</td>
                <td>
                  <div className="actions d-flex align-items-center">
                    <Link to={'/producDetails'}>
                      <Button className="secondary" color="secondary">
                        <FaEye />
                      </Button>
                    </Link>
                    <Button className="success" color="success">
                      <FaPencilAlt />
                    </Button>
                    <Button className="error" color="error">
                      <MdDelete />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <div className="d-flex align-items-center productBox">
                    <div className="imgWrapper">
                      <div className="img">
                        <img
                          src="https://tronhouse.com/assets/data/editor/source/nhung-cach-chup-hinh-quan-ao-duoc-uu-chuong-nhat/chup-hinh-sang-tao-1.jpg"
                          alt=""
                          className="w-100"
                        />
                      </div>
                    </div>
                    <div className="info">
                      <h6>Product 1 hahahahahahahahahahahaha</h6>
                      <p>Description hahahahahahhahahahahahahha</p>
                    </div>
                  </div>
                </td>
                <td>Category 1</td>
                <td>Brand 1</td>
                <td>
                  <span className="old">$100</span>
                  <span className="new text-danger">$59</span>
                </td>
                <td>10</td>
                <td>4.5 (16)</td>
                <td>Order</td>
                <td>$99k</td>
                <td>
                  <div className="actions d-flex align-items-center">
                    <Button className="secondary" color="secondary">
                      <FaEye />
                    </Button>
                    <Button className="success" color="success">
                      <FaPencilAlt />
                    </Button>
                    <Button className="error" color="error">
                      <MdDelete />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <div className="d-flex align-items-center productBox">
                    <div className="imgWrapper">
                      <div className="img">
                        <img
                          src="https://tronhouse.com/assets/data/editor/source/nhung-cach-chup-hinh-quan-ao-duoc-uu-chuong-nhat/chup-hinh-sang-tao-1.jpg"
                          alt=""
                          className="w-100"
                        />
                      </div>
                    </div>
                    <div className="info">
                      <h6>Product 1 hahahahahahahahahahahaha</h6>
                      <p>Description hahahahahahhahahahahahahha</p>
                    </div>
                  </div>
                </td>
                <td>Category 1</td>
                <td>Brand 1</td>
                <td>
                  <span className="old">$100</span>
                  <span className="new text-danger">$59</span>
                </td>
                <td>10</td>
                <td>4.5 (16)</td>
                <td>Order</td>
                <td>$99k</td>
                <td>
                  <div className="actions d-flex align-items-center">
                    <Button className="secondary" color="secondary">
                      <FaEye />
                    </Button>
                    <Button className="success" color="success">
                      <FaPencilAlt />
                    </Button>
                    <Button className="error" color="error">
                      <MdDelete />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <div className="d-flex align-items-center productBox">
                    <div className="imgWrapper">
                      <div className="img">
                        <img
                          src="https://tronhouse.com/assets/data/editor/source/nhung-cach-chup-hinh-quan-ao-duoc-uu-chuong-nhat/chup-hinh-sang-tao-1.jpg"
                          alt=""
                          className="w-100"
                        />
                      </div>
                    </div>
                    <div className="info">
                      <h6>Product 1 hahahahahahahahahahahaha</h6>
                      <p>Description hahahahahahhahahahahahahha</p>
                    </div>
                  </div>
                </td>
                <td>Category 1</td>
                <td>Brand 1</td>
                <td>
                  <span className="old">$100</span>
                  <span className="new text-danger">$59</span>
                </td>
                <td>10</td>
                <td>4.5 (16)</td>
                <td>Order</td>
                <td>$99k</td>
                <td>
                  <div className="actions d-flex align-items-center">
                    <Button className="secondary" color="secondary">
                      <FaEye />
                    </Button>
                    <Button className="success" color="success">
                      <FaPencilAlt />
                    </Button>
                    <Button className="error" color="error">
                      <MdDelete />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <div className="d-flex align-items-center productBox">
                    <div className="imgWrapper">
                      <div className="img">
                        <img
                          src="https://tronhouse.com/assets/data/editor/source/nhung-cach-chup-hinh-quan-ao-duoc-uu-chuong-nhat/chup-hinh-sang-tao-1.jpg"
                          alt=""
                          className="w-100"
                        />
                      </div>
                    </div>
                    <div className="info">
                      <h6>Product 1 hahahahahahahahahahahaha</h6>
                      <p>Description hahahahahahhahahahahahahha</p>
                    </div>
                  </div>
                </td>
                <td>Category 1</td>
                <td>Brand 1</td>
                <td>
                  <span className="old">$100</span>
                  <span className="new text-danger">$59</span>
                </td>
                <td>10</td>
                <td>4.5 (16)</td>
                <td>Order</td>
                <td>$99k</td>
                <td>
                  <div className="actions d-flex align-items-center">
                    <Button className="secondary" color="secondary">
                      <FaEye />
                    </Button>
                    <Button className="success" color="success">
                      <FaPencilAlt />
                    </Button>
                    <Button className="error" color="error">
                      <MdDelete />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex tableFooter">
            <p>
              Showing <b>12</b> of <b>60</b> Results
            </p>
            <Pagination count={10} color="primary" className="pagination" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
