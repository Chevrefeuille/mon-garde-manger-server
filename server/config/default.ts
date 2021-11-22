import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

export default {
  port: process.env.PORT || 5000,
  host: 'localhost',
  dbUri: process.env.ATLAS_URI,
};
