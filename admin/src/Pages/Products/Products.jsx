import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import { Breadcrumbs, Chip } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import { emphasize, styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { FaEye, FaPencilAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './Products.css';

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
      boxShadow: theme.shadows[1], // Fixed 'theme.shadow' to 'theme.shadows'
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const Products = () => {
  const [showBy, setShowBy] = useState('');
  const [showCat, setShowCat] = useState('');
  const [showBrand, setshowBrand] = useState('');
  const [showSearch, setshowSearch] = useState('');

  const productData = [
    {
      uid: 1,
      imgSrc:
        'https://tronhouse.com/assets/data/editor/source/nhung-cach-chup-hinh-quan-ao-duoc-uu-chuong-nhat/chup-hinh-sang-tao-1.jpg',
      name: 'Product 1',
      description: 'Description of product 1',
      category: 'Category 1',
      brand: 'Brand 1',
      oldPrice: '$100',
      newPrice: '$59',
      stock: 10,
      rating: '4.5 (16)',
      order: 'Order',
      sales: '$99k',
    },
    // Add more product objects as needed
  ];

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4">
        <h5 className="mb-0">Product List</h5>
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
        </Breadcrumbs>
      </div>
      <div className="card shadow border-0 p-3 mt-4 w-100">
        <h3 className="hd">Danh sách sản phẩm</h3>
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
              {productData.map((product) => (
                <tr key={product.uid}>
                  <td>#{product.uid}</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img src={product.imgSrc} alt="" className="w-100" />
                        </div>
                      </div>
                      <div className="info">
                        <h6>{product.name}</h6>
                        <p>{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <span className="old">{product.oldPrice}</span>
                    <span className="new text-danger">{product.newPrice}</span>
                  </td>
                  <td>{product.stock}</td>
                  <td>{product.rating}</td>
                  <td>{product.order}</td>
                  <td>{product.sales}</td>
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
              ))}
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

export default Products;
