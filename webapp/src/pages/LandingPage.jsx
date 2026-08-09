import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import './LandingPage.css';
import { testapkDownloadLink } from '../constants';
import { useTranslation } from '../context/LanguageContext';

export default function LandingPage({ user, onLoginClick, onContactClick, onNavigate }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'releases'

  const appDetails = {
    name: 'TestAPK',
    packageName: 'com.testapk.app',
    description: t('LANDING.HERO_DESCRIPTION'),
    downloads: '1.2K',
    rating: '4.9',
    activeUsers: '850+',
    category: 'Developer Tools',
    minSdk: 'Android 8.0 (API 26)',
    releases: [
      {
        version: '1.0.0',
        buildNumber: 3,
        releaseNotes: 'Initial release of the TestAPK companion app. Features Google Sign-In, real-time application list, release history, and direct APK download & installation flow with progress feedback.',
        date: '2026-07-13',
        size: '17.8 MB',
      }
    ]
  };

  const latestRelease = appDetails.releases[0];

  return (
    <div className="landing-container container">
      {/* Hero Section */}
      <div className="hero-section glass-card">
        <div className="hero-content">
          <div className="app-meta-header">
            <div className="app-icon-wrapper" style={{ overflow: 'hidden', padding: 0 }}>
              <img src={logoImg} alt="TestAPK Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="app-title-area">
              <h1>TestAPK</h1>
              <span className="package-name">{t('LANDING.HERO_SUBTITLE')}</span>
            </div>
          </div>

          <p className="app-description">{appDetails.description}</p>

          <div className="hero-actions">
            {user ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg flex-center gap-2" style={{ textDecoration: 'none' }}>
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
              className="btn btn-secondary btn-lg flex-center gap-2"
              style={{ textDecoration: 'none' }}
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

      {/* Platform Components Section */}
      <div className="components-section" style={{ marginTop: '32px', marginBottom: '32px' }}>
        <h2 className="section-title" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '24px', color: '#ffffff' }}>{t('LANDING.PLATFORM_COMPONENTS')}</h2>
        <div className="about-content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
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
              className="btn btn-primary btn-sm flex-center gap-2 mt-4"
              style={{ textDecoration: 'none', width: 'fit-content' }}
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
              className="btn btn-primary btn-sm flex-center gap-2 mt-4"
              style={{ textDecoration: 'none', width: 'fit-content' }}
            >
              <Icons.ExternalLink size={14} />
              <span>{t('LANDING.VIEW_ON_NPM')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Google OAuth & Drive Usage Section */}
      <div className="components-section glass-card" style={{ marginTop: '32px', marginBottom: '32px', padding: '32px' }}>
        <h2 className="section-title" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '16px', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Icons.ShieldAlert size={28} className="text-cyan" />
          <span>{t('LANDING.OAUTH_DISCLOSURE_TITLE')}</span>
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, fontSize: '0.975rem', marginBottom: '20px' }}>
          {t('LANDING.OAUTH_DISCLOSURE_DESC')}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons.UserCheck size={18} />
              <span>{t('LANDING.GOOGLE_SIGN_IN_TITLE')}</span>
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', margin: 0 }}>
              {t('LANDING.GOOGLE_SIGN_IN_DESC')}
            </p>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons.HardDrive size={18} />
              <span>{t('LANDING.GOOGLE_DRIVE_ACCESS_TITLE')}</span>
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', margin: 0 }}>
              {t('LANDING.GOOGLE_DRIVE_ACCESS_DESC')}
            </p>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons.Lock size={18} />
              <span>{t('LANDING.YOUR_DATA_CONTROL_TITLE')}</span>
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', margin: 0 }}>
              {t('LANDING.YOUR_DATA_CONTROL_DESC')}
            </p>
          </div>
        </div>
      </div>

      {/* Purpose of the Application Section */}
      <div className="components-section glass-card" style={{ marginTop: '32px', marginBottom: '32px', padding: '32px' }}>
        <h2 className="section-title" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '16px', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Icons.Info size={28} className="text-cyan" />
          <span>{t('LANDING.PURPOSE_TITLE')}</span>
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, fontSize: '0.975rem', marginBottom: '16px' }}>
          {t('LANDING.PURPOSE_DESC_1')}
        </p>
        <p style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, fontSize: '0.975rem', margin: 0 }}>
          {t('LANDING.PURPOSE_DESC_2')}
        </p>
      </div>

      {/* Main Grid */}
      <div className="landing-grid">
        {/* Left Column: Tabs Content */}
        <div className="glass-card">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              <Icons.Info size={16} />
              <span>{t('LANDING.DETAILS_SPECS')}</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'releases' ? 'active' : ''}`}
              onClick={() => setActiveTab('releases')}
            >
              <Icons.History size={16} />
              <span>{t('DASHBOARD.RELEASES')}</span>
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'details' ? (
              <div className="details-tab">
                <div>
                  <h3>{t('LANDING.ABOUT_APP', [appDetails.name])}</h3>
                  <p className="text-secondary mt-2" style={{ lineHeight: '1.6' }}>
                    {t('LANDING.ABOUT_APP_DESC')}
                  </p>
                </div>

                <a
                  href={`${testapkDownloadLink}`}
                  download="testapk.apk"
                  className="btn btn-primary btn-sm flex-center gap-2 mt-4"
                  style={{ textDecoration: 'none', width: 'fit-content' }}
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
            ) : (
              <div className="releases-tab">
                <h3>{t('LANDING.ALL_RELEASES')}</h3>
                <div className="releases-timeline">
                  {appDetails.releases.map((release, index) => (
                    <div key={index} className="release-timeline-item">
                      <div className="release-timeline-badge" />
                      <div className="release-timeline-content glass-card">
                        <div className="release-header">
                          <div className="release-title-info">
                            <h4>Version {release.version}</h4>
                            <span className="badge badge-secondary">Build {release.buildNumber}</span>
                          </div>
                          <span className="release-date">
                            {new Date(release.date).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>

                        <div className="release-notes">
                          <h5>{t('LANDING.WHATS_NEW')}</h5>
                          <p>{release.releaseNotes}</p>
                        </div>

                        <div className="release-footer" style={{ flexWrap: 'wrap', gap: '12px' }}>
                          <span className="release-size">
                            <Icons.FileText size={14} />
                            <span>{release.size}</span>
                          </span>
                          <a
                            href={`${testapkDownloadLink}`}
                            download="testapk.apk"
                            className="btn btn-primary btn-sm flex-center gap-1"
                            style={{ textDecoration: 'none' }}
                          >
                            <Icons.Download size={12} />
                            <span>{t('LANDING.DOWNLOAD_APK')}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sidebar Widgets */}
        <div className="landing-sidebar">
          {/* Security Verification Widget */}
          <div className="sidebar-widget glass-card">
            <h3>{t('LANDING.SECURITY_VERIFICATION')}</h3>
            <div className="security-item">
              <Icons.ShieldCheck size={24} className="text-success" style={{ marginTop: '2px' }} />
              <div>
                <span className="security-title">{t('LANDING.SHA_256_VERIFIED')}</span>
                <p className="security-desc mt-1">{t('LANDING.SHA_256_VERIFIED_DESC')}</p>
              </div>
            </div>
            <div className="security-item">
              <Icons.Lock size={24} className="text-cyan" style={{ marginTop: '2px' }} />
              <div>
                <span className="security-title">{t('LANDING.SECURE_DELIVERY')}</span>
                <p className="security-desc mt-1">{t('LANDING.SECURE_DELIVERY_DESC')}</p>
              </div>
            </div>
          </div>

          {/* Developer Info Widget */}
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
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="landing-footer glass-card">
        <div className="footer-left">
          <Icons.Cpu size={18} className="text-cyan" />
          <span>&copy; {new Date().getFullYear()} TestAPK. {t('LANDING.ALL_RIGHTS_RESERVED')}</span>
        </div>
        <div className="footer-right">
          <Link to="/privacy" className="footer-link">{t('LANDING.PRIVACY_POLICY')}</Link>
          <Link to="/terms" className="footer-link">{t('LANDING.TERMS_OF_SERVICE')}</Link>
          <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); onContactClick(); }}>{t('LANDING.CONTACT_SUPPORT')}</a>
        </div>
      </footer>
    </div>
  );
}
