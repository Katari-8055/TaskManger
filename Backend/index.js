// index.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./DB/DatabaseConnection.js"; // Add .js
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
// // Routes (Uncomment when available)
// import noteRoutes from "./routes/noteRoutes.js";
// app.use("/api/notes", noteRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the Notes API");
});

app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
