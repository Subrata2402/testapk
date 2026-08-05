import { Router } from 'express';
import { sendSupportEmail } from '../controllers/support.controller.js';

const router = Router();

router.post('/contact', sendSupportEmail);

export default router;
export { router as supportRouter };
