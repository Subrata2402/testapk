'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import ContactSupport from '../../views/ContactSupport';

export default function ContactPage() {
  const { user } = useApp();

  return <ContactSupport user={user} />;
}
