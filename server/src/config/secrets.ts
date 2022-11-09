import * as dotenv from 'dotenv';
dotenv.config();

const dev = {
  db: {
    url: process.env.MONGODB_URI || '',
  },
  app: {
    port: process.env.SERVER_PORT || 4004,
    client_url: process.env.CLIENT_URL,
  },
};

export default dev;
