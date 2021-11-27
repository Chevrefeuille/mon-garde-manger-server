import { Request, Response } from 'express';
import logger from '../utils/logger';
import { CreateUserInput } from '../schemas/user.schema';
import createUser from '../services/user.service';

export default async function createUserHandler(
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    CreateUserInput['body']
  >,
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
