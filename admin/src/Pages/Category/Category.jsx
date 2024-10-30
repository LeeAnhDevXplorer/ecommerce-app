// Imports
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import {
  Backdrop,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  TextField,
} from '@mui/material';
import { emphasize, styled } from '@mui/material/styles';
import React, { useContext, useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';
import './Category.css';

// Styled Component
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

// Main Component
const Category = () => {
  const context = useContext(MyContext);
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [formFields, setFormFields] = useState({
    name: '',
    images: '',
    color: '',
  });
  const [open, setOpen] = useState(false);
  const [catData, setCatData] = useState([]);
  const [editID, setEditID] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  const fetchCategories = async (page = 1) => {
    setLoading(true); // Đặt trạng thái loading thành true
    try {
      const response = await fetchDataFromApi(`/api/category?page=${page}`);
      setCatData(response); // Cập nhật trạng thái catData với dữ liệu nhận được
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false); // Đặt trạng thái loading thành false
    }
  };

  useEffect(() => {
    context.setProgress(30);
    fetchCategories(context.setProgress(100)); // Gọi hàm để tải danh mục khi component được mount
  }, []);

  const editCat = async (_id) => {
    setOpen(true); // Mở dialog chỉnh sửa
    setEditID(_id); // Cập nhật ID của danh mục đang chỉnh sửa
    try {
      const res = await fetchDataFromApi(`/api/category/${_id}`);
      if (res) {
        setFormFields({
          name: res.name,
          images: res.images.join(', '),
          color: res.color,
        });
      }
    } catch (error) {
      console.error('Failed to fetch category data:', error);
    }
  };

  const handleClose = () => {
    setOpen(false); // Đóng dialog
    setFormFields({ name: '', images: '', color: '' }); // Đặt lại các trường trong form
  };

  const editCategoryFun = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    setLoading(true); // Đặt trạng thái loading thành true
    try {
      const imagesArray = formFields.images.split(',').map((img) => img.trim());
      await editData(`/api/category/${editID}`, {
        name: formFields.name,
        images: imagesArray,
        color: formFields.color,
      });
      fetchCategories(); // Tải lại danh sách danh mục sau khi chỉnh sửa
      handleClose(); // Đóng dialog
    } catch (error) {
      console.error('Failed to edit category:', error);
    } finally {
      setLoading(false); // Đặt trạng thái loading thành false
       context.setAlertBox({
         error: false,
         msg: 'Sửa thành công',
         open: true,
       });
    }
   
  };

  const changeInput = (e) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [e.target.name]: e.target.value, // Cập nhật trường tương ứng trong form
    }));
  };

  const handleOpenDeleteDialog = (_id) => {
    setDeleteID(_id); // Cập nhật ID của danh mục đang xóa
    setOpenDeleteDialog(true); // Mở dialog xóa
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false); // Đóng dialog xóa
    setDeleteID(null); // Đặt lại ID xóa
  };

  const handleDeleteConfirm = async () => {
    context.setProgress(30); // Set progress to 30% to indicate the deletion process has started

    try {
      await deleteData(`/api/category/${deleteID}`); // Call API to delete the category
      context.setProgress(70); // Set progress to 70% after the deletion request is made
      await fetchCategories(); // Reload the category list after deletion
      context.setProgress(100); // Set progress to 100% after categories are fetched
      handleCloseDeleteDialog(); // Close the delete dialog
    } catch (error) {
      console.error('Failed to delete category:', error);
      context.setProgress(0); // Optionally reset progress to 0% on error or handle as needed
    }
  };

  const handleChange = async (event, value) => {
    context.setProgress(30); // Set progress to 30%

    try {
      await fetchCategories(value); // Wait for the fetchCategories to complete
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Handle error appropriately, maybe set progress to an error state
    } finally {
      context.setProgress(100); // Set progress to 100% after fetching
    }
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 p-3 mt-4 w-100">
          {/* Header */}
          <div className="MuiBox-root css-99a237 d-flex">
            <h6 className="MuiTypography-root MuiTypography-h6 css-66yapz-MuiTypography-root">
              Projects Table
            </h6>
            <Breadcrumbs
              aria-label="breadcrumb"
              className="ml-auto breadcrumbs_"
            >
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
              <Button className="btn-blue btn-lg">
                <Link style={{ color: '#fff' }} to={'/category/categoryadd'}>
                  Thêm danh mục
                </Link>
              </Button>
            </Breadcrumbs>
          </div>

          {/* Table */}
          <div className="table-responsive w-100 mt-5">
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th>IMAGE</th>
                  <th>NAME CATEGORY</th>
                  <th>COLOR</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {catData?.categoryList?.map((item, index) => (
                  <tr key={item._id}>
                    <td>#{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center productBox">
                        <div className="imgWrapper">
                          <div className="img">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-100"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div
                        className="text-center"
                        style={{
                          backgroundColor: item.color,
                          height: '50px',
                          lineHeight: '50px',
                        }}
                      >
                        {item.color}
                      </div>
                    </td>
                    <td>
                      <div className="actions d-flex align-items-center">
                        <Button
                          className="success"
                          color="success"
                          onClick={() => editCat(item._id)}
                        >
                          <FaPencilAlt />
                        </Button>
                        <Button
                          className="error"
                          color="error"
                          onClick={() => handleOpenDeleteDialog(item._id)}
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer */}
            <div className="d-flex tableFooter">
              <p>
                Showing <b>{catData.categoryList?.length}</b> of{' '}
                <b>{catData.totalPosts}</b> Results
              </p>
              {catData.totalPages > 0 && (
                <Pagination
                  count={catData.totalPages}
                  page={catData.page}
                  showFirstButton
                  showLastButton
                  onChange={handleChange}
                  color="primary"
                  className="pagination"
                />
              )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          className="edit-modal"
        >
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogContent>
            <DialogContentText className="text-center mt-4 mb-0">
              Bạn có chắc chắn muốn xóa danh mục này không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDeleteDialog}
              style={{ fontSize: '1.6rem' }}
              variant="outlined"
            >
              Hủy
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              className="btn-lg"
              style={{ fontSize: '1.6rem', border: '1px solid red' }}
            >
              Xóa
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Category Dialog */}
        <Dialog
          open={open}
          onClose={handleClose}
          className="edit-modal"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Vui lòng nhập thông tin danh mục
            </DialogContentText>
            <form onSubmit={editCategoryFun}>
              <TextField
                autoFocus
                margin="dense"
                label="Tên danh mục"
                type="text"
                fullWidth
                name="name"
                value={formFields.name}
                onChange={changeInput} // Cập nhật trạng thái khi nhập
              />
              <TextField
                autoFocus
                margin="dense"
                label="Hình ảnh (dùng dấu phẩy để ngăn cách)"
                type="text"
                fullWidth
                name="images"
                value={formFields.images}
                onChange={changeInput} // Cập nhật trạng thái khi nhập
              />
              <TextField
                autoFocus
                margin="dense"
                label="Màu sắc"
                type="text"
                fullWidth
                name="color"
                value={formFields.color}
                onChange={changeInput} // Cập nhật trạng thái khi nhập
              />
              <DialogActions>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  style={{ fontSize: '1.6rem' }}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="btn-blue btn-lg"
                >
                  {loading ? 'Đang lưu...' : 'Lưu'}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        {/* Backdrop for loading */}
        <Backdrop
          sx={{
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            // zIndex: (theme) => theme.zIndex.drawer + 1,
            transition: 'opacity 0.3s ease-in-out',
            zIndex: 9999,
          }}
          open={loading}
        >
          <CircularProgress color="inherit" size={50} thickness={2} />
        </Backdrop>
      </div>
    </>
  );
};

export default Category;
