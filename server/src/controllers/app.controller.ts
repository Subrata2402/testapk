import { Request, Response, NextFunction } from 'express';
import { App } from '../models/app.model.js';
import { User } from '../models/user.model.js';
import { Release } from '../models/release.model.js';
import { STRINGS } from '../constants/strings.js';

const populateMemberNames = async (apps: any[]): Promise<any[]> => {
  const emails = apps.flatMap(app => app.members.map((m: any) => m.email.toLowerCase()));
  const users = await User.find({ email: { $in: emails } });
  const userMap = new Map(users.map(u => [u.email.toLowerCase(), u.name]));

  return apps.map(app => {
    const appObj = app.toObject ? app.toObject() : app;
    appObj.members = appObj.members.map((m: any) => ({
      ...m,
      name: userMap.get(m.email.toLowerCase()) || m.email.split('@')[0],
    }));
    return appObj;
  });
};

const getOwnerCredentials = async (app: any) => {
  const ownerMember = app.members.find((m: any) => m.role === 'Owner');
  if (ownerMember) {
    const ownerUser = await User.findOne({ email: ownerMember.email.toLowerCase() });
    if (ownerUser && ownerUser.googleRefreshToken && ownerUser.googleDriveFolderId) {
      return {
        refreshToken: ownerUser.googleRefreshToken,
        folderId: ownerUser.googleDriveFolderId,
      };
    }
  }
  return undefined;
};

