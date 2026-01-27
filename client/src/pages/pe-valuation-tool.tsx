import { useState, useEffect, useRef } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { Check, DollarSign, RotateCcw } from 'lucide-react';
import { SEO } from '@/components/seo';

const industryData: Record<string, { revLow: number; revHigh: number; ebitdaLow: number; ebitdaHigh: number; sdeLow: number; sdeHigh: number; label: string }> = {
  saas: { revLow: 1.5, revHigh: 3.5, ebitdaLow: 4.0, ebitdaHigh: 7.0, sdeLow: 2.5, sdeHigh: 4.5, label: 'SaaS / Software' },
  ecommerce: { revLow: 1.0, revHigh: 2.5, ebitdaLow: 3.5, ebitdaHigh: 6.0, sdeLow: 2.0, sdeHigh: 3.5, label: 'E-commerce' },
  manufacturing: { revLow: 0.5, revHigh: 1.5, ebitdaLow: 3.5, ebitdaHigh: 6.0, sdeLow: 2.0, sdeHigh: 4.0, label: 'Manufacturing' },
  services: { revLow: 0.4, revHigh: 1.2, ebitdaLow: 2.5, ebitdaHigh: 5.0, sdeLow: 1.5, sdeHigh: 3.0, label: 'Professional Services' },
  retail: { revLow: 0.3, revHigh: 1.0, ebitdaLow: 2.5, ebitdaHigh: 4.5, sdeLow: 1.5, sdeHigh: 3.0, label: 'Retail' },
  healthcare: { revLow: 0.8, revHigh: 2.0, ebitdaLow: 4.0, ebitdaHigh: 7.0, sdeLow: 2.5, sdeHigh: 4.5, label: 'Healthcare Services' },
  construction: { revLow: 0.3, revHigh: 0.8, ebitdaLow: 2.5, ebitdaHigh: 5.0, sdeLow: 1.5, sdeHigh: 3.5, label: 'Construction' },
  restaurant: { revLow: 0.3, revHigh: 0.8, ebitdaLow: 2.0, ebitdaHigh: 4.0, sdeLow: 1.5, sdeHigh: 2.5, label: 'Restaurant / Food Service' },
  automotive: { revLow: 0.4, revHigh: 1.0, ebitdaLow: 3.0, ebitdaHigh: 5.0, sdeLow: 2.0, sdeHigh: 3.5, label: 'Automotive' },
  franchise: { revLow: 0.5, revHigh: 1.2, ebitdaLow: 3.0, ebitdaHigh: 5.5, sdeLow: 2.0, sdeHigh: 3.5, label: 'Franchise' },
  transportation: { revLow: 0.5, revHigh: 1.2, ebitdaLow: 3.5, ebitdaHigh: 6.0, sdeLow: 2.0, sdeHigh: 4.0, label: 'Transportation / Logistics' },
  fitness: { revLow: 0.4, revHigh: 1.0, ebitdaLow: 2.5, ebitdaHigh: 4.5, sdeLow: 1.5, sdeHigh: 3.0, label: 'Fitness / Wellness' },
  cleaning: { revLow: 0.3, revHigh: 0.8, ebitdaLow: 2.0, ebitdaHigh: 4.0, sdeLow: 1.5, sdeHigh: 2.5, label: 'Cleaning / Janitorial' },
  landscaping: { revLow: 0.4, revHigh: 1.0, ebitdaLow: 2.5, ebitdaHigh: 4.5, sdeLow: 1.5, sdeHigh: 3.0, label: 'Landscaping' },
  it_services: { revLow: 0.8, revHigh: 2.0, ebitdaLow: 3.5, ebitdaHigh: 6.5, sdeLow: 2.0, sdeHigh: 4.0, label: 'IT Services / MSP' },
  digital_agency: { revLow: 0.6, revHigh: 1.5, ebitdaLow: 3.0, ebitdaHigh: 5.5, sdeLow: 2.0, sdeHigh: 3.5, label: 'Digital Agency' },
  other: { revLow: 0.5, revHigh: 1.2, ebitdaLow: 3.0, ebitdaHigh: 5.0, sdeLow: 2.0, sdeHigh: 3.5, label: 'Other / Custom' },
};

