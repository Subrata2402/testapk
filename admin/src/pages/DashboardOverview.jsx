import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';
import { Smartphone, Mail, Users, Activity, Clock, MessageSquare } from 'lucide-react';
import { adminService } from '../services/api';
import TrendChart from '../components/analytics/TrendChart';
import BarChart from '../components/analytics/BarChart';
import DoughnutChart from '../components/analytics/DoughnutChart';

export default function DashboardOverview() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [statsData, setStatsData] = useState({ totalApps: 0, newSupportRequests: 0, totalActiveUsers: 0, totalFeedbacks: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminService.getStats();
        if (response.status === 'success') {
          setStatsData(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <>
        {/* Welcome Banner Skeleton */}
        <div className="welcome-banner glass-card skeleton-shimmer">
          <div className="skeleton-title"></div>
          <div className="skeleton-subtitle"></div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="stats-grid">
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="stat-card glass-card skeleton-shimmer">
              <div className="stat-card-header">
                <div className="skeleton-label"></div>
                <div className="skeleton-icon"></div>
              </div>
              <div className="skeleton-value"></div>
            </div>
          ))}
        </div>

        {/* Analytics Charts Grid Skeleton */}
        <div className="analytics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '24px' }}>
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="analytics-chart-card glass-card skeleton-shimmer" style={{ height: '280px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="skeleton-title" style={{ width: '60%', marginBottom: '24px' }}></div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '0 16px 16px' }}>
                {[1, 2, 3, 4, 5].map((_, barIdx) => (
                  <div
                    key={barIdx}
                    style={{
                      flex: 1,
                      height: `${30 + (barIdx * 15) % 60}%`,
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '4px'
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Skeleton */}
        <section className="activity-section glass-card skeleton-shimmer" style={{ marginTop: '24px' }}>
          <div className="section-header">
            <div className="skeleton-icon" style={{ width: '20px', height: '20px' }}></div>
            <div className="skeleton-title-small"></div>
          </div>
          <div className="activity-list">
            {[1, 2, 3, 4].map((_, idx) => (
              <div key={idx} className="activity-item" style={{ gap: '16px', display: 'flex', alignItems: 'flex-start' }}>
                <div className="skeleton-activity-icon"></div>
                <div className="activity-details" style={{ flex: 1 }}>
                  <div className="skeleton-text-long"></div>
                  <div className="skeleton-text-short"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  // Dynamic metrics
  const stats = [
    {
      label: t('dashboard.stats.totalApps'),
      value: statsData.totalApps,
      icon: Smartphone,
      color: 'var(--accent-primary)',
      glow: 'var(--accent-primary-glow)'
    },
    {
      label: t('support.pendingRequests'),
      value: statsData.newSupportRequests,
      icon: Mail,
      color: 'var(--accent-secondary)',
      glow: 'var(--accent-secondary-glow)'
    },
    {
      label: t('dashboard.stats.activeUsers'),
      value: statsData.totalActiveUsers,
      icon: Users,
      color: 'var(--accent-success)',
      glow: 'var(--accent-success-glow)'
    },
    {
      label: t('dashboard.stats.totalFeedbacks'),
      value: statsData.totalFeedbacks || 0,
      icon: MessageSquare,
      color: '#ff9f43',
      glow: 'rgba(255, 159, 67, 0.15)'
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
    <>
      {/* Welcome Banner */}
      <div className="welcome-banner glass-card animate-fade-in">
        <h2>{t('dashboard.welcome', [user?.name || 'Admin'])}</h2>
        <p>{t('dashboard.welcomeSubtitle')}</p>
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

      {/* Analytics Charts Grid */}
      {statsData.analytics && (
        <div className="analytics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '24px' }}>
          <TrendChart data={statsData.analytics.userTrend || []} />
          <BarChart data={statsData.analytics.ratingDistribution || []} />
          <DoughnutChart data={statsData.analytics.supportDistribution || []} />
        </div>
      )}

      {/* Recent Activity Section */}
      <section className="activity-section glass-card animate-fade-in" style={{ animationDelay: '0.3s', marginTop: '24px' }}>
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
    </>
  );
}
