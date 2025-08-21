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
  "http://localhost:5173", // local dev
  "https://pack-wise-tau.vercel.app" // deployed frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // if you’re using cookies/auth headers
  })
);

app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

// ----------------------
// SERVE FRONTEND IN PROD
// ----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // for React Router (catch-all routes)
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
  });
}
// ----------------------

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
