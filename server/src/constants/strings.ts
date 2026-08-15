import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { localeStorage } from '../middlewares/localeStorage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ENGLISH_STRINGS = {
  COMMON: {
    STATUS_SUCCESS: 'success',
    STATUS_FAIL: 'fail',
    STATUS_ERROR: 'error',
    USER_NOT_AUTHENTICATED: 'User not authenticated',
    SOMETHING_WENT_WRONG: 'Something went wrong',
    TOO_MANY_REQUESTS: 'Too many requests from this IP, please try again later.',
    VALIDATION_FAILED: 'Validation failed',
  },
  AUTH: {
    GOOGLE_ID_TOKEN_REQUIRED: 'Google ID Token is required',
    INVALID_GOOGLE_ID_TOKEN: 'Invalid Google ID Token',
    INVALID_GOOGLE_ID_TOKEN_PAYLOAD: 'Invalid Google ID Token payload',
    MISSING_EMAIL_OR_NAME: 'Google account is missing email or name',
    LOGGED_OUT: 'Logged out successfully',
    NOT_LOGGED_IN: 'You are not logged in! Please log in to get access.',
    INVALID_EXPIRED_TOKEN: 'Invalid or expired token. Please log in again.',
    USER_NOT_FOUND: 'The user belonging to this token no longer exists.',
    ACCOUNT_DELETED_CONTACT_SUPPORT: 'Your account has been deleted. Please contact support to reopen your account.',
    EMAIL_PASSWORD_REQUIRED: 'Email and password are required',
    INVALID_EMAIL_PASSWORD: 'Invalid email or password',
    ACCESS_DENIED: 'Access denied. Admins only.',
  },
  APP: {
    FIELDS_REQUIRED: 'Application name, package name, and description are required',
    PACKAGE_ALREADY_EXISTS: 'An application with this package name already exists',
    NOT_FOUND: 'Application not found',
    NOT_MEMBER: 'You are not a member of this application',
    INVITE_FIELDS_REQUIRED: 'Email and role are required',
    INVITE_ONLY_OWNERS_DEVELOPERS: 'Only Owners and Developers can invite members',
    INVITE_YOURSELF: 'You cannot invite yourself',
    INVITE_NOT_REGISTERED: 'User is not registered. Only registered users can be invited.',
    INVITE_ALREADY_MEMBER: 'User is already a member or has a pending invitation',
    REMOVE_ONLY_OWNERS_DEVELOPERS: 'Only Owners and Developers can remove members',
    REMOVE_OWNER_RESTRICTED: 'Cannot remove the application owner',
    INVITATION_NOT_FOUND: 'Invitation not found',
    INVITATION_REJECTED: 'Invitation rejected successfully',
    INVITATION_NOTIFICATION_TITLE: (appName: string) => `Invitation to join ${appName}`,
    INVITATION_NOTIFICATION_BODY: (appName: string, role: string) =>
      `You have been invited to join ${appName} as a ${role}.`,
  },
  RELEASE: {
    UPLOAD_REQUIRED: 'Please upload an APK file',
    UPLOAD_ONLY_OWNERS_DEVELOPERS: 'Only Owners and Developers are allowed to upload APKs',
    PARSE_FAILED: 'Failed to parse APK file. Make sure it is a valid Android package.',
    PACKAGE_MISMATCH: (expected: string, found: string) =>
      `Package name mismatch. Expected: ${expected}, Found: ${found}`,
    BUILD_ALREADY_EXISTS: (versionCode: number) =>
      `A release with build number #${versionCode} already exists`,
    BUILD_NUMBER_TOO_LOW: (versionCode: number, latestBuild: number) =>
      `Build number #${versionCode} cannot be used because the latest published build number is #${latestBuild}. Please increment the build number and try again.`,
    DRIVE_NOT_CONFIGURED: 'Google Drive is not configured for the owner of this application.',
    DRIVE_REVOKED: 'Google Drive access has been revoked or is invalid. Please re-configure Google Drive in your application settings.',
    DRIVE_UPLOAD_FAILED: (errMsg: string) => `Failed to upload APK to Google Drive: ${errMsg}`,
    NO_RELEASE_NOTES: 'No release notes provided',
    NEW_RELEASE_NOTIFICATION_TITLE: (appName: string) => `New Release for ${appName}`,
    NEW_RELEASE_NOTIFICATION_BODY: (versionName: string, versionCode: number) =>
      `Version ${versionName} (Build #${versionCode}) is now available.`,
    NOT_FOUND: 'Release not found',
    DRIVE_FILE_NOT_FOUND: 'The APK file was not found on Google Drive. It may have been deleted.',
    DELETE_ONLY_OWNERS_DEVELOPERS: 'Only Owners and Developers are allowed to delete releases',
  },
  DEVICE: {
    TOKEN_REQUIRED: 'Token is required',
    INVALID_USED_TOKEN: 'Invalid or already used token',
    LINK_EXPIRED: 'This authorization link has expired',
    LINK_ALREADY_USED: 'This link has already been used',
    USER_CODE_REQUIRED: 'User code is required',
    INVALID_CODE: 'Invalid authorization code. Please check the code and try again.',
    CODE_EXPIRED: 'This authorization code has expired. Please generate a new one.',
    SUCCESSFULLY_AUTHORIZED: 'Device successfully authorized',
    DEVICE_CODE_REQUIRED: 'Device code is required',
    DEVICE_CODE_EXPIRED: 'The device code has expired. Please request a new one.',
    AUTHORIZATION_PENDING: 'The user has not yet authorized the device.',
    USER_NOT_FOUND: 'User not found',
  },
  FEEDBACK: {
    FIELDS_REQUIRED: 'Category, rating, title, and description are required',
  },
  HEALTH: {
    RUNNING: 'Server is healthy and running',
  },
  SUPPORT: {
    FIELDS_REQUIRED: 'Please provide name, email, subject, and message',
    SENT_SUCCESS: 'Message sent successfully.',
    SENT_ERROR: 'Error sending support email. Please try again later.',
    INVALID_STATUS: 'Invalid status value. Must be pending or resolved.',
    NOT_FOUND: 'Support request not found',
  },
  USER: {
    AUTH_CODE_REQUIRED: 'Authorization code is required',
    REFRESH_TOKEN_FAILED: 'Failed to obtain refresh token. Please ensure you grant offline access and consent.',
    DRIVE_CONFIGURED: 'Google Drive configured successfully',
    FCM_TOKEN_REQUIRED: 'FCM token is required',
    FCM_TOKEN_UPDATED: 'FCM token updated successfully',
    NOT_FOUND: 'User not found',
    DELETED_SUCCESS: 'Account deleted successfully',
  },
  SETTINGS: {
    UPDATED_SUCCESS: 'Settings updated successfully',
    MAINTENANCE_ACTIVE: 'System is currently under maintenance. Please try again later.',
  },
  EMAIL: {
    WELCOME_SUBJECT: 'Welcome to TestAPK!',
    WELCOME_TEXT: (name: string) =>
      `Hi ${name},\n\nWelcome to TestAPK! We are excited to have you on board.\n\nBest regards,\nThe TestAPK Team`,
    WELCOME_HTML: (name: string) => `
        <h3>Welcome to TestAPK!</h3>
        <p>Hi ${name},</p>
        <p>We are excited to have you on board. TestAPK helps you manage and distribute your APK releases to testers seamlessly.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>The TestAPK Team</strong></p>
      `,
    SUPPORT_SUBJECT: (subject: string) => `[TestAPK Support] ${subject}`,
    SUPPORT_TEXT: (name: string, email: string, message: string) =>
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    SUPPORT_HTML: (name: string, email: string, subject: string, message: string) => `
      <h3>New Support Request</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <br/>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `,
    SMTP_NOT_CONFIGURED_WELCOME: (toEmail: string) => `SMTP is not configured. Welcome email to ${toEmail} simulated.`,
    SMTP_NOT_CONFIGURED_SUPPORT: 'SMTP is not configured. Support message logged to console:',
    WELCOME_SENT: (toEmail: string) => `Welcome email sent to ${toEmail}`,
    SUPPORT_SENT: (supportEmail: string) => `Support email sent to ${supportEmail}`,
    INVITATION_SUBJECT: (appName: string) => `Invitation to join ${appName} on TestAPK`,
    INVITATION_TEXT: (appName: string, role: string) =>
      `Hi,\n\nYou have been invited to join the application "${appName}" as a ${role} on TestAPK.\n\nPlease log in to the TestAPK app to accept or reject the invitation.\n\nBest regards,\nThe TestAPK Team`,
    INVITATION_HTML: (appName: string, role: string) => `
      <h3>Invitation to join ${appName} on TestAPK</h3>
      <p>Hi,</p>
      <p>You have been invited to join the application <strong>${appName}</strong> as a <strong>${role}</strong> on TestAPK.</p>
      <p>Please log in to the TestAPK app to accept or reject the invitation.</p>
      <br/>
      <p>Best regards,</p>
      <p><strong>The TestAPK Team</strong></p>
    `,
    SMTP_NOT_CONFIGURED_INVITATION: (toEmail: string) => `SMTP is not configured. Invitation email to ${toEmail} simulated.`,
    INVITATION_SENT: (toEmail: string) => `Invitation email sent to ${toEmail}`,
  },
  DRIVE: {
    NOT_CONFIGURED: 'Google Drive credentials are not configured.',
    FOLDER_CREATE_FAILED: 'Failed to create folder in Google Drive',
    UPLOAD_FAILED_NO_ID: 'Failed to upload file to Google Drive: No ID returned',
  },
  NOTIFICATIONS: {
    FCM_INIT_SUCCESS: '✅ Firebase Cloud Messaging initialized successfully.',
    FCM_INIT_FAILED: '❌ Failed to initialize Firebase Cloud Messaging:',
    FCM_NOT_INITIALIZED: '⚠️ FCM not initialized. Skipping notification.',
    FCM_KEY_NOT_FOUND: (keyPath: string) => `⚠️ Firebase service account file not found at ${keyPath}. Push notifications will be disabled.`,
    FCM_SEND_FAILED: (fcmToken: string) => `❌ Failed to send push notification to token ${fcmToken}:`,
  },
  MODELS: {
    APP: {
      DEFAULT_CATEGORY: 'Android App',
      DEFAULT_ICON: 'Android',
      DEFAULT_DOWNLOADS: '0',
      DEFAULT_RATING: '0.0',
      DEFAULT_ACTIVE_USERS: '0',
      DEFAULT_SCREENSHOTS: [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #2af598 0%, #009efd 100%)',
      ],
    },
    FEEDBACK: {
      USER_ID_REQUIRED: 'User ID is required',
      CATEGORY_REQUIRED: 'Category is required',
      RATING_REQUIRED: 'Rating is required',
      TITLE_REQUIRED: 'Title is required',
      DESCRIPTION_REQUIRED: 'Description is required',
    },
    USER: {
      EMAIL_REQUIRED: 'Email is required',
      NAME_REQUIRED: 'Name is required',
    },
  },
} as const;

