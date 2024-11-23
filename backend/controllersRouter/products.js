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

// Route to get a single product by ID
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

// router.post('/create', upload.array('images'), async (req, res) => {
//   try {
//     console.log('--- Debug Start: Product Creation ---');
//     console.log('Request Body:', req.body);

//     // Upload images and get their URLs
//     const uploadStatus = await uploadImages(req.files);
//     console.log('Image Upload Status:', uploadStatus);

//     const imgUrls = uploadStatus
//       .filter((item) => item.success)
//       .map((item) => item.url);

//     console.log('Filtered Image URLs:', imgUrls);

//     if (imgUrls.length === 0) {
//       return res.status(500).json({
//         success: false,
//         message: 'Image upload failed.',
//       });
//     }

//     // Extract fields from request body
//     const {
//       name,
//       price,
//       category,
//       subCat,
//       description,
//       brand,
//       oldPrice,
//       countInStock,
//       rating,
//       isFeatured,
//       discount,
//       weightName, // A comma-separated string of weight names
//       ramName,
//       sizeName,
//     } = req.body;

//     console.log('Parsed Fields:', {
//       name,
//       price,
//       category,
//       subCat,
//       description,
//       brand,
//       oldPrice,
//       countInStock,
//       rating,
//       isFeatured,
//       discount,
//       weightName,
//       ramName,
//       sizeName,
//     });

//     // Validate ObjectId fields for category and subCat
//     if (!mongoose.isValidObjectId(category)) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'Invalid category ID.' });
//     }
//     if (!mongoose.isValidObjectId(subCat)) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'Invalid sub-category ID.' });
//     }

//     // Split and process weightName, ramName, and sizeName
//     const weightNames = weightName.split(',').map((w) => w.trim());
//     const ramNames = ramName.split(',').map((r) => r.trim());
//     const sizeNames = sizeName.split(',').map((s) => s.trim());

//     console.log('Split Weight Names:', weightNames);

//     // Fetch IDs for weights
//     const weightDocs = await ProductWeigth.find({
//       weightName: { $in: weightNames },
//     });
//     const weightIds = weightDocs.map((doc) => doc._id);

//     if (weightIds.length !== weightNames.length) {
//       const foundWeights = weightDocs.map((doc) => doc.weightName);
//       const missingWeights = weightNames.filter(
//         (w) => !foundWeights.includes(w)
//       );
//       return res.status(400).json({
//         success: false,
//         message: `Invalid weights provided: ${missingWeights.join(', ')}`,
//       });
//     }

//     // Fetch IDs for RAMs and Sizes
//     const ramDocs = await ProductRams.find({ ramName: { $in: ramNames } });
//     const ramIds = ramDocs.map((doc) => doc._id);

//     const sizeDocs = await ProductSize.find({ sizeName: { $in: sizeNames } });
//     const sizeIds = sizeDocs.map((doc) => doc._id);

//     // Validate category and sub-category existence
//     const existingCategory = await Category.findById(category);
//     if (!existingCategory) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'Invalid category.' });
//     }

//     const existingSubCategory = await SubCategory.findById(subCat);
//     if (!existingSubCategory) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'Invalid sub-category.' });
//     }

//     // Create new product
//     const newProduct = new Products({
//       name,
//       description,
//       images: imgUrls,
//       brand,
//       price,
//       oldPrice,
//       category,
//       subCat,
//       countInStock,
//       rating: rating || 0,
//       isFeatured: isFeatured || false,
//       discount,
//       weightName: weightIds, // Array of ObjectId for weights
//       ramName: ramIds, // Array of ObjectId for RAMs
//       sizeName: sizeIds, // Array of ObjectId for Sizes
//     });

//     const savedProduct = await newProduct.save();
//     console.log('Product saved successfully:', savedProduct);

//     return res.status(201).json({
//       success: true,
//       message: 'Product created successfully.',
//       product: savedProduct,
//     });
//   } catch (error) {
//     console.error('Error creating product:', error.message);
//     res.status(500).json({
//       success: false,
//       message: 'Server error.',
//       error: error.message,
//     });
//   }
// });

// PUT: Update an existing product

