import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { ChevronDown, Filter, ArrowUpDown, Minimize2, Info, Building2 } from 'lucide-react';
import { Link } from 'wouter';
import { PageLayout } from '@/components/layout';
import { SEO, breadcrumbSchema } from '@/components/seo';
import { Button } from '@/components/ui/button';

const companySizes: Record<string, { roi: number; cost: number; time: number }> = {
  'Pre-Revenue Startup': { roi: 1.4, cost: 0.3, time: 0.6 },
  'Series A-C': { roi: 1.25, cost: 0.5, time: 0.75 },
  'SMBs ($10M-$100M)': { roi: 1.1, cost: 0.8, time: 0.9 },
  'Mid-Market ($100M-$500M)': { roi: 1.0, cost: 1.0, time: 1.0 },
  'Large Organizations ($500M+)': { roi: 0.8, cost: 1.5, time: 1.3 },
};

const industryModifiers: Record<string, { roi: number; cost: number; time: number }> = {
  'Cross-Industry Benchmark': { roi: 1.0, cost: 1.0, time: 1.0 },
  'Enterprise Software': { roi: 1.2, cost: 1.1, time: 0.8 },
  'Manufacturing': { roi: 0.85, cost: 1.3, time: 1.25 },
  'Healthcare & Life Sciences': { roi: 1.1, cost: 1.2, time: 1.4 },
  'Consumer & Retail': { roi: 0.9, cost: 0.9, time: 0.8 },
  'Professional Services': { roi: 1.25, cost: 0.6, time: 0.85 },
  'Financial Services': { roi: 1.1, cost: 1.25, time: 1.35 },
};

const allLevers = [
  { id: 1, name: 'Dynamic Pricing Optimization', roi: 15.0, cost: 0.2, time: 2, quickWin: true, category: 'Revenue', desc: 'AI-driven price elasticity' },
  { id: 2, name: 'Pricing Architecture', roi: 10.0, cost: 0.15, time: 3, quickWin: true, category: 'Revenue', desc: 'Bundling & Packaging' },
  { id: 3, name: 'Tax & Treasury Optimization', roi: 9.0, cost: 0.1, time: 3, quickWin: true, category: 'Profit', desc: 'Entity structuring & cash pooling' },
  { id: 4, name: 'Procurement Excellence', roi: 8.0, cost: 0.25, time: 4, quickWin: true, category: 'Profit', desc: 'Strategic sourcing models' },
  { id: 5, name: 'Working Capital Opt', roi: 6.5, cost: 0.15, time: 3, quickWin: true, category: 'Profit', desc: 'Cash conversion improvement' },
  { id: 6, name: 'Vendor Consolidation', roi: 5.0, cost: 0.1, time: 3, quickWin: true, category: 'Profit', desc: 'Spend analysis rationalization' },
  { id: 7, name: 'IP Monetization', roi: 14.0, cost: 0.3, time: 5, quickWin: false, category: 'Revenue', desc: 'Patent/Data monetization' },
  { id: 8, name: 'Customer Success & NRR', roi: 12.0, cost: 0.4, time: 5, quickWin: false, category: 'Revenue', desc: 'Net revenue retention playbooks' },
  { id: 9, name: 'Product-Led Growth', roi: 11.0, cost: 1.5, time: 9, quickWin: false, category: 'Revenue', desc: 'Self-serve funnels' },
  { id: 10, name: 'AI Demand Gen', roi: 8.5, cost: 0.5, time: 4, quickWin: false, category: 'Revenue', desc: 'Personalized outreach' },
  { id: 11, name: 'Channel Ecosystem', roi: 7.5, cost: 0.8, time: 10, quickWin: false, category: 'Revenue', desc: 'Partner programs' },
  { id: 12, name: 'Sales Velocity Program', roi: 6.0, cost: 0.3, time: 4, quickWin: false, category: 'Revenue', desc: 'Win rate & cycle optimization' },
  { id: 13, name: 'AI Implementation', roi: 7.0, cost: 2.2, time: 12, quickWin: false, category: 'Digital', desc: 'Enterprise AI/ML platform' },
  { id: 14, name: 'CRM Transformation', roi: 5.5, cost: 0.9, time: 7, quickWin: false, category: 'Digital', desc: 'Salesforce/HubSpot optimization' },
  { id: 15, name: 'Talent Density Program', roi: 5.0, cost: 0.8, time: 6, quickWin: false, category: 'Operations', desc: 'Org design & performance' },
  { id: 16, name: 'Global Expansion', roi: 5.5, cost: 3.5, time: 16, quickWin: false, category: 'Revenue', desc: 'Market entry localization' },
  { id: 17, name: 'M&A Integration', roi: 4.5, cost: 4.0, time: 12, quickWin: false, category: 'Operations', desc: 'Synergy capture' },
  { id: 18, name: 'Supply Chain Re-eng', roi: 4.2, cost: 1.8, time: 12, quickWin: false, category: 'Operations', desc: 'Network optimization' },
  { id: 19, name: 'ERP Transformation', roi: 2.5, cost: 3.0, time: 18, quickWin: false, category: 'Digital', desc: 'Core system modernization' },
];

