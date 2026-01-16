export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Shoulder Season Sightseers',
    alternateName: 'Triple S Travel',
    description: 'Budget travel blog sharing experiences from 16+ countries with practical tips for shoulder season travel.',
    url: 'https://shoulderseasonsightseers.com',
    logo: 'https://shoulderseasonsightseers.com/logo.png',
    sameAs: [
      'https://triples.travel',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Travel Guides and Tips',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Budget Travel Tips',
            description: 'Comprehensive guides on budget-friendly travel',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
