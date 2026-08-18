import { Router } from 'express';
import multer from 'multer';
import {
  createApp,
  getApps,
  uploadApk,
  downloadApk,
  deleteRelease,
  inviteMember,
  removeMember,
  getInvitations,
  acceptInvitation,
  rejectInvitation,
  getReleases,
  getMembers,
} from '../controllers/app.controller.js';
import { protect } from '../middlewares/auth.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB limit
  },
});

const router = Router();

router.post('/', protect, createApp);
router.get('/', protect, getApps);
router.get('/invitations', protect, getInvitations);
router.post('/:appId/invitations/accept', protect, acceptInvitation);
router.post('/:appId/invitations/reject', protect, rejectInvitation);
router.get('/:appId/members', protect, getMembers);
router.post('/:appId/members', protect, inviteMember);
router.delete('/:appId/members/:email', protect, removeMember);
router.get('/:appId/releases', protect, getReleases);
router.post('/:appId/releases', protect, upload.single('file'), uploadApk);
router.get('/:appId/releases/:buildNumber/download', protect, downloadApk);
router.delete('/:appId/releases/:buildNumber', protect, deleteRelease);

export default router;
