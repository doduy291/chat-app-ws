import asyncHandler from '../utils/asyncHandler.js';
import UserModel from '../models/user.model.js';
import { ErrorResponse } from '../utils/errorHandler.js';

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

export const postAcceptRequest = asyncHandler(async (req, res) => {
  const { requesterId } = req.body;
  const recipiantId = req.user._id;

  // * Recipiant's side
  const pending = await UserModel.findOneAndUpdate(
    { _id: recipiantId },
    { $pull: { contactRequests: { requester: requesterId, status: 1 } } },
    { new: true }
  );
  // Check with findIndex()
  const checkPending = pending.contactRequests.findIndex((e) => e.requester === requesterId);
  if (checkPending === -1) {
    // * Sender's side
    // Remove request and add contact
    const newContact = await UserModel.findOneAndUpdate(
      { _id: requesterId },
      {
        $pull: { contactRequests: { recipient: recipiantId, status: 0 } },
        $addToSet: { contacts: recipiantId },
      },
      { new: true }
    );
    console.log(newContact);
    // Check with find()
    const checkContactAdded = newContact.contacts.findIndex((e) => e === recipiantId);
    console.log(checkContactAdded);
    if (checkContactAdded === -1) {
      // * Recipient's side
      await UserModel.updateOne({ _id: recipiantId }, { $addToSet: { contacts: requesterId } });
      console.log('test2');
    }
  } else {
    throw new ErrorResponse(400, 'Failed to accept');
  }

  return res.status(200).json({ message: 'Accepted request successfully' });
});
