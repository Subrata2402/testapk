import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

export default function HeroSection({ user, logoImg, appDetails, t, onLoginClick, testapkDownloadLink }) {
  return (
    <div className="hero-section glass-card">
      <div className="hero-content">
        <div className="app-meta-header">
          <div className="app-icon-wrapper hero-app-icon-wrapper">
            <img src={logoImg} alt="TestAPK Logo" className="hero-app-icon-img" />
          </div>
          <div className="app-title-area">
            <h1>TestAPK</h1>
            <span className="package-name">{t('LANDING.HERO_SUBTITLE')}</span>
          </div>
        </div>

        <p className="app-description">{appDetails.description}</p>

        <div className="hero-actions">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary btn-lg flex-center gap-2 hero-link-btn">
              <Icons.LayoutDashboard size={20} />
              <span>{t('LANDING.GO_TO_DASHBOARD')}</span>
            </Link>
          ) : (
            <button className="btn btn-primary btn-lg flex-center gap-2" onClick={onLoginClick}>
              <Icons.LogIn size={20} />
              <span>{t('LANDING.SIGN_IN_PORTAL')}</span>
            </button>
          )}
          <a
            href={`${testapkDownloadLink}`}
            download="testapk.apk"
            className="btn btn-secondary btn-lg flex-center gap-2 hero-link-btn"
          >
            <Icons.Download size={20} />
            <span>{t('LANDING.DOWNLOAD_COMPANION')}</span>
          </a>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat-card">
          <Icons.HardDrive size={20} className="stat-icon cyan" />
          <span className="stat-value">Google Drive</span>
          <span className="stat-label">{t('LANDING.SECURE_STORAGE')}</span>
        </div>
        <div className="stat-card">
          <Icons.ShieldCheck size={20} className="stat-icon yellow" />
          <span className="stat-value">SHA-256</span>
          <span className="stat-label">{t('LANDING.INTEGRITY_VERIFICATION')}</span>
        </div>
        <div className="stat-card">
          <Icons.Terminal size={20} className="stat-icon purple" />
          <span className="stat-value">{t('LANDING.CLI_TOOL')}</span>
          <span className="stat-label">{t('LANDING.CI_CD_INTEGRATION')}</span>
        </div>
      </div>
    </div>
  );
}
