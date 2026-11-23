'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LanguageProvider, useTranslation } from '../context/LanguageContext';
import { AppProvider, useApp } from '../context/AppContext';
import Navbar from '../components/layout/Navbar';
import SEOManager from '../components/common/SEOManager';
import GoogleLoginModal from '../components/modals/GoogleLoginModal';
import CreateAppModal from '../components/modals/CreateAppModal';
import DriveConfigModal from '../components/modals/DriveConfigModal';
import ContactSupportModal from '../components/modals/ContactSupportModal';
import AlertModal from '../components/common/AlertModal';
import ConfirmModal from '../components/common/ConfirmModal';
import MaintenanceScreen from '../components/common/MaintenanceScreen';
import logoImg from '../assets/logo.png';

const clientId =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  process.env.GOOGLE_CLIENT_ID ||
  '';

function AppShell({ children }) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const {
    user,
    setUser,
    isAuthChecking,
    isMaintenanceMode,
    setIsMaintenanceMode,
    isLoadingApps,
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
    handleLoginSuccess,
    handleCreateApp,
    isLoggingOut,
  } = useApp();

  const logoImgSrc = typeof logoImg === 'object' && logoImg?.src ? logoImg.src : logoImg;

  if (isAuthChecking) {
    return (
      <div className="auth-loading-screen">
        <div className="splash-orbs">
          <div className="splash-orb orb-purple"></div>
          <div className="splash-orb orb-cyan"></div>
        </div>
        <div className="splash-content animate-fade-in">
          <div className="splash-logo-container">
            <img src={logoImgSrc} alt="TestAPK Logo" className="splash-logo" />
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
      <SEOManager />
      <Navbar user={user} onLoginClick={() => setIsLoginModalOpen(true)} />

      {/* Main Content */}
      <div className="container main-content-container">
        {children}
      </div>

      {/* Google Login Modal */}
      <GoogleLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Create App Modal */}
      <CreateAppModal
        isOpen={pathname === '/dashboard/create-app'}
        onClose={() => router.back()}
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
        <div className="modal-overlay flex-center logout-overlay">
          <div className="google-loading-state logout-state">
            <div className="spinner"></div>
            <p className="logout-title">{t('DASHBOARD.LOGGING_OUT')}</p>
            <span className="loading-subtext logout-subtext">{t('DASHBOARD.LOGGING_OUT_SUBTEXT')}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function Providers({ children }) {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LanguageProvider>
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </LanguageProvider>
    </GoogleOAuthProvider>
  );
}
