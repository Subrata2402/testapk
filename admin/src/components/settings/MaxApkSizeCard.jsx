import React from 'react';

export default function MaxApkSizeCard({ value, onChange, t }) {
  return (
    <div className="glass-card settings-card">
      <div>
        <h4 className="settings-card-title">{t('settings.maxApkSize') || 'Maximum APK Upload Size'}</h4>
        <p className="text-muted settings-desc">
          {t('settings.maxApkDesc') || 'Limit the maximum file size for uploaded APK releases.'}
        </p>
      </div>
      <div className="settings-input-container">
        <input
          type="tel"
          min="1"
          max="2048"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 100)}
          className="filter-input settings-number-input"
        />
        <span className="settings-unit">MB</span>
      </div>
    </div>
  );
}
