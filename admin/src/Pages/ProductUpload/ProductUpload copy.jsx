import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import { Breadcrumbs, Chip } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import { emphasize, styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import './ProductUpload.css';

const StyleBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const ProductUpload = () => {
  const [showCat, setShowCat] = useState('');
  const [value, setValue] = useState(0);
  const [showSubCat, setShowSubCat] = useState('');
  const [isshowFeatured, setisShowFeatured] = useState('');
  const [showRam, setShowRam] = useState('');

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4">
        <h5 className="mb-0">Product Upload</h5>
        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
          <StyleBreadcrumb
            component="a"
            href="/"
            label="Dashboard"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyleBreadcrumb
            href="#"
            label="Products"
            deleteIcon={<ExpandMoreIcon />}
          />
          <StyleBreadcrumb label="Product Upload" />
        </Breadcrumbs>
      </div>
      <form action="" className="form">
        <div className="row">
          <div className="col-md-12">
            <div className="card mt-0 p4 w-100">
              <h5 className="mb-4">Basic Information</h5>
              <div className="form-group mb-4">
                <h6 className="mb-2">PRODUCT NAME</h6>
                <input type="text" name="name" />
              </div>
              <div className="form-group">
                <h6>DESCRIPTION</h6>
                <textarea rows="5" cols="10"></textarea>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>CATEGORY</h6>
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
                      <MenuItem value={10}>Men</MenuItem>
                      <MenuItem value={20}>Women</MenuItem>
                      <MenuItem value={30}>Kids</MenuItem>
                    </Select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>SUB CATEGORY</h6>
                    <Select
                      value={showSubCat}
                      onChange={(e) => setShowSubCat(e.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Jeans</MenuItem>
                      <MenuItem value={20}>Shorts</MenuItem>
                    </Select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>PRICE</h6>
                    <input type="text" name="price" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>OLD PRICE</h6>
                    <input type="text" name="oldPrice" />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>is Featured</h6>
                    <Select
                      value={isshowFeatured}
                      onChange={(e) => setisShowFeatured(e.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>True</MenuItem>
                      <MenuItem value={20}>False</MenuItem>
                    </Select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>PRODUCT STOCK</h6>
                    <input type="text" name="stock" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>BRAND</h6>
                    <input type="text" name="brand" />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>DISCOUNT</h6>
                    <input type="text" name="discount" />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>PRODUCT RAM</h6>
                    <Select
                      value={showRam}
                      onChange={(e) => setShowRam(e.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>4GB</MenuItem>
                      <MenuItem value={20}>8GB</MenuItem>
                      <MenuItem value={30}>12GB</MenuItem>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <h6>RATINGS</h6>
                    <Rating
                      className="star_icon"
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-4 mt-0 w-100">
          <div className="imagesUploadSec">
            <h5 className="mb-4">Media And Published</h5>
            <div className="imgUploadBox d-flex align-items-center">
              <div className="uploadBox">
                <span className="remove">
                  <TiDelete />
                </span>
                <div className="box">
                  <span
                    className="lazy-load-image-background blur lazy-load-image-loaded"
                    style={{ color: 'transparent', display: 'inline-block' }}
                  >
                    <img
                      alt="image"
                      className="w-100"
                      src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                    />
                  </span>
                </div>
              </div>

              <div className="uploadBox">
                <input type="file" multiple="" name="images" />
                <div className="info">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 576 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z"></path>
                  </svg>
                  <h5>Image Upload</h5>
                </div>
              </div>
            </div>

            <Button className="btn-blue btn-big btn-lg btn-round w-100 mt-5">
              &nbsp; PUBLISH AND VIEW
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductUpload;
