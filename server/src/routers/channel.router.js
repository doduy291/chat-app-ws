import express from 'express';
import { getSelectedChannel, postCreateChannel, getListChannels } from '../controllers/channel.controller.js';
import { authProtect } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/list-channels', authProtect, getListChannels);
router.get('/:id', authProtect, getSelectedChannel);
router.post('/create-channel', authProtect, postCreateChannel);

export default router;
