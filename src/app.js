/* eslint-disable no-undef */
import express from "express";
import bodyParser from "body-parser";
import userRoute from "./routes/user.js";
import aiRoute from "./routes/ai.js";
import { connectDB } from "./config/db.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use("/auth", userRoute);
app.use(aiRoute);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
