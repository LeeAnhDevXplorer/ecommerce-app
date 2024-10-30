import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import pLimit from 'p-limit';
import { Category } from '../models/categories.js';
import { Products } from '../models/products.js';

const router = express.Router();

// Hàm upload hình ảnh
const uploadImages = async (images) => {
  const limit = pLimit(2); // Giới hạn việc upload hình ảnh chỉ 2 tác vụ đồng thời
  const uploadStatus = await Promise.all(
    images.map((image) => {
      return limit(() => cloudinary.uploader.upload(image)); // Upload hình ảnh lên Cloudinary
    })
  );
  return uploadStatus;
};

router.get('/', async (req, res) => {
  try {
    const productList = await Products.find().populate('category');
    if (!productList || productList.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found',
      });
    }
    res.status(200).json({
      success: true,
      data: productList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: 'Không tìm thấy sản phẩm có id đã cho',
      });
    }
    return res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      message: 'Đã xảy ra lỗi trong khi tìm kiếm sản phẩm',
      error: err.message,
    });
  }
});

// POST request để tạo sản phẩm mới
router.post('/create', async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    if (!req.body.images || !Array.isArray(req.body.images)) {
      return res.status(400).json({ message: 'No images provided' });
    }

    const uploadStatus = await uploadImages(req.body.images);

    const imgUrls = uploadStatus.map((item) => item.url);

    const product = new Products({
      name: req.body.name,
      description: req.body.description,
      images: imgUrls,
      brand: req.body.brand,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({
      error: error.message || 'Internal Server Error',
      success: false,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteProduct = await Products.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res.status(404).json({
        message: 'Không tìm thấy sản phẩm để xóa',
        status: false,
      });
    }
    res.status(200).json({
      message: 'Xóa sản phẩm thành công',
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi xóa sản phẩm',
      error: error.message,
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const existingProduct = await Products.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({
        message: 'Không tìm thấy sản phẩm để cập nhật',
        status: false,
      });
    }

    let imgUrls;
    if (req.body.images && Array.isArray(req.body.images)) {
      const uploadStatus = await uploadImages(req.body.images);
      imgUrls = uploadStatus.map((item) => item.url);
    } else {
      imgUrls = existingProduct.images; // Giữ lại hình ảnh cũ nếu không có hình ảnh mới
    }

    const product = await Products.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        images: imgUrls,
        brand: req.body.brand,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
      },
      { new: true }
    );

    res.status(200).json({
      message: 'Đã sửa sản phẩm',
      status: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi sửa sản phẩm',
      error: error.message,
      status: false,
    });
  }
});

export default router;
