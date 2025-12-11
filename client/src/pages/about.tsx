import { Link } from 'wouter';
import { ArrowRight, MapPin, Users, Target, Award, ChevronRight } from 'lucide-react';

const teamMembers = [
  {
    name: "James Richardson",
    title: "Managing Partner",
    bio: "Former McKinsey Principal with 20+ years in M&A and corporate strategy. Led $5B+ in transaction value.",
    initials: "JR"
  },
  {
    name: "Sarah Chen",
    title: "Partner, Digital Practice",
    bio: "Ex-Google strategy lead. Specializes in digital transformation and technology-enabled growth.",
    initials: "SC"
  },
  {
    name: "Michael Torres",
    title: "Partner, Operations",
    bio: "Former COO of a Fortune 500 subsidiary. Expert in operational excellence and performance improvement.",
    initials: "MT"
  },
  {
    name: "David Park",
    title: "Partner, Capital Markets",
    bio: "20 years in investment banking. Deep expertise in capital raising and financial structuring.",
    initials: "DP"
  },
  {
    name: "Elena Rodriguez",
    title: "Partner, Governance",
    bio: "Former board member and corporate secretary. Specializes in ESG and board effectiveness.",
    initials: "ER"
  },
  {
    name: "Robert Kim",
    title: "Partner, M&A Integration",
    bio: "Led 50+ post-merger integrations. Expert in value capture and synergy realization.",
    initials: "RK"
  }
];

const locations = [
  { city: "Boston", status: "active", address: "One Financial Center, Suite 2500", description: "Global Headquarters" },
  { city: "New York", status: "active", address: "1 World Trade Center, Floor 85", description: "East Coast Hub" },
  { city: "San Francisco", status: "coming", address: "Coming Q4 2026", description: "West Coast Expansion" },
  { city: "London", status: "coming", address: "Coming Q4 2026", description: "European Operations" },
  { city: "Singapore", status: "coming", address: "Coming Q4 2026", description: "Asia-Pacific Hub" },
  { city: "Dubai", status: "coming", address: "Coming Q4 2026", description: "Middle East Office" },
];

const values = [
  {
    icon: Target,
    title: "Outcome-Obsessed",
    description: "We don't bill hours—we deliver results. Our compensation is tied to the value we create."
  },
  {
    icon: Users,
    title: "Embedded Partnership",
    description: "We work alongside your team, not in isolation. Real change requires real collaboration."
  },
  {
    icon: Award,
    title: "Deployed Systems",
    description: "No vague decks. We implement actual systems, processes, and capabilities that endure."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-aryo-offWhite">
      <nav className="bg-white border-b border-aryo-lightGrey px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" data-testid="link-home">
            <img src="/api/aryo-logo" alt="ARYO Consulting Group" width={80} height={80} className="object-contain" data-testid="img-aryo-logo" />
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
          <span className="text-aryo-deepBlue">About</span>
        </div>

        <div className="mb-16">
          <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">Our Firm</span>
          <h1 className="text-4xl md:text-5xl font-serif text-aryo-deepBlue mt-4 mb-6">About ARYO Consulting Group</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            We're building the consulting firm we always wished existed—one that shares in outcomes, 
            deploys real systems, and works alongside clients as true partners.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <div className="bg-white border border-aryo-lightGrey p-10">
            <h2 className="text-2xl font-serif text-aryo-deepBlue mb-6">Our Story</h2>
            <div className="space-y-4 text-slate-600">
              <p>
                ARYO was founded by a group of senior partners who left the world's top consulting firms with a 
                shared conviction: the traditional consulting model is broken.
              </p>
              <p>
                Too many engagements end with beautifully designed presentations that collect dust. Too many 
                firms optimize for billable hours rather than client outcomes. Too many consultants fly in, 
                diagnose, and disappear—leaving clients to implement alone.
              </p>
              <p>
                We built ARYO to be different. We tie our compensation to results. We deploy actual systems 
                rather than recommendations. We embed with client teams until the work is done.
              </p>
              <p className="font-medium text-aryo-deepBlue">
                The result? 400+ successful engagements, $1.5B in enterprise value created, and a 98% client 
                retention rate.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {values.map((value, i) => (
              <div key={i} className="bg-white border border-aryo-lightGrey p-8 flex gap-6">
                <div className="w-12 h-12 bg-aryo-deepBlue/10 flex items-center justify-center flex-shrink-0">
                  <value.icon className="text-aryo-deepBlue" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-aryo-deepBlue mb-2">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">Leadership</span>
            <h2 className="text-3xl font-serif text-aryo-deepBlue mt-4">Our Team</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <div key={i} className="bg-white border border-aryo-lightGrey p-8" data-testid={`card-team-${i}`}>
                <div className="w-16 h-16 bg-aryo-deepBlue rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  {member.initials}
                </div>
                <h3 className="text-lg font-serif font-bold text-aryo-deepBlue">{member.name}</h3>
                <p className="text-sm text-aryo-teal font-medium mb-3">{member.title}</p>
                <p className="text-slate-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">Global Presence</span>
            <h2 className="text-3xl font-serif text-aryo-deepBlue mt-4">Our Locations</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, i) => (
              <div 
                key={i} 
                className={`border p-8 ${location.status === 'active' ? 'bg-white border-aryo-lightGrey' : 'bg-aryo-offWhite border-dashed border-aryo-lightGrey'}`}
                data-testid={`card-location-${i}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${location.status === 'active' ? 'bg-aryo-deepBlue' : 'bg-aryo-lightGrey'}`}>
                    <MapPin className={location.status === 'active' ? 'text-white' : 'text-slate-400'} size={20} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-serif font-bold ${location.status === 'active' ? 'text-aryo-deepBlue' : 'text-slate-400'}`}>
                      {location.city}
                      {location.status === 'coming' && (
                        <span className="ml-2 text-xs font-sans font-medium text-aryo-teal uppercase">Coming Soon</span>
                      )}
                    </h3>
                    <p className={`text-sm ${location.status === 'active' ? 'text-slate-600' : 'text-slate-400'}`}>{location.description}</p>
                    <p className={`text-sm mt-2 ${location.status === 'active' ? 'text-aryo-deepBlue font-medium' : 'text-slate-400 italic'}`}>
                      {location.address}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-aryo-deepBlue p-12 text-center">
          <h3 className="text-2xl font-serif text-white mb-4">Ready to work with a different kind of consulting firm?</h3>
          <p className="text-aryo-lightBlue/70 mb-8 max-w-xl mx-auto">
            Let's discuss how our outcome-based approach can create real value for your organization.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-aryo-deepBlue px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-aryo-offWhite transition-colors" data-testid="button-contact">
            Get in Touch <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
