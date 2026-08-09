import React from 'react';
import * as Icons from 'lucide-react';
import './PrivacyPolicy.css';
import { useTranslation } from '../context/LanguageContext';

export default function PrivacyPolicy({ onBackToHome }) {
  const { t } = useTranslation();
  return (
    <div className="policy-container flex-center">
      <div className="policy-card glass-panel animate-fade-in">
        <div className="policy-header">
          <button className="btn-back flex-center" onClick={onBackToHome} aria-label="Go back">
            <Icons.ArrowLeft size={20} />
          </button>
          <h2>{t('PRIVACY.TITLE')}</h2>
          <p className="last-updated">{t('PRIVACY.LAST_UPDATED')}</p>
        </div>

        <div className="policy-content">
          <section>
            <h3>{t('PRIVACY.INTRO_TITLE')}</h3>
            <p>{t('PRIVACY.INTRO_CONTENT')}</p>
          </section>

          <section>
            <h3>{t('PRIVACY.INFO_TITLE')}</h3>
            <p>{t('PRIVACY.ACCOUNT_INFO')}</p>
            <p>{t('PRIVACY.DRIVE_INTEGRATION')}</p>
            <p>{t('PRIVACY.APP_METADATA')}</p>
          </section>

          <section>
            <h3>{t('PRIVACY.USE_TITLE')}</h3>
            <ul>
              {t('PRIVACY.USE_LIST').split(';').map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>{t('PRIVACY.SHARING_TITLE')}</h3>
            <p>{t('PRIVACY.SHARING_CONTENT')}</p>
          </section>

          <section>
            <h3>{t('PRIVACY.SECURITY_TITLE')}</h3>
            <p>{t('PRIVACY.SECURITY_CONTENT')}</p>
          </section>

          <section>
            <h3>{t('PRIVACY.RIGHTS_TITLE')}</h3>
            <p>{t('PRIVACY.RIGHTS_CONTENT').split(';')[0]}</p>
            <ul>
              {t('PRIVACY.RIGHTS_CONTENT').split(';').slice(1).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>{t('PRIVACY.CONTACT_TITLE')}</h3>
            <p>{t('PRIVACY.CONTACT_CONTENT')}</p>
            <p className="contact-email">
              <Icons.Mail size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              <a href="mailto:subrata3250das@gmail.com">subrata3250das@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
