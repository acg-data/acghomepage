import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { PageLayout } from "@/components/layout";
import { SEO, serviceSchema, breadcrumbSchema } from "@/components/seo";
import { FAQSection } from "@/components/faq-section";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Cog,
  Zap,
  TrendingUp,
  BarChart3,
  Target,
  Clock,
  DollarSign,
  CheckCircle2,
  Layers,
  GitBranch,
  Activity,
  Gauge,
  ArrowUpRight,
  Play,
  ChevronRight,
  Lightbulb,
  Users,
  Settings,
  LineChart,
  PieChart,
  Workflow,
  Repeat,
  Box
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const processPhases = [
  {
    phase: "01",
    title: "Diagnose",
    subtitle: "Uncover Hidden Potential",
    description: "Deep-dive analysis to identify inefficiencies, bottlenecks, and opportunities for improvement across your operations.",
    duration: "2-4 weeks",
    deliverables: ["Process mapping", "Benchmarking analysis", "Quick-win identification", "Opportunity sizing"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    stat: { value: "25%", label: "Avg. efficiency gap found" }
  },
  {
    phase: "02",
    title: "Design",
    subtitle: "Blueprint for Excellence",
    description: "Co-create optimized processes, operating models, and implementation roadmaps tailored to your organization.",
    duration: "4-6 weeks",
    deliverables: ["Future-state design", "Technology enablers", "Change roadmap", "Business case"],
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
    stat: { value: "3x", label: "ROI on transformation" }
  },
  {
    phase: "03",
    title: "Deliver",
    subtitle: "Execute with Precision",
    description: "Hands-on implementation support ensuring changes stick and deliver measurable results.",
    duration: "8-16 weeks",
    deliverables: ["Pilot programs", "Training & enablement", "KPI dashboards", "Continuous improvement"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    stat: { value: "90%", label: "Implementation success" }
  },
  {
    phase: "04",
    title: "Sustain",
    subtitle: "Lock in the Gains",
    description: "Embed operational excellence into your DNA with governance, metrics, and capability building.",
    duration: "Ongoing",
    deliverables: ["Performance management", "Excellence culture", "Capability academies", "Continuous optimization"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    stat: { value: "15%+", label: "Year-over-year gains" }
  }
];

const excellenceAreas = [
  {
    id: "process",
    title: "Process Excellence",
    icon: Workflow,
    tagline: "Streamline. Automate. Accelerate.",
    description: "Transform complex, manual processes into streamlined, automated workflows that drive speed and consistency.",
    capabilities: [
      { name: "Process Mining & Analytics", impact: "40% faster cycle times" },
      { name: "Lean Six Sigma Programs", impact: "60% defect reduction" },
      { name: "Intelligent Automation", impact: "70% manual effort saved" },
      { name: "End-to-End Optimization", impact: "25% cost reduction" }
    ],
    caseStudy: {
      client: "Global Manufacturer",
      result: "Reduced order-to-cash cycle from 45 to 12 days",
      savings: "$8M annual savings"
    },
    visual: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80"
  },
  {
    id: "cost",
    title: "Cost Optimization",
    icon: DollarSign,
    tagline: "Smart Savings. Strategic Investment.",
    description: "Identify and capture sustainable cost reductions while preserving capabilities that matter most.",
    capabilities: [
      { name: "Zero-Based Budgeting", impact: "15-25% cost reduction" },
      { name: "Procurement Excellence", impact: "12% spend savings" },
      { name: "Shared Services Design", impact: "30% overhead reduction" },
      { name: "Complexity Reduction", impact: "20% SKU rationalization" }
    ],
    caseStudy: {
      client: "Retail Chain",
      result: "Restructured cost base across 200+ locations",
      savings: "$45M in annual savings"
    },
    visual: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80"
  },
  {
    id: "supply",
    title: "Supply Chain",
    icon: GitBranch,
    tagline: "Resilient. Responsive. Efficient.",
    description: "Build supply chains that balance cost, service, and resilience in an increasingly volatile world.",
    capabilities: [
      { name: "Network Optimization", impact: "20% logistics savings" },
      { name: "Demand Planning", impact: "35% forecast accuracy" },
      { name: "Inventory Excellence", impact: "25% working capital freed" },
      { name: "Supplier Performance", impact: "15% procurement savings" }
    ],
    caseStudy: {
      client: "Consumer Goods",
      result: "Redesigned distribution network across 3 continents",
      savings: "$22M logistics savings"
    },
    visual: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80"
  },
  {
    id: "performance",
    title: "Performance Management",
    icon: Gauge,
    tagline: "Measure. Manage. Improve.",
    description: "Create visibility and accountability that drives continuous improvement at every level.",
    capabilities: [
      { name: "KPI Framework Design", impact: "Clear line of sight" },
      { name: "Real-Time Dashboards", impact: "Instant visibility" },
      { name: "Performance Dialogues", impact: "Faster decisions" },
      { name: "Incentive Alignment", impact: "Behavior change" }
    ],
    caseStudy: {
      client: "Financial Services",
      result: "Implemented enterprise performance system for 5,000 employees",
      savings: "18% productivity increase"
    },
    visual: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
  }
];

const impactStats = [
  { value: "$500M+", label: "Value Delivered", icon: TrendingUp },
  { value: "200+", label: "Transformations", icon: Repeat },
  { value: "25%", label: "Avg. Efficiency Gain", icon: Zap },
  { value: "95%", label: "Client Satisfaction", icon: Target }
];

const principles = [
  {
    icon: Target,
    title: "Outcome-Focused",
    description: "Every initiative tied to measurable business impact"
  },
  {
    icon: Users,
    title: "People-Centric",
    description: "Sustainable change through engagement and capability building"
  },
  {
    icon: Lightbulb,
    title: "Pragmatic Innovation",
    description: "Right-sized solutions that fit your context and culture"
  },
  {
    icon: Activity,
    title: "Data-Driven",
    description: "Decisions grounded in facts, not assumptions"
  }
];

export default function OperationalExcellence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const gearsRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const horizontalInnerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("process");
  const [activePhase, setActivePhase] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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

    // Hero gears animation
    if (gearsRef.current) {
      const gears = gearsRef.current.querySelectorAll('.gear');
      gears.forEach((gear, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        const speed = 20 + (i * 5);
        gsap.to(gear, {
          rotation: direction * 360,
          duration: speed,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center"
        });
      });

      // Staggered gear entrance
      gsap.fromTo(gears,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, stagger: 0.1, ease: "back.out(1.7)", delay: 0.5 }
      );
    }

    // Hero text animation
    const heroTl = gsap.timeline({ delay: 0.3 });
    if (heroRef.current) {
      const badge = heroRef.current.querySelector('.hero-badge');
      const title = heroRef.current.querySelector('.hero-title');
      const subtitle = heroRef.current.querySelector('.hero-subtitle');
      const buttons = heroRef.current.querySelector('.hero-buttons');
      const metrics = heroRef.current.querySelector('.hero-metrics');

      heroTl
        .fromTo(badge, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" })
        .fromTo(title, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .fromTo(subtitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .fromTo(buttons, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2")
        .fromTo(metrics, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");
    }

    // Horizontal scroll for process section
    if (horizontalRef.current && horizontalInnerRef.current) {
      const scrollWidth = horizontalInnerRef.current.scrollWidth - window.innerWidth + 200;
      
      gsap.to(horizontalInnerRef.current, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const phase = Math.min(3, Math.floor(self.progress * 4));
            setActivePhase(phase);
          }
        }
      });
    }

    // Stats animation
    if (statsRef.current) {
      const statItems = statsRef.current.querySelectorAll('.stat-item');
      gsap.fromTo(statItems,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
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

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const currentArea = excellenceAreas.find(a => a.id === activeTab)!;

  return (
    <PageLayout>
      <SEO
        title="Operational Excellence | Aryo Consulting Group"
        description="Transform operations with process excellence, cost optimization, supply chain improvements, and performance management. 25%+ efficiency gains."
        canonical="https://aryocg.com/operational-excellence"
        jsonLd={[
          serviceSchema({ name: "Operational Excellence", description: "Transform operations with process excellence, cost optimization, supply chain improvements, and performance management.", url: "https://aryocg.com/operational-excellence" }),
          breadcrumbSchema([
            { name: "Home", url: "https://aryocg.com" },
            { name: "Capabilities", url: "https://aryocg.com/capabilities" },
            { name: "Operational Excellence", url: "https://aryocg.com/operational-excellence" },
          ]),
        ]}
      />
      <div ref={containerRef} className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
        
        {/* Hero - Mechanical/Gear Visualization */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center overflow-hidden"
          data-testid="section-hero"
        >
          {/* Dynamic Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]" />
          
          {/* Subtle Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />

          {/* Floating Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-[#47B5CB]/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute -bottom-20 right-1/4 w-[600px] h-[600px] bg-[#274D8E]/30 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#4EB9A7]/10 rounded-full blur-[100px]" />
          </div>

          {/* Animated Gears - Right Side */}
          <div ref={gearsRef} className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full pointer-events-none hidden lg:block">
            {/* Large Gear */}
            <div className="gear absolute right-[10%] top-[20%] w-64 h-64">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#47B5CB]/20">
                <path fill="currentColor" d="M50 10 L55 10 L56 5 L60 5 L60 10 L65 11 L68 6 L72 8 L70 13 L74 16 L79 13 L82 17 L77 21 L80 26 L85 25 L86 30 L81 32 L82 38 L87 40 L86 45 L81 45 L80 51 L85 54 L83 59 L78 57 L75 62 L79 67 L75 70 L71 66 L66 70 L68 75 L63 77 L60 73 L55 75 L55 80 L50 80 L50 75 L45 75 L42 80 L37 78 L39 73 L34 70 L30 74 L26 71 L30 66 L25 62 L21 66 L18 62 L22 58 L18 53 L13 55 L12 50 L17 48 L16 42 L11 41 L12 36 L17 37 L20 32 L16 28 L20 25 L25 29 L29 24 L26 19 L31 17 L35 22 L40 19 L39 14 L44 13 L45 18 L50 17 L50 10Z M50 30 A20 20 0 1 0 50 70 A20 20 0 1 0 50 30Z"/>
              </svg>
            </div>
            
            {/* Medium Gear */}
            <div className="gear absolute right-[35%] top-[45%] w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#4EB9A7]/25">
                <path fill="currentColor" d="M50 15 L54 15 L55 10 L60 11 L59 16 L64 18 L68 14 L72 18 L68 22 L71 27 L76 26 L78 31 L73 33 L74 38 L79 40 L78 45 L73 44 L72 50 L77 53 L74 58 L69 55 L65 60 L68 65 L64 68 L60 64 L55 67 L56 72 L51 73 L50 68 L45 68 L43 73 L38 72 L40 67 L35 64 L31 68 L27 65 L31 60 L27 55 L22 58 L20 53 L25 50 L24 45 L19 44 L20 39 L25 40 L27 35 L22 32 L25 27 L30 30 L34 25 L31 20 L36 18 L40 23 L45 20 L44 15 L49 15 L50 15Z M50 35 A15 15 0 1 0 50 65 A15 15 0 1 0 50 35Z"/>
              </svg>
            </div>
            
            {/* Small Gear */}
            <div className="gear absolute right-[20%] top-[65%] w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#274D8E]/30">
                <path fill="currentColor" d="M50 20 L53 20 L54 15 L59 16 L58 21 L62 23 L66 19 L70 23 L66 27 L68 32 L73 31 L74 36 L69 38 L69 43 L74 45 L73 50 L68 49 L66 54 L70 58 L66 62 L62 58 L58 61 L59 66 L54 67 L53 62 L48 62 L46 67 L41 66 L43 61 L38 58 L34 62 L30 58 L34 54 L32 49 L27 50 L26 45 L31 43 L31 38 L26 36 L27 31 L32 32 L34 27 L30 23 L34 19 L38 23 L42 21 L41 16 L46 15 L47 20 L50 20Z M50 38 A12 12 0 1 0 50 62 A12 12 0 1 0 50 38Z"/>
              </svg>
            </div>

            {/* Extra Small Gear */}
            <div className="gear absolute right-[45%] top-[30%] w-16 h-16">
              <svg viewBox="0 0 100 100" className="w-full h-full text-white/10">
                <path fill="currentColor" d="M50 25 L53 25 L54 20 L59 21 L58 26 L63 29 L67 25 L71 29 L67 33 L69 38 L74 37 L75 42 L70 44 L70 49 L75 51 L74 56 L69 55 L67 60 L71 64 L67 68 L63 64 L58 67 L59 72 L54 73 L53 68 L48 68 L46 73 L41 72 L43 67 L38 64 L34 68 L30 64 L34 60 L32 55 L27 56 L26 51 L31 49 L31 44 L26 42 L27 37 L32 38 L34 33 L30 29 L34 25 L38 29 L43 26 L42 21 L47 20 L48 25 L50 25Z M50 40 A10 10 0 1 0 50 60 A10 10 0 1 0 50 40Z"/>
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-2xl">
              <div className="hero-badge inline-flex items-center gap-2 bg-[#47B5CB]/10 backdrop-blur-sm border border-[#47B5CB]/30 rounded-full px-4 py-2 mb-6">
                <Cog className="w-4 h-4 text-[#47B5CB]" />
                <span className="text-[#47B5CB] text-sm font-medium tracking-wide">Precision Engineering</span>
              </div>

              <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6">
                <span className="block">Operational</span>
                <span className="block bg-gradient-to-r from-[#47B5CB] via-[#4EB9A7] to-[#47B5CB] bg-clip-text text-transparent">
                  Excellence
                </span>
              </h1>

              <p className="hero-subtitle text-lg md:text-xl text-white/60 max-w-xl mb-8 leading-relaxed">
                We find the <span className="text-white font-semibold">15-25% efficiency gains</span> hiding in plain sight 
                and help you capture them sustainably. Every process optimized. Every cost justified.
              </p>

              <div className="hero-buttons flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#47B5CB] to-[#4EB9A7] hover:from-[#3da5bb] hover:to-[#3fa997] text-white px-8 py-6 text-lg gap-2 group"
                    data-testid="button-oe-contact"
                  >
                    Start Optimization
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-lg backdrop-blur-sm gap-2"
                  onClick={() => {
                    const section = document.getElementById('process-section');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  data-testid="button-oe-explore"
                >
                  <Play className="w-5 h-5" />
                  See Our Process
                </Button>
              </div>

              {/* Hero Metrics */}
              <div className="hero-metrics grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                {[
                  { value: "25%", label: "Avg. Cost Reduction" },
                  { value: "3x", label: "Speed Improvement" },
                  { value: "200+", label: "Transformations" }
                ].map((stat, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs md:text-sm text-white/50">{stat.label}</p>
                  </div>
                ))}
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

        {/* Impact Stats - Glassmorphism Cards */}
        <section ref={statsRef} className="py-20 bg-gradient-to-b from-[#1e293b] to-[#0f172a] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-[#4EB9A7]/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/3 w-[300px] h-[300px] bg-[#47B5CB]/10 rounded-full blur-[80px]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={i} 
                    className="stat-item group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#47B5CB]/0 to-[#4EB9A7]/0 group-hover:from-[#47B5CB]/10 group-hover:to-[#4EB9A7]/10 transition-all duration-500" />
                    <div className="relative z-10">
                      <Icon className="w-8 h-8 text-[#47B5CB] mb-4" />
                      <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                      <p className="text-white/60 text-sm">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Horizontal Scroll - Process Phases */}
        <section 
          id="process-section"
          ref={horizontalRef} 
          className="relative bg-white dark:bg-gray-950"
          data-testid="section-process"
        >
          <div className="h-screen flex items-center overflow-hidden">
            <div ref={horizontalInnerRef} className="flex gap-8 px-20">
              {/* Intro Card */}
              <div className="flex-shrink-0 w-[400px] flex flex-col justify-center">
                <p className="text-[#47B5CB] font-medium tracking-widest uppercase mb-4">Our Process</p>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1a365d] dark:text-white mb-6">
                  Four Phases to
                  <span className="block text-[#47B5CB]">Lasting Excellence</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  A proven methodology refined over 200+ transformations, designed to deliver measurable results.
                </p>
                
                {/* Phase indicators */}
                <div className="flex gap-2 mt-8">
                  {processPhases.map((_, i) => (
                    <div 
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === activePhase ? 'w-12 bg-[#47B5CB]' : 'w-4 bg-gray-300 dark:bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Phase Cards */}
              {processPhases.map((phase, i) => (
                <div 
                  key={i}
                  className="flex-shrink-0 w-[500px] h-[600px] relative group"
                  data-testid={`card-phase-${i}`}
                >
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <img
                      src={phase.image}
                      alt={phase.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d] via-[#1a365d]/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d]/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="bg-[#47B5CB]/90 backdrop-blur-sm rounded-xl px-4 py-2 inline-flex items-center gap-2 w-fit mb-4">
                      <span className="text-white font-bold text-sm">Phase {phase.phase}</span>
                      <Clock className="w-4 h-4 text-white/80" />
                      <span className="text-white/80 text-sm">{phase.duration}</span>
                    </div>
                    
                    <h3 className="text-3xl font-display font-bold text-white mb-2">{phase.title}</h3>
                    <p className="text-[#47B5CB] font-medium mb-3">{phase.subtitle}</p>
                    <p className="text-white/70 mb-6">{phase.description}</p>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {phase.deliverables.map((item, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-white/60">
                          <CheckCircle2 className="w-4 h-4 text-[#4EB9A7]" />
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <p className="text-3xl font-bold text-white">{phase.stat.value}</p>
                      <p className="text-sm text-white/60">{phase.stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* End CTA */}
              <div className="flex-shrink-0 w-[400px] flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#47B5CB] to-[#4EB9A7] flex items-center justify-center mb-6">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1a365d] dark:text-white mb-4">
                  Ready to Transform?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Let's discuss your operational challenges and opportunities.
                </p>
                <Link href="/contact">
                  <Button className="bg-[#47B5CB] hover:bg-[#3da5bb] text-white" data-testid="button-horizontal-cta">
                    Start a Conversation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Excellence Areas - Interactive Tabs */}
        <section className="py-24 md:py-32 bg-[#f8fafc] dark:bg-gray-900" data-testid="section-excellence">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-section text-center mb-16">
              <p className="text-[#47B5CB] font-medium tracking-widest uppercase mb-4">Areas of Excellence</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a365d] dark:text-white mb-6">
                Where We <span className="text-[#47B5CB]">Drive Impact</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Four interconnected domains where operational excellence creates sustainable competitive advantage
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-section">
              <TabsList className="flex flex-wrap justify-center gap-4 bg-transparent h-auto mb-12">
                {excellenceAreas.map((area) => {
                  const Icon = area.icon;
                  const isActive = activeTab === area.id;
                  return (
                    <TabsTrigger
                      key={area.id}
                      value={area.id}
                      className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all ${
                        isActive 
                          ? 'bg-gradient-to-r from-[#47B5CB] to-[#4EB9A7] border-transparent text-white shadow-lg shadow-[#47B5CB]/25' 
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#47B5CB]'
                      }`}
                      data-testid={`tab-${area.id}`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#47B5CB]'}`} />
                      <span className="font-semibold">{area.title}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {excellenceAreas.map((area) => (
                <TabsContent key={area.id} value={area.id} className="mt-0">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content Side */}
                    <div>
                      <p className="text-[#47B5CB] font-medium mb-2">{area.tagline}</p>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-[#1a365d] dark:text-white mb-4">
                        {area.title}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        {area.description}
                      </p>

                      {/* Capabilities */}
                      <div className="space-y-4 mb-8">
                        {area.capabilities.map((cap, i) => (
                          <div 
                            key={i}
                            className="group flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-[#47B5CB] dark:hover:border-[#47B5CB]/50 transition-all hover:shadow-md"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-[#47B5CB]" />
                              <span className="font-medium text-[#1a365d] dark:text-white">{cap.name}</span>
                            </div>
                            <span className="text-sm text-[#47B5CB] font-medium">{cap.impact}</span>
                          </div>
                        ))}
                      </div>

                      {/* Case Study Preview */}
                      <div className="bg-gradient-to-r from-[#274D8E] to-[#1a365d] rounded-2xl p-6 text-white">
                        <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Case Highlight</p>
                        <p className="font-semibold mb-1">{area.caseStudy.client}</p>
                        <p className="text-white/80 text-sm mb-3">{area.caseStudy.result}</p>
                        <p className="text-[#4EB9A7] font-bold text-lg">{area.caseStudy.savings}</p>
                      </div>
                    </div>

                    {/* Visual Side with Transparency Effect */}
                    <div className="relative group">
                      <div className="aspect-square rounded-3xl overflow-hidden">
                        <img
                          src={area.visual}
                          alt={area.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Multi-layer transparency overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#47B5CB]/30 via-transparent to-[#4EB9A7]/20" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a365d]/50" />
                      </div>

                      {/* Floating Icon */}
                      <div className="absolute -top-6 -right-6 w-20 h-20 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex items-center justify-center">
                        <area.icon className="w-10 h-10 text-[#47B5CB]" />
                      </div>

                      {/* Floating Stat */}
                      <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Typical Result</p>
                        <p className="text-2xl font-bold text-[#1a365d] dark:text-white">{area.capabilities[0].impact}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Principles Section - Cards with Hover */}
        <section className="py-24 md:py-32 bg-white dark:bg-gray-950" data-testid="section-principles">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-section text-center mb-16">
              <p className="text-[#47B5CB] font-medium tracking-widest uppercase mb-4">Our Philosophy</p>
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
                    className="group relative p-8 border-gray-100 dark:border-gray-800 hover:border-[#47B5CB] dark:hover:border-[#47B5CB]/50 transition-all duration-500 overflow-visible bg-white dark:bg-gray-900"
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    data-testid={`card-principle-${i}`}
                  >
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-[#47B5CB]/0 to-[#4EB9A7]/0 transition-all duration-500 ${
                      hoveredCard === i ? 'from-[#47B5CB]/5 to-[#4EB9A7]/10' : ''
                    }`} />
                    
                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${
                        hoveredCard === i 
                          ? 'bg-gradient-to-br from-[#47B5CB] to-[#4EB9A7] scale-110' 
                          : 'bg-[#47B5CB]/10'
                      }`}>
                        <Icon className={`w-7 h-7 transition-colors ${
                          hoveredCard === i ? 'text-white' : 'text-[#47B5CB]'
                        }`} />
                      </div>
                      
                      <h3 className="text-xl font-display font-bold text-[#1a365d] dark:text-white mb-3">
                        {principle.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {principle.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-24 md:py-32 bg-[#1a365d] relative overflow-hidden" data-testid="section-comparison">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4EB9A7]/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#47B5CB]/10 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="animate-section grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#4EB9A7] font-medium tracking-widest uppercase mb-4">Why Aryo</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-8">
                  Not Just Consultants.
                  <span className="block text-[#47B5CB]">Transformation Partners.</span>
                </h2>
                <p className="text-lg text-white/70 mb-8">
                  We don't just recommend. We roll up our sleeves, work alongside your teams, 
                  and stay until the value is delivered and sustained.
                </p>

                <div className="space-y-6">
                  {[
                    { label: "Traditional Consulting", ours: "Hands-on partnership", theirs: "Slide decks and recommendations" },
                    { label: "Implementation", ours: "We stay until it works", theirs: "Handoff after strategy" },
                    { label: "Knowledge Transfer", ours: "Build your capabilities", theirs: "Create dependency" },
                    { label: "Measurement", ours: "Tied to your P&L impact", theirs: "Activity-based metrics" }
                  ].map((item, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4 items-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <div className="text-white/60 text-sm">{item.label}</div>
                      <div className="text-[#4EB9A7] font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        {item.ours}
                      </div>
                      <div className="text-white/40 text-sm">{item.theirs}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d]/80 via-[#1a365d]/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#47B5CB]/20 to-transparent" />
                </div>

                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <p className="text-white font-bold text-lg mb-2">"They became part of our team"</p>
                  <p className="text-white/60 text-sm">— COO, Fortune 500 Manufacturer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-gradient-to-br from-[#274D8E] via-[#1a365d] to-[#0f172a] relative overflow-hidden" data-testid="section-cta">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-[150px]" />
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="animate-section">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
                <Zap className="w-4 h-4 text-white" />
                <span className="text-white/90 text-sm font-medium">25% Efficiency Gains Guaranteed</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                Ready to Unlock Your
                <br />
                Operational Potential?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Every day of inefficiency is money left on the table. Let's start capturing it.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-[#47B5CB] text-white hover:bg-[#3da5bb] px-8 py-6 text-lg gap-2"
                    data-testid="button-cta-contact"
                  >
                    Schedule Assessment
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
                    View Case Studies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <FAQSection faqs={[
          { question: "What is operational excellence consulting?", answer: "Operational excellence consulting focuses on optimizing business processes, reducing waste, improving quality, and building sustainable performance management systems that drive continuous improvement." },
          { question: "How does Aryo measure operational improvement?", answer: "We establish baseline KPIs at engagement start and track improvements across cost reduction, cycle time, quality metrics, employee productivity, and customer satisfaction scores." },
          { question: "What methodologies does Aryo use for operational excellence?", answer: "We blend Lean, Six Sigma, and Agile principles with modern data analytics to create customized improvement frameworks tailored to each client's industry and maturity level." },
          { question: "Can operational excellence work alongside digital transformation?", answer: "Absolutely. We often combine operational excellence with digital transformation to ensure process improvements are sustained through technology enablement and automation." },
        ]} />
      </div>
    </PageLayout>
  );
}
