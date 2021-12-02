import asyncHandler from '../utils/asyncHandler.js';
import UserModel from '../models/user.model.js';
import { ErrorResponse } from '../utils/errorHandler.js';

// !================================================= CONTACT =================================================
// ******* GET ALL CONTACTS (INCLUDE Active: 'online')*******
export const getAllContacts = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const contacts = await UserModel.findOne({ _id: userId })
    .populate({ path: 'contacts', select: 'username avatar active' })
    .select('contacts');
  res.status(200).json({ allContacts: contacts });
});

// ******* DELETE CONTACT *******
export const deleteContact = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { contactId } = req.body;

  const myRemove = await UserModel.findOneAndUpdate(
    { _id: userId, contacts: contactId },
    { $pull: { contacts: contactId } },
    // OR { $pull: { contacts: { $in: [contactId] } } },
    { new: true }
  );
  if (!myRemove) throw new ErrorResponse(400, 'Cannot delete contact');

  const contactRemove = await UserModel.findOneAndUpdate(
    { _id: contactId, contacts: userId },
    { $pull: { contacts: userId } },
    // OR { $pull: { contacts: { $in: [userId] } } },
    { new: true }
  );
  if (!contactRemove) throw new ErrorResponse(400, 'Cannot delete contact');

  res.status(200).json({ message: 'Remove successfully' });
});

// !================================================= PENDING REQUEST =================================================
// ******* GET PENDING CONTACT REQUEST *******
export const getPendingRequest = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) throw new ErrorResponse(400, 'Cannot get pending requests');

  const pendings = await UserModel.findOne({ _id: userId, contactRequests: { $elemMatch: { status: 1 } } })
    // or findOne({ _id: userId, 'contactRequests.status': '1'})
    .populate({ path: 'contactRequests.requester', select: 'username avatar' })
    .select('-_id contactRequests');

  res.status(200).json({ pendings });
});

// ******* SEND CONTACT REQUEST *******
export const postSendRequest = asyncHandler(async (req, res) => {
  const { recipientId } = req.body;
  const requesterId = req.user._id;

  // * Sender's side (sender)
  const newRequest = await UserModel.findOneAndUpdate(
    { _id: requesterId },
    {
      $addToSet: { contactRequests: { requester: requesterId, recipient: recipientId, status: 0 } },
    },
    { new: true }
  );
  if (!newRequest) throw new ErrorResponse(400, 'Cannot send contact request');

  // * Recipient's side
  const newPending = await UserModel.findOneAndUpdate(
    { _id: recipientId },
    {
      $addToSet: { contactRequests: { requester: requesterId, recipient: recipientId, status: 1 } },
    },
    { new: true }
  );
  if (!newPending) throw new ErrorResponse(400, 'Cannot receive contact request');

  return res.status(201).json({ message: 'Sent request successfully' });
});

// ******* ACCEPT PENDING CONTACT REQUEST *******
export const postAcceptRequest = asyncHandler(async (req, res) => {
  const { requesterId } = req.body;
  const recipientId = req.user._id;

  // * Recipient's side
  const pending = await UserModel.findOneAndUpdate(
    { _id: recipientId },
    { $pull: { contactRequests: { requester: requesterId, status: 1 } } },
    { new: true }
  );
  // * Sender's side
  // Check with findIndex()
  const checkPending = pending.contactRequests.findIndex((e) => e.requester === requesterId);
  if (checkPending === -1) {
    // Remove request and add contact
    const newContact = await UserModel.findOneAndUpdate(
      { _id: requesterId },
      {
        $pull: { contactRequests: { recipient: recipientId, status: 0 } },
        $addToSet: { contacts: recipientId },
      },
      { new: true }
    );
    // * Recipient's side
    const checkContactAdded = newContact.contacts.findIndex((e) => e === recipientId);
    if (checkContactAdded === -1) {
      await UserModel.updateOne({ _id: recipientId }, { $addToSet: { contacts: requesterId } });
    }
  } else {
    throw new ErrorResponse(400, 'Failed to accept');
  }

  return res.status(200).json({ message: 'Accepted request successfully' });
});

// ******* DELETE PENDING CONTACT REQUEST *******
export const deletePendingRequest = asyncHandler(async (req, res) => {
  const recipientId = req.user._id;

  const { requesterId } = req.body;

  const recipientRemove = await UserModel.findOneAndUpdate(
    { _id: recipientId, contactRequests: { $elemMatch: { requester: requesterId, status: 1 } } },
    {
      $pull: { contactRequests: { requester: requesterId, status: 1 } },
    },
    { new: true }
  );
  if (!recipientRemove) throw new ErrorResponse(400, 'Cannot delete pending request');

  const requesterRemove = await UserModel.findOneAndUpdate(
    { _id: requesterId, contactRequests: { $elemMatch: { recipient: recipientId, status: 0 } } },
    {
      $pull: { contactRequests: { recipient: recipientId, status: 0 } },
    },
    { new: true }
  );

  if (!requesterRemove) throw new ErrorResponse(400, 'Cannot delete pending request');
  res.status(200).json({ message: 'Remove successfully' });
});
