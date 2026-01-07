import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { PageLayout } from '@/components/layout';
import { SEO } from '@/components/seo';

gsap.registerPlugin(ScrollTrigger);

const HERO_CONTENT = {
  title: "Growth Strategy",
  tagline: "Accelerating Market Success",
  body: "We help you find and capture your next $100M opportunity — then we help you build the capabilities to repeat it & ensured growth.",
  chips: ["Market mapping", "Unit economics", "Go-to-market plan"],
  ctaPrimary: "Book a Strategy Call",
  ctaSecondary: "Download Service Brief"
};

const SERVICES = [
  {
    id: "market-entry",
    title: "Market Entry Strategy",
    description: "We identify and validate new markets with precision, reducing risk while maximizing first-mover advantage.",
    deliverables: [
      "Market opportunity assessment",
      "Competitive landscape analysis",
      "Entry timing & sequencing plan"
    ]
  },
  {
    id: "revenue-acceleration",
    title: "Revenue Acceleration",
    description: "Unlock trapped value in your existing business model through systematic revenue optimization.",
    deliverables: [
      "Revenue stream mapping",
      "Conversion funnel optimization",
      "Growth lever prioritization"
    ]
  },
  {
    id: "pricing-optimization",
    title: "Pricing Optimization",
    description: "Calibrate your pricing architecture to capture maximum value while maintaining competitive positioning.",
    deliverables: [
      "Value-based pricing framework",
      "Price elasticity modeling",
      "Competitive price positioning"
    ]
  },
  {
    id: "channel-strategy",
    title: "Channel Strategy",
    description: "Design and optimize your go-to-market channels for maximum reach and efficiency.",
    deliverables: [
      "Channel mix optimization",
      "Partner ecosystem design",
      "Direct vs. indirect strategy"
    ]
  },
  {
    id: "partnership-development",
    title: "Partnership Development",
    description: "Build strategic alliances that accelerate growth and create sustainable competitive moats.",
    deliverables: [
      "Partnership opportunity mapping",
      "Deal structure frameworks",
      "Integration playbooks"
    ]
  }
];

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return prefersReducedMotion;
}

function MomentumLine() {
  return (
    <div className="relative h-0.5 w-48 bg-aryo-lightGrey/30 mt-4 overflow-hidden">
      <div className="momentum-line absolute inset-y-0 left-0 bg-aryo-teal w-0" />
    </div>
  );
}

function ExpandingFrame() {
  return (
    <div className="relative w-32 h-24 mx-auto my-8">
      <div className="expanding-frame-border absolute inset-0 border-2 border-aryo-teal/60 scale-[0.6] opacity-0" />
      <div className="expanding-corner-tl absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-aryo-deepBlue opacity-0" />
      <div className="expanding-corner-tr absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-aryo-deepBlue opacity-0" />
      <div className="expanding-corner-bl absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-aryo-deepBlue opacity-0" />
      <div className="expanding-corner-br absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-aryo-deepBlue opacity-0" />
    </div>
  );
}

function StepBars() {
  const heights = [40, 55, 70, 85, 100];
  return (
    <div className="flex items-end justify-center gap-2 h-28 my-8">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`step-bar step-bar-${i} w-4 bg-gradient-to-t from-aryo-deepBlue to-aryo-teal rounded-t`}
          style={{ height: 0 }}
          data-height={h}
        />
      ))}
    </div>
  );
}

function CalibrationTicks() {
  return (
    <div className="relative w-40 h-16 mx-auto my-8">
      <div className="absolute inset-x-0 top-1/2 h-0.5 bg-aryo-lightGrey/30" />
      <div className="calibration-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-aryo-teal scale-0" />
      {[-30, -15, 0, 15, 30].map((offset, i) => (
        <div
          key={i}
          className={`calibration-tick calibration-tick-${i} absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-aryo-deepBlue rounded opacity-0`}
          style={{ left: '50%', transform: `translateX(${offset + (i % 2 === 0 ? 5 : -5)}px) translateY(-50%)` }}
          data-target-offset={offset}
        />
      ))}
    </div>
  );
}

function BranchingPaths() {
  return (
    <svg className="w-40 h-24 mx-auto my-8" viewBox="0 0 160 96">
      <path className="branch-main" d="M10 48 H60" stroke="#274D8E" strokeWidth="2" fill="none" strokeDasharray="50" strokeDashoffset="50" />
      <path className="branch-top" d="M60 48 Q80 48 100 24 H150" stroke="#47B5CB" strokeWidth="2" fill="none" strokeDasharray="100" strokeDashoffset="100" />
      <path className="branch-center" d="M60 48 H150" stroke="#274D8E" strokeWidth="3" fill="none" strokeDasharray="90" strokeDashoffset="90" />
      <path className="branch-bottom" d="M60 48 Q80 48 100 72 H150" stroke="#47B5CB" strokeWidth="2" fill="none" strokeDasharray="100" strokeDashoffset="100" />
    </svg>
  );
}

