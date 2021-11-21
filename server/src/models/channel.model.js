import mongoose from 'mongoose';

const CHANNEL_TYPES = ['single', 'group'];

const channelSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    member: [],
    channelname: {
      type: String,
      required: true,
    },
    channelType: {
      type: Number,
      enum: CHANNEL_TYPES,
      required: true,
    },
    avatarGroup: {
      type: String,
    },
    sharedFiles: [sharedFilesSchema],
    sharedImages: [sharedImagesSchema],
  },
  {
    timestamps: true,
  }
);

const sharedFilesSchema = new mongoose.Schema(
  {
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
const channelModel = mongoose.model('channel', channelSchema);
export default channelModel;
