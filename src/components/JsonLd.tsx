export default function JsonLd() {
  const realEstateAgent = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Jacky Luong",
    description:
      "Personalized guidance for discerning buyers and sellers across the San Francisco Bay Area's most coveted neighborhoods.",
    url: "https://jackyluongrealestate.com",
    telephone: "+1-415-572-1220",
    email: "jacky@kineticrealestate.com",
    image: "https://jackyluongrealestate.com/images/jacky-headshot.jpg",
    priceRange: "$$$",
    areaServed: [
      {
        "@type": "City",
        name: "San Francisco",
        containedInPlace: {
          "@type": "State",
          name: "California",
        },
      },
      {
        "@type": "City",
        name: "Daly City",
        containedInPlace: {
          "@type": "State",
          name: "California",
        },
      },
      {
        "@type": "City",
        name: "Hillsborough",
        containedInPlace: {
          "@type": "State",
          name: "California",
        },
      },
      {
        "@type": "City",
        name: "Atherton",
        containedInPlace: {
          "@type": "State",
          name: "California",
        },
      },
      {
        "@type": "City",
        name: "Palo Alto",
        containedInPlace: {
          "@type": "State",
          name: "California",
        },
      },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Real Estate License",
      recognizedBy: {
        "@type": "Organization",
        name: "California Department of Real Estate",
      },
      identifier: "DRE #02254871",
    },
    memberOf: {
      "@type": "Organization",
      name: "Kinetic Real Estate",
    },
    knowsAbout: [
      "Luxury real estate",
      "Residential property sales",
      "Home buying consultation",
      "Property selling strategy",
      "San Francisco Bay Area real estate market",
    ],
    slogan: "Coaching You to Your Future Home",
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://jackyluongrealestate.com/#business",
    name: "Jacky Luong — Real Estate",
    description:
      "Luxury real estate services across the San Francisco Bay Area. Personalized guidance for discerning buyers and sellers.",
    url: "https://jackyluongrealestate.com",
    telephone: "+1-415-572-1220",
    email: "jacky@kineticrealestate.com",
    image: "https://jackyluongrealestate.com/images/og-image.jpg",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "3",
      bestRating: "5",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jacky Luong Real Estate",
    url: "https://jackyluongrealestate.com",
    description:
      "Discover luxury homes in San Francisco, Hillsborough, Atherton, Palo Alto and the Bay Area with Jacky Luong.",
    publisher: {
      "@type": "Person",
      name: "Jacky Luong",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgent) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
