'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PrivacyPolicy from '../../views/PrivacyPolicy';

export default function PrivacyPage() {
  const router = useRouter();

  return <PrivacyPolicy onBackToHome={() => router.back()} />;
}
