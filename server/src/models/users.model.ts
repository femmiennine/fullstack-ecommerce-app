import mongoose, { Document } from 'mongoose';
import uuid4 from 'uuid4';

export type UserDocument = Document & {
  name: string;
  email: string;
  password: string;
  hashed_password: string;
  about: string;
  salt: string;
  role: number;
  history: [];
  timestamps: boolean;
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
      maxLength: [32, 'Name cannot exceed 32 characters'],
      minLength: [4, 'Name should have more than 4 characters'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      unique: true,
    },
    hashed_password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Password should be greater than 8 characters'],
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

//virtual fields -> UNFINISHED
userSchema.virtual('password').set(function (password: string) {
  //@ts-ignore
  this.password = password;
  this.salt = uuid4();
});

export default mongoose.model<UserDocument>('User', userSchema);
