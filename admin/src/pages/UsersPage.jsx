import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Users, RefreshCw, Search, Calendar, Shield, User as UserIcon } from 'lucide-react';
import { userService } from '../services/api';
import CustomDropdown from '../components/common/CustomDropdown';
import CustomDatePicker from '../components/common/CustomDatePicker';
import Switch from '../components/common/Switch';

export default function UsersPage() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await userService.getAll();
      if (response.status === 'success') {
        setUsers(response.data.users);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id, isDeleted) => {
    setUpdatingStatusId(id);
    try {
      const response = await userService.updateStatus(id, isDeleted);
      if (response.status === 'success') {
        setUsers(prev =>
          prev.map(user => (user._id === id ? { ...user, isDeleted } : user))
        );
      }
    } catch (err) {
      console.error('Failed to update user status:', err);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const statusOptions = [
    { value: 'all', label: t('users.allUsers') },
    { value: 'active', label: t('users.active') },
    { value: 'inactive', label: t('users.inactive') }
  ];

  const roleOptions = [
    { value: 'all', label: t('users.allRoles') },
    { value: 'admin', label: t('users.admin') },
    { value: 'user', label: t('users.user') }
  ];

  const filteredUsers = users.filter(user => {
    const name = user.name || '';
    const email = user.email || '';
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !user.isDeleted) ||
      (statusFilter === 'inactive' && user.isDeleted);

    const matchesRole =
      roleFilter === 'all' ||
      user.role === roleFilter;

    const matchesDate = (() => {
      if (!startDate && !endDate) return true;
      const joinedDate = new Date(user.createdAt);
      joinedDate.setHours(0, 0, 0, 0);

      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (joinedDate < start) return false;
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (joinedDate > end) return false;
      }

      return true;
    })();

    return matchesSearch && matchesStatus && matchesRole && matchesDate;
  });

  return (
    <section className="support-section glass-card animate-fade-in">
      <div className="section-header support-header">
        <div className="header-left">
          <Users size={20} className="section-icon" />
          <h3>{t('users.title')}</h3>
        </div>
        <button
          onClick={fetchUsers}
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
              placeholder={t('users.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-input search-input"
            />
          </div>

          <div className="filters-group" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div className="filter-dropdown-wrapper" style={{ width: '160px' }}>
              <CustomDropdown
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder={t('users.allUsers')}
              />
            </div>

            <div className="filter-dropdown-wrapper" style={{ width: '160px' }}>
              <CustomDropdown
                options={roleOptions}
                value={roleFilter}
                onChange={setRoleFilter}
                placeholder={t('users.allRoles')}
              />
            </div>
          </div>
        </div>

        {/* Custom Date Picker Row */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', padding: '12px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={16} className="text-muted" />
            <span className="font-semibold" style={{ fontSize: '0.9rem' }}>{t('users.joinedDate')}:</span>
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

      {isLoading ? (
        <div className="support-table-wrapper skeleton-shimmer">
          <table className="support-table">
            <thead>
              <tr>
                <th>{t('users.name')}</th>
                <th>{t('users.email')}</th>
                <th>{t('users.role')}</th>
                <th>{t('users.status')}</th>
                <th>{t('users.joinedDate')}</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((_, idx) => (
                <tr key={idx}>
                  <td><div className="skeleton-text-short"></div></td>
                  <td><div className="skeleton-text-long"></div></td>
                  <td><div className="skeleton-text-short" style={{ width: '60px', height: '24px', borderRadius: '12px' }}></div></td>
                  <td><div className="skeleton-text-short" style={{ width: '60px', height: '24px', borderRadius: '12px' }}></div></td>
                  <td><div className="skeleton-text-short"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="support-table-wrapper">
          <table className="support-table">
            <thead>
              <tr>
                <th>{t('users.name')}</th>
                <th>{t('users.email')}</th>
                <th>{t('users.role')}</th>
                <th>{t('users.status')}</th>
                <th>{t('users.joinedDate')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="user-avatar" style={{ width: '32px', height: '32px', fontSize: '0.9rem' }}>
                        {user.picture ? (
                          <img src={user.picture} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          user.name?.[0]?.toUpperCase() || 'U'
                        )}
                      </div>
                      <span className="font-semibold">{user.name}</span>
                    </div>
                  </td>
                  <td>
                    <a href={`mailto:${user.email}`} className="text-link">
                      {user.email}
                    </a>
                  </td>
                  <td>
                    <span className={`badge badge-${user.role === 'admin' ? 'danger' : 'primary'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      {user.role === 'admin' ? <Shield size={12} /> : <UserIcon size={12} />}
                      {user.role === 'admin' ? t('users.admin') : t('users.user')}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Switch
                        checked={!user.isDeleted}
                        onChange={(checked) => handleStatusChange(user._id, !checked)}
                        disabled={user.role === 'admin'}
                        loading={updatingStatusId === user._id}
                      />
                      <span className={`badge badge-${user.isDeleted ? 'danger' : 'success'}`} style={{ fontSize: '0.8rem', padding: '4px 8px' }}>
                        {user.isDeleted ? t('users.inactive') : t('users.active')}
                      </span>
                    </div>
                  </td>
                  <td className="text-muted">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} />
                      <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-activity">
          {users.length === 0 ? t('users.noUsers') : t('users.noUsers')}
        </p>
      )}
    </section>
  );
}
