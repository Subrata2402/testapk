import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import DashboardOverview from '../pages/DashboardOverview';
import SupportRequestsPage from '../pages/SupportRequestsPage';
import FeedbackPage from '../pages/FeedbackPage';
import UsersPage from '../pages/UsersPage';
import ApplicationsPage from '../pages/ApplicationsPage';
import SystemHealthPage from '../pages/SystemHealthPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="apps" element={<ApplicationsPage />} />
        <Route path="support" element={<SupportRequestsPage />} />
        <Route path="feedbacks" element={<FeedbackPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="system" element={<SystemHealthPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