const categories = ['All', 'Revenue', 'Profit', 'Digital', 'Operations'];

const metrics: Record<string, { label: string; unit: string; color: string; desc: string }> = {
  roi: { label: '5-Year ROI', unit: 'x', color: '#274D8E', desc: 'Multiplier on invested capital' },
  cost: { label: 'Implementation Cost', unit: '$M', color: '#4EB9A7', desc: 'Fees + Integration + Year 1 OpEx' },
  time: { label: 'Time to Value', unit: ' Mo', color: '#47B5CB', desc: 'Months to breakeven' }
};

interface LeverData {
  id: number;
  name: string;
  roi: number;
  cost: number;
  time: number;
  quickWin: boolean;
  category: string;
  desc: string;
}

export default function ValueCreationPage() {
  const [industry, setIndustry] = useState('Cross-Industry Benchmark');
  const [companySize, setCompanySize] = useState('Mid-Market ($100M-$500M)');
  const [activeMetric, setActiveMetric] = useState<'roi' | 'cost' | 'time'>('roi');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isIndDropdownOpen, setIsIndDropdownOpen] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);

  const processedData = useMemo(() => {
    const indMod = industryModifiers[industry];
    const sizeMod = companySizes[companySize];

    let data: LeverData[] = allLevers.map(lever => {
      const adjustedRoi = lever.roi * indMod.roi * sizeMod.roi;
      const adjustedCost = lever.cost * indMod.cost * sizeMod.cost;
      const adjustedTime = lever.time * indMod.time * sizeMod.time;

      return {
        ...lever,
        roi: parseFloat(adjustedRoi.toFixed(1)),
        cost: parseFloat(adjustedCost.toFixed(2)),
        time: Math.round(adjustedTime),
      };
    });

    if (selectedCategory !== 'All') {
      data = data.filter(lever => lever.category === selectedCategory);
    }

    data.sort((a, b) => {
      if (activeMetric === 'roi') return b.roi - a.roi;
      return a[activeMetric] - b[activeMetric];
    });

    return data;
  }, [industry, companySize, activeMetric, selectedCategory]);

  return (
    <PageLayout>
      <SEO 
        title="Value Creation Matrix | Aryo Consulting Group"
        description="Explore strategic value creation levers across industries and company sizes. Identify high-ROI opportunities with our interactive simulator."
        canonical="https://aryocg.com/value-creation"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "https://aryocg.com" },
          { name: "Value Creation", url: "https://aryocg.com/value-creation" },
        ])}
      />
      
      <section className="pt-32 pb-16 bg-aryo-offWhite border-b border-aryo-lightGrey">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-aryo-greenTeal"></div>
            <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.25em] uppercase">
              Strategic Simulator
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-aryo-deepBlue tracking-tight mb-6 leading-tight">
            Value Creation Matrix
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl font-light leading-relaxed">
            Explore strategic levers customized for your company size and industry. Our proprietary benchmarks help identify the highest-ROI opportunities for sustainable growth.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-value-creation-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="bg-aryo-offWhite rounded-md border border-aryo-lightGrey p-6 md:p-8 mb-8">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-serif text-aryo-deepBlue">Configure Your Scenario</h2>
                <p className="text-sm text-slate-500 mt-1">Adjust parameters to see customized benchmarks</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                <div className="relative w-full sm:w-64">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    <Building2 size={10} /> Company Size
                  </label>
                  <button 
                    onClick={() => { setIsSizeDropdownOpen(!isSizeDropdownOpen); setIsIndDropdownOpen(false); }}
                    className="flex items-center justify-between w-full bg-white border border-aryo-lightGrey text-aryo-deepBlue px-4 py-3 rounded-md transition-colors"
                    data-testid="dropdown-company-size-full"
                  >
                    <span className="font-semibold text-sm truncate">{companySize}</span>
                    <ChevronDown size={16} className="text-slate-400 shrink-0" />
                  </button>
                  
                  {isSizeDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-full bg-white rounded-md border border-aryo-lightGrey py-2 z-30">
                      {Object.keys(companySizes).map(size => (
                        <button
                          key={size}
                          onClick={() => { setCompanySize(size); setIsSizeDropdownOpen(false); }}
                          className={`block w-full text-left px-5 py-3 text-sm border-l-4 ${companySize === size ? 'border-aryo-greenTeal bg-aryo-offWhite font-bold text-aryo-deepBlue' : 'border-transparent text-slate-500 hover:bg-aryo-offWhite'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative w-full sm:w-64">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Industry Baseline</label>
                  <button 
                    onClick={() => { setIsIndDropdownOpen(!isIndDropdownOpen); setIsSizeDropdownOpen(false); }}
                    className="flex items-center justify-between w-full bg-white border border-aryo-lightGrey text-aryo-deepBlue px-4 py-3 rounded-md transition-colors"
                    data-testid="dropdown-industry-full"
                  >
                    <span className="font-semibold text-sm truncate">{industry}</span>
                    <ChevronDown size={16} className="text-slate-400 shrink-0" />
                  </button>
                  
                  {isIndDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-full bg-white rounded-md border border-aryo-lightGrey py-2 z-30">
                      {Object.keys(industryModifiers).map(ind => (
                        <button
                          key={ind}
                          onClick={() => { setIndustry(ind); setIsIndDropdownOpen(false); }}
                          className={`block w-full text-left px-5 py-3 text-sm border-l-4 ${industry === ind ? 'border-aryo-greenTeal bg-aryo-offWhite font-bold text-aryo-deepBlue' : 'border-transparent text-slate-500 hover:bg-aryo-offWhite'}`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6 border-t border-aryo-lightGrey">
              <div className="lg:col-span-7">
                <div className="flex items-center space-x-2 mb-4">
                  <Filter size={14} className="text-aryo-greenTeal" />
                  <span className="text-xs font-bold text-aryo-deepBlue uppercase tracking-wide">Strategic Category</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                        selectedCategory === cat
                          ? 'bg-aryo-deepBlue text-white border-aryo-deepBlue'
                          : 'bg-white text-slate-400 border-aryo-lightGrey'
                      }`}
                      data-testid={`category-${cat.toLowerCase()}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="flex items-center space-x-2 mb-4">
                  <ArrowUpDown size={14} className="text-aryo-greenTeal" />
                  <span className="text-xs font-bold text-aryo-deepBlue uppercase tracking-wide">Sort By Variable</span>
                </div>
                <div className="flex bg-white p-1 rounded-md border border-aryo-lightGrey">
                  {(Object.keys(metrics) as Array<'roi' | 'cost' | 'time'>).map(m => (
                    <button
                      key={m}
                      onClick={() => setActiveMetric(m)}
                      className={`flex-1 py-2 text-[10px] font-bold rounded-md transition-all ${
                        activeMetric === m ? 'bg-aryo-offWhite text-aryo-deepBlue' : 'text-slate-400'
                      }`}
                      data-testid={`metric-full-${m}`}
                    >
                      {metrics[m].label.split(' ')[0].toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-aryo-offWhite rounded-md p-6 md:p-10 border border-aryo-lightGrey">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
              <div>
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <Info size={14} />
                  <p className="text-xs font-medium uppercase tracking-wide">{metrics[activeMetric].desc}</p>
                </div>
                <h4 className="text-2xl font-bold text-aryo-deepBlue">
                  {processedData.length} Levers by <span className="text-aryo-greenTeal underline decoration-2 underline-offset-4">{metrics[activeMetric].label}</span>
                </h4>
              </div>
              
              <Link href="/">
                <Button variant="outline" className="gap-2" data-testid="button-collapse-view">
                  <Minimize2 size={14}/>
                  <span>Back to Home</span>
                </Button>
              </Link>
            </div>

            <div className="w-full bg-white rounded-md p-4" style={{ height: `${Math.max(500, processedData.length * 55)}px` }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={processedData} 
                  layout="vertical" 
                  margin={{ top: 0, right: 60, left: 10, bottom: 0 }}
                  barSize={32}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fill: '#334155', fontSize: 12, fontWeight: 600 }} 
                    width={180}
                    interval={0}
                  />
                  <Tooltip 
                    cursor={{ fill: '#F9FAFB', opacity: 0.8 }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as LeverData;
                        return (
                          <div className="bg-white border border-aryo-lightGrey rounded-md p-4 max-w-xs shadow-lg">
                            <p className="text-sm font-bold text-aryo-deepBlue mb-1">{data.name}</p>
                            <p className="text-xs text-slate-500 mb-3 leading-tight">{data.desc}</p>
                            <div className="flex gap-4 border-t border-aryo-lightGrey pt-2">
                              <div>
                                <span className="text-[10px] text-slate-400 uppercase font-bold block">ROI</span>
                                <span className="text-sm font-bold text-aryo-deepBlue">{data.roi}x</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-slate-400 uppercase font-bold block">Cost</span>
                                <span className="text-sm font-bold text-aryo-greenTeal">${data.cost}M</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-slate-400 uppercase font-bold block">Time</span>
                                <span className="text-sm font-bold text-aryo-teal">{data.time} Mo</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  
                  <Bar 
                    dataKey={activeMetric} 
                    radius={[0, 4, 4, 0]} 
                    animationDuration={800}
                  >
                    {processedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index < 3 ? metrics[activeMetric].color : '#CBD5E1'} fillOpacity={index < 3 ? 1 : 0.6} />
                    ))}
                    <LabelList 
                      dataKey={activeMetric} 
                      position="right" 
                      formatter={(val: number) => {
                        if(activeMetric === 'roi') return `${val}x`;
                        if(activeMetric === 'cost') return `$${val}M`;
                        return `${val} Mo`;
                      }}
                      style={{ fill: metrics[activeMetric].color, fontSize: '12px', fontWeight: 'bold' }} 
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 pt-6 border-t border-aryo-lightGrey flex flex-col sm:flex-row justify-between text-xs text-slate-400 gap-2">
              <p>* Top 3 levers highlighted. Baseline assumptions for: {industry} | {companySize}.</p>
              <p>Sources: Internal ACG Benchmarks (2025)</p>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-aryo-offWhite rounded-md p-6 border border-aryo-lightGrey">
              <h3 className="text-lg font-serif text-aryo-deepBlue mb-3">Quick Wins</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                High-ROI initiatives that can be implemented within 3-6 months with minimal capital expenditure. Perfect for early-stage companies seeking immediate impact.
              </p>
            </div>
            <div className="bg-aryo-offWhite rounded-md p-6 border border-aryo-lightGrey">
              <h3 className="text-lg font-serif text-aryo-deepBlue mb-3">Growth Engines</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Medium-term initiatives that build sustainable competitive advantage. These require more investment but deliver compounding returns over 2-5 years.
              </p>
            </div>
            <div className="bg-aryo-offWhite rounded-md p-6 border border-aryo-lightGrey">
              <h3 className="text-lg font-serif text-aryo-deepBlue mb-3">Infrastructure</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Foundational investments in technology and operations. Higher upfront costs but essential for scaling beyond $100M in revenue.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
