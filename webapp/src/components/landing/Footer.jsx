'use client';

import React from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';

export default function Footer({ t, onContactClick }) {
  return (
    <footer className="landing-footer glass-card">
      <div className="footer-left">
        <Icons.Cpu size={18} className="text-cyan" />
        <span>&copy; {new Date().getFullYear()} TestAPK. {t('LANDING.ALL_RIGHTS_RESERVED')}</span>
      </div>
      <div className="footer-right">
        <Link href="/faq" className="footer-link">{t('FAQ.TITLE')}</Link>
        <Link href="/privacy" className="footer-link">{t('LANDING.PRIVACY_POLICY')}</Link>
        <Link href="/terms" className="footer-link">{t('LANDING.TERMS_OF_SERVICE')}</Link>
        <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); onContactClick(); }}>{t('LANDING.CONTACT_SUPPORT')}</a>
      </div>
    </footer>
  );
}
