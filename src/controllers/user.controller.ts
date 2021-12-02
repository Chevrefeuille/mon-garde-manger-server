import { Request, Response } from 'express';
import logger from '../utils/logger';
import { CreateUserInput } from '../schemas/user.schema';
import { createUser } from '../services/user.service';
import RoleModel from '../models/role.model';

export default async function createUserHandler(
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    CreateUserInput['body']
  >,
  res: Response,
) {
  try {
    // assign the role 'user'
    const userRole = await RoleModel.findOne({ name: 'user' });
    if (!userRole) {
      return res.status(500);
    }
    const userInput = {
      roles: [userRole._id],
      ...req.body,
    };
    const user = await createUser(userInput);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
