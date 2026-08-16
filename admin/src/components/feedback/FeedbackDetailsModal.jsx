import React from 'react';
import { MessageSquare, Star, X } from 'lucide-react';

export default function FeedbackDetailsModal({ feedback, onClose, t }) {
  if (!feedback) return null;

  return (
    <div className="modal-overlay flex-center" onClick={onClose}>
      <div className="support-details-modal glass-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <MessageSquare size={20} className="modal-title-icon" />
            <h4>{t('support.view')}</h4>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-row">
            <div className="detail-content">
              <span className="detail-label">{t('feedback.user')}</span>
              <span className="detail-value">
                {feedback.userId ? `${feedback.userId.name} (${feedback.userId.email})` : t('feedback.anonymous')}
              </span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-content">
              <span className="detail-label">{t('feedback.category')}</span>
              <span className="detail-value">
                {t(`feedback.categories.${feedback.category}`)}
              </span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-content">
              <span className="detail-label">{t('feedback.rating')}</span>
              <div className="feedback-modal-rating-container">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    fill={star <= feedback.rating ? 'var(--accent-warning)' : 'none'}
                    color="var(--accent-warning)"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-content">
              <span className="detail-label">{t('feedback.titleLabel')}</span>
              <span className="detail-value font-semibold">{feedback.title}</span>
            </div>
          </div>

          <div className="message-box">
            <span className="detail-label">{t('feedback.description')}</span>
            <p className="message-content">{feedback.description}</p>
          </div>

          {feedback.deviceInfo && (
            <div className="message-box feedback-device-info-box">
              <span className="detail-label">{t('feedback.deviceInfo')}</span>
              <pre className="message-content feedback-device-info-pre">
                {JSON.stringify(feedback.deviceInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
