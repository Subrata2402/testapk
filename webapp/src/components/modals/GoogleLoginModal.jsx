'use client';

import React, { useState, useRef, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { useGoogleOAuth } from '@react-oauth/google';
import googleIcon from '../../assets/google-icon-logo.svg';
import { authService } from '../../services/api';
import { useTranslation } from '../../context/LanguageContext';

export default function GoogleLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const { t } = useTranslation();
  const { clientId, scriptLoadedSuccessfully } = useGoogleOAuth();
  const btnContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onLoginSuccessRef = useRef(onLoginSuccess);
  onLoginSuccessRef.current = onLoginSuccess;

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await authService.loginWithGoogle(credentialResponse.credential);

      // Save token to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
      }

      onLoginSuccessRef.current({
        name: data.data.user.name,
        email: data.data.user.email,
        avatar: data.data.user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
        picture: data.data.user.picture,
        role: data.data.user.role,
        isDriveConfigured: data.data.user.isDriveConfigured,
      });
      onClose();
    } catch (err) {
      console.error('Google Auth Error:', err);
      setError(err.message || t('AUTH.FAILED_AUTHENTICATE'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessRef = useRef(handleGoogleSuccess);
  handleSuccessRef.current = handleGoogleSuccess;

  useEffect(() => {
    if (!isOpen || !scriptLoadedSuccessfully || !btnContainerRef.current) return;
    if (typeof window === 'undefined' || !window.google?.accounts?.id) return;

    // Ensure Google Identity Services is initialized only once in this browser session
    if (!window.__gsiInitialized) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (res) => handleSuccessRef.current(res),
        use_fedcm_for_prompt: false,
        auto_select: false,
      });
      window.__gsiInitialized = true;
    }

    try {
      btnContainerRef.current.innerHTML = '';
      window.google.accounts.id.renderButton(btnContainerRef.current, {
        theme: 'filled_blue',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        width: 300,
      });
    } catch (err) {
      console.error('Error rendering Google button:', err);
    }

    return () => {
      if (typeof window !== 'undefined' && window.google?.accounts?.id?.cancel) {
        window.google.accounts.id.cancel();
      }
    };
  }, [isOpen, scriptLoadedSuccessfully, clientId]);

  if (!isOpen) return null;

  const iconSrc = typeof googleIcon === 'object' && googleIcon?.src ? googleIcon.src : googleIcon;

  return (
    <div className="modal-overlay flex-center" onClick={onClose}>
      <div
        className="modal-container glass-card animate-fade-in"
        style={{ maxWidth: '420px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <Icons.X size={20} />
        </button>

        <div className="google-login-header">
          <div className="google-logo">
            <img src={iconSrc} alt="google-icon" height={40} width={40} />
          </div>
          <h2>{t('AUTH.SIGN_IN_TITLE')}</h2>
          <p>{t('AUTH.SIGN_IN_SUBTITLE')}</p>
        </div>

        {error && (
          <div className="error-banner" style={{ margin: '0 0 16px 0' }}>
            <Icons.AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="google-login-body flex-center" style={{ minHeight: '80px', flexDirection: 'column' }}>
          {isLoading ? (
            <div className="google-loading-state">
              <div className="spinner"></div>
              <p>{t('AUTH.AUTHENTICATING')}</p>
              <span className="loading-subtext">{t('AUTH.AUTHENTICATING_SUBTEXT')}</span>
            </div>
          ) : (
            <>
              {!scriptLoadedSuccessfully && (
                <div className="google-loading-state">
                  <div className="spinner"></div>
                </div>
              )}
              <div
                ref={btnContainerRef}
                style={{
                  minHeight: '44px',
                  display: scriptLoadedSuccessfully ? 'flex' : 'none',
                  justifyContent: 'center',
                }}
              />
            </>
          )}
        </div>

        <div className="google-login-footer">
          <p>{t('AUTH.SIGN_IN_FOOTER')}</p>
        </div>
      </div>
    </div>
  );
}
