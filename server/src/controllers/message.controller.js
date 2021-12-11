import asyncHandler from '../utils/asyncHandler.js';
import { ErrorResponse } from '../utils/errorHandler.js';
import MessageModel from '../models/message.model.js';
import ChannelModel from '../models/channel.model.js';

export const getMessageChannel = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { channelId } = req.params;
  let skipMsg = Number(req.query.skipMsg);
  const limitMsg = 5;

  const doesExist = await ChannelModel.exists({ _id: channelId, member: userId });
  if (!doesExist) throw new ErrorResponse(403, 'Cannot get messages, User is not existing in channel');

  // Total count of messages in channel
  const count = await MessageModel.count({ channel: channelId });
  if (!skipMsg) {
    const defaultSkipMsg = Math.ceil(count / limitMsg);
    skipMsg = defaultSkipMsg;
  }

  const messages = await MessageModel.find({ channel: channelId })
    .limit(limitMsg)
    .skip(limitMsg * (skipMsg - 1))
    .populate({ path: 'userId', select: '-_id username avatar' })
    .select('-_id text userId createdAt');

  res.status(200).json({ messages });
});

export const postSendMessage = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { channelId } = req.params;
  const { type, text } = req.body;
  const doesExist = await ChannelModel.exists({ _id: channelId, member: userId });
  if (!doesExist) throw new ErrorResponse(403, 'Cannot send message, not matching user in channel');

  const newMessage = await MessageModel.create({ text, userId, channel: channelId, messageType: type });
  if (!newMessage) throw new ErrorResponse(400, 'Failed to send message, try again');

  res.status(201).json({
    message: 'Sent message successfully',
  });
});
