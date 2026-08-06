import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.js';
import { AppError } from '../utils/appError.js';
import { sendSupportEmail as sendEmail } from '../services/email.service.js';
import { STRINGS } from '../constants/strings.js';

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