router.post('/create', upload.array('images'), async (req, res) => {
  try {
    console.log('--- Debug Start: Product Creation ---');
    console.log('Request Body:', req.body);

    // Upload images and get their URLs
    const uploadStatus = await uploadImages(req.files);
    console.log('Image Upload Status:', uploadStatus);

    const imgUrls = uploadStatus
      .filter((item) => item.success)
      .map((item) => item.url);

    console.log('Filtered Image URLs:', imgUrls);

    if (imgUrls.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'Image upload failed.',
      });
    }

    // Extract fields from request body
    const {
      name,
      category,
      subCat,
      description,
      brand,
      oldPrice,
      countInStock,
      rating,
      isFeatured,
      discount,
      weightName, // A comma-separated string of weight names
      ramName,
      sizeName,
    } = req.body;

    console.log('Parsed Fields:', {
      name,
      category,
      subCat,
      description,
      brand,
      oldPrice,
      countInStock,
      rating,
      isFeatured,
      discount,
      weightName,
      ramName,
      sizeName,
    });

    // Validate ObjectId fields for category and subCat
    if (!mongoose.isValidObjectId(category)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid category ID.' });
    }
    if (!mongoose.isValidObjectId(subCat)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid sub-category ID.' });
    }

    // Split and process weightName, ramName, and sizeName
    const weightNames = weightName.split(',').map((w) => w.trim());
    const ramNames = ramName.split(',').map((r) => r.trim());
    const sizeNames = sizeName.split(',').map((s) => s.trim());

    console.log('Split Weight Names:', weightNames);

    // Fetch IDs for weights
    const weightDocs = await ProductWeigth.find({
      weightName: { $in: weightNames },
    });
    const weightIds = weightDocs.map((doc) => doc._id);

    if (weightIds.length !== weightNames.length) {
      const foundWeights = weightDocs.map((doc) => doc.weightName);
      const missingWeights = weightNames.filter(
        (w) => !foundWeights.includes(w)
      );
      return res.status(400).json({
        success: false,
        message: `Invalid weights provided: ${missingWeights.join(', ')}`,
      });
    }

    // Fetch IDs for RAMs and Sizes
    const ramDocs = await ProductRams.find({ ramName: { $in: ramNames } });
    const ramIds = ramDocs.map((doc) => doc._id);

    const sizeDocs = await ProductSize.find({ sizeName: { $in: sizeNames } });
    const sizeIds = sizeDocs.map((doc) => doc._id);

    // Validate category and sub-category existence
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid category.' });
    }

    const existingSubCategory = await SubCategory.findById(subCat);
    if (!existingSubCategory) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid sub-category.' });
    }

    // Calculate price based on oldPrice and discount
    if (discount < 0 || discount > 100) {
      return res.status(400).json({
        success: false,
        message: 'Discount must be between 0 and 100.',
      });
    }

    const price = oldPrice - (oldPrice * discount) / 100;
    console.log(`Calculated Price: ${price} from OldPrice: ${oldPrice} and Discount: ${discount}%`);

    // Create new product
    const newProduct = new Products({
      name,
      description,
      images: imgUrls,
      brand,
      oldPrice,
      price,
      category,
      subCat,
      countInStock,
      rating: rating || 0,
      isFeatured: isFeatured || false,
      discount,
      weightName: weightIds, // Array of ObjectId for weights
      ramName: ramIds, // Array of ObjectId for RAMs
      sizeName: sizeIds, // Array of ObjectId for Sizes
    });

    const savedProduct = await newProduct.save();
    console.log('Product saved successfully:', savedProduct);

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


router.put('/:id', upload.array('images'), async (req, res) => {
  try {
    // Find the product by ID
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    // Upload new images if any
    const uploadStatus = await uploadImages(req.files);
    const newImageUrls = uploadStatus
      .filter((item) => item.success)
      .map((item) => item.url);

    // Validate the updated fields
    const {
      name,
      price,
      category,
      subCat,
      description,
      brand,
      oldPrice,
      countInStock,
      rating,
      isFeatured,
      discount,
      weightName,
      ramName,
      sizeName,
    } = req.body;

    // Validate category and sub-category (same as in POST)
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid category.' });
    }

    const existingSubCategory = await SubCategory.findById(subCat);
    if (!existingSubCategory) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid sub-category.' });
    }

    const existingWeight = await ProductWeigth.findById(weightName);
    if (!existingWeight) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid weight selected.' });
    }

    const existingRam = await ProductRams.findById(ramName);
    if (!existingRam) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid RAM selected.' });
    }

    const existingSize = await ProductSize.findById(sizeName);
    if (!existingSize) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid size selected.' });
    }

    // Update the product
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        images: newImageUrls, // Keep old images if no new ones
        brand,
        price,
        oldPrice,
        category,
        subCat,
        countInStock,
        rating: rating || product.rating,
        isFeatured: isFeatured || product.isFeatured,
        discount,
        weightName,
        ramName,
        sizeName,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully.',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error.',
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
