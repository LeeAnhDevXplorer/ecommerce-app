import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import fs from 'fs';
import multer from 'multer';
import pLimit from 'p-limit';
import { Category } from '../models/categories.js';
import { Products } from '../models/products.js';

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
            // Clean up locally saved file after successful upload
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
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10; // Show 10 products per page, adjust as needed
    const totalPosts = await Products.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return res.status(404).json({ message: 'Page not found' });
    }

    const productList = await Products.find()
      .populate('category')
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
    const product = await Products.findById(req.params.id);
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
    // Check if files are provided
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: 'No images provided.',
        success: false,
      });
    }

    // Upload images to Cloudinary
    const uploadStatus = await uploadImages(req.files);

    // Extract URLs of uploaded images
    const imgUrls = uploadStatus
      .filter((item) => item.success)
      .map((item) => item.url);

    if (imgUrls.length === 0) {
      return res.status(500).json({
        message: 'Failed to upload images',
        success: false,
      });
    }

    // Destructure product details from request body
    const {
      name,
      price,
      category,
      description,
      brand,
      oldPrice,
      countInStock,
      rating,
      isFeatured,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !price ||
      !category ||
      !description ||
      !brand ||
      countInStock == null
    ) {
      return res.status(400).json({
        message: 'Missing required fields.',
        success: false,
      });
    }

    // Check if the category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({
        message: 'Invalid category selected.',
        success: false,
      });
    }

    // Create new product
    const newProduct = new Products({
      name,
      description,
      images: imgUrls,
      brand,
      price,
      oldPrice,
      category,
      countInStock,
      rating: rating || 0, // Default to 0 if no rating is provided
      isFeatured: isFeatured || false, // Default to false if not provided
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Respond with success message
    return res.status(201).json({
      message: 'Product created successfully.',
      product: savedProduct,
      success: true,
    });
  } catch (err) {
    // Handle errors
    console.error('Error creating product:', err);
    return res.status(500).json({
      message: err.message || 'Internal server error.',
      success: false,
    });
  }
});

router.put('/:id', upload.array('images'), async (req, res) => {
  try {
    // Step 1: Retrieve the existing product by ID
    const existingProduct = await Products.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Step 2: Handle images
    const newImages = req.files || []; // New images uploaded from form
    const retainedImages = req.body.retainedImages || []; // Retained image URLs (sent from the frontend)

    let updatedImages = [...retainedImages]; // Start with retained images

    // Step 3: If there are new images, upload them to Cloudinary
    if (newImages.length > 0) {
      const uploadStatus = await Promise.allSettled(
        newImages.map((image) =>
          limit(() =>
            cloudinary.uploader
              .upload(image.path)
              .then((result) => {
                fs.unlinkSync(image.path); // Delete file after upload
                return {
                  success: true,
                  url: result.url,
                  publicId: result.public_id,
                };
              })
              .catch((error) => ({ success: false, error: error.message }))
          )
        )
      );

      // Step 4: Filter successful uploads and add them to the updated images list
      const successfulUploads = uploadStatus
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value.url);

      updatedImages = [...updatedImages, ...successfulUploads]; // Add new images to the list of updated images
    }

    // Step 5: Handle category validation
    const category = req.body.category || existingProduct.category;
    const isValidCategory = await Category.findById(category);
    if (!isValidCategory) {
      return res.status(400).json({ message: 'Invalid category selected.' });
    }

    // Step 6: Update product details
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name || existingProduct.name,
        images: updatedImages,
        price: req.body.price || existingProduct.price,
        description: req.body.description || existingProduct.description,
        category: category,
        brand: req.body.brand || existingProduct.brand,
        oldPrice: req.body.oldPrice || existingProduct.oldPrice,
        countInStock: req.body.countInStock || existingProduct.countInStock,
        rating: req.body.rating || existingProduct.rating,
        isFeatured: req.body.isFeatured || existingProduct.isFeatured,
      },
      { new: true } // Return the updated product
    );

    // Step 7: Return the updated product
    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    // Handle errors
    console.error('Error updating product:', error);
    res
      .status(500)
      .json({ message: 'Error updating product', error: error.message });
  }
});

// Route to delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    const images = product.images;

    for (const imagePath of images) {
      const localFileName = imagePath.split('/').pop(); // Lấy tên file từ đường dẫn
      const localPath = `uploads/${localFileName}`; // Tạo đường dẫn cục bộ tới file

      try {
        if (fs.existsSync(localPath)) {
          fs.unlinkSync(localPath); // Xóa file từ thư mục uploads nếu tồn tại
        }
      } catch (error) {
        console.error('Lỗi khi xóa ảnh cục bộ:', error.message);
      }
    }
    // Xóa ảnh trên Cloudinary
    const cloudinaryDeletionPromises = images.map(async (image) => {
      const publicId = image.publicId || image.split('/').pop().split('.')[0]; // Sử dụng public_id hoặc lấy từ URL
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId); // Xóa ảnh từ Cloudinary bằng publicId
        } catch (error) {
          console.error('Lỗi khi xóa ảnh trên Cloudinary:', error.message);
        }
      }
    });

    await Promise.all(cloudinaryDeletionPromises);

    const deleteProduct = await Products.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res.status(404).json({ message: 'Product not found to delete' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting product', error: error.message });
  }
});

export default router;
