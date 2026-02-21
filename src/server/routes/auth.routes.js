import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});
router.post("/register", register);

export default router; // ✅ THIS LINE MUST EXIST
