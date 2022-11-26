import express from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from '../controllers/products.controller';
import { isAuthorized } from '../middleware/auth';
import productUpload from '../middleware/productFileUpload';
const router = express.Router();

router.post('/', productUpload.single('image'), isAuthorized, createProduct);
router.put('/:_id', productUpload.single('image'), isAuthorized, updateProduct);
router.delete('/:_id', isAuthorized, deleteProduct);
router.get('/', isAuthorized, getAllProducts);
router.get('/:_id', isAuthorized, getProductById);

export default router;
