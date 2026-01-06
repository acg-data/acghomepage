import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, Layers, Cpu, BarChart3, Cog, Users, Zap, Target, ChevronRight, Map, Database } from "lucide-react";
import { SEO } from "@/components/seo";
import { Footer } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Digital Strategy & Roadmapping",
    description: "We partner with leadership teams to define comprehensive digital roadmaps that align technology investments with business outcomes. Our strategic frameworks help prioritize initiatives, allocate resources, and measure success.",
    icon: Map,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    id: 2,
    title: "Technology Architecture",
    description: "Design scalable, secure, and future-proof technology foundations. We architect solutions that integrate seamlessly with existing systems while enabling innovation and growth.",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
  {
    id: 3,
    title: "Data & Analytics Platforms",
    description: "Unlock the power of your data with modern analytics platforms. We build data pipelines, warehouses, and visualization tools that turn raw information into actionable business intelligence.",
    icon: Database,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    id: 4,
    title: "Process Automation",
    description: "Streamline operations and reduce manual effort through intelligent automation. We implement RPA, workflow automation, and AI-powered solutions that drive efficiency and accuracy.",
    icon: Cog,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  },
  {
    id: 5,
    title: "Change Management",
    description: "Technology alone doesn't drive transformation—people do. We provide comprehensive change management to ensure adoption, engagement, and sustainable organizational change.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep-dive into your current state, pain points, and aspirations through stakeholder interviews and systems analysis.",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Develop a prioritized roadmap with clear milestones, success metrics, and resource requirements.",
  },
  {
    number: "03",
    title: "Design",
    description: "Create user-centered designs and technical architectures that balance innovation with practicality.",
  },
  {
    number: "04",
    title: "Build",
    description: "Execute with agile methodology, delivering incremental value while maintaining quality and security.",
  },
  {
    number: "05",
    title: "Scale",
    description: "Optimize performance, monitor key metrics, and continuously evolve your digital capabilities to stay ahead of market demands and competitive pressures.",
  },
];

