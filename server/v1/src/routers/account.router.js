import express from 'express';
import { postLogin, getLogout, postSignUp } from '../controllers/account.controller.js';

// configs
const router = express.Router();

router.post('/signup', postSignUp);
router.post('/login', postLogin);
router.get('/logout', getLogout);
export default router;
