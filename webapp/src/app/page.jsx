'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import LandingPage from '../views/LandingPage';

export default function Home() {
  const router = useRouter();
  const { user, setIsLoginModalOpen, setIsContactModalOpen, downloadLink } = useApp();

  return (
    <LandingPage
      user={user}
      onLoginClick={() => setIsLoginModalOpen(true)}
      onContactClick={() => setIsContactModalOpen(true)}
      onNavigate={(view) => router.push(`/${view}`)}
      downloadLink={downloadLink}
    />
  );
}
