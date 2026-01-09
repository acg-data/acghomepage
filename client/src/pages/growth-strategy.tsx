import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEO } from "@/components/seo";
import { PageLayout } from "@/components/layout";
import { PortfolioFlipbook } from "@/components/portfolio-flipbook";
import {
  ArrowRight,
  TrendingUp,
  Target,
  Rocket,
  BarChart3,
  Globe,
  Layers,
  Zap,
  Users,
  DollarSign,
  LineChart,
  PieChart,
  Building2,
  Briefcase,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Quote,
  Calendar,
  MapPin,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Strategic Horizons data for tabs
const horizons = [
  {
    id: "market-expansion",
    title: "Market Expansion",
    icon: Globe,
    description: "Enter new markets and geographies with confidence",
    plays: [
      {
        title: "Geographic Entry Strategy",
        description: "Data-driven market selection and entry mode optimization",
        metrics: ["+340%", "Revenue Growth"],
        tags: ["International", "Market Entry"],
      },
      {
        title: "Channel Diversification",
        description: "Multi-channel go-to-market strategies for maximum reach",
        metrics: ["4.2x", "Market Reach"],
        tags: ["Omnichannel", "Distribution"],
      },
      {
        title: "Partnership Ecosystems",
        description: "Strategic alliances that accelerate market penetration",
        metrics: ["67%", "Faster Entry"],
        tags: ["Alliances", "Partnerships"],
      },
    ],
  },
  {
    id: "revenue-acceleration",
    title: "Revenue Acceleration",
    icon: TrendingUp,
    description: "Unlock new revenue streams and optimize existing ones",
    plays: [
      {
        title: "Pricing Excellence",
        description: "Value-based pricing strategies that capture full value",
        metrics: ["+18%", "Margin Lift"],
        tags: ["Pricing", "Optimization"],
      },
      {
        title: "Sales Transformation",
        description: "High-performance sales models and enablement",
        metrics: ["2.8x", "Win Rate"],
        tags: ["Sales", "Performance"],
      },
      {
        title: "Recurring Revenue Models",
        description: "Subscription and recurring revenue architecture",
        metrics: ["89%", "Revenue Predictability"],
        tags: ["SaaS", "Subscriptions"],
      },
    ],
  },
  {
    id: "product-innovation",
    title: "Product Innovation",
    icon: Rocket,
    description: "Create breakthrough products that define markets",
    plays: [
      {
        title: "Product-Market Fit",
        description: "Rapid validation and iteration to find winning formulas",
        metrics: ["3.5x", "Success Rate"],
        tags: ["PMF", "Validation"],
      },
      {
        title: "Portfolio Optimization",
        description: "Strategic product mix for maximum growth and margin",
        metrics: ["+45%", "Portfolio ROI"],
        tags: ["Portfolio", "Strategy"],
      },
      {
        title: "Innovation Pipeline",
        description: "Systematic innovation from ideation to launch",
        metrics: ["6mo", "Faster TTM"],
        tags: ["R&D", "Innovation"],
      },
    ],
  },
  {
    id: "digital-growth",
    title: "Digital Growth",
    icon: Zap,
    description: "Leverage digital channels for exponential growth",
    plays: [
      {
        title: "Digital Customer Acquisition",
        description: "Scalable digital marketing and growth engines",
        metrics: ["-62%", "CAC Reduction"],
        tags: ["Marketing", "Digital"],
      },
      {
        title: "Platform Business Models",
        description: "Network effects and platform strategies",
        metrics: ["10x", "Value Creation"],
        tags: ["Platforms", "Networks"],
      },
      {
        title: "Data Monetization",
        description: "Turn data assets into revenue streams",
        metrics: ["$12M+", "New Revenue"],
        tags: ["Data", "Monetization"],
      },
    ],
  },
];

// Investment thesis items
const investmentThesis = [
  {
    id: "market-timing",
    icon: Target,
    title: "Market Timing & Selection",
    description: "Identify the right markets at the right time with rigorous opportunity sizing and competitive analysis.",
    points: [
      "Total addressable market quantification",
      "Competitive intensity mapping",
      "Timing indicators and market readiness",
      "Entry barrier analysis",
    ],
  },
  {
    id: "growth-levers",
    icon: Layers,
    title: "Growth Lever Identification",
    description: "Discover and prioritize the highest-impact growth opportunities across your business.",
    points: [
      "Revenue driver decomposition",
      "Customer segment profitability",
      "Pricing power assessment",
      "Operational leverage potential",
    ],
  },
  {
    id: "execution-roadmap",
    icon: BarChart3,
    title: "Execution Roadmap",
    description: "Translate strategy into actionable plans with clear milestones and accountability.",
    points: [
      "90-day sprint planning",
      "Resource allocation modeling",
      "Risk mitigation frameworks",
      "Performance tracking systems",
    ],
  },
  {
    id: "value-creation",
    icon: DollarSign,
    title: "Value Creation Plan",
    description: "Build a comprehensive roadmap for sustainable value creation and stakeholder returns.",
    points: [
      "Financial modeling and scenarios",
      "Value bridge construction",
      "Investment prioritization",
      "Exit readiness planning",
    ],
  },
];

// Portfolio wins / case studies
const portfolioWins = [
  {
    id: 1,
    company: "TechScale Inc.",
    industry: "Enterprise Software",
    challenge: "Stagnant growth in saturated domestic market",
    solution: "International expansion strategy with localized go-to-market",
    results: [
      { value: "340%", label: "Revenue Growth" },
      { value: "12", label: "New Markets" },
      { value: "18mo", label: "Payback Period" },
    ],
    quote: "Aryo's growth framework transformed our international strategy from aspiration to reality.",
    author: "CEO, TechScale Inc.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
  },
  {
    id: 2,
    company: "HealthFirst Networks",
    industry: "Healthcare Services",
    challenge: "Needed to diversify revenue beyond core services",
    solution: "New service line development and pricing optimization",
    results: [
      { value: "$45M", label: "New Revenue" },
      { value: "28%", label: "Margin Improvement" },
      { value: "3", label: "New Service Lines" },
    ],
    quote: "The team helped us see opportunities we'd overlooked for years.",
    author: "COO, HealthFirst Networks",
    year: "2024",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
  },
  {
    id: 3,
    company: "GreenEnergy Solutions",
    industry: "Clean Technology",
    challenge: "Scaling from startup to market leader",
    solution: "Platform business model and ecosystem development",
    results: [
      { value: "10x", label: "Valuation Increase" },
      { value: "500+", label: "Platform Partners" },
      { value: "#1", label: "Market Position" },
    ],
    quote: "They didn't just help us grow—they helped us become the category leader.",
    author: "Founder, GreenEnergy Solutions",
    year: "2023",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    id: 4,
    company: "RetailNext Corp",
    industry: "Consumer Retail",
    challenge: "E-commerce disruption threatening core business",
    solution: "Omnichannel transformation and digital growth engine",
    results: [
      { value: "156%", label: "Digital Revenue" },
      { value: "-42%", label: "Customer Acquisition Cost" },
      { value: "4.8x", label: "LTV:CAC Ratio" },
    ],
    quote: "Aryo helped us turn digital disruption into our competitive advantage.",
    author: "Chief Growth Officer, RetailNext",
    year: "2023",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
  },
];

// Momentum metrics
const momentumMetrics = [
  { value: 340, suffix: "%", label: "Average Revenue Growth", prefix: "+" },
  { value: 2.8, suffix: "x", label: "Return on Strategy Investment", prefix: "" },
  { value: 150, suffix: "+", label: "Growth Initiatives Launched", prefix: "" },
  { value: 18, suffix: "mo", label: "Average Payback Period", prefix: "" },
];

// Animated counter component
function AnimatedCounter({ 
  value, 
  suffix = "", 
  prefix = "",
  duration = 2000 
}: { 
  value: number; 
  suffix?: string; 
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(value * easeOut);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  const displayValue = Number.isInteger(value) ? Math.round(count) : count.toFixed(1);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export default function GrowthStrategy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const helixRef = useRef<HTMLDivElement>(null);
  const momentumRef = useRef<HTMLDivElement>(null);
  const momentumCardsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeHorizon, setActiveHorizon] = useState("market-expansion");
  const [activeWin, setActiveWin] = useState(0);

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

    // Helix animation - ascending light columns
    if (helixRef.current) {
      const columns = helixRef.current.querySelectorAll('.helix-column');
      const particles = helixRef.current.querySelectorAll('.helix-particle');
      const dataStreams = helixRef.current.querySelectorAll('.data-stream');

      // Animate columns rising
      gsap.fromTo(columns,
        { scaleY: 0, opacity: 0 },
        { 
          scaleY: 1, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.08, 
          ease: "power3.out",
          delay: 0.3
        }
      );

      // Continuous upward motion for particles
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: "-100vh",
          duration: 3 + (i * 0.5),
          repeat: -1,
          ease: "none",
          delay: i * 0.2
        });
      });

      // Data streams animation
      dataStreams.forEach((stream, i) => {
        gsap.fromTo(stream,
          { opacity: 0, y: 50 },
          { 
            opacity: 0.6, 
            y: 0, 
            duration: 0.8, 
            delay: 1 + (i * 0.1),
            ease: "power2.out"
          }
        );
        
        // Subtle floating
        gsap.to(stream, {
          y: "-=20",
          duration: 4 + (i * 0.5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5
        });
      });
    }

    // Hero text animation
    const heroTl = gsap.timeline({ delay: 0.5 });
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

    // Vertical staggered reveal for momentum section
    if (momentumRef.current && momentumCardsRef.current) {
      const cards = momentumCardsRef.current.querySelectorAll('.momentum-card');
      
      // Staggered reveal animation on scroll
      gsap.fromTo(cards,
        { 
          opacity: 0, 
          y: 80,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: momentumRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Timeline sticky reveal
    if (timelineRef.current) {
      const scrollDistance = window.innerHeight * 2.5;
      
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: 0.3,
        onUpdate: (self) => {
          const numSteps = portfolioWins.length;
          const step = Math.min(numSteps - 1, Math.floor(self.progress * numSteps));
          setActiveWin(step);
        }
      });
    }

    // Animate sections on scroll
    const sections = containerRef.current?.querySelectorAll(".animate-section");
    sections?.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <PageLayout>
      <SEO 
        title="Growth Strategy | Aryo Consulting Group"
        description="Accelerate growth with data-driven strategies for market expansion, revenue optimization, and sustainable value creation."
        canonical="/growth-strategy"
      />
      
      <div ref={containerRef} className="min-h-screen bg-background">
        {/* Hero Section - Ascendant Helix */}
        <section 
          ref={heroRef}
          className="relative min-h-screen flex items-center overflow-hidden bg-[#274D8E]"
          data-testid="section-hero"
        >
          {/* Animated Helix Background */}
          <div ref={helixRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Parallax city silhouette */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#274D8E]/90 to-transparent opacity-60" />
            
            {/* Light columns - helix structure */}
            <div className="absolute inset-0 flex justify-around items-end px-20">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="helix-column relative"
                  style={{
                    height: `${40 + (i % 3) * 20}%`,
                    transformOrigin: 'bottom',
                  }}
                >
                  {/* Main column */}
                  <div 
                    className="w-1 h-full rounded-full"
                    style={{
                      background: `linear-gradient(to top, ${i % 2 === 0 ? '#47B5CB' : '#4EB9A7'}20, ${i % 2 === 0 ? '#47B5CB' : '#4EB9A7'}60, transparent)`,
                    }}
                  />
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 w-8 -left-3.5 rounded-full blur-xl"
                    style={{
                      background: `linear-gradient(to top, transparent, ${i % 2 === 0 ? '#47B5CB' : '#4EB9A7'}30, transparent)`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="helix-particle absolute w-1 h-1 rounded-full bg-[#47B5CB]"
                style={{
                  left: `${10 + (i * 4)}%`,
                  bottom: '-10%',
                  opacity: 0.3 + (Math.random() * 0.4),
                }}
              />
            ))}

            {/* Data streams - floating metrics */}
            <div className="absolute top-1/4 left-10 data-stream">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2">
                <span className="text-[#4EB9A7] text-sm font-mono">+127% YoY</span>
              </div>
            </div>
            <div className="absolute top-1/3 right-20 data-stream">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2">
                <span className="text-[#47B5CB] text-sm font-mono">$2.4B Value</span>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/4 data-stream">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2">
                <span className="text-white/70 text-sm font-mono">12 Markets</span>
              </div>
            </div>
            <div className="absolute bottom-1/3 right-1/4 data-stream">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2">
                <span className="text-[#4EB9A7] text-sm font-mono">3.2x ROIC</span>
              </div>
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#274D8E]/80 via-transparent to-[#274D8E]/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#274D8E]/95 via-transparent to-[#274D8E]/40" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full pl-8 md:pl-16 lg:pl-24 xl:pl-32 pr-6 py-32">
            <div className="max-w-2xl">
              <div className="hero-badge inline-flex items-center gap-2 bg-[#47B5CB]/20 border border-[#47B5CB]/30 rounded-full px-4 py-2 mb-6">
                <TrendingUp className="w-4 h-4 text-[#47B5CB]" />
                <span className="text-[#47B5CB] text-sm font-medium">Growth Strategy</span>
              </div>

              <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
                Accelerate Your
                <span className="block bg-gradient-to-r from-[#47B5CB] to-[#4EB9A7] bg-clip-text text-transparent">
                  Growth Trajectory
                </span>
              </h1>

              <p className="hero-subtitle text-xl text-white/70 mb-8 max-w-2xl leading-relaxed">
                Data-driven strategies that unlock new markets, optimize revenue streams, 
                and create sustainable competitive advantage. We don't just plan growth—we engineer it.
              </p>

              <div className="hero-buttons flex flex-wrap gap-4 mb-12">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#47B5CB] hover:bg-[#3da5bb] text-white" data-testid="button-hero-contact">
                    Start Growing
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white/30 text-white backdrop-blur-sm" data-testid="button-hero-learn">
                  View Case Studies
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Quick metrics */}
              <div className="hero-metrics grid grid-cols-3 gap-6">
                {[
                  { value: "340%", label: "Avg Revenue Growth" },
                  { value: "2.8x", label: "Strategy ROI" },
                  { value: "150+", label: "Growth Initiatives" },
                ].map((metric, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-white">{metric.value}</p>
                    <p className="text-sm text-white/50">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Horizons - Tabs Section */}
        <section className="py-24 md:py-32 bg-gray-50 dark:bg-gray-900 animate-section" data-testid="section-horizons">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[#47B5CB] font-medium tracking-widest uppercase mb-4">Strategic Horizons</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                Four Paths to
                <span className="text-[#274D8E] dark:text-[#47B5CB]"> Accelerated Growth</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Every organization has unique growth opportunities. We help you identify, prioritize, 
                and execute the strategies that will drive the most value.
              </p>
            </div>

            <Tabs value={activeHorizon} onValueChange={setActiveHorizon} className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-12">
                {horizons.map((horizon) => {
                  const Icon = horizon.icon;
                  return (
                    <TabsTrigger
                      key={horizon.id}
                      value={horizon.id}
                      className="flex items-center gap-2 px-6 py-3 rounded-full data-[state=active]:bg-[#274D8E] data-[state=active]:text-white border border-transparent data-[state=inactive]:border-border data-[state=inactive]:bg-background"
                      data-testid={`tab-${horizon.id}`}
                    >
                      <Icon className="w-4 h-4" />
                      {horizon.title}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <AnimatePresence mode="wait">
                {horizons.map((horizon) => (
                  <TabsContent key={horizon.id} value={horizon.id} className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center mb-10">
                        <p className="text-lg text-muted-foreground">{horizon.description}</p>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        {horizon.plays.map((play, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Card className="h-full group hover-elevate" data-testid={`card-play-${horizon.id}-${i}`}>
                              <CardContent className="p-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {play.tags.map((tag, j) => (
                                    <Badge key={j} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                
                                <h3 className="text-xl font-display font-semibold mb-3 text-foreground group-hover:text-[#274D8E] dark:group-hover:text-[#47B5CB] transition-colors">
                                  {play.title}
                                </h3>
                                
                                <p className="text-muted-foreground mb-6">
                                  {play.description}
                                </p>

                                <div className="flex items-end justify-between mt-auto pt-4 border-t border-border">
                                  <div>
                                    <p className="text-3xl font-bold text-[#274D8E] dark:text-[#47B5CB]">
                                      {play.metrics[0]}
                                    </p>
                                    <p className="text-sm text-muted-foreground">{play.metrics[1]}</p>
                                  </div>
                                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-[#47B5CB] transition-colors" />
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </TabsContent>
                ))}
              </AnimatePresence>
            </Tabs>
          </div>
        </section>

        {/* Portfolio of Work */}
        <PortfolioFlipbook />

        {/* Momentum Metrics - Staggered Reveal */}
        <section 
          ref={momentumRef}
          className="relative py-24 md:py-32 bg-[#274D8E] overflow-hidden"
          data-testid="section-momentum"
        >
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#47B5CB]/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#4EB9A7]/10 rounded-full blur-[120px]" />
            {/* Decorative circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              <p className="text-[#4EB9A7] font-medium tracking-widest uppercase mb-4">Momentum Metrics</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Results That
                <span className="block text-[#47B5CB]">Speak Volumes</span>
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Our track record demonstrates the power of strategic growth initiatives 
                executed with precision and purpose.
              </p>
            </div>

            {/* Metric Cards Grid */}
            <div ref={momentumCardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {momentumMetrics.map((metric, i) => (
                <div 
                  key={i}
                  className="momentum-card"
                  data-testid={`card-metric-${i}`}
                >
                  <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center relative overflow-hidden group hover:from-white/20 hover:to-white/10 transition-all duration-300 h-full">
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#47B5CB] via-[#4EB9A7] to-[#47B5CB]" />
                    
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#47B5CB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <p className="text-5xl md:text-6xl font-bold text-white mb-3">
                        <AnimatedCounter value={metric.value} suffix={metric.suffix} prefix={metric.prefix} />
                      </p>
                      <p className="text-base text-white/60">{metric.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Image row with transparency */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="relative h-64 rounded-2xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                  alt="Growth analytics"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#274D8E] via-[#274D8E]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-display font-semibold text-xl mb-1">Data-Driven Insights</p>
                  <p className="text-white/60 text-sm">Every strategy backed by rigorous analysis</p>
                </div>
              </div>

              <div className="relative h-64 rounded-2xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
                  alt="Strategic planning"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#274D8E] via-[#274D8E]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-display font-semibold text-xl mb-1">Collaborative Execution</p>
                  <p className="text-white/60 text-sm">Working alongside your team for lasting results</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link href="/contact">
                <Button size="lg" className="bg-[#47B5CB] hover:bg-[#3da5bb] text-white" data-testid="button-momentum-cta">
                  Start Your Growth Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Investment Thesis Builder - Accordion */}
        <section className="py-24 md:py-32 bg-white dark:bg-gray-950 animate-section" data-testid="section-thesis">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="lg:sticky lg:top-32">
                <p className="text-[#47B5CB] font-medium tracking-widest uppercase mb-4">Investment Thesis</p>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                  Build Your
                  <span className="text-[#274D8E] dark:text-[#47B5CB]"> Growth Blueprint</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Our systematic approach ensures every growth initiative is grounded in 
                  rigorous analysis and designed for sustainable value creation.
                </p>

                {/* Glassmorphism stat card */}
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#274D8E]/10 to-[#47B5CB]/10 dark:from-[#274D8E]/20 dark:to-[#47B5CB]/20 backdrop-blur-sm border border-[#47B5CB]/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-4xl font-bold text-[#274D8E] dark:text-[#47B5CB]">94%</p>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-[#274D8E] dark:text-[#47B5CB]">18mo</p>
                      <p className="text-sm text-muted-foreground">Avg. Payback</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Accordion type="single" collapsible className="space-y-4">
                  {investmentThesis.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <AccordionItem 
                        key={item.id} 
                        value={item.id}
                        className="border border-border rounded-xl overflow-hidden bg-card"
                        data-testid={`accordion-${item.id}`}
                      >
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 [&[data-state=open]]:bg-muted/50">
                          <div className="flex items-center gap-4 text-left">
                            <div className="w-12 h-12 rounded-xl bg-[#274D8E]/10 dark:bg-[#47B5CB]/20 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-[#274D8E] dark:text-[#47B5CB]" />
                            </div>
                            <div>
                              <p className="font-display font-semibold text-foreground">{item.title}</p>
                              <p className="text-sm text-muted-foreground hidden sm:block">{item.description}</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="pl-16">
                            <ul className="space-y-3">
                              {item.points.map((point, j) => (
                                <li key={j} className="flex items-start gap-3">
                                  <CheckCircle2 className="w-5 h-5 text-[#4EB9A7] flex-shrink-0 mt-0.5" />
                                  <span className="text-muted-foreground">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Wins - Vertical Sticky Timeline */}
        <section 
          ref={timelineRef}
          className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-screen"
          data-testid="section-portfolio"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-[#47B5CB]/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] bg-[#4EB9A7]/5 rounded-full blur-[120px]" />
          </div>

          <div className="h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left - Title and navigation */}
                <div>
                  <p className="text-[#47B5CB] font-medium tracking-widest uppercase mb-4">Portfolio Wins</p>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                    Success Stories That
                    <span className="text-[#274D8E] dark:text-[#47B5CB]"> Inspire Growth</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-10">
                    See how we've helped companies across industries achieve breakthrough growth results.
                  </p>

                  {/* Timeline progress */}
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border">
                      <div 
                        className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#47B5CB] to-[#4EB9A7] transition-all duration-500"
                        style={{ height: `${((activeWin + 1) / portfolioWins.length) * 100}%` }}
                      />
                    </div>

                    <div className="space-y-6">
                      {portfolioWins.map((win, i) => (
                        <button
                          key={win.id}
                          onClick={() => setActiveWin(i)}
                          className={`flex items-start gap-4 text-left w-full transition-all duration-300 ${
                            i === activeWin ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                          }`}
                          data-testid={`button-win-${i}`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            i <= activeWin 
                              ? 'bg-gradient-to-br from-[#47B5CB] to-[#4EB9A7]' 
                              : 'bg-muted border-2 border-border'
                          }`}>
                            {i <= activeWin ? (
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            ) : (
                              <span className="text-sm text-muted-foreground">{i + 1}</span>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{win.company}</p>
                            <p className="text-sm text-muted-foreground">{win.industry}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right - Case study cards */}
                <div className="relative h-[550px]">
                  {portfolioWins.map((win, i) => {
                    const isActive = i === activeWin;
                    const isPast = i < activeWin;
                    
                    return (
                      <div
                        key={win.id}
                        className={`absolute inset-0 transition-all duration-700 ease-out ${
                          isActive 
                            ? 'opacity-100 scale-100 translate-y-0 z-30' 
                            : isPast 
                              ? 'opacity-0 scale-95 -translate-y-8 z-10' 
                              : 'opacity-0 scale-90 translate-y-12 z-20'
                        }`}
                        data-testid={`card-win-${i}`}
                      >
                        <Card className="h-full overflow-hidden">
                          <div className="relative h-48">
                            <img 
                              src={win.image}
                              alt={win.company}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                            <div className="absolute bottom-4 left-6">
                              <Badge variant="secondary" className="mb-2">{win.industry}</Badge>
                              <h3 className="text-2xl font-display font-bold text-foreground">{win.company}</h3>
                            </div>
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-[#274D8E] text-white">{win.year}</Badge>
                            </div>
                          </div>

                          <CardContent className="p-6">
                            <div className="mb-6">
                              <p className="text-sm text-muted-foreground mb-1">Challenge</p>
                              <p className="text-foreground">{win.challenge}</p>
                            </div>

                            <div className="mb-6">
                              <p className="text-sm text-muted-foreground mb-1">Solution</p>
                              <p className="text-foreground">{win.solution}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-6">
                              {win.results.map((result, j) => (
                                <div key={j} className="text-center p-3 rounded-lg bg-muted/50">
                                  <p className="text-xl font-bold text-[#274D8E] dark:text-[#47B5CB]">{result.value}</p>
                                  <p className="text-xs text-muted-foreground">{result.label}</p>
                                </div>
                              ))}
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#274D8E]/5 dark:bg-[#47B5CB]/10">
                              <Quote className="w-5 h-5 text-[#47B5CB] flex-shrink-0 mt-1" />
                              <div>
                                <p className="text-sm italic text-foreground mb-2">"{win.quote}"</p>
                                <p className="text-xs text-muted-foreground">{win.author}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-24 md:py-32 bg-[#274D8E] relative overflow-hidden animate-section" data-testid="section-cta">
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#47B5CB]/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#4EB9A7]/10 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-[#4EB9A7]" />
              <span className="text-white/80 text-sm">Ready to grow?</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Your Growth Journey
              <span className="block text-[#47B5CB]">Starts Here</span>
            </h2>

            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Every market leader was once an emerging player. Let's chart your path to 
              category leadership together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/contact">
                <Button size="lg" className="bg-[#47B5CB] hover:bg-[#3da5bb] text-white w-full sm:w-auto" data-testid="button-cta-contact">
                  Schedule a Growth Session
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button size="lg" variant="outline" className="border-white/30 text-white backdrop-blur-sm w-full sm:w-auto" data-testid="button-cta-cases">
                  Explore Case Studies
                </Button>
              </Link>
            </div>

            {/* Glassmorphism card */}
            <div className="inline-block p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-8 flex-wrap justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">$2.4B+</p>
                  <p className="text-sm text-white/50">Value Created</p>
                </div>
                <div className="w-px h-12 bg-white/20 hidden sm:block" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">150+</p>
                  <p className="text-sm text-white/50">Growth Initiatives</p>
                </div>
                <div className="w-px h-12 bg-white/20 hidden sm:block" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">94%</p>
                  <p className="text-sm text-white/50">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
