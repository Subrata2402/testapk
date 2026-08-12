import { Request, Response, NextFunction } from 'express';
import { App } from '../models/app.model.js';
import Support from '../models/support.model.js';
import User from '../models/user.model.js';
import { Feedback } from '../models/feedback.model.js';
import { STRINGS } from '../constants/strings.js';
import { AppError } from '../utils/appError.js';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const totalApps = await App.countDocuments();
    const newSupportRequests = await Support.countDocuments({ status: 'pending' });
    const totalActiveUsers = await User.countDocuments({ isDeleted: { $ne: true } });
    const totalFeedbacks = await Feedback.countDocuments();

    // 1. User Registration Trend (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const userTrend = await User.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // 2. Feedback Rating Distribution
    const ratingDistribution = await Feedback.aggregate([
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // 3. Support Status Distribution
    const supportDistribution = await Support.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      data: {
        totalApps,
        newSupportRequests,
        totalActiveUsers,
        totalFeedbacks,
        analytics: {
          userTrend,
          ratingDistribution,
          supportDistribution
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      results: users.length,
      data: {
        users
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { isDeleted },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

