import asyncHandler from '../utils/asyncHandler.js';
import { ErrorResponse } from '../utils/errorHandler.js';
import MessageModel from '../models/message.model.js';
import ChannelModel from '../models/channel.model.js';

export const getMessageChannel = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { channelId } = req.params;
  let skipMsg = Number(req.query.skipMsg);
  const limitMsg = 10;

  const doesExist = await ChannelModel.exists({ _id: channelId, member: userId });
  if (!doesExist) throw new ErrorResponse(403, 'Cannot get messages, User is not existing in channel');

  // Total count of messages in channel
  const count = await MessageModel.count({ channel: channelId });
  if (!count) skipMsg = 1;
  if (!skipMsg) {
    // Be used to get latest messages
    const defaultSkipMsg = Math.ceil(count / limitMsg);
    skipMsg = defaultSkipMsg;
  }

  let messages = await MessageModel.find({ channel: channelId })
    .populate({ path: 'userId', select: '_id username avatar' })
    .select('-_id text userId createdAt')
    .limit(limitMsg)
    .skip(limitMsg * (skipMsg - 1))
    .lean();

  if (messages.length > 0) {
    messages.map((msg, i) => {
      if (JSON.stringify(msg.userId._id) === JSON.stringify(userId)) {
        messages[i].yourMsg = true;
      }
    });
  }

  res.status(200).json({ currentMsgs: messages, pageMsg: skipMsg });
});

export const postSendMessage = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const { channelId } = req.params;
  const { textMsg, typeMsg } = req.body;

  const doesExist = await ChannelModel.exists({ _id: channelId, member: user });
  if (!doesExist) throw new ErrorResponse(403, 'Cannot send message, not matching user in channel');

  let newMessage = await MessageModel.create({ text: textMsg, userId: user, channel: channelId, messageType: typeMsg });
  if (!newMessage) throw new ErrorResponse(400, 'Failed to send message, try again');

  const { text, userId, createdAt } = await newMessage.populate({ path: 'userId', select: '_id username avatar' });

  res.status(201).json({
    message: { text, userId, createdAt },
  });
});
