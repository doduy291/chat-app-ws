import mongoose from 'mongoose';

const MESSAGE_TYPE = ['text', 'file', 'image', 'tag'];

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'channel',
      required: true,
    },
    messageType: {
      type: String,
      enum: MESSAGE_TYPE,
      default: 'text',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model('message', messageSchema);

export default messageModel;
