import { Radio, RadioGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useContext, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';
import { assets } from '../../assets/assets';
import './SideBar.css';
const SideBar = (props) => {
  const [value, setValue] = useState([100, 60000]);
  const context = useContext(MyContext);
  const [filterSubCat, setFilterSubCat] = useState();

  const handleChange = (event) => {
    setFilterSubCat(event.target.value);
    alert(event.target.value);
  };

  const filterBySubCat = (id) => {
    alert(id);
  };
  return (
    <div className="sideBar">
      <div className="sticky">
        <div className="filterBox">
          <h6>DANH MỤC SẢN PHẨM</h6>
          <div className="scroll">
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={filterSubCat}
              onChange={handleChange}
            >
              {context.subCatData?.length !== 0 &&
                context.subCatData?.map((item, index) => {
                  return (
                    <FormControlLabel
                      value={item?._id}
                      control={
                        <Radio onChange={() => filterBySubCat(item?._id)} />
                      }
                      label={item?.subCat}
                    />
                  );
                })}
            </RadioGroup>
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
