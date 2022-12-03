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
} from '../controllers/users.controller';
import { isAuthorized } from '../middleware/auth';
import {
  registerUserValidator,
  loginUserValidation,
} from '../validator/user.validator';
import userUpload from '../middleware/userFileUpload';
const router = express.Router();

router.get('/', getAllUsers);
router.delete('/:_id', deleteUser);
router.put('/:_id', updateUser);
router.post(
  '/register',
  userUpload.single('image'),
  registerUserValidator,
  registerUser,
);
router.post('/verify-user/:token', verifyUser);
router.post('/login', loginUserValidation, loginUser);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);
router.get('/profile', isAuthorized, userProfile);
router.post('/logout', isAuthorized, logoutUser);

export default router;
