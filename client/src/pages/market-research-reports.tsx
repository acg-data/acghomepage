import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  ChevronDown,
  Calendar,
  FileText,
  Headphones,
  Download,
  TrendingUp,
  DollarSign,
  Users,
  MapPin,
  Plus,
  X,
  BarChart3,
} from "lucide-react";
import { SEO } from "@/components/seo";

// ────────────────────────── DESIGN TOKENS ──────────────────────────
const C = {
  primary: "#1B4F8F",
  primaryDark: "#143D6E",
  primaryDeep: "#0D2B4F",
  primaryDeeper: "#0A1F3C",
  teal: "#0D9488",
  tealLight: "#14B8A6",
  cream: "#F5F7F2",
  slate: "#3D5066",
  slateLight: "#6B7A8F",
  charcoal: "#1A2433",
  borderLight: "#E2E8F0",
  starGold: "#F59E0B",
};

// ────────────────────────── ANNOUNCEMENT BAR ──────────────────────────
function AnnouncementBar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-white h-10 flex items-center justify-center gap-2 text-[13px] font-medium cursor-pointer transition-colors"
        style={{ background: C.primary }}
      >
        <span style={{ color: C.tealLight }}>⚡</span>
        <span>Limited Time — Get the 2025 Landscaping Market Report for $97 (Reg. $497)</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: expanded ? "300px" : "0" }}
      >
        <div
          className="max-w-[600px] mx-auto py-6 px-4 text-center text-white"
          style={{ background: C.primaryDark }}
        >
          <p className="text-lg font-semibold mb-2">Early-Bird Pricing Ends Soon</p>
          <p className="text-sm opacity-80 mb-3">
            The first 100 landscapers get the complete 2025 Market Research Report for just $97.
            After that, it goes back to the regular $497 price.
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold" style={{ color: C.tealLight }}>SAVE</span> $400 off regular price
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold" style={{ color: C.tealLight }}>FREE</span> Bonus: Pricing Calculator
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold" style={{ color: C.tealLight }}>FREE</span> Bonus: Competitor Tracker
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold" style={{ color: C.tealLight }}>FREE</span> Bonus: Seasonal Guide
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────── NAVIGATION ──────────────────────────
function Navigation() {
  return (
    <nav
      className="sticky top-0 z-40 h-14 bg-white/95 backdrop-blur-xl"
      style={{ borderBottom: `1px solid ${C.borderLight}` }}
    >
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <path d="M20 4L4 36H12L20 20L28 36H36L20 4Z" fill={C.primary} />
            <path d="M20 12L14 24H18L20 20L22 24H26L20 12Z" fill={C.teal} />
          </svg>
          <span className="font-semibold text-[15px] tracking-wide" style={{ color: C.primary }}>
            ARYO CONSULTING GROUP
          </span>
        </div>
        <a
          href="#buy"
          className="text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors hover:opacity-90"
          style={{ background: C.primary }}
        >
          Get the Report
        </a>
      </div>
    </nav>
  );
}

// ────────────────────────── HERO ──────────────────────────

const reportChapters = [
  { id: "market", name: "Market Overview", desc: "Industry size, growth trends, and forecast through 2028", color: C.primary },
  { id: "pricing", name: "Pricing Analysis", desc: "What top landscapers charge — by service, region, and season", color: C.teal },
  { id: "competition", name: "Competitive Intel", desc: "Who your real competitors are and how to beat them", color: C.primary },
  { id: "complete", name: "Complete Report", desc: "All chapters + bonus tools and templates", color: C.teal, popular: true },
];

const purchaseOptions = [
  {
    id: "report",
    name: "2025 Landscaping Market Report",
    save: "80%",
    saveAmount: "$400",
    regularPrice: "$497",
    price: "$97",
    billing: "One-time payment — instant PDF download",
    popular: true,
    features: [
      { label: "120+", text: "Pages of original research", highlight: true },
      { label: "50+", text: "Data visualizations & charts", highlight: true },
      { label: "", text: "Pricing benchmarks by region", highlight: false },
      { label: "", text: "Competitor analysis toolkit", highlight: false },
      { label: "BONUS", text: "Landscaping Pricing Calculator (Excel)", highlight: true },
      { label: "BONUS", text: "Seasonal Revenue Planning Guide", highlight: true },
      { label: "BONUS", text: "Customer Acquisition Playbook", highlight: true },
      { label: "", text: "Lifetime updates to this edition", highlight: false },
    ],
  },
  {
    id: "strategy",
    name: "Report + Strategy Call",
    save: "73%",
    saveAmount: "$1,300",
    regularPrice: "$1,794",
    price: "$497",
    billing: "Includes report + 90-minute private session",
    popular: false,
    features: [
      { label: "INCLUDES", text: "Everything in the $97 report", highlight: true },
      { label: "90-MIN", text: "Private strategy call with ACG consultant", highlight: true },
      { label: "", text: "Custom pricing strategy for YOUR market", highlight: false },
      { label: "", text: "Growth roadmap specific to your business", highlight: false },
      { label: "", text: "Q&A — ask anything about your operation", highlight: false },
      { label: "", text: "30 days of email follow-up support", highlight: false },
      { label: "RECORDING", text: "Call recording + action items delivered", highlight: true },
    ],
  },
];

