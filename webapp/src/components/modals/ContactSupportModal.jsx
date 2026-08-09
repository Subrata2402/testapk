import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { supportService } from '../../services/api';
import './ContactSupportModal.css';
import { useTranslation } from '../../context/LanguageContext';

export default function ContactSupportModal({ isOpen, onClose, user }) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (isOpen) {
      setName(user?.name || '');
      setEmail(user?.email || '');
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
      setIsSubmitted(false);
      setError(null);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      return;
    }
    setIsSubmitting(true);
    setError(null);
    
    try {
      await supportService.contactSupport(name, email, subject, message);

      setIsSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('Contact Support Error:', err);
      setError(err.message || t('CONTACT.ERROR'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay flex-center" onClick={onClose}>
      <div className="modal-container glass-card animate-fade-in" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <Icons.X size={20} />
        </button>

        {isSubmitted ? (
          <div className="success-state flex-center" style={{ padding: '20px 0' }}>
            <div className="success-icon-wrapper flex-center" style={{ marginBottom: '16px' }}>
              <Icons.CheckCircle size={48} className="success-icon" />
            </div>
            <h2>{t('CONTACT.SUCCESS_TITLE')}</h2>
            <p style={{ textAlign: 'center', marginTop: '8px', color: 'var(--text-muted)' }}>
              {t('CONTACT.SUCCESS_DESC')}
            </p>
            <button className="btn btn-primary mt-4" onClick={() => setIsSubmitted(false)}>
              {t('CONTACT.SEND_ANOTHER')}
            </button>
          </div>
        ) : (
          <>
            <div className="contact-header" style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div className="contact-icon-wrapper flex-center" style={{ margin: '0 auto 12px auto', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                <Icons.Mail size={28} className="contact-icon" style={{ color: '#06b6d4' }} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{t('CONTACT.TITLE')}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
                {t('CONTACT.SUBTITLE')}
              </p>
            </div>

            {error && (
              <div className="error-banner" style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '0.9rem' }}>
                <Icons.AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  {t('CONTACT.NAME')}
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder={t('CONTACT.NAME_PLACEHOLDER')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  {t('CONTACT.EMAIL')}
                </label>
                <input
                  type="type"
                  id="email"
                  className="form-input"
                  placeholder={t('CONTACT.EMAIL_PLACEHOLDER')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  {t('CONTACT.SUBJECT')}
                </label>
                <input
                  type="text"
                  id="subject"
                  className="form-input"
                  placeholder={t('CONTACT.SUBJECT_PLACEHOLDER')}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  {t('CONTACT.MESSAGE')}
                </label>
                <textarea
                  id="message"
                  className="form-input"
                  placeholder={t('CONTACT.MESSAGE_PLACEHOLDER')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  required
                  disabled={isSubmitting}
                  style={{ resize: 'none' }}
                />
              </div>

              <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting} style={{ width: '100%', marginTop: '8px' }}>
                {isSubmitting ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                    <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
                    <span>{t('CONTACT.SENDING')}</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                    <Icons.Send size={16} />
                    <span>{t('CONTACT.SEND')}</span>
                  </div>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