export const createApp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, packageName, description } = req.body;

    if (!name || !packageName || !description) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.FIELDS_REQUIRED,
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

    // Check if package name already exists
    const existingApp = await App.findOne({ packageName });
    if (existingApp) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.PACKAGE_ALREADY_EXISTS,
      });
      return;
    }

    const newApp = await App.create({
      name,
      packageName,
      description,
      members: [
        {
          email: req.user.email,
          role: 'Owner',
          status: 'Accepted',
        },
      ],
    });

    await newApp.populate('releases');

    res.status(201).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      data: {
        app: (await populateMemberNames([newApp]))[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getApps = async (
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

    // Get apps where the user is a member and has accepted the invitation
    const apps = await App.find(
      {
        members: {
          $elemMatch: {
            email: req.user.email,
            status: 'Accepted',
          },
        },
      },
      { members: 0 }
    ).populate({
      path: 'releases',
      options: { sort: { buildNumber: -1 } },
      perDocumentLimit: 1,
    }).populate('releasesCount');

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      results: apps.length,
      data: {
        apps,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const uploadApk = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { appId } = req.params;
    const { releaseNotes } = req.body;

    if (!req.file) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.RELEASE.UPLOAD_REQUIRED,
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

    const app = await App.findById(appId);
    if (!app) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.NOT_FOUND,
      });
      return;
    }

    // Verify role (Owner or Developer only)
    const member = app.members.find(m => m.email.toLowerCase() === req.user!.email.toLowerCase());
    if (!member || (member.role !== 'Owner' && member.role !== 'Developer')) {
      res.status(403).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.RELEASE.UPLOAD_ONLY_OWNERS_DEVELOPERS,
      });
      return;
    }

    // Parse APK
    let parsed;
    try {
      const { parseApk } = await import('../services/apk.service.js');
      parsed = await parseApk(req.file.buffer);
    } catch {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.RELEASE.PARSE_FAILED,
      });
      return;
    }

    // Verify package name matches
    if (parsed.packageName !== app.packageName) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.RELEASE.PACKAGE_MISMATCH(app.packageName, parsed.packageName),
      });
      return;
    }

    // Check if build number already exists
    const buildExists = await Release.findOne({ appId: app._id, buildNumber: parsed.versionCode });
    if (buildExists) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.RELEASE.BUILD_ALREADY_EXISTS(parsed.versionCode),
      });
      return;
    }

    // Check if build number is greater than the latest build number
    const latestRelease = await Release.findOne({ appId: app._id }).sort({ buildNumber: -1 });
    if (latestRelease) {
      if (parsed.versionCode <= latestRelease.buildNumber) {
        res.status(400).json({
          status: STRINGS.COMMON.STATUS_FAIL,
          message: STRINGS.RELEASE.BUILD_NUMBER_TOO_LOW(parsed.versionCode, latestRelease.buildNumber),
        });
        return;
      }
    }

    // Upload to Google Drive
    let driveFileId;
    try {
      const credentials = await getOwnerCredentials(app);
      if (!credentials) {
        res.status(400).json({
          status: STRINGS.COMMON.STATUS_FAIL,
          message: STRINGS.RELEASE.DRIVE_NOT_CONFIGURED,
        });
        return;
      }
      const { uploadFileToDrive } = await import('../services/google-drive.service.js');
      const fileName = `${app.name.replace(/\s+/g, '_')}_v${parsed.versionName}_b${parsed.versionCode}.apk`;
      driveFileId = await uploadFileToDrive(fileName, req.file.buffer, req.file.mimetype, credentials);
    } catch (err: any) {
      const errMsg = err.message || String(err);
      if (errMsg.includes('invalid_grant')) {
        res.status(400).json({
          status: STRINGS.COMMON.STATUS_FAIL,
          message: STRINGS.RELEASE.DRIVE_REVOKED,
        });
      } else {
        res.status(500).json({
          status: STRINGS.COMMON.STATUS_ERROR,
          message: STRINGS.RELEASE.DRIVE_UPLOAD_FAILED(errMsg),
        });
      }
      return;
    }

    // Check if this is the first release
    const releaseCount = await Release.countDocuments({ appId: app._id });
    const isFirstRelease = releaseCount === 0;

    // Save release to DB
    const newRelease = await Release.create({
      appId: app._id,
      version: parsed.versionName,
      buildNumber: parsed.versionCode,
      releaseNotes: releaseNotes || STRINGS.RELEASE.NO_RELEASE_NOTES,
      date: new Date().toISOString(),
      size: `${(req.file.size / (1024 * 1024)).toFixed(1)} MB`,
      apkUrl: driveFileId,
      appName: parsed.appName,
      minSdkVersion: parsed.minSdkVersion,
      targetSdkVersion: parsed.targetSdkVersion,
      sha256: parsed.sha256,
      permissions: parsed.permissions,
      appIcon: parsed.appIcon,
      uploadedByEmail: req.user.email,
      uploadedByName: req.user.name,
    });

    if (isFirstRelease && parsed.appIcon) {
      app.icon = parsed.appIcon;
      await app.save();
    }

    await app.populate('releases');

    // Send push notification to other accepted members
    try {
      const otherMembersEmails = app.members
        .filter(m => m.status === 'Accepted' && m.email.toLowerCase() !== req.user!.email.toLowerCase())
        .map(m => m.email.toLowerCase());

      if (otherMembersEmails.length > 0) {
        const users = await User.find({ email: { $in: otherMembersEmails } });
        const tokens = users.flatMap(u => u.fcmTokens || []);
        if (tokens.length > 0) {
          const { sendPushNotificationToMultiple } = await import('../services/notification.service.js');
          await sendPushNotificationToMultiple(tokens, {
            title: STRINGS.RELEASE.NEW_RELEASE_NOTIFICATION_TITLE(app.name),
            body: STRINGS.RELEASE.NEW_RELEASE_NOTIFICATION_BODY(newRelease.version, newRelease.buildNumber),
            data: {
              appId: app._id.toString(),
              buildNumber: newRelease.buildNumber.toString(),
              type: 'new_release',
            },
          });
        }
      }
    } catch (err) {
      console.error('Failed to send new release push notifications:', err);
    }

    res.status(201).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      data: {
        release: newRelease,
        app: (await populateMemberNames([app]))[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const downloadApk = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { appId, buildNumber } = req.params;

    if (!req.user) {
      res.status(401).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.COMMON.USER_NOT_AUTHENTICATED,
      });
      return;
    }

    const app = await App.findById(appId);
    if (!app) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.NOT_FOUND,
      });
      return;
    }

    // Verify role (Owner, Developer, or Tester)
    const isMember = app.members.some(m => m.email.toLowerCase() === req.user!.email.toLowerCase());
    if (!isMember) {
      res.status(403).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.NOT_MEMBER,
      });
      return;
    }

    // Find release
    const release = await Release.findOne({ appId: app._id, buildNumber: parseInt(buildNumber as string) });
    if (!release) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.RELEASE.NOT_FOUND,
      });
      return;
    }

    // Get file stream from Google Drive
    const { getFileStreamFromDrive } = await import('../services/google-drive.service.js');
    
    let fileData;
    try {
      const credentials = await getOwnerCredentials(app);
      if (!credentials) {
        res.status(400).json({
          status: STRINGS.COMMON.STATUS_FAIL,
          message: STRINGS.RELEASE.DRIVE_NOT_CONFIGURED,
        });
        return;
      }
      fileData = await getFileStreamFromDrive(release.apkUrl, credentials);
    } catch (err: any) {
      if (err.code === 404 || err.status === 404 || (err.message && err.message.includes('File not found'))) {
        res.status(404).json({
          status: STRINGS.COMMON.STATUS_FAIL,
          message: STRINGS.RELEASE.DRIVE_FILE_NOT_FOUND,
        });
        return;
      }
      throw err;
    }

    const { stream, contentLength } = fileData;

    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${app.name.replace(/\s+/g, '_')}_v${release.version}.apk"`
    );
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }

    stream.pipe(res);
  } catch (error) {
    next(error);
  }
};

