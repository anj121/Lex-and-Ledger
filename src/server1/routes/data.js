import express from 'express'
import {
	getDashboardStats,
	getAllServices,
	getServiceAnalytics,
	searchServices,
	getCategories,
	bulkServiceOperations
} from '../controllers/dataController.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// @route   GET /api/data/dashboard
// @desc    Get dashboard statistics
// @access  Private (Admin only)
router.get('/dashboard', protect, authorize('admin', 'super-admin'), getDashboardStats);

// @route   GET /api/data/services
// @desc    Get all services with advanced filtering
// @access  Public
router.get('/services', getAllServices);

// @route   GET /api/data/services/analytics
// @desc    Get service analytics
// @access  Private (Admin only)
router.get('/services/analytics', protect, authorize('admin', 'super-admin'), getServiceAnalytics);

// @route   GET /api/data/services/search
// @desc    Search services with advanced options
// @access  Public
router.get('/services/search', searchServices);

// @route   GET /api/data/categories
// @desc    Get service categories with counts
// @access  Public
router.get('/categories', getCategories);

// @route   POST /api/data/services/bulk
// @desc    Bulk operations on services
// @access  Private (Admin only)
router.post('/services/bulk', protect, authorize('admin', 'super-admin'), bulkServiceOperations)

export default router

