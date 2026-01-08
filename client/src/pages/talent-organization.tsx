import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { PageLayout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Users,
  Sparkles,
  TrendingUp,
  Target,
  Heart,
  Brain,
  Lightbulb,
  Award,
  Rocket,
  Building2,
  Network,
  Compass,
  Layers,
  BarChart3,
  CheckCircle2,
  Quote,
  ArrowUpRight,
  Play,
  Zap,
  Star,
  GraduationCap,
  UserPlus,
  HandshakeIcon,
  GitMerge,
  Crown,
  Puzzle
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const talentDomains = [
  {
    id: "leadership",
    title: "Leadership Development",
    icon: Crown,
    tagline: "Developing Tomorrow's Leaders Today",
    description: "Build leadership capabilities at every level with programs designed to accelerate growth and drive organizational performance.",
    capabilities: [
      { name: "Executive Coaching", impact: "2x leadership effectiveness" },
      { name: "Leadership Academies", impact: "85% promotion readiness" },
      { name: "Succession Planning", impact: "Zero leadership gaps" },
      { name: "High-Potential Programs", impact: "40% faster advancement" }
    ],
    caseStudy: {
      client: "Global Technology Firm",
      result: "Transformed 200+ leaders through immersive development",
      outcome: "35% improvement in team engagement"
    },
    visual: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80"
  },
  {
    id: "culture",
    title: "Culture Transformation",
    icon: Heart,
    tagline: "Culture as Competitive Advantage",
    description: "Design and embed cultures that attract top talent, drive innovation, and deliver sustainable business results.",
    capabilities: [
      { name: "Culture Diagnostics", impact: "Deep insight in 4 weeks" },
      { name: "Values Activation", impact: "80% values alignment" },
      { name: "Behavior Change Programs", impact: "Sustainable transformation" },
      { name: "Employee Experience Design", impact: "25% engagement lift" }
    ],
    caseStudy: {
      client: "Healthcare System",
      result: "Unified culture across 15 acquired organizations",
      outcome: "40% reduction in turnover"
    },
    visual: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
  },
  {
    id: "organization",
    title: "Organization Design",
    icon: GitMerge,
    tagline: "Structure That Enables Strategy",
    description: "Architect organizations that are agile, efficient, and aligned with strategic priorities.",
    capabilities: [
      { name: "Operating Model Design", impact: "30% faster decisions" },
      { name: "Span & Layer Optimization", impact: "20% cost efficiency" },
      { name: "Agile Transformation", impact: "50% time-to-market" },
      { name: "Workforce Planning", impact: "Right skills, right time" }
    ],
    caseStudy: {
      client: "Financial Services",
      result: "Redesigned global operating model for 10,000 employees",
      outcome: "$45M annual savings"
    },
    visual: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
  },
  {
    id: "talent",
    title: "Talent Strategy",
    icon: UserPlus,
    tagline: "Win the War for Talent",
    description: "Develop comprehensive talent strategies that attract, develop, and retain the people who drive your success.",
    capabilities: [
      { name: "Talent Acquisition Strategy", impact: "40% faster hiring" },
      { name: "EVP Development", impact: "3x candidate quality" },
      { name: "Retention Programs", impact: "50% turnover reduction" },
      { name: "Skills Architecture", impact: "Future-ready workforce" }
    ],
    caseStudy: {
      client: "Consumer Goods",
      result: "Built talent pipeline for critical digital roles",
      outcome: "90% internal fill rate"
    },
    visual: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&q=80"
  }
];

const journeySteps = [
  {
    phase: "Discover",
    title: "Understand Your People",
    description: "Deep diagnostics to understand your organization's culture, capabilities, and challenges through data and human insight.",
    icon: Compass,
    color: "from-[#47B5CB] to-[#4EB9A7]",
    stats: [
      { value: "100+", label: "Stakeholder interviews" },
      { value: "85%", label: "Employee participation" }
    ]
  },
  {
    phase: "Design",
    title: "Co-Create Solutions",
    description: "Collaborative design of talent and organization strategies that are practical, inspiring, and uniquely yours.",
    icon: Puzzle,
    color: "from-[#4EB9A7] to-[#47B5CB]",
    stats: [
      { value: "3-5", label: "Strategic options" },
      { value: "90%", label: "Stakeholder alignment" }
    ]
  },
  {
    phase: "Deliver",
    title: "Activate Change",
    description: "Hands-on implementation support that brings strategies to life through your people, processes, and systems.",
    icon: Rocket,
    color: "from-[#47B5CB] to-[#274D8E]",
    stats: [
      { value: "12-18", label: "Month transformation" },
      { value: "95%", label: "Adoption rate" }
    ]
  },
  {
    phase: "Sustain",
    title: "Embed & Evolve",
    description: "Build internal capability to sustain momentum and continuously evolve your people practices.",
    icon: Layers,
    color: "from-[#274D8E] to-[#47B5CB]",
    stats: [
      { value: "∞", label: "Continuous improvement" },
      { value: "100%", label: "Capability transfer" }
    ]
  }
];

const impactMetrics = [
  { value: "500+", label: "Leaders Developed", icon: GraduationCap },
  { value: "95%", label: "Client Satisfaction", icon: Star },
  { value: "40%", label: "Engagement Improvement", icon: TrendingUp },
  { value: "50+", label: "Culture Transformations", icon: Heart }
];

const testimonials = [
  {
    quote: "They didn't just give us a strategy—they helped us become the organization we wanted to be.",
    author: "Chief People Officer",
    company: "Fortune 500 Retailer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80"
  },
  {
    quote: "The most thoughtful and impactful talent work we've ever experienced.",
    author: "CEO",
    company: "Technology Startup",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
  },
  {
    quote: "Our culture transformation has been the defining factor in our market success.",
    author: "Head of Talent",
    company: "Global Bank",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80"
  }
];

const principles = [
  {
    icon: Brain,
    title: "Human-Centered",
    description: "Every solution starts with understanding the people it will serve"
  },
  {
    icon: Target,
    title: "Strategy-Linked",
    description: "Talent and organization work tied directly to business outcomes"
  },
  {
    icon: Sparkles,
    title: "Evidence-Based",
    description: "Decisions grounded in data, research, and proven practice"
  },
  {
    icon: HandshakeIcon,
    title: "Collaborative",
    description: "Working alongside your team to build lasting capability"
  }
];

export default function TalentOrganization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("leadership");
  const [activeJourney, setActiveJourney] = useState(0);
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Constellation animation - interconnected nodes
    if (constellationRef.current) {
      const nodes = constellationRef.current.querySelectorAll('.constellation-node');
      const lines = constellationRef.current.querySelectorAll('.constellation-line');
      const pulses = constellationRef.current.querySelectorAll('.node-pulse');

      // Animate nodes appearing
      gsap.fromTo(nodes,
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );

      // Animate connection lines
      gsap.fromTo(lines,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 0.3,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          delay: 1
        }
      );

      // Continuous pulse animation on nodes
      pulses.forEach((pulse, i) => {
        gsap.to(pulse, {
          scale: 2,
          opacity: 0,
          duration: 2,
          repeat: -1,
          delay: i * 0.3,
          ease: "power1.out"
        });
      });

      // Gentle floating motion
      nodes.forEach((node, i) => {
        gsap.to(node, {
          y: "+=10",
          x: "+=5",
          duration: 3 + (i * 0.5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    }

    // Hero text animation
    const heroTl = gsap.timeline({ delay: 0.3 });
    if (heroRef.current) {
      const badge = heroRef.current.querySelector('.hero-badge');
      const title = heroRef.current.querySelector('.hero-title');
      const subtitle = heroRef.current.querySelector('.hero-subtitle');
      const buttons = heroRef.current.querySelector('.hero-buttons');
      const stats = heroRef.current.querySelector('.hero-stats');

      heroTl
        .fromTo(badge, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" })
        .fromTo(title, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .fromTo(subtitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .fromTo(buttons, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2")
        .fromTo(stats, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");
    }

    // Vertical sticky reveal for journey section
    if (journeyRef.current) {
      const journeyCards = journeyRef.current.querySelectorAll('.journey-card');
      const totalHeight = journeySteps.length * 100; // 100vh per step
      
      ScrollTrigger.create({
        trigger: journeyRef.current,
        start: "top top",
        end: `+=${totalHeight}%`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const step = Math.min(journeySteps.length - 1, Math.floor(self.progress * journeySteps.length));
          setActiveJourney(step);
        }
      });

      // Animate each card based on activeJourney state
      journeyCards.forEach((card, i) => {
        gsap.set(card, { 
          opacity: i === 0 ? 1 : 0,
          scale: i === 0 ? 1 : 0.9,
          y: i === 0 ? 0 : 50
        });
      });
    }

    // Animate sections
    const sections = containerRef.current?.querySelectorAll(".animate-section");
    sections?.forEach((section) => {
      gsap.fromTo(section,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Parallax images
    const parallaxImages = containerRef.current?.querySelectorAll('.parallax-image');
    parallaxImages?.forEach((img) => {
      gsap.to(img, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const currentDomain = talentDomains.find(d => d.id === activeTab)!;

  // Generate constellation node positions
  const constellationNodes = [
    { x: 15, y: 25, size: 'lg', delay: 0 },
    { x: 35, y: 15, size: 'md', delay: 0.1 },
    { x: 55, y: 30, size: 'lg', delay: 0.2 },
    { x: 75, y: 20, size: 'sm', delay: 0.3 },
    { x: 25, y: 50, size: 'md', delay: 0.4 },
    { x: 45, y: 55, size: 'lg', delay: 0.5 },
    { x: 65, y: 45, size: 'md', delay: 0.6 },
    { x: 85, y: 55, size: 'sm', delay: 0.7 },
    { x: 20, y: 75, size: 'sm', delay: 0.8 },
    { x: 40, y: 80, size: 'md', delay: 0.9 },
    { x: 60, y: 70, size: 'sm', delay: 1 },
    { x: 80, y: 75, size: 'lg', delay: 1.1 },
  ];

  const constellationLines = [
    { x1: 15, y1: 25, x2: 35, y2: 15 },
    { x1: 35, y1: 15, x2: 55, y2: 30 },
    { x1: 55, y1: 30, x2: 75, y2: 20 },
    { x1: 15, y1: 25, x2: 25, y2: 50 },
    { x1: 35, y1: 15, x2: 45, y2: 55 },
    { x1: 55, y1: 30, x2: 65, y2: 45 },
    { x1: 75, y1: 20, x2: 85, y2: 55 },
    { x1: 25, y1: 50, x2: 45, y2: 55 },
    { x1: 45, y1: 55, x2: 65, y2: 45 },
    { x1: 65, y1: 45, x2: 85, y2: 55 },
    { x1: 25, y1: 50, x2: 20, y2: 75 },
    { x1: 45, y1: 55, x2: 40, y2: 80 },
    { x1: 65, y1: 45, x2: 60, y2: 70 },
    { x1: 85, y1: 55, x2: 80, y2: 75 },
    { x1: 20, y1: 75, x2: 40, y2: 80 },
    { x1: 40, y1: 80, x2: 60, y2: 70 },
    { x1: 60, y1: 70, x2: 80, y2: 75 },
  ];

  return (
    <PageLayout>
      <SEO
        title="Talent & Organization | Aryo Consulting Group"
        description="Transform your organization through leadership development, culture transformation, organization design, and talent strategy. Build the people capabilities that drive lasting success."
      />
      <div ref={containerRef} className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
        
        {/* Hero - Human Constellation Network */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center overflow-hidden"
          data-testid="section-hero"
        >
          {/* Deep gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1929] via-[#162d4d] to-[#1a365d]" />
          
          {/* Animated mesh gradient overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-30"
              style={{
                background: `
                  radial-gradient(ellipse 80% 50% at 20% 40%, rgba(71, 181, 203, 0.3) 0%, transparent 50%),
                  radial-gradient(ellipse 60% 40% at 80% 60%, rgba(78, 185, 167, 0.25) 0%, transparent 50%),
                  radial-gradient(ellipse 50% 30% at 50% 80%, rgba(39, 77, 142, 0.2) 0%, transparent 50%)
                `
              }}
            />
          </div>

          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Human Constellation Network */}
          <div ref={constellationRef} className="absolute inset-0 pointer-events-none">
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full">
              {constellationLines.map((line, i) => (
                <line
                  key={i}
                  className="constellation-line origin-left"
                  x1={`${line.x1}%`}
                  y1={`${line.y1}%`}
                  x2={`${line.x2}%`}
                  y2={`${line.y2}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                />
              ))}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#47B5CB" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#4EB9A7" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            {/* Constellation nodes */}
            {constellationNodes.map((node, i) => (
              <div
                key={i}
                className="constellation-node absolute"
                style={{ 
                  left: `${node.x}%`, 
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Pulse ring */}
                <div 
                  className="node-pulse absolute inset-0 rounded-full bg-[#47B5CB]/30"
                  style={{
                    width: node.size === 'lg' ? '48px' : node.size === 'md' ? '32px' : '24px',
                    height: node.size === 'lg' ? '48px' : node.size === 'md' ? '32px' : '24px',
                    marginLeft: node.size === 'lg' ? '-24px' : node.size === 'md' ? '-16px' : '-12px',
                    marginTop: node.size === 'lg' ? '-24px' : node.size === 'md' ? '-16px' : '-12px',
                  }}
                />
                {/* Node circle */}
                <div 
                  className={`rounded-full bg-gradient-to-br from-[#47B5CB] to-[#4EB9A7] flex items-center justify-center shadow-lg shadow-[#47B5CB]/20 ${
                    node.size === 'lg' ? 'w-12 h-12' : node.size === 'md' ? 'w-8 h-8' : 'w-6 h-6'
                  }`}
                >
                  <Users className={`text-white ${
                    node.size === 'lg' ? 'w-6 h-6' : node.size === 'md' ? 'w-4 h-4' : 'w-3 h-3'
                  }`} />
                </div>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-2xl">
              <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
                <Network className="w-4 h-4 text-[#4EB9A7]" />
                <span className="text-white/90 text-sm font-medium tracking-wide">People-Powered Transformation</span>
              </div>

              <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6">
                <span className="block">Talent &</span>
                <span className="block bg-gradient-to-r from-[#47B5CB] via-[#4EB9A7] to-[#47B5CB] bg-clip-text text-transparent">
                  Organization
                </span>
              </h1>

              <p className="hero-subtitle text-lg md:text-xl text-white/70 max-w-xl mb-8 leading-relaxed">
                Your people are your greatest asset. We help you <span className="text-white font-semibold">unlock their potential</span>,
                build thriving cultures, and design organizations that win.
              </p>

              <div className="hero-buttons flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#47B5CB] to-[#4EB9A7] hover:from-[#3da5bb] hover:to-[#3fa997] text-white px-8 py-6 text-lg gap-2 group"
                    data-testid="button-to-contact"
                  >
                    Transform Your Organization
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-lg backdrop-blur-sm gap-2"
                  onClick={() => {
                    const section = document.getElementById('domains-section');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  data-testid="button-to-explore"
                >
                  <Play className="w-5 h-5" />
                  Explore Our Approach
                </Button>
              </div>

              {/* Hero Stats */}
              <div className="hero-stats grid grid-cols-4 gap-4 pt-8 border-t border-white/10">
                {impactMetrics.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="text-center">
                      <Icon className="w-5 h-5 text-[#4EB9A7] mx-auto mb-2" />
                      <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-white/50">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* Vision Statement - Full Width Image with Transparency */}
        <section className="relative h-[70vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80"
              alt="Team collaboration"
              className="parallax-image w-full h-[120%] object-cover"
            />
            {/* Multi-layer transparency */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d]/95 via-[#1a365d]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d]/80 via-transparent to-[#1a365d]/40" />
            <div className="absolute inset-0 bg-[#47B5CB]/10" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="max-w-2xl">
              <p className="text-[#4EB9A7] font-medium tracking-widest uppercase mb-4 animate-section">Our Belief</p>
              <h2 className="animate-section text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Organizations don't transform.
                <span className="block text-[#47B5CB]">People do.</span>
              </h2>
              <p className="animate-section text-lg text-white/80 leading-relaxed">
                Every lasting organizational change starts with people—their mindsets, capabilities, and connections. 
                We work at the intersection of human potential and business strategy to create transformations that endure.
              </p>
            </div>
          </div>
        </section>

        {/* Talent Domains - Interactive Tabs */}
        <section id="domains-section" className="py-24 md:py-32 bg-[#f8fafc] dark:bg-gray-900" data-testid="section-domains">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-section text-center mb-16">
              <p className="text-[#47B5CB] font-medium tracking-widest uppercase mb-4">Our Expertise</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a365d] dark:text-white mb-6">
                Where We <span className="text-[#47B5CB]">Make Impact</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Four interconnected domains where people and organization expertise drives transformational results
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-section">
              <TabsList className="flex flex-wrap justify-center gap-3 bg-transparent h-auto mb-12">
                {talentDomains.map((domain) => {
                  const Icon = domain.icon;
                  const isActive = activeTab === domain.id;
                  return (
                    <TabsTrigger
                      key={domain.id}
                      value={domain.id}
                      className={`flex items-center gap-3 px-5 py-3 rounded-full border-2 transition-all ${
                        isActive 
                          ? 'bg-gradient-to-r from-[#47B5CB] to-[#4EB9A7] border-transparent text-white shadow-lg shadow-[#47B5CB]/20' 
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#47B5CB]/50'
                      }`}
                      data-testid={`tab-${domain.id}`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#47B5CB]'}`} />
                      <span className="font-semibold hidden sm:inline">{domain.title}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {talentDomains.map((domain) => (
                <TabsContent key={domain.id} value={domain.id} className="mt-0">
                  <div className="grid lg:grid-cols-5 gap-8 items-stretch">
                    {/* Visual Side with Transparency */}
                    <div className="lg:col-span-2 relative group">
                      <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                        <img
                          src={domain.visual}
                          alt={domain.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Transparency layers */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d]/90 via-[#1a365d]/30 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#47B5CB]/20 via-transparent to-[#4EB9A7]/10" />
                      </div>

                      {/* Floating badge */}
                      <div className="absolute top-6 left-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                        <span className="text-sm font-semibold text-[#1a365d] dark:text-white">{domain.tagline}</span>
                      </div>

                      {/* Case study overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                          <p className="text-xs text-white/60 uppercase tracking-wider mb-2">Case Highlight</p>
                          <p className="font-semibold text-white mb-1">{domain.caseStudy.client}</p>
                          <p className="text-sm text-white/80 mb-2">{domain.caseStudy.result}</p>
                          <p className="text-[#4EB9A7] font-bold">{domain.caseStudy.outcome}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:col-span-3 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#47B5CB] to-[#4EB9A7] flex items-center justify-center">
                          <domain.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-display font-bold text-[#1a365d] dark:text-white">
                            {domain.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        {domain.description}
                      </p>

                      {/* Capabilities Grid */}
                      <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        {domain.capabilities.map((cap, i) => (
                          <Card 
                            key={i}
                            className="p-4 border-gray-100 dark:border-gray-800 hover:border-[#47B5CB] dark:hover:border-[#47B5CB]/50 transition-all bg-white dark:bg-gray-800 group"
                          >
                            <div className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-[#4EB9A7] flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium text-[#1a365d] dark:text-white mb-1">{cap.name}</p>
                                <p className="text-sm text-[#47B5CB]">{cap.impact}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>

                      <Link href="/contact">
                        <Button 
                          className="bg-[#1a365d] hover:bg-[#274D8E] text-white gap-2 w-fit"
                          data-testid={`button-domain-${domain.id}`}
                        >
                          Explore {domain.title}
                          <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Journey Section - Vertical Sticky Reveal */}
        <section 
          ref={journeyRef} 
          className="relative bg-[#1a365d] min-h-screen"
          data-testid="section-journey"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-[#47B5CB]/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-[#4EB9A7]/10 rounded-full blur-[120px]" />
          </div>

          <div className="h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Fixed Content */}
                <div className="lg:sticky lg:top-1/4">
                  <p className="text-[#4EB9A7] font-medium tracking-widest uppercase mb-4">Our Approach</p>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                    A Journey of
                    <span className="block text-[#47B5CB]">Transformation</span>
                  </h2>
                  <p className="text-lg text-white/70 mb-8">
                    Every organization is unique. Our approach adapts to your context while following proven principles that work.
                  </p>
                  
                  {/* Vertical Progress indicators */}
                  <div className="flex flex-col gap-3 mb-8">
                    {journeySteps.map((step, i) => (
                      <button 
                        key={i}
                        onClick={() => setActiveJourney(i)}
                        className={`flex items-center gap-4 text-left transition-all duration-500 group ${
                          i === activeJourney ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                        }`}
                        data-testid={`button-step-${i}`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                          i === activeJourney 
                            ? 'bg-gradient-to-br from-[#47B5CB] to-[#4EB9A7] scale-110' 
                            : 'bg-white/10 group-hover:bg-white/20'
                        }`}>
                          <span className="text-white font-bold text-sm">{i + 1}</span>
                        </div>
                        <div>
                          <p className="text-white font-semibold">{step.phase}</p>
                          <p className="text-white/50 text-sm">{step.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <Link href="/contact">
                    <Button className="bg-[#47B5CB] hover:bg-[#3da5bb] text-white" data-testid="button-journey-cta">
                      Start the Journey
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                {/* Right Side - Animated Cards Stack */}
                <div className="relative h-[500px]">
                  {journeySteps.map((step, i) => {
                    const Icon = step.icon;
                    const isActive = i === activeJourney;
                    const isPast = i < activeJourney;
                    const isFuture = i > activeJourney;
                    
                    return (
                      <div 
                        key={i}
                        className={`journey-card absolute inset-0 transition-all duration-700 ease-out ${
                          isActive 
                            ? 'opacity-100 scale-100 translate-y-0 z-30' 
                            : isPast 
                              ? 'opacity-0 scale-95 -translate-y-8 z-10' 
                              : 'opacity-0 scale-90 translate-y-12 z-20'
                        }`}
                        data-testid={`card-journey-${i}`}
                      >
                        <div className="h-full rounded-3xl overflow-hidden bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 p-8 flex flex-col relative">
                          {/* Gradient accent line */}
                          <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${step.color}`} />
                          
                          {/* Step Number Badge */}
                          <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                            <span className="text-white/80 font-display font-bold text-lg">0{i + 1}</span>
                          </div>

                          <div className="flex items-center gap-4 mb-6 mt-2">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <p className="text-[#4EB9A7] text-sm font-medium uppercase tracking-wider">{step.phase}</p>
                              <h3 className="text-2xl font-display font-bold text-white">{step.title}</h3>
                            </div>
                          </div>

                          <p className="text-white/80 text-lg leading-relaxed mb-8 flex-grow">
                            {step.description}
                          </p>

                          <div className="grid grid-cols-2 gap-4">
                            {step.stats.map((stat, j) => (
                              <div key={j} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                                <p className="text-sm text-white/60">{stat.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials - Cards with Transparency */}
        <section className="py-24 md:py-32 bg-white dark:bg-gray-950" data-testid="section-testimonials">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-section text-center mb-16">
              <p className="text-[#47B5CB] font-medium tracking-widest uppercase mb-4">Client Voices</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a365d] dark:text-white">
                What Leaders <span className="text-[#47B5CB]">Say</span>
              </h2>
            </div>

            <div className="animate-section grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <Card
                  key={i}
                  className={`relative p-8 border-gray-100 dark:border-gray-800 transition-all duration-500 overflow-visible bg-white dark:bg-gray-900 ${
                    hoveredTestimonial === i ? 'border-[#47B5CB] shadow-xl shadow-[#47B5CB]/10 -translate-y-2' : ''
                  }`}
                  onMouseEnter={() => setHoveredTestimonial(i)}
                  onMouseLeave={() => setHoveredTestimonial(null)}
                  data-testid={`card-testimonial-${i}`}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-[#47B5CB]/0 to-[#4EB9A7]/0 transition-opacity duration-500 ${
                    hoveredTestimonial === i ? 'from-[#47B5CB]/5 to-[#4EB9A7]/5' : ''
                  }`} />

                  <div className="relative z-10">
                    <Quote className={`w-10 h-10 mb-6 transition-colors ${
                      hoveredTestimonial === i ? 'text-[#47B5CB]' : 'text-gray-200 dark:text-gray-700'
                    }`} />
                    
                    <p className="text-lg text-[#1a365d] dark:text-white font-medium mb-8 leading-relaxed">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1a365d] dark:text-white">{testimonial.author}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Principles - Floating Cards */}
        <section className="py-24 md:py-32 bg-[#f8fafc] dark:bg-gray-900 relative overflow-hidden" data-testid="section-principles">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#47B5CB]/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#4EB9A7]/5 rounded-full blur-[80px]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="animate-section text-center mb-16">
              <p className="text-[#47B5CB] font-medium tracking-widest uppercase mb-4">How We Work</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a365d] dark:text-white">
                Principles That <span className="text-[#47B5CB]">Guide Us</span>
              </h2>
            </div>

            <div className="animate-section grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {principles.map((principle, i) => {
                const Icon = principle.icon;
                return (
                  <Card
                    key={i}
                    className="group p-6 border-gray-100 dark:border-gray-800 hover:border-[#47B5CB] dark:hover:border-[#47B5CB]/50 transition-all duration-500 bg-white dark:bg-gray-900 hover:shadow-xl hover:shadow-[#47B5CB]/5 hover:-translate-y-1"
                    data-testid={`card-principle-${i}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#47B5CB]/10 to-[#4EB9A7]/10 group-hover:from-[#47B5CB] group-hover:to-[#4EB9A7] flex items-center justify-center mb-4 transition-all duration-500">
                      <Icon className="w-6 h-6 text-[#47B5CB] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-[#1a365d] dark:text-white mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {principle.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 relative overflow-hidden" data-testid="section-cta">
          {/* Background image with transparency */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=1600&q=80"
              alt="Team success"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d]/95 via-[#274D8E]/90 to-[#1a365d]/95" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d]/80 via-transparent to-[#1a365d]/60" />
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="animate-section">
              <div className="inline-flex items-center gap-2 bg-[#47B5CB]/20 backdrop-blur-sm border border-[#47B5CB]/30 rounded-full px-4 py-2 mb-8">
                <Heart className="w-4 h-4 text-[#4EB9A7]" />
                <span className="text-white/90 text-sm font-medium">Your People, Our Passion</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                Ready to Unleash Your
                <br />
                <span className="text-[#47B5CB]">Organization's Potential?</span>
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Great organizations are built by great people. Let's work together to 
                create the culture, leaders, and capabilities your future demands.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-[#47B5CB] hover:bg-[#3da5bb] text-white px-8 py-6 text-lg gap-2"
                    data-testid="button-cta-contact"
                  >
                    Start a Conversation
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/case-studies">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
                    data-testid="button-cta-cases"
                  >
                    View Success Stories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