export const deleteRelease = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { appId, buildNumber } = req.params;

    if (!req.user) {
      res.status(401).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.COMMON.USER_NOT_AUTHENTICATED,
      });
      return;
    }

    const app = await App.findById(appId);
    if (!app) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.NOT_FOUND,
      });
      return;
    }

    // Verify role (Owner or Developer only)
    const member = app.members.find(m => m.email.toLowerCase() === req.user!.email.toLowerCase());
    if (!member || (member.role !== 'Owner' && member.role !== 'Developer')) {
      res.status(403).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.RELEASE.DELETE_ONLY_OWNERS_DEVELOPERS,
      });
      return;
    }

    // Find release
    const release = await Release.findOne({ appId: app._id, buildNumber: parseInt(buildNumber as string) });
    if (!release) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.RELEASE.NOT_FOUND,
      });
      return;
    }

    // Delete file from Google Drive
    try {
      const credentials = await getOwnerCredentials(app);
      if (!credentials) {
        res.status(400).json({
          status: STRINGS.COMMON.STATUS_FAIL,
          message: STRINGS.RELEASE.DRIVE_NOT_CONFIGURED,
        });
        return;
      }
      const { deleteFileFromDrive } = await import('../services/google-drive.service.js');
      await deleteFileFromDrive(release.apkUrl, credentials);
    } catch (err: any) {
      console.error(`Failed to delete file from Google Drive: ${err.message || err}`);
    }

    // Remove release from DB
    await Release.deleteOne({ _id: release._id });
    await app.populate('releases');

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      data: {
        app: (await populateMemberNames([app]))[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const inviteMember = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { appId } = req.params;
    const { email, role } = req.body;

    if (!email || !role) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.INVITE_FIELDS_REQUIRED,
      });
      return;
    }

    const app = await App.findById(appId);
    if (!app) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.NOT_FOUND,
      });
      return;
    }

    // Check if requester is Owner or Developer
    const requester = app.members.find(m => m.email.toLowerCase() === req.user!.email.toLowerCase());
    if (!requester || (requester.role !== 'Owner' && requester.role !== 'Developer')) {
      res.status(403).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.INVITE_ONLY_OWNERS_DEVELOPERS,
      });
      return;
    }

    // Check if invited user is the requester
    if (email.toLowerCase() === req.user!.email.toLowerCase()) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.INVITE_YOURSELF,
      });
      return;
    }

    // Check if invited user is registered
    const invitedUser = await User.findOne({ email: email.toLowerCase() });
    if (!invitedUser) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.INVITE_NOT_REGISTERED,
      });
      return;
    }

    // Check if already a member
    const existingMember = app.members.find(m => m.email.toLowerCase() === email.toLowerCase());
    if (existingMember) {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.INVITE_ALREADY_MEMBER,
      });
      return;
    }

    app.members.push({
      email,
      role,
      status: 'Pending',
    });

    await app.save();
    await app.populate('releases');

    // Send push notification to the invited user
    try {
      const invitedUser = await User.findOne({ email: email.toLowerCase() });
      if (invitedUser && invitedUser.fcmTokens && invitedUser.fcmTokens.length > 0) {
        const { sendPushNotificationToMultiple } = await import('../services/notification.service.js');
        await sendPushNotificationToMultiple(invitedUser.fcmTokens, {
          title: STRINGS.APP.INVITATION_NOTIFICATION_TITLE(app.name),
          body: STRINGS.APP.INVITATION_NOTIFICATION_BODY(app.name, role),
          data: {
            appId: app._id.toString(),
            type: 'invitation',
          },
        });
      }
    } catch (err) {
      console.error('Failed to send invitation push notification:', err);
    }

    // Send invitation email
    try {
      const { sendInvitationEmail } = await import('../services/email.service.js');
      sendInvitationEmail(email.toLowerCase(), app.name, role);
    } catch (err) {
      console.error('Failed to send invitation email:', err);
    }

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      data: {
        app: (await populateMemberNames([app]))[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const removeMember = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { appId, email } = req.params;

    const app = await App.findById(appId);
    if (!app) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.NOT_FOUND,
      });
      return;
    }

    // Check if requester is Owner or Developer
    const requester = app.members.find(m => m.email.toLowerCase() === req.user!.email.toLowerCase());
    if (!requester || (requester.role !== 'Owner' && requester.role !== 'Developer')) {
      res.status(403).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.REMOVE_ONLY_OWNERS_DEVELOPERS,
      });
      return;
    }

    const emailStr = email as string;

    // Cannot remove the owner
    const memberToRemove = app.members.find(m => m.email.toLowerCase() === emailStr.toLowerCase());
    if (memberToRemove && memberToRemove.role === 'Owner') {
      res.status(400).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.REMOVE_OWNER_RESTRICTED,
      });
      return;
    }

    app.members = app.members.filter(m => m.email.toLowerCase() !== emailStr.toLowerCase());
    await app.save();
    await app.populate('releases');

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      data: {
        app: (await populateMemberNames([app]))[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getInvitations = async (
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

    const apps = await App.find(
      {
        members: {
          $elemMatch: {
            email: req.user.email,
            status: 'Pending',
          },
        },
      },
      { members: 0 }
    ).populate({
      path: 'releases',
      options: { sort: { buildNumber: -1 } },
      perDocumentLimit: 1,
    }).populate('releasesCount');

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      results: apps.length,
      data: {
        apps,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const acceptInvitation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { appId } = req.params;

    const app = await App.findById(appId);
    if (!app) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.NOT_FOUND,
      });
      return;
    }

    const member = app.members.find(m => m.email.toLowerCase() === req.user!.email.toLowerCase());
    if (!member) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.INVITATION_NOT_FOUND,
      });
      return;
    }

    member.status = 'Accepted';
    await app.save();
    await app.populate('releases');

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      data: {
        app: (await populateMemberNames([app]))[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const rejectInvitation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { appId } = req.params;

    const app = await App.findById(appId);
    if (!app) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.NOT_FOUND,
      });
      return;
    }

    app.members = app.members.filter(m => m.email.toLowerCase() !== req.user!.email.toLowerCase());
    await app.save();
    await app.populate('releases');

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      message: STRINGS.APP.INVITATION_REJECTED,
    });
  } catch (error) {
    next(error);
  }
};

