import express from 'express';
import { loginAdmin, adminDashboard } from '../controllers/admin.controller';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/admin-dashboard', adminDashboard);

export default router;
