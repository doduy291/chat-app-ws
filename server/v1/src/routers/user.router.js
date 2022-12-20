import express from 'express';
import { getUserInfo } from '../controllers/user.controller.js';
import { authProtect } from '../middlewares/auth.middleware.js';

// config
const router = express.Router();

router.get('/user-info', authProtect, getUserInfo);

export default router;
