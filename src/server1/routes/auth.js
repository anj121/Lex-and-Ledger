import express from 'express'
import { body } from 'express-validator'
import { login, getMe, logout } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// @route   POST /api/auth/login
// @desc    Login admin
// @access  Public
router.post('/login', [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
], login);

// @route   GET /api/auth/me
// @desc    Get current logged in admin
// @access  Private
router.get('/me', protect, getMe);

// @route   POST /api/auth/logout
// @desc    Logout admin
// @access  Private
router.post('/logout', protect, logout)

export default router


