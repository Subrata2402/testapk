import React, { useState } from 'react';
import { Mail, RefreshCw, Eye, Search, Calendar, ChevronUp, ChevronDown } from 'lucide-react';
import CustomDropdown from '../common/CustomDropdown';
import CustomDatePicker from '../common/CustomDatePicker';

export default function SupportList({ requests, isLoading, onRefresh, onViewDetails, onStatusChange, t }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'resolved'
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  // Filter requests
  const filteredRequests = requests.filter(req => {
    // Search filter
    const matchesSearch = 
      req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.subject.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;

    // Date filter
    const matchesDate = (() => {
      if (!startDate && !endDate) return true;
      const reqDate = new Date(req.createdAt);
      reqDate.setHours(0, 0, 0, 0);

      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (reqDate < start) return false;
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (reqDate > end) return false;
      }

      return true;
    })();

    return matchesSearch && matchesStatus && matchesDate;
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

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === 'name') {
      aVal = (a.name || '').toLowerCase();
      bVal = (b.name || '').toLowerCase();
    } else if (sortField === 'email') {
      aVal = (a.email || '').toLowerCase();
      bVal = (b.email || '').toLowerCase();
    } else if (sortField === 'subject') {
      aVal = (a.subject || '').toLowerCase();
      bVal = (b.subject || '').toLowerCase();
    } else if (sortField === 'status') {
      aVal = (a.status || '').toLowerCase();
      bVal = (b.status || '').toLowerCase();
    } else if (sortField === 'createdAt') {
      aVal = new Date(a.createdAt).getTime();
      bVal = new Date(b.createdAt).getTime();
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingStatusId(id);
    try {
      await onStatusChange(id, newStatus);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const statusFilterOptions = [
    { value: 'all', label: t('support.allStatuses') },
    { value: 'pending', label: t('support.new') },
    { value: 'resolved', label: t('support.closed') }
  ];

  const getStatusOptions = (currentStatus) => [
    { value: 'pending', label: t('support.new') },
    { value: 'resolved', label: t('support.closed') }
  ];

  return (
    <section className="support-section glass-card animate-fade-in">
      <div className="section-header support-header">
        <div className="header-left">
          <Mail size={20} className="section-icon" />
          <h3>{t('support.title')}</h3>
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
      <div className="support-filters-bar" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', width: '100%' }}>
          <div className="search-input-wrapper" style={{ flex: 1, minWidth: '250px' }}>
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={t('support.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-input search-input"
            />
          </div>

          <div className="filters-group" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div className="filter-dropdown-wrapper" style={{ width: '160px' }}>
              <CustomDropdown
                options={statusFilterOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder={t('support.allStatuses')}
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
                <th>{t('support.name')}</th>
                <th>{t('support.email')}</th>
                <th>{t('support.subject')}</th>
                <th>{t('support.date')}</th>
                <th>{t('support.status')}</th>
                <th>{t('support.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((_, idx) => (
                <tr key={idx}>
                  <td><div className="skeleton-text-short"></div></td>
                  <td><div className="skeleton-text-long"></div></td>
                  <td><div className="skeleton-text-long"></div></td>
                  <td><div className="skeleton-text-short"></div></td>
                  <td><div className="skeleton-text-short" style={{ width: '60px', height: '24px', borderRadius: '12px' }}></div></td>
                  <td><div className="skeleton-text-short" style={{ width: '80px', height: '32px', borderRadius: '6px' }}></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : filteredRequests.length > 0 ? (
        <div className="support-table-wrapper">
          <table className="support-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {t('support.name')} {renderSortIcon('name')}
                  </div>
                </th>
                <th onClick={() => handleSort('email')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {t('support.email')} {renderSortIcon('email')}
                  </div>
                </th>
                <th onClick={() => handleSort('subject')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {t('support.subject')} {renderSortIcon('subject')}
                  </div>
                </th>
                <th onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {t('support.date')} {renderSortIcon('createdAt')}
                  </div>
                </th>
                <th onClick={() => handleSort('status')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {t('support.status')} {renderSortIcon('status')}
                  </div>
                </th>
                <th>{t('support.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {sortedRequests.map((req) => (
                <tr key={req._id}>
                  <td className="font-semibold">{req.name}</td>
                  <td>
                    <a href={`mailto:${req.email}`} className="text-link">
                      {req.email}
                    </a>
                  </td>
                  <td>{req.subject}</td>
                  <td className="text-muted">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div className={`status-dropdown-cell ${req.status === 'pending' ? 'status-new' : 'status-closed'}`}>
                      <CustomDropdown
                        options={getStatusOptions(req.status)}
                        value={req.status}
                        onChange={(val) => handleStatusChange(req._id, val)}
                        placeholder={t('support.status')}
                        loading={updatingStatusId === req._id}
                      />
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => onViewDetails(req)}
                      className="btn btn-secondary btn-sm btn-action"
                    >
                      <Eye size={14} />
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
          {requests.length === 0 ? t('support.noRequests') : t('support.noMatchingRequests')}
        </p>
      )}
    </section>
  );
}
