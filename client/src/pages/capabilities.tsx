import { Link } from 'wouter';
import { ArrowRight, ChevronRight, TrendingUp, Layers, Users, BarChart3, Shield, Zap, Presentation, ChevronDown, Check, type LucideIcon } from 'lucide-react';
import { PageLayout } from '@/components/layout';
import { SEO, serviceSchema, breadcrumbSchema } from '@/components/seo';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useWPCapabilities, useWPHomepage, type WPDifferentiator } from '@/lib/wordpress';

const capIconMap: Record<string, LucideIcon> = {
  TrendingUp, Layers, Users, BarChart3, Shield, Zap, Presentation,
};

const fallbackCapabilities = [
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
    link: "/operational-excellence"
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
    link: "/talent-organization"
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
    link: "/governance-risk"
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

const serviceOptions = [
  "M&A Advisory",
  "Digital Transformation",
  "Operational Excellence",
  "Talent & Organization",
  "Governance & Risk",
  "Growth Strategy",
  "Pitch Deck Services",
  "Other / Multiple Services"
];

function MobileConsultationForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    company: '',
    email: '',
    phone: '',
    agreedToTerms: false
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest('POST', '/api/contact', {
        name: data.name,
        email: data.email,
        company: data.company,
        message: `Service Interest: ${data.service}\nPhone: ${data.phone}`
      });
    },
    onSuccess: () => {
      toast({ title: "Request Submitted", description: "We'll contact you within 24 hours." });
      setFormData({ service: '', name: '', company: '', email: '', phone: '', agreedToTerms: false });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to submit. Please try again.", variant: "destructive" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      toast({ title: "Please accept terms", description: "You must agree to the terms to proceed.", variant: "destructive" });
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <div className="mb-12 rounded-lg overflow-hidden" style={{ background: 'linear-gradient(135deg, #274D8E 0%, #1a3a6e 50%, #133055 100%)' }}>
      <div className="px-6 py-8 md:px-10 md:py-10">
        {/* Mobile: Stacked layout / Desktop: Side by side */}
        <div className="md:flex md:items-start md:gap-12">
          {/* Title Section */}
          <div className="text-center md:text-left mb-6 md:mb-0 md:w-1/3 md:flex-shrink-0">
            <p className="text-aryo-greenTeal text-sm font-medium">Schedule your FREE</p>
            <h2 className="text-2xl md:text-3xl font-serif text-white font-bold mt-1">
              Consultation Today!
            </h2>
            <p className="hidden md:block text-white/70 text-sm mt-3 leading-relaxed">
              Let our experts help you navigate your business challenges. Fill out the form and we'll get back to you within 24 hours.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-3 md:flex-1">
            {/* Desktop: 2-column grid for inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Service Dropdown */}
              <div className="relative md:col-span-2">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3 bg-white rounded-lg text-left flex items-center justify-between"
                  data-testid="select-service"
                >
                  <span className={formData.service ? 'text-slate-800' : 'text-slate-400'}>
                    {formData.service || 'Select Service(s)*'}
                  </span>
                  <ChevronDown size={20} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 max-h-48 overflow-y-auto">
                    {serviceOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, service: option });
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-slate-700 hover:bg-aryo-deepBlue/10 text-sm"
                        data-testid={`option-service-${option.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Name */}
              <input
                type="text"
                placeholder="Name*"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white rounded-lg text-slate-800 placeholder:text-slate-400"
                required
                data-testid="input-name"
              />

              {/* Company */}
              <input
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 bg-white rounded-lg text-slate-800 placeholder:text-slate-400"
                data-testid="input-company"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Email*"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white rounded-lg text-slate-800 placeholder:text-slate-400"
                required
                data-testid="input-email"
              />

              {/* Phone */}
              <input
                type="tel"
                placeholder="Phone Number*"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white rounded-lg text-slate-800 placeholder:text-slate-400"
                required
                data-testid="input-phone"
              />
            </div>

            {/* Terms and Submit - full width */}
            <div className="md:flex md:items-center md:gap-6 md:pt-2">
              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 py-2 md:py-0 md:flex-1">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, agreedToTerms: !formData.agreedToTerms })}
                  className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${formData.agreedToTerms ? 'bg-aryo-greenTeal border-aryo-greenTeal' : 'bg-white/20 border-white/50'}`}
                  data-testid="checkbox-terms"
                >
                  {formData.agreedToTerms && <Check size={14} className="text-white" />}
                </button>
                <p className="text-xs text-white/70 leading-relaxed">
                  By pressing "Schedule FREE Consultation" you agree to our terms and conditions and privacy policy.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full md:w-auto md:px-8 py-4 bg-aryo-greenTeal text-white font-bold rounded-lg hover:bg-aryo-teal transition-colors disabled:opacity-50 mt-3 md:mt-0"
                data-testid="button-submit-consultation"
              >
                {mutation.isPending ? 'Submitting...' : 'Schedule FREE Consultation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const fallbackDifferentiators = [
  { title: "Outcome-Based Fees", description: "We put our fees at risk. If we don't deliver agreed-upon outcomes, you don't pay full price. That's how confident we are." },
  { title: "Deployed Systems", description: "No 100-page decks that gather dust. We implement actual systems, processes, and tools that your team uses every day." },
  { title: "Embedded Teams", description: "Our consultants work alongside your people—not in a war room producing deliverables, but in the trenches driving change." },
  { title: "Senior Leadership", description: "Every engagement is led by a partner with 15+ years of experience. You won't be handed off to a team of recent graduates." }
];

