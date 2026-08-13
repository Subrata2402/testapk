import { Request, Response, NextFunction } from 'express';
import { Setting } from '../models/setting.model.js';
import { STRINGS } from '../constants/strings.js';
import { AppError } from '../utils/appError.js';

// Default settings to seed if not present
const DEFAULT_SETTINGS = [
  { key: 'maintenance_mode', value: false, description: 'Enable/disable maintenance mode' },
  { key: 'allow_registration', value: true, description: 'Allow new user registration' },
  { key: 'max_apk_size', value: 104857600, description: 'Maximum APK upload size in bytes (default 100MB)' },
  { key: 'announcement_banner', value: '', description: 'System-wide announcement banner text' },
];

export const seedSettings = async (): Promise<void> => {
  try {
    for (const def of DEFAULT_SETTINGS) {
      const exists = await Setting.findOne({ key: def.key });
      if (!exists) {
        await Setting.create(def);
      }
    }
  } catch (error) {
    console.error('Failed to seed settings:', error);
  }
};

export const getSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await seedSettings(); // Ensure settings are seeded
    const settings = await Setting.find();
    
    // Convert to a key-value object for easier frontend consumption
    const settingsMap = settings.reduce((acc: any, curr) => {
      acc[curr.key] = {
        value: curr.value,
        description: curr.description,
      };
      return acc;
    }, {});

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      data: {
        settings: settingsMap,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updates = req.body; // e.g., { maintenance_mode: true, announcement_banner: "Hello" }
    const adminUser = (req as any).user;

    for (const [key, value] of Object.entries(updates)) {
      await Setting.findOneAndUpdate(
        { key },
        { value, updatedBy: adminUser?._id },
        { new: true, upsert: true }
      );
    }

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      message: STRINGS.SETTINGS.UPDATED_SUCCESS,
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await seedSettings();
    const publicKeys = ['maintenance_mode', 'allow_registration', 'announcement_banner'];
    const settings = await Setting.find({ key: { $in: publicKeys } });

    const publicSettings = settings.reduce((acc: any, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      data: {
        settings: publicSettings,
      },
    });
  } catch (error) {
    next(error);
  }
};
