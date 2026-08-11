import { Router } from 'express';
import { getMe, configureDrive, updateFcmToken, deleteMe } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.get('/users/me', protect, getMe);
router.post('/users/configure-drive', protect, configureDrive);
router.post('/users/fcm-token', protect, updateFcmToken);
router.delete('/users/me', protect, deleteMe);

export default router;
