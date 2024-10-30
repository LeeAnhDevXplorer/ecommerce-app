import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import pLimit from 'p-limit';
import { Category } from '../models/categories.js';

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
});

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const totalPosts = await Category.countDocuments();
    const toatalPages = Math.ceil(totalPosts / perPage);

    if (page > toatalPages) {
      return res.status(404).json({ message: 'Không tìm thấy trang' });
    }
    const categoryList = await Category.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    if (!categoryList) {
      res.status(500).json({ success: false });
    }
    return res.status(200).json({
      categoryList: categoryList,
      totalPages: toatalPages,
      page: page,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
  try {
    const categoryList = await Category.find();
    res.send(categoryList);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: 'Không tìm thấy danh mục có id đã cho',
      });
    }
    return res.status(200).send(category);
  } catch (err) {
    res.status(500).json({
      message: 'Đã xảy ra lỗi trong khi tìm kiếm danh mục',
      error: err.message,
    });
  }
});

// POST request để tạo một danh mục mới với hình ảnh
router.post('/create', async (req, res) => {
  try {
    const limit = pLimit(2); // Giới hạn chỉ có 2 tác vụ upload được thực hiện đồng thời

    // Dùng Promise.all để đợi tất cả các tác vụ upload hoàn thành
    const uploadStatus = await Promise.all(
      req.body.images.map((image) => {
        return limit(async () => {
          const result = await cloudinary.uploader.upload(image); // Upload hình ảnh lên Cloudinary
          return result;
        });
      })
    );

    // Lấy URL của các hình ảnh đã upload từ kết quả trả về
    const imgurl = uploadStatus.map((item) => item.url);

    // Nếu không có kết quả upload nào (tức là không có hình ảnh nào được upload)
    if (!uploadStatus || uploadStatus.length === 0) {
      return res.status(500).json({
        error: 'Images cannot upload!',
        status: false,
      });
    }

    // Tạo đối tượng Category mới với thông tin từ request
    let category = new Category({
      name: req.body.name,
      images: imgurl, // Danh sách URL của hình ảnh
      color: req.body.color,
    });

    // Nếu có lỗi trong quá trình tạo Category, gửi phản hồi lỗi
    if (!category) {
      return res.status(500).json({
        error: 'Category creation failed',
        success: false,
      });
    }

    // Lưu Category vào database
    category = await category.save();

    // Trả về phản hồi thành công kèm theo thông tin của Category đã tạo
    return res.status(201).json({
      message: 'Category created successfully',
      category,
      success: true,
    });
  } catch (err) {
    // Xử lý lỗi chung, gửi phản hồi lỗi
    return res.status(500).json({
      error: err.message || 'Internal server error',
      success: false,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await Category.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({
        message: 'Không tìm thấy danh mục',
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Đã xóa danh mục thành công',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi xóa danh mục',
      error: err.message,
    });
  }
});

router.put('/:id', async (req, res) => {
  const limit = pLimit(2);
  const uploadStatus = await Promise.all(
    req.body.images.map((image) => {
      return limit(async () => {
        const result = await cloudinary.uploader.upload(image);
        return result;
      });
    })
  );
  const imgurl = uploadStatus.map((item) => {
    return item.url;
  });
  if (!uploadStatus) {
    return res.status(500).json({
      error: 'Images cannot upload!',
      status: false,
    });
  }
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      images: imgurl,
      color: req.body.color,
    },
    { new: true }
  );
  if (!category) {
    return res.status(500).json({
      message: 'Không thể cập nhật cho danh mục',
      success: false,
    });
  }
  res.send(category);
});

export default router;
