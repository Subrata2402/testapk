import React from 'react';
import * as Icons from 'lucide-react';

export default function PlatformComponents({ t, testapkDownloadLink }) {
  return (
    <div className="components-section landing-section">
      <h2 className="section-title landing-section-title">{t('LANDING.PLATFORM_COMPONENTS')}</h2>
      <div className="about-content-grid platform-grid">
        {/* Webapp Card */}
        <div className="about-card glass-card">
          <div className="about-card-header">
            <div className="about-card-icon-wrapper webapp-color flex-center">
              <Icons.Globe size={24} />
            </div>
            <h3>{t('LANDING.WEB_DASHBOARD')}</h3>
          </div>
          <p className="about-card-desc">
            {t('LANDING.WEB_DASHBOARD_DESC')}
          </p>
          <ul className="about-features-list">
            <li>
              <Icons.Check size={16} className="feature-check" />
              <span><strong>{t('LANDING.DRIVE_STORAGE_TITLE')}:</strong> {t('LANDING.DRIVE_STORAGE_DESC')}</span>
            </li>
            <li>
              <Icons.Check size={16} className="feature-check" />
              <span><strong>{t('LANDING.TEAM_MGMT_TITLE')}:</strong> {t('LANDING.TEAM_MGMT_DESC')}</span>
            </li>
            <li>
              <Icons.Check size={16} className="feature-check" />
              <span><strong>{t('LANDING.RELEASE_HISTORY_TITLE')}:</strong> {t('LANDING.RELEASE_HISTORY_DESC')}</span>
            </li>
          </ul>
        </div>

        {/* Flutter App Card */}
        <div className="about-card glass-card">
          <div className="about-card-header">
            <div className="about-card-icon-wrapper flutter-color flex-center">
              <Icons.Smartphone size={24} />
            </div>
            <h3>{t('LANDING.FLUTTER_CLIENT')}</h3>
          </div>
          <p className="about-card-desc">
            {t('LANDING.FLUTTER_CLIENT_DESC')}
          </p>
          <ul className="about-features-list">
            <li>
              <Icons.Check size={16} className="feature-check" />
              <span><strong>{t('LANDING.GLASSMORPHIC_UI_TITLE')}:</strong> {t('LANDING.GLASSMORPHIC_UI_DESC')}</span>
            </li>
            <li>
              <Icons.Check size={16} className="feature-check" />
              <span><strong>{t('LANDING.ONE_TAP_INSTALL_TITLE')}:</strong> {t('LANDING.ONE_TAP_INSTALL_DESC')}</span>
            </li>
            <li>
              <Icons.Check size={16} className="feature-check" />
              <span><strong>{t('LANDING.VERSION_DETECTION_TITLE')}:</strong> {t('LANDING.VERSION_DETECTION_DESC')}</span>
            </li>
          </ul>
          <a
            href={`${testapkDownloadLink}`}
            download="testapk.apk"
            className="btn btn-primary btn-sm flex-center gap-2 mt-4 platform-link-btn"
          >
            <Icons.Download size={14} />
            <span>{t('LANDING.DOWNLOAD_APK')}</span>
          </a>
        </div>

        {/* CLI Tool Card */}
        <div className="about-card glass-card">
          <div className="about-card-header">
            <div className="about-card-icon-wrapper cli-color flex-center">
              <Icons.Terminal size={24} />
            </div>
            <h3>{t('LANDING.CLI_TOOL')}</h3>
          </div>
          <p className="about-card-desc">
            {t('LANDING.CLI_TOOL_DESC')}
          </p>
          <ul className="about-features-list">
            <li>
              <Icons.Check size={16} className="feature-check" />
              <span><strong>{t('LANDING.DEVICE_AUTH_FLOW_TITLE')}:</strong> {t('LANDING.DEVICE_AUTH_FLOW_DESC')}</span>
            </li>
            <li>
              <Icons.Check size={16} className="feature-check" />
              <span><strong>{t('LANDING.REAL_TIME_PROGRESS_TITLE')}:</strong> {t('LANDING.REAL_TIME_PROGRESS_DESC')}</span>
            </li>
            <li>
              <Icons.Check size={16} className="feature-check" />
              <span><strong>{t('LANDING.DRIVE_UPLOAD_STATUS_TITLE')}:</strong> {t('LANDING.DRIVE_UPLOAD_STATUS_DESC')}</span>
            </li>
          </ul>
          <a
            href="https://www.npmjs.com/package/testapk-cli"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm flex-center gap-2 mt-4 platform-link-btn"
          >
            <Icons.ExternalLink size={14} />
            <span>{t('LANDING.VIEW_ON_NPM')}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
