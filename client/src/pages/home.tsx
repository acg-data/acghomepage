import { useState, useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  Activity,
  Globe, 
  Users, 
  Menu, 
  X,
  PieChart,
  Briefcase,
  ShieldCheck,
  Landmark,
  Cpu,
  Clock,
  Layout,
  Hexagon,
  Triangle,
  Circle,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter
} from 'lucide-react';

const COMPETITOR_DATA: Record<string, number[]> = {
  "Marketing Agency": [0.2, 0.95, 0.4, 0.1, 0.2, 0.1], 
  "Business Broker": [0.5, 0.3, 0.1, 0.95, 0.1, 0.2],
  "PE Firm": [0.95, 0.2, 0.2, 0.9, 0.4, 0.6],        
  "Recruiting Co": [0.1, 0.2, 0.1, 0.1, 0.95, 0.2],   
  "Tech Consulting": [0.2, 0.2, 0.95, 0.2, 0.2, 0.4],
  "Research Org": [0.1, 0.8, 0.2, 0.3, 0.1, 0.1]
};

const ARYO_DATA = [0.9, 0.9, 0.95, 0.8, 0.9, 0.95];

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
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const onScreen = useOnScreen(ref);

  useEffect(() => {
    if (!onScreen || hasAnimated) return;
    
    setHasAnimated(true);
    let startTime: number | null = null;
    let animationFrame: number;
    let cancelled = false;

    const animate = (timestamp: number) => {
      if (cancelled) return;
      if (startTime === null) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, onScreen, hasAnimated]);

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

function AryoLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 80 L40 10 L70 80" stroke="#274D8E" strokeWidth="8" strokeLinecap="square"/>
      <path d="M25 55 L55 55" stroke="#274D8E" strokeWidth="8"/>
      <rect x="75" y="50" width="6" height="30" fill="#ADD6DE" />
      <rect x="83" y="35" width="6" height="45" fill="#47B5CB" />
      <rect x="91" y="20" width="6" height="60" fill="#4EB9A7" />
    </svg>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-aryo-lightGrey' : 'bg-white border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <a href="#" className="flex-shrink-0 flex items-center gap-3 cursor-pointer" data-testid="link-home">
            <AryoLogo />
            <div className="flex flex-col leading-none">
              <span className="font-sans font-extrabold text-2xl tracking-wide text-aryo-deepBlue">ARYO</span>
              <span className="text-[0.65rem] font-sans font-bold tracking-[0.2em] text-aryo-greenTeal uppercase mt-0.5">Consulting Group</span>
            </div>
          </a>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-12">
              <a href="#sectors" className="text-aryo-deepBlue/70 hover:text-aryo-deepBlue transition-colors text-xs font-sans font-bold uppercase tracking-[0.15em]" data-testid="link-sectors">Sectors</a>
              <Link href="/case-studies" className="text-aryo-deepBlue/70 hover:text-aryo-deepBlue transition-colors text-xs font-sans font-bold uppercase tracking-[0.15em]" data-testid="link-case-studies">Case Studies</Link>
              <Link href="/insights" className="text-aryo-deepBlue/70 hover:text-aryo-deepBlue transition-colors text-xs font-sans font-bold uppercase tracking-[0.15em]" data-testid="link-insights">Insights</Link>
              <a href="#contact" className="text-aryo-deepBlue/70 hover:text-aryo-deepBlue transition-colors text-xs font-sans font-bold uppercase tracking-[0.15em]" data-testid="link-contact">Contact</a>
              <Link href="/login" className="bg-aryo-deepBlue text-white hover:bg-[#1a3668] px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-sm" data-testid="button-partner-login">
                Partner Login
              </Link>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-aryo-deepBlue p-2" data-testid="button-mobile-menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-aryo-lightGrey shadow-xl">
          <div className="px-6 pt-4 pb-8 space-y-4">
            <a href="#sectors" className="block text-sm font-sans uppercase tracking-widest text-aryo-deepBlue" data-testid="link-sectors-mobile">Sectors</a>
            <Link href="/case-studies" className="block text-sm font-sans uppercase tracking-widest text-aryo-deepBlue" data-testid="link-case-studies-mobile">Case Studies</Link>
            <Link href="/insights" className="block text-sm font-sans uppercase tracking-widest text-aryo-deepBlue" data-testid="link-insights-mobile">Insights</Link>
            <a href="#contact" className="block text-sm font-sans uppercase tracking-widest text-aryo-deepBlue" data-testid="link-contact-mobile">Contact</a>
            <Link href="/login" className="block text-sm font-sans uppercase tracking-widest font-bold text-aryo-teal" data-testid="link-partner-login-mobile">Partner Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const clients = [
    { name: "MERIDIAN GROUP", icon: <Globe size={18} /> },
    { name: "SOVEREIGN CAPITAL", icon: <Landmark size={18} /> },
    { name: "APEX GLOBAL", icon: <Triangle size={18} /> },
    { name: "VANGUARD SYSTEMS", icon: <ShieldCheck size={18} /> },
    { name: "HORIZON ENERGY", icon: <Circle size={18} /> },
    { name: "STIRLING FINANCIAL", icon: <Briefcase size={18} /> },
    { name: "NEXUS HEALTH", icon: <Activity size={18} /> },
    { name: "OMEGA LOGISTICS", icon: <Hexagon size={18} /> },
  ];

  return (
    <div className="relative pt-40 pb-24 bg-aryo-offWhite border-b border-aryo-lightGrey overflow-hidden">
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 800" className="h-full w-full">
           <path d="M0 800 L200 0 L200 800 Z" fill="#274D8E" />
           <path d="M50 800 L200 200 L200 800 Z" fill="#47B5CB" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-aryo-greenTeal"></div>
            <span className="text-xs font-bold font-sans text-aryo-deepBlue tracking-[0.25em] uppercase">
              Results-Driven Consulting
            </span>
          </div>
        </FadeIn>
        
        <FadeIn delay={200}>
          <h1 className="text-4xl md:text-6xl font-serif text-aryo-deepBlue tracking-tight mb-8 leading-[1.15] max-w-4xl">
            The Modern Consulting Firm that actually{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aryo-deepBlue to-aryo-greenTeal">
              delivers results.
            </span>
          </h1>
        </FadeIn>
        
        <FadeIn delay={300}>
          <div className="max-w-2xl mb-10">
            <p className="text-xl md:text-2xl text-slate-600 mb-6 leading-relaxed font-sans font-light">
              Traditional consulting has failed. It's expensive, vague, and puts the firm, not the client, first.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed font-sans">
              At ACG, we work to build the modern operating system and framework of the business. We align incentives to see you grow well before we do.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={350}>
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mb-12">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-aryo-greenTeal rounded-full"></div>
              <span className="text-aryo-deepBlue font-sans font-medium">No hourly billing bloat.</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-aryo-greenTeal rounded-full"></div>
              <span className="text-aryo-deepBlue font-sans font-medium">No vague 100-page slide decks.</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-aryo-greenTeal rounded-full"></div>
              <span className="text-aryo-deepBlue font-sans font-medium">Deployed systems & infrastructure.</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-aryo-greenTeal rounded-full"></div>
              <span className="text-aryo-deepBlue font-sans font-medium">Outcome-based execution.</span>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={400}>
          <div className="flex flex-col sm:flex-row gap-6 flex-wrap">
            <a href="#contact" className="bg-aryo-deepBlue text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1a3668] transition-all shadow-lg shadow-aryo-deepBlue/20 flex items-center gap-3 group" data-testid="button-request-briefing">
              Get Started
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </a>
            <a 
              href="/api/report/q4-2024" 
              download
              className="bg-white text-aryo-deepBlue border border-aryo-lightGrey px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:border-aryo-deepBlue hover:bg-aryo-offWhite transition-all inline-block text-center" 
              data-testid="button-view-report"
            >
              View Q4 Market Report
            </a>
          </div>
        </FadeIn>

        <div className="mt-20 border-y border-aryo-lightGrey py-8 overflow-hidden bg-white/50 backdrop-blur-sm relative">
           <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-aryo-offWhite to-transparent z-10"></div>
           <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-aryo-offWhite to-transparent z-10"></div>
           
           <div className="flex gap-20 animate-marquee whitespace-nowrap items-center">
              <div className="flex gap-20 items-center shrink-0">
                {clients.map((client, i) => (
                  <div key={i} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default">
                    <div className="text-aryo-deepBlue">{client.icon}</div>
                    <span className="text-sm font-bold text-aryo-deepBlue tracking-[0.15em] font-sans">{client.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-20 items-center shrink-0">
                {clients.map((client, i) => (
                  <div key={`dup-${i}`} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default">
                    <div className="text-aryo-deepBlue">{client.icon}</div>
                    <span className="text-sm font-bold text-aryo-deepBlue tracking-[0.15em] font-sans">{client.name}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function RadarChart() {
  const [competitor, setCompetitor] = useState("Marketing Agency");
  const size = 400;
  const center = size / 2;
  const radius = 120;
  const levels = 4;
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  
  const levers = [
    { label: "Capital" },
    { label: "Market" },
    { label: "Digital" },
    { label: "M&A" },
    { label: "Talent" },
    { label: "Governance" }
  ];

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2;
    const x = center + Math.cos(angle) * radius * value;
    const y = center + Math.sin(angle) * radius * value;
    return `${x},${y}`;
  };

  const polyCompetitor = COMPETITOR_DATA[competitor].map((v, i) => getPoint(i, v)).join(" ");
  const polyAryo = ARYO_DATA.map((v, i) => getPoint(i, v)).join(" ");

  return (
    <div className="flex flex-col items-center">
      <div className="mb-10 w-full text-center">
        <p className="text-xs font-bold text-aryo-greenTeal uppercase tracking-[0.2em] mb-4">Compare Our Model</p>
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {Object.keys(COMPETITOR_DATA).map((key) => (
            <button
              key={key}
              onClick={() => setCompetitor(key)}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all font-sans rounded-sm border ${competitor === key ? 'bg-aryo-deepBlue text-white border-aryo-deepBlue' : 'bg-white text-slate-500 border-aryo-lightGrey hover:border-aryo-deepBlue hover:text-aryo-deepBlue'}`}
              data-testid={`button-compare-${key.toLowerCase().replace(/\s+/g, '-')}`}
            >
              vs. {key}
            </button>
          ))}
        </div>
      </div>

      <div ref={ref} className="relative w-full max-w-md mx-auto aspect-square bg-white border border-aryo-lightGrey p-8 shadow-sm">
        <div className="absolute top-4 left-4 text-xs font-bold text-aryo-deepBlue uppercase tracking-wider">Operational Alpha</div>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full font-sans">
          {[...Array(levels)].map((_, i) => {
            const r = (radius / levels) * (i + 1);
            const points = levers.map((_, j) => {
               const angle = (Math.PI * 2 * j) / 6 - Math.PI / 2;
               return `${center + Math.cos(angle) * r},${center + Math.sin(angle) * r}`;
            }).join(" ");
            return <polygon key={i} points={points} fill="none" stroke="#E2E8F0" strokeWidth="1" />;
          })}

          {levers.map((_, i) => {
             const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
             return (
               <line 
                 key={i} 
                 x1={center} 
                 y1={center} 
                 x2={center + Math.cos(angle) * radius} 
                 y2={center + Math.sin(angle) * radius} 
                 stroke="#E2E8F0" 
                 strokeWidth="1" 
               />
             );
          })}

          <polygon 
            points={polyCompetitor} 
            fill="#CECECE" 
            fillOpacity="0.2"
            stroke="#CECECE" 
            strokeWidth="2" 
            strokeDasharray="4 2"
            className="transition-all duration-700 ease-out"
          />
          
          <polygon 
            points={polyAryo} 
            fill="url(#gradientAryo)" 
            fillOpacity="0.3"
            stroke="#274D8E" 
            strokeWidth="2"
            className={`origin-center ${onScreen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
            style={{ transition: 'all 2000ms ease-out' }}
          />
          
          <defs>
            <linearGradient id="gradientAryo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#274D8E" />
              <stop offset="100%" stopColor="#4EB9A7" />
            </linearGradient>
          </defs>

          {levers.map((lever, i) => {
            const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
            const labelR = radius + 35; 
            const x = center + Math.cos(angle) * labelR;
            const y = center + Math.sin(angle) * labelR;
            
            return (
              <foreignObject key={i} x={x - 45} y={y - 15} width="90" height="30">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-[10px] font-bold text-aryo-deepBlue uppercase tracking-[0.1em] bg-white px-2 py-0.5 border border-aryo-lightGrey rounded-sm">
                    {lever.label}
                  </div>
                </div>
              </foreignObject>
            );
          })}
        </svg>
        
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-white/90 p-2 border border-aryo-lightGrey">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-aryo-deepBlue"></div>
            <span className="text-aryo-deepBlue font-bold uppercase tracking-wider text-[10px]">Aryo Standard</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-aryo-lightGrey"></div>
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">{competitor}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueDrivers() {
  const drivers = [
    { title: "Financial Engineering", desc: "Optimizing unit economics, capital allocation, and forecasting accuracy.", icon: Landmark },
    { title: "Market Positioning", desc: "Clarifying brand authority and reducing Customer Acquisition Cost (CAC).", icon: Globe },
    { title: "Digital Infrastructure", desc: "Modernizing stack architecture to reduce technical debt and cyber risk.", icon: Briefcase },
    { title: "M&A Strategy", desc: "Buy-side diligence, post-merger integration, and synergy realization.", icon: PieChart },
    { title: "Talent Governance", desc: "Increasing leadership density and aligning compensation with equity value.", icon: Users },
    { title: "Operational Risk", desc: "Codifying workflows to reduce reliance on tribal knowledge.", icon: ShieldCheck },
  ];

  return (
    <div id="methodology" className="py-32 bg-white border-b border-aryo-lightGrey">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <FadeIn>
            <div className="mb-8">
              <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase">
                Strategic Framework
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-aryo-deepBlue mb-8 leading-tight">
              The Polytope of <br/>
              <span className="text-aryo-teal">Value Creation.</span>
            </h2>
            <p className="text-xl text-slate-600 mb-12 font-sans leading-relaxed font-light">
              We reject the siloed approach of traditional firms. True enterprise value is unlocked only when financial, operational, and technical levers are pulled in unison.
            </p>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
              {drivers.map((d, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="text-aryo-lightGrey group-hover:text-aryo-deepBlue transition-colors duration-500 pt-1">
                    <d.icon size={24} strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-aryo-deepBlue text-lg mb-2">{d.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-sans">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <div className="p-8 bg-aryo-offWhite border border-aryo-lightGrey">
             <RadarChart />
          </div>
        </div>
      </div>
    </div>
  );
}

function Industries() {
  const sectors = [
    { name: "Fintech & Payments", desc: "Regulatory arbitrage, legacy modernization, and fraud operations.", active: true },
    { name: "SaaS & Enterprise Software", desc: "Churn reduction, CAC optimization, and sales engineering.", active: false },
    { name: "Precision Manufacturing", desc: "Supply chain resilience, IoT integration, and inventory turns.", active: false },
    { name: "Healthcare Services", desc: "Revenue cycle management, provider M&A, and compliance.", active: false },
  ];

  return (
    <div id="sectors" className="py-32 bg-aryo-offWhite border-b border-aryo-lightGrey">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
           <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase">Sector Expertise</span>
           <h2 className="text-4xl font-serif text-aryo-deepBlue mt-4 mb-6">Vertical Specialization</h2>
           <p className="text-slate-600 max-w-2xl text-lg font-light">We do not deploy generalists. Our practice leaders possess deep operational experience in highly regulated and technically complex industries.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {sectors.map((s, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className={`h-full p-8 border transition-all duration-300 group cursor-pointer ${s.active ? 'bg-aryo-deepBlue border-aryo-deepBlue' : 'bg-white border-aryo-lightGrey hover:border-aryo-greenTeal'}`} data-testid={`card-sector-${i}`}>
                <div className={`mb-6 p-3 inline-block rounded-sm ${s.active ? 'bg-white/10 text-white' : 'bg-aryo-offWhite text-aryo-deepBlue'}`}>
                  <Layout size={24} />
                </div>
                <h3 className={`text-lg font-serif font-bold mb-4 ${s.active ? 'text-white' : 'text-aryo-deepBlue'}`}>{s.name}</h3>
                <p className={`text-sm leading-relaxed ${s.active ? 'text-white/80' : 'text-slate-500'}`}>{s.desc}</p>
                <div className={`mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${s.active ? 'text-aryo-greenTeal' : 'text-aryo-deepBlue opacity-0 group-hover:opacity-100 transition-opacity'}`}>
                  View Case Studies <ArrowRight size={12} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}

function Process() {
  const steps = [
    { phase: "Phase I", title: "Diagnostic & Audit", time: "Weeks 1-4", desc: "Full forensic audit of unit economics, tech stack, and leadership gaps." },
    { phase: "Phase II", title: "Strategic Architecture", time: "Weeks 5-8", desc: "Designing the target operating model and governance frameworks." },
    { phase: "Phase III", title: "Execution & Deployment", time: "Weeks 9-24", desc: "Interim executive placement and rapid implementation of growth drivers." },
    { phase: "Phase IV", title: "Handover & Governance", time: "Ongoing", desc: "Establishing KPIs and board-level reporting structures for long-term sustainability." },
  ];

  return (
    <div id="process" className="py-32 bg-white border-b border-aryo-lightGrey">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase">The Engagement Model</span>
            <h2 className="text-4xl font-serif text-aryo-deepBlue mt-4">Predictable Transformation</h2>
          </div>
          <p className="text-slate-600 max-w-xl text-lg font-light md:text-right">
            We operate on a fixed-timeline engagement model. No open-ended retainers. Just clear milestones and delivered outcomes.
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
    { value: 127, suffix: "+", label: "Engagements Completed" },
    { value: 4, suffix: ".2B", label: "Enterprise Value Unlocked" },
    { value: 94, suffix: "%", label: "Client Retention Rate" },
    { value: 18, suffix: "+", label: "Years Average Partner Experience" },
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

function Testimonials() {
  const testimonials = [
    {
      quote: "ARYO's integrated approach transformed how we think about growth. They didn't just consult—they operated alongside us during a critical M&A integration.",
      author: "Sarah Chen",
      title: "CEO, Meridian Group",
    },
    {
      quote: "The depth of financial and operational analysis was unlike anything we'd seen from other firms. They found $12M in trapped value within the first 60 days.",
      author: "Michael Torres",
      title: "CFO, Apex Global",
    },
  ];

  return (
    <div className="py-32 bg-aryo-offWhite border-b border-aryo-lightGrey">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase">Client Perspectives</span>
          <h2 className="text-4xl font-serif text-aryo-deepBlue mt-4">Trusted by Leaders</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div className="bg-white p-10 border border-aryo-lightGrey">
                <div className="text-aryo-lightBlue mb-6">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M10 25C10 20.5 13 17 17 17V13C11 13 6 18 6 25V33H14V25H10Z" fill="currentColor"/>
                    <path d="M26 25C26 20.5 29 17 33 17V13C27 13 22 18 22 25V33H30V25H26Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-xl text-aryo-deepBlue font-serif italic mb-8 leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-aryo-deepBlue rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {t.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-aryo-deepBlue">{t.author}</p>
                    <p className="text-sm text-slate-500">{t.title}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
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
    <div id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase">Begin The Conversation</span>
            <h2 className="text-4xl md:text-5xl font-serif text-aryo-deepBlue mt-4 mb-6 leading-tight">
              Ready to Unlock <br/>
              <span className="text-aryo-teal">Enterprise Value?</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 font-light leading-relaxed">
              Schedule a confidential executive briefing with our Managing Partners. We'll provide an initial diagnostic assessment of your operational levers at no obligation.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 text-aryo-deepBlue">
                <Mail size={20} className="text-aryo-greenTeal" />
                <span className="font-sans">partners@aryoconsulting.com</span>
              </div>
              <div className="flex items-center gap-4 text-aryo-deepBlue">
                <Phone size={20} className="text-aryo-greenTeal" />
                <span className="font-sans">+1 (646) 555-0142</span>
              </div>
              <div className="flex items-center gap-4 text-aryo-deepBlue">
                <MapPin size={20} className="text-aryo-greenTeal" />
                <span className="font-sans">New York | London | Singapore</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="bg-aryo-offWhite border border-aryo-lightGrey p-10">
              <h3 className="text-xl font-serif font-bold text-aryo-deepBlue mb-6">Request a Briefing</h3>
              
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
                  <label className="block text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-2">Corporate Email</label>
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
                  <label className="block text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-2">Company</label>
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
                  <label className="block text-xs font-bold text-aryo-deepBlue uppercase tracking-widest mb-2">Message</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-aryo-lightGrey bg-white focus:border-aryo-deepBlue focus:outline-none transition-colors resize-none"
                    data-testid="input-message"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-aryo-deepBlue text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1a3668] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-submit-form"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
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
            <div className="flex items-center gap-3 mb-6">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 80 L40 10 L70 80" stroke="white" strokeWidth="8" strokeLinecap="square"/>
                <path d="M25 55 L55 55" stroke="white" strokeWidth="8"/>
                <rect x="75" y="50" width="6" height="30" fill="#ADD6DE" />
                <rect x="83" y="35" width="6" height="45" fill="#47B5CB" />
                <rect x="91" y="20" width="6" height="60" fill="#4EB9A7" />
              </svg>
              <span className="font-sans font-extrabold text-xl tracking-wide text-white">ARYO</span>
            </div>
            <p className="text-aryo-lightBlue/70 text-sm leading-relaxed">
              Corporate strategy and governance consulting for enterprise transformation.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">Financial Engineering</a></li>
              <li><a href="#" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">M&A Advisory</a></li>
              <li><a href="#" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">Digital Transformation</a></li>
              <li><a href="#" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">Governance & Risk</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">About Us</a></li>
              <li><a href="#" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">Our Team</a></li>
              <li><a href="#" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 border border-aryo-lightBlue/30 flex items-center justify-center text-aryo-lightBlue hover:bg-white/10 transition-colors" data-testid="link-linkedin">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-aryo-lightBlue/30 flex items-center justify-center text-aryo-lightBlue hover:bg-white/10 transition-colors" data-testid="link-twitter">
                <Twitter size={18} />
              </a>
            </div>
            <p className="text-aryo-lightBlue/50 text-xs">
              Subscribe to our quarterly insights
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-aryo-lightBlue/50 text-xs">
            2024 ARYO Consulting Group. All rights reserved.
          </p>
          <div className="flex gap-8 flex-wrap justify-center">
            <a href="#" className="text-aryo-lightBlue/50 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-aryo-lightBlue/50 hover:text-white text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-aryo-lightBlue/50 hover:text-white text-xs transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Industries />
      <ValueDrivers />
      <Process />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
