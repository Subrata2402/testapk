import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.js';
import { AppError } from '../utils/appError.js';
import { sendSupportEmail as sendEmail } from '../services/email.service.js';

export const sendSupportEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      next(new AppError('Please provide name, email, subject, and message', 400));
      return;
    }

    logger.info(`Support request received from ${name} (${email}): ${subject}`);

    await sendEmail(name, email, subject, message);

    res.status(200).json({
      status: 'success',
      message: 'Message sent successfully.',
    });
  } catch (error) {
    logger.error('Error sending support email:', error);
    next(new AppError('Error sending support email. Please try again later.', 500));
  }
};
