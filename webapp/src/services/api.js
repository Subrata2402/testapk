import axios from 'axios';
import { ENDPOINTS } from './endpoints';

export const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    const language = localStorage.getItem('language') || 'en';
    config.headers['Accept-Language'] = language;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'API request failed';
    return Promise.reject(new Error(message));
  }
);

export const authService = {
  loginWithGoogle: (idToken) => 
    apiClient.post(ENDPOINTS.AUTH.GOOGLE, { idToken }),
    
  logout: () => 
    apiClient.post(ENDPOINTS.AUTH.LOGOUT),
};

export const userService = {
  getCurrentUser: () => 
    apiClient.get(ENDPOINTS.USER.ME),
    
  configureDrive: (code) => 
    apiClient.post(ENDPOINTS.USER.CONFIGURE_DRIVE, { code }),
};

export const appService = {
  getApps: () => 
    apiClient.get(ENDPOINTS.APPS.BASE),
    
  createApp: (appData) => 
    apiClient.post(ENDPOINTS.APPS.BASE, appData),
    
  getReleases: (appId) => 
    apiClient.get(ENDPOINTS.APPS.RELEASES(appId)),
    
  getMembers: (appId) => 
    apiClient.get(ENDPOINTS.APPS.MEMBERS(appId)),
    
  inviteMember: (appId, email, role) => 
    apiClient.post(ENDPOINTS.APPS.MEMBERS(appId), { email, role }),
    
  removeMember: (appId, email) => 
    apiClient.delete(ENDPOINTS.APPS.MEMBER_EMAIL(appId, email)),
    
  deleteRelease: (appId, buildNumber) => 
    apiClient.delete(ENDPOINTS.APPS.RELEASE_BUILD(appId, buildNumber)),
    
  getDownloadBlob: async (appId, buildNumber) => {
    try {
      const blob = await apiClient.get(ENDPOINTS.APPS.DOWNLOAD(appId, buildNumber), {
        responseType: 'blob',
      });
      return {
        ok: true,
        blob: async () => blob,
      };
    } catch (error) {
      return {
        ok: false,
        json: async () => ({ message: error.message }),
      };
    }
  },
};

export const supportService = {
  contactSupport: (name, email, subject, message) => 
    apiClient.post(ENDPOINTS.SUPPORT.CONTACT, { name, email, subject, message }),
};

export const deviceAuthService = {
  checkUrl: (token) => 
    apiClient.get(ENDPOINTS.DEVICE_AUTH.CHECK_URL(token)),
    
  authorize: (userCode) => 
    apiClient.post(ENDPOINTS.DEVICE_AUTH.AUTHORIZE, { userCode }),
};
