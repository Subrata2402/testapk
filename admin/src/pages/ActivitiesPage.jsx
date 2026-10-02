import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { 
  Activity, 
  Smartphone, 
  Upload, 
  UserPlus, 
  Mail, 
  MessageSquare, 
  Clock, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { adminService } from '../services/api';
import './ActivitiesPage.css';

function getActivityIcon(type) {
  switch (type) {
    case 'app_created':
      return { icon: Smartphone, color: '#6c5ce7', bg: 'rgba(108, 92, 231, 0.15)', label: 'App Created' };
    case 'release_published':
      return { icon: Upload, color: '#00cec9', bg: 'rgba(0, 206, 201, 0.15)', label: 'Release Published' };
    case 'user_registered':
      return { icon: UserPlus, color: '#00b894', bg: 'rgba(0, 184, 148, 0.15)', label: 'User Registered' };
    case 'support_created':
      return { icon: Mail, color: '#e17055', bg: 'rgba(225, 112, 85, 0.15)', label: 'Support Request' };
    case 'feedback_submitted':
      return { icon: MessageSquare, color: '#ff9f43', bg: 'rgba(255, 159, 67, 0.15)', label: 'Feedback' };
    default:
      return { icon: Clock, color: '#a4b0be', bg: 'rgba(164, 176, 190, 0.15)', label: 'Activity' };
  }
}

function formatRelativeTime(dateInput) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const mins = Math.floor(diffInSeconds / 60);
  if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
}

export default function ActivitiesPage() {
  const { t } = useTranslation();
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchActivities = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await adminService.getActivities({
        page,
        limit: pagination.limit,
        type: typeFilter,
        search: debouncedSearch,
      });

      if (response.status === 'success') {
        setActivities(response.data.activities || []);
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      }
    } catch (err) {
      console.error('Failed to fetch activities:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities(1);
  }, [typeFilter, debouncedSearch]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchActivities(newPage);
    }
  };

  const filterTabs = [
    { key: 'all', label: 'All Activities' },
    { key: 'app_created', label: 'Apps' },
    { key: 'release_published', label: 'Releases' },
    { key: 'user_registered', label: 'Users' },
    { key: 'support_created', label: 'Support' },
    { key: 'feedback_submitted', label: 'Feedback' },
  ];

  return (
    <div className="activities-page animate-fade-in">
      {/* Page Header */}
      <div className="activities-header glass-card">
        <div className="activities-header-content">
          <div className="activities-title-group">
            <div className="activities-icon-badge">
              <Activity size={24} />
            </div>
            <div>
              <h2>System Activity Logs</h2>
              <p>Real-time system events across applications, releases, user registrations, and support tickets.</p>
            </div>
          </div>
          <button className="refresh-btn" onClick={() => fetchActivities(pagination.page)}>
            <RefreshCw size={16} className={isLoading ? 'spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Controls Bar: Search & Filter Tabs */}
      <div className="activities-controls glass-card">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search activities or user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              className={`filter-tab ${typeFilter === tab.key ? 'active' : ''}`}
              onClick={() => setTypeFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activities List */}
      <div className="activities-list-container glass-card">
        {isLoading ? (
          <div className="activities-loading">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="activity-row-skeleton skeleton-shimmer">
                <div className="skeleton-icon-large"></div>
                <div className="skeleton-details">
                  <div className="skeleton-text-long"></div>
                  <div className="skeleton-text-short"></div>
                </div>
              </div>
            ))}
          </div>
        ) : activities.length > 0 ? (
          <div className="activities-list">
            {activities.map((act) => {
              const info = getActivityIcon(act.type);
              const IconComponent = info.icon;
              return (
                <div key={act.id} className="activity-card-row">
                  <div className="activity-icon-badge" style={{ backgroundColor: info.bg, color: info.color }}>
                    <IconComponent size={20} />
                  </div>
                  <div className="activity-info">
                    <div className="activity-main-line">
                      <p className="activity-description">{act.action}</p>
                      <span className="activity-type-tag" style={{ borderColor: info.color, color: info.color }}>
                        {info.label}
                      </span>
                    </div>
                    <div className="activity-sub-line">
                      <span className="activity-user-badge">by {act.user}</span>
                      <span className="dot-separator">•</span>
                      <span className="activity-time-rel">{formatRelativeTime(act.timestamp)}</span>
                      <span className="dot-separator">•</span>
                      <span className="activity-time-exact">
                        {new Date(act.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="activities-empty">
            <Clock size={48} className="empty-icon" />
            <h3>No Activities Found</h3>
            <p>No system activity matching your current filter criteria.</p>
          </div>
        )}

        {/* Pagination Bar */}
        {pagination.totalPages > 1 && (
          <div className="pagination-bar">
            <span className="pagination-info">
              Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} total items)
            </span>
            <div className="pagination-controls">
              <button
                className="page-btn"
                disabled={pagination.page <= 1}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                <ChevronLeft size={16} />
                <span>Prev</span>
              </button>
              <button
                className="page-btn"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