export default function Capabilities() {
  const { data: wpCaps, isLoading: capsLoading } = useWPCapabilities();
  const { data: wpHomepage, isLoading: homepageLoading } = useWPHomepage();
  const isLoading = capsLoading || homepageLoading;
  const capabilities = (wpCaps && wpCaps.length > 0)
    ? wpCaps.map(wp => ({
        icon: capIconMap[wp.iconName] || Layers,
        title: wp.title,
        subtitle: wp.subtitle,
        description: wp.description,
        services: wp.services,
        outcome: wp.outcome,
        link: wp.link,
      }))
    : fallbackCapabilities;
  const differentiators = (wpHomepage?.differentiators && wpHomepage.differentiators.length > 0) ? wpHomepage.differentiators : fallbackDifferentiators;

  return (
    <PageLayout>
      <SEO 
        title="Capabilities | Aryo Consulting Group"
        description="Explore Aryo's consulting capabilities: M&A Advisory, Digital Transformation, Operational Excellence, Talent & Organization, Risk & Governance, and Strategy & Growth."
        canonical="https://aryocg.com/capabilities"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: "https://aryocg.com" },
            { name: "Capabilities", url: "https://aryocg.com/capabilities" },
          ]),
          ...capabilities.map(cap => serviceSchema({
            name: cap.title,
            description: cap.description,
            url: cap.link ? `https://aryocg.com${cap.link}` : "https://aryocg.com/capabilities",
          })),
        ]}
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

        {/* Mobile Consultation Form */}
        <MobileConsultationForm />

        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white border border-aryo-lightGrey p-8 animate-pulse">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-slate-200 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-5 w-40 bg-slate-200 rounded mb-2" />
                    <div className="h-4 w-32 bg-slate-200 rounded mb-4" />
                    <div className="h-4 w-full bg-slate-200 rounded mb-2" />
                    <div className="h-4 w-2/3 bg-slate-200 rounded mb-4" />
                    <div className="space-y-2">{Array.from({ length: 4 }).map((_, j) => (<div key={j} className="h-3 w-3/4 bg-slate-200 rounded" />))}</div>
                  </div>
                </div>
              </div>
            ))
          ) : capabilities.map((cap, i) => {
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
