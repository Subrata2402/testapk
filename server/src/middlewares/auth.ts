import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User, IUser } from '../models/user.model.js';
import { STRINGS } from '../constants/strings.js';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

interface JwtPayload {
  id: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1) Getting token and check if it's there
    let token: string | undefined;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.AUTH.NOT_LOGGED_IN,
      });
      return;
    }

    // 2) Verification token
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    } catch {
      res.status(401).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.AUTH.INVALID_EXPIRED_TOKEN,
      });
      return;
    }

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      res.status(401).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.AUTH.USER_NOT_FOUND,
      });
      return;
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};
