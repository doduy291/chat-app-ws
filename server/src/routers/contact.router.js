import express from 'express';
import {
  postSendRequest,
  postAcceptRequest,
  getPendingRequest,
  deleteContact,
  deletePendingRequest,
  getAllContacts,
  getBlockedContacts,
  postSendBlock,
  deleteBlockedContact,
} from '../controllers/contact.controller.js';
import { authProtect } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/all-contacts', authProtect, getAllContacts);
router.get('/pendings', authProtect, getPendingRequest);
router.get('/blocked-contacts', authProtect, getBlockedContacts);
router.post('/send-request', authProtect, postSendRequest);
router.post('/accept-request', authProtect, postAcceptRequest);
router.post('/send-block', authProtect, postSendBlock);
router.put('/delete-pending-request', authProtect, deletePendingRequest);
router.put('/delete-contact', authProtect, deleteContact);
router.put('/delete-blocked-contact', authProtect, deleteBlockedContact);

export default router;
