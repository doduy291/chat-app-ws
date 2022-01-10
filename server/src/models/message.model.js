import mongoose from 'mongoose';

const MESSAGE_TYPE = ['text', 'file', 'image', 'tag'];
const filesSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  created_at: {
    type: String,
  },
});

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      default: '',
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
    files: [filesSchema],
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model('message', messageSchema);

export default messageModel;
