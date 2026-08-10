import React, { useState } from 'react';
import { Mail, RefreshCw, Eye, Search } from 'lucide-react';
import CustomDropdown from '../common/CustomDropdown';

export default function SupportList({ requests, isLoading, onRefresh, onViewDetails, onStatusChange, t }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'resolved'
  const [dateFilter, setDateFilter] = useState('all'); // 'all' | 'today' | 'yesterday' | 'week'
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
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const reqDate = new Date(req.createdAt);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dateFilter === 'today') {
        matchesDate = reqDate >= today;
      } else if (dateFilter === 'yesterday') {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        matchesDate = reqDate >= yesterday && reqDate < today;
      } else if (dateFilter === 'week') {
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);
        matchesDate = reqDate >= lastWeek;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
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

  const dateFilterOptions = [
    { value: 'all', label: t('support.allTime') },
    { value: 'today', label: t('support.today') },
    { value: 'yesterday', label: t('support.yesterday') },
    { value: 'week', label: t('support.last7Days') }
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
      <div className="support-filters-bar">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder={t('support.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-input search-input"
          />
        </div>

        <div className="filters-group">
          <div className="filter-dropdown-wrapper">
            <CustomDropdown
              options={statusFilterOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder={t('support.allStatuses')}
            />
          </div>

          <div className="filter-dropdown-wrapper">
            <CustomDropdown
              options={dateFilterOptions}
              value={dateFilter}
              onChange={setDateFilter}
              placeholder={t('support.allTime')}
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
                <th>{t('support.name')}</th>
                <th>{t('support.email')}</th>
                <th>{t('support.subject')}</th>
                <th>{t('support.date')}</th>
                <th>{t('support.status')}</th>
                <th>{t('support.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
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
                        disabled={updatingStatusId === req._id}
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
