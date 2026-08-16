import React from 'react';
import { ShieldAlert } from 'lucide-react';
import Switch from '../common/Switch';

export default function MaintenanceModeCard({ value, onChange, t }) {
  return (
    <div className="glass-card settings-card">
      <div className="settings-row">
        <div>
          <h4 className="settings-title-container">
            {t('settings.maintenanceMode') || 'Maintenance Mode'}
            {value && (
              <span className="settings-badge-active">
                {t('settings.active') || 'Active'}
              </span>
            )}
          </h4>
          <p className="text-muted settings-desc">
            {t('settings.maintenanceDesc') || 'Temporarily disable access to the system for all non-admin users.'}
          </p>
        </div>
        <Switch checked={value} onChange={onChange} />
      </div>

      {value && (
        <div className="settings-warning-banner">
          <ShieldAlert size={20} className="settings-warning-icon" />
          <span className="settings-warning-text">
            {t('settings.maintenanceWarning') || 'Warning: Enabling maintenance mode will block all developers and testers from accessing the web and mobile applications.'}
          </span>
        </div>
      )}
    </div>
  );
}
