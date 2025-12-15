import { Link } from 'wouter';
import { ChevronRight, Bot } from 'lucide-react';
import { PageLayout } from '@/components/layout';
import { SEO } from '@/components/seo';

export default function AIConsultant() {
  return (
    <PageLayout>
      <SEO 
        title="AI Consultant | Aryo Consulting Group"
        description="Get instant strategic insights powered by AI, trained on Aryo's proven consulting methodology and best practices. AI-powered business consulting coming soon."
        canonical="https://aryocg.com/ai-consultant"
      />
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
            Get instant strategic insights powered by AI, trained on Aryo's methodology and best practices.
          </p>
        </div>

        <div className="bg-white border border-aryo-lightGrey p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-aryo-deepBlue/10 rounded-full flex items-center justify-center mb-6">
            <Bot className="text-aryo-deepBlue" size={40} />
          </div>
          <h2 className="text-2xl font-serif text-aryo-deepBlue mb-4">Coming Soon</h2>
          <p className="text-slate-600 max-w-md">
            Our AI-powered consulting assistant is currently under development. 
            Soon you'll be able to get instant strategic guidance based on Aryo's proven methodologies.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
