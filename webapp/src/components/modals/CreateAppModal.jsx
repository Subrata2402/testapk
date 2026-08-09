import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import './CreateAppModal.css';
import { useTranslation } from '../../context/LanguageContext';

export default function CreateAppModal({ isOpen, onClose, onCreateApp, user, showAlert, onOpenDriveModal }) {
  const { t } = useTranslation();
  const [appName, setAppName] = useState('');
  const [packageName, setPackageName] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!appName || !packageName || !description) {
      showAlert(t('DASHBOARD.FILL_ALL_FIELDS'), 'Warning', 'warning');
      return;
    }
    setIsCreating(true);
    const success = await onCreateApp({ name: appName, packageName, description });
    setIsCreating(false);
    if (success) {
      setAppName('');
      setPackageName('');
      setDescription('');
      onClose();
    }
  };

  const isDriveConfigured = user?.isDriveConfigured;

  return (
    <div className="modal-overlay">
      <div className="modal-container glass-panel animate-fade-in">
        <button className="modal-close" onClick={onClose} disabled={isCreating}>
          <Icons.X size={20} />
        </button>

        {!isDriveConfigured ? (
          <div className="drive-config-container">
            <div className="modal-header">
              <h2>{t('DASHBOARD.STORAGE_CONFIG_REQUIRED')}</h2>
              <p>{t('DASHBOARD.STORAGE_CONFIG_DESC')}</p>
            </div>

            <div className="drive-config-body flex-center" style={{ padding: '24px 0', textAlign: 'center' }}>
              <div className="drive-config-prompt" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div className="drive-icon-wrapper flex-center" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-primary)', marginBottom: '8px' }}>
                  <Icons.CloudLightning size={48} className="drive-icon" />
                </div>
                <p 
                  style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', maxWidth: '360px', margin: 0 }}
                  dangerouslySetInnerHTML={{ __html: t('DASHBOARD.DRIVE_FOLDER_CREATION_DESC', ['TestAPK_Releases']) }}
                >
                </p>
                <button 
                  className="btn btn-primary flex-center gap-2" 
                  style={{ width: '100%', maxWidth: '280px', height: '46px', fontWeight: '600' }}
                  onClick={() => {
                    onOpenDriveModal();
                    onClose();
                  }}
                >
                  <Icons.Settings size={18} />
                  <span>{t('DASHBOARD.CONFIGURE_DRIVE')}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>{t('DASHBOARD.CREATE_APP_TITLE')}</h2>
              <p>{t('DASHBOARD.CREATE_APP_DESC')}</p>
            </div>

            <form onSubmit={handleSubmit} className="create-app-form">
              <div className="form-group">
                <label htmlFor="appName" className="form-label">
                  {t('DASHBOARD.APP_NAME')}
                </label>
                <input
                  type="text"
                  id="appName"
                  className="form-input"
                  placeholder={t('DASHBOARD.APP_NAME_PLACEHOLDER')}
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  required
                  disabled={isCreating}
                />
              </div>

              <div className="form-group">
                <label htmlFor="packageName" className="form-label">
                  {t('DASHBOARD.PACKAGE_NAME')}
                </label>
                <input
                  type="text"
                  id="packageName"
                  className="form-input"
                  placeholder={t('DASHBOARD.PACKAGE_NAME_PLACEHOLDER')}
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  required
                  disabled={isCreating}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  {t('DASHBOARD.DESCRIPTION')}
                </label>
                <textarea
                  id="description"
                  className="form-input"
                  placeholder={t('DASHBOARD.DESCRIPTION_PLACEHOLDER')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  required
                  disabled={isCreating}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isCreating}>
                  {t('DASHBOARD.CANCEL')}
                </button>
                <button type="submit" className="btn btn-primary" disabled={isCreating}>
                  {isCreating ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                      <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
                      <span>{t('DASHBOARD.CREATING')}</span>
                    </div>
                  ) : (
                    t('DASHBOARD.CREATE_APP_TITLE')
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
