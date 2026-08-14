import React, { useState } from 'react';
import { Wrench, RefreshCw } from 'lucide-react';
import { settingService } from '../../services/api';
import { useTranslation } from '../../context/LanguageContext';
import './MaintenanceScreen.css';

export default function MaintenanceScreen({ onMaintenanceEnd }) {
  const { t } = useTranslation();
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState(null);

  const handleRetry = async () => {
    setIsChecking(true);
    setError(null);
    try {
      const response = await settingService.getPublicSettings();
      if (response.status === 'success') {
        const isMaintenanceActive = response.data.settings?.maintenance_mode ?? false;
        if (!isMaintenanceActive) {
          onMaintenanceEnd();
        } else {
          setError(t('MAINTENANCE.STILL_ACTIVE'));
        }
      } else {
        setError(t('MAINTENANCE.CHECK_FAILED'));
      }
    } catch (err) {
      console.error('Failed to check maintenance status:', err);
      setError(t('MAINTENANCE.CHECK_FAILED'));
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="maintenance-overlay">
      <div className="maintenance-card glass-card animate-fade-in">
        <div className="maintenance-icon-container">
          <div className="maintenance-icon-pulse"></div>
          <Wrench size={48} className="maintenance-icon text-cyan" />
        </div>
        
        <h1 className="maintenance-title">{t('MAINTENANCE.TITLE')}</h1>
        <p className="maintenance-description">
          {t('MAINTENANCE.DESCRIPTION')}
        </p>

        {error && (
          <div className="maintenance-error animate-fade-in">
            {error}
          </div>
        )}

        <button 
          onClick={handleRetry} 
          disabled={isChecking}
          className="btn btn-primary maintenance-btn flex-center gap-2"
        >
          <RefreshCw size={18} className={isChecking ? 'spin' : ''} />
          <span>{isChecking ? t('DASHBOARD.PREPARING') : t('MAINTENANCE.CHECK_AGAIN')}</span>
        </button>
      </div>
    </div>
  );
}
