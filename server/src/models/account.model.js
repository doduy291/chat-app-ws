import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const ACCOUNT_TYPES = ['local'];

const accountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ACCOUNT_TYPES,
      default: 'local',
    },
  },
  {
    timestamps: true,
  }
);

// Default - Hash password in bcrypt
// Note: Schema.prototype in mongoose should use normal function
accountSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      next();
    }
    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, saltRound);
    this.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const accountModel = mongoose.model('account', accountSchema);

export default accountModel;
