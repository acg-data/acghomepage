import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageLayout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowDown, ArrowRight, Target, AlertTriangle, Lightbulb, Clock, BarChart3, Users, Package, DollarSign, UsersRound, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    title: "Company Purpose",
    subtitle: "Our Mission",
    content: "Empowering businesses to achieve transformative growth through strategic consulting, operational excellence, and data-driven insights.",
    icon: Target,
    accent: "from-[#274D8E] to-[#47B5CB]",
  },
  {
    id: 2,
    title: "The Problem",
    subtitle: "Market Challenge",
    content: "Mid-market companies struggle to access enterprise-grade consulting expertise. Traditional firms are expensive, slow, and disconnected from operational realities.",
    icon: AlertTriangle,
    accent: "from-[#47B5CB] to-[#4EB9A7]",
  },
  {
    id: 3,
    title: "Our Solution",
    subtitle: "The Aryo Approach",
    content: "A modern consulting model combining deep industry expertise with hands-on implementation. We embed with your team to drive measurable outcomes.",
    icon: Lightbulb,
    accent: "from-[#4EB9A7] to-[#274D8E]",
  },
  {
    id: 4,
    title: "Why Now",
    subtitle: "Market Timing",
    content: "Digital transformation is accelerating. Companies that adapt now will capture market share. Those that wait risk obsolescence in an increasingly competitive landscape.",
    icon: Clock,
    accent: "from-[#274D8E] to-[#6FA4D1]",
  },
  {
    id: 5,
    title: "Market Size",
    subtitle: "$500B+ TAM",
    content: "The global management consulting market exceeds $500B annually. Mid-market segment growing at 8% CAGR with significant underserved demand.",
    icon: BarChart3,
    accent: "from-[#6FA4D1] to-[#47B5CB]",
  },
  {
    id: 6,
    title: "Competition",
    subtitle: "Our Advantage",
    content: "Unlike traditional consultancies, we offer fixed-price engagements, faster timelines, and guaranteed outcomes. Our embedded model ensures knowledge transfer.",
    icon: Users,
    accent: "from-[#47B5CB] to-[#274D8E]",
  },
  {
    id: 7,
    title: "Product",
    subtitle: "Service Portfolio",
    content: "Strategy & Operations, M&A Advisory, Digital Transformation, AI Implementation, Talent & Organization, Market Expansion - all delivered with measurable KPIs.",
    icon: Package,
    accent: "from-[#274D8E] to-[#4EB9A7]",
  },
  {
    id: 8,
    title: "Business Model",
    subtitle: "Revenue Streams",
    content: "Project-based consulting, retainer relationships, success fees tied to outcomes. 40%+ gross margins with high client retention and expansion revenue.",
    icon: DollarSign,
    accent: "from-[#4EB9A7] to-[#6FA4D1]",
  },
  {
    id: 9,
    title: "Team",
    subtitle: "Leadership",
    content: "Former partners from McKinsey, BCG, and Bain. Operating executives with P&L experience. Deep expertise across industries and functional areas.",
    icon: UsersRound,
    accent: "from-[#6FA4D1] to-[#274D8E]",
  },
  {
    id: 10,
    title: "Financials",
    subtitle: "Growth Trajectory",
    content: "3x revenue growth YoY. Path to profitability in 18 months. Strong unit economics with 85% client retention and 120% net revenue retention.",
    icon: TrendingUp,
    accent: "from-[#274D8E] to-[#47B5CB]",
  },
];

function SlideContent({ slide, isBack = false }: { slide: typeof slides[0]; isBack?: boolean }) {
  const Icon = slide.icon;
  
  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 ${isBack ? 'rotateY-180' : ''}`}
         style={{ backfaceVisibility: 'hidden', transform: isBack ? 'rotateY(180deg)' : 'none' }}>
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.accent} opacity-10 rounded-xl`} />
      <div className="relative z-10 text-center max-w-2xl">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#274D8E] to-[#47B5CB] flex items-center justify-center shadow-lg">
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <p className="text-[#47B5CB] text-sm sm:text-base font-medium tracking-wide uppercase mb-2">
          {slide.subtitle}
        </p>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#1a365d] mb-4 sm:mb-6">
          {slide.title}
        </h3>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          {slide.content}
        </p>
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
          <span className="font-mono">{String(slide.id).padStart(2, '0')}</span>
          <span>/</span>
          <span className="font-mono">{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}

