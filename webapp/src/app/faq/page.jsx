'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import FaqPage from '../../views/FaqPage';

export default function FAQ() {
  const router = useRouter();

  return <FaqPage onBackToHome={() => router.back()} />;
}
