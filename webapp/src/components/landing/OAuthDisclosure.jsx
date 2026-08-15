import React from 'react';
import * as Icons from 'lucide-react';

export default function OAuthDisclosure({ t }) {
  return (
    <div className="components-section glass-card oauth-section">
      <h2 className="section-title oauth-section-title">
        <Icons.ShieldAlert size={28} className="text-cyan" />
        <span>{t('LANDING.OAUTH_DISCLOSURE_TITLE')}</span>
      </h2>
      <p className="oauth-section-desc">
        {t('LANDING.OAUTH_DISCLOSURE_DESC')}
      </p>
      <div className="oauth-grid">
        <div className="oauth-card">
          <h3 className="oauth-card-title">
            <Icons.UserCheck size={18} />
            <span>{t('LANDING.GOOGLE_SIGN_IN_TITLE')}</span>
          </h3>
          <p className="oauth-card-desc">
            {t('LANDING.GOOGLE_SIGN_IN_DESC')}
          </p>
        </div>
        <div className="oauth-card">
          <h3 className="oauth-card-title">
            <Icons.HardDrive size={18} />
            <span>{t('LANDING.GOOGLE_DRIVE_ACCESS_TITLE')}</span>
          </h3>
          <p className="oauth-card-desc">
            {t('LANDING.GOOGLE_DRIVE_ACCESS_DESC')}
          </p>
        </div>
        <div className="oauth-card">
          <h3 className="oauth-card-title">
            <Icons.Lock size={18} />
            <span>{t('LANDING.YOUR_DATA_CONTROL_TITLE')}</span>
          </h3>
          <p className="oauth-card-desc">
            {t('LANDING.YOUR_DATA_CONTROL_DESC')}
          </p>
        </div>
      </div>
    </div>
  );
}
