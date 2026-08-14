import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Settings, Save, AlertTriangle, ShieldAlert, CheckCircle } from 'lucide-react';
import { adminService } from '../services/api';
import Switch from '../components/common/Switch';
import './SettingsPage.css';

export default function SettingsPage() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({
    maintenance_mode: false,
    allow_registration: true,
    max_apk_size: 100, // stored in MB on frontend
    announcement_banner: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' or 'error'

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await adminService.getSettings();
        if (response.status === 'success') {
          const data = response.data.settings;
          setSettings({
            maintenance_mode: data.maintenance_mode?.value ?? false,
            allow_registration: data.allow_registration?.value ?? true,
            max_apk_size: Math.round((data.max_apk_size?.value ?? 104857600) / (1024 * 1024)),
            announcement_banner: data.announcement_banner?.value ?? '',
          });
        }
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const payload = {
        maintenance_mode: settings.maintenance_mode,
        allow_registration: settings.allow_registration,
        max_apk_size: settings.max_apk_size * 1024 * 1024, // convert to bytes
        announcement_banner: settings.announcement_banner,
      };

      const response = await adminService.updateSettings(payload);
      if (response.status === 'success') {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      console.error('Failed to update settings:', err);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="support-section glass-card skeleton-shimmer">
        <div className="skeleton-title settings-skeleton-title"></div>
        <div className="settings-skeleton-body">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="skeleton-text-long settings-skeleton-row"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="support-section glass-card animate-fade-in settings-container">
      <form onSubmit={handleSave} className="settings-form">
        <div className="section-header support-header">
          <div className="header-left">
            <Settings size={20} className="section-icon" />
            <h3>{t('settings.title') || 'Global Settings'}</h3>
          </div>
          <div className="settings-header-actions">
            {saveStatus === 'success' && (
              <div className="settings-status-success">
                <CheckCircle size={18} />
                <span>{t('settings.saveSuccess') || 'Settings saved successfully!'}</span>
              </div>
            )}

            {saveStatus === 'error' && (
              <div className="settings-status-error">
                <AlertTriangle size={18} />
                <span>{t('settings.saveError') || 'Failed to save settings.'}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="btn btn-primary settings-save-btn"
            >
              <Save size={16} />
              <span>{isSaving ? (t('common.saving') || 'Saving...') : (t('common.save') || 'Save Settings')}</span>
            </button>
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="glass-card settings-card">
          <div className="settings-row">
            <div>
              <h4 className="settings-title-container">
                {t('settings.maintenanceMode') || 'Maintenance Mode'}
                {settings.maintenance_mode && (
                  <span className="settings-badge-active">
                    {t('settings.active') || 'Active'}
                  </span>
                )}
              </h4>
              <p className="text-muted settings-desc">
                {t('settings.maintenanceDesc') || 'Temporarily disable access to the system for all non-admin users.'}
              </p>
            </div>
            <Switch
              checked={settings.maintenance_mode}
              onChange={(checked) => setSettings({ ...settings, maintenance_mode: checked })}
            />
          </div>

          {settings.maintenance_mode && (
            <div className="settings-warning-banner">
              <ShieldAlert size={20} className="settings-warning-icon" />
              <span className="settings-warning-text">
                {t('settings.maintenanceWarning') || 'Warning: Enabling maintenance mode will block all developers and testers from accessing the web and mobile applications.'}
              </span>
            </div>
          )}
        </div>

        {/* User Registration */}
        <div className="glass-card settings-row" style={{ padding: '20px' }}>
          <div>
            <h4 style={{ margin: '0 0 4px 0' }}>{t('settings.allowRegistration') || 'Allow User Registration'}</h4>
            <p className="text-muted settings-desc">
              {t('settings.registrationDesc') || 'Enable or disable new user sign-ups on the platform.'}
            </p>
          </div>
          <Switch
            checked={settings.allow_registration}
            onChange={(checked) => setSettings({ ...settings, allow_registration: checked })}
          />
        </div>

        {/* Max APK Upload Size */}
        <div className="glass-card settings-card">
          <div>
            <h4 style={{ margin: '0 0 4px 0' }}>{t('settings.maxApkSize') || 'Maximum APK Upload Size'}</h4>
            <p className="text-muted settings-desc">
              {t('settings.maxApkDesc') || 'Limit the maximum file size for uploaded APK releases.'}
            </p>
          </div>
          <div className="settings-input-container">
            <input
              type="number"
              min="1"
              max="2048"
              value={settings.max_apk_size}
              onChange={(e) => setSettings({ ...settings, max_apk_size: parseInt(e.target.value) || 100 })}
              className="filter-input settings-number-input"
            />
            <span className="settings-unit">MB</span>
          </div>
        </div>

        {/* Announcement Banner */}
        <div className="glass-card settings-card">
          <div>
            <h4 style={{ margin: '0 0 4px 0' }}>{t('settings.announcementBanner') || 'System Announcement Banner'}</h4>
            <p className="text-muted settings-desc">
              {t('settings.announcementDesc') || 'Display a global notification banner at the top of the application for all users.'}
            </p>
          </div>
          <textarea
            value={settings.announcement_banner}
            onChange={(e) => setSettings({ ...settings, announcement_banner: e.target.value })}
            className="filter-input settings-textarea"
            placeholder={t('settings.announcementPlaceholder') || 'Enter announcement message (leave empty to disable)...'}
            rows={3}
          />
        </div>
      </form>
    </div>
  );
}
