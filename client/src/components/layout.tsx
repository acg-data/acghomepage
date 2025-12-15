import { Link } from 'wouter';
import { useState, useEffect } from 'react';
import { Menu, X, Linkedin } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';

export function Navbar() {
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
          <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer" data-testid="link-home">
            <img src="/api/aryo-logo" alt="Aryo Consulting Group" width={80} height={80} className="object-contain" data-testid="img-aryo-logo" />
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link href="/capabilities" className="text-aryo-deepBlue/70 hover:text-aryo-deepBlue transition-colors text-xs font-sans font-bold uppercase tracking-[0.15em]" data-testid="link-capabilities">Capabilities</Link>
              <Link href="/industries" className="text-aryo-deepBlue/70 hover:text-aryo-deepBlue transition-colors text-xs font-sans font-bold uppercase tracking-[0.15em]" data-testid="link-industries">Industries</Link>
              <Link href="/case-studies" className="text-aryo-deepBlue/70 hover:text-aryo-deepBlue transition-colors text-xs font-sans font-bold uppercase tracking-[0.15em]" data-testid="link-case-studies">Case Studies</Link>
              <Link href="/insights" className="text-aryo-deepBlue/70 hover:text-aryo-deepBlue transition-colors text-xs font-sans font-bold uppercase tracking-[0.15em]" data-testid="link-insights">Insights</Link>
              <Link href="/about" className="text-aryo-deepBlue/70 hover:text-aryo-deepBlue transition-colors text-xs font-sans font-bold uppercase tracking-[0.15em]" data-testid="link-about">About</Link>
              <Link href="/contact" className="text-aryo-deepBlue/70 hover:text-aryo-deepBlue transition-colors text-xs font-sans font-bold uppercase tracking-[0.15em]" data-testid="link-contact">Contact</Link>
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
            <Link href="/capabilities" className="block text-sm font-sans uppercase tracking-widest text-aryo-deepBlue" data-testid="link-capabilities-mobile">Capabilities</Link>
            <Link href="/industries" className="block text-sm font-sans uppercase tracking-widest text-aryo-deepBlue" data-testid="link-industries-mobile">Industries</Link>
            <Link href="/case-studies" className="block text-sm font-sans uppercase tracking-widest text-aryo-deepBlue" data-testid="link-case-studies-mobile">Case Studies</Link>
            <Link href="/insights" className="block text-sm font-sans uppercase tracking-widest text-aryo-deepBlue" data-testid="link-insights-mobile">Insights</Link>
            <Link href="/about" className="block text-sm font-sans uppercase tracking-widest text-aryo-deepBlue" data-testid="link-about-mobile">About</Link>
            <Link href="/careers" className="block text-sm font-sans uppercase tracking-widest text-aryo-deepBlue" data-testid="link-careers-mobile">Careers</Link>
            <Link href="/contact" className="block text-sm font-sans uppercase tracking-widest text-aryo-deepBlue" data-testid="link-contact-mobile">Contact</Link>
            <Link href="/login" className="block text-sm font-sans uppercase tracking-widest font-bold text-aryo-teal" data-testid="link-partner-login-mobile">Partner Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-aryo-deepBlue py-16 border-t border-aryo-deepBlue">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <img src="/api/aryo-logo" alt="Aryo Consulting Group" width={80} height={80} className="object-contain" data-testid="img-aryo-logo-footer" />
            </div>
            <p className="text-aryo-lightBlue/70 text-sm leading-relaxed">
              Corporate strategy and governance consulting for enterprise transformation.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6">Capabilities</h4>
            <ul className="space-y-3">
              <li><Link href="/capabilities" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">All Services</Link></li>
              <li><Link href="/industries" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">Industries</Link></li>
              <li><Link href="/case-studies" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">Case Studies</Link></li>
              <li><Link href="/valuation-tool" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">Valuation Tool</Link></li>
              <li><Link href="/ai-consultant" className="text-aryo-lightBlue/70 hover:text-white text-sm transition-colors">AI Consultant</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6">Company</h4>
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
            <p className="text-aryo-lightBlue/50 text-xs">
              Subscribe to our quarterly insights
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-aryo-lightBlue/50 text-xs">
            2024 Aryo Consulting Group. All rights reserved.
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

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-aryo-offWhite">
      <Navbar />
      <div className="pt-24">
        {children}
      </div>
      <Footer />
    </div>
  );
}
