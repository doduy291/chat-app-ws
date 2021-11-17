import mongoose from 'mongoose';

const STATUS_TYPES = ['online', 'offline', 'sleep'];

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
    status: {
      type: String,
      enum: STATUS_TYPES,
      default: 'offline',
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model('user', userSchema);

export default userModel;
