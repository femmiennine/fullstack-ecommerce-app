import express from 'express';
import {
  getAllUsers,
  deleteUser,
  updateUser,
  registerUser,
  verifyUser,
  loginUser,
  forgetPassword,
  resetPassword,
  userProfile,
  logoutUser,
  getUserById,
} from '../controllers/users.controller';
import { isAuthorized } from '../middleware/auth';
import { registerUserValidator } from '../validator/user.validator';
import upload from '../middleware/productFileUpload';
const router = express.Router();

router.get('/', getAllUsers);
router.get('/', getUserById);
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
router.post('/reset-password', resetPassword);
router.get('/profile', isAuthorized, userProfile);
router.post('/logout', isAuthorized, logoutUser);

export default router;
