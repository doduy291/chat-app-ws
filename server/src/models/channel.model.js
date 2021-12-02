import mongoose from 'mongoose';

const CHANNEL_TYPES = ['direct', 'group'];

const sharedFilesSchema = new mongoose.Schema(
  {
    _id: false,
    file: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const sharedImagesSchema = new mongoose.Schema(
  {
    _id: false,
    image: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const lastMessage = new mongoose.Schema(
  {
    _id: false,
    message: {
      type: String,
    },
    sender: { type: String },
  },
  { timestamps: true }
);

const channelSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    channelName: {
      type: String,
    },
    channelType: {
      type: String,
      enum: CHANNEL_TYPES,
      required: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    sharedFiles: [sharedFilesSchema],
    sharedImages: [sharedImagesSchema],
    lastMessage: lastMessage,
  },
  {
    timestamps: true,
  }
);

const channelModel = mongoose.model('channel', channelSchema);
export default channelModel;