export const getReleases = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { appId } = req.params;

    if (!req.user) {
      res.status(401).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.COMMON.USER_NOT_AUTHENTICATED,
      });
      return;
    }

    const app = await App.findById(appId);
    if (!app) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.NOT_FOUND,
      });
      return;
    }

    // Verify role (Owner, Developer, or Tester)
    const isMember = app.members.some(m => m.email.toLowerCase() === req.user!.email.toLowerCase());
    if (!isMember) {
      res.status(403).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.NOT_MEMBER,
      });
      return;
    }

    const releases = await Release.find({ appId }).sort({ buildNumber: -1 });

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      results: releases.length,
      data: {
        releases,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { appId } = req.params;

    if (!req.user) {
      res.status(401).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.COMMON.USER_NOT_AUTHENTICATED,
      });
      return;
    }

    const app = await App.findById(appId);
    if (!app) {
      res.status(404).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.NOT_FOUND,
      });
      return;
    }

    // Verify role (Owner, Developer, or Tester)
    const isMember = app.members.some(m => m.email.toLowerCase() === req.user!.email.toLowerCase());
    if (!isMember) {
      res.status(403).json({
        status: STRINGS.COMMON.STATUS_FAIL,
        message: STRINGS.APP.NOT_MEMBER,
      });
      return;
    }

    const populatedApps = await populateMemberNames([app]);
    const members = populatedApps[0].members;

    res.status(200).json({
      status: STRINGS.COMMON.STATUS_SUCCESS,
      results: members.length,
      data: {
        members,
      },
    });
  } catch (error) {
    next(error);
  }
};
