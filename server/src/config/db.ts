import mongoose from 'mongoose';
import dev from './secrets';

const connectDB = async () => {
  try {
    await mongoose.connect(dev.db.url);
    console.log('DB connected');
  } catch (error) {
    console.log(`DB connection error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
