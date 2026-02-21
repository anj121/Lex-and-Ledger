import express from 'express';
import {
  getAllBundles,
  createBundle,
  updateBundle,
  deleteBundle
} from '../controllers/bundleController.js';

const router = express.Router();

// router.use(adminAuthMiddleware); // later

router.get('/', getAllBundles);
router.post('/', createBundle);
router.put('/:id', updateBundle);
router.delete('/:id', deleteBundle);

export default router;