function Hero() {
  const [selectedChapter, setSelectedChapter] = useState(reportChapters[3]);
  const [showChapterDropdown, setShowChapterDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("report");

  return (
    <section id="buy" className="bg-white pt-10 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Left — Book Mockup */}
          <div className="lg:w-[50%] flex items-center justify-center">
            <div className="relative w-full max-w-[480px]">
              <img
                src="/market-research-reports/report-book-mockup.jpg"
                alt="2026 US Landscaping Industry Market Report — Book Mockup"
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right — Purchase Card */}
          <div className="lg:w-[50%]">
            <div className="lg:sticky lg:top-24">
              {/* Social Proof */}
              <div className="flex items-center gap-2 text-[13px] mb-3 flex-wrap" style={{ color: C.slateLight }}>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill={C.starGold} color={C.starGold} />
                  ))}
                </div>
                <span className="font-medium" style={{ color: C.charcoal }}>4.9</span>
                <span>from 340+ Landscapers · 1,200+ copies sold · Used in 42 states</span>
              </div>

              <h1 className="text-[26px] font-bold leading-tight tracking-tight mb-1" style={{ color: C.charcoal }}>
                2025 LANDSCAPING INDUSTRY MARKET REPORT
              </h1>
              <p className="text-lg font-medium mb-3" style={{ color: C.primary }}>
                The Data-Driven Blueprint to Grow Your Landscaping Business
              </p>
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: C.slate }}>
                Stop guessing what to charge, who to target, and where the industry is headed. This
                120+ page report gives you the exact market intelligence, pricing benchmarks, and
                competitive analysis that top-performing landscaping firms use to stay ahead.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                {["120+ Pages", "50+ Charts", "2025 Data", "Instant Download"].map((badge) => (
                  <span
                    key={badge}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full border"
                    style={{ color: C.primary, borderColor: `${C.primary}40`, background: `${C.primary}08` }}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Chapter Selector */}
              <div className="mb-5">
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: C.slateLight }}>
                  Report Edition:
                </p>
                <button
                  onClick={() => setShowChapterDropdown(!showChapterDropdown)}
                  className="w-full border-2 rounded-xl p-4 flex items-center gap-3 bg-white transition-all hover:shadow-md"
                  style={{ borderColor: `${C.primary}50` }}
                >
                  <FileText size={24} style={{ color: C.primary }} className="shrink-0" />
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[15px]">{selectedChapter.name}</span>
                      {selectedChapter.popular && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                          style={{ background: C.teal, color: "white" }}
                        >
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <p className="text-[13px]" style={{ color: C.slate }}>{selectedChapter.desc}</p>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${showChapterDropdown ? "rotate-180" : ""}`}
                    style={{ color: C.slateLight }}
                  />
                </button>
                {showChapterDropdown && (
                  <div className="mt-2 border rounded-xl bg-white shadow-lg overflow-hidden" style={{ borderColor: C.borderLight }}>
                    {reportChapters.map((ch) => (
                      <button
                        key={ch.id}
                        onClick={() => { setSelectedChapter(ch); setShowChapterDropdown(false); }}
                        className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left border-b last:border-0"
                        style={{ borderColor: C.borderLight }}
                      >
                        <div
                          className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center"
                          style={{ background: `${ch.color}15` }}
                        >
                          <FileText size={16} style={{ color: ch.color }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-[14px]">{ch.name}</span>
                            {ch.popular && (
                              <span
                                className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                                style={{ background: C.teal, color: "white" }}
                              >
                                RECOMMENDED
                              </span>
                            )}
                          </div>
                          <p className="text-[12px]" style={{ color: C.slateLight }}>{ch.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Purchase Options */}
              <div className="mb-5">
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: C.slateLight }}>
                  Choose Your Package:
                </p>
                <div className="space-y-3">
                  {purchaseOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedOption(option.id)}
                      className="w-full border-2 rounded-xl p-4 text-left transition-all"
                      style={{
                        borderColor: selectedOption === option.id ? C.primary : C.borderLight,
                        background: selectedOption === option.id ? `${C.primary}06` : "white",
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          {option.popular && (
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded mb-2 inline-block"
                              style={{ background: C.primary, color: "white" }}
                            >
                              MOST POPULAR
                            </span>
                          )}
                          <p className="font-semibold text-[13px]" style={{ color: C.teal }}>
                            SAVE {option.saveAmount} ({option.save} OFF)
                          </p>
                          <p className="font-semibold text-[15px] mt-1">{option.name}</p>
                        </div>
                        <div className="text-right shrink-0 ml-3">
                          <p className="text-[28px] font-bold leading-none">{option.price}</p>
                          <p className="text-[13px] line-through" style={{ color: C.slateLight }}>{option.regularPrice}</p>
                        </div>
                      </div>
                      <p className="text-[12px] mb-3" style={{ color: C.slateLight }}>{option.billing}</p>
                      <div className="border-t pt-3 space-y-2" style={{ borderColor: C.borderLight }}>
                        {option.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-[13px]">
                            <Check size={16} className="shrink-0 mt-0.5" style={{ color: C.teal }} />
                            {feat.highlight ? (
                              <span>
                                <span className="font-bold" style={{ color: C.primary }}>{feat.label}</span>
                                {" "}{feat.text}
                              </span>
                            ) : (
                              <span style={{ color: C.slate }}>{feat.text}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button
                className="w-full text-white text-[15px] font-bold py-4 rounded-xl mb-4 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)` }}
              >
                {selectedOption === "strategy" ? <Calendar size={18} /> : <Download size={18} />}
                {selectedOption === "strategy"
                  ? "BOOK MY STRATEGY CALL + REPORT — $497"
                  : "GET THE REPORT NOW — $97"}
              </button>

              {/* Trust Line */}
              <div
                className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-wide mb-4 flex-wrap"
                style={{ color: C.slateLight }}
              >
                <span className="flex items-center gap-1"><Download size={14} /> Instant PDF Download</span>
                <span>|</span>
                <span className="flex items-center gap-1"><TrendingUp size={14} /> Data-Driven</span>
                <span>|</span>
                <span className="flex items-center gap-1"><DollarSign size={14} /> 30-Day Guarantee</span>
              </div>

              {/* Guarantee */}
              <div className="flex items-start gap-3 rounded-xl p-4 border" style={{ background: `${C.primary}06`, borderColor: C.borderLight }}>
                <Headphones size={18} className="shrink-0 mt-0.5" style={{ color: C.primary }} />
                <p className="text-[13px] leading-relaxed" style={{ color: C.slate }}>
                  <span className="font-semibold">30-Day Money-Back Guarantee.</span> If this report
                  doesn't give you at least 3 actionable insights to grow your landscaping business
                  within 30 days, we'll refund every penny. No questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────── STATS (WHY IT MATTERS) ──────────────────────────
