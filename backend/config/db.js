import mongoose from 'mongoose';
export const connectDB = async () => {
  await mongoose
    .connect(
      'mongodb+srv://anhstack:2580@cluster0.97hw4.mongodb.net/ecommerce-app'
    )
    .then(() => console.log('DB Connected'));
};
