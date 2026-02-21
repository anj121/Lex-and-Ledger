import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    const hashedPassword = await bcrypt.hash("password123", 12);

    const admin = await User.create({
      username: "admin",
      password: hashedPassword,
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      role: "user", // or 'admin' if your Admin model exists
    });

    console.log("✅ Admin created:", admin);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
