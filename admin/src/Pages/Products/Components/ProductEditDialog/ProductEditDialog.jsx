import CloseIcon from '@mui/icons-material/Close';
import { MenuItem, Select, CircularProgress } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import ImageUpload from '../../../../Components/ImageUpload/ImageUpload';
import { fetchDataFromApi } from '../../../../utils/api';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductEditDialog = ({
  handleClose,
  formFields,
  editPFun,
  Transition,
  open,
  changeInput,
  previews = [],
  onChangeFile,
  removeFile,
  handleSelectChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [catData, setCatData] = useState([]);
  const [subCatData, setsubCatData] = useState([]);

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

  useEffect(() => {
    setLoading(true);
    fetchDataFromApi('/api/subCategory')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setsubCatData(res.data);
        } else {
          setsubCatData([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setsubCatData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      className="edit-modal"
    >
      <AppBar
        sx={{
          padding: '0 !impotion',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        <Toolbar
          sx={{
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            position: 'sticky',
            top: '0px',
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ marginRight: '10px' }}
          >
            <IconButton edge="start" color="inherit" aria-label="close">
              <CloseIcon sx={{ fontSize: '2.4rem' }} />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, fontSize: '1.6rem' }}
              component="div"
            >
              Đóng
            </Typography>
          </Button>
          <Button
            className="btn-blue btn-lg"
            type="submit"
            sx={{ fontSize: '1.8rem' }}
            autoFocus
            color="inherit"
            onClick={editPFun}
          >
            Lưu những thay đổi
          </Button>
        </Toolbar>
      </AppBar>{' '}
      <div className="grid grid-cols-2 grid-rows-7 gap-4">
        <div className="col-span-2 row-span-7">
          {' '}
          <List className="p-5">
            <TextField
              required
              id="outlined-required"
              label="Tên sản phẩm"
              fullWidth
              className="mb-4"
              defaultValue="name"
              name="name"
              value={formFields.name} // giữ `value` để làm controlled component
              onChange={changeInput}
            />
            <textarea
              style={{
                width: '100%',
                border: '1px solid #ccc',
                outline: 'none',
                fontSize: '1.6rem',
                padding: '10px',
                borderRadius: '10px',
              }}
              defaultValue="description"
              className="mb-4"
              required
              id="outlined-required"
              label="Mô tả sản phẩm"
              rows="5"
              cols="10"
              name="description"
              onChange={changeInput}
              value={formFields.description}
            ></textarea>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Giá mới"
                  fullWidth
                  className="mb-4"
                  defaultValue="price"
                  name="price"
                  value={formFields.price} // giữ `value` để làm controlled component
                  onChange={changeInput}
                />
              </div>
              <div className="">
                <TextField
                  required
                  id="outlined-required"
                  label="Giá cũ"
                  fullWidth
                  className="mb-4"
                  defaultValue="oldPrice"
                  name="oldPrice"
                  value={formFields.oldPrice} // giữ `value` để làm controlled component
                  onChange={changeInput}
                />
              </div>
              <div className="">
                <TextField
                  autoFocus
                  required
                  id="outlined-required"
                  label="Địa điểm"
                  fullWidth
                  className="mb-4"
                  name="brand"
                  defaultValue="brand"
                  value={formFields.brand} // giữ `value` để làm controlled component
                  onChange={changeInput}
                />
              </div>
              <div className="">
                <TextField
                  required
                  id="outlined-required"
                  label="Tồn kho"
                  fullWidth
                  className="mb-4"
                  defaultValue="countInStock"
                  name="countInStock"
                  value={formFields.countInStock} // giữ `value` để làm controlled component
                  onChange={changeInput}
                />
              </div>
            </div>
            <div className="d-flex gap-4">
              <div className="w-100">
                <Select
                  value={formFields.category}
                  onChange={(e) => handleSelectChange(e, 'category')}
                  displayEmpty
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    catData.map((item, index) => (
                      <MenuItem key={index} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </div>
              <div className="w-100">
                <Select
                  value={formFields.subCat}
                  onChange={(e) => handleSelectChange(e, 'subCat')}
                  displayEmpty
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {subCatData.map((item, index) => (
                    <MenuItem key={index} value={item._id || ''}>
                      {item.subCat || 'No Subcategory'}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </List>
        </div>
      </div>
      <div style={{ padding: '24px' }}>
        <ImageUpload
          previews={previews}
          onChangeFile={onChangeFile}
          removeFile={removeFile}
        />
      </div>
    </Dialog>
  );
};

export default ProductEditDialog;