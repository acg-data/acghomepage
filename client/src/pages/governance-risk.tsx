import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { PageLayout } from "@/components/layout";
import { SEO, serviceSchema, breadcrumbSchema } from "@/components/seo";
import { FAQSection } from "@/components/faq-section";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { 
  ArrowRight, 
  ArrowDown, 
  Shield, 
  Scale, 
  Eye, 
  AlertTriangle, 
  Leaf, 
  Lock, 
  CheckCircle2,
  Building2,
  Users,
  FileCheck,
  TrendingUp,
  ChevronRight,
  Zap,
  Activity,
  Target,
  Radar
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const riskDomains = [
  {
    id: "enterprise",
    title: "Enterprise Risk",
    icon: Building2,
    description: "Comprehensive risk frameworks that protect value while enabling growth",
    services: [
      { name: "Risk Assessment & Mapping", detail: "Identify and quantify risks across the organization" },
      { name: "Risk Appetite Framework", detail: "Define acceptable risk levels aligned with strategy" },
      { name: "Key Risk Indicators", detail: "Real-time monitoring and early warning systems" },
      { name: "Risk Culture Programs", detail: "Embed risk awareness into organizational DNA" }
    ],
    stat: { value: "75%", label: "Risk Visibility Improvement" },
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
  },
  {
    id: "regulatory",
    title: "Regulatory Compliance",
    icon: Scale,
    description: "Navigate complex regulatory landscapes with confidence and efficiency",
    services: [
      { name: "Compliance Gap Analysis", detail: "Assess current state against regulatory requirements" },
      { name: "Regulatory Change Management", detail: "Stay ahead of evolving regulations" },
      { name: "Compliance Automation", detail: "Streamline reporting and monitoring" },
      { name: "Regulatory Relationships", detail: "Build constructive regulator engagement" }
    ],
    stat: { value: "90%", label: "Compliance Efficiency Gain" },
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
  },
  {
    id: "cyber",
    title: "Cyber & Data Risk",
    icon: Lock,
    description: "Protect critical assets in an increasingly connected world",
    services: [
      { name: "Cyber Risk Assessment", detail: "Identify vulnerabilities and threat vectors" },
      { name: "Data Governance", detail: "Establish data quality and protection frameworks" },
      { name: "Incident Response Planning", detail: "Prepare for and respond to cyber events" },
      { name: "Third-Party Risk", detail: "Manage risks from vendors and partners" }
    ],
    stat: { value: "60%", label: "Breach Risk Reduction" },
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80"
  },
  {
    id: "esg",
    title: "ESG & Sustainability",
    icon: Leaf,
    description: "Transform sustainability commitments into competitive advantage",
    services: [
      { name: "ESG Strategy Development", detail: "Define material ESG priorities and roadmap" },
      { name: "Sustainability Reporting", detail: "Meet disclosure requirements and stakeholder expectations" },
      { name: "Climate Risk Assessment", detail: "Understand physical and transition risks" },
      { name: "Social Impact Programs", detail: "Create measurable community value" }
    ],
    stat: { value: "40%", label: "ESG Score Improvement" },
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
  }
];

const governanceServices = [
  {
    icon: Users,
    title: "Board Effectiveness",
    description: "Optimize board composition, structure, and dynamics to drive strategic value",
    capabilities: ["Board assessments", "Director development", "Succession planning", "Committee optimization"]
  },
  {
    icon: Eye,
    title: "Executive Oversight",
    description: "Strengthen management accountability and performance monitoring",
    capabilities: ["Executive compensation", "Performance frameworks", "Delegation of authority", "Ethics programs"]
  },
  {
    icon: FileCheck,
    title: "Internal Controls",
    description: "Build robust control environments that enable efficient operations",
    capabilities: ["Control design", "SOX compliance", "Process optimization", "Automation strategies"]
  }
];

const impactMetrics = [
  { value: "50%", label: "Reduction in Risk Incidents", icon: Shield },
  { value: "3x", label: "Faster Regulatory Response", icon: Zap },
  { value: "$200M+", label: "Value Protected", icon: TrendingUp },
  { value: "100+", label: "Board Engagements", icon: Users }
];

const caseHighlights = [
  {
    industry: "Financial Services",
    challenge: "Complex multi-jurisdictional compliance requirements",
    outcome: "Unified compliance framework reducing overhead by 40%",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80"
  },
  {
    industry: "Healthcare",
    challenge: "HIPAA compliance gaps and data security concerns",
    outcome: "Zero audit findings and enhanced patient trust",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80"
  },
  {
    industry: "Technology",
    challenge: "Rapid growth outpacing governance structures",
    outcome: "Scalable governance enabling successful IPO",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80"
  }
];

const shieldNodes = [
  { id: 1, x: 50, y: 20, label: "Board", icon: Users },
  { id: 2, x: 20, y: 45, label: "Compliance", icon: Scale },
  { id: 3, x: 80, y: 45, label: "Cyber", icon: Lock },
  { id: 4, x: 35, y: 75, label: "ESG", icon: Leaf },
  { id: 5, x: 65, y: 75, label: "Controls", icon: FileCheck },
  { id: 6, x: 50, y: 50, label: "Enterprise", icon: Shield },
];

const connections = [
  [1, 2], [1, 3], [1, 6],
  [2, 4], [2, 6],
  [3, 5], [3, 6],
  [4, 6], [5, 6],
  [4, 5]
];

export default function GovernanceRisk() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const shieldNetworkRef = useRef<SVGSVGElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("enterprise");
  const [hoveredCase, setHoveredCase] = useState<number | null>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);

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

    // Hero intro timeline
    const heroTl = gsap.timeline({ delay: 0.3 });
    
    // Staged text reveal
    if (heroTextRef.current) {
      const badge = heroTextRef.current.querySelector('.hero-badge');
      const title = heroTextRef.current.querySelector('.hero-title');
      const subtitle = heroTextRef.current.querySelector('.hero-subtitle');
      const buttons = heroTextRef.current.querySelector('.hero-buttons');
      
      heroTl
        .fromTo(badge, 
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        )
        .fromTo(title,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(subtitle,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(buttons,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        );
    }

    // Shield network animation
    if (shieldNetworkRef.current) {
      const nodes = shieldNetworkRef.current.querySelectorAll('.shield-node');
      const lines = shieldNetworkRef.current.querySelectorAll('.shield-line');
      const pulses = shieldNetworkRef.current.querySelectorAll('.node-pulse');
      
      heroTl
        .fromTo(lines,
          { strokeDashoffset: 200, opacity: 0 },
          { strokeDashoffset: 0, opacity: 0.6, duration: 1.2, stagger: 0.05, ease: "power2.inOut" },
          "-=0.8"
        )
        .fromTo(nodes,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(2)" },
          "-=0.8"
        )
        .fromTo(pulses,
          { scale: 0.8, opacity: 0 },
          { scale: 1.5, opacity: 0, duration: 2, stagger: 0.2, repeat: -1, ease: "power1.out" },
          "-=0.3"
        );
    }

    // Radar sweep animation
    if (radarRef.current) {
      gsap.to(radarRef.current.querySelector('.radar-sweep'), {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center"
      });
    }

    // Hero scroll parallax
    if (heroRef.current) {
      gsap.to(heroTextRef.current, {
        y: -80,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
      });
      
      gsap.to(shieldNetworkRef.current, {
        y: 50,
        scale: 0.9,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "70% top",
          scrub: 1,
        },
      });
    }

    // Stats counter animation
    if (statsRef.current) {
      const statElements = statsRef.current.querySelectorAll(".stat-value");
      statElements.forEach((stat) => {
        gsap.fromTo(
          stat,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    // Cards stagger
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".governance-card");
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, rotateX: 10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animate sections
    const sections = containerRef.current?.querySelectorAll(".animate-section");
    sections?.forEach((section) => {
      gsap.fromTo(
        section,
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

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <PageLayout>
      <SEO
        title="Governance & Risk | Aryo Consulting Group"
        description="Modern governance frameworks and enterprise risk management. Board effectiveness, compliance, cyber risk, and ESG expertise."
        canonical="https://aryocg.com/governance-risk"
        jsonLd={[
          serviceSchema({ name: "Governance & Risk", description: "Modern governance frameworks and enterprise risk management that protect value and enable growth.", url: "https://aryocg.com/governance-risk" }),
          breadcrumbSchema([
            { name: "Home", url: "https://aryocg.com" },
            { name: "Capabilities", url: "https://aryocg.com/capabilities" },
            { name: "Governance & Risk", url: "https://aryocg.com/governance-risk" },
          ]),
        ]}
      />
      <div ref={containerRef} className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
        {/* Unique Hero - Shield Network Visualization */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center overflow-hidden"
          data-testid="section-hero"
        >
          {/* Dark gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#1a365d]" />
          
          {/* Hexagonal pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%2347B5CB' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#47B5CB]/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-[#274D8E]/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4EB9A7]/10 rounded-full blur-[150px]" />
          </div>

          {/* Split Layout Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Text Content */}
              <div ref={heroTextRef} className="order-2 lg:order-1">
                <div className="hero-badge inline-flex items-center gap-2 bg-[#47B5CB]/10 backdrop-blur-sm border border-[#47B5CB]/30 rounded-full px-4 py-2 mb-6">
                  <Activity className="w-4 h-4 text-[#47B5CB]" />
                  <span className="text-[#47B5CB] text-sm font-medium tracking-wide">Real-Time Protection</span>
                </div>
                
                <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6">
                  <span className="block">Your Shield</span>
                  <span className="block text-[#47B5CB]">Against Risk</span>
                </h1>
                
                <p className="hero-subtitle text-lg md:text-xl text-white/60 max-w-xl mb-8 leading-relaxed">
                  Integrated governance and risk management that forms an impenetrable defense 
                  around your enterprise. <span className="text-white/90">Protection that enables growth.</span>
                </p>
                
                <div className="hero-buttons flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-[#47B5CB] hover:bg-[#3a9fb3] text-white px-8 py-6 text-lg gap-2 group"
                      data-testid="button-gr-contact"
                    >
                      Activate Your Shield
                      <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-lg backdrop-blur-sm"
                    onClick={() => {
                      const section = document.getElementById('risk-domains');
                      section?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    data-testid="button-gr-explore"
                  >
                    Explore Domains
                  </Button>
                </div>
                
                {/* Mini metrics row */}
                <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
                  {[
                    { value: "500+", label: "Risks Mitigated" },
                    { value: "98%", label: "Client Retention" },
                    { value: "24/7", label: "Monitoring" }
                  ].map((stat, i) => (
                    <div key={i} className="text-center sm:text-left">
                      <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs md:text-sm text-white/50">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Shield Network Visualization */}
              <div className="order-1 lg:order-2 relative flex items-center justify-center">
                {/* Radar background */}
                <div ref={radarRef} className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
                  {/* Radar rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[1, 0.75, 0.5, 0.25].map((scale, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full border border-[#47B5CB]/20"
                        style={{
                          width: `${scale * 100}%`,
                          height: `${scale * 100}%`,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Radar sweep */}
                  <div 
                    className="radar-sweep absolute inset-0"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0deg, rgba(71, 181, 203, 0.3) 30deg, transparent 60deg)`,
                    }}
                  />
                </div>

                {/* Shield Network SVG */}
                <svg
                  ref={shieldNetworkRef}
                  viewBox="0 0 100 100"
                  className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]"
                >
                  {/* Connection lines */}
                  {connections.map(([from, to], i) => {
                    const fromNode = shieldNodes.find(n => n.id === from)!;
                    const toNode = shieldNodes.find(n => n.id === to)!;
                    return (
                      <line
                        key={i}
                        className="shield-line"
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke="url(#lineGradient)"
                        strokeWidth="0.5"
                        strokeDasharray="200"
                      />
                    );
                  })}
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#47B5CB" />
                      <stop offset="100%" stopColor="#4EB9A7" />
                    </linearGradient>
                    <radialGradient id="nodeGradient">
                      <stop offset="0%" stopColor="#47B5CB" />
                      <stop offset="100%" stopColor="#274D8E" />
                    </radialGradient>
                  </defs>

                  {/* Nodes */}
                  {shieldNodes.map((node) => {
                    const Icon = node.icon;
                    const isCenter = node.id === 6;
                    const isActive = activeNode === node.id;
                    return (
                      <g
                        key={node.id}
                        className="shield-node cursor-pointer"
                        onMouseEnter={() => setActiveNode(node.id)}
                        onMouseLeave={() => setActiveNode(null)}
                      >
                        {/* Pulse ring */}
                        <circle
                          className="node-pulse"
                          cx={node.x}
                          cy={node.y}
                          r={isCenter ? 10 : 6}
                          fill="none"
                          stroke="#47B5CB"
                          strokeWidth="0.5"
                        />
                        
                        {/* Node background */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isCenter ? 8 : 5}
                          fill="url(#nodeGradient)"
                          className={`transition-all duration-300 ${isActive ? 'filter drop-shadow-lg' : ''}`}
                          style={{
                            transform: isActive ? 'scale(1.2)' : 'scale(1)',
                            transformOrigin: `${node.x}px ${node.y}px`
                          }}
                        />
                        
                        {/* Label */}
                        <text
                          x={node.x}
                          y={node.y + (isCenter ? 14 : 10)}
                          textAnchor="middle"
                          className="fill-white/70 text-[3px] font-medium uppercase tracking-wider"
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Floating status cards */}
                <div className="absolute -top-4 -right-4 bg-[#0d1f3c]/80 backdrop-blur-md border border-[#47B5CB]/30 rounded-xl p-4 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#4EB9A7] animate-pulse" />
                    <div>
                      <p className="text-white text-sm font-medium">All Systems Active</p>
                      <p className="text-white/50 text-xs">Protected</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-[#0d1f3c]/80 backdrop-blur-md border border-[#47B5CB]/30 rounded-xl p-4 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <Radar className="w-5 h-5 text-[#47B5CB]" />
                    <div>
                      <p className="text-white text-sm font-medium">Threat Scanning</p>
                      <p className="text-white/50 text-xs">Continuous monitoring</p>
                    </div>
                  </div>
                </div>
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

        {/* Impact Metrics */}
        <section ref={statsRef} className="py-20 bg-gradient-to-b from-[#0d1f3c] to-[#1a365d] relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#47B5CB]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#4EB9A7]/20 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {impactMetrics.map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <div key={i} className="text-center group">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-[#47B5CB]" />
                    </div>
                    <p className="stat-value text-4xl md:text-5xl font-bold text-white mb-2">{metric.value}</p>
                    <p className="text-white/60">{metric.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Risk Domains - Tabbed Section */}
        <section id="risk-domains" className="py-24 md:py-32 bg-white dark:bg-gray-950" data-testid="section-risk-domains">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-section text-center mb-16">
              <p className="text-[#47B5CB] font-medium tracking-widest uppercase mb-4">Risk Management</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a365d] dark:text-white mb-6">
                Comprehensive <span className="text-[#47B5CB]">Risk Coverage</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Four integrated domains that address the full spectrum of enterprise risk
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-section">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-transparent h-auto mb-12">
                {riskDomains.map((domain) => {
                  const Icon = domain.icon;
                  return (
                    <TabsTrigger
                      key={domain.id}
                      value={domain.id}
                      className="flex flex-col items-center gap-3 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 data-[state=active]:border-[#47B5CB] data-[state=active]:bg-[#47B5CB]/5 transition-all h-auto"
                      data-testid={`tab-${domain.id}`}
                    >
                      <Icon className="w-8 h-8 text-[#274D8E] dark:text-[#47B5CB]" />
                      <span className="font-semibold text-[#1a365d] dark:text-white">{domain.title}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {riskDomains.map((domain) => (
                <TabsContent key={domain.id} value={domain.id} className="mt-0">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-[#1a365d] dark:text-white mb-4">
                        {domain.title}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        {domain.description}
                      </p>
                      
                      <div className="space-y-4 mb-8">
                        {domain.services.map((service, i) => (
                          <div key={i} className="group flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-[#47B5CB]/50 transition-all">
                            <div className="w-10 h-10 rounded-lg bg-[#47B5CB]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#47B5CB]/20 transition-colors">
                              <CheckCircle2 className="w-5 h-5 text-[#47B5CB]" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-[#1a365d] dark:text-white mb-1">{service.name}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{service.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-4 p-4 rounded-xl bg-[#274D8E] text-white">
                        <div className="text-3xl font-bold">{domain.stat.value}</div>
                        <div className="text-sm text-white/70">{domain.stat.label}</div>
                      </div>
                    </div>

                    {/* Image with Transparency Overlay */}
                    <div className="relative group">
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                        <img
                          src={domain.image}
                          alt={domain.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#274D8E]/60 via-transparent to-[#47B5CB]/30" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a365d]/40" />
                      </div>
                      
                      {/* Floating Badge */}
                      <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 border border-gray-100 dark:border-gray-800">
                        <domain.icon className="w-10 h-10 text-[#47B5CB] mb-2" />
                        <p className="font-bold text-[#1a365d] dark:text-white">Specialized</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Expertise</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Governance Services - Cards */}
        <section className="py-24 md:py-32 bg-[#f8fafc] dark:bg-gray-900" data-testid="section-governance">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-section text-center mb-16">
              <p className="text-[#47B5CB] font-medium tracking-widest uppercase mb-4">Corporate Governance</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a365d] dark:text-white mb-6">
                Build <span className="text-[#47B5CB]">Stronger Foundations</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Governance that enables strategy execution while protecting stakeholder interests
              </p>
            </div>

            <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
              {governanceServices.map((service, i) => {
                const Icon = service.icon;
                return (
                  <div 
                    key={i} 
                    className="governance-card group relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-500"
                    style={{ perspective: '1000px' }}
                    data-testid={`card-governance-${i}`}
                  >
                    {/* Hover Gradient Background */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#47B5CB]/0 to-[#4EB9A7]/0 group-hover:from-[#47B5CB]/5 group-hover:to-[#4EB9A7]/10 transition-all duration-500" />
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#274D8E] to-[#47B5CB] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-display font-bold text-[#1a365d] dark:text-white mb-3 group-hover:text-[#47B5CB] transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {service.description}
                      </p>
                      
                      <ul className="space-y-2">
                        {service.capabilities.map((cap, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#47B5CB]" />
                            {cap}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                        <Link href="/contact">
                          <Button 
                            variant="ghost" 
                            className="p-0 h-auto text-[#274D8E] dark:text-[#47B5CB] font-semibold group/btn"
                          >
                            Learn More
                            <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Case Highlights with Hover Effects */}
        <section className="py-24 md:py-32 bg-white dark:bg-gray-950" data-testid="section-cases">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-section mb-16">
              <p className="text-[#47B5CB] font-medium tracking-widest uppercase mb-4">Success Stories</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a365d] dark:text-white">
                Real-World <span className="text-[#47B5CB]">Impact</span>
              </h2>
            </div>

            <div className="animate-section grid md:grid-cols-3 gap-8">
              {caseHighlights.map((item, i) => (
                <div
                  key={i}
                  className="relative group cursor-pointer rounded-2xl overflow-hidden"
                  onMouseEnter={() => setHoveredCase(i)}
                  onMouseLeave={() => setHoveredCase(null)}
                  data-testid={`card-case-${i}`}
                >
                  <div className="aspect-[3/4]">
                    <img
                      src={item.image}
                      alt={item.industry}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hoveredCase === i ? 'scale-110 blur-sm' : 'scale-100'
                      }`}
                    />
                    
                    {/* Gradient Overlay - Always visible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d]/95 via-[#1a365d]/50 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className={`transform transition-all duration-500 ${
                        hoveredCase === i ? '-translate-y-4' : 'translate-y-0'
                      }`}>
                        <p className="text-[#47B5CB] font-medium mb-2">{item.industry}</p>
                        <h3 className="text-xl font-bold text-white mb-3">{item.challenge}</h3>
                        
                        <div className={`transition-all duration-500 overflow-hidden ${
                          hoveredCase === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="pt-4 border-t border-white/20">
                            <p className="text-sm text-white/60 uppercase tracking-wider mb-2">Outcome</p>
                            <p className="text-white/90">{item.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-section text-center mt-12">
              <Link href="/case-studies">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#274D8E] text-[#274D8E] hover:bg-[#274D8E] hover:text-white dark:border-[#47B5CB] dark:text-[#47B5CB]"
                  data-testid="button-view-cases"
                >
                  View All Case Studies
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Approach Section with Parallax */}
        <section className="py-24 md:py-32 bg-[#1a365d] relative overflow-hidden" data-testid="section-approach">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#47B5CB]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4EB9A7]/10 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="animate-section grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#4EB9A7] font-medium tracking-widest uppercase mb-4">Our Approach</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-8">
                  Governance That
                  <br />
                  <span className="text-[#47B5CB]">Enables Growth</span>
                </h2>
                <p className="text-lg text-white/70 mb-8">
                  We believe governance and risk management should be enablers, not obstacles. 
                  Our frameworks are designed to protect value while accelerating strategic objectives.
                </p>
                
                <div className="space-y-6">
                  {[
                    { title: "Risk as Strategy", desc: "Integrate risk considerations into strategic planning" },
                    { title: "Proportionate Controls", desc: "Right-size controls to match actual risk exposure" },
                    { title: "Continuous Monitoring", desc: "Real-time visibility into emerging risks" },
                    { title: "Culture of Ownership", desc: "Embed accountability throughout the organization" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[#47B5CB]/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-[#47B5CB]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-white/60 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Visual Element */}
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                    alt="Business analytics and data charts"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#274D8E]/60 via-transparent to-[#47B5CB]/40" />
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -top-8 -right-8 bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6">
                  <p className="text-3xl font-bold text-[#274D8E]">15+</p>
                  <p className="text-sm text-gray-500">Years Experience</p>
                </div>
                
                <div className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6">
                  <p className="text-3xl font-bold text-[#47B5CB]">500+</p>
                  <p className="text-sm text-gray-500">Risk Assessments</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-gradient-to-br from-[#274D8E] via-[#1a365d] to-[#0d1f3c]" data-testid="section-cta">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="animate-section">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
                <AlertTriangle className="w-4 h-4 text-[#47B5CB]" />
                <span className="text-white/80 text-sm">Don't Wait for a Crisis</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                Strengthen Your Risk Posture
              </h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Whether you're facing regulatory pressure, board scrutiny, or emerging threats—we help you build 
                resilient organizations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-[#47B5CB] hover:bg-[#3a9fb3] text-white px-8 py-6 text-lg gap-2"
                    data-testid="button-cta-contact"
                  >
                    Request a Risk Assessment
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/capabilities">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
                    data-testid="button-cta-capabilities"
                  >
                    All Capabilities
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <FAQSection faqs={[
          { question: "What does governance and risk consulting cover?", answer: "Our governance and risk services include board effectiveness, compliance frameworks, enterprise risk management, regulatory readiness, cybersecurity governance, and ESG strategy development." },
          { question: "Is governance consulting only for public companies?", answer: "No. Private companies, PE-backed firms, and nonprofits all benefit from strong governance. Good governance practices increase company value, reduce risk, and improve decision-making at any stage." },
          { question: "How does Aryo approach enterprise risk management?", answer: "We build risk frameworks tailored to your industry, identifying key risk categories, establishing monitoring systems, defining risk appetite, and creating response protocols that protect enterprise value." },
          { question: "What regulatory frameworks does Aryo help with?", answer: "We advise on SOX compliance, SEC reporting requirements, data privacy (GDPR, CCPA), industry-specific regulations (HIPAA, PCI-DSS), and emerging ESG disclosure requirements." },
        ]} />
      </div>
    </PageLayout>
  );
}