// Load JSON locale files
const locales: Record<string, any> = {};
const supportedLocales = ['en', 'es', 'pt', 'hi', 'fr', 'de', 'ja', 'zh', 'ar'];

let localesDir = path.join(__dirname, '..', 'locales');
if (!fs.existsSync(localesDir)) {
  localesDir = path.join(__dirname, '..', '..', 'src', 'locales');
}

for (const locale of supportedLocales) {
  const filePath = path.join(localesDir, `${locale}.json`);
  if (fs.existsSync(filePath)) {
    try {
      locales[locale] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      console.error(`Failed to load locale file ${filePath}:`, e);
    }
  }
}

function interpolate(template: string, args: any[]): string {
  return template.replace(/{(\d+)}/g, (match, index) => {
    const val = args[Number(index)];
    return val !== undefined ? String(val) : match;
  });
}

function createProxy(target: any, path: string[] = []): any {
  return new Proxy(target, {
    get(obj, prop: string | symbol) {
      if (typeof prop === 'symbol') {
        return Reflect.get(obj, prop);
      }

      const currentPath = [...path, prop];
      const value = obj[prop];

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return createProxy(value, currentPath);
      }

      // Get current locale from AsyncLocalStorage
      const locale = localeStorage.getStore() || 'en';

      const propStr = String(prop);
      if (
        locale === 'en' ||
        propStr === 'STATUS_SUCCESS' ||
        propStr === 'STATUS_FAIL' ||
        propStr === 'STATUS_ERROR'
      ) {
        return value;
      }

      if (typeof value === 'function') {
        return (...args: any[]) => {
          // Find translation
          let translation = locales[locale];
          for (const key of currentPath) {
            if (translation && translation[key] !== undefined) {
              translation = translation[key];
            } else {
              translation = undefined;
              break;
            }
          }
          if (typeof translation === 'string') {
            return interpolate(translation, args);
          }
          // Fallback to English function
          return value(...args);
        };
      }

      // Find translation
      let translation = locales[locale];
      for (const key of currentPath) {
        if (translation && translation[key] !== undefined) {
          translation = translation[key];
        } else {
          translation = undefined;
          break;
        }
      }

      if (translation !== undefined) {
        return translation;
      }

      // Fallback to English
      return value;
    },
  });
}

export const STRINGS = createProxy(ENGLISH_STRINGS) as typeof ENGLISH_STRINGS;
