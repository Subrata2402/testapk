import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Smartphone, RefreshCw, Search, Calendar, ChevronUp, ChevronDown } from 'lucide-react';
import { adminService } from '../services/api';
import CustomDatePicker from '../components/common/CustomDatePicker';

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
    if (sortField !== field) return <ChevronDown size={14} style={{ opacity: 0.3, marginLeft: '4px' }} />;
    return sortDirection === 'asc' 
      ? <ChevronUp size={14} style={{ marginLeft: '4px', color: 'var(--accent-primary)' }} />
      : <ChevronDown size={14} style={{ marginLeft: '4px', color: 'var(--accent-primary)' }} />;
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
      <div className="support-filters-bar" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', width: '100%' }}>
          <div className="search-input-wrapper" style={{ flex: 1, minWidth: '250px' }}>
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={t('apps.searchPlaceholder') || 'Search by name, package, or owner...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-input search-input"
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', padding: '10px 16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={16} className="text-muted" />
              <span className="font-semibold" style={{ fontSize: '0.9rem' }}>{t('apps.createdDate') || 'Created Date'}:</span>
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
                  <td><div className="skeleton-text-short" style={{ width: '40px', height: '24px', borderRadius: '12px' }}></div></td>
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
                <th onClick={() => handleSort('name')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {t('apps.name') || 'App Name'} {renderSortIcon('name')}
                  </div>
                </th>
                <th onClick={() => handleSort('packageName')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {t('apps.packageName') || 'Package Name'} {renderSortIcon('packageName')}
                  </div>
                </th>
                <th onClick={() => handleSort('owner')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {t('apps.owner') || 'Owner'} {renderSortIcon('owner')}
                  </div>
                </th>
                <th onClick={() => handleSort('releasesCount')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {t('apps.releases') || 'Releases'} {renderSortIcon('releasesCount')}
                  </div>
                </th>
                <th onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="user-avatar" style={{ width: '32px', height: '32px', borderRadius: '8px', fontSize: '0.9rem' }}>
                          {app.icon ? (
                            <img src={app.icon} alt={app.name} style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }} />
                          ) : (
                            app.name?.[0]?.toUpperCase() || 'A'
                          )}
                        </div>
                        <span className="font-semibold">{app.name}</span>
                      </div>
                    </td>
                    <td className="text-muted">{app.packageName}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="font-semibold">{owner?.name || owner?.email?.split('@')[0]}</span>
                        <span className="text-muted" style={{ fontSize: '0.8rem' }}>{owner?.email}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-info" style={{ background: 'var(--accent-primary-glow)', color: 'var(--accent-primary)', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
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
