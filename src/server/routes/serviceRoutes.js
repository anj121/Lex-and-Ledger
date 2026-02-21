import express from 'express';
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
  getServiceById
} from '../controllers/serviceController.js';

const router = express.Router();

// If admin auth chahiye to yahan middleware lagao
// router.use(adminAuthMiddleware);

router.get('/', getAllServices);
router.get('/:id', getServiceById);

router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;
