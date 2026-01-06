import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, TrendingUp, Target, DollarSign, GitBranch, Handshake, ChevronRight } from "lucide-react";
import { SEO } from "@/components/seo";
import { Footer } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const heroContent = {
  title: "Growth Strategy",
  tagline: "Accelerating Market Success",
  body: "We help you find and capture your next $100M opportunity — then we help you build the capabilities to repeat it.",
  chips: ["Market Assessment", "Growth Roadmap", "Capability Building"],
};

const subServices = [
  {
    id: 1,
    title: "Market Entry Strategy",
    description: "Navigate new markets with confidence. We analyze competitive dynamics, customer needs, and regulatory landscapes to build your go-to-market blueprint.",
    icon: Target,
    deliverables: [
      "Market sizing and segmentation analysis",
      "Competitive positioning framework",
      "Go-to-market playbook with timeline",
    ],
    signal: "timeline",
  },
  {
    id: 2,
    title: "Revenue Acceleration",
    description: "Unlock hidden revenue potential in your existing business. We identify high-impact levers and build execution plans that deliver results in quarters, not years.",
    icon: TrendingUp,
    deliverables: [
      "Revenue driver diagnostic",
      "Quick-win opportunity roadmap",
      "Sales enablement toolkit",
    ],
    signal: "bars",
  },
  {
    id: 3,
    title: "Pricing Optimization",
    description: "Capture the value you create. We develop pricing strategies that align with customer willingness-to-pay while protecting competitive position.",
    icon: DollarSign,
    deliverables: [
      "Price elasticity analysis",
      "Value-based pricing framework",
      "Implementation and change management plan",
    ],
    signal: "meter",
  },
  {
    id: 4,
    title: "Channel Strategy",
    description: "Reach customers where they are. We design multi-channel strategies that maximize reach, optimize costs, and create seamless customer experiences.",
    icon: GitBranch,
    deliverables: [
      "Channel performance assessment",
      "Omnichannel integration blueprint",
      "Partner enablement framework",
    ],
    signal: "network",
  },
  {
    id: 5,
    title: "Partnership Development",
    description: "Grow through strategic alliances. We identify, evaluate, and structure partnerships that accelerate growth and create sustainable competitive advantages.",
    icon: Handshake,
    deliverables: [
      "Partnership opportunity scan",
      "Deal structure and terms framework",
      "Integration and governance playbook",
    ],
    signal: "handshake",
  },
];

const outcomeMetrics = [
  { label: "Time-to-market impact", description: "Faster market penetration" },
  { label: "Conversion / pipeline efficiency", description: "Higher win rates" },
  { label: "Margin / unit economics clarity", description: "Improved profitability" },
];

const nextSteps = [
  "30-minute discovery call to understand your goals",
  "Preliminary assessment of growth opportunities",
  "Tailored proposal with approach and timeline",
];

