import { Link } from 'wouter';
import { ArrowRight, ChevronRight, Building2, Cpu, HeartPulse, ShoppingBag, Factory, Briefcase } from 'lucide-react';

const industries = [
  {
    icon: Building2,
    title: "Financial Services",
    description: "Banks, asset managers, insurance companies, and fintech firms navigating digital disruption and regulatory complexity.",
    clients: ["Regional banks", "Asset managers", "Insurance carriers", "Payment processors", "Wealth advisors"],
    expertise: [
      "Digital banking transformation",
      "Regulatory compliance programs",
      "M&A integration for financial institutions",
      "Risk management frameworks",
      "Customer experience optimization"
    ],
    metric: "$850M+ in value created"
  },
  {
    icon: Cpu,
    title: "Technology & Software",
    description: "From pre-revenue startups to enterprise software companies scaling operations and preparing for liquidity events.",
    clients: ["SaaS companies", "Enterprise software", "Hardware/devices", "AI/ML ventures", "Platform businesses"],
    expertise: [
      "Go-to-market acceleration",
      "Product-led growth strategies",
      "M&A preparation and execution",
      "Operational scaling",
      "International expansion"
    ],
    metric: "40+ successful exits"
  },
  {
    icon: HeartPulse,
    title: "Healthcare & Life Sciences",
    description: "Providers, payers, pharma, and medtech companies improving outcomes while managing cost pressures.",
    clients: ["Health systems", "Specialty practices", "Pharma & biotech", "Medical devices", "Digital health"],
    expertise: [
      "Clinical operations improvement",
      "Payer strategy and contracting",
      "M&A in healthcare verticals",
      "Regulatory pathway optimization",
      "Value-based care models"
    ],
    metric: "15% avg. margin improvement"
  },
  {
    icon: ShoppingBag,
    title: "Consumer & Retail",
    description: "Brands, retailers, and consumer services companies competing in an omnichannel, digitally-native world.",
    clients: ["DTC brands", "Multi-channel retailers", "Consumer packaged goods", "Restaurants & hospitality", "E-commerce"],
    expertise: [
      "Omnichannel strategy",
      "Supply chain optimization",
      "Brand portfolio management",
      "Customer analytics & personalization",
      "Store operations excellence"
    ],
    metric: "25% avg. revenue growth"
  },
  {
    icon: Factory,
    title: "Industrial & Manufacturing",
    description: "Manufacturers and industrial companies modernizing operations and supply chains for competitive advantage.",
    clients: ["Discrete manufacturing", "Process industries", "Aerospace & defense", "Automotive suppliers", "Building products"],
    expertise: [
      "Lean manufacturing deployment",
      "Supply chain resilience",
      "Industry 4.0 implementation",
      "Operational due diligence",
      "Cost reduction programs"
    ],
    metric: "20% productivity gains"
  },
  {
    icon: Briefcase,
    title: "Private Equity Portfolio",
    description: "Helping PE firms and their portfolio companies accelerate value creation and prepare for successful exits.",
    clients: ["Growth equity firms", "Buyout funds", "Family offices", "Portfolio companies", "Operating partners"],
    expertise: [
      "100-day value creation plans",
      "Operational due diligence",
      "Add-on integration",
      "Exit preparation",
      "Management capability building"
    ],
    metric: "3x avg. value multiple"
  }
];

export default function Industries() {
  return (
    <div className="min-h-screen bg-aryo-offWhite">
      <nav className="bg-white border-b border-aryo-lightGrey px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" data-testid="link-home">
            <img src="/api/aryo-logo" alt="ARYO Consulting Group" width={40} height={40} className="object-contain" data-testid="img-aryo-logo" />
          </Link>
          <Link href="/login" className="bg-aryo-deepBlue text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#1a3668] transition-colors" data-testid="button-partner-login">
            Partner Login
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <Link href="/" className="hover:text-aryo-deepBlue">Home</Link>
          <ChevronRight size={14} />
          <span className="text-aryo-deepBlue">Industries</span>
        </div>

        <div className="mb-16">
          <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">Sector Expertise</span>
          <h1 className="text-4xl md:text-5xl font-serif text-aryo-deepBlue mt-4 mb-6">Industries We Serve</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Deep sector knowledge combined with cross-industry perspective. Our teams bring both specialized 
            expertise and fresh thinking from adjacent markets.
          </p>
        </div>

        <div className="space-y-8 mb-24">
          {industries.map((industry, i) => (
            <div key={i} className="bg-white border border-aryo-lightGrey p-8 lg:p-10" data-testid={`card-industry-${i}`}>
              <div className="grid lg:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-aryo-deepBlue flex items-center justify-center">
                      <industry.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-aryo-deepBlue">{industry.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-4">{industry.description}</p>
                  <div className="bg-aryo-offWhite p-4">
                    <span className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest">Track Record</span>
                    <p className="text-aryo-teal font-bold text-lg mt-1">{industry.metric}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-4">Client Types</h4>
                  <ul className="space-y-2">
                    {industry.clients.map((client, j) => (
                      <li key={j} className="flex items-center gap-2 text-slate-600">
                        <div className="w-1.5 h-1.5 bg-aryo-lightGrey flex-shrink-0"></div>
                        {client}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-4">Our Expertise</h4>
                  <ul className="space-y-2">
                    {industry.expertise.map((exp, j) => (
                      <li key={j} className="flex items-center gap-2 text-slate-600">
                        <div className="w-1.5 h-1.5 bg-aryo-greenTeal flex-shrink-0"></div>
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-aryo-deepBlue p-12 text-center">
          <h3 className="text-2xl font-serif text-white mb-4">Don't see your industry?</h3>
          <p className="text-aryo-lightBlue/70 mb-8 max-w-xl mx-auto">
            Our methodology translates across sectors. We've worked with organizations in 40+ industries. Let's discuss your specific situation.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-aryo-deepBlue px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-aryo-offWhite transition-colors" data-testid="button-contact">
            Start a Conversation <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
