import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Settings, Save, AlertTriangle, CheckCircle } from 'lucide-react';
import { adminService } from '../services/api';
import MaintenanceModeCard from '../components/settings/MaintenanceModeCard';
import RegistrationCard from '../components/settings/RegistrationCard';
import MaxApkSizeCard from '../components/settings/MaxApkSizeCard';
import AnnouncementBannerCard from '../components/settings/AnnouncementBannerCard';
import FlutterVersionsCard from '../components/settings/FlutterVersionsCard';
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

  const handleAddVersion = (entry) => {
    setSettings((prev) => ({
      ...prev,
      flutter_app_versions: [...prev.flutter_app_versions, entry],
    }));
  };

  const handleRemoveVersion = (index) => {
    setSettings((prev) => ({
      ...prev,
      flutter_app_versions: prev.flutter_app_versions.filter((_, i) => i !== index),
    }));
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

        <MaintenanceModeCard
          value={settings.maintenance_mode}
          onChange={(checked) => setSettings((prev) => ({ ...prev, maintenance_mode: checked }))}
          t={t}
        />

        <RegistrationCard
          value={settings.allow_registration}
          onChange={(checked) => setSettings((prev) => ({ ...prev, allow_registration: checked }))}
          t={t}
        />

        <MaxApkSizeCard
          value={settings.max_apk_size}
          onChange={(val) => setSettings((prev) => ({ ...prev, max_apk_size: val }))}
          t={t}
        />

        <AnnouncementBannerCard
          value={settings.announcement_banner}
          onChange={(val) => setSettings((prev) => ({ ...prev, announcement_banner: val }))}
          t={t}
        />

        <FlutterVersionsCard
          versions={settings.flutter_app_versions}
          downloadLink={settings.latest_version_download_link}
          onAddVersion={handleAddVersion}
          onRemoveVersion={handleRemoveVersion}
          onDownloadLinkChange={(val) => setSettings((prev) => ({ ...prev, latest_version_download_link: val }))}
          t={t}
        />
      </form>
    </div>
  );
}
