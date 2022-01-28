import asyncHandler from '../utils/asyncHandler.js';
import UserModel from '../models/user.model.js';
import AccountModel from '../models/account.model.js';
import ChannelModel from '../models/channel.model.js';
import { ErrorResponse } from '../utils/errorHandler.js';

// !================================================= CONTACT =================================================
// ******* GET ALL CONTACTS (INCLUDE Active: 'online')*******
export const getAllContacts = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const contactInfo = await UserModel.findOne({ _id: userId })
    .select('-_id contacts chatChannels')
    .populate([
      { path: 'contacts', select: 'username avatar active' },
      { path: 'chatChannels', select: '_id members channelType', match: { channelType: 'direct' } },
    ]);

  res.status(200).json({ allContacts: contactInfo });
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

  const pendings = await UserModel.findOne({ _id: userId, contactRequests: { $elemMatch: { status: 1 } } })
    // or findOne({ _id: userId, 'contactRequests.status': '1'})
    .populate({ path: 'contactRequests.requester', select: 'username avatar' })
    .select('-_id contactRequests');

  res.status(200).json({ pendings });
});

// ******* SEND CONTACT REQUEST *******
export const postSendRequest = asyncHandler(async (req, res) => {
  const { contact } = req.body;
  const requesterId = req.user._id;
  let recipientId;

  const emailExist = await AccountModel.findOne({ email: contact }).select('_id');
  if (emailExist) {
    const userInfo = await UserModel.findOne({ accountId: emailExist._id }).select('_id');
    if (!userInfo) throw new ErrorResponse(403, 'Contact does not exist');
    recipientId = userInfo._id;
  } else {
    const userInfo = await UserModel.findOne({ _id: contact }).select('_id');
    if (!userInfo) throw new ErrorResponse(403, 'Contact does not exist');
    recipientId = userInfo._id;
  }

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
  const checkPending = pending.contactRequests.findIndex((e) => {
    // Compare 6197a4533ba9cf2c40cfe9f6 with objectId('6197a4533ba9cf2c40cfe9f6') ( using equals() )
    return e.requester.equals(requesterId);
  });

  // If pending request was removed
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
    const checkContactAdded = newContact.contacts.findIndex((objectIdUser) => {
      // Compare 2 objectId ( use equals() )
      return objectIdUser.equals(recipientId);
    });
    // If requester's contact includes recipientId
    if (checkContactAdded !== -1) {
      await UserModel.updateOne({ _id: recipientId }, { $addToSet: { contacts: requesterId } });
    }
  } else {
    throw new ErrorResponse(400, 'Failed to accept');
  }

  // * Create Channel after accepting successfully
  const newDirectChannel = await ChannelModel.create({ members: [recipientId, requesterId], channelType: 'direct' });
  if (!newDirectChannel) throw new ErrorResponse(403, 'Cannot create channel');

  // * Update User's channel
  const updateRecipientChannel = await UserModel.findOneAndUpdate(
    { _id: recipientId },
    { $addToSet: { chatChannels: newDirectChannel._id } },
    { new: true, rawResult: true }
  );
  if (!updateRecipientChannel.lastErrorObject.updatedExisting)
    throw new ErrorResponse(403, 'Cannot add user into channel');

  const updateRequesterChannel = await UserModel.findOneAndUpdate(
    { _id: requesterId },
    { $addToSet: { chatChannels: newDirectChannel._id } },
    { new: true, rawResult: true }
  );
  if (!updateRequesterChannel.lastErrorObject.updatedExisting)
    throw new ErrorResponse(403, 'Cannot add user into channel');

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
  if (!recipientRemove) throw new ErrorResponse(403, 'Cannot delete pending request');

  const requesterRemove = await UserModel.findOneAndUpdate(
    { _id: requesterId, contactRequests: { $elemMatch: { recipient: recipientId, status: 0 } } },
    {
      $pull: { contactRequests: { recipient: recipientId, status: 0 } },
    },
    { new: true }
  );

  if (!requesterRemove) throw new ErrorResponse(403, 'Cannot delete pending request');
  res.status(200).json({ message: 'Remove successfully' });
});

// !================================================= BLOCKED =================================================
// ******* GET BLOCKED CONTACT *******
export const getBlockedContacts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const blocks = await UserModel.findOne({ _id: userId })
    .select('-_id blockedContacts')
    .populate({ path: 'blockedContacts', select: '_id username avatar' });

  if (!blocks) throw new ErrorResponse(400, 'Cannot get blocked contacts');

  res.status(200).json({ blockedContacts: blocks.blockedContacts });
});

// ******* SEND BLOCKED CONTACT *******
export const postSendBlock = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { blockedContactId } = req.body;

  const doesExist = await UserModel.exists({ _id: blockedContactId });
  if (!doesExist) throw new ErrorResponse(400, 'User does not exist');

  const newBlock = await UserModel.findOneAndUpdate(
    {
      _id: userId,
    },
    { $addToSet: { blockedContacts: blockedContactId } },
    {
      new: true,
      rawResult: true,
    }
  );
  if (!newBlock.lastErrorObject.updatedExisting) {
    throw new ErrorResponse(400, 'Cannot block this contact');
  }

  res.status(201).json({ message: 'Block successfully' });
});
// ******* DELETE BLOCKED CONTACT *******
export const deleteBlockedContact = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { blockedContactId } = req.body;
  const removeBlockedContact = await UserModel.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      $pull: { blockedContacts: blockedContactId },
    },
    {
      new: true,
      rawResult: true,
    }
  );
  if (!removeBlockedContact.lastErrorObject.updatedExisting) {
    throw new ErrorResponse(400, 'Cannot remove this blocked contact');
  }

  res.status(201).json({ messagE: 'Removed blocked contact' });
});
