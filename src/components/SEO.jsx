import { useEffect } from 'react';

const SITE_URL = 'https://melbetagentship.com';
const SITE_NAME = 'MelBet Agentship';
const ALTERNATE_PAGES = [
  ['en', `${SITE_URL}/`],
  ['ar-SA', `${SITE_URL}/sa/`],
  ['ru', `${SITE_URL}/ru/`],
  ['x-default', `${SITE_URL}/`],
];

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function setLink(rel, key, href) {
  const selector = key ? `link[rel="${rel}"][${key}]` : `link[rel="${rel}"]`;
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }

  if (key) element.setAttribute(key, href);
  else element.href = href;
  return element;
}

export default function SEO({ title, description, lang, path, noindex = false }) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path}`;

    document.title = title;
    document.documentElement.lang = lang;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:locale', lang.replace('-', '_'));
    setMeta('name', 'twitter:card', 'summary');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setLink('canonical', '', canonicalUrl);

    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((element) => element.remove());
    if (!noindex) {
      ALTERNATE_PAGES.forEach(([locale, href]) => {
        const alternate = document.createElement('link');
        alternate.rel = 'alternate';
        alternate.hreflang = locale;
        alternate.href = href;
        document.head.appendChild(alternate);
      });
    }

    let structuredData = document.head.querySelector('script[data-seo-webpage]');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.type = 'application/ld+json';
      structuredData.dataset.seoWebpage = 'true';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: lang,
    });
  }, [description, lang, noindex, path, title]);

  return null;
}
