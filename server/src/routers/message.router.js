import express from 'express';
import { getMessageChannel, postSendMessage } from '../controllers/message.controller.js';
import { authProtect } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.get('/:channelId', authProtect, getMessageChannel);
router.post('/:channelId/send-message', authProtect, upload.array('uploaded-files', 10), postSendMessage);

export default router;
