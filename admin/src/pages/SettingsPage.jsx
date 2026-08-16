import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Settings, Save, AlertTriangle, ShieldAlert, CheckCircle, Plus, Trash2 } from 'lucide-react';
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
    flutter_app_versions: [],
    latest_version_download_link: '',
  });
  const [newVersion, setNewVersion] = useState('');
  const [newBuildNumber, setNewBuildNumber] = useState('');
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
            flutter_app_versions: data.flutter_app_versions?.value ?? [],
            latest_version_download_link: data.latest_version_download_link?.value ?? '',
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

  const handleAddVersion = () => {
    if (!newVersion.trim() || !newBuildNumber.trim()) return;
    const buildNum = parseInt(newBuildNumber);
    if (isNaN(buildNum)) return;

    const exists = settings.flutter_app_versions.some(
      (v) => v.version === newVersion.trim() && v.buildNumber === buildNum
    );
    if (exists) return;

    setSettings({
      ...settings,
      flutter_app_versions: [
        ...settings.flutter_app_versions,
        { version: newVersion.trim(), buildNumber: buildNum },
      ],
    });
    setNewVersion('');
    setNewBuildNumber('');
  };

  const handleRemoveVersion = (index) => {
    const updatedVersions = settings.flutter_app_versions.filter((_, i) => i !== index);
    setSettings({
      ...settings,
      flutter_app_versions: updatedVersions,
    });
  };

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
        flutter_app_versions: settings.flutter_app_versions,
        latest_version_download_link: settings.latest_version_download_link,
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
        <div className="glass-card settings-row settings-row-card">
          <div>
            <h4 className="settings-card-title">{t('settings.allowRegistration') || 'Allow User Registration'}</h4>
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
            <h4 className="settings-card-title">{t('settings.announcementBanner') || 'System Announcement Banner'}</h4>
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

        {/* Flutter App Version Settings */}
        <div className="glass-card settings-card">
          <div>
            <h4 className="settings-card-title">{t('settings.flutterAppVersions') || 'Flutter App Version Management'}</h4>
            <p className="text-muted settings-desc">
              {t('settings.flutterAppVersionsDesc') || 'Manage allowed Flutter app versions and the latest download link.'}
            </p>
          </div>

          {/* Add Version Form */}
          <div className="settings-version-inputs">
            <div className="settings-flex-1">
              <label className="text-muted settings-input-label">{t('settings.versionLabel') || 'Version (e.g. 1.0.0)'}</label>
              <input
                type="number"
                placeholder="1.0.0"
                value={newVersion}
                onChange={(e) => setNewVersion(e.target.value)}
                className="filter-input settings-width-100"
              />
            </div>
            <div className="settings-flex-1">
              <label className="text-muted settings-input-label">{t('settings.buildNumberLabel') || 'Build Number (e.g. 3)'}</label>
              <input
                type="number"
                placeholder="3"
                value={newBuildNumber}
                onChange={(e) => setNewBuildNumber(e.target.value)}
                className="filter-input settings-width-100"
              />
            </div>
            <button
              type="button"
              onClick={handleAddVersion}
              className="btn btn-secondary settings-add-btn"
            >
              <Plus size={16} />
              <span>{t('settings.addVersionBtn') || 'Add Version'}</span>
            </button>
          </div>

          {/* Version List */}
          {settings.flutter_app_versions && settings.flutter_app_versions.length > 0 ? (
            <div className="settings-version-list">
              <label className="text-muted settings-list-label">{t('settings.allowedVersionsLabel') || 'Allowed Versions'}</label>
              <div className="settings-version-items">
                {settings.flutter_app_versions.map((v, idx) => (
                  <div key={idx} className="glass-card settings-version-item">
                    <span>
                      <strong>{t('settings.version') || 'Version'}:</strong> {v.version} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>{t('settings.build') || 'Build'}:</strong> {v.buildNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveVersion(idx)}
                      className="btn btn-danger settings-remove-btn"
                    >
                      <Trash2 size={14} />
                      <span>{t('settings.removeBtn') || 'Remove'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted settings-no-versions">
              {t('settings.noVersionsAdded') || 'No versions added yet. If empty, all versions will be considered invalid (mandatory update).'}
            </p>
          )}

          {/* Download Link */}
          <div className="settings-download-link-container">
            <label className="text-muted settings-input-label">{t('settings.latestVersionDownloadLink') || 'Latest Version Download Link'}</label>
            <input
              type="text"
              placeholder="https://example.com/app.apk"
              value={settings.latest_version_download_link}
              onChange={(e) => setSettings({ ...settings, latest_version_download_link: e.target.value })}
              className="filter-input settings-width-100"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
