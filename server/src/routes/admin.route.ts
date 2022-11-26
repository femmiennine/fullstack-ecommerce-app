import express from 'express';
import {
  loginAdmin,
  adminDashboard,
  logoutAdmin,
} from '../controllers/admin.controller';
import { isAuthorized } from '../middleware/auth';
import userUpload from '../middleware/userFileUpload';
import { registerAdminValidator } from '../validator/admin.validator';

const router = express.Router();

router.post(
  '/login',
  userUpload.single('image'),
  registerAdminValidator,
  loginAdmin,
);
router.get('/admin-dashboard', isAuthorized, adminDashboard);
router.post('/logout', isAuthorized, logoutAdmin);

export default router;
