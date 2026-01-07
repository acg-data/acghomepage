import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { PageLayout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ArrowDown, ChevronLeft, ChevronRight, Target, Shield, Handshake, TrendingUp, Users, BarChart3, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Aryo's M&A team delivered exceptional results. Their strategic approach and deep market knowledge helped us achieve a valuation that exceeded our expectations by 40%.",
    author: "CEO",
    company: "Mid-Market Technology Company",
    outcome: "$85M Exit"
  },
  {
    quote: "The level of support throughout the entire process was remarkable. From preparation to close, Aryo was there every step of the way, handling complex negotiations with expertise.",
    author: "Founder",
    company: "Healthcare Services Provider",
    outcome: "Strategic Acquisition"
  },
  {
    quote: "What sets Aryo apart is their genuine commitment to understanding our business. They didn't just run a process—they became true partners in achieving our goals.",
    author: "Managing Partner",
    company: "Private Equity Portfolio Company",
    outcome: "Successful Divestiture"
  },
  {
    quote: "Their network of strategic buyers and private equity firms gave us access to opportunities we never would have found on our own. The result was a competitive process that maximized value.",
    author: "Owner",
    company: "Manufacturing Business",
    outcome: "7x EBITDA Multiple"
  }
];

const specializations = [
  {
    title: "Sell-Side Advisory",
    description: "Full-service representation for business owners seeking to maximize exit value",
    icon: TrendingUp
  },
  {
    title: "Buy-Side Advisory", 
    description: "Strategic acquisition support for companies looking to grow through M&A",
    icon: Target
  },
  {
    title: "Corporate Divestitures",
    description: "Carve-out and spin-off advisory for non-core business units",
    icon: BarChart3
  },
  {
    title: "Due Diligence Support",
    description: "Comprehensive analysis and preparation for transaction readiness",
    icon: Shield
  }
];

const dealHighlights = [
  { metric: "$2B+", label: "Transaction Value" },
  { metric: "50+", label: "Deals Closed" },
  { metric: "40%", label: "Average Premium" },
  { metric: "95%", label: "Close Rate" }
];

