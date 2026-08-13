import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Smartphone, RefreshCw, Search, Calendar, ChevronUp, ChevronDown } from 'lucide-react';
import { adminService } from '../services/api';
import CustomDatePicker from '../components/common/CustomDatePicker';
import './ApplicationsPage.css';

export default function ApplicationsPage() {
  const { t } = useTranslation();
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const fetchApps = async () => {
    setIsLoading(true);
    try {
      const response = await adminService.getAllApps();
      if (response.status === 'success') {
        setApps(response.data.apps);
      }
    } catch (err) {
      console.error('Failed to fetch apps:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

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

  const filteredApps = apps.filter(app => {
    const name = app.name || '';
    const packageName = app.packageName || '';
    const owner = app.members?.find(m => m.role === 'Owner');
    const ownerName = owner?.name || owner?.email || '';

    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ownerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = (() => {
      if (!startDate && !endDate) return true;
      const createdDate = new Date(app.createdAt);
      createdDate.setHours(0, 0, 0, 0);

      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (createdDate < start) return false;
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (createdDate > end) return false;
      }

      return true;
    })();

    return matchesSearch && matchesDate;
  });

  const sortedApps = [...filteredApps].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === 'name') {
      aVal = (a.name || '').toLowerCase();
      bVal = (b.name || '').toLowerCase();
    } else if (sortField === 'packageName') {
      aVal = (a.packageName || '').toLowerCase();
      bVal = (b.packageName || '').toLowerCase();
    } else if (sortField === 'owner') {
      const aOwner = a.members?.find(m => m.role === 'Owner');
      const bOwner = b.members?.find(m => m.role === 'Owner');
      aVal = (aOwner?.name || aOwner?.email || '').toLowerCase();
      bVal = (bOwner?.name || bOwner?.email || '').toLowerCase();
    } else if (sortField === 'releasesCount') {
      aVal = a.releasesCount || 0;
      bVal = b.releasesCount || 0;
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
          <Smartphone size={20} className="section-icon" />
          <h3>{t('apps.title') || 'Applications'}</h3>
        </div>
        <button
          onClick={fetchApps}
          disabled={isLoading}
          className="btn btn-secondary btn-icon-only"
          title="Refresh"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="support-filters-bar apps-filters-bar">
        <div className="apps-filters-row">
          <div className="search-input-wrapper apps-search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={t('apps.searchPlaceholder') || 'Search by name, package, or owner...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-input search-input"
            />
          </div>

          <div className="apps-date-wrapper">
            <div className="apps-date-label-container">
              <Calendar size={16} className="text-muted" />
              <span className="font-semibold apps-date-label">{t('apps.createdDate') || 'Created Date'}:</span>
            </div>
            <CustomDatePicker
              startDate={startDate}
              endDate={endDate}
              onChange={(start, end) => {
                setStartDate(start);
                setEndDate(end);
              }}
              placeholder={(t('users.startDate') || 'Start Date') + ' - ' + (t('users.endDate') || 'End Date')}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="support-table-wrapper skeleton-shimmer">
          <table className="support-table">
            <thead>
              <tr>
                <th>{t('apps.name') || 'App Name'}</th>
                <th>{t('apps.packageName') || 'Package Name'}</th>
                <th>{t('apps.owner') || 'Owner'}</th>
                <th>{t('apps.releases') || 'Releases'}</th>
                <th>{t('apps.createdDate') || 'Created Date'}</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((_, idx) => (
                <tr key={idx}>
                  <td><div className="skeleton-text-short"></div></td>
                  <td><div className="skeleton-text-long"></div></td>
                  <td><div className="skeleton-text-short"></div></td>
                  <td><div className="skeleton-text-short apps-skeleton-badge"></div></td>
                  <td><div className="skeleton-text-short"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : sortedApps.length > 0 ? (
        <div className="support-table-wrapper">
          <table className="support-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')} className="apps-table-header-clickable">
                  <div className="apps-table-header-content">
                    {t('apps.name') || 'App Name'} {renderSortIcon('name')}
                  </div>
                </th>
                <th onClick={() => handleSort('packageName')} className="apps-table-header-clickable">
                  <div className="apps-table-header-content">
                    {t('apps.packageName') || 'Package Name'} {renderSortIcon('packageName')}
                  </div>
                </th>
                <th onClick={() => handleSort('owner')} className="apps-table-header-clickable">
                  <div className="apps-table-header-content">
                    {t('apps.owner') || 'Owner'} {renderSortIcon('owner')}
                  </div>
                </th>
                <th onClick={() => handleSort('releasesCount')} className="apps-table-header-clickable">
                  <div className="apps-table-header-content">
                    {t('apps.releases') || 'Releases'} {renderSortIcon('releasesCount')}
                  </div>
                </th>
                <th onClick={() => handleSort('createdAt')} className="apps-table-header-clickable">
                  <div className="apps-table-header-content">
                    {t('apps.createdDate') || 'Created Date'} {renderSortIcon('createdAt')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedApps.map((app) => {
                const owner = app.members?.find(m => m.role === 'Owner');
                return (
                  <tr key={app._id}>
                    <td>
                      <div className="apps-name-cell">
                        <div className="user-avatar apps-avatar">
                          {app.icon ? (
                            <img src={app.icon} alt={app.name} className="apps-avatar-img" />
                          ) : (
                            app.name?.[0]?.toUpperCase() || 'A'
                          )}
                        </div>
                        <span className="font-semibold">{app.name}</span>
                      </div>
                    </td>
                    <td className="text-muted">{app.packageName}</td>
                    <td>
                      <div className="apps-owner-cell">
                        <span className="font-semibold">{owner?.name || owner?.email?.split('@')[0]}</span>
                        <span className="text-muted apps-owner-email">{owner?.email}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-info apps-releases-badge">
                        {app.releasesCount || 0}
                      </span>
                    </td>
                    <td className="text-muted">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <Smartphone size={48} className="empty-icon" />
          <p>{t('apps.noApps') || 'No applications found'}</p>
        </div>
      )}
    </section>
  );
}
