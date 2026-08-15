import React from 'react';
import * as Icons from 'lucide-react';

export default function ReleasesTab({ appDetails, testapkDownloadLink, t }) {
  return (
    <div className="releases-tab">
      <h3>{t('LANDING.ALL_RELEASES')}</h3>
      <div className="releases-timeline">
        {appDetails.releases.map((release, index) => (
          <div key={index} className="release-timeline-item">
            <div className="release-timeline-badge" />
            <div className="release-timeline-content glass-card">
              <div className="release-header">
                <div className="release-title-info">
                  <h4>Version {release.version}</h4>
                  <span className="badge badge-secondary">Build {release.buildNumber}</span>
                </div>
                <span className="release-date">
                  {new Date(release.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="release-notes">
                <h5>{t('LANDING.WHATS_NEW')}</h5>
                <p>{release.releaseNotes}</p>
              </div>

              <div className="release-footer release-tab-footer">
                <span className="release-size">
                  <Icons.FileText size={14} />
                  <span>{release.size}</span>
                </span>
                <a
                  href={`${testapkDownloadLink}`}
                  download="testapk.apk"
                  className="btn btn-primary btn-sm flex-center gap-1 release-download-btn"
                >
                  <Icons.Download size={12} />
                  <span>{t('LANDING.DOWNLOAD_APK')}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
