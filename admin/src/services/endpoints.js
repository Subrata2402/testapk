export const ENDPOINTS = {
  AUTH: {
    ADMIN_LOGIN: '/auth/admin-login',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    ALL: '/admin/users',
    BY_ID: (id) => `/users/${id}`,
    UPDATE_STATUS: (id) => `/admin/users/${id}/status`,
  },
  APPS: {
    BASE: '/apps',
    BY_ID: (id) => `/apps/${id}`,
    RELEASES: (appId) => `/apps/${appId}/releases`,
    MEMBERS: (appId) => `/apps/${appId}/members`,
    MEMBER_EMAIL: (appId, email) => `/apps/${appId}/members/${email}`,
    RELEASE_BUILD: (appId, buildNumber) => `/apps/${appId}/releases/${buildNumber}`,
  },
  SUPPORT: {
    REQUESTS: '/support/requests',
    UPDATE_STATUS: (id) => `/support/requests/${id}/status`,
  },
  ADMIN: {
    STATS: '/admin/stats',
    APPS: '/admin/apps',
  },
  FEEDBACK: {
    ALL: '/feedback',
  },
};
