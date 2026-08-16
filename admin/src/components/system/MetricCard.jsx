import React from 'react';

export default function MetricCard({
  label,
  value,
  icon: Icon,
  progress,
  progressClass,
  description,
  iconBgColor,
  iconColor,
}) {
  return (
    <div className="stat-card glass-card">
      <div className="stat-card-header">
        <span className="stat-label">{label}</span>
        <div 
          className="stat-icon-wrapper" 
          style={{ backgroundColor: iconBgColor, color: iconColor }}
        >
          <Icon size={20} />
        </div>
      </div>
      <span className={`stat-value ${progress === undefined ? 'health-value-small' : ''}`}>
        {value}
      </span>
      {progress !== undefined && (
        <div className="progress-bar-container health-progress-container">
          <div 
            className={`health-progress-bar ${progressClass}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <span className={progress !== undefined ? 'text-muted health-card-desc' : 'text-muted health-card-desc-large'}>
        {description}
      </span>
    </div>
  );
}
