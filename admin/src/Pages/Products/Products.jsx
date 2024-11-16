import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import { Breadcrumbs, Chip, MenuItem, Pagination, Select } from '@mui/material';
import Slide from '@mui/material/Slide';
import React, { useContext, useEffect, useState } from 'react';
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';
import './Products.css';

// Assuming `context` is your Progress context
import { MyContext } from '../../App';
import ProductDeleteDialog from './Components/ProductDeleteDialog/ProductDeleteDialog';
import ProductEditDialog from './Components/ProductEditDialog/ProductEditDialog';
import ProductsTable from './Components/ProductsTable/ProductsTable';

const Products = () => {
  const [open, setOpen] = useState(false);
  const [showBy, setShowBy] = useState('');
  const [showCat, setShowCat] = useState('');
  const [showBrand, setshowBrand] = useState('');
  const [showSearch, setshowSearch] = useState('');
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [deleteID, setDeleteID] = useState(null);
  const [EditP, setEditP] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track total number of pages
  // Khởi tạo trạng thái form với các trường dữ liệu
  const context = useContext(MyContext);
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

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetchDataFromApi(`/api/products?page=${page}`);
      if (response.success) {
        setProductList(response.data);
        setTotalPages(response.totalPages || 1); // Fallback to 1
        setCurrentPage(response.page || 1);
      } else {
        setProductList([]);
        context.setAlertBox({
          error: true,
          msg: response.message || 'Failed to fetch products',
          open: true,
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      context.setAlertBox({
        error: true,
        msg: 'An error occurred while fetching products.',
        open: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false); // Đóng dialog xóa
    setDeleteID(null); // Đặt lại ID xóa
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleOpenDeleteDialog = (_id) => {
    setDeleteID(_id); // Cập nhật ID của danh mục đang xóa
    setOpenDeleteDialog(true); // Mở dialog xóa
  };
  const changeInput = (e) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [e.target.name]: e.target.value, // Cập nhật trường tương ứng trong form
    }));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update the current page
    fetchProducts(value); // Fetch products for the selected page
  };
  const handleClose = () => {
    setOpen(false); // Đóng dialog
  };

  const handleEditP = async (_id) => {
    setOpen(true);
    setEditP(_id);
    try {
      const res = await fetchDataFromApi(`/api/products/${_id}`);
      if (res) {
        console.log('Fetched product data:', res);

        setFormFields({
          name: res.name,
          description: res.description,
          brand: res.brand || '',
          price: res.price || '',
          oldPrice: res.oldPrice || '',
          category: res.category ? res.category.name : '',
          countInStock: res.countInStock || '',
          isFeatured: res.isFeatured || false,
        });

        // Kiểm tra và log thông tin hình ảnh
        console.log('Images from API:', res.images);
        setPreviews(res.images || []);
      }
    } catch (error) {
      console.error('Error fetching product data for edit:', error);
    }
  };

  const editPFun = async (e) => {
    e.preventDefault();
    console.log('Edit function triggered');
    setLoading(true);

    try {
      console.log('Sending edit request for product:', EditP);
      console.log('Form fields before submission:', formFields);

      const formData = new FormData();
      formData.append('name', formFields.name);
      formData.append('description', formFields.description);
      formData.append('brand', formFields.brand);
      formData.append('price', formFields.price);
      formData.append('oldPrice', formFields.oldPrice);
      formData.append('category', formFields.category);
      formData.append('countInStock', formFields.countInStock);
      formData.append('isFeatured', formFields.isFeatured);

      // Add existing images (URLs)
      console.log('Existing images (previews):', previews);
      previews.forEach((preview) => {
        if (typeof preview === 'string' && preview.startsWith('http')) {
          console.log('Adding existing image to formData:', preview);
          formData.append('existingImages', preview);
        }
      });

      // Add new images (files selected)
      console.log('New images (files):', files);
      files.forEach((file) => {
        console.log('Adding new file to formData:', file.name);
        formData.append('images', file);
      });

      // Make the API call to update the product
      await editData(`/api/products/${EditP}`, formData);
      console.log('Edit request successful for product:', EditP);

      setPreviews([]); // Clear previews after successful edit
      setFiles([]); // Clear the new files
      await fetchProducts(); // Refresh the product list after editing
      handleClose(); // Close the edit dialog
    } catch (error) {
      console.error('Failed to edit product:', error);
    } finally {
      setLoading(false);
      context.setAlertBox({
        error: false,
        msg: 'Product edited successfully',
        open: true,
      });
      console.log('Edit completed, loading set to false, alert box updated');
    }
  };

  const handleDeleteConfirm = async () => {
    context.setProgress(30); // Set progress to 30% to indicate the deletion process has started

    try {
      await deleteData(`/api/products/${deleteID}`); // Call API to delete the category
      context.setProgress(70); // Set progress to 70% after the deletion request is made
      await fetchProducts(); // Reload the category list after deletion
      context.setProgress(100); // Set progress to 100% after categories are fetched
      handleCloseDeleteDialog(); // Close the delete dialog
    } catch (error) {
      console.error('Failed to delete category:', error);
      context.setProgress(0); // Optionally reset progress to 0% on error or handle as needed
    }
  };

  const onChangeFile = (e) => {
    if (e?.target?.files) {
      const filesArray = Array.from(e.target.files || []);
      setFiles(filesArray);

      // Create preview URLs for new files
      const newPreviews = filesArray.map((file) => {
        const url = URL.createObjectURL(file);
        return url;
      });

      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);

      // Cleanup old previews
      return () => {
        newPreviews.forEach((preview) => URL.revokeObjectURL(preview));
      };
    }
    console.log(previews);
  };

  const removeFile = (index) => {
    setPreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews.splice(index, 1);
      return newPreviews;
    });

    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts(); // Initial fetch for products
  }, []);
  console.log('Product list to display:', productList);

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 p-3 mt-4 w-100">
        <div className="MuiBox-root css-99a237 d-flex">
          <h6 className="MuiTypography-root MuiTypography-h6 css-66yapz-MuiTypography-root">
            Products Table
          </h6>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <Chip
              component="a"
              href="/"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <Chip href="#" label="Products" icon={<ExpandMoreIcon />} />
          </Breadcrumbs>
        </div>
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
        </div>
        <ProductsTable
          productList={productList}
          context={context}
          loading={loading}
          handleEditP={handleEditP}
          handleOpenDeleteDialog={handleOpenDeleteDialog}
          isHomePage={true}
        />

        <div className="d-flex tableFooter">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            color="primary"
            className="pagination"
          />
        </div>
        <ProductDeleteDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          onDelete={handleDeleteConfirm}
        />
        <ProductEditDialog
          open={open}
          handleClose={handleClose}
          changeInput={changeInput}
          handleInputChange={handleInputChange}
          editPFun={editPFun}
          loading={loading}
          formFields={formFields}
          previews={previews}
          onChangeFile={onChangeFile}
          removeFile={removeFile}
        />
      </div>
    </div>
  );
};

export default Products;
