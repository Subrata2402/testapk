import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { initialApps } from './mockData';
import GoogleLoginModal from './components/modals/GoogleLoginModal';
import CreateAppModal from './components/modals/CreateAppModal';
import DriveConfigModal from './components/modals/DriveConfigModal';
import ContactSupportModal from './components/modals/ContactSupportModal';
import Navbar from './components/layout/Navbar';
import AlertModal from './components/common/AlertModal';
import ConfirmModal from './components/common/ConfirmModal';
import MaintenanceScreen from './components/common/MaintenanceScreen';
import AppRoutes from './routes/AppRoutes';
import { authService, userService, appService, settingService } from './services/api';
import logoImg from './assets/logo.png';
import './App.css';
import { useTranslation } from './context/LanguageContext';

export default function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null); // { name, email, avatar }
  const [apps, setApps] = useState(initialApps);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);
  const [isLoadingApps, setIsLoadingApps] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const checkRunRef = React.useRef(false);

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

  React.useEffect(() => {
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
          
          if (window.location.pathname === '/device') {
            const urlParams = new URLSearchParams(window.location.search);
            if (!urlParams.has('token')) {
              navigate('/', { replace: true });
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
  }, []);

  React.useEffect(() => {
    const handleMaintenance = () => {
      if (user?.role !== 'admin') {
        setIsMaintenanceMode(true);
      }
    };
    window.addEventListener('maintenance-mode', handleMaintenance);
    return () => window.removeEventListener('maintenance-mode', handleMaintenance);
  }, [user]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLoginSuccess = async (userData) => {
    // Set loading state first to prevent landing page flicker
    setIsLoadingApps(true);

    // Check maintenance mode first
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

    // Set user and navigate immediately to prevent landing page flicker
    setUser(userData);
    navigate('/dashboard');

    const token = localStorage.getItem('token');
    if (token) {
      // Fetch apps (which will set isLoadingApps to false when done)
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
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await authService.logout();
      } catch (err) {
        console.error('Logout API call failed:', err);
      }
    }
    localStorage.removeItem('token');
    setUser(null);
    setApps(initialApps);
    setIsLoggingOut(false);
    navigate('/');
  };

  const [alertConfig, setAlertConfig] = useState(null); // { title, message, type: 'error' | 'success' | 'info' }
  const [confirmConfig, setConfirmConfig] = useState(null); // { title, message, onConfirm }

  const showAlert = (message, title = 'Notification', type = 'info') => {
    setAlertConfig({ title, message, type });
  };

  const showConfirm = (message, onConfirm, title = 'Are you sure?') => {
    setConfirmConfig({ title, message, onConfirm });
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
          navigate(`/dashboard/apps/${createdApp._id}`);
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

  if (isAuthChecking) {
    return (
      <div className="auth-loading-screen">
        <div className="splash-orbs">
          <div className="splash-orb orb-purple"></div>
          <div className="splash-orb orb-cyan"></div>
        </div>
        <div className="splash-content animate-fade-in">
          <div className="splash-logo-container">
            <img src={logoImg} alt="TestAPK Logo" className="splash-logo" />
          </div>
          <h1 className="splash-title">TestAPK</h1>
          <p className="splash-subtitle">{t('LANDING.HERO_SUBTITLE') || 'Self-Hosted App Distribution Platform'}</p>
          <div className="splash-loader">
            <div className="splash-loader-bar"></div>
          </div>
          <p className="splash-loading-text">{t('DASHBOARD.LOADING_WORKSPACE')}</p>
        </div>
      </div>
    );
  }

  if (isMaintenanceMode) {
    return <MaintenanceScreen onMaintenanceEnd={() => setIsMaintenanceMode(false)} />;
  }

  if (isLoadingApps) {
    return (
      <div className="auth-loading-screen-simple">
        <div className="spinner"></div>
        <p>{t('DASHBOARD.LOADING_WORKSPACE')}</p>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Navbar user={user} onLoginClick={() => setIsLoginModalOpen(true)} />

      {/* Main Content */}
      <div className="container main-content-container">
        <AppRoutes
          user={user}
          apps={apps}
          handleCreateApp={handleCreateApp}
          handleLogout={handleLogout}
          setIsLoginModalOpen={setIsLoginModalOpen}
          onOpenDriveModal={() => setIsDriveModalOpen(true)}
          showAlert={showAlert}
          showConfirm={showConfirm}
          setUser={setUser}
          onContactClick={() => setIsContactModalOpen(true)}
          downloadLink={downloadLink}
        />
      </div>

      {/* Google Login Modal */}
      <GoogleLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Create App Modal */}
      <CreateAppModal
        isOpen={location.pathname === '/dashboard/create-app'}
        onClose={() => navigate('/dashboard')}
        onCreateApp={handleCreateApp}
        user={user}
        showAlert={showAlert}
        onOpenDriveModal={() => setIsDriveModalOpen(true)}
      />

      {/* Drive Configuration Modal */}
      <DriveConfigModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
        user={user}
        showAlert={showAlert}
        onDriveConfigured={() => setUser(prev => ({ ...prev, isDriveConfigured: true }))}
      />

      {/* Contact Support Modal */}
      <ContactSupportModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        user={user}
      />

      <AlertModal config={alertConfig} onClose={() => setAlertConfig(null)} />
      <ConfirmModal config={confirmConfig} onClose={() => setConfirmConfig(null)} />

      {isLoggingOut && (
        <div className="modal-overlay flex-center" style={{ zIndex: 9999, background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(10px)' }}>
          <div className="google-loading-state" style={{ color: '#ffffff' }}>
            <div className="spinner"></div>
            <p style={{ marginTop: '16px', fontSize: '1.1rem', fontWeight: '500' }}>{t('DASHBOARD.LOGGING_OUT')}</p>
            <span className="loading-subtext" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{t('DASHBOARD.LOGGING_OUT_SUBTEXT')}</span>
          </div>
        </div>
      )}
    </div>
  );
}
