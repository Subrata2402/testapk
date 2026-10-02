import React, { useState } from 'react';
import { MessageSquare, RefreshCw, Search, Star, Info, X, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import CustomDropdown from '../common/CustomDropdown';
import CustomDatePicker from '../common/CustomDatePicker';
import './FeedbackList.css';

export default function FeedbackList({
  feedbacks,
  isLoading,
  onRefresh,
  onViewDetails,
  searchQuery: propsSearchQuery,
  onSearchChange,
  categoryFilter: propsCategoryFilter,
  onCategoryFilterChange,
  ratingFilter: propsRatingFilter,
  onRatingFilterChange,
  startDate: propsStartDate,
  endDate: propsEndDate,
  onDateChange,
  pagination,
  onPageChange,
  t
}) {
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [localCategoryFilter, setLocalCategoryFilter] = useState('all');
  const [localRatingFilter, setLocalRatingFilter] = useState('all');
  const [localStartDate, setLocalStartDate] = useState(null);
  const [localEndDate, setLocalEndDate] = useState(null);

  const searchQuery = propsSearchQuery !== undefined ? propsSearchQuery : localSearchQuery;
  const handleSearchChange = (val) => {
    if (onSearchChange) onSearchChange(val);
    else setLocalSearchQuery(val);
  };

  const categoryFilter = propsCategoryFilter !== undefined ? propsCategoryFilter : localCategoryFilter;
  const handleCategoryFilterChange = (val) => {
    if (onCategoryFilterChange) onCategoryFilterChange(val);
    else setLocalCategoryFilter(val);
  };

  const ratingFilter = propsRatingFilter !== undefined ? propsRatingFilter : localRatingFilter;
  const handleRatingFilterChange = (val) => {
    if (onRatingFilterChange) onRatingFilterChange(val);
    else setLocalRatingFilter(val);
  };

  const startDate = propsStartDate !== undefined ? propsStartDate : localStartDate;
  const endDate = propsEndDate !== undefined ? propsEndDate : localEndDate;
  const handleDateChange = (start, end) => {
    if (onDateChange) onDateChange(start, end);
    else {
      setLocalStartDate(start);
      setLocalEndDate(end);
    }
  };

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

  // Client-side fallback filter if no server pagination is active
  const filteredFeedbacks = pagination ? feedbacks : feedbacks.filter(fb => {
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
    if (sortField !== field) return <ChevronDown size={14} className="sort-icon-inactive" />;
    return sortDirection === 'asc' 
      ? <ChevronUp size={14} className="sort-icon-active" />
      : <ChevronDown size={14} className="sort-icon-active" />;
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
    <section className="support-section glass-card animate-fade-in">
      <div className="section-header support-header">
        <div className="header-left">
          <MessageSquare size={20} className="section-icon" />
          <h3>{t('feedback.title')}</h3>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="btn btn-secondary btn-icon-only"
          title="Refresh"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="support-filters-bar feedback-filters-bar">
        <div className="feedback-filters-row">
          <div className="search-input-wrapper feedback-search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={t('feedback.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="filter-input search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => handleSearchChange('')} 
                className="search-clear-btn"
                type="button"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="filters-group feedback-filters-group">
            <div className="filter-dropdown-wrapper feedback-dropdown-wrapper">
              <CustomDropdown
                options={categoryOptions}
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
                placeholder={t('feedback.allCategories')}
              />
            </div>

            <div className="filter-dropdown-wrapper feedback-dropdown-wrapper">
              <CustomDropdown
                options={ratingOptions}
                value={ratingFilter}
                onChange={handleRatingFilterChange}
                placeholder={t('feedback.allRatings')}
              />
            </div>

            <CustomDatePicker
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateChange}
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
                  <td><div className="skeleton-text-short feedback-skeleton-action-btn"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : sortedFeedbacks.length > 0 ? (
        <>
          <div className="support-table-wrapper">
            <table className="support-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('user')} className="feedback-table-header-clickable">
                    <div className="feedback-table-header-content">
                      {t('feedback.user')} {renderSortIcon('user')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('category')} className="feedback-table-header-clickable">
                    <div className="feedback-table-header-content">
                      {t('feedback.category')} {renderSortIcon('category')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('rating')} className="feedback-table-header-clickable">
                    <div className="feedback-table-header-content">
                      {t('feedback.rating')} {renderSortIcon('rating')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('title')} className="feedback-table-header-clickable">
                    <div className="feedback-table-header-content">
                      {t('feedback.titleLabel')} {renderSortIcon('title')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('createdAt')} className="feedback-table-header-clickable">
                    <div className="feedback-table-header-content">
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
                        <div className="feedback-user-cell">
                          <span className="font-semibold">{fb.userId.name}</span>
                          <span className="text-muted feedback-user-email">{fb.userId.email}</span>
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
                      <div className="feedback-rating-cell">
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
                        onClick={() => onViewDetails(fb)}
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

          {/* Pagination Bar */}
          {pagination && pagination.totalPages > 1 && (
            <div className="pagination-bar feedback-pagination-bar">
              <span className="pagination-info">
                Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} feedbacks
              </span>
              <div className="pagination-controls">
                <button
                  className="page-btn"
                  disabled={pagination.page <= 1 || isLoading}
                  onClick={() => onPageChange(pagination.page - 1)}
                >
                  <ChevronLeft size={16} />
                  <span>Prev</span>
                </button>
                <span className="page-current">Page {pagination.page} of {pagination.totalPages}</span>
                <button
                  className="page-btn"
                  disabled={pagination.page >= pagination.totalPages || isLoading}
                  onClick={() => onPageChange(pagination.page + 1)}
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="no-activity">
          {feedbacks.length === 0 ? t('feedback.noFeedbacks') : t('feedback.noFeedbacks')}
        </p>
      )}
    </section>
  );
}
