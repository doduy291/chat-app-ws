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
router.put('/delete-pending-request', authProtect, deletePendingRequest);
router.put('/delete-contact', authProtect, deleteContact);

export default router;
