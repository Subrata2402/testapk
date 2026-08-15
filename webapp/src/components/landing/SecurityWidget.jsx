import React from 'react';
import * as Icons from 'lucide-react';

export default function SecurityWidget({ t }) {
  return (
    <div className="sidebar-widget glass-card">
      <h3>{t('LANDING.SECURITY_VERIFICATION')}</h3>
      <div className="security-item">
        <Icons.ShieldCheck size={24} className="text-success security-widget-icon" />
        <div>
          <span className="security-title">{t('LANDING.SHA_256_VERIFIED')}</span>
          <p className="security-desc mt-1">{t('LANDING.SHA_256_VERIFIED_DESC')}</p>
        </div>
      </div>
      <div className="security-item">
        <Icons.Lock size={24} className="text-cyan security-widget-icon" />
        <div>
          <span className="security-title">{t('LANDING.SECURE_DELIVERY')}</span>
          <p className="security-desc mt-1">{t('LANDING.SECURE_DELIVERY_DESC')}</p>
        </div>
      </div>
    </div>
  );
}
