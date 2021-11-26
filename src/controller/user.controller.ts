import { Request, Response } from 'express';
import logger from '../logger';
import { CreateUserInput } from '../schema/user.schema';
import createUser from '../service/user.service';

export default async function createUserHandler(
  req: Request<unknown, unknown, CreateUserInput['body']>,
  res: Response,
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
