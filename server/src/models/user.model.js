import mongoose from 'mongoose';

const ACTIVE_TYPES = ['online', 'offline', 'busy'];
const REQUEST_STATUS_TYPES = [
  0, //'requested'
  1, // 'pending'
];

const contactRequests = {
  _id: false,
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  status: {
    type: Number,
    enum: REQUEST_STATUS_TYPES,
    default: '0',
  },
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    role: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: '',
    },
    active: {
      type: String,
      enum: ACTIVE_TYPES,
      default: 'offline',
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account',
      required: true,
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    contactRequests: [contactRequests],
    chatChannels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'channel',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model('user', userSchema);

export default userModel;
