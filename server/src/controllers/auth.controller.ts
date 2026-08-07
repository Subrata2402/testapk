import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/user.model.js';
import { sendWelcomeEmail } from '../services/email.service.js';
import { STRINGS } from '../constants/strings.js';

const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);

const signToken = (id: string): string => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as any,
  });
};

export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.AUTH.GOOGLE_ID_TOKEN_REQUIRED,
      });
      return;
    }

    // Verify the token
    let ticket;
    try {
      ticket = await client.verifyIdToken({
        idToken,
        audience: env.GOOGLE_CLIENT_ID,
      });
    } catch (error) {
      res.status(401).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.AUTH.INVALID_GOOGLE_ID_TOKEN,
        error: (error as Error).message,
      });
      return;
    }

    const payload = ticket.getPayload();
    if (!payload) {
      res.status(401).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.AUTH.INVALID_GOOGLE_ID_TOKEN_PAYLOAD,
      });
      return;
    }

    const { email, name, picture, sub: googleId } = payload;

    if (!email || !name) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.AUTH.MISSING_EMAIL_OR_NAME,
      });
      return;
    }

    // Find or create user
    let user = await User.findOne({ email });

    if (user) {
      if (user.isDeleted) {
        res.status(403).json({
          status: STRINGS.COMMON.STATUS_FAIL,
          message: STRINGS.AUTH.ACCOUNT_DELETED_CONTACT_SUPPORT,
        });
        return;
      }
      // Update googleId and picture if not present or changed
      let updated = false;
      if (!user.googleId) {
        user.googleId = googleId;
        updated = true;
      }
      if (picture && user.picture !== picture) {
        user.picture = picture;
        updated = true;
      }
      if (updated) {
        await user.save();
      }
    } else {
      user = await User.create({
        email,
        name,
        picture,
        googleId,
      });
      // Send welcome email asynchronously
      sendWelcomeEmail(user.email, user.name).catch(err => {
        console.error('Failed to send welcome email:', err);
      });
    }

    // Generate JWT
    const token = signToken(user._id.toString());

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      token,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          picture: user.picture,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { fcmToken } = req.body || {};
    if (req.user && fcmToken) {
      req.user.fcmTokens = req.user.fcmTokens?.filter(t => t !== fcmToken) || [];
      await req.user.save();
    }
    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      message: STRINGS.AUTH.LOGGED_OUT,
    });
  } catch (error) {
    next(error);
  }
};
