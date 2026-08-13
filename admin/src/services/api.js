import axios from 'axios';
import { ENDPOINTS } from './endpoints';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor: attach JWT token and language headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    const language = localStorage.getItem('admin_language') || 'en';
    config.headers['Accept-Language'] = language;

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: unwrap data and normalize errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'API request failed';
    return Promise.reject(new Error(message));
  }
);

export const authService = {
  adminLogin: (email, password) =>
    apiClient.post(ENDPOINTS.AUTH.ADMIN_LOGIN, { email, password }),

  logout: () =>
    apiClient.post(ENDPOINTS.AUTH.LOGOUT),
};

export const userService = {
  getAll: () => apiClient.get(ENDPOINTS.USERS.ALL),
  getById: (id) => apiClient.get(ENDPOINTS.USERS.BY_ID(id)),
  updateStatus: (id, isDeleted) => apiClient.patch(ENDPOINTS.USERS.UPDATE_STATUS(id), { isDeleted }),
};

export const appService = {
  getApps: () => apiClient.get(ENDPOINTS.APPS.BASE),
  getApp: (id) => apiClient.get(ENDPOINTS.APPS.BY_ID(id)),
  getReleases: (appId) => apiClient.get(ENDPOINTS.APPS.RELEASES(appId)),
  getMembers: (appId) => apiClient.get(ENDPOINTS.APPS.MEMBERS(appId)),
  removeMember: (appId, email) => apiClient.delete(ENDPOINTS.APPS.MEMBER_EMAIL(appId, email)),
  deleteRelease: (appId, buildNumber) =>
    apiClient.delete(ENDPOINTS.APPS.RELEASE_BUILD(appId, buildNumber)),
};

export const supportService = {
  getRequests: () => apiClient.get(ENDPOINTS.SUPPORT.REQUESTS),
  updateStatus: (id, status) => apiClient.patch(ENDPOINTS.SUPPORT.UPDATE_STATUS(id), { status }),
};

export const adminService = {
  getStats: () => apiClient.get(ENDPOINTS.ADMIN.STATS),
  getAllApps: () => apiClient.get(ENDPOINTS.ADMIN.APPS),
  getSystemHealth: () => apiClient.get(ENDPOINTS.ADMIN.HEALTH),
};

export const feedbackService = {
  getFeedbacks: () => apiClient.get(ENDPOINTS.FEEDBACK.ALL),
};

export default apiClient;
