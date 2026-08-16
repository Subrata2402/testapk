import React from 'react';
import Switch from '../common/Switch';

export default function RegistrationCard({ value, onChange, t }) {
  return (
    <div className="glass-card settings-row settings-row-card">
      <div>
        <h4 className="settings-card-title">{t('settings.allowRegistration') || 'Allow User Registration'}</h4>
        <p className="text-muted settings-desc">
          {t('settings.registrationDesc') || 'Enable or disable new user sign-ups on the platform.'}
        </p>
      </div>
      <Switch checked={value} onChange={onChange} />
    </div>
  );
}
