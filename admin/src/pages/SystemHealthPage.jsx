import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Activity, Cpu, HardDrive, Clock, Database, Terminal, RefreshCw, Search, AlertTriangle } from 'lucide-react';
import { adminService } from '../services/api';
import './SystemHealthPage.css';

export default function SystemHealthPage() {
  const { t } = useTranslation();
  const [healthData, setHealthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [logType, setLogType] = useState('all'); // 'all' or 'error'
  const [searchQuery, setSearchQuery] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const terminalEndRef = useRef(null);

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

  // Scroll to bottom of terminal when logs change
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [healthData, logType]);

  const formatBytes = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatUptime = (seconds) => {
    if (!seconds) return '0s';
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const parts = [];
    if (d > 0) parts.push(`${d}d`);
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0) parts.push(`${s}s`);
    return parts.join(' ') || '0s';
  };

  const getLogLines = () => {
    if (!healthData?.logs) return [];
    const rawLogs = logType === 'error' ? healthData.logs.error : healthData.logs.all;
    
    // Filter by search query
    if (!searchQuery) return rawLogs;
    return rawLogs.filter(line => line.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const renderLogLine = (line, idx) => {
    // Strip ANSI color codes if any
    const cleanLine = line.replace(/\u001b\[\d+m/g, '');
    
    let color = '#ffffff';
    if (cleanLine.includes('[error]') || cleanLine.includes('[ERROR]')) {
      color = '#ff4d4f';
    } else if (cleanLine.includes('[warn]') || cleanLine.includes('[WARN]')) {
      color = '#faad14';
    } else if (cleanLine.includes('[info]') || cleanLine.includes('[INFO]')) {
      color = '#52c41a';
    } else if (cleanLine.includes('[debug]') || cleanLine.includes('[DEBUG]')) {
      color = '#1890ff';
    }

    return (
      <div key={idx} style={{ color }} className="font-monospace text-sm mb-1">
        {cleanLine}
      </div>
    );
  };

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

  const metrics = healthData?.metrics;
  const dbStatus = healthData?.database?.status || 'Disconnected';

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
      {metrics && (
        <div className="stats-grid health-metrics-grid">
          {/* CPU Card */}
          <div className="stat-card glass-card">
            <div className="stat-card-header">
              <span className="stat-label">{t('system.cpuUsage') || 'CPU Usage'}</span>
              <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--accent-primary-glow)', color: 'var(--accent-primary)' }}>
                <Cpu size={20} />
              </div>
            </div>
            <span className="stat-value">{metrics.cpu.usage}%</span>
            <div className="progress-bar-container health-progress-container">
              <div className="health-progress-bar health-progress-primary" style={{ width: `${metrics.cpu.usage}%` }}></div>
            </div>
            <span className="text-muted health-card-desc">
              {metrics.cpu.model} ({metrics.cpu.cores} Cores)
            </span>
          </div>

          {/* Memory Card */}
          <div className="stat-card glass-card">
            <div className="stat-card-header">
              <span className="stat-label">{t('system.memoryUsage') || 'Memory Usage'}</span>
              <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--accent-secondary-glow)', color: 'var(--accent-secondary)' }}>
                <HardDrive size={20} />
              </div>
            </div>
            <span className="stat-value">{metrics.memory.usagePercentage}%</span>
            <div className="progress-bar-container health-progress-container">
              <div className="health-progress-bar health-progress-secondary" style={{ width: `${metrics.memory.usagePercentage}%` }}></div>
            </div>
            <span className="text-muted health-card-desc">
              {formatBytes(metrics.memory.used)} / {formatBytes(metrics.memory.total)}
            </span>
          </div>

          {/* Uptime Card */}
          <div className="stat-card glass-card">
            <div className="stat-card-header">
              <span className="stat-label">{t('system.uptime') || 'Uptime'}</span>
              <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--accent-success-glow)', color: 'var(--accent-success)' }}>
                <Clock size={20} />
              </div>
            </div>
            <span className="stat-value health-value-small">{formatUptime(metrics.os.processUptime)}</span>
            <span className="text-muted health-card-desc-large">
              OS Uptime: {formatUptime(metrics.os.uptime)}
            </span>
          </div>

          {/* Database Card */}
          <div className="stat-card glass-card">
            <div className="stat-card-header">
              <span className="stat-label">{t('system.database') || 'Database'}</span>
              <div className="stat-icon-wrapper" style={{ backgroundColor: dbStatus === 'Connected' ? 'var(--accent-success-glow)' : 'rgba(239, 68, 68, 0.1)', color: dbStatus === 'Connected' ? 'var(--accent-success)' : '#ef4444' }}>
                <Database size={20} />
              </div>
            </div>
            <span className={dbStatus === 'Connected' ? 'health-db-connected' : 'health-db-disconnected'}>
              {dbStatus === 'Connected' ? (t('system.connected') || 'Connected') : (t('system.disconnected') || 'Disconnected')}
            </span>
            <span className="text-muted health-card-desc-large">
              Platform: {metrics.os.platform} ({metrics.os.release})
            </span>
          </div>
        </div>
      )}

      {/* Logs Viewer Section */}
      <div className="glass-card health-logs-card">
        <div className="health-logs-header">
          <div className="health-logs-title-group">
            <Terminal size={18} className="text-muted" />
            <h4>{t('system.logsViewer') || 'Logs Viewer'}</h4>
            <div className="health-logs-tabs">
              <button
                onClick={() => setLogType('all')}
                className={`health-logs-tab-btn ${logType === 'all' ? 'health-logs-tab-btn-all' : 'health-logs-tab-btn-inactive'}`}
              >
                {t('system.allLogs') || 'All Logs'}
              </button>
              <button
                onClick={() => setLogType('error')}
                className={`health-logs-tab-btn ${logType === 'error' ? 'health-logs-tab-btn-error' : 'health-logs-tab-btn-inactive'}`}
              >
                {t('system.errorLogs') || 'Error Logs'}
              </button>
            </div>
          </div>

          <div className="search-input-wrapper health-logs-search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={t('system.searchLogs') || 'Filter logs...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-input search-input"
            />
          </div>
        </div>

        {/* Terminal Box */}
        <div className="health-terminal-box">
          {getLogLines().length > 0 ? (
            <>
              {getLogLines().map((line, idx) => renderLogLine(line, idx))}
              <div ref={terminalEndRef} />
            </>
          ) : (
            <div className="health-terminal-empty">
              <AlertTriangle size={32} className="health-terminal-empty-icon" />
              <span>{t('system.noLogs') || 'No matching log entries found'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
