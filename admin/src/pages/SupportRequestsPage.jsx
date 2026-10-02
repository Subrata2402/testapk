import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import SupportList from '../components/support/SupportList';
import SupportDetailsModal from '../components/support/SupportDetailsModal';
import { supportService } from '../services/api';

export default function SupportRequestsPage() {
  const { t } = useTranslation();
  const [supportRequests, setSupportRequests] = useState([]);
  const [isLoadingSupport, setIsLoadingSupport] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchSupportRequests = async (page = 1) => {
    setIsLoadingSupport(true);
    try {
      const params = {
        page,
        limit: pagination.limit,
        search: debouncedSearch,
        status: statusFilter,
        startDate: startDate ? startDate.toISOString() : undefined,
        endDate: endDate ? endDate.toISOString() : undefined,
      };
      const response = await supportService.getRequests(params);
      if (response.status === 'success') {
        setSupportRequests(response.data.requests || []);
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      }
    } catch (err) {
      console.error('Failed to fetch support requests:', err);
    } finally {
      setIsLoadingSupport(false);
    }
  };

  useEffect(() => {
    fetchSupportRequests(1);
  }, [debouncedSearch, statusFilter, startDate, endDate]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchSupportRequests(newPage);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await supportService.updateStatus(id, newStatus);
      if (response.status === 'success') {
        setSupportRequests(prev =>
          prev.map(req => (req._id === id ? { ...req, status: newStatus } : req))
        );
      }
    } catch (err) {
      console.error('Failed to update support status:', err);
    }
  };

  return (
    <>
      <SupportList
        requests={supportRequests}
        isLoading={isLoadingSupport}
        onRefresh={() => fetchSupportRequests(pagination.page)}
        onViewDetails={setSelectedRequest}
        onStatusChange={handleStatusChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        startDate={startDate}
        endDate={endDate}
        onDateChange={(start, end) => {
          setStartDate(start);
          setEndDate(end);
        }}
        pagination={pagination}
        onPageChange={handlePageChange}
        t={t}
      />

      {/* Support Request Details Modal */}
      <SupportDetailsModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        t={t}
      />
    </>
  );
}
