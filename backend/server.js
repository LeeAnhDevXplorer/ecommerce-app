import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import categoryRouter from './controllersRouter/categories.js'; // Adjust the path as needed
import productRoter from './controllersRouter/products.js';

const app = express();

app.use(cors());
app.options('*', cors());
// app.use(bodyParser.json());
app.use(express.json());

// Router
app.use('/api/category', categoryRouter);
app.use('/api/products', productRoter);

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
