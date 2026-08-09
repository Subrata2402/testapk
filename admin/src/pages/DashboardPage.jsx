import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation, languages } from '../context/LanguageContext';
import CustomDropdown from '../components/common/CustomDropdown';
import ConfirmModal from '../components/common/ConfirmModal';
import { LogOut, Shield, LayoutDashboard, Smartphone, Download, Users, Activity, Clock } from 'lucide-react';
import './DashboardPage.css';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { t, language, changeLanguage } = useTranslation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  // Placeholder metrics
  const stats = [
    {
      label: t('dashboard.stats.totalApps'),
      value: '12',
      icon: Smartphone,
      color: 'var(--accent-primary)',
      glow: 'var(--accent-primary-glow)'
    },
    {
      label: t('dashboard.stats.totalDownloads'),
      value: '1,248',
      icon: Download,
      color: 'var(--accent-secondary)',
      glow: 'var(--accent-secondary-glow)'
    },
    {
      label: t('dashboard.stats.activeUsers'),
      value: '342',
      icon: Users,
      color: 'var(--accent-success)',
      glow: 'var(--accent-success-glow)'
    }
  ];

  // Placeholder activities
  const activities = [
    { id: 1, action: "App 'TestAPK Mobile' updated to v2.1.0", time: "10 mins ago", user: "admin" },
    { id: 2, action: "New release 'Beta-v0.9' published for 'DemoApp'", time: "2 hours ago", user: "admin" },
    { id: 3, action: "User 'john_doe' registered", time: "5 hours ago", user: "system" },
    { id: 4, action: "App 'OldTestApp' deleted", time: "1 day ago", user: "admin" }
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar glass-card">
        <div className="sidebar-logo-section">
          <Shield className="sidebar-logo-icon" size={24} />
          <span className="sidebar-logo-text text-gradient-accent">TestAPK Admin</span>
        </div>

        <nav className="sidebar-nav">
          <a href="#dashboard" className="nav-item active">
            <LayoutDashboard size={18} />
            <span>{t('dashboard.title')}</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile-widget">
            <div className="user-avatar">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name || 'Admin'}</span>
              <span className="user-role">{user?.role || 'Administrator'}</span>
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
            <h1>{t('dashboard.title')}</h1>
          </div>
          <div className="header-actions">
            <CustomDropdown
              options={dropdownOptions}
              value={language}
              onChange={changeLanguage}
            />
          </div>
        </header>

        {/* Welcome Banner */}
        <div className="welcome-banner glass-card animate-fade-in">
          <h2>{t('dashboard.welcome', [user?.name || 'Admin'])}</h2>
          <p>You have full access to manage applications, releases, and system settings.</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="stat-card glass-card animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="stat-card-header">
                  <span className="stat-label">{stat.label}</span>
                  <div className="stat-icon-wrapper" style={{ backgroundColor: stat.glow, color: stat.color }}>
                    <Icon size={20} />
                  </div>
                </div>
                <span className="stat-value">{stat.value}</span>
              </div>
            );
          })}
        </div>

        {/* Recent Activity Section */}
        <section className="activity-section glass-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="section-header">
            <Activity size={20} className="section-icon" />
            <h3>{t('dashboard.recentActivity')}</h3>
          </div>

          <div className="activity-list">
            {activities.length > 0 ? (
              activities.map((act) => (
                <div key={act.id} className="activity-item">
                  <div className="activity-icon-wrapper">
                    <Clock size={14} />
                  </div>
                  <div className="activity-details">
                    <p className="activity-action">{act.action}</p>
                    <span className="activity-time">{act.time} • by {act.user}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-activity">{t('dashboard.noActivity')}</p>
            )}
          </div>
        </section>
      </main>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        config={showLogoutConfirm ? {
          title: 'Sign Out',
          message: 'Are you sure you want to sign out of the admin portal?',
          onConfirm: handleLogoutConfirm,
          isLoading: isLoggingOut,
        } : null}
        onClose={() => !isLoggingOut && setShowLogoutConfirm(false)}
      />
    </div>
  );
}
