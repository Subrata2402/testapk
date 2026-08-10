import { Request, Response, NextFunction } from 'express';
import { App } from '../models/app.model.js';
import Support from '../models/support.model.js';
import User from '../models/user.model.js';
import { STRINGS } from '../constants/strings.js';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const totalApps = await App.countDocuments();
    const newSupportRequests = await Support.countDocuments({ status: 'pending' });
    const totalActiveUsers = await User.countDocuments({ isDeleted: false });

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      data: {
        totalApps,
        newSupportRequests,
        totalActiveUsers
      }
    });
  } catch (error) {
    next(error);
  }
};
