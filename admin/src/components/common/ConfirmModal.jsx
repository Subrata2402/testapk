import React from 'react';
import { AlertTriangle } from 'lucide-react';
import './ConfirmModal.css';

export default function ConfirmModal({ config, onClose }) {
  if (!config) return null;
  const { 
    title, 
    message, 
    onConfirm, 
    isLoading, 
    confirmText, 
    confirmLoadingText, 
    cancelText,
    icon: Icon = AlertTriangle 
  } = config;

  const handleConfirm = async () => {
    await onConfirm?.();
    onClose();
  };

  return (
    <div className="confirm-overlay" onClick={onClose}>
      <div className="confirm-modal glass-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon-wrapper">
          <Icon size={26} />
        </div>
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="btn btn-secondary" onClick={onClose} disabled={isLoading}>
            {cancelText || 'Cancel'}
          </button>
          <button className="btn btn-danger" onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? (confirmLoadingText || 'Confirming...') : (confirmText || 'Confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
