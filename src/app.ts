import express from 'express';
import config from 'config';
import cors from 'cors';
import logger from './utils/logger';
import connect from './utils/connect';
import routes from './routes';
import deserializeUser from './middlewares/deserializeUser';

const port = config.get<number>('port') as number;

const app = express();

app.use(cors());

app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();

  routes(app);
});
