import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  canonical,
  type = "website",
  image = "/the-marketier-logo.png"
}) {
  const siteUrl = "https://themarketier.com"; // Update with your actual domain
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type === "service" ? "Service" : "Organization",
    "name": title,
    "description": description,
    "url": fullUrl,
    "logo": `${siteUrl}${image}`,
    ...(type === "service" && {
      "provider": {
        "@type": "Organization",
        "name": "The Marketier"
      },
      "areaServed": "United States",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Marketing Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": title,
              "description": description
            }
          }
        ]
      }
    })
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}