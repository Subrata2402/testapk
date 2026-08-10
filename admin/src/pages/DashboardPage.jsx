import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation, languages } from '../context/LanguageContext';
import CustomDropdown from '../components/common/CustomDropdown';
import ConfirmModal from '../components/common/ConfirmModal';
import {
  LogOut,
  Shield,
  LayoutDashboard,
  Mail
} from 'lucide-react';
import './DashboardPage.css';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { t, language, changeLanguage } = useTranslation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();

  const dropdownOptions = languages.map(lang => ({
    value: lang.code,
    label: lang.name,
    flag: lang.flag
  }));

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  const isSupportTab = location.pathname.includes('/dashboard/support');

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar glass-card">
        <div className="sidebar-logo-section">
          <Shield className="sidebar-logo-icon" size={24} />
          <span className="sidebar-logo-text text-gradient-accent">TestAPK Admin</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => `nav-item-btn ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} />
            <span>{t('dashboard.title')}</span>
          </NavLink>
          <NavLink
            to="/dashboard/support"
            className={({ isActive }) => `nav-item-btn ${isActive ? 'active' : ''}`}
          >
            <Mail size={18} />
            <span>{t('support.title')}</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile-widget">
            <div className="user-avatar">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name || 'Admin'}</span>
              <span className="user-role">{user?.role || t('dashboard.role')}</span>
            </div>
          </div>
          <button onClick={() => setShowLogoutConfirm(true)} className="btn btn-danger logout-btn">
            <LogOut size={16} />
            <span>{t('dashboard.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main-content">
        {/* Top Header */}
        <header className="dashboard-header glass-card">
          <div className="header-title-section">
            <h1>{isSupportTab ? t('support.title') : t('dashboard.title')}</h1>
          </div>
          <div className="header-actions">
            <CustomDropdown
              options={dropdownOptions}
              value={language}
              onChange={changeLanguage}
            />
          </div>
        </header>

        {/* Nested Routes Content */}
        <Outlet />
      </main>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        config={showLogoutConfirm ? {
          title: t('dashboard.logoutConfirmTitle'),
          message: t('dashboard.logoutConfirmMessage'),
          onConfirm: handleLogoutConfirm,
          isLoading: isLoggingOut,
        } : null}
        onClose={() => !isLoggingOut && setShowLogoutConfirm(false)}
      />
    </div>
  );
}
