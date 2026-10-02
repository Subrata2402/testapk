import { Request, Response, NextFunction } from 'express';
import { App } from '../models/app.model.js';
import { Release } from '../models/release.model.js';
import Support from '../models/support.model.js';
import User from '../models/user.model.js';
import { Feedback } from '../models/feedback.model.js';
import { STRINGS } from '../constants/strings.js';
import { AppError } from '../utils/appError.js';
import { getSystemMetrics, readLastLines } from '../services/system.service.js';
import mongoose from 'mongoose';

interface ActivityItem {
  id: string;
  type: 'app_created' | 'release_published' | 'user_registered' | 'support_created' | 'feedback_submitted';
  action: string;
  user: string;
  timestamp: Date;
}

async function fetchAggregatedActivities(limit: number = 20, typeFilter: string = 'all', searchQuery: string = ''): Promise<ActivityItem[]> {
  const activities: ActivityItem[] = [];
  const searchRegex = searchQuery ? new RegExp(searchQuery, 'i') : null;

  // 1. Apps
  if (typeFilter === 'all' || typeFilter === 'app_created') {
    const apps = await App.find().sort({ createdAt: -1 }).limit(limit);
    for (const app of apps) {
      const action = `New app '${app.name}' registered`;
      const owner = app.members?.find((m: any) => m.role === 'Owner')?.email || app.members?.[0]?.email || 'Developer';
      const user = owner;
      if (!searchRegex || searchRegex.test(action) || searchRegex.test(user)) {
        activities.push({
          id: `app_${app._id}`,
          type: 'app_created',
          action,
          user,
          timestamp: (app as any).createdAt || new Date(),
        });
      }
    }
  }

  // 2. Releases
  if (typeFilter === 'all' || typeFilter === 'release_published') {
    const releases = await Release.find().populate('appId', 'name').sort({ createdAt: -1 }).limit(limit);
    for (const rel of releases) {
      const appName = (rel.appId as any)?.name || rel.appName || 'App';
      const action = `Release v${rel.version} (Build #${rel.buildNumber}) published for '${appName}'`;
      const user = rel.uploadedByName || rel.uploadedByEmail || 'Developer';
      if (!searchRegex || searchRegex.test(action) || searchRegex.test(user)) {
        activities.push({
          id: `rel_${rel._id}`,
          type: 'release_published',
          action,
          user,
          timestamp: rel.createdAt || new Date(),
        });
      }
    }
  }

  // 3. Users
  if (typeFilter === 'all' || typeFilter === 'user_registered') {
    const users = await User.find().sort({ createdAt: -1 }).limit(limit);
    for (const u of users) {
      const action = `User '${u.name || u.email}' registered`;
      const user = u.email;
      if (!searchRegex || searchRegex.test(action) || searchRegex.test(user)) {
        activities.push({
          id: `usr_${u._id}`,
          type: 'user_registered',
          action,
          user,
          timestamp: (u as any).createdAt || new Date(),
        });
      }
    }
  }

  // 4. Support
  if (typeFilter === 'all' || typeFilter === 'support_created') {
    const supports = await Support.find().sort({ createdAt: -1 }).limit(limit);
    for (const s of supports) {
      const action = `Support request: '${s.subject}'`;
      const user = s.email || s.name || 'User';
      if (!searchRegex || searchRegex.test(action) || searchRegex.test(user)) {
        activities.push({
          id: `sup_${s._id}`,
          type: 'support_created',
          action,
          user,
          timestamp: (s as any).createdAt || new Date(),
        });
      }
    }
  }

  // 5. Feedback
  if (typeFilter === 'all' || typeFilter === 'feedback_submitted') {
    const feedbacks = await Feedback.find().populate('userId', 'name email').sort({ createdAt: -1 }).limit(limit);
    for (const f of feedbacks) {
      const action = `Feedback submitted (${f.rating}★): '${f.title}'`;
      const user = (f.userId as any)?.email || (f.userId as any)?.name || 'Tester';
      if (!searchRegex || searchRegex.test(action) || searchRegex.test(user)) {
        activities.push({
          id: `fb_${f._id}`,
          type: 'feedback_submitted',
          action,
          user,
          timestamp: (f as any).createdAt || new Date(),
        });
      }
    }
  }

  activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return activities;
}

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const totalApps = await App.countDocuments();
    const newSupportRequests = await Support.countDocuments({ status: 'pending' });
    const totalActiveUsers = await User.countDocuments({ isDeleted: { $ne: true } });
    const totalFeedbacks = await Feedback.countDocuments();
    const recentActivities = (await fetchAggregatedActivities(5)).slice(0, 5);

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
        recentActivities,
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

export const getActivities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const type = (req.query.type as string) || 'all';
    const search = (req.query.search as string) || '';

    const allMatching = await fetchAggregatedActivities(100, type, search);
    const total = allMatching.length;
    const startIndex = (page - 1) * limit;
    const activities = allMatching.slice(startIndex, startIndex + limit);

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      results: activities.length,
      data: {
        activities,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
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

export const getAllApps = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const apps = await App.find()
      .populate({
        path: 'releases',
        options: { sort: { buildNumber: -1 } },
        perDocumentLimit: 1,
      })
      .populate('releasesCount')
      .sort({ createdAt: -1 });

    // Populate member names
    const emails = apps.flatMap(app => app.members.map((m: any) => m.email.toLowerCase()));
    const users = await User.find({ email: { $in: emails } });
    const userMap = new Map(users.map(u => [u.email.toLowerCase(), u.name]));

    const appsWithMemberNames = apps.map(app => {
      const appObj = app.toObject ? app.toObject() : app;
      appObj.members = appObj.members.map((m: any) => ({
        ...m,
        name: userMap.get(m.email.toLowerCase()) || m.email.split('@')[0],
      }));
      return appObj;
    });

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      results: apps.length,
      data: {
        apps: appsWithMemberNames
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getSystemHealth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const metrics = await getSystemMetrics();
    
    // Get database status
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    
    // Read logs
    const errorLogs = readLastLines('logs/error.log', 100);
    const allLogs = readLastLines('logs/all.log', 100);

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      data: {
        metrics,
        database: {
          status: dbStatus,
        },
        logs: {
          error: errorLogs,
          all: allLogs,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

import fs from 'fs';

export const clearLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errorLogPath = 'logs/error.log';
    const allLogPath = 'logs/all.log';

    if (fs.existsSync(errorLogPath)) {
      fs.writeFileSync(errorLogPath, '');
    }
    if (fs.existsSync(allLogPath)) {
      fs.writeFileSync(allLogPath, '');
    }

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      message: STRINGS.SETTINGS.LOGS_CLEARED_SUCCESS,
    });
  } catch (error) {
    next(error);
  }
};