const whyStats = [
  { Icon: TrendingUp, value: "$176B", label: "U.S. Landscaping Market by 2028" },
  { Icon: DollarSign, value: "47%", label: "of landscapers undercharge by 20%+" },
  { Icon: Users, value: "634K", label: "Landscaping businesses in the U.S." },
  { Icon: MapPin, value: "12%", label: "Avg. annual industry growth rate" },
];

function WhyItMatters() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8" style={{ background: `${C.cream}` }}>
      <div className="max-w-[1200px] mx-auto">
        <div
          className="rounded-xl p-8 md:p-10 text-white"
          style={{ background: `linear-gradient(135deg, ${C.primaryDark} 0%, ${C.primaryDeep} 100%)` }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h2 className="text-2xl md:text-4xl font-bold">Why This Report Matters</h2>
            <span className="inline-flex items-center border border-white/30 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-widest uppercase self-start">
              2025 Industry Data
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6">
            {whyStats.map(({ Icon, value, label }) => (
              <div key={label} className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <Icon size={24} style={{ color: C.tealLight }} />
                  <span className="text-4xl md:text-5xl font-bold">{value}</span>
                </div>
                <p className="text-[15px] opacity-90">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-[12px] opacity-60">
            *Data sourced from IBISWorld, National Association of Landscape Professionals (NALP), U.S. Bureau of Labor Statistics, and Aryo Consulting Group primary research (2025).
          </p>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────── CERTIFICATIONS BAR ──────────────────────────
const certs = [
  "120+ Pages of Research",
  "500+ Firms Surveyed",
  "50+ Data Visualizations",
  "All 50 States Covered",
  "NALP Data Partnership",
  "Instant PDF Delivery",
  "Updated Quarterly",
  "30-Day Guarantee",
  "Actionable Benchmarks",
];

function CertificationsBar() {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 border-y bg-white" style={{ borderColor: C.borderLight }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {certs.map((cert) => (
            <div key={cert} className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: C.slate }}>
              <Check size={14} style={{ color: C.teal }} />
              <span>{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────── HOW IT WORKS ──────────────────────────
const steps = [
  { num: "1", title: "Download the PDF", desc: "Get instant access to the full 120+ page report", image: "/market-research-reports/report-cover.jpg" },
  { num: "2", title: "Review the data", desc: "Study benchmarks, trends, and competitor intel for your region", image: "/market-research-reports/landscaping-hero.jpg" },
  { num: "3", title: "Apply the insights", desc: "Implement pricing changes, targeting shifts, and growth strategies", image: "/market-research-reports/landscape-complete.jpg" },
];

const reportSections = [
  { name: "Executive Summary", count: "8 pages", items: "Market size, growth trajectory, key findings, strategic recommendations" },
  { name: "Industry Overview & Trends", count: "18 pages", items: "Market segmentation, growth drivers, technology disruption, sustainability trends, labor challenges" },
  { name: "Pricing Benchmarks", count: "22 pages", items: "Residential vs commercial rates, regional price maps, seasonal adjustments, maintenance vs installation pricing" },
  { name: "Competitive Analysis", count: "20 pages", items: "Market share by region, top 50 firms profiled, service mix comparison, positioning strategies" },
  { name: "Customer Segmentation", count: "16 pages", items: "Residential homeowners, commercial property managers, HOAs, municipal contracts, luxury estate clients" },
  { name: "Regional Market Deep-Dives", count: "24 pages", items: "Northeast, Southeast, Midwest, Southwest, West Coast — demand, pricing, seasonality per region" },
  { name: "Growth Opportunities", count: "14 pages", items: "Hardscaping, outdoor living, smart irrigation, commercial maintenance, snow removal, organic services" },
];

function HowItWorks() {
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: C.charcoal }}>
            Three Steps to Growing Your Business
          </h2>
          <p className="text-[16px]" style={{ color: C.slateLight }}>
            From download to implementation in days, not months
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="relative mb-4 rounded-xl overflow-hidden aspect-[4/3] shadow-md">
                <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                <div
                  className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: C.primary }}
                >
                  {step.num}
                </div>
              </div>
              <h3 className="text-[18px] font-bold mb-1" style={{ color: C.charcoal }}>{step.title}</h3>
              <p className="text-[14px]" style={{ color: C.slateLight }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Table of Contents */}
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-6">
            <span
              className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: `${C.primary}10`, color: C.primary }}
            >
              Report Contents
            </span>
            <h3 className="text-2xl font-bold mt-3 mb-1" style={{ color: C.charcoal }}>What's Inside</h3>
            <p className="text-[14px]" style={{ color: C.slateLight }}>120+ pages organized into 7 deep-dive chapters</p>
          </div>
          <div className="space-y-2">
            {reportSections.map((sec, i) => (
              <div
                key={sec.name}
                className="border rounded-xl overflow-hidden transition-all"
                style={{ borderColor: expandedSection === i ? `${C.primary}40` : C.borderLight }}
              >
                <button
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedSection(expandedSection === i ? null : i)}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded"
                      style={{ background: `${C.primary}12`, color: C.primary }}
                    >
                      {sec.count}
                    </span>
                    <span className="font-semibold text-[15px]">{sec.name}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform ${expandedSection === i ? "rotate-180" : ""}`}
                    style={{ color: C.slateLight }}
                  />
                </button>
                {expandedSection === i && (
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-[13px] leading-relaxed" style={{ color: C.slate }}>{sec.items}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────── CHAPTERS ──────────────────────────
const chapters = [
  { num: "01", name: "Market Sizing & Growth", icon: "📊", description: "Understand the $176B landscaping market: current size, projected growth through 2028, and where the biggest opportunities are emerging.", tags: ["Market Size", "CAGR Analysis", "Segment Breakdown", "Growth Forecast"] },
  { num: "02", name: "Pricing Intelligence", icon: "💰", description: "Access granular pricing data: what top firms charge for maintenance, design-build, hardscaping, and seasonal services — by region and client type.", tags: ["Hourly Rates", "Project Pricing", "Regional Benchmarks", "Seasonal Adjustments"] },
  { num: "03", name: "Competitive Landscape", icon: "🎯", description: "See exactly who your competitors are, what they charge, how they market, and where the gaps in your local market exist.", tags: ["Top 50 Firms", "Market Share", "Service Mix", "Positioning Map"] },
  { num: "04", name: "Customer Segmentation", icon: "👥", description: "Know your ideal clients: demographics, psychographics, willingness to pay, and how to reach each segment effectively.", tags: ["Residential", "Commercial", "HOAs", "Luxury Estates", "Municipal"] },
  { num: "05", name: "Regional Deep-Dives", icon: "🗺️", description: "Northeast, Southeast, Midwest, Southwest, and West Coast — each region analyzed for demand patterns, pricing norms, and seasonal dynamics.", tags: ["5 U.S. Regions", "Demand Curves", "Seasonality", "Local Regulations"] },
  { num: "06", name: "Growth Opportunities", icon: "🚀", description: "Emerging service categories, technology adoption trends, and new revenue streams that forward-thinking landscaping firms are already capturing.", tags: ["Hardscaping", "Smart Irrigation", "Outdoor Living", "Snow Removal", "Organic"] },
  { num: "07", name: "Operational Benchmarks", icon: "⚙️", description: "Compare your labor costs, equipment spend, marketing budgets, and profit margins against firms at your revenue level.", tags: ["Labor Costs", "Equipment ROI", "Marketing Spend", "Profit Margins"] },
];

function Chapters() {
  const [activeChapter, setActiveChapter] = useState(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: C.cream }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: C.charcoal }}>7 In-Depth Research Chapters</h2>
          <p className="text-[16px]" style={{ color: C.slateLight }}>Every section is built for action, not just awareness</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Chapter list */}
          <div className="lg:w-[40%] space-y-2">
            {chapters.map((ch, i) => (
              <button
                key={ch.num}
                onClick={() => setActiveChapter(i)}
                className="w-full text-left p-4 rounded-xl border transition-all"
                style={{
                  borderColor: activeChapter === i ? C.primary : C.borderLight,
                  background: activeChapter === i ? `${C.primary}08` : "white",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ch.icon}</span>
                  <div>
                    <span className="text-[11px] font-bold" style={{ color: C.slateLight }}>Chapter {ch.num}</span>
                    <p className="font-semibold text-[15px]" style={{ color: C.charcoal }}>{ch.name}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Chapter detail */}
          <div className="lg:w-[60%]">
            <div className="bg-white rounded-xl p-8 shadow-md border h-full" style={{ borderColor: C.borderLight }}>
              <div className="text-5xl mb-4">{chapters[activeChapter].icon}</div>
              <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C.slateLight }}>
                Chapter {chapters[activeChapter].num}
              </span>
              <h3 className="text-2xl font-bold mt-1 mb-4" style={{ color: C.charcoal }}>
                {chapters[activeChapter].name}
              </h3>
              <p className="text-[15px] leading-relaxed mb-6" style={{ color: C.slate }}>
                {chapters[activeChapter].description}
              </p>
              <div className="flex flex-wrap gap-2">
                {chapters[activeChapter].tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[12px] font-medium px-3 py-1 rounded-full"
                    style={{ background: `${C.teal}12`, color: C.teal }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────── SAVINGS BREAKDOWN ──────────────────────────
const costBreakdown = [
  { name: "Hiring a market research firm", cost: 15000 },
  { name: "Industry association membership + reports", cost: 2500 },
  { name: "Pricing survey tools & data platforms", cost: 1200 },
  { name: "Competitor analysis software", cost: 800 },
  { name: "Consultant hourly rate (10 hrs)", cost: 3500 },
  { name: "Regional market data subscriptions", cost: 600 },
  { name: "Trade show research & travel", cost: 2000 },
  { name: "Your time doing this yourself (40 hrs)", cost: 2000 },
];

function SavingsBreakdown() {
  const totalCost = costBreakdown.reduce((sum, s) => sum + s.cost, 0);

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 text-white"
      style={{ background: `linear-gradient(135deg, ${C.primaryDeep} 0%, ${C.primaryDeeper} 100%)` }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">ONE REPORT.</h2>
          <h2 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: C.tealLight }}>
            ${totalCost.toLocaleString()} IN VALUE.
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">YOURS FOR $97.</h2>
          <p className="text-[17px] opacity-80 max-w-[600px]">
            Here's what it would cost to gather this intelligence yourself:
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            {costBreakdown.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <span className="text-[14px] opacity-90">{item.name}</span>
                <span className="font-bold text-[15px] shrink-0 ml-4" style={{ color: C.tealLight }}>
                  ${item.cost.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center">
            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <p className="text-[16px] opacity-70 mb-2 uppercase tracking-widest font-semibold">Total DIY Cost</p>
              <p className="text-6xl font-bold mb-2 line-through opacity-50">${totalCost.toLocaleString()}</p>
              <p className="text-[16px] opacity-70 mb-6">vs. your investment</p>
              <p className="text-7xl font-bold mb-2" style={{ color: C.tealLight }}>$97</p>
              <p className="text-[15px] opacity-80 mb-6">One-time · Instant PDF</p>
              <a
                href="#buy"
                className="block w-full py-4 rounded-xl font-bold text-[15px] transition-opacity hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${C.teal} 0%, ${C.tealLight} 100%)`, color: "white" }}
              >
                GET THE REPORT — $97
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────── COMPARISON ──────────────────────────
const comparisons = [
  { feature: "Original Primary Research", report: true, reportLabel: "500+ firms surveyed", competitor: false, competitorLabel: "Repurposed public data" },
  { feature: "Pricing Benchmarks by Region", report: true, reportLabel: "All 50 states", competitor: false, competitorLabel: "National averages only" },
  { feature: "Competitor Analysis Toolkit", report: true, reportLabel: "Top 50 firms profiled", competitor: false, competitorLabel: "Not included" },
  { feature: "Seasonal Revenue Planning", report: true, reportLabel: "Monthly breakdowns", competitor: false, competitorLabel: "Not included" },
  { feature: "Customer Segmentation Data", report: true, reportLabel: "5 segments deep-dived", competitor: false, competitorLabel: "Generic overview" },
  { feature: "Actionable Frameworks", report: true, reportLabel: "Ready-to-use templates", competitor: false, competitorLabel: "Raw data only" },
  { feature: "Bonus Pricing Calculator", report: true, reportLabel: "Excel tool included", competitor: false, competitorLabel: "Not included" },
  { feature: "Strategy Call Option", report: true, reportLabel: "90-min private session", competitor: false, competitorLabel: "Not available" },
  { feature: "Lifetime Updates", report: true, reportLabel: "Free edition updates", competitor: false, competitorLabel: "Pay for new editions" },
  { feature: "30-Day Guarantee", report: true, reportLabel: "Money-back guarantee", competitor: false, competitorLabel: "No guarantee" },
];

