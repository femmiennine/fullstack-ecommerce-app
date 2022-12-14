import mongoose, { Document } from 'mongoose';

export type UserDocument = Document & {
  firstname: string;
  lastname: string;
  image: string;
  email: string;
  phone: string;
  password: string;
  isAdmin: number;
  isVerified: number;
  isBanned: boolean;
  token: string;
};

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
    trim: true,
  },

  lastname: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
    trim: true,
  },

  image: {
    type: String,
    data: Buffer,
    contentType: String,
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },

  phone: {
    type: String,
    required: [true, 'Please enter your phone number'],
  },

  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [8, 'Password should be greater than 8 characters'],
  },

  isVerified: {
    type: Number,
    default: 0,
  },

  isAdmin: {
    type: Number,
    default: 0,
  },

  isBanned: {
    type: Boolean,
    default: false,
  },

  token: {
    type: String,
    default: '',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<UserDocument>('User', userSchema);
