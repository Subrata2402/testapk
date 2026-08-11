import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { DeviceCode } from '../models/device-code.model.js';
import { User } from '../models/user.model.js';
import { env } from '../config/env.js';
import { STRINGS } from '../constants/strings.js';

const generateUserCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += '-';
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const generateDeviceCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deviceCode = crypto.randomUUID();
    const userCode = generateUserCode();
    const urlToken = crypto.randomUUID(); // separate short-lived URL access token
    const expiresIn = 300; // 5 minutes
    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    await DeviceCode.create({
      deviceCode,
      userCode,
      urlToken,
      expiresAt,
    });

    // Use request origin or default to localhost
    const origin = req.headers.origin || 'https://testapk.clipboux.online';
    // The urlToken gates access to the /device page; user code is typed manually
    const verificationUri = `${origin}/device?token=${urlToken}`;

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      data: {
        deviceCode,
        userCode,
        verificationUri,
        expiresIn,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Validates the URL token embedded in the verification link.
// No auth required — this is a public page-access check.
export const checkUrlToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      res.status(400).json({ status: STRINGS.COMMON.STATUS_FAIL, code: 'missing', message: STRINGS.DEVICE.TOKEN_REQUIRED });
      return;
    }

    const doc = await DeviceCode.findOne({ urlToken: token });

    if (!doc) {
      // Token never existed or already cleaned up
      res.status(404).json({ status: STRINGS.COMMON.STATUS_FAIL, code: 'not_found', message: STRINGS.DEVICE.INVALID_USED_TOKEN });
      return;
    }

    if (doc.expiresAt < new Date()) {
      res.status(410).json({ status: STRINGS.COMMON.STATUS_FAIL, code: 'expired', message: STRINGS.DEVICE.LINK_EXPIRED });
      return;
    }

    if (doc.isAuthorized) {
      // Already authorized — treat as used
      res.status(410).json({ status: STRINGS.COMMON.STATUS_FAIL, code: 'used', message: STRINGS.DEVICE.LINK_ALREADY_USED });
      return;
    }

    res.status(200).json({ status: STRINGS.COMMON.STATUS_SUCCESS, code: 'valid' });
  } catch (error) {
    next(error);
  }
};



export const authorizeDeviceCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userCode } = req.body;

    if (!userCode) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.DEVICE.USER_CODE_REQUIRED,
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

    // Normalize user code (uppercase, trim, ensure hyphen)
    let normalizedCode = userCode.trim().toUpperCase();
    if (normalizedCode.length === 8 && !normalizedCode.includes('-')) {
      normalizedCode = `${normalizedCode.slice(0, 4)}-${normalizedCode.slice(4)}`;
    }

    const deviceCodeDoc = await DeviceCode.findOne({
      userCode: normalizedCode,
    });

    if (!deviceCodeDoc) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        code: 'invalid_code',
        message: STRINGS.DEVICE.INVALID_CODE,
      });
      return;
    }

    if (deviceCodeDoc.expiresAt < new Date()) {
      res.status(410).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        code: 'expired_code',
        message: STRINGS.DEVICE.CODE_EXPIRED,
      });
      return;
    }

    deviceCodeDoc.userId = req.user._id as any;
    deviceCodeDoc.isAuthorized = true;
    await deviceCodeDoc.save();

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      message: STRINGS.DEVICE.SUCCESSFULLY_AUTHORIZED,
    });
  } catch (error) {
    next(error);
  }
};

export const pollDeviceToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { deviceCode } = req.body;

    if (!deviceCode) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.DEVICE.DEVICE_CODE_REQUIRED,
      });
      return;
    }

    const deviceCodeDoc = await DeviceCode.findOne({
      deviceCode,
    });

    if (!deviceCodeDoc || deviceCodeDoc.expiresAt < new Date()) {
      res.status(400).json({
        error: 'expired_token',
        message: STRINGS.DEVICE.DEVICE_CODE_EXPIRED,
      });
      return;
    }

    if (!deviceCodeDoc.isAuthorized) {
      res.status(400).json({
        error: 'authorization_pending',
        message: STRINGS.DEVICE.AUTHORIZATION_PENDING,
      });
      return;
    }

    // Generate token
    const token = jwt.sign({ id: deviceCodeDoc.userId }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as any,
    });

    const user = await User.findById(deviceCodeDoc.userId);
    if (!user) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.DEVICE.USER_NOT_FOUND,
      });
      return;
    }

    // Delete the device code so it cannot be reused
    await DeviceCode.deleteOne({ _id: deviceCodeDoc._id });

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      token,
      data: {
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          isDriveConfigured: !!(user.googleRefreshToken && user.googleDriveFolderId),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
