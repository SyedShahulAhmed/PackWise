import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";

dotenv.config();
const app = express();

// ✅ CORS Setup
const allowedOrigins = [
  "http://localhost:5173", // local development
  "https://pack-wise-app.vercel.app" // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// Middleware
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.json("Welcome to the PackWise API!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

// DB Connection and Server Start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error(err));

export default app;
