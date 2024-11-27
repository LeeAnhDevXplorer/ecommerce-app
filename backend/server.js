import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import categoryRouter from './controllersRouter/categories.js'; // Adjust the path as needed
import pRamRouter from './controllersRouter/productRams.js';
import productRouter from './controllersRouter/products.js';
import psizeRouter from './controllersRouter/productSize.js';
import pWeightRouter from './controllersRouter/productWeigth.js';
import subCatRouter from './controllersRouter/subCategory.js';
const app = express();
app.use(express.json());

app.use(cors());
app.options('*', cors());

// Router
app.use('/uploads', express.static('uploads'));
app.use('/api/category', categoryRouter);
app.use('/api/subcategory', subCatRouter);
app.use('/api/products', productRouter);
app.use('/api/weight', pWeightRouter);
app.use('/api/prams', pRamRouter);
app.use('/api/psize', psizeRouter);

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('API Working');
});

// Start Server
const PORT = process.env.PORT || 5000; // Set a default port if env variable is not set
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// mongodb+srv://anhstack:2580@cluster0.97hw4.mongodb.net/?

//mongodb+srv://anhstack:2580@cluster0.97hw4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
