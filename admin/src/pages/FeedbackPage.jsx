import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { feedbackService } from '../services/api';
import FeedbackList from '../components/feedback/FeedbackList';
import FeedbackDetailsModal from '../components/feedback/FeedbackDetailsModal';

export default function FeedbackPage() {
  const { t } = useTranslation();
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
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

  const fetchFeedbacks = async (page = 1) => {
    setIsLoading(true);
    try {
      const params = {
        page,
        limit: pagination.limit,
        search: debouncedSearch,
        category: categoryFilter,
        rating: ratingFilter,
        startDate: startDate ? startDate.toISOString() : undefined,
        endDate: endDate ? endDate.toISOString() : undefined,
      };
      const response = await feedbackService.getFeedbacks(params);
      if (response.status === 'success') {
        setFeedbacks(response.data.feedbacks || []);
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      }
    } catch (err) {
      console.error('Failed to fetch feedbacks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks(1);
  }, [debouncedSearch, categoryFilter, ratingFilter, startDate, endDate]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchFeedbacks(newPage);
    }
  };

  return (
    <>
      <FeedbackList
        feedbacks={feedbacks}
        isLoading={isLoading}
        onRefresh={() => fetchFeedbacks(pagination.page)}
        onViewDetails={setSelectedFeedback}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        ratingFilter={ratingFilter}
        onRatingFilterChange={setRatingFilter}
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

      <FeedbackDetailsModal
        feedback={selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
        t={t}
      />
    </>
  );
}
