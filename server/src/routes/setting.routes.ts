import { Router } from 'express';
import { getSettings, updateSettings, getPublicSettings } from '../controllers/setting.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

// Public route to get public settings (e.g. maintenance mode, announcement banner)
router.get('/public', getPublicSettings);

// Admin only routes
router.get('/', protect, getSettings);
router.put('/', protect, updateSettings);

export default router;
export { router as settingRouter };
