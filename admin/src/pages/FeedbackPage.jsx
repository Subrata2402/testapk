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

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const response = await feedbackService.getFeedbacks();
      if (response.status === 'success') {
        setFeedbacks(response.data.feedbacks);
      }
    } catch (err) {
      console.error('Failed to fetch feedbacks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <>
      <FeedbackList
        feedbacks={feedbacks}
        isLoading={isLoading}
        onRefresh={fetchFeedbacks}
        onViewDetails={setSelectedFeedback}
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
