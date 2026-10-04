'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { initialApps } from '../mockData';
import { authService, userService, appService, settingService } from '../services/api';
import { useTranslation } from './LanguageContext';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null); // { name, email, avatar, picture, role, isDriveConfigured }
  const [apps, setApps] = useState(initialApps);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);
  const [isLoadingApps, setIsLoadingApps] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [alertConfig, setAlertConfig] = useState(null);
  const [confirmConfig, setConfirmConfig] = useState(null);

  const checkRunRef = useRef(false);

  const showAlert = (message, title = 'Notification', type = 'info') => {
    setAlertConfig({ title, message, type });
  };

  const showConfirm = (message, onConfirm, title = 'Are you sure?') => {
    setConfirmConfig({ title, message, onConfirm });
  };

  const fetchApps = async () => {
    setIsLoadingApps(true);
    try {
      const data = await appService.getApps();
      if (data.status === 'success') {
        setApps(data.data.apps);
      }
    } catch (err) {
      console.error('Failed to fetch apps:', err);
    } finally {
      setIsLoadingApps(false);
    }
  };

  useEffect(() => {
    if (checkRunRef.current) return;
    checkRunRef.current = true;

    const checkMaintenanceAndLogin = async () => {
      let maintenanceActive = false;
      try {
        const settingsRes = await settingService.getPublicSettings();
        if (settingsRes.status === 'success') {
          maintenanceActive = settingsRes.data.settings?.maintenance_mode ?? false;
          const link = settingsRes.data.settings?.latest_version_download_link;
          if (link) {
            setDownloadLink(link);
          }
        }
      } catch (err) {
        console.error('Failed to fetch public settings:', err);
      }

      if (typeof window === 'undefined') {
        setIsAuthChecking(false);
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        if (maintenanceActive) {
          setIsMaintenanceMode(true);
        }
        setIsAuthChecking(false);
        return;
      }

      try {
        const data = await userService.getCurrentUser();

        if (data.status === 'success') {
          const loggedInUser = {
            name: data.data.user.name,
            email: data.data.user.email,
            avatar: data.data.user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
            picture: data.data.user.picture,
            role: data.data.user.role,
            isDriveConfigured: data.data.user.isDriveConfigured,
          };
          setUser(loggedInUser);

          if (maintenanceActive && loggedInUser.role !== 'admin') {
            setIsMaintenanceMode(true);
            return;
          }

          await fetchApps();

          if (typeof window !== 'undefined' && window.location.pathname === '/device') {
            const urlParams = new URLSearchParams(window.location.search);
            if (!urlParams.has('token')) {
              router.replace('/');
            }
          }
        } else {
          localStorage.removeItem('token');
          if (maintenanceActive) {
            setIsMaintenanceMode(true);
          }
        }
      } catch (err) {
        console.error('Auto-login failed:', err);
        localStorage.removeItem('token');
        if (maintenanceActive) {
          setIsMaintenanceMode(true);
        }
      } finally {
        setIsAuthChecking(false);
      }
    };

    checkMaintenanceAndLogin();
  }, [router]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMaintenance = () => {
      if (user?.role !== 'admin') {
        setIsMaintenanceMode(true);
      }
    };
    window.addEventListener('maintenance-mode', handleMaintenance);
    return () => window.removeEventListener('maintenance-mode', handleMaintenance);
  }, [user]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const handleLoginSuccess = async (userData) => {
    setIsLoadingApps(true);

    let maintenanceActive = false;
    try {
      const settingsRes = await settingService.getPublicSettings();
      if (settingsRes.status === 'success') {
        maintenanceActive = settingsRes.data.settings?.maintenance_mode ?? false;
        const link = settingsRes.data.settings?.latest_version_download_link;
        if (link) {
          setDownloadLink(link);
        }
      }
    } catch (err) {
      console.error('Failed to fetch public settings:', err);
    }

    if (maintenanceActive && userData.role !== 'admin') {
      setIsMaintenanceMode(true);
      setIsLoadingApps(false);
      return;
    }

    setUser(userData);
    router.push('/dashboard');

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        fetchApps();
        try {
          const data = await userService.getCurrentUser();
          if (data.status === 'success') {
            setUser({
              name: data.data.user.name,
              email: data.data.user.email,
              avatar: data.data.user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
              picture: data.data.user.picture,
              role: data.data.user.role,
              isDriveConfigured: data.data.user.isDriveConfigured,
            });
          }
        } catch (err) {
          console.error('Failed to fetch user details after login:', err);
        }
      } else {
        setIsLoadingApps(false);
      }
    } else {
      setIsLoadingApps(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await authService.logout();
        } catch (err) {
          console.error('Logout API call failed:', err);
        }
      }
      localStorage.removeItem('token');
    }
    setUser(null);
    setApps(initialApps);
    setIsLoggingOut(false);
    router.push('/');
  };

  const handleCreateApp = async (newAppOrUpdatedApp, isUpdate = false) => {
    if (isUpdate) {
      setApps(apps.map(a => {
        const isMatch = newAppOrUpdatedApp._id
          ? a._id === newAppOrUpdatedApp._id
          : (newAppOrUpdatedApp.id && a.id === newAppOrUpdatedApp.id);
        return isMatch ? newAppOrUpdatedApp : a;
      }));
      return true;
    } else {
      if (typeof window === 'undefined') return false;
      const token = localStorage.getItem('token');
      if (!token) return false;

      try {
        const data = await appService.createApp({
          name: newAppOrUpdatedApp.name,
          packageName: newAppOrUpdatedApp.packageName,
          description: newAppOrUpdatedApp.description,
        });
        if (data.status === 'success') {
          const createdApp = data.data.app;
          setApps([...apps, createdApp]);
          router.push(`/dashboard/apps/${createdApp._id}`);
          return true;
        } else {
          showAlert(data.message || t('DASHBOARD.CREATE_APP_FAILED'), 'Error', 'error');
          return false;
        }
      } catch (err) {
        console.error('Failed to create app:', err);
        showAlert(t('DASHBOARD.CREATE_APP_FAILED'), 'Error', 'error');
        return false;
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        apps,
        setApps,
        fetchApps,
        isLoadingApps,
        isAuthChecking,
        isMaintenanceMode,
        setIsMaintenanceMode,
        downloadLink,
        isLoggingOut,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isDriveModalOpen,
        setIsDriveModalOpen,
        isContactModalOpen,
        setIsContactModalOpen,
        alertConfig,
        setAlertConfig,
        confirmConfig,
        setConfirmConfig,
        showAlert,
        showConfirm,
        handleLoginSuccess,
        handleLogout,
        handleCreateApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
