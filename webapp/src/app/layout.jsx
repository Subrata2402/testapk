import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'TestAPK',
  description:
    'TestAPK is a secure APK distribution platform for Android developers. Developers use Google Sign-In to connect their Google Drive, upload APKs, manage releases, and share builds with testers.',
  metadataBase: new URL('https://testapk.clipboux.online'),
  verification: {
    google: 'iGXkUnJnXGA00NUGx6kszAFA02wrQXgs_vRFnmLKKTk',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'TestAPK',
    description:
      'TestAPK is a secure APK distribution platform for Android developers. Developers use Google Sign-In to connect their Google Drive, upload APKs, manage releases, and share builds with testers.',
    url: 'https://testapk.clipboux.online',
    siteName: 'TestAPK',
    images: [
      {
        url: 'https://testapk.clipboux.online/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'TestAPK',
      },
      {
        url: 'https://testapk.clipboux.online/android-chrome-192x192.png',
        width: 192,
        height: 192,
        alt: 'TestAPK',
      },
      {
        url: 'https://testapk.clipboux.online/favicon-48x48.png',
        width: 48,
        height: 48,
        alt: 'TestAPK',
      },
      {
        url: 'https://testapk.clipboux.online/favicon-32x32.png',
        width: 32,
        height: 32,
        alt: 'TestAPK',
      },
      {
        url: 'https://testapk.clipboux.online/favicon-16x16.png',
        width: 16,
        height: 16,
        alt: 'TestAPK',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://testapk.clipboux.online',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
