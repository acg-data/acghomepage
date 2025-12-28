import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { ChevronDown, Filter, ArrowUpDown, Maximize2, Info, Building2 } from 'lucide-react';
import { Link } from 'wouter';
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

interface ValueCreationSectionProps {
  condensed?: boolean;
}

export function ValueCreationSection({ condensed = true }: ValueCreationSectionProps) {
  const [industry, setIndustry] = useState('Cross-Industry Benchmark');
  const [companySize, setCompanySize] = useState('Mid-Market ($100M-$500M)');
  const [activeMetric, setActiveMetric] = useState<'roi' | 'cost' | 'time'>('roi');
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

    data.sort((a, b) => {
      if (activeMetric === 'roi') return b.roi - a.roi;
      return a[activeMetric] - b[activeMetric];
    });

    return condensed ? data.slice(0, 6) : data;
  }, [industry, companySize, activeMetric, condensed]);

  return (
    <section className="py-24 bg-aryo-offWhite border-b border-aryo-lightGrey" data-testid="section-value-creation">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="bg-white rounded-md border border-aryo-lightGrey p-6 md:p-8 mb-8">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="h-0.5 w-8 bg-aryo-greenTeal"></span>
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Strategic Simulator</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif text-aryo-deepBlue">Value Creation Matrix</h3>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
              <div className="relative w-full sm:w-64">
                <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <Building2 size={10} /> Company Size
                </label>
                <button 
                  onClick={() => { setIsSizeDropdownOpen(!isSizeDropdownOpen); setIsIndDropdownOpen(false); }}
                  className="flex items-center justify-between w-full bg-aryo-offWhite border border-aryo-lightGrey text-aryo-deepBlue px-4 py-3 rounded-md transition-colors"
                  data-testid="dropdown-company-size"
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
                        data-testid={`option-size-${size.replace(/[^a-zA-Z0-9]/g, '-')}`}
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
                  className="flex items-center justify-between w-full bg-aryo-offWhite border border-aryo-lightGrey text-aryo-deepBlue px-4 py-3 rounded-md transition-colors"
                  data-testid="dropdown-industry"
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
                        data-testid={`option-industry-${ind.replace(/[^a-zA-Z0-9]/g, '-')}`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {condensed && (
            <div className="flex flex-wrap gap-6 pt-6 border-t border-aryo-lightGrey">
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <ArrowUpDown size={14} className="text-aryo-greenTeal" />
                  <span className="text-xs font-bold text-aryo-deepBlue uppercase tracking-wide">Sort By</span>
                </div>
                <div className="flex bg-aryo-offWhite p-1 rounded-md">
                  {(Object.keys(metrics) as Array<'roi' | 'cost' | 'time'>).map(m => (
                    <button
                      key={m}
                      onClick={() => setActiveMetric(m)}
                      className={`px-4 py-2 text-[10px] font-bold rounded-md transition-all ${
                        activeMetric === m ? 'bg-white text-aryo-deepBlue shadow-sm' : 'text-slate-400'
                      }`}
                      data-testid={`metric-${m}`}
                    >
                      {metrics[m].label.split(' ')[0].toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-md p-6 md:p-10 border border-aryo-lightGrey">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Info size={14} />
                <p className="text-xs font-medium uppercase tracking-wide">{metrics[activeMetric].desc}</p>
              </div>
              <h4 className="text-2xl font-bold text-aryo-deepBlue">
                Top {processedData.length} Levers by <span className="text-aryo-greenTeal underline decoration-2 underline-offset-4">{metrics[activeMetric].label}</span>
              </h4>
            </div>
            
            {condensed && (
              <Link href="/value-creation">
                <Button variant="outline" className="gap-2" data-testid="button-expand-view">
                  <Maximize2 size={14}/>
                  <span>Expand View</span>
                </Button>
              </Link>
            )}
          </div>

          <div className="w-full" style={{ height: condensed ? '400px' : `${Math.max(450, processedData.length * 55)}px` }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={processedData} 
                layout="vertical" 
                margin={{ top: 0, right: 60, left: 10, bottom: 0 }}
                barSize={28}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fill: '#334155', fontSize: 12, fontWeight: 600 }} 
                  width={160}
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
      </div>
    </section>
  );
}
