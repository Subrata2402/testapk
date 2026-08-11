import { Router } from 'express';
import { getDashboardStats, getAllUsers, updateUserStatus } from '../controllers/admin.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.get('/stats', protect, getDashboardStats);
router.get('/users', protect, getAllUsers);
router.patch('/users/:id/status', protect, updateUserStatus);

export default router;
export { router as adminRouter };
