import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Activity, RefreshCw, Trash2 } from 'lucide-react';
import { adminService } from '../services/api';
import ConfirmModal from '../components/common/ConfirmModal';
import SystemMetrics from '../components/system/SystemMetrics';
import LogsViewer from '../components/system/LogsViewer';
import './SystemHealthPage.css';

export default function SystemHealthPage() {
  const { t } = useTranslation();
  const [healthData, setHealthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const fetchHealthData = async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    try {
      const response = await adminService.getSystemHealth();
      if (response.status === 'success') {
        setHealthData(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch system health:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearLogs = async () => {
    setIsClearing(true);
    try {
      await adminService.clearLogs();
      await fetchHealthData(false);
      setShowClearConfirm(false);
    } catch (err) {
      console.error('Failed to clear logs:', err);
    } finally {
      setIsClearing(false);
    }
  };

  useEffect(() => {
    fetchHealthData(true);
  }, []);

  // Auto refresh effect
  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        fetchHealthData(false);
      }, 5000); // refresh every 5 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  if (isLoading && !healthData) {
    return (
      <div className="support-section glass-card skeleton-shimmer">
        <div className="skeleton-title health-skeleton-title"></div>
        <div className="stats-grid health-metrics-grid">
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="stat-card glass-card skeleton-shimmer health-skeleton-card"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="support-section glass-card animate-fade-in health-container">
      <div className="section-header support-header">
        <div className="header-left">
          <Activity size={20} className="section-icon" />
          <h3>{t('system.title') || 'System Health'}</h3>
        </div>
        <div className="health-header-right">
          <label className="health-refresh-label">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="health-refresh-checkbox"
            />
            <span>{t('system.autoRefresh') || 'Auto Refresh (5s)'}</span>
          </label>
          <button
            onClick={() => fetchHealthData(false)}
            disabled={isLoading}
            className="btn btn-secondary btn-icon-only"
            title="Refresh"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <SystemMetrics
        metrics={healthData?.metrics}
        database={healthData?.database}
        t={t}
      />

      {/* Logs Viewer Section */}
      <LogsViewer
        logs={healthData?.logs}
        onClearLogs={() => setShowClearConfirm(true)}
        t={t}
      />

      <ConfirmModal
        config={showClearConfirm ? {
          title: t('system.clearLogsConfirmTitle') || 'Clear Logs',
          message: t('system.clearLogsConfirmMessage') || 'Are you sure you want to clear all system logs? This action cannot be undone.',
          onConfirm: handleClearLogs,
          isLoading: isClearing,
          confirmText: t('system.clearLogsConfirmTitle') || 'Clear Logs',
          confirmLoadingText: t('system.clearingLogs') || 'Clearing...',
          cancelText: t('common.cancel') || 'Cancel',
          icon: Trash2,
        } : null}
        onClose={() => !isClearing && setShowClearConfirm(false)}
      />
    </div>
  );
}
