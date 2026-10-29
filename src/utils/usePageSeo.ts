import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown> | null;
  noIndex?: boolean;
}

const SITE_URL = 'https://wallacepereiradev.vercel.app';
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

export function usePageSeo({ title, description, path, jsonLd, noIndex }: PageSeoOptions) {
  const { language } = useApp();

  useEffect(() => {
    // 1. Synchronize HTML lang attribute
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';

    // 2. Title
    document.title = title;

    // 3. Helper to create or update meta tags
    const setMeta = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 4. Robots indexing tag
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // 5. Update Meta Description
    setMeta('name', 'description', description);

    // 5. Update Canonical Link
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const absoluteCanonical = `${SITE_URL}${cleanPath === '/' ? '/' : cleanPath}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', absoluteCanonical);

    // 6. Open Graph & Twitter Tags
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', absoluteCanonical);
    setMeta('property', 'og:image', OG_IMAGE_URL);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', OG_IMAGE_URL);

    // 7. Inject or Update Page-Specific JSON-LD Script
    const jsonLdId = 'page-json-ld';
    let scriptEl = document.getElementById(jsonLdId);
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = jsonLdId;
        scriptEl.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      // Clean up page-specific JSON-LD on unmount
      const el = document.getElementById(jsonLdId);
      if (el) el.remove();
    };
  }, [title, description, path, jsonLd, language, noIndex]);
}
