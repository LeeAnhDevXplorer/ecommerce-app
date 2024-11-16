import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import {
  Backdrop,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  MenuItem,
  Select,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { emphasize, styled } from '@mui/material/styles';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { MyContext } from '../../App';
import { fetchDataFromApi, postData } from '../../utils/api';
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
  const context = useContext(MyContext);
  const [catData, setCatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCat, setShowCat] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Khởi tạo trạng thái form với các trường dữ liệu
  const [formFields, setFormFields] = useState({
    name: '',
    description: '',
    images: [],
    brand: '',
    price: '',
    oldPrice: '',
    category: '',
    countInStock: '',
    isFeatured: false,
  });

  // Fetch danh mục sản phẩm khi component được render
  useEffect(() => {
    setLoading(true);
    fetchDataFromApi('/api/category')
      .then((res) => {
        if (Array.isArray(res.categoryList)) {
          setCatData(res.categoryList);
        } else {
          setCatData([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setCatData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onChangeFile = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    // Update state to store the selected files
    setFiles((prevFiles) => [...prevFiles, ...files]);

    // Generate preview URLs for the selected files
    const imgArr = Array.from(files).map((file) => URL.createObjectURL(file));

    // Update the previews state with the generated image URLs
    setPreviews((prevArr) => [...prevArr, ...imgArr]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  // Xử lý thay đổi danh mục
  const handleChangeCategory = (e) => {
    setShowCat(e.target.value);
    setFormFields((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  // Xử lý thay đổi giá trị "isFeatured"
  const handleIsFeaturedChange = (e) => {
    setIsFeatured(e.target.value);
    setFormFields(() => ({
      ...formFields,
      isFeatured: e.target.value,
    }));
  };

  const addProduct = async (event) => {
    event.preventDefault(); // Prevent form submission

    setLoading(true); // Start loading state

    // Set a timeout to simulate a loading delay before showing the notification
    setTimeout(async () => {
      // Destructure the form fields for easy reference
      const {
        name,
        price,
        category,
        images,
        description,
        brand,
        oldPrice,
        countInStock,
        isFeatured,
      } = formFields;

      // Validate required fields
      if (!name || !price || !category || files.length === 0) {
        // Check if files are selected
        setLoading(false);

        context.setAlertBox({
          open: true,
          error: true,
          msg: 'Vui lòng nhập toàn bộ, không được để trống!',
        });
        return;
      }

      // Validate price
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        setLoading(false);
        context.setAlertBox({
          open: true,
          error: true,
          msg: 'Giá phải là số lớn hơn 0.',
        });
        return;
      }

      // Validate countInStock if provided
      const parsedStock = parseInt(countInStock, 10);
      if (countInStock && (isNaN(parsedStock) || parsedStock < 0)) {
        setLoading(false);
        context.setAlertBox({
          open: true,
          error: true,
          msg: 'Số lượng trong kho phải là một số không âm.',
        });
        return;
      }

      // Create FormData and append only the provided fields
      const fd = new FormData();
      fd.append('name', name);
      fd.append('price', parsedPrice);
      fd.append('category', category);
      if (description) fd.append('description', description);
      if (brand) fd.append('brand', brand);
      if (oldPrice) fd.append('oldPrice', oldPrice);
      if (countInStock) fd.append('countInStock', parsedStock);
      fd.append('isFeatured', isFeatured);

      // Append images (from the files array)
      files.forEach((file) => fd.append('images', file));
      console.log(...fd);
      try {
        // API call to create product
        await postData('/api/products/create', fd);

        // On success, show a success message
        context.setAlertBox({
          open: true,
          error: false,
          msg: 'Bạn đã thêm sản phẩm thành công!',
        });

        setLoading(false); // End loading state

        // Reset form fields and state
        setFormFields({
          name: '',
          description: '',
          images: [],
          brand: '',
          price: '',
          oldPrice: '',
          category: '',
          countInStock: '',
          isFeatured: false,
        });
        setFiles([]); // Reset file input
        setPreviews([]); // Reset previews

        // Navigate to the product list page
        navigate('/product/productlist');
      } catch (error) {
        console.error('Error creating product:', error);
        if (error.response && error.response.data) {
          console.error('Server response:', error.response.data); // Log the response data for debugging
          context.setAlertBox({
            open: true,
            error: true,
            msg:
              error.response.data.message ||
              'Đã xảy ra lỗi khi tạo sản phẩm. Vui lòng thử lại.',
          });
        } else {
          context.setAlertBox({
            open: true,
            error: true,
            msg: 'Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.',
          });
        }
        setLoading(false); // End loading state on error
      }
    }, 1000); // Add delay of 1000ms before showing the notification
  };

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
      <form onSubmit={addProduct} className="form">
        <div className="row">
          <div className="col-md-12">
            <div className="card mt-0 p4 w-100">
              <h5 className="mb-4">Basic Information</h5>
              <div className="form-group mb-4">
                <h6 className="mb-2">PRODUCT NAME</h6>
                <input
                  type="text"
                  name="name"
                  value={formFields.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <h6>DESCRIPTION</h6>
                <textarea
                  rows="5"
                  cols="10"
                  name="description"
                  onChange={handleInputChange}
                  value={formFields.description}
                ></textarea>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>CATEGORY</h6>
                    <Select
                      value={formFields.category || ''} // Use an empty string as a fallback
                      onChange={handleChangeCategory}
                      displayEmpty
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {catData.map((item, index) => (
                        <MenuItem key={index} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
                {/* <div className="col">
                  <div className="form-group">
                    <h6>SUB CATEGORY</h6>
                    <Select
                      value={formFields.setShowSubCat}
                      onChange={(e) => setShowSubCat(e.target.value)}
                      displayEmpty
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem>Jeans</MenuItem>
                      <MenuItem>Shorts</MenuItem>
                    </Select>
                  </div>
                </div> */}
                <div className="col">
                  <div className="form-group">
                    <h6>OLD PRICE</h6>
                    <input
                      type="text"
                      name="oldPrice"
                      onChange={handleInputChange}
                      value={formFields.oldPrice}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>NEW PRICE</h6>
                    <input
                      type="text"
                      name="price"
                      onChange={handleInputChange}
                      value={formFields.price}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>Is Featured</h6>
                    <Select
                      value={formFields.isFeatured || false}
                      onChange={handleIsFeaturedChange}
                      name="isFeatured" // Include name to capture in handleInputChange
                      displayEmpty
                      className="w-100"
                    >
                      <MenuItem value={false}>False</MenuItem>
                      <MenuItem value={true}>True</MenuItem>
                    </Select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>PRODUCT STOCK</h6>
                    <input
                      type="text"
                      name="countInStock"
                      onChange={handleInputChange}
                      value={formFields.countInStock}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>BRAND</h6>
                    <input
                      type="text"
                      name="brand"
                      onChange={handleInputChange}
                      value={formFields.brand}
                    />
                  </div>
                </div>
                {/* <div className="col">
                  <div className="form-group">
                    <h6>PRODUCT RAM</h6>
                    <Select
                      value={formFields.showRam}
                      onChange={(e) => setShowRam(e.target.value)}
                      displayEmpty
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem>4GB</MenuItem>
                      <MenuItem>8GB</MenuItem>
                      <MenuItem>12GB</MenuItem>
                    </Select>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* <div className="col-md-3">
            <div className="stickyBox">
              <h4>Product Images</h4>
              <div className="imgGrid d-flex">
                {productImgArr.length > 0 &&
                  productImgArr.map((item, index) => (
                    <div className="img" key={index}>
                      <img src={item} alt="" />
                    </div>
                  ))}
              </div>
            </div>
          </div> */}
        </div>

        {/* <div className="row">
          <div className="col">
            <div className="form-group">
              <h6>product Image</h6>
              <div className="position-relative inputBtn">
                <input
                  type="text"
                  ref={productImgs}
                  name="images"
                  onChange={inputChange}
                />
                <Button onClick={addProductImg} className="btn-lg btn-blue">
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div> */}

        <div className="card p-4 mt-0 w-100">
          <div className="imagesUploadSec">
            <h5 className="mb-4">Media And Published</h5>
            <div className="imgUploadBox d-flex align-items-center">
              {previews.length !== 0 &&
                previews.map((item, index) => (
                  <div className="uploadBox d-flex" key={index}>
                    <span onClick={() => removeFile(index)} className="remove">
                      <TiDelete />
                    </span>
                    <div className="box">
                      <span
                        className="lazy-load-image-background blur lazy-load-image-loaded"
                        style={{
                          color: 'transparent',
                          display: 'inline-block',
                        }}
                      >
                        <img alt="image" className="w-100 h-100" src={item} />
                      </span>
                    </div>
                  </div>
                ))}
              <div className="uploadBox">
                <input
                  type="file"
                  multiple
                  onChange={(e) => onChangeFile(e, '/api/products/upload')}
                  name="images"
                />
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

            <Button
              type="submit"
              className="btn-blue btn-big btn-lg btn-round w-100 mt-5"
            >
              &nbsp; PUBLISH AND VIEW
            </Button>
          </div>
        </div>
      </form>
      <Backdrop
        sx={{
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          transition: 'opacity 0.3s ease-in-out',
          zIndex: 9999,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" size={50} thickness={2} />
      </Backdrop>
    </div>
  );
};

export default ProductUpload;
