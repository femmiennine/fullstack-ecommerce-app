import mongoose, { Document } from 'mongoose';

export type UserDocument = Document & {
  title: string;
  desc: string;
  image: string;
  category: string;
  price: number;
  inStock: boolean;
};

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  desc: {
    type: String,
    required: true,
    trim: true,
  },

  image: {
    type: String,
    required: true,
  },

  path: {
    type: String,
  },

  category: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  inStock: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<UserDocument>('Product', productSchema);
