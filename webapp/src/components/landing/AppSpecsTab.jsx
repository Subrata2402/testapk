import React from 'react';
import * as Icons from 'lucide-react';

export default function AppSpecsTab({ appDetails, latestRelease, testapkDownloadLink, t }) {
  return (
    <div className="details-tab">
      <div>
        <h3>{t('LANDING.ABOUT_APP', [appDetails.name])}</h3>
        <p className="text-secondary mt-2 specs-about-desc">
          {t('LANDING.ABOUT_APP_DESC')}
        </p>
      </div>

      <a
        href={`${testapkDownloadLink}`}
        download="testapk.apk"
        className="btn btn-primary btn-sm flex-center gap-2 mt-4 specs-download-btn"
      >
        <Icons.Download size={14} />
        <span>{t('LANDING.DOWNLOAD_APK')}</span>
      </a>

      <div className="app-info-specs">
        <h3>{t('LANDING.TECHNICAL_SPECS')}</h3>
        <div className="specs-grid">
          <div className="spec-item">
            <span className="spec-label">{t('LANDING.PACKAGE_NAME')}</span>
            <span className="spec-value">{appDetails.packageName}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">{t('LANDING.LATEST_VERSION')}</span>
            <span className="spec-value">v{latestRelease.version}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">{t('LANDING.CATEGORY')}</span>
            <span className="spec-value">{appDetails.category}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">{t('LANDING.MIN_SDK_VERSION')}</span>
            <span className="spec-value">{appDetails.minSdk}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