export default function GrowthStrategy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setScrollProgress(self.progress * 100);
      },
    });

    const scenes = container.querySelectorAll(".scene-card");
    
    scenes.forEach((scene, index) => {
      const card = scene.querySelector(".card-inner");
      const headline = scene.querySelector(".card-headline");
      const bullets = scene.querySelectorAll(".card-bullet");
      const signal = scene.querySelector(".card-signal");

      if (prefersReducedMotion) {
        gsap.set([card, headline, bullets, signal], { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      tl.fromTo(
        card,
        {
          y: 100,
          rotateX: 15,
          rotateZ: -2,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          rotateX: 0,
          rotateZ: 0,
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
        }
      );

      if (headline) {
        tl.fromTo(
          headline,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.15 },
          "-=0.1"
        );
      }

      if (bullets.length > 0) {
        tl.fromTo(
          bullets,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.05, duration: 0.15 },
          "-=0.05"
        );
      }

      if (signal) {
        tl.fromTo(
          signal,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.2, transformOrigin: "left center" },
          "-=0.1"
        );
      }

      tl.to({}, { duration: 0.3 });

      if (index < scenes.length - 1) {
        tl.to(
          card,
          {
            y: -50,
            x: 30,
            scale: 0.9,
            opacity: 0,
            rotateZ: 2,
            duration: 0.25,
            ease: "power2.in",
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [prefersReducedMotion]);

  const SignalElement = ({ type }: { type: string }) => {
    switch (type) {
      case "timeline":
        return (
          <div className="card-signal flex items-center gap-2 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${i <= 2 ? "bg-[#4EB9A7]" : "bg-gray-300"}`} />
                {i < 4 && <div className={`w-8 h-0.5 ${i < 2 ? "bg-[#4EB9A7]" : "bg-gray-300"}`} />}
              </div>
            ))}
          </div>
        );
      case "bars":
        return (
          <div className="card-signal flex items-end gap-1.5 mt-6 h-8">
            {[40, 60, 45, 80, 70, 90].map((h, i) => (
              <div
                key={i}
                className="w-3 bg-gradient-to-t from-[#274D8E] to-[#47B5CB] rounded-t"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        );
      case "meter":
        return (
          <div className="card-signal mt-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-[#274D8E] via-[#47B5CB] to-[#4EB9A7] rounded-full" />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Current</span>
              <span>Optimized</span>
            </div>
          </div>
        );
      case "network":
        return (
          <div className="card-signal mt-6 flex justify-center">
            <svg width="120" height="40" viewBox="0 0 120 40" className="text-[#47B5CB]">
              <circle cx="20" cy="20" r="6" fill="currentColor" opacity="0.8" />
              <circle cx="60" cy="10" r="4" fill="currentColor" opacity="0.6" />
              <circle cx="60" cy="30" r="4" fill="currentColor" opacity="0.6" />
              <circle cx="100" cy="20" r="6" fill="currentColor" opacity="0.8" />
              <line x1="26" y1="20" x2="56" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
              <line x1="26" y1="20" x2="56" y2="28" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
              <line x1="64" y1="12" x2="94" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
              <line x1="64" y1="28" x2="94" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
            </svg>
          </div>
        );
      case "handshake":
        return (
          <div className="card-signal mt-6 flex items-center gap-3">
            <div className="flex-1 h-1 bg-gradient-to-r from-[#274D8E] to-[#47B5CB] rounded" />
            <div className="w-8 h-8 rounded-full bg-[#4EB9A7]/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-[#4EB9A7]" />
            </div>
            <div className="flex-1 h-1 bg-gradient-to-l from-[#274D8E] to-[#47B5CB] rounded" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="relative bg-slate-50 overflow-x-hidden">
      <SEO
        title="Growth Strategy | Aryo Consulting Group"
        description="Accelerate market success with Aryo's growth strategy consulting. Market entry, revenue acceleration, pricing optimization, and partnership development."
        canonical="/growth-strategy"
      />

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50" data-testid="scroll-progress">
        <div
          className="h-full bg-gradient-to-r from-[#274D8E] via-[#47B5CB] to-[#4EB9A7] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at 20% 20%, rgba(39, 77, 142, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, rgba(71, 181, 203, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(78, 185, 167, 0.05) 0%, transparent 50%)
            `,
            animation: "gradientDrift 20s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes gradientDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(2%, 1%) scale(1.02); }
          50% { transform: translate(-1%, 2%) scale(1); }
          75% { transform: translate(-2%, -1%) scale(1.01); }
        }
        .card-inner {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
      `}</style>

      {/* Scene 1: Hero */}
      <section className="scene-card min-h-screen flex items-center justify-center px-4 sm:px-6 py-24 relative" data-testid="scene-hero">
        <div className="card-inner w-full max-w-3xl">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-12 relative overflow-hidden">
            {/* Accent gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#274D8E] via-[#47B5CB] to-[#4EB9A7]" />
            
            <p className="text-[#47B5CB] text-sm font-medium tracking-widest uppercase mb-3" data-testid="text-hero-tagline">
              {heroContent.tagline}
            </p>
            <h1 className="card-headline text-4xl sm:text-5xl md:text-6xl font-display font-bold text-[#1a365d] mb-6" data-testid="text-hero-title">
              {heroContent.title}
            </h1>
            <p className="card-bullet text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl" data-testid="text-hero-body">
              {heroContent.body}
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-3 mb-8">
              {heroContent.chips.map((chip, i) => (
                <span
                  key={i}
                  className="card-bullet px-4 py-2 bg-slate-100 text-[#274D8E] text-sm font-medium rounded-full"
                  data-testid={`chip-hero-${i}`}
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-[#274D8E] text-white gap-2" data-testid="button-book-call">
                  Book a Strategy Call
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-[#274D8E] text-[#274D8E] gap-2" data-testid="button-download-brief">
                Download Service Brief
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Scenes 2-6: Sub-services */}
      {subServices.map((service, index) => (
        <section
          key={service.id}
          className="scene-card min-h-screen flex items-center justify-center px-4 sm:px-6 py-24 relative"
          data-testid={`scene-service-${service.id}`}
        >
          <div className="card-inner w-full max-w-3xl">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-12 relative overflow-hidden">
              {/* Scene number indicator */}
              <div className="absolute top-6 right-6 text-6xl font-display font-bold text-gray-100">
                0{index + 1}
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#274D8E] to-[#47B5CB] flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                <h2 className="card-headline text-3xl sm:text-4xl font-display font-bold text-[#1a365d] mb-4" data-testid={`text-service-title-${service.id}`}>
                  {service.title}
                </h2>
                <p className="card-bullet text-lg text-gray-600 mb-8" data-testid={`text-service-desc-${service.id}`}>
                  {service.description}
                </p>

                {/* What you get */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-[#274D8E] uppercase tracking-wider mb-4">
                    What You Get
                  </h3>
                  <ul className="space-y-3">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="card-bullet flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#4EB9A7]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#4EB9A7]" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Signal element */}
                <SignalElement type={service.signal} />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Scene 7: Outcome */}
      <section className="scene-card min-h-screen flex items-center justify-center px-4 sm:px-6 py-24 relative" data-testid="scene-outcome">
        <div className="card-inner w-full max-w-3xl">
          <div className="bg-gradient-to-br from-[#1a365d] via-[#274D8E] to-[#47B5CB] rounded-2xl shadow-2xl p-8 sm:p-12 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-40 h-40 border border-white/30 rounded-full" />
              <div className="absolute bottom-10 left-10 w-24 h-24 border border-white/20 rounded-full" />
            </div>

            <div className="relative z-10">
              <p className="text-[#4EB9A7] text-sm font-medium tracking-widest uppercase mb-3">
                Typical Outcome
              </p>
              <h2 className="card-headline text-5xl sm:text-6xl md:text-7xl font-display font-bold mb-8" data-testid="text-outcome-headline">
                2x
                <span className="block text-2xl sm:text-3xl text-white/80 mt-2">
                  Revenue Growth Rate
                </span>
              </h2>

              {/* Metrics */}
              <div className="grid sm:grid-cols-3 gap-6 mb-10">
                {outcomeMetrics.map((metric, i) => (
                  <div key={i} className="card-bullet" data-testid={`card-metric-${i}`}>
                    <div className="h-1 w-12 bg-[#4EB9A7] rounded mb-3" />
                    <h4 className="font-semibold text-white mb-1">{metric.label}</h4>
                    <p className="text-white/60 text-sm">{metric.description}</p>
                  </div>
                ))}
              </div>

              {/* CTA Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20">
                <h3 className="text-2xl font-display font-bold mb-4">Talk to Us</h3>
                <p className="text-white/80 mb-4 font-medium">What happens next?</p>
                <ul className="space-y-2 mb-6">
                  {nextSteps.map((step, i) => (
                    <li key={i} className="card-bullet flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#4EB9A7]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-[#4EB9A7]">{i + 1}</span>
                      </div>
                      <span className="text-white/80 text-sm">{step}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button size="lg" className="bg-white text-[#274D8E] gap-2" data-testid="button-contact-cta">
                      Book a Strategy Call
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/capabilities">
                    <Button size="lg" variant="outline" className="border-white/50 text-white gap-2" data-testid="button-explore-services">
                      Explore All Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
