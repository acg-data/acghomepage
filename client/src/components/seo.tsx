import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  canonical?: string;
}

function getOrCreateMeta(selector: string, attr: string, value: string): void {
  let meta = document.querySelector(selector) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement("meta");
    if (attr === "name") {
      meta.name = value;
    } else {
      meta.setAttribute("property", value);
    }
    document.head.appendChild(meta);
  }
}

export function SEO({ 
  title, 
  description, 
  ogTitle, 
  ogDescription, 
  ogType = "website",
  canonical 
}: SEOProps) {
  useEffect(() => {
    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    let ogTitleMeta = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
    if (!ogTitleMeta) {
      ogTitleMeta = document.createElement("meta");
      ogTitleMeta.setAttribute("property", "og:title");
      document.head.appendChild(ogTitleMeta);
    }
    ogTitleMeta.content = ogTitle || title;

    let ogDescMeta = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
    if (!ogDescMeta) {
      ogDescMeta = document.createElement("meta");
      ogDescMeta.setAttribute("property", "og:description");
      document.head.appendChild(ogDescMeta);
    }
    ogDescMeta.content = ogDescription || description;

    let ogTypeMeta = document.querySelector('meta[property="og:type"]') as HTMLMetaElement;
    if (!ogTypeMeta) {
      ogTypeMeta = document.createElement("meta");
      ogTypeMeta.setAttribute("property", "og:type");
      document.head.appendChild(ogTypeMeta);
    }
    ogTypeMeta.content = ogType;

    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.rel = "canonical";
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    }

    return () => {
      document.title = "Aryo Consulting Group | Corporate Strategy & Governance";
    };
  }, [title, description, ogTitle, ogDescription, ogType, canonical]);

  return null;
}