function Comparison() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-10">
          <span
            className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: `${C.primary}10`, color: C.primary }}
          >
            How We Compare
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-2" style={{ color: C.charcoal }}>
            Not All Reports Are Equal
          </h2>
          <p className="text-[15px]" style={{ color: C.slateLight }}>
            See how the ACG Landscaping Report stacks up against generic industry data
          </p>
        </div>

        {/* Header Row */}
        <div className="grid grid-cols-3 mb-4">
          <div></div>
          <div
            className="text-center py-3 rounded-t-xl font-bold text-[14px] text-white"
            style={{ background: C.primary }}
          >
            ACG Report
          </div>
          <div className="text-center py-3 font-bold text-[14px]" style={{ color: C.slateLight }}>
            Generic Reports
          </div>
        </div>

        {comparisons.map((row, i) => (
          <div
            key={row.feature}
            className={`grid grid-cols-3 border-b ${i === 0 ? "border-t" : ""}`}
            style={{ borderColor: C.borderLight }}
          >
            <div className="py-3 pr-4 text-[13px] font-medium flex items-center" style={{ color: C.charcoal }}>
              {row.feature}
            </div>
            <div
              className="py-3 flex flex-col items-center justify-center text-center"
              style={{ background: `${C.primary}06` }}
            >
              <Check size={18} style={{ color: C.teal }} className="mb-1" />
              <span className="text-[12px] font-medium" style={{ color: C.primary }}>{row.reportLabel}</span>
            </div>
            <div className="py-3 flex flex-col items-center justify-center text-center">
              <X size={18} style={{ color: "#EF4444" }} className="mb-1" />
              <span className="text-[12px]" style={{ color: C.slateLight }}>{row.competitorLabel}</span>
            </div>
          </div>
        ))}

        <div className="mt-8 text-center">
          <a
            href="#buy"
            className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl text-[15px] hover:opacity-90 transition-opacity"
            style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)` }}
          >
            <Download size={18} /> Get the ACG Report — $97
          </a>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────── TESTIMONIALS ──────────────────────────
const testimonials = [
  {
    name: "Mike Thornton",
    title: "Owner, Thornton Landscaping",
    location: "Dallas, TX",
    revenue: "$2.4M/yr",
    image: "/market-research-reports/landscaper-1.jpg",
    quote: "The pricing data alone paid for this report 20 times over. I discovered we were undercharging our commercial clients by 35%. Implemented the new pricing structure and added $180K in revenue the first quarter.",
  },
  {
    name: "Sarah Chen",
    title: "Founder, GreenScape Design",
    location: "Portland, OR",
    revenue: "$890K/yr",
    image: "/market-research-reports/landscaper-2.jpg",
    quote: "I bought the report + strategy call package. The 90-minute session completely changed how I position my design-build services. We raised our project minimums and started attracting better clients. Revenue is up 40%.",
  },
  {
    name: "Carlos Mendez",
    title: "Owner, Mendez Outdoor Solutions",
    location: "Miami, FL",
    revenue: "$1.6M/yr",
    image: "/market-research-reports/landscaper-3.jpg",
    quote: "The regional data for Florida was spot-on. Used the competitor analysis to find a gap in the high-end residential hardscaping market. That insight alone was worth $497, let alone $97.",
  },
  {
    name: "Jennifer Walsh",
    title: "CEO, Walsh Grounds Management",
    location: "Chicago, IL",
    revenue: "$4.2M/yr",
    image: "/market-research-reports/landscaper-2.jpg",
    quote: "We used the seasonal revenue planning guide to smooth out our cash flow. Added snow removal and holiday lighting based on the data. Winter used to be our dead zone — now it's 25% of revenue.",
  },
  {
    name: "David Roberts",
    title: "Owner, Roberts Lawn & Landscape",
    location: "Denver, CO",
    revenue: "$1.1M/yr",
    image: "/market-research-reports/landscaper-1.jpg",
    quote: "I've been in this business 22 years and thought I knew my market. This report proved me wrong on at least 5 assumptions. The irrigation service opportunity data helped us launch a new division.",
  },
  {
    name: "Rachel Kim",
    title: "Founder, Urban Garden Studio",
    location: "Austin, TX",
    revenue: "$650K/yr",
    image: "/market-research-reports/landscaper-2.jpg",
    quote: "As a newer landscaping business, this gave me the confidence to price my services properly from day one. Avoided the underpricing trap that kills most new operations.",
  },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(testimonials.length / perPage);

  const visible = testimonials.slice(current * perPage, current * perPage + perPage);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: C.cream }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={20} fill={C.starGold} color={C.starGold} />)}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: C.charcoal }}>
            What Landscapers Are Saying
          </h2>
          <p className="text-[15px]" style={{ color: C.slateLight }}>
            340+ verified reviews · Used by firms in 42 states
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {visible.map((t) => (
            <div key={t.name} className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: C.borderLight }}>
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill={C.starGold} color={C.starGold} />)}
              </div>
              <p className="text-[14px] leading-relaxed mb-4 italic" style={{ color: C.slate }}>"{t.quote}"</p>
              <div className="flex items-center gap-3 border-t pt-4" style={{ borderColor: C.borderLight }}>
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-[14px]" style={{ color: C.charcoal }}>{t.name}</p>
                  <p className="text-[12px]" style={{ color: C.slateLight }}>{t.title} · {t.location}</p>
                </div>
                <span
                  className="ml-auto text-[11px] font-bold px-2 py-0.5 rounded"
                  style={{ background: `${C.teal}12`, color: C.teal }}
                >
                  {t.revenue}
                </span>
              </div>
            </div>
          ))}
        </div>

        {pages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="w-10 h-10 rounded-full border flex items-center justify-center disabled:opacity-30 transition-all hover:shadow-md"
              style={{ borderColor: C.borderLight }}
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="w-2.5 h-2.5 rounded-full transition-all"
                style={{ background: i === current ? C.primary : C.borderLight }}
              />
            ))}
            <button
              onClick={() => setCurrent((c) => Math.min(pages - 1, c + 1))}
              disabled={current === pages - 1}
              className="w-10 h-10 rounded-full border flex items-center justify-center disabled:opacity-30 transition-all hover:shadow-md"
              style={{ borderColor: C.borderLight }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ────────────────────────── REVIEWS GRID ──────────────────────────
const allReviews = [
  { initials: "MT", name: "Mike Thornton", source: "Verified Purchase", text: "Raised my prices by 30% after seeing the regional benchmarks. Lost two cheap clients but gained six better ones. Net revenue up $180K in Q1 alone." },
  { initials: "SC", name: "Sarah Chen", source: "Verified Purchase — Strategy Call", text: "The strategy call was the best business investment I made this year. We completely repositioned our design-build services and raised project minimums. 40% revenue increase." },
  { initials: "CM", name: "Carlos Mendez", source: "Verified Purchase", text: "Found a gap in the high-end residential hardscaping market using the competitor analysis. Launched a new division that's already at $400K ARR." },
  { initials: "JW", name: "Jen Walsh", source: "Verified Purchase", text: "Used the seasonal planning guide to add snow removal and holiday lighting. Winter went from dead zone to 25% of our revenue. Game changer." },
  { initials: "DR", name: "David Roberts", source: "Verified Purchase", text: "22 years in the business and this report still taught me things. The irrigation opportunity data was spot-on. New division launched within 60 days." },
  { initials: "RK", name: "Rachel Kim", source: "Verified Purchase", text: "As a new business owner, this gave me the pricing confidence I needed from day one. Avoided the underpricing trap completely." },
];

function Reviews() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: C.charcoal }}>Customer Reviews</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill={C.starGold} color={C.starGold} />)}
              </div>
              <span className="font-bold" style={{ color: C.charcoal }}>4.9 out of 5</span>
              <span style={{ color: C.slateLight }}>· 340+ reviews</span>
            </div>
          </div>
          <a
            href="#buy"
            className="text-white font-bold px-6 py-3 rounded-xl text-[14px] hover:opacity-90 transition-opacity"
            style={{ background: C.primary }}
          >
            Get the Report — $97
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allReviews.map((review) => (
            <div key={review.name} className="p-5 rounded-xl border" style={{ borderColor: C.borderLight }}>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-[13px] shrink-0"
                  style={{ background: C.primary }}
                >
                  {review.initials}
                </div>
                <div>
                  <p className="font-semibold text-[14px]" style={{ color: C.charcoal }}>{review.name}</p>
                  <p className="text-[11px]" style={{ color: C.teal }}>{review.source}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={13} fill={C.starGold} color={C.starGold} />)}
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: C.slate }}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────── FAQ ──────────────────────────
const faqs = [
  {
    question: "What exactly is in the 2025 Landscaping Industry Market Report?",
    answer: "The report is a comprehensive 120+ page market intelligence document covering: market sizing and growth projections, regional pricing benchmarks for all 50 states, competitive analysis of the top 50 firms, customer segmentation data, seasonal revenue patterns, growth opportunity analysis, and operational benchmarks. It also includes 3 bonus tools: a Pricing Calculator (Excel), a Seasonal Revenue Planning Guide, and a Customer Acquisition Playbook.",
  },
  {
    question: "How is this different from free industry reports I can find online?",
    answer: "Most free reports repurpose old public data and give you generic national averages. This report is built on primary research — we surveyed 500+ landscaping firms, conducted 75 in-depth owner interviews, and cross-referenced multiple proprietary data sources. You get granular, actionable data specific to your region and service type, not vague national trends.",
  },
  {
    question: "Is the $97 price really a discount? Will it go back up?",
    answer: "Yes. The regular price for this report is $497. The $97 early-bird pricing is available to the first 100 purchasers only. After that, the price returns to $497. We have offered this discount to introduce the report to the landscaping community — it will not stay at $97 indefinitely.",
  },
  {
    question: "What happens in the $497 Strategy Call?",
    answer: "The Strategy Call package includes the full report plus a private 90-minute session with an ACG consultant who specializes in landscaping and green industry businesses. During the call, we review your specific market, analyze your current pricing and positioning, build a custom growth roadmap, and answer any questions about your operation. You also get a recording of the call and a written summary with action items, plus 30 days of email follow-up support.",
  },
  {
    question: "What if the report is not useful for my business?",
    answer: "We offer a 30-day money-back guarantee. If you do not find at least 3 actionable insights that help your business within 30 days of purchase, email us for a full refund. No questions asked, no hoops to jump through.",
  },
  {
    question: "How is the data collected?",
    answer: "The research combines primary surveys of 500+ U.S. landscaping firms, 75 in-depth owner interviews, data from the National Association of Landscape Professionals (NALP), IBISWorld industry reports, U.S. Bureau of Labor Statistics data, and Aryo Consulting Group's proprietary client database spanning 12 years of consulting engagements.",
  },
  {
    question: "Is this relevant for a small landscaping business?",
    answer: "Yes. The report is specifically designed for independent and small-to-mid-size landscaping businesses ($200K–$10M revenue). The pricing benchmarks, competitor analysis, and growth strategies are most actionable for owner-operators who set their own pricing and make strategic decisions. Enterprise landscaping firms have different needs that would require custom research.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: C.cream }}>
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: C.charcoal }}>
            Frequently Asked Questions
          </h2>
          <p className="text-[15px]" style={{ color: C.slateLight }}>
            Everything you need to know before purchasing
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className="bg-white rounded-xl border overflow-hidden"
              style={{ borderColor: openIndex === i ? `${C.primary}40` : C.borderLight }}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-semibold text-[15px] pr-4" style={{ color: C.charcoal }}>
                  {faq.question}
                </span>
                <Plus
                  size={20}
                  className={`shrink-0 transition-transform ${openIndex === i ? "rotate-45" : ""}`}
                  style={{ color: C.primary }}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 pt-0">
                  <p className="text-[14px] leading-relaxed" style={{ color: C.slate }}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-[14px] mb-4" style={{ color: C.slateLight }}>
            Still have questions? Reach out to our team.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl text-[15px] hover:opacity-90 transition-opacity"
            style={{ background: C.primary }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────── FINAL CTA ──────────────────────────
function FinalCTA() {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 text-white text-center"
      style={{ background: `linear-gradient(135deg, ${C.primaryDeep} 0%, ${C.primaryDeeper} 100%)` }}
    >
      <div className="max-w-[700px] mx-auto">
        <div className="flex items-center justify-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={20} fill={C.starGold} color={C.starGold} />)}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Stop Leaving Money on the Table
        </h2>
        <p className="text-[17px] opacity-80 mb-8">
          Every week you operate without this data is a week you're undercharging, mispricing, and missing
          growth opportunities that your competitors are capturing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#buy"
            className="px-10 py-4 rounded-xl font-bold text-[16px] transition-opacity hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${C.teal} 0%, ${C.tealLight} 100%)`, color: "white" }}
          >
            Get the Report — $97
          </a>
          <a
            href="#buy"
            className="px-10 py-4 rounded-xl font-bold text-[16px] transition-all hover:bg-white/20 border border-white/30"
          >
            Report + Strategy Call — $497
          </a>
        </div>
        <p className="text-[13px] opacity-60 mt-6">30-Day Money-Back Guarantee · Instant PDF Download</p>
      </div>
    </section>
  );
}

