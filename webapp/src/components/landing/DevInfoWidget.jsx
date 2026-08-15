import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

export default function DevInfoWidget({ t, onContactClick }) {
  return (
    <div className="sidebar-widget glass-card">
      <h3>{t('LANDING.DEVELOPER_INFO')}</h3>
      <div className="dev-info-item">
        <Icons.Globe size={16} />
        <span>{t('LANDING.WEBSITE')}: <a href="#" onClick={(e) => e.preventDefault()}>testapk.clipboux.online</a></span>
      </div>
      <div className="dev-info-item">
        <Icons.Mail size={16} />
        <span><a href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }}>{t('LANDING.CONTACT_SUPPORT')}</a></span>
      </div>
      <div className="dev-info-item">
        <Icons.Shield size={16} />
        <span><Link to="/privacy">{t('LANDING.PRIVACY_POLICY')}</Link></span>
      </div>
      <div className="dev-info-item">
        <Icons.FileText size={16} />
        <span><Link to="/terms">{t('LANDING.TERMS_OF_SERVICE')}</Link></span>
      </div>
      <div className="dev-info-item">
        <Icons.HelpCircle size={16} />
        <span><Link to="/faq">{t('FAQ.TITLE')}</Link></span>
      </div>
    </div>
  );
}
