import { Router } from 'express';
import { getMe, configureDrive, updateFcmToken, deleteMe } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.get('/me', protect, getMe);
router.post('/configure-drive', protect, configureDrive);
router.post('/fcm-token', protect, updateFcmToken);
router.delete('/me', protect, deleteMe);

export default router;
