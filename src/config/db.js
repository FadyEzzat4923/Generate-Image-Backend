/* eslint-disable no-undef */
import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URI = `mongodb+srv://${process.env.AUTHOR}:${process.env.PASSWORD}@cluster0.qrdrajg.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

export const connectDB = async function () {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};
