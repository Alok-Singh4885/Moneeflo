import mongoose from "mongoose";
require("dotenv").config();

const envLoaded = process.env;

const DB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Monefflo';

const DB_NAME = envLoaded.DB_DATABASE || "Monefflo";

mongoose.connect(DB_URI)
  .then(() => console.log(`MongoDB connected to ${DB_NAME}`))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

export { mongoose };
