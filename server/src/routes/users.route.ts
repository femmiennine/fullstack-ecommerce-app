import express from 'express';
import {
  getAllUsers,
  deleteUser,
  updateUser,
  registerUser,
  verifyUser,
  loginUser,
  forgetPassword,
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
router.post('/verify-user/:_id', verifyUser);
router.post('/login', loginUser);
router.post('/forget-password', forgetPassword);

export default router;
