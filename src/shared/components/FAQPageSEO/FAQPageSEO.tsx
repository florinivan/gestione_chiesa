import React from 'react';

export function FAQPageSEO() {
  const seo = `{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Perch&eacute; scegliere Chiesa Mananata Alessandria?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": ""
        }
      }
    ]
  }`;
  return <script type="application/ld+json">{seo}</script>;
}
