'use client';

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import DeviceAuthPage from '../../views/DeviceAuthPage';

function DeviceAuthContent() {
  const router = useRouter();
  const { user, setIsLoginModalOpen, showAlert } = useApp();

  return (
    <DeviceAuthPage
      user={user}
      onLoginClick={() => setIsLoginModalOpen(true)}
      showAlert={showAlert}
      onGoToDashboard={() => router.replace('/dashboard')}
    />
  );
}

export default function DeviceAuth() {
  return (
    <Suspense
      fallback={
        <div className="device-auth-container flex-center">
          <div className="spinner"></div>
        </div>
      }
    >
      <DeviceAuthContent />
    </Suspense>
  );
}
