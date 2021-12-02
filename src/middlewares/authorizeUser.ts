import { Request, Response, NextFunction } from 'express';
import { findUser } from '../services/user.service';

const authorizeUser =
  (requiredPermission?: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = res.locals.user;

    if (!userData) {
      return res.sendStatus(403);
    }

    const user = await findUser({ _id: userData._id });

    if (requiredPermission && user) {
      const hasPermission = await user.hasPermission(requiredPermission);
      if (!hasPermission) {
        return res.sendStatus(401);
      }
    }

    return next();
  };

export default authorizeUser;
