import { profile } from '@/data/profile';

import { PortfolioPage } from '@/components/portfolio-page';

export default function HomePage() {
  const personStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.personalInfo.name,
    jobTitle: 'PhD in Computer Science',
    description: profile.seo.description,
    email: profile.contact.email,
    telephone: profile.contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lucknow',
      addressCountry: 'India',
    },
    affiliation: profile.personalInfo.institution,
    sameAs: profile.socialLinks.map((link) => link.href),
    knowsAbout: profile.postdocInterests.areas,
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
      />
      <PortfolioPage initialProfile={profile} />
    </>
  );
}