function ConnectingNodes() {
  const nodes = [
    { x: 20, y: 20 },
    { x: 80, y: 15 },
    { x: 140, y: 25 },
    { x: 40, y: 70 },
    { x: 100, y: 75 },
    { x: 130, y: 55 }
  ];
  
  const connections = [
    [0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [1, 5], [2, 5]
  ];

  return (
    <svg className="w-40 h-24 mx-auto my-8" viewBox="0 0 160 96">
      {connections.map(([from, to], i) => (
        <line
          key={i}
          className={`node-line node-line-${i}`}
          x1={nodes[from].x}
          y1={nodes[from].y}
          x2={nodes[from].x}
          y2={nodes[from].y}
          stroke="#47B5CB"
          strokeWidth="1.5"
          opacity="0"
          data-target-x={nodes[to].x}
          data-target-y={nodes[to].y}
        />
      ))}
      {nodes.map((node, i) => (
        <circle
          key={i}
          className={`node-circle node-circle-${i}`}
          cx={node.x}
          cy={node.y}
          r="5"
          fill="#274D8E"
          opacity="0"
          transform="scale(0)"
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
        />
      ))}
    </svg>
  );
}

function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-aryo-lightGrey/20 z-50">
      <div
        className="h-full bg-gradient-to-r from-aryo-deepBlue to-aryo-teal transition-none"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

function HeroCard() {
  return (
    <div className="scene-card hero-card bg-white border border-aryo-lightGrey p-12 max-w-2xl mx-auto opacity-0">
      <span className="hero-tagline text-xs font-bold text-aryo-greenTeal uppercase tracking-widest opacity-0">
        {HERO_CONTENT.tagline}
      </span>
      <h1 className="hero-title text-4xl md:text-5xl font-serif text-aryo-deepBlue mt-4 mb-6 opacity-0 translate-y-4">
        {HERO_CONTENT.title}
      </h1>
      <MomentumLine />
      <p className="hero-body text-lg text-slate-600 mt-8 mb-8 opacity-0">
        {HERO_CONTENT.body}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-10">
        {HERO_CONTENT.chips.map((chip, i) => (
          <span
            key={i}
            className={`hero-chip hero-chip-${i} px-3 py-1.5 bg-aryo-deepBlue/5 text-aryo-deepBlue text-xs font-medium opacity-0 translate-y-2`}
          >
            {chip}
          </span>
        ))}
      </div>
      
      <div className="hero-ctas flex flex-wrap gap-4 opacity-0">
        <Link href="/contact">
          <motion.button
            className="inline-flex items-center gap-2 bg-aryo-deepBlue text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#1a3668] transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-testid="button-strategy-call"
          >
            {HERO_CONTENT.ctaPrimary} <ArrowRight size={14} />
          </motion.button>
        </Link>
        <motion.button
          className="inline-flex items-center gap-2 border border-aryo-deepBlue text-aryo-deepBlue px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-aryo-deepBlue/5 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-testid="button-download-brief"
        >
          {HERO_CONTENT.ctaSecondary}
        </motion.button>
      </div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const signalComponents = [ExpandingFrame, StepBars, CalibrationTicks, BranchingPaths, ConnectingNodes];
  const Signal = signalComponents[index];

  return (
    <div className={`scene-card service-card service-card-${index} bg-white border border-aryo-lightGrey p-10 max-w-xl mx-auto opacity-0`}>
      <span className="service-label text-xs font-bold text-aryo-teal uppercase tracking-widest opacity-0">
        Service {index + 1} of 5
      </span>
      <h2 className={`service-title service-title-${index} text-2xl md:text-3xl font-serif text-aryo-deepBlue mt-3 mb-4 opacity-0 translate-y-3`}>
        {service.title}
      </h2>
      
      <div className={`signal-container signal-${index}`}>
        <Signal />
      </div>
      
      <p className={`service-description service-description-${index} text-slate-600 mb-6 opacity-0`}>
        {service.description}
      </p>
      
      <div className={`service-deliverables service-deliverables-${index} border-t border-aryo-lightGrey pt-6 opacity-0`}>
        <span className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest">
          What You Get
        </span>
        <ul className="mt-3 space-y-2">
          {service.deliverables.map((item, i) => (
            <li
              key={i}
              className={`deliverable deliverable-${index}-${i} flex items-center gap-2 text-sm text-slate-600 opacity-0 translate-x-[-10px]`}
            >
              <div className="w-1.5 h-1.5 bg-aryo-greenTeal flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FinalCTA() {
  return (
    <div className="final-cta bg-aryo-deepBlue py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <span className="cta-label text-xs font-bold text-aryo-greenTeal uppercase tracking-widest opacity-0">
          Strategy Synthesis
        </span>
        <h3 className="cta-headline text-3xl font-serif text-white mt-4 mb-8 opacity-0 translate-y-4">
          Structured. Repeatable. Built for scale.
        </h3>
        
        <div className="cta-chips flex flex-wrap justify-center gap-3 mb-10">
          {SERVICES.map((s, i) => (
            <span
              key={i}
              className={`cta-chip cta-chip-${i} px-4 py-2 bg-white/10 text-white text-sm font-medium opacity-0 translate-y-2`}
            >
              {s.title}
            </span>
          ))}
        </div>
        
        <div className="cta-buttons flex flex-wrap justify-center gap-4 opacity-0">
          <Link href="/contact">
            <motion.button
              className="inline-flex items-center gap-2 bg-aryo-teal text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-aryo-greenTeal transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-final-cta"
            >
              Book a Strategy Call <ArrowRight size={14} />
            </motion.button>
          </Link>
          <Link href="/capabilities">
            <motion.button
              className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-view-capabilities"
            >
              View All Capabilities
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function GrowthStrategy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      gsap.set('.scene-card, .hero-tagline, .hero-title, .hero-body, .hero-chip, .hero-ctas, .service-label, .service-title, .service-description, .service-deliverables, .deliverable, .cta-label, .cta-headline, .cta-chip, .cta-buttons, .momentum-line', { 
        opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0, rotateZ: 0 
      });
      return;
    }
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });
    
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      }
    });

    if (heroRef.current) {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.8,
        }
      });

      heroTl
        .fromTo('.hero-card', 
          { opacity: 0, y: 80, rotateX: 6 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.25 }
        )
        .fromTo('.hero-tagline',
          { opacity: 0 },
          { opacity: 1, duration: 0.1 },
          0.05
        )
        .fromTo('.hero-title',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.15 },
          0.1
        )
        .fromTo('.momentum-line',
          { width: '0%' },
          { width: '100%', duration: 0.2 },
          0.2
        )
        .fromTo('.hero-body',
          { opacity: 0 },
          { opacity: 1, duration: 0.1 },
          0.25
        )
        .fromTo('.hero-chip',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.03, duration: 0.1 },
          0.3
        )
        .fromTo('.hero-ctas',
          { opacity: 0 },
          { opacity: 1, duration: 0.1 },
          0.4
        )
        .to('.hero-card',
          { opacity: 0, y: -40, scale: 0.95, duration: 0.25 },
          0.75
        );
    }

    sceneRefs.current.forEach((scene, index) => {
      if (!scene) return;
      
      const cardClass = `.service-card-${index}`;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.8,
        }
      });

      tl
        .fromTo(cardClass, 
          { opacity: 0, y: 100, rotateX: 5, rotateZ: -1 },
          { opacity: 1, y: 0, rotateX: 0, rotateZ: 0, duration: 0.25 }
        )
        .fromTo(`.service-card-${index} .service-label`,
          { opacity: 0 },
          { opacity: 1, duration: 0.08 },
          0.08
        )
        .fromTo(`.service-title-${index}`,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.12 },
          0.12
        )
        .fromTo(`.service-description-${index}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.1 },
          0.35
        )
        .fromTo(`.service-deliverables-${index}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.1 },
          0.4
        )
        .fromTo(`.deliverable-${index}-0, .deliverable-${index}-1, .deliverable-${index}-2`,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, stagger: 0.03, duration: 0.08 },
          0.45
        );

      if (index === 0) {
        tl
          .fromTo(`.signal-${index} .expanding-frame-border`,
            { scale: 0.6, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.15 },
            0.25
          )
          .fromTo(`.signal-${index} .expanding-corner-tl, .signal-${index} .expanding-corner-tr, .signal-${index} .expanding-corner-bl, .signal-${index} .expanding-corner-br`,
            { opacity: 0 },
            { opacity: 1, stagger: 0.02, duration: 0.08 },
            0.32
          );
      }

      if (index === 1) {
        [0, 1, 2, 3, 4].forEach((barIdx) => {
          const bar = scene.querySelector(`.step-bar-${barIdx}`) as HTMLElement;
          if (bar) {
            const targetHeight = bar.dataset.height || '50';
            tl.to(bar, { height: `${targetHeight}%`, duration: 0.08 }, 0.25 + barIdx * 0.02);
          }
        });
      }

      if (index === 2) {
        tl.to(`.signal-${index} .calibration-center`, { scale: 1, duration: 0.08 }, 0.3);
        [0, 1, 2, 3, 4].forEach((tickIdx) => {
          const tick = scene.querySelector(`.calibration-tick-${tickIdx}`) as HTMLElement;
          if (tick) {
            const targetOffset = parseInt(tick.dataset.targetOffset || '0');
            tl.to(tick, { 
              opacity: 1, 
              x: targetOffset, 
              duration: 0.08 
            }, 0.25 + tickIdx * 0.02);
          }
        });
      }

      if (index === 3) {
        tl
          .to(`.signal-${index} .branch-main`, { strokeDashoffset: 0, duration: 0.1 }, 0.25)
          .to(`.signal-${index} .branch-top`, { strokeDashoffset: 0, duration: 0.12 }, 0.32)
          .to(`.signal-${index} .branch-center`, { strokeDashoffset: 0, duration: 0.12 }, 0.35)
          .to(`.signal-${index} .branch-bottom`, { strokeDashoffset: 0, duration: 0.12 }, 0.38);
      }

      if (index === 4) {
        [0, 1, 2, 3, 4, 5].forEach((nodeIdx) => {
          tl.to(`.signal-${index} .node-circle-${nodeIdx}`, { 
            opacity: 1, 
            scale: 1,
            transformOrigin: 'center center',
            duration: 0.05 
          }, 0.25 + nodeIdx * 0.015);
        });
        [0, 1, 2, 3, 4, 5, 6].forEach((lineIdx) => {
          const line = scene.querySelector(`.node-line-${lineIdx}`) as SVGLineElement;
          if (line) {
            const targetX = line.dataset.targetX || '0';
            const targetY = line.dataset.targetY || '0';
            tl.to(line, { 
              attr: { x2: Number(targetX), y2: Number(targetY) },
              opacity: 0.6,
              duration: 0.06 
            }, 0.32 + lineIdx * 0.015);
          }
        });
      }

      tl.to(cardClass,
        { opacity: 0, y: -50, x: 20, scale: 0.92, duration: 0.25 },
        0.75
      );
    });

    if (ctaRef.current) {
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 70%',
          end: 'center center',
          scrub: 0.6,
        }
      });

      ctaTl
        .fromTo('.cta-label',
          { opacity: 0 },
          { opacity: 1, duration: 0.2 }
        )
        .fromTo('.cta-headline',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.25 },
          0.1
        )
        .fromTo('.cta-chip',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.04, duration: 0.15 },
          0.25
        )
        .fromTo('.cta-buttons',
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          0.5
        );
    }

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [prefersReducedMotion]);

  return (
    <PageLayout>
      <SEO 
        title="Growth Strategy | Aryo Consulting Group"
        description="Accelerate market success with Aryo's Growth Strategy services: market entry, revenue acceleration, pricing optimization, channel strategy, and partnership development."
        canonical="https://aryocg.com/growth-strategy"
      />
      
      <ScrollProgress progress={scrollProgress} />
      
      <div ref={containerRef}>
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
            <Link href="/" className="hover:text-aryo-deepBlue" data-testid="link-home">Home</Link>
            <ChevronRight size={14} />
            <Link href="/capabilities" className="hover:text-aryo-deepBlue" data-testid="link-capabilities">Capabilities</Link>
            <ChevronRight size={14} />
            <span className="text-aryo-deepBlue">Growth Strategy</span>
          </div>
        </div>

        <div 
          ref={heroRef}
          className="min-h-screen flex items-center justify-center px-6 py-20"
          style={{ perspective: '1000px' }}
        >
          <HeroCard />
        </div>

        {SERVICES.map((service, index) => (
          <div
            key={service.id}
            ref={(el) => { sceneRefs.current[index] = el; }}
            className="min-h-screen flex items-center justify-center px-6 py-20"
            style={{
              perspective: '1000px',
              background: index % 2 === 0 
                ? 'linear-gradient(180deg, rgba(39, 77, 142, 0.02) 0%, rgba(39, 77, 142, 0.05) 100%)'
                : 'transparent'
            }}
          >
            <ServiceCard service={service} index={index} />
          </div>
        ))}

        <div ref={ctaRef}>
          <FinalCTA />
        </div>
      </div>
    </PageLayout>
  );
}
