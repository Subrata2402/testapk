'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useApp } from '../../../../context/AppContext';
import Dashboard from '../../../../views/Dashboard';

export default function AppDetailPage() {
  const router = useRouter();
  const params = useParams();
  const appId = params?.appId;

  const {
    user,
    apps,
    handleCreateApp,
    handleLogout,
    setIsDriveModalOpen,
    showAlert,
    showConfirm,
    downloadLink,
    isAuthChecking,
  } = useApp();

  useEffect(() => {
    if (!isAuthChecking && !user) {
      router.replace('/');
    }
  }, [user, isAuthChecking, router]);

  if (!user) {
    return null;
  }

  return (
    <Dashboard
      appId={appId}
      user={user}
      apps={apps}
      onCreateApp={handleCreateApp}
      onLogout={handleLogout}
      onOpenDriveModal={() => setIsDriveModalOpen(true)}
      showAlert={showAlert}
      showConfirm={showConfirm}
      downloadLink={downloadLink}
    />
  );
}
