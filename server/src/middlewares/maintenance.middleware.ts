import { Request, Response, NextFunction } from 'express';
import { Setting } from '../models/setting.model.js';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/user.model.js';
import { STRINGS } from '../constants/strings.js';

export const checkMaintenanceMode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Exclude public settings endpoint and admin login from maintenance block
    const isPublicSettings = req.path === '/settings/public';
    const isAdminLogin = req.path === '/auth/admin-login';
    const isHealthCheck = req.path === '/health';

    if (isPublicSettings || isAdminLogin || isHealthCheck) {
      return next();
    }

    const maintenanceSetting = await Setting.findOne({ key: 'maintenance_mode' });
    const isMaintenanceActive = maintenanceSetting?.value === true;

    if (isMaintenanceActive) {
      // Check if user is logged in and is an admin
      let token: string | undefined;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (token) {
        try {
          const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };
          const user = await User.findById(decoded.id);
          if (user && user.role === 'admin') {
            // Allow admin users to bypass maintenance mode
            return next();
          }
        } catch (err) {
          // Token verification failed, proceed to block
        }
      }

      res.status(503).json({
        status: 'fail',
        message: STRINGS.SETTINGS.MAINTENANCE_ACTIVE,
        maintenance: true,
      });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};
