import express from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from '../controllers/products.controller';
import { isAuthorized } from '../middleware/auth';
import upload from '../middleware/productFileUpload';
const router = express.Router();

router.post('/', upload.single('image'), isAuthorized, createProduct);
router.put('/:_id', upload.single('image'), isAuthorized, updateProduct);
router.delete('/:_id', isAuthorized, deleteProduct);
router.get('/', isAuthorized, getAllProducts);
router.get('/:_id', isAuthorized, getProductById);

export default router;
