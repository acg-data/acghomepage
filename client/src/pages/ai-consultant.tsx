import { Link } from 'wouter';
import { ChevronRight, Bot } from 'lucide-react';

export default function AIConsultant() {
  return (
    <div className="min-h-screen bg-aryo-offWhite">
      <nav className="bg-white border-b border-aryo-lightGrey px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" data-testid="link-home">
            <img src="/api/aryo-logo" alt="ARYO Consulting Group" width={40} height={40} className="object-contain" data-testid="img-aryo-logo" />
          </Link>
          <Link href="/login" className="bg-aryo-deepBlue text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#1a3668] transition-colors" data-testid="button-partner-login">
            Partner Login
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <Link href="/" className="hover:text-aryo-deepBlue">Home</Link>
          <ChevronRight size={14} />
          <span className="text-aryo-deepBlue">AI Consultant</span>
        </div>

        <div className="mb-16">
          <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">AI-Powered</span>
          <h1 className="text-4xl md:text-5xl font-serif text-aryo-deepBlue mt-4 mb-6">AI Consultant</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Get instant strategic insights powered by AI, trained on ARYO's methodology and best practices.
          </p>
        </div>

        <div className="bg-white border border-aryo-lightGrey p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-aryo-deepBlue/10 rounded-full flex items-center justify-center mb-6">
            <Bot className="text-aryo-deepBlue" size={40} />
          </div>
          <h2 className="text-2xl font-serif text-aryo-deepBlue mb-4">Coming Soon</h2>
          <p className="text-slate-600 max-w-md">
            Our AI-powered consulting assistant is currently under development. 
            Soon you'll be able to get instant strategic guidance based on ARYO's proven methodologies.
          </p>
        </div>
      </div>
    </div>
  );
}
