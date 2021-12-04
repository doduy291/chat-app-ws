import express from 'express';
import {
  getSelectedChannel,
  postCreateChannel,
  getListGroupChannels,
  getListDMs,
} from '../controllers/channel.controller.js';
import { authProtect } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/list-DMs', authProtect, getListDMs);
router.get('/list-group-channels', authProtect, getListGroupChannels);
router.get('/:id', authProtect, getSelectedChannel);
router.post('/create-channel', authProtect, postCreateChannel);

export default router;
