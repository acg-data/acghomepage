interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  jsonLd: Record<string, unknown>[];
}

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aryo Consulting Group",
  url: "https://aryocg.com",
  logo: "https://aryocg.com/og-image.png",
  description: "We partner with Boards and C-Suites to harmonize operational levers, mitigating risk while unlocking trapped enterprise value.",
  foundingDate: "2024",
  founder: { "@type": "Person", name: "Justin Abrams", jobTitle: "Founder & CEO" },
  contactPoint: { "@type": "ContactPoint", email: "justin@aryocg.com", contactType: "Business Inquiries" },
  sameAs: ["https://www.linkedin.com/company/aryo-consulting-group"],
  areaServed: ["US"],
};

const PROFESSIONAL_SERVICE_SCHEMA = {
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
    { "@type": "PostalAddress", addressLocality: "Boston", addressRegion: "MA", addressCountry: "US" },
    { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
  ],
  areaServed: { "@type": "Country", name: "United States" },
  sameAs: ["https://www.linkedin.com/company/aryo-consulting-group"],
};

function breadcrumb(items: { name: string; url: string }[]) {
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

function service(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: { "@type": "Organization", name: "Aryo Consulting Group", url: "https://aryocg.com" },
    areaServed: { "@type": "Country", name: "United States" },
  };
}

function webPage(name: string, description: string, url: string, type = "WebPage") {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url,
    isPartOf: { "@type": "WebSite", name: "Aryo Consulting Group", url: "https://aryocg.com" },
    publisher: { "@type": "Organization", name: "Aryo Consulting Group", url: "https://aryocg.com" },
  };
}

function localBusiness(city: string, state: string, address: string, postalCode: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://aryocg.com/#office-${city.toLowerCase().replace(/\s/g, "-")}`,
    name: `Aryo Consulting Group - ${city}`,
    image: "https://aryocg.com/og-image.png",
    url: "https://aryocg.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: city,
      addressRegion: state,
      postalCode,
      addressCountry: "US",
    },
    parentOrganization: { "@type": "Organization", name: "Aryo Consulting Group" },
  };
}

