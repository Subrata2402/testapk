import { Request, Response, NextFunction } from 'express';
import { Feedback } from '../models/feedback.model.js';
import { STRINGS } from '../constants/strings.js';

export const createFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, rating, title, description, deviceInfo } = req.body;

    if (!category || !rating || !title || !description) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.FEEDBACK.FIELDS_REQUIRED,
      });
      return;
    }

    if (!req.user) {
      res.status(401).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.COMMON.USER_NOT_AUTHENTICATED,
      });
      return;
    }

    const feedback = await Feedback.create({
      userId: req.user._id,
      category,
      rating,
      title,
      description,
      deviceInfo,
    });

    res.status(201).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      data: {
        feedback,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.COMMON.USER_NOT_AUTHENTICATED,
      });
      return;
    }

    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const search = (req.query.search as string) || '';
    const category = (req.query.category as string) || 'all';
    const rating = (req.query.rating as string) || 'all';
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;

    const baseQuery: any = req.user.role === 'admin' ? {} : { userId: req.user._id };

    if (category && category !== 'all') {
      baseQuery.category = category;
    }

    if (rating && rating !== 'all') {
      baseQuery.rating = parseInt(rating, 10);
    }

    if (startDate || endDate) {
      baseQuery.createdAt = {};
      if (startDate) {
        baseQuery.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        baseQuery.createdAt.$lte = end;
      }
    }

    if (search) {
      baseQuery.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [feedbacks, total] = await Promise.all([
      Feedback.find(baseQuery)
        .populate('userId', 'name email picture')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Feedback.countDocuments(baseQuery),
    ]);

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      results: feedbacks.length,
      data: {
        feedbacks,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
