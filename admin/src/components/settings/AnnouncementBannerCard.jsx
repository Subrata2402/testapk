import React from 'react';

export default function AnnouncementBannerCard({ value, onChange, t }) {
  return (
    <div className="glass-card settings-card">
      <div>
        <h4 className="settings-card-title">{t('settings.announcementBanner') || 'System Announcement Banner'}</h4>
        <p className="text-muted settings-desc">
          {t('settings.announcementDesc') || 'Display a global notification banner at the top of the application for all users.'}
        </p>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="filter-input settings-textarea"
        placeholder={t('settings.announcementPlaceholder') || 'Enter announcement message (leave empty to disable)...'}
        rows={3}
      />
    </div>
  );
}
