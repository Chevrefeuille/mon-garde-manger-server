import mongoose, { ConnectOptions } from 'mongoose';
import config from 'config';
import log from '../logger';

function connect() {
  const dbUri: string = config.get('dbUri');

  return mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      log.info('Database connected');
    })
    .catch((error) => {
      log.error({ err: error }, 'db error');
      process.exit(1);
    });
}

export default connect;
