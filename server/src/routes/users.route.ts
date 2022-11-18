import express from 'express';
import {
  getAllUsers,
  deleteUser,
  updateUser,
  registerUser,
} from '../controllers/users.controller';
import upload from '../middleware/fileUpload';
import { registerUserValidator } from '../validator/user.validator';
const router = express.Router();

router.get('/', getAllUsers);
router.delete('/:_id', deleteUser);
router.put('/:_id', updateUser);
router.post(
  '/register',
  upload.single('image'),
  registerUserValidator,
  registerUser,
);

export default router;
