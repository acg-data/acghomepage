import { Link } from 'wouter';
import { ArrowRight, ChevronRight, TrendingUp, Layers, Users, BarChart3, Shield, Zap, Presentation } from 'lucide-react';
import { PageLayout } from '@/components/layout';
import { SEO } from '@/components/seo';

const capabilities = [
  {
    icon: TrendingUp,
    title: "M&A Advisory",
    subtitle: "End-to-End Transaction Support",
    description: "From target identification through post-merger integration. We don't just advise—we execute alongside you.",
    services: [
      "Buy-side & sell-side advisory",
      "Due diligence management",
      "Valuation & deal structuring",
      "Post-merger integration",
      "Synergy identification & capture"
    ],
    outcome: "75% faster integration timelines",
    link: "/ma-advisory"
  },
  {
    icon: Layers,
    title: "Digital Transformation",
    subtitle: "Technology-Enabled Growth",
    description: "We deploy actual systems, not PowerPoint recommendations. Our work lives on in your organization.",
    services: [
      "Digital strategy & roadmapping",
      "Technology architecture",
      "Data & analytics platforms",
      "Process automation",
      "Change management"
    ],
    outcome: "3x ROI on technology investments",
    link: "/digital-transformation"
  },
  {
    icon: BarChart3,
    title: "Operational Excellence",
    subtitle: "Systematic Performance Improvement",
    description: "We find the 15-25% efficiency gains hiding in plain sight and help you capture them sustainably.",
    services: [
      "Process optimization",
      "Cost reduction programs",
      "Supply chain excellence",
      "Quality improvement",
      "Lean/Six Sigma deployment"
    ],
    outcome: "20% average cost reduction",
    link: null
  },
  {
    icon: Users,
    title: "Talent & Organization",
    subtitle: "Building High-Performance Teams",
    description: "The right people, in the right roles, with the right capabilities. We help you build organizations that win.",
    services: [
      "Organization design",
      "Leadership development",
      "Capability building",
      "Culture transformation",
      "Succession planning"
    ],
    outcome: "40% improvement in engagement",
    link: null
  },
  {
    icon: Shield,
    title: "Governance & Risk",
    subtitle: "Protecting Enterprise Value",
    description: "Modern governance frameworks that enable rather than constrain. Risk management that creates competitive advantage.",
    services: [
      "Board effectiveness",
      "Enterprise risk management",
      "Regulatory compliance",
      "ESG strategy & reporting",
      "Crisis management"
    ],
    outcome: "50% reduction in risk incidents",
    link: null
  },
  {
    icon: Zap,
    title: "Growth Strategy",
    subtitle: "Accelerating Market Success",
    description: "We help you find and capture your next $100M opportunity—then we help you build the capabilities to repeat it & ensured growth.",
    services: [
      "Market entry strategy",
      "Revenue acceleration",
      "Pricing optimization",
      "Channel strategy",
      "Partnership development"
    ],
    outcome: "2x revenue growth rate",
    link: "/growth-strategy"
  },
  {
    icon: Presentation,
    title: "Pitch Deck",
    subtitle: "Executive Presentation",
    description: "Explore our capabilities, approach, and success stories in an interactive presentation format designed for executive audiences.",
    services: [
      "Company overview",
      "Service capabilities",
      "Client success stories",
      "Methodology & approach",
      "Engagement models"
    ],
    outcome: "$1B+ raised for clients collectively",
    link: "/pitch-deck"
  }
];

const differentiators = [
  {
    title: "Outcome-Based Fees",
    description: "We put our fees at risk. If we don't deliver agreed-upon outcomes, you don't pay full price. That's how confident we are."
  },
  {
    title: "Deployed Systems",
    description: "No 100-page decks that gather dust. We implement actual systems, processes, and tools that your team uses every day."
  },
  {
    title: "Embedded Teams",
    description: "Our consultants work alongside your people—not in a war room producing deliverables, but in the trenches driving change."
  },
  {
    title: "Senior Leadership",
    description: "Every engagement is led by a partner with 15+ years of experience. You won't be handed off to a team of recent graduates."
  }
];

export default function Capabilities() {
  return (
    <PageLayout>
      <SEO 
        title="Capabilities | Aryo Consulting Group"
        description="Explore Aryo's consulting capabilities: M&A Advisory, Digital Transformation, Operational Excellence, Talent & Organization, Risk & Governance, and Strategy & Growth."
        canonical="https://aryocg.com/capabilities"
      />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <Link href="/" className="hover:text-aryo-deepBlue">Home</Link>
          <ChevronRight size={14} />
          <span className="text-aryo-deepBlue">Capabilities</span>
        </div>

        <div className="mb-16">
          <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">What We Do</span>
          <h1 className="text-4xl md:text-5xl font-serif text-aryo-deepBlue mt-4 mb-6">Our Capabilities</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Six integrated practice areas. One unified approach: deploy real systems, tie fees to outcomes, 
            and work alongside your team until the job is done.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          {capabilities.map((cap, i) => {
            const CardContent = (
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-aryo-deepBlue flex items-center justify-center flex-shrink-0 group-hover:bg-aryo-teal transition-colors">
                  <cap.icon className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif font-bold text-aryo-deepBlue mb-1 group-hover:text-aryo-teal transition-colors">{cap.title}</h3>
                  <p className="text-sm text-aryo-teal font-medium mb-3">{cap.subtitle}</p>
                  <p className="text-slate-600 mb-4">{cap.description}</p>
                  
                  <ul className="space-y-2 mb-4">
                    {cap.services.map((service, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-aryo-greenTeal flex-shrink-0"></div>
                        {service}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-aryo-lightGrey flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest">Typical Outcome</span>
                      <p className="text-aryo-teal font-bold mt-1">{cap.outcome}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${cap.link ? 'bg-aryo-deepBlue/10 group-hover:bg-aryo-teal' : 'bg-transparent'} transition-colors`}>
                      {cap.link && (
                        <ArrowRight size={18} className="text-aryo-deepBlue group-hover:text-white transition-colors animate-arrow-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );

            return cap.link ? (
              <Link key={i} href={cap.link}>
                <div className="bg-white border border-aryo-lightGrey p-8 group cursor-pointer hover:border-aryo-teal hover:shadow-lg transition-all" data-testid={`card-capability-${i}`}>
                  {CardContent}
                </div>
              </Link>
            ) : (
              <div key={i} className="bg-white border border-aryo-lightGrey p-8 group" data-testid={`card-capability-${i}`}>
                {CardContent}
              </div>
            );
          })}
        </div>

        <div className="bg-aryo-deepBlue p-12 mb-24">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">Our Approach</span>
            <h2 className="text-3xl font-serif text-white mt-4">What Makes Us Different</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((diff, i) => (
              <div key={i} className="bg-white/10 p-8">
                <h3 className="text-lg font-serif font-bold text-white mb-3">{diff.title}</h3>
                <p className="text-aryo-lightBlue/80">{diff.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-aryo-lightGrey p-12 text-center">
          <h3 className="text-2xl font-serif text-aryo-deepBlue mb-4">Let's discuss your challenges</h3>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Every engagement begins with understanding your unique situation. Schedule a confidential conversation with one of our partners.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-aryo-deepBlue text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#1a3668] transition-colors" data-testid="button-contact">
            Request a Consultation <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
