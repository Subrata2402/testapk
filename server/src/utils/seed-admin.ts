import { User } from '../models/user.model.js';
import { logger } from '../config/logger.js';

export const seedAdminUser = async (): Promise<void> => {
  try {
    const adminEmail = 'admin@testapk.com';
    const adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      await User.create({
        email: adminEmail,
        name: 'Admin',
        password: 'password123', // Will be hashed by the pre-save hook in user.model.ts
        role: 'admin',
      });
      logger.info('👤 Default admin user seeded successfully (admin@testapk.com / password123)');
    } else {
      logger.info('👤 Admin user already exists');
    }
  } catch (error) {
    logger.error(`Failed to seed admin user: ${(error as Error).message}`);
  }
};
