import mongoose from 'mongoose';

const connectDB = async () => {
  const dbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Monefflo';

  if (!dbUri) {
    console.error("MongoDB URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(dbUri, {
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
