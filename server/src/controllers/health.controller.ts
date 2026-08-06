import { Request, Response, NextFunction } from 'express';
import { STRINGS } from '../constants/strings.js';

export const getHealth = (req: Request, res: Response, next: NextFunction): void => {
  res.status(200).json({
    status: STRINGS.COMMON.STATUS_SUCCESS,
    message: STRINGS.HEALTH.RUNNING,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};
