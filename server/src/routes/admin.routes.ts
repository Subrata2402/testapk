import { Router } from 'express';
import { getDashboardStats, getAllUsers, updateUserStatus, getAllApps, getSystemHealth } from '../controllers/admin.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.get('/stats', protect, getDashboardStats);
router.get('/users', protect, getAllUsers);
router.patch('/users/:id/status', protect, updateUserStatus);
router.get('/apps', protect, getAllApps);
router.get('/health', protect, getSystemHealth);

export default router;
export { router as adminRouter };
