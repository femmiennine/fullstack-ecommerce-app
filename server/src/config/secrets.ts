import * as dotenv from 'dotenv';
dotenv.config();

const dev = {
  db: {
    url: process.env.MONGODB_URI || '',
  },
  app: {
    port: process.env.SERVER_PORT || 3004,
  },
};

export default dev;