export default function DigitalTransformation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const revealTextRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const horizontalWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    // Sync Lenis with ScrollTrigger using only GSAP ticker (avoids double updates)
    lenis.on("scroll", ScrollTrigger.update);
    
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Hero text scale animation on scroll
    if (heroTextRef.current) {
      gsap.to(heroTextRef.current, {
        scale: 1.15,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Text reveal animation - words change color as they enter viewport
    if (revealTextRef.current) {
      const words = revealTextRef.current.querySelectorAll(".reveal-word");
      words.forEach((word) => {
        gsap.to(word, {
          color: "#274D8E",
          ease: "none",
          scrollTrigger: {
            trigger: word,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        });
      });
    }

    // Services grid stagger animation
    if (servicesRef.current) {
      const cards = servicesRef.current.querySelectorAll(".service-card");
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    }

    // Horizontal scroll section
    if (horizontalRef.current && horizontalWrapperRef.current) {
      const scrollWidth = horizontalRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      gsap.to(horizontalRef.current, {
        x: -(scrollWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalWrapperRef.current,
          start: "top top",
          end: () => `+=${scrollWidth - viewportWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const revealText = "We believe digital transformation isn't just about technology—it's about reimagining how your business creates value in a connected world.";

  return (
    <div ref={containerRef} className="bg-white overflow-x-hidden">
      <SEO
        title="Digital Transformation | Aryo Consulting Group"
        description="Transform your business with strategic digital solutions. We specialize in legacy modernization, cloud architecture, and UX design."
        canonical="https://aryocg.com/digital-transformation"
      />

      {/* Immersive Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-testid="section-hero"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d] via-[#274D8E] to-[#47B5CB]" />
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
          <p className="text-[#4EB9A7] text-sm sm:text-base font-medium tracking-[0.3em] uppercase mb-6 opacity-80">
            Aryo Consulting Group
          </p>
          <h1
            ref={heroTextRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[0.9] tracking-tight mb-8"
            data-testid="text-hero-title"
          >
            REDEFINING THE
            <br />
            <span className="text-[#47B5CB]">DIGITAL FRONTIER</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Strategic transformation that turns complexity into competitive advantage
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-[#274D8E] gap-2 text-base px-8"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                data-testid="button-start-journey"
              >
                Start Your Journey
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/capabilities">
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 text-white gap-2 text-base px-8 backdrop-blur-sm"
                data-testid="button-explore-services"
              >
                Explore Services
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Text Reveal Section */}
      <section className="py-24 sm:py-32 bg-white" data-testid="section-text-reveal">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div ref={revealTextRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            {revealText.split(" ").map((word, index) => (
              <span
                key={index}
                className="reveal-word inline-block mr-[0.3em] text-gray-300 transition-colors"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-slate-50" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-[#47B5CB] text-sm sm:text-base font-medium tracking-widest uppercase mb-3">
              Our Expertise
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1a365d] mb-4">
              Transformation Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              End-to-end capabilities that drive meaningful change across your organization
            </p>
          </div>

          <div ref={servicesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`service-card group relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm ${
                  index < 2 ? "lg:col-span-1" : ""
                } ${index === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
                data-testid={`card-service-${service.id}`}
              >
                {/* Image reveal on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d]/95 via-[#1a365d]/70 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#274D8E] to-[#47B5CB] flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-display font-bold text-[#1a365d] group-hover:text-white mb-4 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white/80 mb-6 transition-colors flex-grow">
                    {service.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="w-fit text-[#274D8E] group-hover:text-white p-0 h-auto font-semibold"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Section - Our Process */}
      <div
        ref={horizontalWrapperRef}
        className="relative bg-[#1a365d]"
        style={{ height: "100vh" }}
        data-testid="section-process"
      >
        <div
          ref={horizontalRef}
          className="flex items-center h-full"
          style={{ width: "fit-content" }}
        >
          {/* Intro Panel */}
          <div className="w-screen h-full flex items-center justify-center px-8 flex-shrink-0">
            <div className="max-w-xl">
              <p className="text-[#4EB9A7] text-sm font-medium tracking-widest uppercase mb-4">
                Our Process
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                From Vision
                <br />
                <span className="text-[#47B5CB]">To Reality</span>
              </h2>
              <p className="text-lg text-white/70">
                A proven methodology that transforms ambitious ideas into measurable business outcomes
              </p>
            </div>
          </div>

          {/* Process Steps */}
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              className="w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] h-full flex items-center px-8 flex-shrink-0"
              data-testid={`step-process-${index}`}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-white/10 w-full min-h-[320px] flex flex-col justify-start pt-10">
                <span className="text-6xl sm:text-7xl font-display font-bold text-[#47B5CB]/30 mb-4 block">
                  {step.number}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-white/70 text-lg">
                  {step.description}
                </p>
              </div>
            </div>
          ))}

          {/* CTA Panel */}
          <div className="w-screen h-full flex items-center justify-center px-8 flex-shrink-0">
            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
                Ready to Begin?
              </h3>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-[#47B5CB] text-white gap-2"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Why Digital Transformation Section */}
      <section className="py-16 sm:py-24 bg-white" data-testid="section-why">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-[#47B5CB] text-sm font-medium tracking-widest uppercase mb-3">
                The Imperative
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1a365d] mb-6">
                Why Transform Now?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The pace of technological change has never been faster. Organizations that embrace digital transformation gain sustainable competitive advantages, while those that delay face growing risks of disruption.
              </p>
              <div className="space-y-4">
                {[
                  "70% of digital transformations fall short of their objectives",
                  "Companies with mature digital capabilities grow 26% faster",
                  "Customer expectations are shaped by digital-first experiences",
                  "Legacy systems drain 75% of IT budgets on maintenance",
                ].map((stat, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#4EB9A7]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-3 h-3 text-[#4EB9A7]" />
                    </div>
                    <p className="text-gray-700">{stat}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
                  alt="Digital transformation team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#274D8E] text-white p-6 rounded-xl shadow-xl max-w-xs">
                <Layers className="w-8 h-8 text-[#47B5CB] mb-3" />
                <p className="font-display font-semibold text-lg">
                  "Aryo helped us reduce our time-to-market by 60% while cutting infrastructure costs in half."
                </p>
                <p className="text-white/60 text-sm mt-2">— VP of Technology, Fortune 500</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#1a365d] via-[#274D8E] to-[#47B5CB]" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Let's Build Your Digital Future
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Whether you're modernizing legacy systems, building analytics platforms, or driving organizational change—we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-[#274D8E] gap-2 text-base px-8"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                data-testid="button-contact-cta"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/case-studies">
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 text-white gap-2 text-base px-8"
                data-testid="button-case-studies"
              >
                View Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
