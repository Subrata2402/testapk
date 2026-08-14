export const ENDPOINTS = {
  AUTH: {
    GOOGLE: '/auth/google',
    LOGOUT: '/auth/logout',
  },
  USER: {
    ME: '/users/me',
    CONFIGURE_DRIVE: '/users/configure-drive',
  },
  APPS: {
    BASE: '/apps',
    RELEASES: (appId) => `/apps/${appId}/releases`,
    MEMBERS: (appId) => `/apps/${appId}/members`,
    MEMBER_EMAIL: (appId, email) => `/apps/${appId}/members/${email}`,
    RELEASE_BUILD: (appId, buildNumber) => `/apps/${appId}/releases/${buildNumber}`,
    DOWNLOAD: (appId, buildNumber) => `/apps/${appId}/releases/${buildNumber}/download`,
  },
  SUPPORT: {
    CONTACT: '/support/contact',
  },
  DEVICE_AUTH: {
    CHECK_URL: (token) => `/auth/device/check-url?token=${token}`,
    AUTHORIZE: '/auth/device/authorize',
  },
  SETTINGS: {
    PUBLIC: '/settings/public',
  },
};
