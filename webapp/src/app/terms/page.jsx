'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import TermsOfService from '../../views/TermsOfService';

export default function TermsPage() {
  const router = useRouter();

  return <TermsOfService onBackToHome={() => router.back()} />;
}
