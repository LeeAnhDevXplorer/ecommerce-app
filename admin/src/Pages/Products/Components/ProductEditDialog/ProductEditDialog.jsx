import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import ImageUpload from '../../../../Components/ImageUpload/ImageUpload';

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
}) => {
  return (
    <div className="grid grid-cols-6 grid-rows-1 gap-4">
      <div className="col-span-6">
        {' '}
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          className="edit-modal"
        >
          <AppBar
            sx={{
              position: 'relative',
              color: '#000',
              display: 'flex',
              alignItems: '',
              justifyContent: 'center',
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon sx={{ fontSize: '2.4rem' }} />
              </IconButton>
              <Typography
                sx={{ ml: 2, flex: 1, fontSize: '1.6rem' }}
                component="div"
              >
                Sound
              </Typography>
              <Button
                type="submit"
                sx={{ fontSize: '1.8rem' }}
                autoFocus
                color="inherit"
                onClick={editPFun}
              >
                Save
              </Button>
            </Toolbar>
          </AppBar>

          <div className="grid grid-cols-6 grid-rows-1 gap-4">
            <div className="col-span-4 col-start-2">
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
                <TextField
                  required
                  id="outlined-required"
                  label="Mô tả sản phẩm"
                  fullWidth
                  defaultValue="description"
                  className="mb-4"
                  name="description"
                  value={formFields.description} // giữ `value` để làm controlled component
                  onChange={changeInput}
                />
                <div className="grid grid-cols-6 grid-rows-1 gap-4">
                  <div className="col-span-2 col-start-2">
                    <TextField
                      required
                      // id="outlined-required"
                      label="Giá mới"
                      fullWidth
                      className="mb-4"
                      defaultValue="price"
                      name="price"
                      value={formFields.price} // giữ `value` để làm controlled component
                      onChange={changeInput}
                    />
                  </div>
                  <div className="col-span-2 col-start-4">
                    {' '}
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
                </div>
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
              </List>
            </div>
          </div>
          <ImageUpload
            previews={previews}
            onChangeFile={onChangeFile}
            removeFile={removeFile}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default ProductEditDialog;
