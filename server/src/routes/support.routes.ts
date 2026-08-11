import { Router } from 'express';
import { sendSupportEmail, getSupportRequests, updateSupportStatus } from '../controllers/support.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.post('/contact', sendSupportEmail);
router.get('/requests', protect, getSupportRequests);
router.patch('/requests/:id/status', protect, updateSupportStatus);

export default router;
export { router as supportRouter };
