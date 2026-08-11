import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import './AboutPage.css';
import { testapkDownloadLink } from '../constants';
import { useTranslation } from '../context/LanguageContext';

const GithubIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function AboutPage({ showAlert }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'contact'

  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      showAlert(t('CONTACT.ERROR'), 'Error', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      showAlert(t('CONTACT.SUCCESS'), 'Success', 'success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
      showAlert(t('CONTACT.ERROR'), 'Error', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="about-page-container animate-fade-in">
      <header className="about-header glass-card">
        <div className="about-header-main">
          <div className="about-logo-wrapper flex-center">
            <Icons.Cpu size={36} className="about-logo-icon" />
          </div>
          <div className="about-header-info">
            <h2>{t('ABOUT.TITLE')}</h2>
            <p className="text-secondary">{t('ABOUT.SUBTITLE')}</p>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="tabs-header">
        <button
          className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          <Icons.Info size={16} /> {t('ABOUT.PLATFORM_INFO')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          <Icons.Mail size={16} /> {t('CONTACT.TITLE')}
        </button>
      </div>

      {activeTab === 'info' ? (
        <div className="about-content-grid">
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
          </div>
        </div>
      ) : (
        <div className="contact-tab-content animate-fade-in">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-container glass-card">
              <h3>{t('CONTACT.TITLE')}</h3>
              <p className="contact-desc">{t('CONTACT.SUBTITLE')}</p>
              
              <form onSubmit={handleContactSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t('CONTACT.NAME')}</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('CONTACT.EMAIL')}</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="john@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('CONTACT.SUBJECT')}</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="How can we help you?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('CONTACT.MESSAGE')}</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                  />
                </div>

                <button type="submit" className="btn btn-primary flex-center gap-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="spinner spinner-sm"></div>
                      <span>{t('CONTACT.SENDING')}</span>
                    </>
                  ) : (
                    <>
                      <Icons.Send size={16} />
                      <span>{t('CONTACT.SEND')}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Support Info */}
            <div className="support-info-container glass-card">
              <h3>{t('ABOUT.SUPPORT_CHANNELS')}</h3>
              <p className="contact-desc">{t('ABOUT.SUPPORT_CHANNELS_DESC')}</p>

              <div className="support-channels-list">
                <div className="support-channel-item">
                  <div className="channel-icon-wrapper flex-center">
                    <Icons.Mail size={20} />
                  </div>
                  <div className="channel-details">
                    <span className="channel-label">{t('ABOUT.EMAIL_SUPPORT')}</span>
                    <a href="mailto:support@testapk.com" className="channel-value">support@testapk.com</a>
                  </div>
                </div>

                <div className="support-channel-item">
                  <div className="channel-icon-wrapper flex-center">
                    <GithubIcon size={20} />
                  </div>
                  <div className="channel-details">
                    <span className="channel-label">{t('ABOUT.GITHUB_ISSUES')}</span>
                    <a href="https://github.com/testapk/issues" target="_blank" rel="noopener noreferrer" className="channel-value">github.com/testapk/issues</a>
                  </div>
                </div>

                <div className="support-channel-item">
                  <div className="channel-icon-wrapper flex-center">
                    <Icons.MessageSquare size={20} />
                  </div>
                  <div className="channel-details">
                    <span className="channel-label">{t('ABOUT.DISCORD_COMMUNITY')}</span>
                    <a href="https://discord.gg/testapk" target="_blank" rel="noopener noreferrer" className="channel-value">discord.gg/testapk</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="about-footer glass-card text-center">
        <p dangerouslySetInnerHTML={{ __html: t('ABOUT.FOOTER') }}></p>
      </footer>
    </div>
  );
}
