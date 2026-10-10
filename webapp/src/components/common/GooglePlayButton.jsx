'use client';

import React from 'react';
import { testapkDownloadLink } from '../../constants';

export const GooglePlayIcon = ({ size = 20, className = '' }) => (
  <svg
    viewBox="0 0 466 512"
    width={size}
    height={size}
    className={className}
    style={{ flexShrink: 0 }}
    aria-hidden="true"
  >
    <path
      fill="#EA4335"
      d="M199.9 237.8 1.4 470.17c7.22 24.57 30.16 41.81 55.8 41.81 11.16 0 20.93-2.79 29.3-8.37l244.16-139.46L199.9 237.8z"
    />
    <path
      fill="#FBBC04"
      d="m433.91 205.1-104.65-60-111.61 110.22 113.01 108.83 104.64-58.6c18.14-9.77 30.7-29.3 30.7-50.23-1.4-20.93-13.95-40.46-32.09-50.22z"
    />
    <path
      fill="#34A853"
      d="M199.42 273.45 329.27 145.1 87.9 8.37C79.53 2.79 68.36 0 57.2 0 30.7 0 6.98 18.14 1.4 41.86l198.02 231.59z"
    />
    <path
      fill="#4285F4"
      d="M1.39 41.86C0 46.04 0 51.63 0 57.2v397.64c0 5.57 0 9.76 1.4 15.34l216.27-214.86L1.39 41.86z"
    />
  </svg>
);

export default function GooglePlayButton({
  href,
  size = 'md',
  className = '',
  style = {},
}) {
  const targetLink = href || testapkDownloadLink;
  const iconSize = size === 'lg' ? 24 : size === 'sm' ? 16 : 20;

  return (
    <a
      href={targetLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`play-store-btn play-store-btn-${size} ${className}`}
      style={style}
    >
      <GooglePlayIcon size={iconSize} />
      <div className="play-store-btn-text">
        {/* <span className="play-store-sub">GET IT ON</span> */}
        <span className="play-store-title">Google Play</span>
      </div>
    </a>
  );
}
