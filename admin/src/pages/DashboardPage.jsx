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
  Mail,
  MessageSquare,
  Users,
  Smartphone,
  Activity,
  Settings
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

  const isAppsTab = location.pathname.includes('/dashboard/apps');
  const isSupportTab = location.pathname.includes('/dashboard/support');
  const isFeedbacksTab = location.pathname.includes('/dashboard/feedbacks');
  const isUsersTab = location.pathname.includes('/dashboard/users');
  const isSystemTab = location.pathname.includes('/dashboard/system');
  const isSettingsTab = location.pathname.includes('/dashboard/settings');

  const getHeaderTitle = () => {
    if (isAppsTab) return t('apps.title') || 'Applications';
    if (isSupportTab) return t('support.title');
    if (isFeedbacksTab) return t('feedback.title');
    if (isUsersTab) return t('users.title');
    if (isSystemTab) return t('system.title') || 'System Health';
    if (isSettingsTab) return t('settings.title') || 'Global Settings';
    return t('dashboard.title');
  };

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
            to="/dashboard/apps"
            className={({ isActive }) => `nav-item-btn ${isActive ? 'active' : ''}`}
          >
            <Smartphone size={18} />
            <span>{t('apps.title') || 'Applications'}</span>
          </NavLink>
          <NavLink
            to="/dashboard/support"
            className={({ isActive }) => `nav-item-btn ${isActive ? 'active' : ''}`}
          >
            <Mail size={18} />
            <span>{t('support.title')}</span>
          </NavLink>
          <NavLink
            to="/dashboard/feedbacks"
            className={({ isActive }) => `nav-item-btn ${isActive ? 'active' : ''}`}
          >
            <MessageSquare size={18} />
            <span>{t('feedback.title')}</span>
          </NavLink>
          <NavLink
            to="/dashboard/users"
            className={({ isActive }) => `nav-item-btn ${isActive ? 'active' : ''}`}
          >
            <Users size={18} />
            <span>{t('users.title')}</span>
          </NavLink>
          <NavLink
            to="/dashboard/system"
            className={({ isActive }) => `nav-item-btn ${isActive ? 'active' : ''}`}
          >
            <Activity size={18} />
            <span>{t('system.title') || 'System Health'}</span>
          </NavLink>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) => `nav-item-btn ${isActive ? 'active' : ''}`}
          >
            <Settings size={18} />
            <span>{t('settings.title') || 'Global Settings'}</span>
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
            <h1>{getHeaderTitle()}</h1>
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
