import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { MessageSquare, RefreshCw, Search, Star, Info, X, ChevronUp, ChevronDown } from 'lucide-react';
import { feedbackService } from '../services/api';
import CustomDropdown from '../components/common/CustomDropdown';
import CustomDatePicker from '../components/common/CustomDatePicker';

export default function FeedbackPage() {
  const { t } = useTranslation();
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const response = await feedbackService.getFeedbacks();
      if (response.status === 'success') {
        setFeedbacks(response.data.feedbacks);
      }
    } catch (err) {
      console.error('Failed to fetch feedbacks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const categoryOptions = [
    { value: 'all', label: t('feedback.allCategories') },
    { value: 'bug', label: t('feedback.categories.bug') },
    { value: 'feature_request', label: t('feedback.categories.feature_request') },
    { value: 'other', label: t('feedback.categories.other') }
  ];

  const ratingOptions = [
    { value: 'all', label: t('feedback.allRatings') },
    { value: '5', label: t('feedback.ratings.stars', ['5']) },
    { value: '4', label: t('feedback.ratings.stars', ['4']) },
    { value: '3', label: t('feedback.ratings.stars', ['3']) },
    { value: '2', label: t('feedback.ratings.stars', ['2']) },
    { value: '1', label: t('feedback.ratings.star') }
  ];

  const filteredFeedbacks = feedbacks.filter(fb => {
    const user = fb.userId || {};
    const name = user.name || '';
    const email = user.email || '';
    const matchesSearch =
      fb.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || fb.category === categoryFilter;
    const matchesRating = ratingFilter === 'all' || String(fb.rating) === ratingFilter;

    const matchesDate = (() => {
      if (!startDate && !endDate) return true;
      const fbDate = new Date(fb.createdAt);
      fbDate.setHours(0, 0, 0, 0);

      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (fbDate < start) return false;
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (fbDate > end) return false;
      }

      return true;
    })();

    return matchesSearch && matchesCategory && matchesRating && matchesDate;
  });

  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return <ChevronDown size={14} style={{ opacity: 0.3, marginLeft: '4px' }} />;
    return sortDirection === 'asc' 
      ? <ChevronUp size={14} style={{ marginLeft: '4px', color: 'var(--accent-primary)' }} />
      : <ChevronDown size={14} style={{ marginLeft: '4px', color: 'var(--accent-primary)' }} />;
  };

  const sortedFeedbacks = [...filteredFeedbacks].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === 'user') {
      aVal = (a.userId?.name || a.userId?.email || '').toLowerCase();
      bVal = (b.userId?.name || b.userId?.email || '').toLowerCase();
    } else if (sortField === 'category') {
      aVal = (a.category || '').toLowerCase();
      bVal = (b.category || '').toLowerCase();
    } else if (sortField === 'rating') {
      aVal = a.rating || 0;
      bVal = b.rating || 0;
    } else if (sortField === 'title') {
      aVal = (a.title || '').toLowerCase();
      bVal = (b.title || '').toLowerCase();
    } else if (sortField === 'createdAt') {
      aVal = new Date(a.createdAt).getTime();
      bVal = new Date(b.createdAt).getTime();
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <>
      <section className="support-section glass-card animate-fade-in">
        <div className="section-header support-header">
          <div className="header-left">
            <MessageSquare size={20} className="section-icon" />
            <h3>{t('feedback.title')}</h3>
          </div>
          <button
            onClick={fetchFeedbacks}
            disabled={isLoading}
            className="btn btn-secondary btn-icon-only"
            title="Refresh"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Search and Filters Bar */}
        <div className="support-filters-bar" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', width: '100%' }}>
            <div className="search-input-wrapper" style={{ flex: 1, minWidth: '250px' }}>
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder={t('feedback.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input search-input"
              />
            </div>

            <div className="filters-group" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div className="filter-dropdown-wrapper" style={{ width: '160px' }}>
                <CustomDropdown
                  options={categoryOptions}
                  value={categoryFilter}
                  onChange={setCategoryFilter}
                  placeholder={t('feedback.allCategories')}
                />
              </div>

              <div className="filter-dropdown-wrapper" style={{ width: '160px' }}>
                <CustomDropdown
                  options={ratingOptions}
                  value={ratingFilter}
                  onChange={setRatingFilter}
                  placeholder={t('feedback.allRatings')}
                />
              </div>

              <CustomDatePicker
                startDate={startDate}
                endDate={endDate}
                onChange={(start, end) => {
                  setStartDate(start);
                  setEndDate(end);
                }}
                placeholder={t('users.startDate') + ' - ' + t('users.endDate')}
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="support-table-wrapper skeleton-shimmer">
            <table className="support-table">
              <thead>
                <tr>
                  <th>{t('feedback.user')}</th>
                  <th>{t('feedback.category')}</th>
                  <th>{t('feedback.rating')}</th>
                  <th>{t('feedback.titleLabel')}</th>
                  <th>{t('feedback.date')}</th>
                  <th>{t('support.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((_, idx) => (
                  <tr key={idx}>
                    <td><div className="skeleton-text-short"></div></td>
                    <td><div className="skeleton-text-short"></div></td>
                    <td><div className="skeleton-text-short"></div></td>
                    <td><div className="skeleton-text-long"></div></td>
                    <td><div className="skeleton-text-short"></div></td>
                    <td><div className="skeleton-text-short" style={{ width: '80px', height: '32px', borderRadius: '6px' }}></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : filteredFeedbacks.length > 0 ? (
          <div className="support-table-wrapper">
            <table className="support-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('user')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {t('feedback.user')} {renderSortIcon('user')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('category')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {t('feedback.category')} {renderSortIcon('category')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('rating')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {t('feedback.rating')} {renderSortIcon('rating')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('title')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {t('feedback.titleLabel')} {renderSortIcon('title')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {t('feedback.date')} {renderSortIcon('createdAt')}
                    </div>
                  </th>
                  <th>{t('support.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {sortedFeedbacks.map((fb) => (
                  <tr key={fb._id}>
                    <td>
                      {fb.userId ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span className="font-semibold">{fb.userId.name}</span>
                          <span className="text-muted" style={{ fontSize: '0.8rem' }}>{fb.userId.email}</span>
                        </div>
                      ) : (
                        <span className="text-muted">{t('feedback.anonymous')}</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge badge-${fb.category === 'bug' ? 'danger' : fb.category === 'feature_request' ? 'primary' : 'secondary'}`}>
                        {t(`feedback.categories.${fb.category}`)}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={14} fill="var(--accent-warning)" color="var(--accent-warning)" />
                        <span>{fb.rating}</span>
                      </div>
                    </td>
                    <td>{fb.title}</td>
                    <td className="text-muted">
                      {new Date(fb.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        onClick={() => setSelectedFeedback(fb)}
                        className="btn btn-secondary btn-sm btn-action"
                      >
                        <Info size={14} />
                        <span>{t('support.view')}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-activity">
            {feedbacks.length === 0 ? t('feedback.noFeedbacks') : t('feedback.noFeedbacks')}
          </p>
        )}
      </section>

      {/* Feedback Details Modal */}
      {selectedFeedback && (
        <div className="modal-overlay flex-center" onClick={() => setSelectedFeedback(null)}>
          <div className="support-details-modal glass-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <MessageSquare size={20} className="modal-title-icon" />
                <h4>{t('support.view')}</h4>
              </div>
              <button className="btn-close" onClick={() => setSelectedFeedback(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-row">
                <div className="detail-content">
                  <span className="detail-label">{t('feedback.user')}</span>
                  <span className="detail-value">
                    {selectedFeedback.userId ? `${selectedFeedback.userId.name} (${selectedFeedback.userId.email})` : t('feedback.anonymous')}
                  </span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-content">
                  <span className="detail-label">{t('feedback.category')}</span>
                  <span className="detail-value">
                    {t(`feedback.categories.${selectedFeedback.category}`)}
                  </span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-content">
                  <span className="detail-label">{t('feedback.rating')}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        fill={star <= selectedFeedback.rating ? 'var(--accent-warning)' : 'none'}
                        color="var(--accent-warning)"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-content">
                  <span className="detail-label">{t('feedback.titleLabel')}</span>
                  <span className="detail-value font-semibold">{selectedFeedback.title}</span>
                </div>
              </div>

              <div className="message-box">
                <span className="detail-label">{t('feedback.description')}</span>
                <p className="message-content">{selectedFeedback.description}</p>
              </div>

              {selectedFeedback.deviceInfo && (
                <div className="message-box" style={{ marginTop: '16px' }}>
                  <span className="detail-label">{t('feedback.deviceInfo')}</span>
                  <pre className="message-content" style={{ fontSize: '0.85rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(selectedFeedback.deviceInfo, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
