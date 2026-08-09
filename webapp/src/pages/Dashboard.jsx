import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import AppDetails from '../components/dashboard/AppDetails';
import AboutPage from './AboutPage';
import './Dashboard.css';
import { useTranslation } from '../context/LanguageContext';

export default function Dashboard({ user, apps, selectedAppId, onSelectApp, onCreateApp, onLogout, onOpenCreateModal, onOpenDriveModal, showAlert, showConfirm }) {
  const { t } = useTranslation();
  const selectedApp = apps.find(app => (app._id === selectedAppId || app.id === selectedAppId));

  return (
    <div className="dashboard-container animate-fade-in">
      {/* Sidebar */}
      <aside className="dashboard-sidebar glass-card">
        <div className="sidebar-header">
          <div className="logo-area">
            <Icons.Cpu size={24} className="logo-icon" />
            <span className="logo-text">APK Manager</span>
          </div>
          <button className="btn btn-primary flex-center gap-2" onClick={onOpenCreateModal}>
            <Icons.Plus size={16} />
            <span>{t('DASHBOARD.CREATE_APP')}</span>
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            {/* <span className="nav-section-title">Applications</span> */}
            <div className="apps-list mt-3">
              {apps.map((app) => {
                const isSelected = app._id === selectedAppId || app.id === selectedAppId;
                return (
                  <button
                    key={app._id || app.id}
                    className={`app-nav-item ${isSelected ? 'active' : ''}`}
                    onClick={() => onSelectApp(app._id || app.id)}
                  >
                    <div className="app-nav-icon-wrapper">
                      {app.icon && (app.icon.startsWith('data:') || app.icon.startsWith('http')) ? (
                        <img src={app.icon} alt={app.name} className="app-nav-icon-img" style={{ width: '18px', height: '18px', borderRadius: '4px', objectFit: 'cover' }} />
                      ) : (
                        <Icons.Smartphone size={18} />
                      )}
                    </div>
                    <div className="app-nav-info">
                      <span className="app-nav-name">{app.name}</span>
                      <span className="app-nav-package">{app.packageName}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="sidebar-footer">
          <div className="user-profile-widget">
            <div className="user-avatar">
              {user.avatar || (user.name ? user.name.substring(0, 2).toUpperCase() : 'US')}
            </div>
            <div className="user-info">
              <span className="user-name" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{user.name}</span>
                {user.isDriveConfigured ? (
                  <Icons.Cloud size={14} style={{ color: 'var(--accent-success)' }} title="Google Drive Connected" />
                ) : (
                  <Icons.CloudOff size={14} style={{ color: 'var(--accent-warning)' }} title="Google Drive Not Connected" />
                )}
              </span>
              <span className="user-email">{user.email}</span>
              <button 
                onClick={onOpenDriveModal}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-primary)',
                  fontSize: '0.75rem',
                  padding: 0,
                  textAlign: 'left',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  marginTop: '2px'
                }}
              >
                {user.isDriveConfigured ? t('DASHBOARD.RECONNECT_DRIVE') : t('DASHBOARD.CONNECT_DRIVE')}
              </button>
            </div>
            <button
              className="logout-btn"
              onClick={() => {
                showConfirm(
                  t('DASHBOARD.CONFIRM_LOGOUT'),
                  onLogout,
                  'Logout'
                );
              }}
              title="Logout"
            >
              <Icons.LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {selectedAppId === 'about' ? (
          <AboutPage showAlert={showAlert} />
        ) : selectedApp ? (
          <AppDetails
            app={selectedApp}
            user={user}
            onUpdateApp={(updatedApp) => onCreateApp(updatedApp, true)}
            showAlert={showAlert}
            showConfirm={showConfirm}
          />
        ) : (
          <div className="welcome-screen flex-center">
            <Icons.Cpu size={64} className="welcome-icon" />
            <h2>{t('DASHBOARD.WELCOME_TITLE')}</h2>
            <p className="text-secondary">{t('DASHBOARD.WELCOME_DESC')}</p>

            <div className="quick-access-section">
              {/* <h3>Quick Access</h3> */}
              <div className="quick-apps-grid">
                {apps.map((app) => {
                  return (
                    <button
                      key={app._id || app.id}
                      className="quick-app-card glass-card"
                      onClick={() => onSelectApp(app._id || app.id)}
                    >
                      {app.icon && (app.icon.startsWith('data:') || app.icon.startsWith('http')) ? (
                        <img src={app.icon} alt={app.name} className="quick-app-icon-img" style={{ width: '24px', height: '24px', borderRadius: '4px', objectFit: 'cover', marginBottom: '8px' }} />
                      ) : (
                        <Icons.Smartphone size={24} className="quick-app-icon" />
                      )}
                      <h4>{app.name}</h4>
                      <code>{app.packageName}</code>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
