import React from 'react';
import * as Icons from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, languages } from '../../context/LanguageContext';
import CustomDropdown from '../common/CustomDropdown';

export default function Navbar({ user, onLoginClick }) {
  const navigate = useNavigate();
  const { language, changeLanguage, t } = useTranslation();

  return (
    <header className="global-navbar glass-card">
      <div className="container nav-container">
        <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <Icons.Cpu size={24} className="logo-icon" />
          <span className="logo-text">TestAPK</span>
        </div>

        <div className="nav-actions">
          <CustomDropdown
            options={languages.map((lang) => ({
              value: lang.code,
              label: `${lang.flag}\u00A0\u00A0\u00A0\u00A0${lang.name}`,
            }))}
            value={language}
            onChange={changeLanguage}
          />

          {user ? (
            <div className="user-nav-profile" title={user.email} onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
              <div className="user-nav-avatar">{user.avatar}</div>
              <span className="user-nav-name">{user.name.split(' ')[0]}</span>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={onLoginClick}>
              <Icons.LogIn size={16} /> {t('NAVBAR.SIGN_IN')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
