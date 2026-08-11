import React from 'react';
import { Mail, X, User as UserIcon, Calendar } from 'lucide-react';

export default function SupportDetailsModal({ request, onClose, t }) {
  if (!request) return null;

  return (
    <div className="modal-overlay flex-center" onClick={onClose}>
      <div className="support-details-modal glass-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Mail size={20} className="modal-title-icon" />
            <h4>{t('support.view')}</h4>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-row">
            <UserIcon size={16} className="detail-icon" />
            <div className="detail-content">
              <span className="detail-label">{t('support.name')}</span>
              <span className="detail-value">{request.name}</span>
            </div>
          </div>

          <div className="detail-row">
            <Mail size={16} className="detail-icon" />
            <div className="detail-content">
              <span className="detail-label">{t('support.email')}</span>
              <a href={`mailto:${request.email}`} className="detail-value text-link">
                {request.email}
              </a>
            </div>
          </div>

          <div className="detail-row">
            <Calendar size={16} className="detail-icon" />
            <div className="detail-content">
              <span className="detail-label">{t('support.date')}</span>
              <span className="detail-value">
                {new Date(request.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="detail-row subject-row">
            <div className="detail-content">
              <span className="detail-label">{t('support.subject')}</span>
              <span className="detail-value subject-value">{request.subject}</span>
            </div>
          </div>

          <div className="message-box">
            <span className="detail-label">{t('support.message')}</span>
            <p className="message-content">{request.message}</p>
          </div>
        </div>

        <div className="modal-footer">
          <a
            href={`mailto:${request.email}?subject=Re: ${request.subject}`}
            className="btn btn-primary"
          >
            {t('support.reply')}
          </a>
        </div>
      </div>
    </div>
  );
}
