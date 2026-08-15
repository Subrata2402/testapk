import React from 'react';
import * as Icons from 'lucide-react';

export default function PurposeSection({ t }) {
  return (
    <div className="components-section glass-card purpose-section">
      <h2 className="section-title purpose-section-title">
        <Icons.Info size={28} className="text-cyan" />
        <span>{t('LANDING.PURPOSE_TITLE')}</span>
      </h2>
      <p className="purpose-section-desc">
        {t('LANDING.PURPOSE_DESC_1')}
      </p>
      <p className="purpose-section-desc-last">
        {t('LANDING.PURPOSE_DESC_2')}
      </p>
    </div>
  );
}
