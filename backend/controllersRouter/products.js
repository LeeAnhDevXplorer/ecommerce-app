import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import multer from 'multer';
import pLimit from 'p-limit';
import { Category } from '../models/categories.js';
import { ProductWeigth } from '../models/productWeigths.js';
import { Products } from '../models/products.js';
import { ProductRams } from '../models/productsRams.js';
import { ProductSize } from '../models/productsSize.js';
import { SubCategory } from '../models/subCategory.js';

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
});

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Utility function for uploading images to Cloudinary with concurrency limit
const uploadImages = async (images) => {
  const limit = pLimit(2); // Set a limit for concurrent uploads
  const uploadStatus = await Promise.all(
    images.map((image) =>
      limit(() =>
        cloudinary.uploader
          .upload(image.path)
          .then((result) => {
            fs.unlinkSync(image.path); // Delete the file after uploading
            return {
              success: true,
              url: result.url,
              publicId: result.public_id,
            };
          })
          .catch((error) => {
            return { success: false, error };
          })
      )
    )
  );
  return uploadStatus;
};

// Route to upload images locally, then upload to Cloudinary
router.post('/upload', upload.array('images'), async (req, res) => {
  const uploadedFiles = req.files.map((file) => file.filename);
  const cloudinaryUploadResults = await uploadImages(req.files);
  res.json({ uploadedFiles, cloudinaryUploadResults });
});

// Route to fetch all products with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const totalPosts = await Products.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return res.status(404).json({ message: 'Page not found' });
    }

    const productList = await Products.find()
      .populate('category')
      .populate('subCat')
      .populate('weightName')
      .populate('ramName')
      .populate('sizeName')
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!productList || productList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No products found' });
    }

    res.status(200).json({
      success: true,
      data: productList,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/featured', async (req, res) => {
  const productList = await Products.find({ isFeatured: true });
  if (!productList) {
    res.status(500).json({ success: false });
  }

  return res.status(200).json(productList);
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Products.findById(req.params.id)
      .populate('category')
      .populate('subCat')
      .populate('weightName')
      .populate('ramName')
      .populate('sizeName');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving product', error: error.message });
  }
});

router.post('/create', upload.array('images'), async (req, res) => {
  try {
    console.log('--- Debug Start: Product Creation ---');

    // Upload images
    const uploadStatus = await uploadImages(req.files);
    const imgUrls = uploadStatus
      .filter((item) => item.success)
      .map((item) => item.url);

    if (imgUrls.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'Image upload failed.',
      });
    }

    const {
      name,
      category,
      subCat,
      catName,
      subName,
      description,
      brand,
      oldPrice,
      countInStock,
      discount,
      weightName,
      ramName,
      sizeName,
      isFeatured,
    } = req.body;

    // Validate category and sub-category IDs
    if (
      !mongoose.isValidObjectId(category) ||
      !mongoose.isValidObjectId(subCat)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category or sub-category ID.',
      });
    }

    // Fetch optional attributes if provided
    let weightIds = [];
    if (weightName) {
      const weightDocs = await ProductWeigth.find({
        weightName: { $in: weightName.split(',') },
      });
      weightIds = weightDocs.map((doc) => doc._id);
    }

    let ramIds = [];
    if (ramName) {
      const ramDocs = await ProductRams.find({
        ramName: { $in: ramName.split(',') },
      });
      ramIds = ramDocs.map((doc) => doc._id);
    }

    let sizeIds = [];
    if (sizeName) {
      const sizeDocs = await ProductSize.find({
        sizeName: { $in: sizeName.split(',') },
      });
      sizeIds = sizeDocs.map((doc) => doc._id);
    }

    // Create the product
    const newProduct = new Products({
      name,
      description,
      images: imgUrls,
      brand,
      oldPrice,
      price: oldPrice * (1 - discount / 100), // Calculate price
      category,
      subCat,
      catName,
      subName,
      countInStock,
      discount,
      weightName: weightIds,
      ramName: ramIds,
      sizeName: sizeIds,
      isFeatured: isFeatured || false,
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json({
      success: true,
      message: 'Product created successfully.',
      product: savedProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error.',
      error: error.message,
    });
  }
});

// API PUT để cập nhật sản phẩm
router.put('/:id', upload.array('images'), async (req, res) => {
  try {
    console.log('Bắt đầu cập nhật sản phẩm với ID:', req.params.id);
    console.log('Dữ liệu nhận được từ client:', req.body); // Log toàn bộ dữ liệu nhận từ client

    // Tìm sản phẩm theo ID
    const product = await Products.findById(req.params.id);
    if (!product) {
      console.log('Không tìm thấy sản phẩm với ID:', req.params.id);
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm.',
      });
    }
    console.log('Sản phẩm tìm thấy:', product);

    // Kiểm tra các trường cần cập nhật, nếu không có dữ liệu thì set thành empty hoặc null
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name || product.name,
        description: req.body.description || product.description,
        images: req.body.images || product.images, // Giữ hình ảnh cũ nếu không có hình ảnh mới
        brand: req.body.brand || product.brand,
        price: req.body.price || product.price, // Nếu không có price mới, giữ price cũ
        oldPrice: req.body.oldPrice || product.oldPrice,
        category: req.body.category || product.category,
        subCat: req.body.subCat || product.subCat,
        catName: req.body.catName || product.catName,
        subName: req.body.subName || product.subName,
        countInStock: req.body.countInStock || product.countInStock,
        discount: req.body.discount || product.discount,

        // Nếu không có dữ liệu cho các trường weightName, ramName, sizeName, sẽ set thành null (hoặc mảng trống)
        weightName: req.body.weightName ? req.body.weightName.split(',') : [], // Nếu không có dữ liệu, set thành mảng trống
        ramName: req.body.ramName ? req.body.ramName.split(',') : [], // Nếu không có dữ liệu, set thành mảng trống
        sizeName: req.body.sizeName ? req.body.sizeName.split(',') : [], // Nếu không có dữ liệu, set thành mảng trống

        isFeatured:
          req.body.isFeatured !== undefined
            ? req.body.isFeatured
            : product.isFeatured, // Giữ giá trị cũ nếu không có update
      },
      { new: true, runValidators: true } // Trả về sản phẩm đã cập nhật
    );

    console.log('Sản phẩm đã được cập nhật thành công:', updatedProduct); // Log sản phẩm đã cập nhật
    return res.status(200).json({
      success: true,
      message: 'Cập nhật sản phẩm thành công.',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error.message);
    res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ.',
      error: error.message,
    });
  }
});

// Delete product route
router.delete('/:id', async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found to delete' });
    }

    const cloudinaryDeletionPromises = product.images.map(async (image) => {
      const publicId = image.split('/').pop().split('.')[0];
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error('Error deleting image on Cloudinary:', error.message);
        }
      }
    });

    await Promise.all(cloudinaryDeletionPromises);
    await Products.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting product', error: error.message });
  }
});

export default router;
