import { Request, Response, NextFunction } from 'express';
import { google } from 'googleapis';
import { env } from '../config/env.js';
import { User } from '../models/user.model.js';
import { createFolderInDrive } from '../services/google-drive.service.js';
import { STRINGS } from '../constants/strings.js';

export const getMe = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.COMMON.USER_NOT_AUTHENTICATED,
      });
      return;
    }

  res.status(200).json({
    status: STRINGS.COMMON.STATUS_SUCCESS,
    data: {
      user: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        picture: req.user.picture,
        role: req.user.role,
        isDriveConfigured: !!req.user.googleRefreshToken,
      },
    },
  });
};

export const configureDrive = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { code } = req.body;

    if (!code) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.USER.AUTH_CODE_REQUIRED,
      });
      return;
    }

    if (!req.user) {
      res.status(401).json({
        status: 'fail',
        message: 'User not authenticated',
      });
      return;
    }

    // Exchange code for tokens
    const oauth2Client = new google.auth.OAuth2(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      'postmessage' // Must match the redirect URI used by the frontend popup
    );

    const { tokens } = await oauth2Client.getToken(code);
    const refreshToken = tokens.refresh_token;

    if (!refreshToken) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.USER.REFRESH_TOKEN_FAILED,
      });
      return;
    }

    // Create a folder in the user's Google Drive
    const folderId = await createFolderInDrive('TestAPK_Releases', refreshToken);

    // Save credentials to user document
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.USER.NOT_FOUND,
      });
      return;
    }

    user.googleRefreshToken = refreshToken;
    user.googleDriveFolderId = folderId;
    await user.save();

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      message: STRINGS.USER.DRIVE_CONFIGURED,
      data: {
        isDriveConfigured: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateFcmToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.USER.FCM_TOKEN_REQUIRED,
      });
      return;
    }

    if (!req.user) {
      res.status(401).json({
        status: 'fail',
        message: 'User not authenticated',
      });
      return;
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.USER.NOT_FOUND,
      });
      return;
    }

    if (!user.fcmTokens) {
      user.fcmTokens = [];
    }

    if (!user.fcmTokens.includes(token)) {
      user.fcmTokens.push(token);
      await user.save();
    }

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      message: STRINGS.USER.FCM_TOKEN_UPDATED,
    });
  } catch (error) {
    next(error);
  }
};
