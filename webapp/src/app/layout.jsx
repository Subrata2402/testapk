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
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'TestAPK',
    description:
      'TestAPK is a secure APK distribution platform for Android developers. Developers use Google Sign-In to connect their Google Drive, upload APKs, manage releases, and share builds with testers.',
    url: 'https://testapk.clipboux.online',
    siteName: 'TestAPK',
    images: [
      {
        url: 'https://testapk.clipboux.online/favicon.png',
        width: 512,
        height: 512,
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
