import { Router } from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js'; // Wait, it should be './auth.routes.js' since it's in the same directory!
import userRoutes from './user.routes.js';
import appRoutes from './app.routes.js';
import feedbackRoutes from './feedback.route.js';
import supportRoutes from './support.routes.js';
import deviceAuthRoutes from './device-auth.routes.js';
import adminRoutes from './admin.routes.js';
import settingRoutes from './setting.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/apps', appRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/support', supportRoutes);
router.use('/auth/device', deviceAuthRoutes);
router.use('/admin', adminRoutes);
router.use('/settings', settingRoutes);

export default router;
