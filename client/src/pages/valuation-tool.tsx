import { Link } from 'wouter';
import { ChevronRight, Calculator } from 'lucide-react';
import { PageLayout } from '@/components/layout';
import { SEO, breadcrumbSchema, webPageSchema } from '@/components/seo';

export default function ValuationTool() {
  return (
    <PageLayout>
      <SEO 
        title="Business Valuation Tool | Aryo Consulting Group"
        description="Get a preliminary estimate of your company's value based on industry benchmarks and financial metrics. Free business valuation calculator coming soon."
        canonical="https://aryocg.com/valuation-tool"
        jsonLd={[
          webPageSchema({ name: "Business Valuation Tool", description: "Preliminary company valuation based on industry benchmarks and financial metrics.", url: "https://aryocg.com/valuation-tool" }),
          breadcrumbSchema([
            { name: "Home", url: "https://aryocg.com" },
            { name: "Valuation Tool", url: "https://aryocg.com/valuation-tool" },
          ]),
        ]}
      />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <Link href="/" className="hover:text-aryo-deepBlue">Home</Link>
          <ChevronRight size={14} />
          <span className="text-aryo-deepBlue">Valuation Tool</span>
        </div>

        <div className="mb-16">
          <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">Interactive Tool</span>
          <h1 className="text-4xl md:text-5xl font-serif text-aryo-deepBlue mt-4 mb-6">Business Valuation Tool</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Get a preliminary estimate of your company's value based on industry benchmarks and financial metrics.
          </p>
        </div>

        <div className="bg-white border border-aryo-lightGrey p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-aryo-deepBlue/10 rounded-full flex items-center justify-center mb-6">
            <Calculator className="text-aryo-deepBlue" size={40} />
          </div>
          <h2 className="text-2xl font-serif text-aryo-deepBlue mb-4">Coming Soon</h2>
          <p className="text-slate-600 max-w-md">
            Our interactive valuation tool is currently under development. 
            Check back soon for a comprehensive business valuation calculator.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