function faqPage(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

const MA_FAQS = [
  { question: "What types of M&A transactions does Aryo advise on?", answer: "Aryo advises on sell-side mandates, buy-side acquisitions, corporate divestitures, and strategic partnerships for middle-market companies typically valued between $10M and $500M." },
  { question: "How long does a typical M&A engagement take?", answer: "Most M&A engagements run 4-9 months from initial preparation through closing, depending on deal complexity, regulatory requirements, and market conditions." },
  { question: "What industries does Aryo cover for M&A?", answer: "Aryo has deep M&A expertise across Financial Services, Technology, Healthcare, Consumer & Retail, Industrial, and Professional Services sectors." },
  { question: "How does Aryo's fee structure work for M&A advisory?", answer: "Aryo uses outcome-aligned fee structures that typically include a modest retainer plus a success fee tied to transaction completion, ensuring our incentives align with client outcomes." },
];

const DT_FAQS = [
  { question: "What does digital transformation consulting include?", answer: "Our digital transformation services include legacy system modernization, cloud migration strategy, data analytics implementation, UX/UI redesign, and enterprise platform selection and integration." },
  { question: "How long does a digital transformation initiative take?", answer: "Typical engagements range from 3-12 months depending on scope. We phase work into quick wins (30-90 days), medium-term improvements (3-6 months), and strategic initiatives (6-12+ months)." },
  { question: "Does Aryo handle the technical implementation?", answer: "We provide strategic guidance, vendor selection, architecture design, and project oversight. For implementation, we work with your internal team or coordinate with trusted technology partners." },
  { question: "What ROI can we expect from digital transformation?", answer: "Clients typically see 15-40% operational cost reduction, 20-50% improvement in process efficiency, and measurable revenue growth through digital channels within the first 12 months." },
];

const OE_FAQS = [
  { question: "What is operational excellence consulting?", answer: "Operational excellence consulting focuses on optimizing business processes, reducing waste, improving quality, and building sustainable performance management systems that drive continuous improvement." },
  { question: "How does Aryo measure operational improvement?", answer: "We establish baseline KPIs at engagement start and track improvements across cost reduction, cycle time, quality metrics, employee productivity, and customer satisfaction scores." },
  { question: "What methodologies does Aryo use for operational excellence?", answer: "We blend Lean, Six Sigma, and Agile principles with modern data analytics to create customized improvement frameworks tailored to each client's industry and maturity level." },
  { question: "Can operational excellence work alongside digital transformation?", answer: "Absolutely. We often combine operational excellence with digital transformation to ensure process improvements are sustained through technology enablement and automation." },
];

const GS_FAQS = [
  { question: "What does a growth strategy engagement look like?", answer: "Growth strategy engagements typically include market analysis, competitive positioning, customer segmentation, pricing optimization, channel strategy, and a detailed implementation roadmap with financial projections." },
  { question: "How does Aryo identify growth opportunities?", answer: "We use proprietary data analytics, market research, competitive benchmarking, and customer insights to identify addressable market gaps, underserved segments, and strategic adjacencies." },
  { question: "What size companies benefit from growth strategy consulting?", answer: "We work with companies from $5M to $500M+ in revenue, with particular expertise helping mid-market companies scale past growth plateaus and prepare for exits or IPOs." },
  { question: "How quickly can a growth strategy show results?", answer: "Quick-win initiatives typically show measurable results in 60-90 days. Comprehensive growth strategies show significant revenue impact within 6-12 months of implementation." },
];

const GR_FAQS = [
  { question: "What does governance and risk consulting cover?", answer: "Our governance and risk services include board effectiveness, compliance frameworks, enterprise risk management, regulatory readiness, cybersecurity governance, and ESG strategy development." },
  { question: "Is governance consulting only for public companies?", answer: "No. Private companies, PE-backed firms, and nonprofits all benefit from strong governance. Good governance practices increase company value, reduce risk, and improve decision-making at any stage." },
  { question: "How does Aryo approach enterprise risk management?", answer: "We build risk frameworks tailored to your industry, identifying key risk categories, establishing monitoring systems, defining risk appetite, and creating response protocols that protect enterprise value." },
  { question: "What regulatory frameworks does Aryo help with?", answer: "We advise on SOX compliance, SEC reporting requirements, data privacy (GDPR, CCPA), industry-specific regulations (HIPAA, PCI-DSS), and emerging ESG disclosure requirements." },
];

const TO_FAQS = [
  { question: "What is talent and organization consulting?", answer: "Talent and organization consulting helps companies build leadership capacity, design effective organizational structures, develop talent strategies, and create cultures that drive performance and retention." },
  { question: "How does Aryo approach culture transformation?", answer: "We assess current culture through surveys and interviews, define target culture aligned with strategy, then implement change through leadership development, communication, incentive redesign, and sustained reinforcement." },
  { question: "Does Aryo help with executive hiring and succession?", answer: "We provide executive assessment, succession planning frameworks, and leadership development programs. For executive search, we partner with specialized firms while guiding the overall talent strategy." },
  { question: "What industries benefit most from talent consulting?", answer: "All industries benefit, but we see particularly high impact in fast-growing technology companies, PE-backed firms undergoing transformation, healthcare organizations, and professional services firms scaling their teams." },
];

const seoRoutes: Record<string, PageSEO> = {
  "/": {
    title: "Aryo Consulting Group | Highly Effective Consulting That Works",
    description: "Aryo Consulting Group is a highly effective consulting firm. We work with Justin Abrams and a world-class team through every phase of growth to deliver results that transform businesses.",
    canonical: "https://aryocg.com",
    jsonLd: [
      ORG_SCHEMA,
      localBusiness("Boston", "MA", "Boston, MA", "02101"),
      localBusiness("New York", "NY", "New York, NY", "10001"),
    ],
  },
  "/about": {
    title: "About Aryo Consulting Group | Our Team & Mission",
    description: "Meet Aryo Consulting Group's team, mission, and values. The consulting firm that shares in outcomes and deploys real systems.",
    canonical: "https://aryocg.com/about",
    jsonLd: [
      webPage("About Aryo Consulting Group", "Meet our team, mission, and values.", "https://aryocg.com/about", "AboutPage"),
      PROFESSIONAL_SERVICE_SCHEMA,
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "About", url: "https://aryocg.com/about" }]),
    ],
  },
  "/capabilities": {
    title: "Capabilities | Aryo Consulting Group",
    description: "Six core consulting capabilities: M&A Advisory, Digital Transformation, Operational Excellence, Talent, Governance & Risk, Growth Strategy.",
    canonical: "https://aryocg.com/capabilities",
    jsonLd: [
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Capabilities", url: "https://aryocg.com/capabilities" }]),
      service("M&A Advisory", "Strategic M&A advisory for middle-market companies.", "https://aryocg.com/ma-advisory"),
      service("Digital Transformation", "Transform your business with strategic digital solutions.", "https://aryocg.com/digital-transformation"),
      service("Operational Excellence", "Transform operations with process excellence and cost optimization.", "https://aryocg.com/operational-excellence"),
      service("Talent & Organization", "Leadership development, culture transformation, and talent strategy.", "https://aryocg.com/talent-organization"),
      service("Governance & Risk", "Modern governance frameworks and enterprise risk management.", "https://aryocg.com/governance-risk"),
      service("Growth Strategy", "Data-driven strategies for market expansion and revenue optimization.", "https://aryocg.com/growth-strategy"),
    ],
  },
  "/industries": {
    title: "Industries | Aryo Consulting Group",
    description: "Aryo serves Financial Services, Technology, Healthcare, Consumer & Retail, Industrial, and Professional Services with specialized consulting.",
    canonical: "https://aryocg.com/industries",
    jsonLd: [
      webPage("Industries We Serve", "Deep sector knowledge across six major industries.", "https://aryocg.com/industries"),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Industries", url: "https://aryocg.com/industries" }]),
    ],
  },
  "/careers": {
    title: "Careers | Aryo Consulting Group",
    description: "Join Aryo Consulting Group. We're looking for talented consultants who want to work on outcome-based engagements and make real impact.",
    canonical: "https://aryocg.com/careers",
    jsonLd: [
      webPage("Careers at Aryo Consulting Group", "Join our team of talented consultants.", "https://aryocg.com/careers"),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Careers", url: "https://aryocg.com/careers" }]),
    ],
  },
  "/contact": {
    title: "Contact Us | Aryo Consulting Group",
    description: "Get in touch with Aryo Consulting Group. Contact our Boston headquarters or New York office to discuss how we can help transform your business.",
    canonical: "https://aryocg.com/contact",
    jsonLd: [
      webPage("Contact Aryo Consulting Group", "Get in touch with our Boston headquarters or New York office.", "https://aryocg.com/contact", "ContactPage"),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Contact", url: "https://aryocg.com/contact" }]),
    ],
  },
  "/case-studies": {
    title: "Case Studies | Aryo Consulting Group",
    description: "Aryo Consulting Group case studies showcasing client results in M&A, digital transformation, operational excellence, and strategic advisory.",
    canonical: "https://aryocg.com/case-studies",
    jsonLd: [
      { "@context": "https://schema.org", "@type": "CollectionPage", name: "Case Studies", description: "Client success stories.", url: "https://aryocg.com/case-studies", isPartOf: { "@type": "WebSite", name: "Aryo Consulting Group", url: "https://aryocg.com" } },
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Case Studies", url: "https://aryocg.com/case-studies" }]),
    ],
  },
  "/insights": {
    title: "Insights & Blog | Aryo Consulting Group",
    description: "Strategic insights and thought leadership from Aryo Consulting Group. Expert perspectives on M&A, digital transformation, and corporate strategy.",
    canonical: "https://aryocg.com/insights",
    jsonLd: [
      { "@context": "https://schema.org", "@type": "CollectionPage", name: "Insights & Blog", description: "Strategic insights and thought leadership.", url: "https://aryocg.com/insights", isPartOf: { "@type": "WebSite", name: "Aryo Consulting Group", url: "https://aryocg.com" } },
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Insights", url: "https://aryocg.com/insights" }]),
    ],
  },
  "/nyc": {
    title: "Aryo Consulting Group NYC | Strategy & Governance",
    description: "New York City strategy and governance consulting. Partnering with Boards and C-Suites to harmonize operational levers and unlock enterprise value.",
    canonical: "https://aryocg.com/nyc",
    jsonLd: [
      localBusiness("New York", "NY", "1 World Trade Center, Floor 85", "10007"),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "New York City", url: "https://aryocg.com/nyc" }]),
    ],
  },
  "/ma-advisory": {
    title: "M&A Advisory | Aryo Consulting Group",
    description: "Strategic M&A advisory for middle-market companies. Sell-side, buy-side, and corporate divestiture expertise to maximize transaction value.",
    canonical: "https://aryocg.com/ma-advisory",
    jsonLd: [
      service("M&A Advisory", "Strategic M&A advisory for middle-market companies.", "https://aryocg.com/ma-advisory"),
      faqPage(MA_FAQS),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Capabilities", url: "https://aryocg.com/capabilities" }, { name: "M&A Advisory", url: "https://aryocg.com/ma-advisory" }]),
    ],
  },
  "/digital-transformation": {
    title: "Digital Transformation | Aryo Consulting Group",
    description: "Transform your business with strategic digital solutions. Legacy modernization, cloud architecture, and UX design.",
    canonical: "https://aryocg.com/digital-transformation",
    jsonLd: [
      service("Digital Transformation", "Transform your business with strategic digital solutions.", "https://aryocg.com/digital-transformation"),
      faqPage(DT_FAQS),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Capabilities", url: "https://aryocg.com/capabilities" }, { name: "Digital Transformation", url: "https://aryocg.com/digital-transformation" }]),
    ],
  },
  "/operational-excellence": {
    title: "Operational Excellence | Aryo Consulting Group",
    description: "Transform operations with process excellence, cost optimization, supply chain improvements, and performance management.",
    canonical: "https://aryocg.com/operational-excellence",
    jsonLd: [
      service("Operational Excellence", "Transform operations with process excellence and cost optimization.", "https://aryocg.com/operational-excellence"),
      faqPage(OE_FAQS),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Capabilities", url: "https://aryocg.com/capabilities" }, { name: "Operational Excellence", url: "https://aryocg.com/operational-excellence" }]),
    ],
  },
  "/talent-organization": {
    title: "Talent & Organization | Aryo Consulting Group",
    description: "Transform your organization through leadership development, culture transformation, organization design, and talent strategy.",
    canonical: "https://aryocg.com/talent-organization",
    jsonLd: [
      service("Talent & Organization", "Leadership development, culture transformation, and talent strategy.", "https://aryocg.com/talent-organization"),
      faqPage(TO_FAQS),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Capabilities", url: "https://aryocg.com/capabilities" }, { name: "Talent & Organization", url: "https://aryocg.com/talent-organization" }]),
    ],
  },
  "/governance-risk": {
    title: "Governance & Risk | Aryo Consulting Group",
    description: "Modern governance frameworks and enterprise risk management that protect value and enable growth.",
    canonical: "https://aryocg.com/governance-risk",
    jsonLd: [
      service("Governance & Risk", "Modern governance frameworks and enterprise risk management.", "https://aryocg.com/governance-risk"),
      faqPage(GR_FAQS),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Capabilities", url: "https://aryocg.com/capabilities" }, { name: "Governance & Risk", url: "https://aryocg.com/governance-risk" }]),
    ],
  },
  "/growth-strategy": {
    title: "Growth Strategy | Aryo Consulting Group",
    description: "Accelerate growth with data-driven strategies for market expansion, revenue optimization, and sustainable value creation.",
    canonical: "https://aryocg.com/growth-strategy",
    jsonLd: [
      service("Growth Strategy", "Data-driven strategies for market expansion and revenue optimization.", "https://aryocg.com/growth-strategy"),
      faqPage(GS_FAQS),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Capabilities", url: "https://aryocg.com/capabilities" }, { name: "Growth Strategy", url: "https://aryocg.com/growth-strategy" }]),
    ],
  },
  "/pitch-decks": {
    title: "Pitch Deck Design Services | Aryo Consulting Group",
    description: "Compelling pitch decks for startups and enterprises. Investor-ready design, compelling narratives, and data visualization expertise.",
    canonical: "https://aryocg.com/pitch-decks",
    jsonLd: [
      service("Pitch Deck Design Services", "Compelling pitch decks for startups and enterprises.", "https://aryocg.com/pitch-decks"),
      faqPage([
        { question: "How much does a pitch deck cost?", answer: "Our pitch deck projects typically range from $2,000-$15,000 depending on complexity, custom research requirements, and design specifications. We offer packages for startups and enterprises." },
        { question: "How long does it take to create a pitch deck?", answer: "Standard pitch decks are delivered in 5-10 business days. Rush delivery is available for time-sensitive fundraising rounds or board presentations." },
        { question: "What makes a great pitch deck?", answer: "A great pitch deck combines a compelling narrative, clear market opportunity sizing, strong financial projections, professional design, and a confident ask. We help with all of these elements." },
        { question: "Do you help with investor presentations beyond the deck?", answer: "Yes. We provide presentation coaching, Q&A preparation, financial model review, and can join pitch meetings as strategic advisors when needed." },
      ]),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Pitch Deck Design", url: "https://aryocg.com/pitch-decks" }]),
    ],
  },
  "/pitch-deck": {
    title: "Pitch Deck | Aryo Consulting Group",
    description: "Explore our interactive pitch deck showcasing Aryo Consulting Group's mission, solutions, and growth strategy.",
    canonical: "https://aryocg.com/pitch-deck",
    jsonLd: [
      webPage("Aryo Consulting Group Pitch Deck", "Interactive pitch deck showcasing our mission and growth strategy.", "https://aryocg.com/pitch-deck"),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Pitch Deck", url: "https://aryocg.com/pitch-deck" }]),
    ],
  },
  "/value-creation": {
    title: "Value Creation Matrix | Aryo Consulting Group",
    description: "Explore strategic value creation levers across industries and company sizes. Identify high-ROI opportunities with our interactive simulator.",
    canonical: "https://aryocg.com/value-creation",
    jsonLd: [
      webPage("Value Creation Matrix", "Explore strategic value creation levers across industries.", "https://aryocg.com/value-creation"),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Value Creation", url: "https://aryocg.com/value-creation" }]),
    ],
  },
  "/valuation-tool": {
    title: "Business Valuation Tool | Aryo Consulting Group",
    description: "Get a preliminary estimate of your company's value based on industry benchmarks and financial metrics.",
    canonical: "https://aryocg.com/valuation-tool",
    jsonLd: [
      webPage("Business Valuation Tool", "Preliminary company valuation based on industry benchmarks.", "https://aryocg.com/valuation-tool"),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Valuation Tool", url: "https://aryocg.com/valuation-tool" }]),
    ],
  },
  "/ai-consultant": {
    title: "AI Consultant | Aryo Consulting Group",
    description: "Get instant strategic insights powered by AI, trained on Aryo's proven consulting methodology and best practices.",
    canonical: "https://aryocg.com/ai-consultant",
    jsonLd: [
      webPage("AI Consultant", "AI-powered strategic insights trained on proven consulting methodology.", "https://aryocg.com/ai-consultant"),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "AI Consultant", url: "https://aryocg.com/ai-consultant" }]),
    ],
  },
  "/tools/pe-valuation-tool": {
    title: "PE Valuation Tool | Aryo Consulting Group",
    description: "Comprehensive private equity valuation suite with multiple methodologies including EBITDA, revenue, and SDE multiples.",
    canonical: "https://aryocg.com/tools/pe-valuation-tool",
    jsonLd: [
      webPage("Private Equity Valuation Tool", "Multi-method valuation analysis for small and mid-market businesses.", "https://aryocg.com/tools/pe-valuation-tool"),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "PE Valuation Tool", url: "https://aryocg.com/tools/pe-valuation-tool" }]),
    ],
  },
  "/tools/stablecoin-calculator": {
    title: "Stablecoin Savings Calculator | Aryo Consulting Group",
    description: "Calculate your potential savings from stablecoin adoption. Discover FX savings, treasury yield, and settlement efficiency gains.",
    canonical: "https://aryocg.com/tools/stablecoin-calculator",
    jsonLd: [
      webPage("Stablecoin Savings Calculator", "Calculate potential savings from stablecoin adoption.", "https://aryocg.com/tools/stablecoin-calculator"),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Stablecoin Calculator", url: "https://aryocg.com/tools/stablecoin-calculator" }]),
    ],
  },
  "/tools/website-analyzer": {
    title: "Website Analyzer | Aryo Consulting Group",
    description: "Analyze your website's performance and conversion optimization with AI-powered insights and professional grading.",
    canonical: "https://aryocg.com/tools/website-analyzer",
    jsonLd: [
      webPage("Website Analyzer", "AI-powered website performance analysis and conversion optimization.", "https://aryocg.com/tools/website-analyzer"),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Website Analyzer", url: "https://aryocg.com/tools/website-analyzer" }]),
    ],
  },
  "/reports/q4-hiring-abroad": {
    title: "Q4 Hiring Abroad Report | Aryo Consulting Group",
    description: "Download our guide to global talent, costs, and collaboration. Build effective international teams with insights from Aryo Consulting Group.",
    canonical: "https://aryocg.com/reports/q4-hiring-abroad",
    jsonLd: [
      webPage("Q4 Hiring Abroad Report", "Guide to global talent, costs, and collaboration.", "https://aryocg.com/reports/q4-hiring-abroad"),
      breadcrumb([{ name: "Home", url: "https://aryocg.com" }, { name: "Q4 Hiring Abroad Report", url: "https://aryocg.com/reports/q4-hiring-abroad" }]),
    ],
  },
};

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function injectSEO(html: string, path: string): string {
  const normalizedPath = path.split("?")[0].replace(/\/$/, "") || "/";
  const seo = seoRoutes[normalizedPath];
  if (!seo) return html;

  const tags: string[] = [];

  tags.push(`<title>${escapeHtml(seo.title)}</title>`);
  tags.push(`<meta name="description" content="${escapeHtml(seo.description)}">`);
  tags.push(`<link rel="canonical" href="${escapeHtml(seo.canonical)}">`);

  tags.push(`<meta property="og:title" content="${escapeHtml(seo.title)}">`);
  tags.push(`<meta property="og:description" content="${escapeHtml(seo.description)}">`);
  tags.push(`<meta property="og:url" content="${escapeHtml(seo.canonical)}">`);
  tags.push(`<meta property="og:type" content="${seo.ogType || "website"}">`);
  tags.push(`<meta property="og:image" content="https://aryocg.com/og-image.png">`);
  tags.push(`<meta property="og:site_name" content="Aryo Consulting Group">`);

  tags.push(`<meta name="twitter:card" content="summary_large_image">`);
  tags.push(`<meta name="twitter:title" content="${escapeHtml(seo.title)}">`);
  tags.push(`<meta name="twitter:description" content="${escapeHtml(seo.description)}">`);
  tags.push(`<meta name="twitter:image" content="https://aryocg.com/og-image.png">`);

  if (seo.jsonLd.length > 0) {
    const ldData = seo.jsonLd.length === 1 ? seo.jsonLd[0] : seo.jsonLd;
    const safeJsonLd = JSON.stringify(ldData).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
    tags.push(`<script type="application/ld+json">${safeJsonLd}</script>`);
  }

  let modified = html;
  modified = modified.replace(/<title>[^<]*<\/title>/, "");
  modified = modified.replace(/<meta\s+name="description"[^>]*>/i, "");
  modified = modified.replace(/<meta\s+property="og:title"[^>]*>/i, "");
  modified = modified.replace(/<meta\s+property="og:description"[^>]*>/i, "");
  modified = modified.replace(/<meta\s+property="og:type"[^>]*>/i, "");
  modified = modified.replace(/<meta\s+property="og:image"[^>]*>/i, "");
  modified = modified.replace(/<meta\s+property="og:url"[^>]*>/i, "");
  modified = modified.replace(/<meta\s+property="og:site_name"[^>]*>/i, "");
  modified = modified.replace(/<meta\s+name="twitter:card"[^>]*>/i, "");
  modified = modified.replace(/<meta\s+name="twitter:title"[^>]*>/i, "");
  modified = modified.replace(/<meta\s+name="twitter:description"[^>]*>/i, "");
  modified = modified.replace(/<meta\s+name="twitter:image"[^>]*>/i, "");

  modified = modified.replace("</head>", tags.join("\n    ") + "\n  </head>");

  return modified;
}

export function getPageSEO(path: string): PageSEO | undefined {
  const normalizedPath = path.split("?")[0].replace(/\/$/, "") || "/";
  return seoRoutes[normalizedPath];
}