// ────────────────────────── FOOTER ──────────────────────────
function PageFooter() {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: C.primaryDeep }}>
      <div className="max-w-[1200px] mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <path d="M20 4L4 36H12L20 20L28 36H36L20 4Z" fill="white" />
            <path d="M20 12L14 24H18L20 20L22 24H26L20 12Z" fill={C.tealLight} />
          </svg>
          <span className="font-semibold text-[18px] tracking-wide text-white">ARYO CONSULTING GROUP</span>
        </div>
        <p className="text-[13px] mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
          Strategy, M&A & Growth Consulting — Built for the Modern Business
        </p>
        <div className="flex items-center justify-center gap-8 mb-8 flex-wrap">
          {[
            { label: "Services", href: "/capabilities" },
            { label: "Case Studies", href: "/case-studies" },
            { label: "Insights", href: "/insights" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[14px] hover:text-white transition-colors"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="max-w-[400px] mx-auto h-px mb-8" style={{ background: "rgba(255,255,255,0.1)" }} />
        <p className="text-[12px] mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
          © 2026 Aryo Consulting Group. All rights reserved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a href="/contact" className="text-[12px] underline hover:text-white/60 transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            Privacy Policy
          </a>
          <a href="/contact" className="text-[12px] underline hover:text-white/60 transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            Terms of Service
          </a>
          <a href="https://aryocg.com" className="text-[12px] underline hover:text-white/60 transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            aryocg.com
          </a>
        </div>
      </div>
    </footer>
  );
}

// ────────────────────────── PAGE EXPORT ──────────────────────────
export default function MarketResearchReports() {
  return (
    <>
      <SEO
        title="2025 Landscaping Industry Market Report | Aryo Consulting Group"
        description="120+ pages of primary research on the $176B landscaping market. Pricing benchmarks, competitive analysis, regional deep-dives, and growth opportunities for landscaping business owners."
        canonical="https://aryocg.com/market-research-reports"
      />
      <div className="min-h-screen" style={{ background: C.cream }}>
        <AnnouncementBar />
        <Navigation />
        <Hero />
        <WhyItMatters />
        <CertificationsBar />
        <HowItWorks />
        <Chapters />
        <SavingsBreakdown />
        <Comparison />
        <Testimonials />
        <Reviews />
        <FAQ />
        <FinalCTA />
        <PageFooter />
      </div>
    </>
  );
}