export default function PitchDeck() {
  const containerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || !deckRef.current) return;

    const ctx = gsap.context(() => {
      const totalSlides = slides.length;
      const scrollPerSlide = 100 / totalSlides;

      slidesRef.current.forEach((slide, index) => {
        if (!slide) return;

        const shading = slide.querySelector('.shading-overlay');
        
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress * 100;
            const slideStart = index * scrollPerSlide;
            const slideEnd = (index + 1) * scrollPerSlide;
            
            if (progress >= slideStart && progress < slideEnd) {
              const slideProgress = (progress - slideStart) / scrollPerSlide;
              const rotation = slideProgress * -180;
              
              gsap.set(slide, {
                rotateY: rotation,
                zIndex: totalSlides - index,
              });

              if (shading) {
                const shadingOpacity = Math.sin(slideProgress * Math.PI) * 0.4;
                gsap.set(shading, { opacity: shadingOpacity });
              }
            } else if (progress >= slideEnd) {
              gsap.set(slide, {
                rotateY: -180,
                zIndex: totalSlides - index,
              });
              if (shading) gsap.set(shading, { opacity: 0 });
            } else {
              gsap.set(slide, {
                rotateY: 0,
                zIndex: totalSlides - index,
              });
              if (shading) gsap.set(shading, { opacity: 0 });
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout>
      <SEO 
        title="Pitch Deck | Aryo Consulting Group"
        description="Explore our interactive pitch deck showcasing Aryo Consulting Group's mission, solutions, and growth strategy."
        canonical="https://aryocg.com/pitch-deck"
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#E8F4FC] via-white to-[#E8F4FC] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#47B5CB] rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#274D8E] rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <p className="text-[#47B5CB] text-sm sm:text-base font-medium tracking-widest uppercase mb-4" data-testid="text-hero-subtitle">
            Interactive Presentation
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[#1a365d] mb-6" data-testid="text-hero-title">
            Pitch Deck
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto" data-testid="text-hero-description">
            Scroll to explore our company story through an immersive 3D page-flip experience
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-[#274D8E] text-white gap-2" data-testid="button-start-scrolling">
              Start Scrolling
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </Button>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-contact-us">
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="bg-gradient-to-b from-[#E8F4FC] to-white py-8 text-center">
        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <ArrowDown className="w-4 h-4 animate-bounce" />
          Scroll to flip through the deck
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </p>
      </div>

      {/* Deck Section - Sticky Container */}
      <div 
        ref={containerRef}
        className="relative bg-gradient-to-br from-slate-100 via-white to-slate-50"
        style={{ height: `${(slides.length + 1) * 100}vh` }}
        data-testid="section-deck"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
          {/* 3D Perspective Container */}
          <div 
            ref={deckRef}
            className="relative w-full max-w-4xl"
            style={{ perspective: '2000px', perspectiveOrigin: 'center center' }}
          >
            {/* Aspect Ratio Container (16:9) */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  ref={(el) => { if (el) slidesRef.current[index] = el; }}
                  className="absolute inset-0 bg-white rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden"
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'left center',
                    zIndex: slides.length - index,
                    backfaceVisibility: 'hidden',
                  }}
                  data-testid={`slide-${slide.id}`}
                >
                  {/* Front Face */}
                  <SlideContent slide={slide} />
                  
                  {/* Shading Overlay */}
                  <div 
                    className="shading-overlay absolute inset-0 bg-black pointer-events-none rounded-xl"
                    style={{ opacity: 0 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-2 h-2 rounded-full bg-gray-300 transition-colors"
            title={slide.title}
          />
        ))}
      </div>

      {/* Footer Section */}
      <section className="bg-[#1a365d] text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6" data-testid="text-footer-title">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto" data-testid="text-footer-description">
            Let's discuss how Aryo Consulting Group can help you achieve your strategic objectives.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-[#47B5CB] text-white gap-2" data-testid="button-schedule-call">
                Schedule a Call
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/capabilities">
              <Button size="lg" variant="outline" className="border-white text-white gap-2" data-testid="button-explore-services">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