const competitorMultipliers = { low: 0.85, medium: 1.0, high: 1.15 };

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function parseCurrency(value: string): number {
  return parseInt(value.replace(/[^0-9.-]+/g, '')) || 0;
}

function formatInputCurrency(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

function getSizeMultiplier(ebitda: number): number {
  if (ebitda < 200000) return 0.7;
  if (ebitda < 500000) return 0.8;
  if (ebitda < 1000000) return 0.9;
  if (ebitda < 2000000) return 1.0;
  if (ebitda < 5000000) return 1.1;
  return 1.2;
}

export default function PEValuationTool() {
  const [industry, setIndustry] = useState('');
  const [revenue, setRevenue] = useState(1000000);
  const [ebitdaMargin, setEbitdaMargin] = useState(20);
  const [ownerSalary, setOwnerSalary] = useState(150000);
  const [otherAddbacks, setOtherAddbacks] = useState(0);
  const [netAssets, setNetAssets] = useState(0);
  const [competitor, setCompetitor] = useState<'low' | 'medium' | 'high'>('medium');
  const [customMultipleLow, setCustomMultipleLow] = useState(3.0);
  const [customMultipleHigh, setCustomMultipleHigh] = useState(5.0);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{
    low: number; mid: number; high: number;
    ebitdaLow: number; ebitdaMid: number; ebitdaHigh: number;
    revLow: number; revMid: number; revHigh: number;
    sdeLow: number; sdeMid: number; sdeHigh: number;
    assetLow: number; assetMid: number; assetHigh: number;
    impliedEbitdaMult: string; impliedRevMult: string;
    appliedEbitdaMultLow: string; appliedEbitdaMultHigh: string;
    appliedRevMultLow: string; appliedRevMultHigh: string;
    appliedSdeMultLow: string; appliedSdeMultHigh: string;
  } | null>(null);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  const ebitda = (revenue * ebitdaMargin) / 100;
  const sdeTotal = ebitda + ownerSalary + otherAddbacks;

  const calculateValuation = () => {
    if (!industry) {
      alert('Please select an industry');
      return;
    }

    const industryInfo = industry === 'other' ? 
      { ...industryData.other, ebitdaLow: customMultipleLow, ebitdaHigh: customMultipleHigh } : 
      industryData[industry];

    const sizeMult = getSizeMultiplier(ebitda);
    const compMult = competitorMultipliers[competitor];
    const combinedMult = sizeMult * compMult;

    const ebitdaValLow = ebitda * industryInfo.ebitdaLow * combinedMult;
    const ebitdaValHigh = ebitda * industryInfo.ebitdaHigh * combinedMult;
    const ebitdaValMid = (ebitdaValLow + ebitdaValHigh) / 2;

    const revValLow = revenue * industryInfo.revLow * combinedMult;
    const revValHigh = revenue * industryInfo.revHigh * combinedMult;
    const revValMid = (revValLow + revValHigh) / 2;

    const sdeValLow = sdeTotal * industryInfo.sdeLow * combinedMult;
    const sdeValHigh = sdeTotal * industryInfo.sdeHigh * combinedMult;
    const sdeValMid = (sdeValLow + sdeValHigh) / 2;

    const assetPremium = 1.2;
    const assetValLow = netAssets;
    const assetValHigh = netAssets * assetPremium;
    const assetValMid = (assetValLow + assetValHigh) / 2;

    const weightedLow = (ebitdaValLow * 0.40) + (revValLow * 0.20) + (sdeValLow * 0.25) + (assetValLow * 0.15);
    const weightedMid = (ebitdaValMid * 0.40) + (revValMid * 0.20) + (sdeValMid * 0.25) + (assetValMid * 0.15);
    const weightedHigh = (ebitdaValHigh * 0.40) + (revValHigh * 0.20) + (sdeValHigh * 0.25) + (assetValHigh * 0.15);

    const impliedEbitdaMult = ebitda > 0 ? (weightedMid / ebitda).toFixed(1) : 'N/A';
    const impliedRevMult = revenue > 0 ? (weightedMid / revenue).toFixed(2) : 'N/A';

    setResults({
      low: weightedLow, mid: weightedMid, high: weightedHigh,
      ebitdaLow: ebitdaValLow, ebitdaMid: ebitdaValMid, ebitdaHigh: ebitdaValHigh,
      revLow: revValLow, revMid: revValMid, revHigh: revValHigh,
      sdeLow: sdeValLow, sdeMid: sdeValMid, sdeHigh: sdeValHigh,
      assetLow: assetValLow, assetMid: assetValMid, assetHigh: assetValHigh,
      impliedEbitdaMult, impliedRevMult,
      appliedEbitdaMultLow: (industryInfo.ebitdaLow * combinedMult).toFixed(1),
      appliedEbitdaMultHigh: (industryInfo.ebitdaHigh * combinedMult).toFixed(1),
      appliedRevMultLow: (industryInfo.revLow * combinedMult).toFixed(2),
      appliedRevMultHigh: (industryInfo.revHigh * combinedMult).toFixed(2),
      appliedSdeMultLow: (industryInfo.sdeLow * combinedMult).toFixed(1),
      appliedSdeMultHigh: (industryInfo.sdeHigh * combinedMult).toFixed(1),
    });
    setShowResults(true);
  };

  useEffect(() => {
    if (showResults && results && chartRef.current) {
      const loadChart = async () => {
        const { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } = await import('chart.js');
        Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(chartRef.current!, {
          type: 'bar',
          data: {
            labels: ['EBITDA Multiple', 'Revenue Multiple', 'SDE Multiple', 'Asset-Based', 'Weighted Avg'],
            datasets: [
              { label: 'Low', data: [results.ebitdaLow, results.revLow, results.sdeLow, results.assetLow, results.low], backgroundColor: '#4EB9A7' },
              { label: 'Mid', data: [results.ebitdaMid, results.revMid, results.sdeMid, results.assetMid, results.mid], backgroundColor: '#274D8E' },
              { label: 'High', data: [results.ebitdaHigh, results.revHigh, results.sdeHigh, results.assetHigh, results.high], backgroundColor: '#47B5CB' },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (ctx: { dataset: { label: string }; raw: unknown }) => `${ctx.dataset.label}: ${formatCurrency(ctx.raw as number)}` } } },
            scales: { y: { beginAtZero: true, ticks: { callback: (value: number | string) => formatCurrency(Number(value)) } } },
          },
        });
      };
      loadChart();
    }
  }, [showResults, results]);

  const resetForm = () => {
    setIndustry('');
    setRevenue(1000000);
    setEbitdaMargin(20);
    setOwnerSalary(150000);
    setOtherAddbacks(0);
    setNetAssets(0);
    setCompetitor('medium');
    setCustomMultipleLow(3.0);
    setCustomMultipleHigh(5.0);
    setShowResults(false);
    setResults(null);
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }
  };

  const addbackItems = ['Vehicle expenses', 'Health insurance', 'Travel & meals', 'Family payroll', 'One-time legal/accounting', 'Rent above market'];

  return (
    <>
      <SEO 
        title="PE Valuation Tool | Aryo Consulting Group"
        description="Comprehensive private equity valuation suite with multiple methodologies including EBITDA, revenue, and SDE multiples."
        canonical="/tools/pe-valuation-tool"
      />
      <Navbar />
      
      <header className="bg-gradient-to-br from-aryo-deepBlue to-[#1a3666] pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-50" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-xs font-bold text-aryo-greenTeal tracking-[0.2em] uppercase mb-4 block">Valuation Suite</span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">Private Equity Valuation Tool</h1>
          <p className="text-white/80 text-lg font-light max-w-xl">Multi-method valuation analysis for small and mid-market businesses using industry-standard methodologies.</p>
        </div>
      </header>

      <main className="py-12 bg-aryo-offWhite">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 lg:gap-12">
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="px-7 py-6 border-b border-slate-100">
                <h2 className="font-serif text-xl font-semibold text-aryo-deepBlue">Valuation Parameters</h2>
              </div>
              <div className="p-7 space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-aryo-greenTeal tracking-[0.15em] uppercase mb-5 pb-3 border-b border-slate-100">Company Profile</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Industry Classification</label>
                      <select 
                        value={industry} 
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-aryo-deepBlue focus:ring-2 focus:ring-aryo-deepBlue/10 appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: '40px' }}
                        data-testid="select-industry"
                      >
                        <option value="">Select Industry</option>
                        <optgroup label="Technology">
                          <option value="saas">SaaS / Software</option>
                          <option value="it_services">IT Services / MSP</option>
                          <option value="digital_agency">Digital Agency</option>
                        </optgroup>
                        <optgroup label="Consumer & Retail">
                          <option value="ecommerce">E-commerce</option>
                          <option value="retail">Retail</option>
                          <option value="restaurant">Restaurant / Food Service</option>
                          <option value="franchise">Franchise</option>
                        </optgroup>
                        <optgroup label="Industrial">
                          <option value="manufacturing">Manufacturing</option>
                          <option value="construction">Construction</option>
                          <option value="transportation">Transportation / Logistics</option>
                          <option value="automotive">Automotive</option>
                        </optgroup>
                        <optgroup label="Services">
                          <option value="services">Professional Services</option>
                          <option value="healthcare">Healthcare Services</option>
                          <option value="fitness">Fitness / Wellness</option>
                          <option value="cleaning">Cleaning / Janitorial</option>
                          <option value="landscaping">Landscaping</option>
                        </optgroup>
                        <optgroup label="Other">
                          <option value="other">Other / Custom</option>
                        </optgroup>
                      </select>
                    </div>

                    {industry === 'other' && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Custom EBITDA Multiple Range</label>
                        <div className="flex items-end gap-3">
                          <div className="flex-1">
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Low</span>
                            <div className="flex mt-1">
                              <input type="number" value={customMultipleLow} onChange={(e) => setCustomMultipleLow(parseFloat(e.target.value) || 0)} min={1} max={15} step={0.5} className="flex-1 px-4 py-3 text-sm border border-slate-200 rounded-l-lg focus:outline-none focus:border-aryo-deepBlue" data-testid="input-custom-multiple-low" />
                              <span className="px-4 py-3 text-sm font-medium text-slate-500 bg-slate-50 border border-l-0 border-slate-200 rounded-r-lg">x</span>
                            </div>
                          </div>
                          <span className="text-lg text-slate-400 pb-3">–</span>
                          <div className="flex-1">
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">High</span>
                            <div className="flex mt-1">
                              <input type="number" value={customMultipleHigh} onChange={(e) => setCustomMultipleHigh(parseFloat(e.target.value) || 0)} min={1} max={15} step={0.5} className="flex-1 px-4 py-3 text-sm border border-slate-200 rounded-l-lg focus:outline-none focus:border-aryo-deepBlue" data-testid="input-custom-multiple-high" />
                              <span className="px-4 py-3 text-sm font-medium text-slate-500 bg-slate-50 border border-l-0 border-slate-200 rounded-r-lg">x</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">Typical range: 2.5x – 6x for most small-to-midsize businesses</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-aryo-greenTeal tracking-[0.15em] uppercase mb-5 pb-3 border-b border-slate-100">Financial Performance</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Annual Revenue <span className="font-normal text-slate-400">(LTM)</span></label>
                      <div className="flex">
                        <span className="px-4 py-3 text-sm font-medium text-slate-500 bg-slate-50 border border-r-0 border-slate-200 rounded-l-lg">$</span>
                        <input 
                          type="text" 
                          value={formatInputCurrency(revenue)} 
                          onChange={(e) => setRevenue(parseCurrency(e.target.value))}
                          className="flex-1 px-4 py-3 text-sm border border-slate-200 rounded-r-lg focus:outline-none focus:border-aryo-deepBlue"
                          data-testid="input-revenue"
                        />
                      </div>
                      <input type="range" min={100000} max={50000000} step={100000} value={revenue} onChange={(e) => setRevenue(parseInt(e.target.value))} className="w-full mt-3 h-1 bg-slate-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-aryo-deepBlue [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow" data-testid="slider-revenue" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">EBITDA Margin</label>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-1">
                          <input type="number" value={ebitdaMargin} onChange={(e) => setEbitdaMargin(parseFloat(e.target.value) || 0)} min={0} max={100} step={0.5} className="flex-1 px-4 py-3 text-sm border border-slate-200 rounded-l-lg focus:outline-none focus:border-aryo-deepBlue" data-testid="input-ebitda-margin" />
                          <span className="px-4 py-3 text-sm font-medium text-slate-500 bg-slate-50 border border-l-0 border-slate-200 rounded-r-lg">%</span>
                        </div>
                        <span className="text-base font-semibold text-aryo-deepBlue whitespace-nowrap min-w-[100px]" data-testid="text-ebitda-calculated">{formatCurrency(ebitda)}</span>
                      </div>
                      <input type="range" min={0} max={50} step={0.5} value={ebitdaMargin} onChange={(e) => setEbitdaMargin(parseFloat(e.target.value))} className="w-full mt-3 h-1 bg-slate-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-aryo-deepBlue [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow" data-testid="slider-ebitda-margin" />
                      <p className="text-xs text-slate-400 mt-2">EBITDA automatically calculated from revenue x margin</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-aryo-greenTeal tracking-[0.15em] uppercase mb-5 pb-3 border-b border-slate-100">Seller's Discretionary Earnings (SDE)</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Owner's Salary / Compensation</label>
                      <div className="flex">
                        <span className="px-4 py-3 text-sm font-medium text-slate-500 bg-slate-50 border border-r-0 border-slate-200 rounded-l-lg">$</span>
                        <input type="text" value={formatInputCurrency(ownerSalary)} onChange={(e) => setOwnerSalary(parseCurrency(e.target.value))} className="flex-1 px-4 py-3 text-sm border border-slate-200 rounded-r-lg focus:outline-none focus:border-aryo-deepBlue" data-testid="input-owner-salary" />
                      </div>
                      <input type="range" min={0} max={500000} step={5000} value={ownerSalary} onChange={(e) => setOwnerSalary(parseInt(e.target.value))} className="w-full mt-3 h-1 bg-slate-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-aryo-deepBlue [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow" data-testid="slider-owner-salary" />
                      <p className="text-xs text-slate-400 mt-2">Total owner compensation including salary, bonuses, and benefits</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Other Add-backs</label>
                      <div className="flex">
                        <span className="px-4 py-3 text-sm font-medium text-slate-500 bg-slate-50 border border-r-0 border-slate-200 rounded-l-lg">$</span>
                        <input type="text" value={formatInputCurrency(otherAddbacks)} onChange={(e) => setOtherAddbacks(parseCurrency(e.target.value))} className="flex-1 px-4 py-3 text-sm border border-slate-200 rounded-r-lg focus:outline-none focus:border-aryo-deepBlue" data-testid="input-other-addbacks" />
                      </div>
                      <input type="range" min={0} max={500000} step={5000} value={otherAddbacks} onChange={(e) => setOtherAddbacks(parseInt(e.target.value))} className="w-full mt-3 h-1 bg-slate-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-aryo-deepBlue [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow" data-testid="slider-other-addbacks" />
                      <p className="text-xs text-slate-400 mt-2">Personal expenses, one-time costs, non-recurring items</p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="text-xs font-semibold text-slate-600 mb-3">Common Add-backs to Consider:</div>
                      <div className="grid grid-cols-2 gap-2">
                        {addbackItems.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-xs text-slate-500">
                            <Check size={14} className="text-aryo-greenTeal flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                      <div className="flex justify-between items-center py-1.5 text-sm border-b border-dashed border-slate-200">
                        <span className="text-slate-500">EBITDA</span>
                        <span className="font-medium text-slate-700 font-mono text-xs">{formatCurrency(ebitda)}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 text-sm border-b border-dashed border-slate-200">
                        <span className="text-slate-500">+ Owner's Salary</span>
                        <span className="font-medium text-slate-700 font-mono text-xs">{formatCurrency(ownerSalary)}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 text-sm border-b border-dashed border-slate-200">
                        <span className="text-slate-500">+ Other Add-backs</span>
                        <span className="font-medium text-slate-700 font-mono text-xs">{formatCurrency(otherAddbacks)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 mt-2 border-t-2 border-aryo-deepBlue">
                        <span className="font-semibold text-aryo-deepBlue">= Total SDE</span>
                        <span className="font-bold text-aryo-deepBlue font-mono text-sm" data-testid="text-sde-total">{formatCurrency(sdeTotal)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-aryo-greenTeal tracking-[0.15em] uppercase mb-5 pb-3 border-b border-slate-100">Market Position</h3>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Competitive Positioning</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['low', 'medium', 'high'] as const).map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setCompetitor(pos)}
                        className={`p-3 text-center rounded-lg border transition-all ${competitor === pos ? 'bg-aryo-deepBlue border-aryo-deepBlue text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'}`}
                        data-testid={`button-competitor-${pos}`}
                      >
                        <div className="font-semibold text-sm">{pos === 'low' ? 'Emerging' : pos === 'medium' ? 'Established' : 'Leader'}</div>
                        <div className="text-xs opacity-70">{pos === 'low' ? 'Niche player' : pos === 'medium' ? 'Market average' : 'Premium position'}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-aryo-greenTeal tracking-[0.15em] uppercase mb-5 pb-3 border-b border-slate-100">Asset Basis</h3>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Net Tangible Assets <span className="font-normal text-slate-400">(Optional)</span></label>
                    <div className="flex">
                      <span className="px-4 py-3 text-sm font-medium text-slate-500 bg-slate-50 border border-r-0 border-slate-200 rounded-l-lg">$</span>
                      <input type="text" value={formatInputCurrency(netAssets)} onChange={(e) => setNetAssets(parseCurrency(e.target.value))} className="flex-1 px-4 py-3 text-sm border border-slate-200 rounded-r-lg focus:outline-none focus:border-aryo-deepBlue" data-testid="input-net-assets" />
                    </div>
                    <input type="range" min={0} max={10000000} step={50000} value={netAssets} onChange={(e) => setNetAssets(parseInt(e.target.value))} className="w-full mt-3 h-1 bg-slate-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-aryo-deepBlue [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow" data-testid="slider-net-assets" />
                    <p className="text-xs text-slate-400 mt-2">Total tangible assets less liabilities</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-slate-100">
                  <button onClick={calculateValuation} className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-aryo-deepBlue text-white font-semibold rounded-lg hover:bg-[#1a3666] transition-colors" data-testid="button-calculate">
                    <DollarSign size={16} />
                    Calculate Valuation
                  </button>
                  <button onClick={resetForm} className="px-6 py-3.5 bg-white text-slate-600 font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors" data-testid="button-reset">
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {!showResults ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <svg className="w-16 h-16 mx-auto mb-6 text-slate-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                  <h3 className="font-serif text-xl font-semibold text-aryo-deepBlue mb-3">Configure Your Analysis</h3>
                  <p className="text-slate-500 max-w-md mx-auto">Enter the company's financial parameters and click "Calculate Valuation" to generate a comprehensive multi-method valuation analysis.</p>
                </div>
              ) : results && (
                <>
                  <div className="bg-gradient-to-br from-aryo-deepBlue to-[#1a3666] rounded-xl p-10 text-white relative overflow-hidden">
                    <div className="absolute top-[-50%] right-[-20%] w-[60%] h-[200%] bg-[radial-gradient(circle,rgba(71,181,203,0.1)_0%,transparent_70%)]" />
                    <div className="relative z-10">
                      <span className="text-xs font-bold tracking-[0.2em] uppercase text-aryo-greenTeal mb-4 block">Estimated Enterprise Value</span>
                      <div className="font-serif text-3xl md:text-4xl font-semibold mb-2" data-testid="text-valuation-range">{formatCurrency(results.low)} – {formatCurrency(results.high)}</div>
                      <div className="text-lg opacity-90 font-light" data-testid="text-valuation-midpoint">Midpoint: {formatCurrency(results.mid)}</div>
                      <div className="flex gap-6 mt-6 pt-6 border-t border-white/15">
                        <div className="flex-1">
                          <div className="text-xs uppercase tracking-wider opacity-70 mb-1">Implied Multiple</div>
                          <div className="text-base font-semibold" data-testid="text-implied-multiple">{results.impliedEbitdaMult}x EBITDA</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs uppercase tracking-wider opacity-70 mb-1">Revenue Multiple</div>
                          <div className="text-base font-semibold" data-testid="text-revenue-multiple">{results.impliedRevMult}x Revenue</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200">
                    <div className="px-6 py-5 border-b border-slate-100">
                      <h3 className="font-serif text-lg font-semibold text-aryo-deepBlue">Valuation by Methodology</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white border border-slate-200 rounded-xl p-5 relative">
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-aryo-teal rounded-r" />
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-aryo-deepBlue">EBITDA Multiple</span>
                            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">40%</span>
                          </div>
                          <div className="text-lg font-bold text-slate-800 mb-1">{formatCurrency(results.ebitdaLow)} – {formatCurrency(results.ebitdaHigh)}</div>
                          <div className="text-xs text-slate-500">{results.appliedEbitdaMultLow}x – {results.appliedEbitdaMultHigh}x</div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 relative">
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-aryo-teal rounded-r" />
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-aryo-deepBlue">Revenue Multiple</span>
                            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">20%</span>
                          </div>
                          <div className="text-lg font-bold text-slate-800 mb-1">{formatCurrency(results.revLow)} – {formatCurrency(results.revHigh)}</div>
                          <div className="text-xs text-slate-500">{results.appliedRevMultLow}x – {results.appliedRevMultHigh}x</div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 relative">
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-aryo-teal rounded-r" />
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-aryo-deepBlue">SDE Multiple</span>
                            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">25%</span>
                          </div>
                          <div className="text-lg font-bold text-slate-800 mb-1">{formatCurrency(results.sdeLow)} – {formatCurrency(results.sdeHigh)}</div>
                          <div className="text-xs text-slate-500">{results.appliedSdeMultLow}x – {results.appliedSdeMultHigh}x</div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 relative">
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-aryo-teal rounded-r" />
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-aryo-deepBlue">Asset-Based</span>
                            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">15%</span>
                          </div>
                          <div className="text-lg font-bold text-slate-800 mb-1">{formatCurrency(results.assetLow)} – {formatCurrency(results.assetHigh)}</div>
                          <div className="text-xs text-slate-500">Net Tangible Assets</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200">
                    <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="text-base font-semibold text-aryo-deepBlue">Valuation Range Comparison</h3>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="w-2.5 h-2.5 rounded-sm bg-aryo-greenTeal" /> Low
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="w-2.5 h-2.5 rounded-sm bg-aryo-deepBlue" /> Mid
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="w-2.5 h-2.5 rounded-sm bg-aryo-teal" /> High
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="h-[300px]">
                        <canvas ref={chartRef} data-testid="chart-valuation" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
