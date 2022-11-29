import * as dotenv from 'dotenv';
dotenv.config();

const dev = {
  db: {
    url: process.env.MONGODB_URI || '',
  },
  app: {
    server_url: process.env.BASE_URL || '',
    port: process.env.SERVER_PORT || 4004,
    client_url: process.env.CLIENT_URL,
    jwt: process.env.JWT_PRIVATE_KEY,
    auth_password: process.env.AUTH_PASSWORD,
    auth_email: process.env.AUTH_EMAIL,
  },
};

export default dev;
