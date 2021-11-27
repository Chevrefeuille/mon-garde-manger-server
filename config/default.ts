import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

export default {
  port: process.env.PORT || 5000,
  dbUri: process.env.ATLAS_URI,
  saltWorkFactor: 10,
  accessTokenTtl: '15m',
  refreshTokenTtl: '15m',
  privateKey: (process.env.PRIVATE_KEY || '').replace(/\\n/gm, '\n'),
  publicKey: (process.env.PUBLIC_KEY || '').replace(/\\n/gm, '\n'),
};
