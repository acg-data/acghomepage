import { Link } from 'wouter';
import { ArrowRight, ChevronRight, MapPin, Clock, Users, Target, Lightbulb, Heart } from 'lucide-react';
import { PageLayout } from '@/components/layout';
import { SEO } from '@/components/seo';
import { useWPPositions, type WPPosition } from '@/lib/wordpress';

const fallbackPositions = [
  {
    title: "Senior Consultant, M&A Practice",
    location: "Boston / New York",
    type: "Full-time",
    description: "Lead due diligence workstreams and post-merger integration programs for middle-market transactions.",
    requirements: ["5+ years M&A experience", "MBA preferred", "Strong financial modeling skills"]
  },
  {
    title: "Manager, Digital Transformation",
    location: "Boston",
    type: "Full-time",
    description: "Drive technology-enabled transformation initiatives for clients across industries.",
    requirements: ["7+ years consulting experience", "Technology implementation background", "Change management expertise"]
  },
  {
    title: "Associate, Operations Practice",
    location: "New York",
    type: "Full-time",
    description: "Support operational excellence and cost reduction engagements across portfolio companies.",
    requirements: ["3+ years consulting or industry experience", "Lean/Six Sigma certification preferred", "Strong analytical skills"]
  },
  {
    title: "Principal, Private Equity",
    location: "Boston / New York",
    type: "Full-time",
    description: "Lead value creation programs for PE portfolio companies from 100-day plans through exit.",
    requirements: ["10+ years relevant experience", "PE or operating partner background", "P&L ownership experience"]
  }
];

const benefits = [
  {
    icon: Target,
    title: "Outcome-Based Compensation",
    description: "Your bonus is tied to client outcomes, not utilization. When clients win, you win."
  },
  {
    icon: Users,
    title: "Small Team Culture",
    description: "No 50-person project teams. You'll work closely with partners and make real impact from day one."
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning",
    description: "Dedicated learning budget, mentorship from senior partners, and exposure to diverse industries."
  },
  {
    icon: Heart,
    title: "Work-Life Integration",
    description: "We work hard but respect boundaries. No Sunday deliverables culture. Remote flexibility."
  }
];

const values = [
  { title: "Client Obsession", description: "Everything we do starts with understanding client needs and ends with measurable client outcomes." },
  { title: "Intellectual Honesty", description: "We tell clients what they need to hear, not what they want to hear. Candor builds trust." },
  { title: "Ownership Mentality", description: "We act like owners, not renters. We invest in relationships and stand behind our work." },
  { title: "Continuous Improvement", description: "We're never satisfied with 'good enough.' We push ourselves and each other to keep raising the bar." }
];

export default function Careers() {
  const { data: wpPositions } = useWPPositions();
  const positions = (wpPositions && wpPositions.length > 0) ? wpPositions : fallbackPositions;

  return (
    <PageLayout>
      <SEO 
        title="Careers | Aryo Consulting Group"
        description="Join Aryo Consulting Group. We're looking for talented consultants who want to work on outcome-based engagements and make real impact. View open positions."
        canonical="https://aryocg.com/careers"
      />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <Link href="/" className="hover:text-aryo-deepBlue">Home</Link>
          <ChevronRight size={14} />
          <span className="text-aryo-deepBlue">Careers</span>
        </div>

        <div className="mb-16">
          <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">Join Our Team</span>
          <h1 className="text-4xl md:text-5xl font-serif text-aryo-deepBlue mt-4 mb-6">Careers at Aryo</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            We're building a different kind of consulting firm. One where outcomes matter, teams are small, 
            and consultants actually implement—not just recommend.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          <div className="bg-aryo-deepBlue p-10 text-white">
            <h2 className="text-2xl font-serif mb-6">Why Aryo?</h2>
            <div className="space-y-4 text-aryo-lightBlue/90">
              <p>
                At traditional firms, you'll spend years building slides for partners to present. 
                At Aryo, you'll be in the room—and in the field—driving real change from day one.
              </p>
              <p>
                We deliberately stay small so every person matters. No massive hierarchies. 
                No pyramid economics. Just great people doing great work for clients who appreciate it.
              </p>
              <p>
                And because our fees are tied to outcomes, you'll experience the satisfaction of 
                seeing your work actually implemented—not gathering dust in a shared drive.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-white border border-aryo-lightGrey p-6 flex gap-4">
                <div className="w-10 h-10 bg-aryo-offWhite flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="text-aryo-deepBlue" size={20} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-aryo-deepBlue mb-1">{benefit.title}</h3>
                  <p className="text-slate-600 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">What We Value</span>
            <h2 className="text-3xl font-serif text-aryo-deepBlue mt-4">Our Culture</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="bg-white border border-aryo-lightGrey p-6 text-center">
                <h3 className="font-serif font-bold text-aryo-deepBlue mb-3">{value.title}</h3>
                <p className="text-slate-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">Opportunities</span>
            <h2 className="text-3xl font-serif text-aryo-deepBlue mt-4">Open Positions</h2>
          </div>

          <div className="space-y-4">
            {positions.map((position, i) => (
              <div key={i} className="bg-white border border-aryo-lightGrey p-8 group hover:border-aryo-deepBlue transition-colors" data-testid={`card-position-${i}`}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-serif font-bold text-aryo-deepBlue mb-2">{position.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {position.type}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4">{position.description}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      {position.requirements.map((req, j) => (
                        <span key={j} className="text-xs bg-aryo-offWhite text-aryo-deepBlue px-3 py-1">{req}</span>
                      ))}
                    </div>
                  </div>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 bg-aryo-deepBlue text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#1a3668] transition-colors whitespace-nowrap"
                    data-testid={`button-apply-${i}`}
                  >
                    Apply Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-aryo-lightGrey p-12 text-center">
          <h3 className="text-2xl font-serif text-aryo-deepBlue mb-4">Don't see a perfect fit?</h3>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            We're always looking for exceptional people. Send us your resume and tell us how you'd contribute to our mission.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-aryo-deepBlue text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#1a3668] transition-colors" data-testid="button-general-inquiry">
            General Inquiry <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
