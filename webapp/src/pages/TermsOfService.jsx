import React from 'react';
import * as Icons from 'lucide-react';
import './TermsOfService.css';
import { useTranslation } from '../context/LanguageContext';

export default function TermsOfService({ onBackToHome }) {
  const { t } = useTranslation();
  return (
    <div className="terms-container flex-center">
      <div className="terms-card glass-panel animate-fade-in">
        <div className="terms-header">
          <button className="btn-back flex-center" onClick={onBackToHome} aria-label="Go back">
            <Icons.ArrowLeft size={20} />
          </button>
          <h2>{t('TERMS.TITLE')}</h2>
          <p className="last-updated">{t('TERMS.LAST_UPDATED')}</p>
        </div>

        <div className="terms-content">
          <section>
            <h3>{t('TERMS.AGREEMENT_TITLE')}</h3>
            <p>{t('TERMS.AGREEMENT_CONTENT')}</p>
          </section>

          <section>
            <h3>{t('TERMS.DESCRIPTION_TITLE')}</h3>
            <p>{t('TERMS.DESCRIPTION_CONTENT')}</p>
          </section>

          <section>
            <h3>{t('TERMS.ACCOUNT_TITLE')}</h3>
            <p>{t('TERMS.ACCOUNT_CONTENT')}</p>
          </section>

          <section>
            <h3>{t('TERMS.DRIVE_TITLE')}</h3>
            <p>{t('TERMS.DRIVE_CONTENT')}</p>
          </section>

          <section>
            <h3>{t('TERMS.USE_TITLE')}</h3>
            <p>{t('TERMS.USE_CONTENT').split(';').map((item, i) => (
              <li key={i}>{item}</li>
            ))}</p>
          </section>

          <section>
            <h3>{t('TERMS.LIABILITY_TITLE')}</h3>
            <p>{t('TERMS.LIABILITY_CONTENT')}</p>
          </section>

          <section>
            <h3>{t('TERMS.CHANGES_TITLE')}</h3>
            <p>{t('TERMS.CHANGES_CONTENT')}</p>
          </section>

          <section>
            <h3>{t('TERMS.CONTACT_TITLE')}</h3>
            <p>{t('TERMS.CONTACT_CONTENT')}</p>
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
