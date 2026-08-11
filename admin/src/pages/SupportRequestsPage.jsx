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

  const fetchSupportRequests = async () => {
    setIsLoadingSupport(true);
    try {
      const response = await supportService.getRequests();
      if (response.status === 'success') {
        setSupportRequests(response.data.requests);
      }
    } catch (err) {
      console.error('Failed to fetch support requests:', err);
    } finally {
      setIsLoadingSupport(false);
    }
  };

  useEffect(() => {
    fetchSupportRequests();
  }, []);

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
        onRefresh={fetchSupportRequests}
        onViewDetails={setSelectedRequest}
        onStatusChange={handleStatusChange}
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
