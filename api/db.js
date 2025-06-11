import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const URI = process.env.MONGODB_URI;

export const connectDB = () => {
  mongoose
    .connect(URI, { dbName: 'Mern_Recipe' })
    .then(() => console.log('MongoDB is connected'))
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Optional: exit on failure
    });
};
