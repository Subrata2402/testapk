import React, { useState, useRef } from 'react';
import * as Icons from 'lucide-react';
import CustomDropdown from '../common/CustomDropdown';
import { appService, API_BASE_URL } from '../../services/api';
import './AppDetails.css';
import { useTranslation } from '../../context/LanguageContext';

export default function AppDetails({ app, user, onUpdateApp, showAlert, showConfirm }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('releases'); // 'releases' | 'collaborators'
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Tester');
  const [members, setMembers] = useState([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);

  const currentUserMember = members.find(m => m.email.toLowerCase() === user.email.toLowerCase());
  const canUpload = currentUserMember && (currentUserMember.role === 'Owner' || currentUserMember.role === 'Developer');
  const canInvite = currentUserMember && (currentUserMember.role === 'Owner' || currentUserMember.role === 'Developer');

  // APK Upload States
  const [isDragging, setIsDragging] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPhase, setUploadPhase] = useState('uploading'); // 'uploading' | 'processing'
  const [showReleaseForm, setShowReleaseForm] = useState(false);

  // Release Form States
  const [version, setVersion] = useState('');
  const [buildNumber, setBuildNumber] = useState('');
  const [releaseNotes, setReleaseNotes] = useState('');

  const [selectedRelease, setSelectedRelease] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [downloadingBuild, setDownloadingBuild] = useState(null);

  const fileInputRef = useRef(null);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;

      const hasTime = dateStr.includes('T') || dateStr.includes(':');

      if (hasTime) {
        return date.toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      } else {
        return date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      }
    } catch (_) {
      return dateStr;
    }
  };

  const [releases, setReleases] = useState([]);
  const [isLoadingReleases, setIsLoadingReleases] = useState(false);

  const fetchReleases = async () => {
    setIsLoadingReleases(true);
    try {
      const data = await appService.getReleases(app._id || app.id);
      if (data.status === 'success') {
        setReleases(data.data.releases);
      }
    } catch (err) {
      console.error('Failed to fetch releases:', err);
    } finally {
      setIsLoadingReleases(false);
    }
  };

  const fetchMembers = async () => {
    setIsLoadingMembers(true);
    try {
      const data = await appService.getMembers(app._id || app.id);
      if (data.status === 'success') {
        setMembers(data.data.members);
      }
    } catch (err) {
      console.error('Failed to fetch members:', err);
    } finally {
      setIsLoadingMembers(false);
    }
  };

  // Reset upload states and fetch releases/members when app changes
  React.useEffect(() => {
    setUploadFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setUploadPhase('uploading');
    setShowReleaseForm(false);
    setReleaseNotes('');
    setSelectedRelease(null);
    setInviteEmail('');
    fetchReleases();
    fetchMembers();
  }, [app._id, app.id]);

  // Helper to render dynamic Lucide icons
  const IconComponent = Icons[app.icon] || Icons.HelpCircle;

  // Drag and Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const validateAndProcessFile = (file) => {
    if (!file.name.endsWith('.apk')) {
      showAlert(t('DASHBOARD.UPLOAD_ONLY_APK'), 'Error', 'error');
      return;
    }
    setUploadFile(file);
    setShowReleaseForm(true);
  };

  const handleReleaseSubmit = async (e) => {
    e.preventDefault();
    if (!releaseNotes || !uploadFile) {
      showAlert(t('DASHBOARD.FILL_ALL_DETAILS'), 'Error', 'error');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) return;

    setIsUploading(true);
    setUploadPhase('uploading');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('releaseNotes', releaseNotes);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_BASE_URL}/apps/${app._id || app.id}/releases`);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
          if (percentComplete === 100) {
            // File sent to server; now server is uploading to Google Drive
            setUploadPhase('processing');
          }
        }
      };

      xhr.onload = async () => {
        setIsUploading(false);
        if (xhr.status === 201) {
          const responseData = JSON.parse(xhr.responseText);
          onUpdateApp(responseData.data.app);
          setReleases(prev => [responseData.data.release, ...prev]);
          setUploadFile(null);
          setShowReleaseForm(false);
          setReleaseNotes('');
        } else {
          let errorMsg = t('DASHBOARD.UPLOAD_FAILED');
          try {
            const errorData = JSON.parse(xhr.responseText);
            errorMsg = errorData.message || errorMsg;
          } catch (_) { }
          showAlert(errorMsg, 'Error', 'error');
        }
      };

      xhr.onerror = () => {
        setIsUploading(false);
        showAlert(t('DASHBOARD.UPLOAD_ERROR'), 'Error', 'error');
      };

      xhr.send(formData);
    } catch (err) {
      console.error('Upload failed:', err);
      setIsUploading(false);
      showAlert(t('DASHBOARD.UPLOAD_FAILED'), 'Error', 'error');
    }
  };

  const handleDownload = async (buildNumber, version) => {
    setDownloadingBuild(buildNumber);
    try {
      const response = await appService.getDownloadBlob(app._id || app.id, buildNumber);

      if (!response.ok) {
        const data = await response.json();
        const errorMsg = data.message || data.error?.message || t('DASHBOARD.DOWNLOAD_FAILED');
        showAlert(errorMsg, 'Error', 'error');
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${app.name.replace(/\s+/g, '_')}_v${version}.apk`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      showAlert(t('DASHBOARD.DOWNLOAD_FAILED'), 'Error', 'error');
    } finally {
      setDownloadingBuild(null);
    }
  };

  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    if (!inviteEmail) return;

    // Check if already invited
    if (members.some(m => m.email.toLowerCase() === inviteEmail.toLowerCase())) {
      showAlert(t('DASHBOARD.ALREADY_MEMBER'), 'Error', 'error');
      return;
    }

    setIsInviting(true);
    try {
      const data = await appService.inviteMember(app._id || app.id, inviteEmail, inviteRole);
      if (data.status === 'success') {
        onUpdateApp(data.data.app);
        setMembers(data.data.app.members);
        setInviteEmail('');
        showAlert(t('DASHBOARD.INVITE_SUCCESS'), 'Success', 'success');
      } else {
        showAlert(data.message || t('DASHBOARD.INVITE_FAILED'), 'Error', 'error');
      }
    } catch (err) {
      console.error('Failed to send invitation:', err);
      showAlert(t('DASHBOARD.INVITE_FAILED'), 'Error', 'error');
    } finally {
      setIsInviting(false);
    }
  };

  const handleRemoveMember = (emailToRemove) => {
    if (emailToRemove === user.email) {
      showAlert(t('DASHBOARD.REMOVE_SELF_ERROR'), 'Error', 'error');
      return;
    }

    showConfirm(
      t('DASHBOARD.CONFIRM_REMOVE_MEMBER', [emailToRemove]),
      async () => {
        setIsRemoving(true);
        try {
          const data = await appService.removeMember(app._id || app.id, emailToRemove);
          if (data.status === 'success') {
            onUpdateApp(data.data.app);
            setMembers(data.data.app.members);
            showAlert(t('DASHBOARD.REMOVE_SUCCESS'), 'Success', 'success');
          } else {
            showAlert(data.message || t('DASHBOARD.REMOVE_FAILED'), 'Error', 'error');
          }
        } catch (err) {
          console.error('Failed to remove member:', err);
          showAlert(t('DASHBOARD.REMOVE_FAILED'), 'Error', 'error');
        } finally {
          setIsRemoving(false);
        }
      },
      t('DASHBOARD.REMOVE_MEMBER')
    );
  };

  const handleDeleteRelease = (buildNumberToDelete) => {
    showConfirm(
      t('DASHBOARD.CONFIRM_DELETE_RELEASE_DESC'),
      async () => {
        setIsDeleting(true);
        try {
          const data = await appService.deleteRelease(app._id || app.id, buildNumberToDelete);
          if (data.status === 'success') {
            onUpdateApp(data.data.app);
            setReleases(prev => prev.filter(r => r.buildNumber !== buildNumberToDelete));
            showAlert(t('DASHBOARD.DELETE_SUCCESS'), 'Success', 'success');
          } else {
            showAlert(data.message || t('DASHBOARD.DELETE_FAILED'), 'Error', 'error');
          }
        } catch (err) {
          console.error('Failed to delete release:', err);
          showAlert(t('DASHBOARD.DELETE_FAILED'), 'Error', 'error');
        } finally {
          setIsDeleting(false);
        }
      },
      t('DASHBOARD.DELETE_RELEASE')
    );
  };

  return (
    <div className="app-details-container animate-fade-in">
      {/* App Header */}
      <header className="app-details-header glass-card">
        <div className="app-header-main">
          <div className="app-icon-wrapper-sm">
            {app.icon && (app.icon.startsWith('data:') || app.icon.startsWith('http')) ? (
              <img src={app.icon} alt={app.name} className="app-icon-img" style={{ width: '50px', height: '50px', borderRadius: '9px', objectFit: 'cover' }} />
            ) : (
              <IconComponent size={32} />
            )}
          </div>
          <div className="app-header-info">
            <div className="app-header-title-row">
              <h2>{app.name}</h2>
            </div>
            <code>{app.packageName}</code>
          </div>
        </div>
        <div className="app-header-actions">
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="tabs-header">
        <button
          className={`tab-btn ${activeTab === 'releases' ? 'active' : ''}`}
          onClick={() => setActiveTab('releases')}
        >
          <Icons.Layers size={16} /> {t('DASHBOARD.RELEASES_AND_UPLOADS')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'collaborators' ? 'active' : ''}`}
          onClick={() => setActiveTab('collaborators')}
        >
          <Icons.Users size={16} /> {t('DASHBOARD.COLLABORATORS_AND_TESTERS', [members.length])}
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content-wrapper">
        {activeTab === 'releases' ? (
          <div className="releases-tab-content">
            {/* Upload Area */}
            {canUpload && !showReleaseForm && !isUploading && (
              <div
                className={`upload-zone glass-card ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".apk"
                  style={{ display: 'none' }}
                />
                <div className="upload-prompt">
                  <Icons.UploadCloud size={48} className="upload-icon" />
                  <h3>{t('DASHBOARD.DRAG_DROP_APK')}</h3>
                  <p>{t('DASHBOARD.OR_CLICK_BROWSE')}</p>
                  <span className="upload-limits">{t('DASHBOARD.MAX_FILE_SIZE')}</span>
                </div>
              </div>
            )}

            {/* Upload Progress */}
            {isUploading && (
              <div className="upload-zone glass-card uploading">
                <div className="upload-progress-container">
                  <div className="spinner"></div>
                  {uploadPhase === 'uploading' ? (
                    <>
                      <h3>{t('DASHBOARD.UPLOADING_FILE', [uploadFile?.name])}</h3>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                      <span>{uploadProgress}% — {t('DASHBOARD.UPLOADING_FILE', ['']).replace('…', '')}</span>
                    </>
                  ) : (
                    <>
                      <h3>{t('DASHBOARD.SAVING_TO_DRIVE')}</h3>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill progress-bar-pulse"></div>
                      </div>
                      <span>{t('DASHBOARD.PROCESSING_DESC')}</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Release Details Form (Shown after file is selected) */}
            {showReleaseForm && !isUploading && (
              <div className="release-form-container glass-card animate-fade-in">
                <div className="release-form-header">
                  <Icons.FileCheck size={24} className="text-success" />
                  <div>
                    <h3>{t('DASHBOARD.CONFIGURE_RELEASE')}</h3>
                    <p><span>{t('DASHBOARD.SELECTED_FILE', ['']).replace(': ', '')}: <strong>{uploadFile?.name}</strong></span></p>
                  </div>
                </div>

                <form onSubmit={handleReleaseSubmit} className="release-form">
                  <div className="form-group">
                    <label className="form-label">{t('DASHBOARD.RELEASE_NOTES')}</label>
                    <textarea
                      className="form-textarea"
                      placeholder={t('DASHBOARD.RELEASE_NOTES_PLACEHOLDER')}
                      value={releaseNotes}
                      onChange={(e) => setReleaseNotes(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => { setUploadFile(null); setShowReleaseForm(false); setReleaseNotes(''); }}>
                      {t('DASHBOARD.CANCEL')}
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {t('DASHBOARD.PUBLISH_RELEASE')}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Releases List */}
            <div className="releases-list-section">
              <h3>{t('DASHBOARD.RELEASE_HISTORY')}</h3>
              {isLoadingReleases ? (
                <div className="empty-state glass-card flex-center">
                  <Icons.Loader size={32} className="empty-icon animate-spin" />
                  <p>{t('DASHBOARD.LOADING_RELEASES')}</p>
                </div>
              ) : releases.length === 0 ? (
                <div className="empty-state glass-card flex-center">
                  <Icons.Layers size={32} className="empty-icon" />
                  <p>
                    {canUpload
                      ? t('DASHBOARD.NO_RELEASES_UPLOAD_FIRST')
                      : t('DASHBOARD.NO_RELEASES')}
                  </p>
                </div>
              ) : (
                <div className="dashboard-releases-grid">
                  {releases.map((release) => (
                    <div
                      key={release.buildNumber}
                      className="dashboard-release-card glass-card"
                      onClick={() => setSelectedRelease(release)}
                    >
                      <div className="release-card-header">
                        <div className="release-card-header-main">
                          {release.appIcon ? (
                            <img src={release.appIcon} alt={release.appName || app.name} className="release-card-icon" />
                          ) : (
                            <div className="release-card-icon-fallback">
                              <Icons.Smartphone size={24} />
                            </div>
                          )}
                          <div className="release-card-title-info">
                            <h4>{release.appName || app.name}</h4>
                            <span className="badge badge-secondary">{t('DASHBOARD.BUILD_NUM', [release.buildNumber])}</span>
                          </div>
                        </div>
                        <span className="release-card-date">{formatDate(release.date)}</span>
                      </div>
                      <p className="release-card-notes">{release.releaseNotes}</p>
                      <div className="release-card-footer">
                        <span className="release-card-size">
                          <Icons.File size={14} /> {release.size} | v{release.version}
                        </span>
                        <div className="release-card-actions" onClick={(e) => e.stopPropagation()}>
                          {canUpload && (
                            <button
                              className="btn btn-danger btn-sm btn-icon-only"
                              onClick={() => handleDeleteRelease(release.buildNumber)}
                              title={t('DASHBOARD.DELETE_RELEASE')}
                            >
                              <Icons.Trash2 size={14} />
                            </button>
                          )}
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleDownload(release.buildNumber, release.version)}
                            disabled={downloadingBuild !== null}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                          >
                            {downloadingBuild === release.buildNumber ? (
                              <>
                                <Icons.Loader size={14} className="animate-spin" /> {t('DASHBOARD.PREPARING')}
                              </>
                            ) : (
                              <>
                                <Icons.Download size={14} /> {t('DASHBOARD.DOWNLOAD')}
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="collaborators-tab-content animate-fade-in">
            {/* Invite Form */}
            {canInvite ? (
              <div className="invite-form-container glass-card">
                <h3>{t('DASHBOARD.INVITE_COLLABORATOR')}</h3>
                <p className="invite-desc">{t('DASHBOARD.INVITE_DESC')}</p>

                <form onSubmit={handleInviteSubmit} className="invite-form">
                  <div className="form-group" style={{ flex: 2 }}>
                    <label className="form-label">{t('CONTACT.EMAIL')}</label>
                    <div className="input-with-icon">
                      <Icons.Mail size={16} className="input-icon" />
                      <input
                        type="email"
                        className="form-input"
                        placeholder={t('DASHBOARD.INVITE_EMAIL_PLACEHOLDER')}
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        required
                        style={{ paddingLeft: '40px' }}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">{t('DASHBOARD.ROLE')}</label>
                    <CustomDropdown
                      options={['Developer', 'Tester']}
                      value={inviteRole}
                      onChange={setInviteRole}
                    />
                  </div>

                  <div className="form-group" style={{ justifyContent: 'flex-end' }}>
                    <label className="form-label" style={{ visibility: 'hidden' }}>Invite</label>
                    <button type="submit" className="btn btn-primary invite-btn">
                      <Icons.UserPlus size={16} /> {t('DASHBOARD.SEND_INVITATION')}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '24px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Icons.Lock size={24} style={{ color: 'rgba(255, 255, 255, 0.2)' }} />
                <p style={{ margin: 0 }}>{t('DASHBOARD.INVITE_LOCK_DESC')}</p>
              </div>
            )}

            {/* Collaborators List */}
            <div className="collaborators-list-section">
              <h3>{t('DASHBOARD.TEAM_MEMBERS')}</h3>
              {isLoadingMembers ? (
                <div className="empty-state glass-card flex-center" style={{ minHeight: '150px' }}>
                  <Icons.Loader size={32} className="empty-icon animate-spin" />
                  <p>{t('DASHBOARD.LOADING_MEMBERS')}</p>
                </div>
              ) : (
                <div className="collaborators-list glass-card">
                  {members.map((member, idx) => (
                  <div key={idx} className="collaborator-item">
                    <div className="collaborator-info-main">
                      <div className="collaborator-avatar">
                        {(member.name || member.email).substring(0, 2).toUpperCase()}
                      </div>
                      <div className="collaborator-details">
                        <span className="collaborator-name" style={{ fontWeight: '600', color: '#ffffff' }}>{member.name || member.email.split('@')[0]}</span>
                        <span className="collaborator-email" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{member.email}</span>
                        <span className="collaborator-role-badge" style={{ marginTop: '4px' }}>
                          <span className={`badge ${member.role === 'Owner' ? 'badge-primary' : member.role === 'Developer' ? 'badge-secondary' : 'badge-success'}`}>
                            {member.role}
                          </span>
                          {member.status === 'Pending' && (
                            <span className="badge badge-warning" style={{ marginLeft: '8px' }}>
                              {t('DASHBOARD.PENDING')}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    {member.role !== 'Owner' && canInvite && (
                      <button className="btn btn-danger btn-sm btn-icon-only" onClick={() => handleRemoveMember(member.email)} title={t('DASHBOARD.REMOVE_MEMBER')}>
                        <Icons.UserMinus size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          </div>
        )}
      </div>


      {/* Release Details Modal */}
      {selectedRelease && (
        <div className="modal-overlay" onClick={() => setSelectedRelease(null)}>
          <div className="modal-content glass-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedRelease(null)}>
              <Icons.X size={24} />
            </button>

            <div className="release-details-header">
              {selectedRelease.appIcon ? (
                <img src={selectedRelease.appIcon} alt={selectedRelease.appName || app.name} className="release-details-icon" />
              ) : (
                <div className="release-details-icon-fallback">
                  <Icons.Smartphone size={36} />
                </div>
              )}
              <div className="release-details-title-info">
                <h3>{selectedRelease.appName || app.name}</h3>
                <code>{app.packageName}</code>
              </div>
            </div>

            <div className="release-details-grid">
              <div className="detail-item">
                <span className="detail-label">{t('DASHBOARD.VERSION')}</span>
                <span className="detail-value">{selectedRelease.version}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{t('DASHBOARD.BUILD_NUMBER')}</span>
                <span className="detail-value">#{selectedRelease.buildNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{t('DASHBOARD.MIN_SDK')}</span>
                <span className="detail-value">{selectedRelease.minSdkVersion || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{t('DASHBOARD.TARGET_SDK')}</span>
                <span className="detail-value">{selectedRelease.targetSdkVersion || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{t('DASHBOARD.APK_SIZE')}</span>
                <span className="detail-value">{selectedRelease.size}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{t('DASHBOARD.UPLOAD_DATE')}</span>
                <span className="detail-value">{formatDate(selectedRelease.date)}</span>
              </div>
              {selectedRelease.uploadedByName && (
                <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                  <span className="detail-label">{t('DASHBOARD.UPLOADED_BY')}</span>
                  <span className="detail-value">
                    {selectedRelease.uploadedByName} ({selectedRelease.uploadedByEmail})
                  </span>
                </div>
              )}
            </div>

            {selectedRelease.sha256 && (
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <span className="detail-label">{t('DASHBOARD.SHA256_HASH')}</span>
                <span className="detail-value" style={{ marginTop: '4px' }}>
                  <code>{selectedRelease.sha256}</code>
                </span>
              </div>
            )}

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <span className="detail-label">{t('DASHBOARD.RELEASE_NOTES')}</span>
              <p style={{ marginTop: '8px', whiteSpace: 'pre-wrap' }}>{selectedRelease.releaseNotes}</p>
            </div>

            {selectedRelease.permissions && selectedRelease.permissions.length > 0 && (
              <div className="form-group" style={{ marginBottom: '32px' }}>
                <span className="detail-label">{t('DASHBOARD.PERMISSIONS', [selectedRelease.permissions.length])}</span>
                <div className="permissions-list">
                  {selectedRelease.permissions.map((perm, idx) => (
                    <span key={idx} className="permission-badge">
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="form-actions" style={{ justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedRelease(null)}>
                {t('DASHBOARD.CLOSE')}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleDownload(selectedRelease.buildNumber, selectedRelease.version);
                }}
                disabled={downloadingBuild !== null}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                {downloadingBuild === selectedRelease.buildNumber ? (
                  <>
                    <Icons.Loader size={16} className="animate-spin" /> {t('DASHBOARD.PREPARING_DOWNLOAD')}
                  </>
                ) : (
                  <>
                    <Icons.Download size={16} /> {t('DASHBOARD.DOWNLOAD_APK')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Loader Overlay */}
      {isDeleting && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            zIndex: 2000,
          }}
        >
          <div className="spinner" style={{ width: '48px', height: '48px', borderWidth: '4px' }} />
          <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>{t('DASHBOARD.DELETING_RELEASE')}</p>
        </div>
      )}

      {/* Invite Loader Overlay */}
      {isInviting && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            zIndex: 2000,
          }}
        >
          <div className="spinner" style={{ width: '48px', height: '48px', borderWidth: '4px' }} />
          <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>{t('DASHBOARD.SENDING_INVITATION')}</p>
        </div>
      )}

      {/* Remove Member Loader Overlay */}
      {isRemoving && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            zIndex: 2000,
          }}
        >
          <div className="spinner" style={{ width: '48px', height: '48px', borderWidth: '4px' }} />
          <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>{t('DASHBOARD.REMOVING_MEMBER')}</p>
        </div>
      )}
    </div>
  );
}
