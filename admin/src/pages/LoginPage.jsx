import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation, languages } from '../context/LanguageContext';
import CustomDropdown from '../components/common/CustomDropdown';
import { Shield, Mail, Lock, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import './LoginPage.css';

export default function LoginPage() {
  const { login } = useAuth();
  const { t, language, changeLanguage } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dropdownOptions = languages.map(lang => ({
    value: lang.code,
    label: lang.name,
    flag: lang.flag
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(t('login.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page-container">
      {/* Decorative background blobs */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      {/* Language Selector Header */}
      <div className="login-header-actions">
        <div className="lang-selector-wrapper">
          <CustomDropdown
            options={dropdownOptions}
            value={language}
            onChange={changeLanguage}
          />
        </div>
      </div>

      {/* Login Card */}
      <div className="login-card-wrapper animate-fade-in">
        <div className="glass-card login-card">
          <div className="login-logo-section">
            <div className="logo-icon-wrapper">
              <Shield className="logo-icon" size={32} />
            </div>
            <h1 className="text-gradient-accent">{t('login.title')}</h1>
            <p>{t('login.subtitle')}</p>
          </div>

          {error && (
            <div className="login-error-banner animate-fade-in">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                {t('login.email')}
              </label>
              <div className="input-icon-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  id="email"
                  type="email"
                  className="form-input with-icon"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. admin@testapk.com"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                {t('login.password')}
              </label>
              <div className="input-icon-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input with-icon with-icon-right"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="input-icon-right"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary login-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  {t('common.loading')}
                </>
              ) : (
                t('login.button')
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
