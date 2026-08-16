import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function FlutterVersionsCard({ versions, downloadLink, onAddVersion, onRemoveVersion, onDownloadLinkChange, t }) {
  const [newVersion, setNewVersion] = useState('');
  const [newBuildNumber, setNewBuildNumber] = useState('');

  const handleAdd = () => {
    if (!newVersion.trim() || !newBuildNumber.trim()) return;
    const buildNum = parseInt(newBuildNumber);
    if (isNaN(buildNum)) return;

    const exists = versions.some(
      (v) => v.version === newVersion.trim() && v.buildNumber === buildNum
    );
    if (exists) return;

    onAddVersion({ version: newVersion.trim(), buildNumber: buildNum });
    setNewVersion('');
    setNewBuildNumber('');
  };

  return (
    <div className="glass-card settings-card">
      <div>
        <h4 className="settings-card-title">{t('settings.flutterAppVersions') || 'Flutter App Version Management'}</h4>
        <p className="text-muted settings-desc">
          {t('settings.flutterAppVersionsDesc') || 'Manage allowed Flutter app versions and the latest download link.'}
        </p>
      </div>

      {/* Add Version Form */}
      <div className="settings-version-inputs">
        <div className="settings-flex-1">
          <label className="text-muted settings-input-label">{t('settings.versionLabel') || 'Version (e.g. 1.0.0)'}</label>
          <input
            type="number"
            placeholder="1.0.0"
            value={newVersion}
            onChange={(e) => setNewVersion(e.target.value)}
            className="filter-input settings-width-100"
          />
        </div>
        <div className="settings-flex-1">
          <label className="text-muted settings-input-label">{t('settings.buildNumberLabel') || 'Build Number (e.g. 3)'}</label>
          <input
            type="number"
            placeholder="3"
            value={newBuildNumber}
            onChange={(e) => setNewBuildNumber(e.target.value)}
            className="filter-input settings-width-100"
          />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="btn btn-secondary settings-add-btn"
        >
          <Plus size={16} />
          <span>{t('settings.addVersionBtn') || 'Add Version'}</span>
        </button>
      </div>

      {/* Version List */}
      {versions && versions.length > 0 ? (
        <div className="settings-version-list">
          <label className="text-muted settings-list-label">{t('settings.allowedVersionsLabel') || 'Allowed Versions'}</label>
          <div className="settings-version-items">
            {versions.map((v, idx) => (
              <div key={idx} className="glass-card settings-version-item">
                <span>
                  <strong>{t('settings.version') || 'Version'}:</strong> {v.version}&nbsp;&nbsp;|&nbsp;&nbsp; <strong>{t('settings.build') || 'Build'}:</strong> {v.buildNumber}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveVersion(idx)}
                  className="btn btn-danger settings-remove-btn"
                >
                  <Trash2 size={14} />
                  <span>{t('settings.removeBtn') || 'Remove'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-muted settings-no-versions">
          {t('settings.noVersionsAdded') || 'No versions added yet. If empty, all versions will be considered invalid (mandatory update).'}
        </p>
      )}

      {/* Download Link */}
      <div className="settings-download-link-container">
        <label className="text-muted settings-input-label">{t('settings.latestVersionDownloadLink') || 'Latest Version Download Link'}</label>
        <input
          type="text"
          placeholder="https://example.com/app.apk"
          value={downloadLink}
          onChange={(e) => onDownloadLinkChange(e.target.value)}
          className="filter-input settings-width-100"
        />
      </div>
    </div>
  );
}
