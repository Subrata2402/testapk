import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Users, RefreshCw, Search, Calendar, Shield, User as UserIcon, ChevronUp, ChevronDown } from 'lucide-react';
import { userService } from '../services/api';
import CustomDropdown from '../components/common/CustomDropdown';
import CustomDatePicker from '../components/common/CustomDatePicker';
import Switch from '../components/common/Switch';
import './UsersPage.css';

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
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

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

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === 'name') {
      aVal = (a.name || '').toLowerCase();
      bVal = (b.name || '').toLowerCase();
    } else if (sortField === 'email') {
      aVal = (a.email || '').toLowerCase();
      bVal = (b.email || '').toLowerCase();
    } else if (sortField === 'role') {
      aVal = (a.role || '').toLowerCase();
      bVal = (b.role || '').toLowerCase();
    } else if (sortField === 'isDeleted') {
      aVal = a.isDeleted ? 1 : 0;
      bVal = b.isDeleted ? 1 : 0;
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
      <div className="support-filters-bar users-filters-bar">
        <div className="users-filters-row">
          <div className="search-input-wrapper users-search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={t('users.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-input search-input"
            />
          </div>

          <div className="filters-group users-filters-group">
            <div className="filter-dropdown-wrapper users-dropdown-wrapper">
              <CustomDropdown
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder={t('users.allUsers')}
              />
            </div>

            <div className="filter-dropdown-wrapper users-dropdown-wrapper">
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
        <div className="users-date-row">
          <div className="users-date-label-container">
            <Calendar size={16} className="text-muted" />
            <span className="font-semibold users-date-label">{t('users.joinedDate')}:</span>
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
                  <td><div className="skeleton-text-short users-skeleton-badge"></div></td>
                  <td><div className="skeleton-text-short users-skeleton-badge"></div></td>
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
                <th onClick={() => handleSort('name')} className="users-table-header-clickable">
                  <div className="users-table-header-content">
                    {t('users.name')} {renderSortIcon('name')}
                  </div>
                </th>
                <th onClick={() => handleSort('email')} className="users-table-header-clickable">
                  <div className="users-table-header-content">
                    {t('users.email')} {renderSortIcon('email')}
                  </div>
                </th>
                <th onClick={() => handleSort('role')} className="users-table-header-clickable">
                  <div className="users-table-header-content">
                    {t('users.role')} {renderSortIcon('role')}
                  </div>
                </th>
                <th onClick={() => handleSort('isDeleted')} className="users-table-header-clickable">
                  <div className="users-table-header-content">
                    {t('users.status')} {renderSortIcon('isDeleted')}
                  </div>
                </th>
                <th onClick={() => handleSort('createdAt')} className="users-table-header-clickable">
                  <div className="users-table-header-content">
                    {t('users.joinedDate')} {renderSortIcon('createdAt')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="users-name-cell">
                      <div className="user-avatar users-avatar-container">
                        {user.picture ? (
                          <img src={user.picture} alt={user.name} className="users-avatar-img" />
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
                    <span className={`badge badge-${user.role === 'admin' ? 'danger' : 'primary'} users-role-badge`}>
                      {user.role === 'admin' ? <Shield size={12} /> : <UserIcon size={12} />}
                      {user.role === 'admin' ? t('users.admin') : t('users.user')}
                    </span>
                  </td>
                  <td>
                    <div className="users-status-cell">
                      <Switch
                        checked={!user.isDeleted}
                        onChange={(checked) => handleStatusChange(user._id, !checked)}
                        disabled={user.role === 'admin'}
                        loading={updatingStatusId === user._id}
                      />
                      <span className={`badge badge-${user.isDeleted ? 'danger' : 'success'} users-status-badge`}>
                        {user.isDeleted ? t('users.inactive') : t('users.active')}
                      </span>
                    </div>
                  </td>
                  <td className="text-muted">
                    <div className="users-joined-cell">
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
