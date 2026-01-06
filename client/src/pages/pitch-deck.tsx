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

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-24 bg-white" data-testid="section-why-choose-us">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[#47B5CB] text-sm sm:text-base font-medium tracking-widest uppercase mb-3">
              The Aryo Difference
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1a365d] mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We bring a unique combination of strategic insight, operational expertise, and hands-on execution to every engagement.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Results-Driven Approach",
                description: "We tie our success to your outcomes. Our engagement models include success fees linked directly to measurable business results.",
                icon: TrendingUp,
              },
              {
                title: "Deep Industry Expertise",
                description: "Our team brings decades of combined experience across private equity, technology, healthcare, and professional services sectors.",
                icon: BarChart3,
              },
              {
                title: "Embedded Partnership",
                description: "We don't just advise from the sidelines. Our consultants embed with your team to ensure knowledge transfer and sustainable change.",
                icon: UsersRound,
              },
              {
                title: "Speed to Value",
                description: "We deliver actionable insights in weeks, not months. Our agile methodology accelerates time-to-impact for every initiative.",
                icon: Clock,
              },
              {
                title: "Transparent Pricing",
                description: "Fixed-price engagements with clear deliverables. No surprise invoices or endless scope creep. You know exactly what you're getting.",
                icon: DollarSign,
              },
              {
                title: "Tailored Solutions",
                description: "Every business is unique. We customize our approach to your specific challenges, culture, and strategic objectives.",
                icon: Target,
              },
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-slate-50 to-white p-6 sm:p-8 rounded-xl border border-gray-100 hover-elevate"
                data-testid={`card-why-choose-${index}`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#274D8E] to-[#47B5CB] flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold text-[#1a365d] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#E8F4FC] to-white" data-testid="section-our-approach">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[#47B5CB] text-sm sm:text-base font-medium tracking-widest uppercase mb-3">
              How We Work
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1a365d] mb-4">
              Our Approach
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven methodology that drives results from discovery through implementation and beyond.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#274D8E] via-[#47B5CB] to-[#4EB9A7]" />
            
            <div className="space-y-8 lg:space-y-0">
              {[
                {
                  phase: "01",
                  title: "Discovery & Diagnosis",
                  description: "We begin with deep discovery sessions to understand your business, challenges, and objectives. Through stakeholder interviews, data analysis, and market research, we identify the root causes and opportunities.",
                  duration: "1-2 Weeks",
                },
                {
                  phase: "02",
                  title: "Strategy Development",
                  description: "Based on our findings, we develop a tailored strategic roadmap with clear priorities, milestones, and success metrics. We pressure-test recommendations with your leadership team.",
                  duration: "2-3 Weeks",
                },
                {
                  phase: "03",
                  title: "Implementation Planning",
                  description: "We translate strategy into actionable work plans with defined owners, timelines, and resource requirements. We identify quick wins to build momentum while tackling structural changes.",
                  duration: "1-2 Weeks",
                },
                {
                  phase: "04",
                  title: "Execution & Coaching",
                  description: "Our team embeds with yours to drive execution. We provide hands-on support, coach your leaders, and adapt tactics based on real-world feedback and results.",
                  duration: "Ongoing",
                },
                {
                  phase: "05",
                  title: "Measurement & Optimization",
                  description: "We track KPIs rigorously and provide transparent reporting on progress. Continuous optimization ensures we maximize impact and course-correct as needed.",
                  duration: "Continuous",
                },
              ].map((step, index) => (
                <div 
                  key={index}
                  className={`relative lg:flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  data-testid={`step-approach-${index}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}>
                    <div className={`bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm ${index % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'} max-w-lg`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[#47B5CB] font-mono font-bold text-lg">{step.phase}</span>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{step.duration}</span>
                      </div>
                      <h3 className="text-xl font-display font-semibold text-[#1a365d] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#274D8E] border-4 border-white shadow-md" />
                  
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-white" data-testid="section-faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[#47B5CB] text-sm sm:text-base font-medium tracking-widest uppercase mb-3">
              Common Questions
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1a365d] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Answers to the most common questions about our pitch deck and investment presentation services.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "What's included in a pitch deck engagement?",
                answer: "Our pitch deck service includes strategic narrative development, market and competitive analysis, financial modeling guidance, visual design, and investor feedback incorporation. We work with you through multiple revision cycles to ensure your story resonates with your target audience.",
              },
              {
                question: "How long does it take to create a pitch deck?",
                answer: "A typical pitch deck engagement takes 2-4 weeks depending on complexity and your availability for feedback cycles. We can accommodate accelerated timelines for urgent fundraising situations with our dedicated sprint offering.",
              },
              {
                question: "Do you help with investor introductions?",
                answer: "Yes, for qualified clients we provide warm introductions to our network of venture capital firms, private equity partners, and strategic investors. We also offer coaching for pitch presentations and Q&A preparation.",
              },
              {
                question: "What industries do you specialize in?",
                answer: "We have deep expertise across technology, healthcare, professional services, consumer products, and B2B SaaS. Our team includes former operators and investors who understand what different investor audiences are looking for.",
              },
              {
                question: "How do you price your pitch deck services?",
                answer: "We offer fixed-price packages ranging from $5,000 to $20,000 depending on complexity, requirements, and additional services. All pricing is transparent with no hidden fees or hourly billing surprises.",
              },
              {
                question: "Can you help with our financial model too?",
                answer: "Absolutely. We often pair pitch deck work with financial modeling services to ensure your projections are defensible and your story is backed by solid numbers. We build investor-ready models that can withstand due diligence scrutiny.",
              },
            ].map((faq, index) => (
              <details 
                key={index}
                className="group bg-gradient-to-br from-slate-50 to-white rounded-xl border border-gray-100 overflow-hidden"
                data-testid={`faq-item-${index}`}
              >
                <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
                  <span className="text-lg font-display font-semibold text-[#1a365d] pr-4">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#274D8E]/10 flex items-center justify-center text-[#274D8E] group-open:rotate-45 transition-transform">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

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
