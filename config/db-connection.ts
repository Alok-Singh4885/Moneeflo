import mongoose from "mongoose";
require("dotenv").config();

const envLoaded = process.env;

const DB_URI = envLoaded.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = envLoaded.DB_DATABASE || "Monefflo";

console.log({ DB_URI, DB_NAME });

mongoose.connect(`${DB_URI}/${DB_NAME}`)
  .then(() => console.log(`MongoDB connected to ${DB_NAME}`))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

export { mongoose };
