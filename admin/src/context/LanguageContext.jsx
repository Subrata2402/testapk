import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import es from '../locales/es.json';

const translations = { en, es };

const LanguageContext = createContext(null);

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('admin_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('admin_language', language);
    document.documentElement.lang = language;
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
