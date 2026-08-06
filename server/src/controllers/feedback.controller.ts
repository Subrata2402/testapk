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

    // Only admins can view all feedback; users can view their own
    const query = req.user.role === 'admin' ? {} : { userId: req.user._id };
    const feedbacks = await Feedback.find(query)
      .populate('userId', 'name email picture')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      results: feedbacks.length,
      data: {
        feedbacks,
      },
    });
  } catch (error) {
    next(error);
  }
};
