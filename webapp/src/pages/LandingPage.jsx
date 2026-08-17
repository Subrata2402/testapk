import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import logoImg from '../assets/logo.png';
import './LandingPage.css';
import { testapkDownloadLink } from '../constants';
import { useTranslation } from '../context/LanguageContext';

// Extracted Components
import HeroSection from '../components/landing/HeroSection';
import PlatformComponents from '../components/landing/PlatformComponents';
import OAuthDisclosure from '../components/landing/OAuthDisclosure';
import PurposeSection from '../components/landing/PurposeSection';
import AppSpecsTab from '../components/landing/AppSpecsTab';
import ReleasesTab from '../components/landing/ReleasesTab';
import SecurityWidget from '../components/landing/SecurityWidget';
import DevInfoWidget from '../components/landing/DevInfoWidget';
import Footer from '../components/landing/Footer';

export default function LandingPage({ user, onLoginClick, onContactClick, onNavigate, downloadLink }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'releases'

  const apkLink = downloadLink || testapkDownloadLink;

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
      <HeroSection
        user={user}
        logoImg={logoImg}
        appDetails={appDetails}
        t={t}
        onLoginClick={onLoginClick}
        testapkDownloadLink={apkLink}
      />

      {/* Platform Components Section */}
      <PlatformComponents
        t={t}
        testapkDownloadLink={apkLink}
      />

      {/* Google OAuth & Drive Usage Section */}
      <OAuthDisclosure t={t} />

      {/* Purpose of the Application Section */}
      <PurposeSection t={t} />

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
              <AppSpecsTab
                appDetails={appDetails}
                latestRelease={latestRelease}
                testapkDownloadLink={apkLink}
                t={t}
              />
            ) : (
              <ReleasesTab
                appDetails={appDetails}
                testapkDownloadLink={apkLink}
                t={t}
              />
            )}
          </div>
        </div>

        {/* Right Column: Sidebar Widgets */}
        <div className="landing-sidebar">
          {/* Security Verification Widget */}
          <SecurityWidget t={t} />

          {/* Developer Info Widget */}
          <DevInfoWidget t={t} onContactClick={onContactClick} />
        </div>
      </div>
 
      {/* Footer */}
      <Footer t={t} onContactClick={onContactClick} />
    </div>
  );
}
