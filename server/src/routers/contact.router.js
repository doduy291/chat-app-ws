import express from 'express';
import { postSendRequest, postAcceptRequest } from '../controllers/contact.controller.js';
import { authProtect } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.post('/send-request', authProtect, postSendRequest);
router.post('/accept-request', authProtect, postAcceptRequest);

export default router;
