import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  canonical?: string;
  twitterCard?: "summary" | "summary_large_image";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function setMeta(property: string, content: string, type: "name" | "property" = "property") {
  const selector = type === "name" ? `meta[name="${property}"]` : `meta[property="${property}"]`;
  let el = document.querySelector(selector) as HTMLMetaElement;
  if (!el) {
    el = document.createElement("meta");
    if (type === "name") {
      el.name = property;
    } else {
      el.setAttribute("property", property);
    }
    document.head.appendChild(el);
  }
  el.content = content;
}

const JSON_LD_ID = "seo-json-ld";

export function SEO({
  title,
  description,
  ogTitle,
  ogDescription,
  ogType = "website",
  ogImage = "https://aryocg.com/og-image.png",
  canonical,
  twitterCard = "summary_large_image",
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    setMeta("description", description, "name");

    setMeta("og:title", ogTitle || title);
    setMeta("og:description", ogDescription || description);
    setMeta("og:type", ogType);
    setMeta("og:image", ogImage);
    if (canonical) {
      setMeta("og:url", canonical);
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.rel = "canonical";
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    } else {
      const existingOgUrl = document.querySelector('meta[property="og:url"]');
      if (existingOgUrl) existingOgUrl.remove();
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) existingCanonical.remove();
    }

    setMeta("twitter:card", twitterCard, "name");
    setMeta("twitter:title", ogTitle || title, "name");
    setMeta("twitter:description", ogDescription || description, "name");
    setMeta("twitter:image", ogImage, "name");

    if (jsonLd) {
      let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.id = JSON_LD_ID;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      const data = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      script.textContent = JSON.stringify(data.length === 1 ? data[0] : data);
    } else {
      const existing = document.getElementById(JSON_LD_ID);
      if (existing) existing.remove();
    }

    return () => {
      document.title = "Aryo Consulting Group | Corporate Strategy & Governance";
      const ldScript = document.getElementById(JSON_LD_ID);
      if (ldScript) ldScript.remove();
    };
  }, [title, description, ogTitle, ogDescription, ogType, ogImage, canonical, twitterCard, jsonLd]);

  return null;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aryo Consulting Group",
    url: "https://aryocg.com",
    logo: "https://aryocg.com/og-image.png",
    description: "We partner with Boards and C-Suites to harmonize operational levers, mitigating risk while unlocking trapped enterprise value.",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Justin Abrams",
      jobTitle: "Founder & CEO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "justin@aryocg.com",
      contactType: "Business Inquiries",
    },
    sameAs: [
      "https://www.linkedin.com/company/aryo-consulting-group",
    ],
    areaServed: ["US"],
    knowsAbout: [
      "M&A Advisory",
      "Digital Transformation",
      "Operational Excellence",
      "Talent & Organization",
      "Governance & Risk",
      "Growth Strategy",
    ],
  };
}

export function localBusinessSchema(office: {
  name: string;
  city: string;
  state: string;
  address: string;
  postalCode: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://aryocg.com/#office-${office.city.toLowerCase().replace(/\s/g, "-")}`,
    name: `Aryo Consulting Group - ${office.city}`,
    image: "https://aryocg.com/og-image.png",
    url: "https://aryocg.com",
    telephone: "",
    address: {
      "@type": "PostalAddress",
      streetAddress: office.address,
      addressLocality: office.city,
      addressRegion: office.state,
      postalCode: office.postalCode,
      addressCountry: "US",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Aryo Consulting Group",
    },
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@type": "Organization",
      name: "Aryo Consulting Group",
      url: "https://aryocg.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished || new Date().toISOString(),
    dateModified: article.dateModified || article.datePublished || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: article.author || "Aryo Consulting Group",
    },
    publisher: {
      "@type": "Organization",
      name: "Aryo Consulting Group",
      url: "https://aryocg.com",
      logo: {
        "@type": "ImageObject",
        url: "https://aryocg.com/og-image.png",
      },
    },
    image: article.image || "https://aryocg.com/og-image.png",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function webPageSchema(page: {
  name: string;
  description: string;
  url: string;
  type?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": page.type || "WebPage",
    name: page.name,
    description: page.description,
    url: page.url,
    isPartOf: {
      "@type": "WebSite",
      name: "Aryo Consulting Group",
      url: "https://aryocg.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Aryo Consulting Group",
      url: "https://aryocg.com",
    },
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Aryo Consulting Group",
    url: "https://aryocg.com",
    logo: "https://aryocg.com/og-image.png",
    description: "Corporate strategy and governance consulting firm specializing in M&A advisory, digital transformation, operational excellence, and growth strategy.",
    priceRange: "$$$$",
    telephone: "1-508-545-7447",
    email: "info@aryocg.com",
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Boston",
        addressRegion: "MA",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "New York",
        addressRegion: "NY",
        addressCountry: "US",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Consulting Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "M&A Advisory" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Transformation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Operational Excellence" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Talent & Organization" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Governance & Risk" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Growth Strategy" } },
      ],
    },
    sameAs: ["https://www.linkedin.com/company/aryo-consulting-group"],
  };
}

export function jobPostingSchema(job: {
  title: string;
  description: string;
  location: string;
  employmentType: string;
}) {
  const locations = job.location.split(" / ").map((loc) => ({
    "@type": "Place" as const,
    address: {
      "@type": "PostalAddress" as const,
      addressLocality: loc.trim(),
      addressCountry: "US",
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    employmentType: job.employmentType === "Full-time" ? "FULL_TIME" : job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: "Aryo Consulting Group",
      sameAs: "https://aryocg.com",
      logo: "https://aryocg.com/og-image.png",
    },
    jobLocation: locations.length === 1 ? locations[0] : locations,
    datePosted: "2025-01-15",
  };
}

export function collectionPageSchema(page: {
  name: string;
  description: string;
  url: string;
  items?: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.name,
    description: page.description,
    url: page.url,
    isPartOf: {
      "@type": "WebSite",
      name: "Aryo Consulting Group",
      url: "https://aryocg.com",
    },
    ...(page.items && page.items.length > 0 && {
      mainEntity: {
        "@type": "ItemList",
        itemListElement: page.items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          url: item.url,
        })),
      },
    }),
  };
}
