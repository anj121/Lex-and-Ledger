import express from 'express'
import { body } from 'express-validator'
import {
	getServices,
	getService,
	createService,
	updateService,
	deleteService,
	getServiceStats
} from '../controllers/serviceController.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// Validation rules for service creation/update
const serviceValidation = [
  body('name')
    .notEmpty()
    .withMessage('Service name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Service name must be between 3 and 100 characters'),
  body('description')
    .notEmpty()
    .withMessage('Service description is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('category')
    .notEmpty()
    .withMessage('Service category is required')
    .isIn([
      'Company Formation',
      'Tax Services',
      'Legal Services',
      'Compliance',
      'Financial Planning',
      'Documentation',
      'Consultation',
      'Other'
    ])
    .withMessage('Invalid service category'),
  body('price')
    .notEmpty()
    .withMessage('Service price is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Price must be between 1 and 50 characters'),
  body('duration')
    .notEmpty()
    .withMessage('Service duration is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Duration must be between 1 and 50 characters'),
  body('features')
    .notEmpty()
    .withMessage('Service features are required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Features must be between 5 and 200 characters'),
  body('requirements')
    .notEmpty()
    .withMessage('Service requirements are required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Requirements must be between 5 and 200 characters'),
  body('status')
    .optional()
    .isIn(['active', 'inactive'])
    .withMessage('Status must be either active or inactive')
];

// @route   GET /api/services
// @desc    Get all services
// @access  Public
router.get('/', getServices);

// @route   GET /api/services/stats/overview
// @desc    Get service statistics
// @access  Private (Admin only)
router.get('/stats/overview', protect, authorize('admin', 'super-admin'), getServiceStats);

// @route   GET /api/services/:id
// @desc    Get single service
// @access  Public
router.get('/:id', getService);

// @route   POST /api/services
// @desc    Create new service
// @access  Private (Admin only)
router.post('/', protect, authorize('admin', 'super-admin'), serviceValidation, createService);

// @route   PUT /api/services/:id
// @desc    Update service
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin', 'super-admin'), serviceValidation, updateService);

// @route   DELETE /api/services/:id
// @desc    Delete service
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin', 'super-admin'), deleteService)

export default router


