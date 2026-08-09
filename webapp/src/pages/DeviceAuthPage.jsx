import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { deviceAuthService } from '../services/api';
import './DeviceAuthPage.css';
import { useTranslation } from '../context/LanguageContext';

// States: 'checking' | 'form' | 'expired' | 'success'

export default function DeviceAuthPage({ user, onLoginClick, showAlert, onGoToDashboard }) {
  const { t } = useTranslation();
  const [pageState, setPageState] = useState('checking');
  const [userCode, setUserCode] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setPageState('expired');
        return;
      }
      try {
        const data = await deviceAuthService.checkUrl(token);
        if (data.status === 'success') {
          setPageState('form');
        } else {
          setPageState('expired');
        }
      } catch (err) {
        console.error('Failed to validate token:', err);
        setPageState('expired');
      }
    };
    validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userCode) return;

    setIsAuthorizing(true);
    try {
      const data = await deviceAuthService.authorize(userCode);
      if (data.status === 'success') {
        setPageState('success');
        setTimeout(() => {
          onGoToDashboard();
        }, 3000);
      } else {
        showAlert(data.message || t('DEVICE.ERROR'), 'Error', 'error');
      }
    } catch (err) {
      console.error('Failed to authorize device:', err);
      if (err.message === 'Device code expired' || err.message === 'expired_code') {
        setPageState('expired');
      } else {
        showAlert(err.message || t('DEVICE.ERROR'), 'Error', 'error');
      }
    } finally {
      setIsAuthorizing(false);
    }
  };

  if (pageState === 'checking') {
    return (
      <div className="device-auth-container flex-center">
        <div className="device-auth-card glass-panel animate-fade-in">
          <div className="device-auth-body text-center">
            <div className="spinner" style={{ margin: '0 auto' }}></div>
            <p style={{ marginTop: '16px', opacity: 0.7 }}>{t('DEVICE.VALIDATING')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (pageState === 'expired') {
    return (
      <div className="device-auth-container flex-center">
        <div className="device-auth-card glass-panel animate-fade-in">
          <div className="device-auth-header">
            <div className="device-icon-wrapper expired-icon-bg flex-center">
              <Icons.Clock size={40} className="expired-icon" />
            </div>
            <h2>{t('DEVICE.EXPIRED_TITLE')}</h2>
            <p>{t('DEVICE.EXPIRED_DESC')}</p>
          </div>
          <div className="device-auth-body text-center expired-state">
            <div className="expired-code-hint">
              <code className="code-snippet">testapk login</code>
            </div>
            {user && (
              <button
                className="btn btn-primary w-100"
                onClick={() => {
                  window.history.pushState({}, '', '/');
                  onGoToDashboard();
                }}
              >
                {t('LANDING.GO_TO_DASHBOARD')}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (pageState === 'success') {
    return (
      <div className="device-auth-container flex-center">
        <div className="device-auth-card glass-panel animate-fade-in">
          <div className="device-auth-header">
            <div className="success-icon-wrapper flex-center">
              <Icons.CheckCircle size={48} className="success-icon" />
            </div>
            <h2>{t('DEVICE.SUCCESS_TITLE')}</h2>
            <p>{t('DEVICE.SUCCESS_DESC')}</p>
          </div>
          <div className="device-auth-body text-center success-state">
            <button
              className="btn btn-secondary w-100"
              onClick={() => {
                window.history.pushState({}, '', '/');
                onGoToDashboard();
              }}
            >
              {t('LANDING.GO_TO_DASHBOARD')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="device-auth-container flex-center">
      <div className="device-auth-card glass-panel animate-fade-in">
        <div className="device-auth-header">
          <div className="device-icon-wrapper flex-center">
            <Icons.Terminal size={40} className="terminal-icon" />
          </div>
          <h2>{t('DEVICE.TITLE')}</h2>
          <p>{t('DEVICE.SUBTITLE')}</p>
        </div>

        {!user ? (
          <div className="device-auth-body text-center">
            <p className="auth-prompt-text">
              {t('DEVICE.SIGN_IN_PROMPT')}
            </p>
            <button className="btn btn-primary flex-center gap-2" onClick={onLoginClick} style={{ margin: '0 auto' }}>
              <Icons.LogIn size={18} />
              <span>{t('DEVICE.SIGN_IN_BTN')}</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="device-auth-form">
            <div className="form-group">
              <label htmlFor="userCode" className="form-label">
                {t('DEVICE.ENTER_CODE')}
              </label>
              <input
                type="text"
                id="userCode"
                className="form-input code-input"
                placeholder="ABCD-EFGH"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                maxLength={9}
                required
                autoFocus
              />
              <span className="form-help">
                {t('DEVICE.ENTER_CODE_HELP')}
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 flex-center gap-2"
              disabled={isAuthorizing || !userCode}
            >
              {isAuthorizing ? (
                <>
                  <div className="spinner spinner-sm"></div>
                  <span>{t('DEVICE.AUTHORIZING')}</span>
                </>
              ) : (
                <>
                  <Icons.Key size={18} />
                  <span>{t('DEVICE.AUTHORIZE')}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
