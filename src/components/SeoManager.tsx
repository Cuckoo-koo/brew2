import React, { useEffect } from 'react';
import { SiteSettings } from '../lib/cmsDataService';

interface SeoManagerProps {
  settings?: SiteSettings | null;
}

export const SeoManager: React.FC<SeoManagerProps> = ({ settings }) => {
  useEffect(() => {
    const title = settings?.heroTitle
      ? `${settings.name || 'The Daily Brew'} | ${settings.heroTitle}`
      : 'The Daily Brew | Everyday Coffee Destination in Chennai';

    const description =
      settings?.heroSubtitle ||
      'From freshly brewed artisanal coffee to delicious sandwiches and brownies, discover your favourite spot to relax, recharge, and reconnect at The Daily Brew in Chennai.';

    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Update OpenGraph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Update Twitter
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);

    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', description);
  }, [settings]);

  return null;
};
