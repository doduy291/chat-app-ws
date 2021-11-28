import express from 'express';
import {
  postSendRequest,
  postAcceptRequest,
  getPendingRequest,
  deleteContact,
  deletePendingRequest,
  getAllContacts,
} from '../controllers/contact.controller.js';
import { authProtect } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/all-contacts', authProtect, getAllContacts);
router.get('/pendings', authProtect, getPendingRequest);
router.post('/send-request', authProtect, postSendRequest);
router.post('/accept-request', authProtect, postAcceptRequest);
router.delete('/delete-pending-request', authProtect, deletePendingRequest);
router.delete('/delete-contact', authProtect, deleteContact);

export default router;
