import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import bundleRoutes from "./routes/bundleRoutes.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

const app = express();

/* ------------------ MIDDLEWARES ------------------ */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add cache control headers for API routes
app.use('/api', (req, res, next) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  next();
});

// Logs in dev
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

/* ------------------ DATABASE ------------------ */
console.log("MongoDB URI:", process.env.MONGODB_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    process.exit(1);
  }
};

connectDB();
/* ------------------ ROUTES ------------------ */
// API routes
app.use("/api/auth", authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bundles', bundleRoutes);

/* ------------------ STATIC FILES ------------------ */
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../../dist")));

// Serve React app for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
});




/* ------------------ ERROR HANDLER ------------------ */
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* ------------------ SERVER ------------------ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
