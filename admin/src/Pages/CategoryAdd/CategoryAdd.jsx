import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import {
  Backdrop,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { emphasize, styled } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { bgColor } from '../../assets/assets';
import { postData } from '../../utils/api';
import './CategoryAdd.css';

// Styled Breadcrumb
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

const CategoryAdd = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: '',
    images: [], // Initialize as an array
    color: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleImageUrlChange = (e) => {
    const value = e.target.value;
    // Split input by commas, trim whitespace, and update images array
    setFormFields((prevFields) => ({
      ...prevFields,
      images: value.split(',').map((url) => url.trim()), // Now it's an array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate  fields
    const { name, images, color } = formFields;
    if (name && images.length && color) {
      try {
        await postData('/api/category/create', formFields);
        navigate('/category/categorylist');
      } catch (error) {
        context.setAlertBox({
          open: true,
          error: true,
          msg: 'Tên danh mục đã tồn tại. Vui lòng thử lại.',
        });
      } finally {
        setLoading(false);
      }
    } else {
      setTimeout(() => {
        context.setAlertBox({
          open: true,
          error: true,
          msg: 'Vui lòng điền đầy đủ các trường bắt buộc.',
        });
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4">
        <h5 className="mb-0">Thêm danh mục sản phẩm</h5>
        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
          <StyleBreadcrumb
            component="a"
            href="/"
            label="Dashboard"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyleBreadcrumb
            href="#"
            label="Danh mục sản phẩm"
            deleteIcon={<ExpandMoreIcon />}
          />
          <StyleBreadcrumb label="Thêm danh mục" />
        </Breadcrumbs>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="row">
          <div className="col-md-12">
            <div className="card mt-0 p-4 w-100">
              <div className="form-group mb-4">
                <h6 className="mb-2">TÊN DANH MỤC</h6>
                <input
                  type="text"
                  name="name"
                  value={formFields.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-4">
                <h6 className="mb-2">URL IMAGE</h6>
                <input
                  type="text"
                  name="images"
                  value={formFields.images.join(', ')} // This will now work since images is an array
                  onChange={handleImageUrlChange}
                />
              </div>
              <div className="form-group mb-4 w-100">
                <h6 className="mb-2">MÀU DANH MỤC</h6>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="color-select-label"></InputLabel>
                  <Select
                    labelId="color-select-label"
                    id="color-select"
                    value={formFields.color}
                    onChange={handleInputChange}
                    name="color"
                  >
                    {bgColor.map((colorCode, index) => (
                      <MenuItem
                        key={index}
                        value={colorCode}
                        style={{ backgroundColor: colorCode, padding: '12px' }}
                      >
                        {colorCode}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-4 mt-0 w-100">
          <div className="imagesUploadSec">
            <Button
              disabled={loading}
              type="submit"
              className="btn-blue btn-big btn-lg btn-round w-100 mt-5"
            >
              {loading ? 'Đang tải.....' : 'Tải lên danh mục mới'}
            </Button>
          </div>
        </div>
      </form>
      {/* Backdrop for loading */}
      <Backdrop
        sx={{
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          transition: 'opacity 0.3s ease-in-out',
          zIndex: 999,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" size={50} thickness={2} />
      </Backdrop>
    </div>
  );
};

export default CategoryAdd;
