import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.js';
import { AppError } from '../utils/appError.js';
import { sendSupportEmail as sendEmail } from '../services/email.service.js';
import { STRINGS } from '../constants/strings.js';
import { Support } from '../models/support.model.js';

export const sendSupportEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      next(new AppError(STRINGS.SUPPORT.FIELDS_REQUIRED, 400));
      return;
    }

    logger.info(`Support request received from ${name} (${email}): ${subject}`);

    // Save to database
    await Support.create({ name, email, subject, message });

    // Send email
    await sendEmail(name, email, subject, message);

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      message: STRINGS.SUPPORT.SENT_SUCCESS,
    });
  } catch (error) {
    logger.error('Error sending support email:', error);
    next(new AppError(STRINGS.SUPPORT.SENT_ERROR, 500));
  }
};

export const getSupportRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Check if user is admin
    if (req.user?.role !== 'admin') {
      res.status(403).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.AUTH.ACCESS_DENIED,
      });
      return;
    }

    const requests = await Support.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      data: {
        requests,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateSupportStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Check if user is admin
    if (req.user?.role !== 'admin') {
      res.status(403).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.AUTH.ACCESS_DENIED,
      });
      return;
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['pending', 'resolved'].includes(status)) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.SUPPORT.INVALID_STATUS,
      });
      return;
    }

    const request = await Support.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!request) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.SUPPORT.NOT_FOUND,
      });
      return;
    }

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      data: {
        request,
      },
    });
  } catch (error) {
    next(error);
  }
};
