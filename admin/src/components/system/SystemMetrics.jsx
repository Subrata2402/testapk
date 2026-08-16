import React from 'react';
import { Cpu, HardDrive, Clock, Database } from 'lucide-react';
import MetricCard from './MetricCard';

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

export default function SystemMetrics({ metrics, database, t }) {
  if (!metrics) return null;

  const dbStatus = database?.status || 'Disconnected';

  return (
    <div className="stats-grid health-metrics-grid">
      {/* CPU Card */}
      <MetricCard
        label={t('system.cpuUsage') || 'CPU Usage'}
        value={`${metrics.cpu.usage}%`}
        icon={Cpu}
        progress={metrics.cpu.usage}
        progressClass="health-progress-primary"
        description={`${metrics.cpu.model} (${metrics.cpu.cores} Cores)`}
        iconBgColor="var(--accent-primary-glow)"
        iconColor="var(--accent-primary)"
      />

      {/* Memory Card */}
      <MetricCard
        label={t('system.memoryUsage') || 'Memory Usage'}
        value={`${metrics.memory.usagePercentage}%`}
        icon={HardDrive}
        progress={metrics.memory.usagePercentage}
        progressClass="health-progress-secondary"
        description={`${formatBytes(metrics.memory.used)} / ${formatBytes(metrics.memory.total)}`}
        iconBgColor="var(--accent-secondary-glow)"
        iconColor="var(--accent-secondary)"
      />

      {/* Uptime Card */}
      <MetricCard
        label={t('system.uptime') || 'Uptime'}
        value={formatUptime(metrics.os.processUptime)}
        icon={Clock}
        description={`OS Uptime: ${formatUptime(metrics.os.uptime)}`}
        iconBgColor="var(--accent-success-glow)"
        iconColor="var(--accent-success)"
      />

      {/* Database Card */}
      <MetricCard
        label={t('system.database') || 'Database'}
        value={dbStatus === 'Connected' ? (t('system.connected') || 'Connected') : (t('system.disconnected') || 'Disconnected')}
        icon={Database}
        description={`Platform: ${metrics.os.platform} (${metrics.os.release})`}
        iconBgColor={dbStatus === 'Connected' ? 'var(--accent-success-glow)' : 'rgba(239, 68, 68, 0.1)'}
        iconColor={dbStatus === 'Connected' ? 'var(--accent-success)' : '#ef4444'}
      />
    </div>
  );
}
