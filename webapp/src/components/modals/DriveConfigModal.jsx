import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { userService } from '../../services/api';
import './CreateAppModal.css'; // Reuse CreateAppModal styles
import { useTranslation } from '../../context/LanguageContext';

export default function DriveConfigModal({ isOpen, onClose, user, showAlert, onDriveConfigured }) {
  const { t } = useTranslation();
  const [isConfiguring, setIsConfiguring] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setIsConfiguring(true);
      try {
        const data = await userService.configureDrive(codeResponse.code);
        if (data.status === 'success') {
          showAlert(t('DASHBOARD.DRIVE_CONFIG_SUCCESS'), 'Success', 'success');
          onDriveConfigured();
          onClose();
        } else {
          showAlert(data.message || t('DASHBOARD.DRIVE_CONFIG_FAILED'), 'Error', 'error');
        }
      } catch (err) {
        console.error('Failed to configure drive:', err);
        showAlert(t('DASHBOARD.DRIVE_CONFIG_FAILED'), 'Error', 'error');
      } finally {
        setIsConfiguring(false);
      }
    },
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/drive.file',
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container glass-panel animate-fade-in">
        <button className="modal-close" onClick={onClose} disabled={isConfiguring}>
          <Icons.X size={20} />
        </button>

        <div className="drive-config-container">
          <div className="modal-header">
            <h2>{t('DASHBOARD.CONFIGURE_DRIVE')}</h2>
            <p>{t('DASHBOARD.DRIVE_CONFIG_SUBTITLE')}</p>
          </div>

          <div className="drive-config-body flex-center">
            {isConfiguring ? (
              <div className="google-loading-state">
                <div className="spinner"></div>
                <p>{t('DASHBOARD.CONFIGURING_DRIVE')}</p>
                <span className="loading-subtext">{t('DASHBOARD.CONFIGURING_DRIVE_SUBTEXT')}</span>
              </div>
            ) : (
              <div className="drive-config-prompt">
                <div className="drive-icon-wrapper flex-center">
                  <Icons.CloudLightning size={48} className="drive-icon" />
                </div>
                <h3>{t('DASHBOARD.STORAGE_CONFIG_REQUIRED')}</h3>
                <p dangerouslySetInnerHTML={{ __html: t('DASHBOARD.DRIVE_CONFIG_PROMPT_DESC', ['TestAPK_Releases']) }}></p>
                <button className="btn btn-primary google-drive-btn flex-center gap-2" onClick={() => login()}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/>
                  </svg>
                  <span>{t('DASHBOARD.CONNECT_DRIVE')}</span>
                </button>

                <div className="drive-permissions-info" style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'left',
                  width: '100%',
                  marginTop: '12px',
                  fontSize: '0.85rem',
                  lineHeight: '1.4'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                    <Icons.ShieldAlert size={16} style={{ color: 'var(--accent-primary)' }} />
                    {t('DASHBOARD.DRIVE_PERMS_TITLE')}
                  </h4>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontWeight: '600', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                      <Icons.CheckCircle2 size={14} /> {t('DASHBOARD.DRIVE_PERMS_CAN_DO')}
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: 'rgba(255, 255, 255, 0.7)' }}>
                      <li dangerouslySetInnerHTML={{ __html: t('DASHBOARD.DRIVE_PERMS_CAN_DO_1', ['TestAPK_Releases']) }}></li>
                      <li>{t('DASHBOARD.DRIVE_PERMS_CAN_DO_2')}</li>
                    </ul>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontWeight: '600', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                      <Icons.XCircle size={14} /> {t('DASHBOARD.DRIVE_PERMS_CANNOT_DO')}
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: 'rgba(255, 255, 255, 0.7)' }}>
                      <li>{t('DASHBOARD.DRIVE_PERMS_CANNOT_DO_1')}</li>
                      <li dangerouslySetInnerHTML={{ __html: t('DASHBOARD.DRIVE_PERMS_CANNOT_DO_2', ['TestAPK_Releases']) }}></li>
                    </ul>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.4)', fontStyle: 'italic' }}>
                      {t('DASHBOARD.DRIVE_PERMS_FOOTER')}
                    </p>
                    <a 
                      href="https://developers.google.com/identity/protocols/oauth2/scopes#drive" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: 'var(--accent-primary)', textDecoration: 'underline', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <span>{t('DASHBOARD.DRIVE_PERMS_DOCS_LINK')}</span>
                      <Icons.ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