export default function MAAdvisory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelector(".hero-title"),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        heroRef.current.querySelector(".hero-subtitle"),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
      );
      gsap.fromTo(
        heroRef.current.querySelector(".hero-cta"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.8 }
      );
    }

    const sections = containerRef.current?.querySelectorAll(".animate-section");
    sections?.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <PageLayout>
      <SEO
        title="M&A Advisory | Aryo Consulting Group"
        description="Strategic M&A advisory for middle-market companies. Sell-side, buy-side, and corporate divestiture expertise to maximize transaction value."
      />
      <div ref={containerRef} className="min-h-screen bg-white dark:bg-gray-950">
        <div
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a365d]/90 via-[#274D8E]/80 to-[#1a365d]/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-8">
              M&A ADVISORY
              <br />
              <span className="text-[#47B5CB]">for</span>{" "}
              <em className="font-serif italic font-normal text-white/90">growing companies</em>{" "}
              <span className="text-[#47B5CB]">&</span>
              <br />
              <em className="font-serif italic font-normal text-white/90">strategic exits</em>
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
              Strategic guidance to navigate complex transactions and maximize value
            </p>
            <div className="hero-cta">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-[#47B5CB] hover:bg-[#3a9fb3] text-white px-8 py-6 text-lg"
                  data-testid="button-ma-contact"
                >
                  Start a Conversation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6 text-white/60" />
          </div>
        </div>

        <section className="py-24 md:py-32 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-section grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a365d] dark:text-white leading-tight mb-6">
                  Extensive <span className="text-[#47B5CB]">support</span> &<br />
                  valuable <span className="text-[#47B5CB]">advice</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#47B5CB] to-[#4EB9A7] mb-8" />
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  At Aryo, we understand that M&A transactions represent defining moments for 
                  businesses and their stakeholders. Our advisory approach combines rigorous 
                  analysis with personalized attention to deliver outcomes that exceed expectations.
                </p>
                <div className="space-y-4">
                  {["Deep industry expertise", "Proprietary buyer network", "Hands-on deal management", "Post-close transition support"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#4EB9A7] flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div
                  className="aspect-[4/5] rounded-xl bg-cover bg-center shadow-2xl"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80')`,
                  }}
                />
                <div className="absolute -bottom-8 -left-8 bg-[#274D8E] text-white p-6 rounded-xl shadow-xl">
                  <p className="text-3xl font-bold mb-1">$2B+</p>
                  <p className="text-white/70 text-sm">Transaction Value Advised</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-[#1a365d] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#47B5CB]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#4EB9A7]/10 rounded-full blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="animate-section text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                A <span className="text-[#47B5CB]">strategic approach</span> to
                <br />
                close the deal at the highest price
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#47B5CB] to-[#4EB9A7] mx-auto" />
            </div>

            <div className="animate-section grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {dealHighlights.map((item, i) => (
                <div
                  key={i}
                  className="text-center p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm"
                >
                  <p className="text-4xl md:text-5xl font-bold text-[#47B5CB] mb-2">{item.metric}</p>
                  <p className="text-white/70">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="animate-section grid md:grid-cols-2 gap-8">
              {specializations.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={i}
                    className="group p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#47B5CB] to-[#4EB9A7] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#47B5CB] transition-colors">
                          {spec.title}
                        </h3>
                        <p className="text-white/60">{spec.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-section">
              <div className="text-center mb-4">
                <p className="text-[#47B5CB] font-medium tracking-wide uppercase">Client Success Stories</p>
              </div>
              
              <div className="relative max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 min-h-[320px] flex flex-col justify-center">
                  <div className="text-center">
                    <div className="text-6xl text-[#47B5CB]/20 font-serif mb-4">"</div>
                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed mb-8 italic">
                      {testimonials[currentTestimonial].quote}
                    </p>
                    <div className="mb-4">
                      <p className="font-bold text-[#1a365d] dark:text-white">
                        {testimonials[currentTestimonial].author}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {testimonials[currentTestimonial].company}
                      </p>
                    </div>
                    <span className="inline-block px-4 py-2 bg-[#47B5CB]/10 text-[#47B5CB] rounded-full text-sm font-medium">
                      {testimonials[currentTestimonial].outcome}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 mt-8">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={prevTestimonial}
                    className="rounded-full"
                    data-testid="button-testimonial-prev"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentTestimonial(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === currentTestimonial
                            ? "bg-[#47B5CB] w-6"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                        data-testid={`button-testimonial-dot-${i}`}
                      />
                    ))}
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={nextTestimonial}
                    className="rounded-full"
                    data-testid="button-testimonial-next"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-section grid md:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 md:order-1">
                <div
                  className="aspect-square rounded-xl bg-cover bg-center shadow-2xl"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80')`,
                  }}
                />
              </div>
              <div className="order-1 md:order-2">
                <p className="text-[#47B5CB] font-medium tracking-wide uppercase mb-4">We Specialize In</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1a365d] dark:text-white mb-8">
                  Middle-market transactions
                  <br />
                  <span className="text-[#47B5CB]">$10M to $500M</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-[#47B5CB] mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-[#1a365d] dark:text-white mb-1">Strategic Exits</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Positioning founder-led and PE-backed companies for optimal exit outcomes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-[#4EB9A7] mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-[#1a365d] dark:text-white mb-1">Corporate Divestitures</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Carve-outs and spin-offs for enterprise clients optimizing their portfolio
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-[#274D8E] mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-[#1a365d] dark:text-white mb-1">Growth Acquisitions</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Buy-side support for companies executing inorganic growth strategies
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-[#274D8E] text-[#274D8E] hover:bg-[#274D8E] hover:text-white dark:border-[#47B5CB] dark:text-[#47B5CB]"
                      data-testid="button-ma-learn-more"
                    >
                      Discuss Your Transaction
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#f8fafc] dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-section">
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider mb-8">
                Trusted by Leading Organizations
              </p>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
                <div className="text-2xl font-bold text-gray-400">Fortune 500</div>
                <div className="text-2xl font-bold text-gray-400">PE Firms</div>
                <div className="text-2xl font-bold text-gray-400">Family Offices</div>
                <div className="text-2xl font-bold text-gray-400">VC-Backed</div>
                <div className="text-2xl font-bold text-gray-400">Founder-Led</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-gradient-to-br from-[#274D8E] to-[#1a365d]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="animate-section">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                Ready to explore your options?
              </h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Whether you're considering an exit, acquisition, or strategic alternatives, 
                our team is ready to provide confidential guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-[#47B5CB] hover:bg-[#3a9fb3] text-white px-8 py-6 text-lg"
                    data-testid="button-ma-cta-contact"
                  >
                    Schedule a Call
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/case-studies">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
                    data-testid="button-ma-case-studies"
                  >
                    View Case Studies
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
