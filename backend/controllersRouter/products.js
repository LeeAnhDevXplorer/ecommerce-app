import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import pLimit from 'p-limit';
import { Category } from '../models/categories.js';
import { Products } from '../models/products.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Truy vấn cơ sở dữ liệu để lấy danh sách sản phẩm và điền đầy đủ thông tin danh mục của từng sản phẩm
    const productList = await Products.find().populate('category');

    // Kiểm tra xem danh sách sản phẩm có rỗng không, nếu không có sản phẩm nào thì trả về mã 404 (Not Found)
    if (!productList || productList.length === 0) {
      return res.status(404).json({
        success: false, // Biến success được set thành false để chỉ ra rằng yêu cầu không thành công
        message: 'No products found', // Gửi kèm thông điệp cho biết không tìm thấy sản phẩm nào
      });
    }

    // Nếu tìm thấy sản phẩm, trả về danh sách với mã 200 (OK) và gửi kèm danh sách sản phẩm trong đối tượng JSON
    res.status(200).json({
      success: true, // Biến success được set thành true để cho biết yêu cầu thành công
      data: productList, // Chứa danh sách các sản phẩm và danh mục tương ứng
    });
  } catch (error) {
    // Trong trường hợp xảy ra lỗi khi truy vấn, bắt lỗi và trả về mã 500 (Internal Server Error)
    res.status(500).json({
      success: false, // Biến success được set thành false để chỉ ra rằng có lỗi
      error: error.message, // Gửi thông điệp lỗi cụ thể để dễ dàng debug
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
    return res.status(200).send(product);
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
    // Kiểm tra xem danh mục có tồn tại hay không
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).json({ message: 'Invalid category' }); // Trả về lỗi nếu danh mục không hợp lệ
    }

    // Kiểm tra xem trong body của request có mảng hình ảnh hay không
    if (!req.body.images || !Array.isArray(req.body.images)) {
      return res.status(400).json({ message: 'No images provided' }); // Trả về lỗi nếu không có hình ảnh nào được cung cấp
    }

    const limit = pLimit(2); // Giới hạn việc upload hình ảnh chỉ 2 tác vụ đồng thời
    const uploadStatus = await Promise.all(
      req.body.images.map((image) => {
        return limit(async () => {
          const result = await cloudinary.uploader.upload(image); // Upload hình ảnh lên Cloudinary
          return result;
        });
      })
    );

    // Kiểm tra nếu việc upload thất bại
    if (!uploadStatus) {
      return res.status(500).json({
        error: 'Images could not be uploaded!',
        success: false,
      });
    }

    // Duyệt qua mảng uploadStatus để lấy URL của từng hình ảnh đã upload
    const imgUrls = uploadStatus.map((item) => item.url);

    // Tạo đối tượng sản phẩm mới với các thông tin từ req.body và URL hình ảnh
    const product = new Products({
      name: req.body.name,
      description: req.body.description,
      images: imgUrls,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });

    // Lưu sản phẩm mới vào cơ sở dữ liệu
    const savedProduct = await product.save();

    // Nếu lưu sản phẩm thất bại, trả về lỗi
    if (!savedProduct) {
      return res.status(500).json({
        error: 'Failed to create the product!',
        success: false,
      });
    }

    // Nếu thành công, trả về sản phẩm đã tạo với mã trạng thái 201
    res.status(201).json(savedProduct);
  } catch (error) {
    // Xử lý lỗi phát sinh trong quá trình xử lý
    res.status(500).json({
      error: error.message || 'Internal Server Error',
      success: false,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const deleteProduct = await Products.findByIdAndDelete(req.params.id);
  if (!deleteProduct) {
    return res.status(404).json({
      message: 'Xóa sản phẩm thất bại',
      status: false,
    });
  }
  res.status(200).send({
    message: 'Xóa sản phẩm thành công',
    status: true,
  });
});

router.put('/:id', async (req, res) => {
  const limit = pLimit(2); // Giới hạn việc upload hình ảnh chỉ 2 tác vụ đồng thời
  const uploadStatus = await Promise.all(
    req.body.images.map((image) => {
      return limit(async () => {
        const result = await cloudinary.uploader.upload(image); // Upload hình ảnh lên Cloudinary
        return result;
      });
    })
  );

  // Kiểm tra nếu việc upload thất bại
  if (!uploadStatus) {
    return res.status(500).json({
      error: 'Images could not be uploaded!',
      success: false,
    });
  }

  // Duyệt qua mảng uploadStatus để lấy URL của từng hình ảnh đã upload
  const imgUrls = uploadStatus.map((item) => item.url);

  const product = await Products.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      images: imgUrls,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    {
      new: true,
    }
  );
  if (!product) {
    res.status(404).json({
      message: 'Đã xảy ra lỗi khi sửa sản phẩm',
      status: false,
    });
  }
  res.status(200).json({
    message: 'Đã sửa sản phẩm',
    status: true,
  });
});

export default router;
