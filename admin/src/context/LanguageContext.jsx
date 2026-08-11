import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import es from '../locales/es.json';
import pt from '../locales/pt.json';
import hi from '../locales/hi.json';
import fr from '../locales/fr.json';
import de from '../locales/de.json';
import ja from '../locales/ja.json';
import zh from '../locales/zh.json';
import ar from '../locales/ar.json';

const translations = { en, es, pt, hi, fr, de, ja, zh, ar };

const LanguageContext = createContext(null);

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '简体中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', isRtl: true },
];

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('admin_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('admin_language', language);
    
    // Handle RTL layout for Arabic
    const currentLang = languages.find(l => l.code === language);
    if (currentLang?.isRtl) {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = language;
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  const changeLanguage = (code) => {
    if (translations[code]) {
      setLanguage(code);
    }
  };

  const t = (keyPath, params = []) => {
    const keys = keyPath.split('.');
    let value = translations[language];
    
    for (const key of keys) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        value = null;
        break;
      }
    }

    // Fallback to English
    if (value === null || value === undefined) {
      value = translations['en'];
      for (const key of keys) {
        if (value && value[key] !== undefined) {
          value = value[key];
        } else {
          value = null;
          break;
        }
      }
    }

    if (value === null || value === undefined) {
      return keyPath;
    }

    if (typeof value !== 'string') {
      return keyPath;
    }

    // Interpolate parameters
    let result = value;
    params.forEach((param, index) => {
      result = result.replace(`{${index}}`, param);
    });

    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
