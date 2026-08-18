import { Router } from 'express';
import { createFeedback, getFeedback } from '../controllers/feedback.controller.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.post('/', protect, createFeedback);
router.get('/', protect, getFeedback);

export default router;
