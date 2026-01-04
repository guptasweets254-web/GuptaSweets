import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSettings } from '@/contexts/SettingsContext';

const SiteMeta: React.FC = () => {
  const { settings, isLoading } = useSettings();

  if (isLoading) return null;

  const title = `${settings?.siteName} | ${settings?.tagline}` || 'Gupta Sweets';
  const description = settings?.description || 'Gupta Sweets - Authentic Indian sweets made with pure ingredients.';
  const logo = settings?.logoUrl || '';
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {logo && <meta property="og:image" content={logo.startsWith('http') ? logo : `${siteUrl}${logo}`} />}
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content={logo ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {logo && <meta name="twitter:image" content={logo.startsWith('http') ? logo : `${siteUrl}${logo}`} />}

      {/* Canonical */}
      <link rel="canonical" href={siteUrl} />
    </Helmet>
  );
};

export default SiteMeta;
