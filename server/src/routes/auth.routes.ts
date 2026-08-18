import { Router } from 'express';
import { googleLogin, logout, adminLogin } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.post('/google', googleLogin);
router.post('/logout', protect, logout);
router.post('/admin-login', adminLogin);

export default router;
