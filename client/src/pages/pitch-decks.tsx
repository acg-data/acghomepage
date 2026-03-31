import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'wouter';
import { SEO, breadcrumbSchema, serviceSchema, faqSchema } from '@/components/seo';
import { Navbar } from '@/components/layout';

import acmeDeck from '@assets/Acme+Deck_1769021448733.png';
import optHealthDeck from '@assets/OptHealth+Deck_1769021448733.png';
import jedvaDeck from '@assets/Pitch+Deck_1769021448734.png';
import healthcareDeck from '@assets/State+of+Digital+Healthcare+in+US_1769021448734.png';
import foodTechDeck from '@assets/Venture_Food_Tech_Analysis_1769021448735.jpeg';
import { 
  ArrowRight, 
  Layout,
  Palette,
  Zap,
  Target,
  BarChart3,
  Rocket,
  Clock,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Award,
  ShieldCheck,
  Check,
  Building2,
  TrendingUp,
  ChevronDown,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiInstagram } from 'react-icons/si';

function useOnScreen(ref: React.RefObject<HTMLElement | null>, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect(); 
        }
      },
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  
  return isIntersecting;
}

function AnimatedNumber({ end, suffix = "", duration = 2500, className = "" }: { end: number; suffix?: string; duration?: number; className?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);
  const onScreen = useOnScreen(ref);

  useEffect(() => {
    if (!onScreen || hasAnimatedRef.current) return;
    
    hasAnimatedRef.current = true;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, onScreen]);

  return <span ref={ref} className={`font-serif tracking-tight ${className || 'text-aryo-deepBlue'}`}>{count}{suffix}</span>;
}

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref, "-50px");
  
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${onScreen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function AryoLogo({ size = 96, className = "" }: { size?: number; className?: string }) {
  return (
    <img 
      src="/api/aryo-logo" 
      alt="Aryo Consulting Group" 
      width={size} 
      height={size} 
      className={`object-contain ${className}`}
      data-testid="img-aryo-logo"
    />
  );
}

const sampleDecks = [
  { 
    image: acmeDeck, 
    title: "Acme Deck", 
    description: "" 
  },
  { 
    image: optHealthDeck, 
    title: "OptHealth Deck", 
    description: "" 
  },
  { 
    image: jedvaDeck, 
    title: "JEDVA Deck", 
    description: "" 
  },
  { 
    image: healthcareDeck, 
    title: "State of Digital Healthcare in US", 
    description: "" 
  },
  { 
    image: foodTechDeck, 
    title: "Food Tech Analysis", 
    description: "" 
  },
];

function SampleDecksCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <div className="py-20 bg-white border-b border-aryo-lightGrey">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase">Portfolio</span>
          <h2 className="text-4xl font-serif text-aryo-deepBlue mt-4 mb-4">Sample Pitch Decks</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
            A selection of pitch decks we've crafted for clients across industries.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {sampleDecks.map((deck, i) => (
                <div 
                  key={i} 
                  className="flex-[0_0_100%] md:flex-[0_0_85%] lg:flex-[0_0_70%] min-w-0 px-4"
                >
                  <div className="bg-aryo-offWhite border border-aryo-lightGrey rounded-lg overflow-hidden shadow-lg">
                    <div className="relative aspect-[16/9]">
                      <img 
                        src={deck.image} 
                        alt={deck.title}
                        className="w-full h-full object-cover"
                        data-testid={`img-sample-deck-${i}`}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold text-aryo-deepBlue mb-2">{deck.title}</h3>
                      {deck.description && (
                        <p className="text-slate-500 text-sm leading-relaxed">{deck.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm border border-aryo-lightGrey rounded-full flex items-center justify-center text-aryo-deepBlue hover:bg-white hover:border-aryo-deepBlue transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10"
            data-testid="button-carousel-prev"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm border border-aryo-lightGrey rounded-full flex items-center justify-center text-aryo-deepBlue hover:bg-white hover:border-aryo-deepBlue transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10"
            data-testid="button-carousel-next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {sampleDecks.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`w-3 h-3 rounded-full transition-all ${selectedIndex === i ? 'bg-aryo-deepBlue scale-110' : 'bg-aryo-lightGrey hover:bg-aryo-teal'}`}
              data-testid={`button-dot-${i}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    email: '',
    phone: '',
    details: '',
    agreedToTerms: false
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const serviceOptions = [
    "Investor Pitch Deck",
    "Sales Deck",
    "Corporate Presentation",
    "M&A & Strategy Deck",
    "Startup Pitch Deck",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      setSubmitStatus({ success: false, message: 'Please agree to the terms and conditions.' });
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Service: ${formData.service}\nPhone: ${formData.phone}\n\nProject Details: ${formData.details || 'Not provided'}\n\nPitch Deck Inquiry from hero form.`
        })
      });
      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus({ success: true, message: 'Thank you! We\'ll be in touch within 24 hours.' });
        setFormData({ service: '', name: '', email: '', phone: '', details: '', agreedToTerms: false });
      } else {
        setSubmitStatus({ success: false, message: data.message || 'Failed to submit. Please try again.' });
      }
    } catch {
      setSubmitStatus({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative pt-40 pb-24 bg-aryo-offWhite border-b border-aryo-lightGrey overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 800" className="h-full w-full">
          <path d="M0 800 L200 0 L200 800 Z" fill="#274D8E" />
          <path d="M50 800 L200 200 L200 800 Z" fill="#47B5CB" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: Value Props - Takes 3 of 5 columns */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 text-sm font-semibold">
            <div className="flex items-center gap-3">
              <Award className="text-aryo-greenTeal w-10 h-10" />
              <div className="leading-tight">
                <div className="text-aryo-deepBlue">200+ PITCH DECKS</div>
                <div className="text-slate-500">DELIVERED</div>
              </div>
            </div>
            
            <div className="w-px h-10 bg-aryo-lightGrey hidden md:block"></div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-aryo-greenTeal w-10 h-10" />
              <div className="leading-tight">
                <div className="text-aryo-deepBlue">85% FUNDING</div>
                <div className="text-slate-500">SUCCESS RATE</div>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-aryo-deepBlue">
            World Class Investor<br/>
            Presentations to<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aryo-deepBlue to-aryo-greenTeal">Get Funded Fast</span>
          </h1>

          {/* Subtext */}
          <p className="text-slate-600 text-lg max-w-xl leading-relaxed">
            With over a decade of experience crafting investor presentations, our team transforms complex ideas into compelling visual stories. 
            <span className="font-bold text-aryo-deepBlue"> We help startups and enterprises raise capital and close deals.</span>
          </p>

          {/* Service Circles - 2 rows of 3 */}
          <div className="grid grid-cols-3 gap-4 max-w-md">
            {[
              { name: "Investor Decks", icon: Rocket },
              { name: "Sales Presentations", icon: Target },
              { name: "Corporate Presentations", icon: Building2 },
              { name: "M&A Presentation", icon: TrendingUp },
              { name: "Brand Design", icon: Palette },
              { name: "Data Visualization", icon: BarChart3 }
            ].map((service, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-aryo-deepBlue flex items-center justify-center mb-2">
                  <service.icon size={24} className="text-white" />
                </div>
                <span className="text-xs font-medium text-aryo-deepBlue leading-tight">{service.name}</span>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: Taller Lead Capture Form - Takes 2 of 5 columns */}
        <div className="lg:col-span-2">
          <div className="bg-aryo-deepBlue p-8 rounded-xl shadow-xl max-w-md mx-auto lg:mx-0">
            
            {/* Form Header */}
            <div className="text-center mb-6">
              <p className="text-base text-white/80">Schedule your <span className="font-bold border-b-2 border-aryo-greenTeal">FREE</span></p>
              <h3 className="text-xl font-serif font-bold text-white mt-2">Consultation Today!</h3>
            </div>

            {submitStatus && (
              <div className={`mb-4 p-3 rounded text-sm ${submitStatus.success ? 'bg-green-500/20 border border-green-400/50 text-green-200' : 'bg-red-500/20 border border-red-400/50 text-red-200'}`} data-testid="status-hero-form">
                {submitStatus.message}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              
              {/* Service Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full h-12 px-4 rounded text-sm text-left bg-white flex items-center justify-between"
                  data-testid="select-hero-service"
                >
                  <span className={formData.service ? 'text-slate-800' : 'text-slate-400'}>
                    {formData.service || 'Choose Service*'}
                  </span>
                  <ChevronDown className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} size={18} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white rounded shadow-lg border border-slate-200 max-h-48 overflow-y-auto">
                    {serviceOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, service: option });
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-slate-700 hover:bg-aryo-deepBlue/10 text-sm"
                        data-testid={`option-hero-${option.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <input 
                type="text" 
                placeholder="Name*" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-12 px-4 rounded text-sm text-slate-800 bg-white border-none focus:ring-2 focus:ring-aryo-teal focus:outline-none placeholder:text-slate-400"
                data-testid="input-hero-name"
              />

              <input 
                type="email" 
                placeholder="Email*"
                required 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-12 px-4 rounded text-sm text-slate-800 bg-white border-none focus:ring-2 focus:ring-aryo-teal focus:outline-none placeholder:text-slate-400"
                data-testid="input-hero-email"
              />

              <input 
                type="tel" 
                placeholder="Phone Number*" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-12 px-4 rounded text-sm text-slate-800 bg-white border-none focus:ring-2 focus:ring-aryo-teal focus:outline-none placeholder:text-slate-400"
                data-testid="input-hero-phone"
              />

              <textarea 
                placeholder="Tell us about your project (optional)"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded text-sm text-slate-800 bg-white border-none focus:ring-2 focus:ring-aryo-teal focus:outline-none placeholder:text-slate-400 resize-none"
                data-testid="input-hero-details"
              />

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, agreedToTerms: !formData.agreedToTerms })}
                  className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${formData.agreedToTerms ? 'bg-aryo-greenTeal border-aryo-greenTeal' : 'bg-white/20 border-white/50'}`}
                  data-testid="checkbox-hero-terms"
                >
                  {formData.agreedToTerms && <Check size={12} className="text-white" />}
                </button>
                <p className="text-xs text-white/60 leading-tight">
                  By submitting you agree to our terms and privacy policy.
                </p>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-aryo-greenTeal hover:bg-aryo-teal text-white font-bold py-4 rounded text-base transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                data-testid="button-hero-submit"
              >
                {isSubmitting ? 'Submitting...' : 'Get FREE Consultation'}
              </button>

            </form>

            {/* Social Proof Footer */}
            <div className="mt-6 flex justify-center items-center gap-4 border-t border-white/20 pt-4">
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <span className="text-[10px] text-white/70 ml-1">4.9</span>
              </div>
              <div className="w-px h-5 bg-white/20"></div>
              <span className="text-[10px] text-white/70">500+ Clients</span>
              <div className="w-px h-5 bg-white/20"></div>
              <span className="text-[10px] text-white/70">$500M+ Raised</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

function Services() {
  const services = [
    { 
      name: "Investor Pitch Decks", 
      tagline: "Raise capital confidently",
      desc: "From pre-seed to Series A and beyond, we build pitch decks that capture investor attention and close funding rounds.",
      icon: Rocket
    },
    { 
      name: "Sales Decks", 
      tagline: "Close more deals",
      desc: "Persuasive presentations that communicate your value proposition clearly and help your sales team win.",
      icon: Target
    },
    { 
      name: "Corporate Presentations", 
      tagline: "Communicate with clarity",
      desc: "Board meetings, quarterly reviews, and stakeholder updates designed to inform and impress.",
      icon: Layout
    },
    { 
      name: "M&A & Strategy Decks", 
      tagline: "Strategic storytelling",
      desc: "Investment memorandums, acquisition pitches, and strategic planning presentations that drive decisions.",
      icon: BarChart3
    },
  ];

  return (
    <div className="py-32 bg-aryo-offWhite border-b border-aryo-lightGrey">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 text-center">
           <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase">What We Build</span>
           <h2 className="text-4xl font-serif text-aryo-deepBlue mt-4 mb-6">Pitch Deck Services</h2>
           <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">Every project is unique. Our approach adapts to your goals, audience, and growth stage.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={i} delay={i * 100}>
                <div className="h-full p-6 border transition-all duration-300 group bg-white border-aryo-lightGrey hover:border-aryo-greenTeal" data-testid={`card-service-${i}`}>
                  <div className="mb-4 p-3 inline-block rounded-sm bg-aryo-offWhite text-aryo-deepBlue group-hover:bg-aryo-deepBlue group-hover:text-white transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-serif font-bold mb-2 text-aryo-deepBlue">{s.name}</h3>
                  <p className="text-sm font-medium mb-3 text-aryo-teal">{s.tagline}</p>
                  <p className="text-sm leading-relaxed text-slate-500">{s.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Process() {
  const steps = [
    { phase: "Phase I", title: "Discovery & Strategy", time: "Days 1-2", desc: "Deep dive into your business, market, and fundraising goals. Competitor analysis and investor research." },
    { phase: "Phase II", title: "Narrative & Structure", time: "Days 3-4", desc: "Craft your story arc, key messaging, and slide structure for maximum impact." },
    { phase: "Phase III", title: "Design & Refinement", time: "Days 5-7", desc: "Visual design, data visualization, and iterative refinements based on your feedback." },
    { phase: "Phase IV", title: "Delivery & Support", time: "Day 8+", desc: "Final deck delivery in multiple formats, plus coaching tips for your pitch presentation." },
  ];

  return (
    <div className="py-32 bg-white border-b border-aryo-lightGrey">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase">Our Process</span>
            <h2 className="text-4xl font-serif text-aryo-deepBlue mt-4">From Story to Success</h2>
          </div>
          <p className="text-slate-600 max-w-xl text-lg font-light md:text-right">
            A proven 1-2 week process that delivers investor-ready decks without endless back-and-forth.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-aryo-lightGrey"></div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 200}>
                <div className="relative bg-white pt-8 group">
                  <div className="absolute top-0 left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-white border-2 border-aryo-deepBlue rounded-full z-10 group-hover:scale-125 group-hover:bg-aryo-greenTeal group-hover:border-aryo-greenTeal transition-all"></div>
                  <div className="text-xs font-bold text-aryo-teal uppercase tracking-widest mb-2 flex items-center gap-2 flex-wrap">
                    <Clock size={12} /> {step.time}
                  </div>
                  <span className="text-[10px] font-bold text-aryo-deepBlue/50 uppercase tracking-[0.2em]">{step.phase}</span>
                  <h3 className="text-xl font-serif font-bold text-aryo-deepBlue mt-2 mb-4">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stats() {
  const stats = [
    { value: 200, suffix: "+", label: "Pitch Decks Delivered" },
    { value: 85, suffix: "%", label: "Funding Success Rate" },
    { value: 50, suffix: "M+", label: "Capital Raised" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
  ];

  return (
    <div className="py-24 bg-aryo-deepBlue">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-serif mb-2">
                  <AnimatedNumber end={stat.value} suffix={stat.suffix} className="text-white" />
                </div>
                <p className="text-xs font-bold text-aryo-lightBlue uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhyUs() {
  const reasons = [
    {
      title: "Story-First Design",
      description: "Every slide is strategically crafted to build your narrative. We use proven storytelling techniques that resonate with investors."
    },
    {
      title: "Data Visualization",
      description: "Complex data made beautiful. We transform metrics and projections into compelling visuals that tell your growth story."
    },
    {
      title: "Investor Psychology",
      description: "We understand what VCs and angels look for. Our decks address key concerns and highlight what matters most to investors."
    },
    {
      title: "Presentation Ready",
      description: "Optimized for live pitches, PDF sharing, and virtual meetings. Your deck works flawlessly in any format."
    },
    {
      title: "Rapid Turnaround",
      description: "Fundraising moves fast. We deliver polished decks quickly without sacrificing quality or attention to detail."
    },
    {
      title: "Brand Aligned",
      description: "We don't use templates. Every pitch deck is custom-designed to reflect your brand identity and unique value proposition."
    },
  ];

  return (
    <div className="py-32 bg-aryo-offWhite border-b border-aryo-lightGrey">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase">The Aryo Difference</span>
          <h2 className="text-4xl font-serif text-aryo-deepBlue mt-4 mb-6">Why Choose Us</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="flex gap-4" data-testid={`reason-${i}`}>
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-aryo-greenTeal" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-aryo-deepBlue mb-2">{reason.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{reason.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const testimonials = [
    {
      quote: "Justin is great! We're a biotech therapeutics company. Justin did an amazing job upgrading our pitch deck. He has outstanding judgement and creativity regarding content and style. Highly recommended!",
      author: "John Ramunas",
      title: "CEO, Rejuvenation Technologies Inc.",
    },
    {
      quote: "Justin at Aryo Consulting provided invaluable guidance for Mosspark Media's startup journey. Expert advice and actionable strategies. Highly recommend!",
      author: "Kamil Qui",
      title: "CEO, Mosspark Media",
    },
    {
      quote: "Very thorough and really built the case with deep research. Highly professional. Justin took the time to work through a number of iterations of the project and maintained outstanding communication.",
      author: "Riggs Eckelberry",
      title: "CEO, OriginalClear Inc.",
    },
  ];

  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="py-32 bg-white border-b border-aryo-lightGrey">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase">Client Perspectives</span>
          <h2 className="text-4xl font-serif text-aryo-deepBlue mt-4">Trusted by Leaders</h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0">
                  <div className="bg-aryo-offWhite p-10 border border-aryo-lightGrey h-full flex flex-col">
                    <div className="text-aryo-lightBlue mb-6">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M10 25C10 20.5 13 17 17 17V13C11 13 6 18 6 25V33H14V25H10Z" fill="currentColor"/>
                        <path d="M26 25C26 20.5 29 17 33 17V13C27 13 22 18 22 25V33H30V25H26Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <p className="text-xl text-aryo-deepBlue font-serif italic leading-relaxed flex-1">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-aryo-lightGrey">
                      <div className="w-12 h-12 bg-aryo-deepBlue rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {t.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-aryo-deepBlue">{t.author}</p>
                        <p className="text-sm text-slate-500">{t.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="border-aryo-deepBlue text-aryo-deepBlue"
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="border-aryo-deepBlue text-aryo-deepBlue"
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CTA() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus({ success: true, message: data.message });
        setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' });
      } else {
        setSubmitStatus({ success: false, message: data.message || 'Failed to submit form' });
      }
    } catch {
      setSubmitStatus({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="py-32 bg-aryo-offWhite">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase">Start Your Project</span>
            <h2 className="text-4xl md:text-5xl font-serif text-aryo-deepBlue mt-4 mb-6 leading-tight">
              Ready to Create a <br/>
              <span className="text-aryo-teal">Pitch Deck that Wins?</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 font-light leading-relaxed">
              Tell us about your project and we'll provide a custom proposal within 48 hours. No commitment required.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 text-aryo-deepBlue">
                <Mail size={20} className="text-aryo-greenTeal" />
                <span className="font-sans">info@aryocg.com</span>
              </div>
              <div className="flex items-center gap-4 text-aryo-deepBlue">
                <Phone size={20} className="text-aryo-greenTeal" />
                <span className="font-sans">1 508-545-7447</span>
              </div>
              <div className="flex items-center gap-4 text-aryo-deepBlue">
                <MapPin size={20} className="text-aryo-greenTeal" />
                <span className="font-sans">Boston (HQ) | NYC | Miami (Coming Soon)</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="bg-white border border-aryo-lightGrey p-10">
              <h3 className="text-xl font-serif font-bold text-aryo-deepBlue mb-6">Request a Quote</h3>
              
              {submitStatus && (
                <div className={`mb-6 p-4 border ${submitStatus.success ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`} data-testid="status-form-result">
                  {submitStatus.message}
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-2">First Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-aryo-lightGrey bg-white focus:border-aryo-deepBlue focus:outline-none transition-colors"
                      data-testid="input-first-name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-2">Last Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-aryo-lightGrey bg-white focus:border-aryo-deepBlue focus:outline-none transition-colors"
                      data-testid="input-last-name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-aryo-lightGrey bg-white focus:border-aryo-deepBlue focus:outline-none transition-colors"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-2">Company / Project</label>
                  <input 
                    type="text" 
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-aryo-lightGrey bg-white focus:border-aryo-deepBlue focus:outline-none transition-colors"
                    data-testid="input-company"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-2">Tell Us About Your Project</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-aryo-lightGrey bg-white focus:border-aryo-deepBlue focus:outline-none transition-colors resize-none"
                    placeholder="What type of pitch deck do you need? Tell us about your fundraising goals."
                    data-testid="input-message"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-aryo-deepBlue text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1a3668] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-submit-form"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Quote'}
                  {!isSubmitting && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />}
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-aryo-deepBlue py-16 border-t border-aryo-deepBlue">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <AryoLogo size={80} className="brightness-0 invert" />
            </div>
            <p className="text-aryo-lightBlue/70 text-sm leading-relaxed">
              Compelling pitch decks and corporate strategy consulting for enterprise transformation.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6">Capabilities</h3>
            <ul className="space-y-3">
              <li><Link href="/capabilities" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">All Services</Link></li>
              <li><Link href="/industries" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">Industries</Link></li>
              <li><Link href="/case-studies" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">Case Studies</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link href="/insights" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">Insights</Link></li>
              <li><Link href="/careers" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="https://www.linkedin.com/company/aryo-consulting/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-aryo-lightBlue/30 flex items-center justify-center text-aryo-lightBlue hover:bg-white/10 transition-colors" data-testid="link-linkedin">
                <Linkedin size={18} />
              </a>
              <a href="https://www.instagram.com/aryoconsulting" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-aryo-lightBlue/30 flex items-center justify-center text-aryo-lightBlue hover:bg-white/10 transition-colors" data-testid="link-instagram">
                <SiInstagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-aryo-lightBlue/50 text-xs">
            2024 Aryo Consulting Group. All rights reserved.
          </p>
          <div className="flex gap-8 flex-wrap justify-center">
            <a href="#" className="text-aryo-lightBlue/50 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-aryo-lightBlue/50 hover:text-white text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function PitchDecks() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Pitch Deck Design Services | Aryo Consulting Group"
        description="Compelling pitch decks for startups and enterprises. Investor-ready design, compelling narratives, and data visualization expertise. Get a custom quote today."
        canonical="https://aryocg.com/pitch-decks"
        jsonLd={[
          serviceSchema({ name: "Pitch Deck Design Services", description: "Compelling pitch decks for startups and enterprises. Investor-ready design, compelling narratives, and data visualization expertise.", url: "https://aryocg.com/pitch-decks" }),
          faqSchema([
            { question: "How long does it take to create a pitch deck?", answer: "Typically 2-3 weeks from kickoff to final delivery, depending on complexity and revision cycles." },
            { question: "What industries do you create pitch decks for?", answer: "We create pitch decks across all industries including technology, healthcare, financial services, consumer goods, and more." },
            { question: "Do you help with the narrative and content strategy?", answer: "Yes. Our process begins with understanding your story, market positioning, and investor expectations to craft a compelling narrative before design begins." },
          ]),
          breadcrumbSchema([
            { name: "Home", url: "https://aryocg.com" },
            { name: "Pitch Deck Design", url: "https://aryocg.com/pitch-decks" },
          ]),
        ]}
      />
      <Navbar />
      <Hero />
      <SampleDecksCarousel />
      <Services />
      <Process />
      <Stats />
      <WhyUs />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
