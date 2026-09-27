import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../../context/LanguageContext';

export default function SEOManager() {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    // 1. Get current path and normalize it (remove trailing slash unless it's root)
    let path = location.pathname;
    if (path.endsWith('/') && path.length > 1) {
      path = path.slice(0, -1);
    }

    // 2. Determine translation keys based on path
    let titleKey = 'SEO.DEFAULT_TITLE';
    let descKey = 'SEO.DEFAULT_DESC';

    if (path === '/') {
      titleKey = 'SEO.DEFAULT_TITLE';
      descKey = 'SEO.DEFAULT_DESC';
    } else if (path === '/faq') {
      titleKey = 'SEO.FAQ_TITLE';
      descKey = 'SEO.FAQ_DESC';
    } else if (path === '/privacy') {
      titleKey = 'SEO.PRIVACY_TITLE';
      descKey = 'SEO.PRIVACY_DESC';
    } else if (path === '/terms') {
      titleKey = 'SEO.TERMS_TITLE';
      descKey = 'SEO.TERMS_DESC';
    } else if (path === '/device') {
      titleKey = 'SEO.DEVICE_TITLE';
      descKey = 'SEO.DEVICE_DESC';
    } else if (path === '/dashboard') {
      titleKey = 'SEO.DASHBOARD_TITLE';
      descKey = 'SEO.DASHBOARD_DESC';
    } else if (path === '/dashboard/create-app') {
      titleKey = 'SEO.CREATE_APP_TITLE';
      descKey = 'SEO.CREATE_APP_DESC';
    } else if (path.startsWith('/dashboard/apps/')) {
      titleKey = 'SEO.APP_DETAILS_TITLE';
      descKey = 'SEO.APP_DETAILS_DESC';
    }

    const title = t(titleKey);
    const description = t(descKey);

    // 3. Update Document Title
    document.title = title;

    // 4. Update Canonical URL
    const canonicalUrl = `https://testapk.clipboux.online${path}`;
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 5. Update Meta Description
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 6. Update Open Graph Tags
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:url': canonicalUrl,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property='${property}']`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  }, [location, t]);

  return null;
}
