import { Router } from 'express';
import { googleLogin, logout, adminLogin } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.post('/auth/google', googleLogin);
router.post('/auth/logout', protect, logout);
router.post('/auth/admin-login', adminLogin);

export default router;
