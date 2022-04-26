import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  createProductReview,
  updateProduct,
  deleteProduct,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/top').get(getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

export default router;
