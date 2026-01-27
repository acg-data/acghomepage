import { useState, useMemo, useRef, useEffect, type ReactNode } from 'react';
import { Link } from 'wouter';
import { SEO } from '@/components/seo';
import { Navbar, Footer } from '@/components/layout';
import { 
  DollarSign, TrendingUp, Clock, Shield, Globe, Building2, Zap, 
  CheckCircle2, ArrowRight, Wallet, RefreshCw, AlertCircle, 
  Info, Mail, Phone, User 
} from 'lucide-react';

const FadeIn = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const stablecoinTypes = [
  { id: 'usdc', name: 'USDC', issuer: 'Circle', type: 'Fiat-Backed', settlementTime: 0.05, txCost: 0.001, yieldPotential: 4.5, riskScore: 1, description: 'US Dollar-backed, regulated, widely adopted', bestFor: 'Enterprise treasury, cross-border payments' },
  { id: 'usdt', name: 'USDT', issuer: 'Tether', type: 'Fiat-Backed', settlementTime: 0.05, txCost: 0.001, yieldPotential: 4.2, riskScore: 2, description: 'Largest market cap, high liquidity', bestFor: 'High-volume trading, emerging markets' },
  { id: 'dai', name: 'DAI', issuer: 'MakerDAO', type: 'Crypto-Collateralized', settlementTime: 0.08, txCost: 0.002, yieldPotential: 5.0, riskScore: 3, description: 'Decentralized, over-collateralized', bestFor: 'DeFi integration, decentralized operations' },
  { id: 'pyusd', name: 'PYUSD', issuer: 'PayPal', type: 'Fiat-Backed', settlementTime: 0.05, txCost: 0.0008, yieldPotential: 4.0, riskScore: 1, description: 'PayPal-backed, consumer-friendly', bestFor: 'Consumer payments, retail integration' },
  { id: 'eurc', name: 'EURC', issuer: 'Circle', type: 'Fiat-Backed', settlementTime: 0.05, txCost: 0.001, yieldPotential: 3.8, riskScore: 1, description: 'Euro-denominated, MiCA compliant', bestFor: 'European operations, EUR treasury' },
  { id: 'frax', name: 'FRAX', issuer: 'Frax Finance', type: 'Hybrid', settlementTime: 0.06, txCost: 0.0015, yieldPotential: 5.5, riskScore: 4, description: 'Partially algorithmic, innovative', bestFor: 'Yield optimization, DeFi strategies' }
];

const industries = [
  { id: 'fintech', name: 'Financial Services & Fintech', crossBorderPct: 0.45, paymentVolume: 'Very High', avgTxSize: 500000, settlementDays: 3, fxSpread: 0.015, wireFeePct: 0.003, compliance: 0.002 },
  { id: 'ecommerce', name: 'E-Commerce & Retail', crossBorderPct: 0.35, paymentVolume: 'High', avgTxSize: 50000, settlementDays: 2.5, fxSpread: 0.02, wireFeePct: 0.025, compliance: 0.001 },
  { id: 'manufacturing', name: 'Manufacturing & Supply Chain', crossBorderPct: 0.55, paymentVolume: 'High', avgTxSize: 250000, settlementDays: 4, fxSpread: 0.018, wireFeePct: 0.004, compliance: 0.0015 },
  { id: 'tech', name: 'Technology & SaaS', crossBorderPct: 0.60, paymentVolume: 'High', avgTxSize: 100000, settlementDays: 2, fxSpread: 0.012, wireFeePct: 0.002, compliance: 0.001 },
  { id: 'pharma', name: 'Pharmaceuticals & Healthcare', crossBorderPct: 0.40, paymentVolume: 'Medium', avgTxSize: 750000, settlementDays: 5, fxSpread: 0.02, wireFeePct: 0.005, compliance: 0.003 },
  { id: 'energy', name: 'Energy & Commodities', crossBorderPct: 0.70, paymentVolume: 'Very High', avgTxSize: 2000000, settlementDays: 4, fxSpread: 0.01, wireFeePct: 0.002, compliance: 0.002 },
  { id: 'logistics', name: 'Logistics & Transportation', crossBorderPct: 0.65, paymentVolume: 'High', avgTxSize: 150000, settlementDays: 3, fxSpread: 0.015, wireFeePct: 0.003, compliance: 0.0012 },
  { id: 'media', name: 'Media & Entertainment', crossBorderPct: 0.50, paymentVolume: 'Medium', avgTxSize: 75000, settlementDays: 2, fxSpread: 0.018, wireFeePct: 0.025, compliance: 0.001 }
];

const marketSizes = [
  { id: 'smb', name: 'SMB ($10M - $50M)', minRev: 10000000, maxRev: 50000000, treasuryPct: 0.12, paymentFreq: 200 },
  { id: 'midmarket', name: 'Mid-Market ($50M - $250M)', minRev: 50000000, maxRev: 250000000, treasuryPct: 0.10, paymentFreq: 500 },
  { id: 'enterprise', name: 'Enterprise ($250M - $1B)', minRev: 250000000, maxRev: 1000000000, treasuryPct: 0.08, paymentFreq: 2000 },
  { id: 'largeenterprise', name: 'Large Enterprise ($1B - $10B)', minRev: 1000000000, maxRev: 10000000000, treasuryPct: 0.06, paymentFreq: 10000 },
  { id: 'megacorp', name: 'Global Corporation ($10B+)', minRev: 10000000000, maxRev: 100000000000, treasuryPct: 0.05, paymentFreq: 50000 }
];

const formatCurrency = (num: number) => {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(0)}K`;
  return `$${num.toFixed(0)}`;
};

export default function StablecoinCalculator() {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState('');
  const [marketSize, setMarketSize] = useState('');
  const [annualRevenue, setAnnualRevenue] = useState('');
  const [crossBorderPayments, setCrossBorderPayments] = useState('');
  const [selectedStablecoins, setSelectedStablecoins] = useState(['usdc', 'usdt']);
  const [treasuryAllocation, setTreasuryAllocation] = useState(20);
  const [showResults, setShowResults] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const selectedIndustry = industries.find(i => i.id === industry);
  const selectedMarketSize = marketSizes.find(m => m.id === marketSize);

  const calculations = useMemo(() => {
    if (!selectedIndustry || !annualRevenue) return null;
    const revenue = parseFloat(annualRevenue) || 0;
    const crossBorder = parseFloat(crossBorderPayments) || (revenue * selectedIndustry.crossBorderPct);
    const treasury = revenue * (selectedMarketSize?.treasuryPct || 0.10);
    const paymentFreq = selectedMarketSize?.paymentFreq || 500;

    const trad = {
      fxCosts: crossBorder * selectedIndustry.fxSpread,
      wireFees: paymentFreq * 35,
      settlementCost: (crossBorder * 0.05 * selectedIndustry.settlementDays) / 365,
      complianceCost: crossBorder * selectedIndustry.compliance,
      correspondentFees: crossBorder * 0.002,
      totalCost: 0
    };
    trad.totalCost = trad.fxCosts + trad.wireFees + trad.settlementCost + trad.complianceCost + trad.correspondentFees;

    const analysis = selectedStablecoins.map(coinId => {
      const coin = stablecoinTypes.find(c => c.id === coinId)!;
      const txCost = paymentFreq * (coin.txCost * selectedIndustry.avgTxSize * 0.0001);
      const savings = {
        fx: trad.fxCosts * 0.85,
        wire: trad.wireFees * 0.90,
        settlement: trad.settlementCost * 0.95,
        compliance: trad.complianceCost * 0.40,
        correspondent: trad.correspondentFees * 0.95
      };
      const totalSavings = savings.fx + savings.wire + savings.settlement + savings.compliance + savings.correspondent - txCost;
      const treasuryYield = (treasury * (treasuryAllocation / 100)) * (coin.yieldPotential / 100);
      return { ...coin, txCost, savings, totalSavings, treasuryYield, totalBenefit: totalSavings + treasuryYield };
    });

    const best = analysis.length > 0 ? analysis.reduce((a, b) => a.totalBenefit > b.totalBenefit ? a : b) : null;
    return { revenue, crossBorder, treasury, paymentFreq, traditional: trad, analysis, best, fiveYear: best ? best.totalBenefit * 5.5 : 0 };
  }, [industry, marketSize, annualRevenue, crossBorderPayments, selectedStablecoins, treasuryAllocation, selectedIndustry, selectedMarketSize]);

  const toggleCoin = (id: string) => setSelectedStablecoins(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

  const canProceed = (s: number) => {
    if (s === 1) return industry && marketSize;
    if (s === 2) return annualRevenue;
    if (s === 3) return selectedStablecoins.length > 0;
    return false;
  };

  if (showResults && calculations && calculations.best) {
    return (
      <div className="min-h-screen bg-aryo-offWhite font-sans">
        <SEO 
          title="Stablecoin Savings Report | Aryo Consulting Group"
          description="Your personalized corporate stablecoin savings analysis and recommendations."
        />
        <Navbar />

        <div className="bg-gradient-to-br from-aryo-deepBlue via-aryo-deepBlue to-aryo-teal text-white pt-32 pb-12">
          <div className="max-w-6xl mx-auto px-6">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-aryo-greenTeal mb-2 block">Your Analysis Results</span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mt-2">Corporate Stablecoin Savings Report</h1>
            <p className="mt-2 text-white/70 text-lg">{selectedIndustry?.name} • {selectedMarketSize?.name}</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 -mt-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <FadeIn delay={100} className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-aryo-greenTeal">
              <p className="text-xs font-bold text-aryo-greenTeal tracking-[0.2em] uppercase mb-2">Annual Savings</p>
              <p className="text-4xl md:text-5xl font-bold text-aryo-deepBlue mb-2">{formatCurrency(calculations.best.totalBenefit)}</p>
              <p className="text-sm text-slate-500 font-medium">{((calculations.best.totalBenefit / calculations.traditional.totalCost) * 100).toFixed(0)}% total cost reduction</p>
            </FadeIn>
            <FadeIn delay={200} className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-aryo-teal">
              <p className="text-xs font-bold text-aryo-teal tracking-[0.2em] uppercase mb-2">5-Year Projection</p>
              <p className="text-4xl md:text-5xl font-bold text-aryo-deepBlue mb-2">{formatCurrency(calculations.fiveYear)}</p>
              <p className="text-sm text-slate-500 font-medium">Cumulative strategic benefit</p>
            </FadeIn>
            <FadeIn delay={300} className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-aryo-deepBlue">
              <p className="text-xs font-bold text-aryo-deepBlue tracking-[0.2em] uppercase mb-2">Recommended</p>
              <p className="text-3xl font-bold text-aryo-deepBlue mb-2">{calculations.best.name}</p>
              <p className="text-sm text-slate-500 font-medium">{calculations.best.type} • {calculations.best.yieldPotential}% yield</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <FadeIn delay={400} className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xs font-bold text-red-500 tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Current Payment Costs
              </h3>
              <div className="space-y-4">
                {[
                  { l: 'FX Conversion Spreads', v: calculations.traditional.fxCosts, i: RefreshCw },
                  { l: 'International Wire Fees', v: calculations.traditional.wireFees, i: Zap },
                  { l: 'Settlement Float Cost', v: calculations.traditional.settlementCost, i: Clock },
                  { l: 'Compliance & AML Overhead', v: calculations.traditional.complianceCost, i: Shield },
                  { l: 'Correspondent Banking Fees', v: calculations.traditional.correspondentFees, i: Building2 }
                ].map((x, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors px-2 rounded-lg">
                    <span className="flex items-center gap-3 text-slate-600 font-medium"><x.i className="w-4 h-4 text-slate-400" />{x.l}</span>
                    <span className="font-bold text-slate-800">{formatCurrency(x.v)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-red-100">
                  <span className="font-bold text-slate-800">Total Annual Cost</span>
                  <span className="text-2xl font-bold text-red-500">{formatCurrency(calculations.traditional.totalCost)}</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={500} className="bg-white rounded-2xl shadow-lg p-8 border border-aryo-greenTeal/20">
              <h3 className="text-xs font-bold text-aryo-greenTeal tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Stablecoin Benefits ({calculations.best.name})
              </h3>
              <div className="space-y-4">
                {[
                  { l: 'FX Efficiency Savings', v: calculations.best.savings.fx },
                  { l: 'Wire Fee Elimination', v: calculations.best.savings.wire },
                  { l: 'Instant Settlement Gain', v: calculations.best.savings.settlement },
                  { l: 'Compliance Automation', v: calculations.best.savings.compliance },
                  { l: 'Treasury Yield Generation', v: calculations.best.treasuryYield }
                ].map((x, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0 hover:bg-aryo-greenTeal/5 transition-colors px-2 rounded-lg">
                    <span className="text-slate-600 font-medium">{x.l}</span>
                    <span className="font-bold text-aryo-greenTeal">+{formatCurrency(x.v)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-aryo-greenTeal">
                  <span className="font-bold text-slate-800">Net Annual Benefit</span>
                  <span className="text-2xl font-bold text-aryo-greenTeal">{formatCurrency(calculations.best.totalBenefit)}</span>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={600} className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h3 className="text-xs font-bold text-aryo-deepBlue tracking-[0.2em] uppercase mb-6">Comprehensive Stablecoin Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b-2 border-aryo-deepBlue text-aryo-deepBlue">
                    <th className="py-4 font-bold">Stablecoin</th>
                    <th className="py-4 text-right font-bold">Cost Savings</th>
                    <th className="py-4 text-right font-bold">Treasury Yield</th>
                    <th className="py-4 text-right font-bold">Total Benefit</th>
                    <th className="py-4 text-center font-bold">Risk Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.analysis.map((c, i) => (
                    <tr key={i} className={`border-b border-slate-100 transition-colors ${c.id === calculations.best?.id ? 'bg-aryo-greenTeal/5' : 'hover:bg-slate-50'}`}>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          {c.id === calculations.best?.id && <CheckCircle2 className="w-5 h-5 text-aryo-greenTeal" />}
                          <div>
                            <p className="font-bold text-slate-800 text-base">{c.name}</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">{c.type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-4 font-medium text-slate-600">{formatCurrency(c.totalSavings)}</td>
                      <td className="text-right py-4 font-medium text-aryo-teal">{formatCurrency(c.treasuryYield)}</td>
                      <td className="text-right py-4 font-bold text-aryo-greenTeal text-base">{formatCurrency(c.totalBenefit)}</td>
                      <td className="text-center py-4">
                        <div className="flex justify-center gap-1" title={`Risk Score: ${c.riskScore}/5`}>
                          {[...Array(c.riskScore)].map((_, idx) => <span key={idx} className="text-aryo-deepBlue text-xs">●</span>)}
                          {[...Array(5 - c.riskScore)].map((_, idx) => <span key={idx} className="text-slate-300 text-xs">●</span>)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <FadeIn delay={700} className="bg-gradient-to-r from-aryo-deepBlue/5 to-aryo-teal/5 rounded-2xl p-8 mb-12 border border-aryo-deepBlue/10">
            <h3 className="text-xs font-bold text-aryo-deepBlue tracking-[0.2em] uppercase mb-6">Strategic Insights for {selectedIndustry?.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <Clock className="w-8 h-8 text-aryo-teal mb-3" />
                <p className="text-2xl font-bold text-aryo-deepBlue">{selectedIndustry?.settlementDays}d → 3min</p>
                <p className="text-sm text-slate-500 mt-1">Settlement time reduction</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <Globe className="w-8 h-8 text-aryo-teal mb-3" />
                <p className="text-2xl font-bold text-aryo-deepBlue">{formatCurrency(calculations.crossBorder)}</p>
                <p className="text-sm text-slate-500 mt-1">Volume optimized</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <Wallet className="w-8 h-8 text-aryo-teal mb-3" />
                <p className="text-2xl font-bold text-aryo-deepBlue">{treasuryAllocation}%</p>
                <p className="text-sm text-slate-500 mt-1">Treasury earning {calculations.best.yieldPotential}% APY</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <TrendingUp className="w-8 h-8 text-aryo-teal mb-3" />
                <p className="text-2xl font-bold text-aryo-deepBlue">{((calculations.best.totalBenefit / calculations.revenue) * 100).toFixed(2)}%</p>
                <p className="text-sm text-slate-500 mt-1">Impact on total revenue</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={800} className="bg-white rounded-2xl shadow-xl p-10 md:p-12 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-aryo-greenTeal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="max-w-3xl mx-auto text-center relative z-10">
              {!formSubmitted ? (
                <>
                  <span className="text-xs font-bold text-aryo-greenTeal tracking-[0.2em] uppercase">Get Your Full Report</span>
                  <h3 className="text-3xl font-serif font-bold text-aryo-deepBlue mt-3">Unlock Detailed Implementation Roadmap</h3>
                  <p className="text-slate-600 mt-4 mb-8 text-lg font-light">Receive a customized PDF report with regulatory guidance, integration timeline, and granular ROI projections for your specific use case.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="text" placeholder="Full Name" value={leadForm.name} onChange={e => setLeadForm({...leadForm, name: e.target.value})} className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-aryo-lightGrey focus:border-aryo-deepBlue focus:outline-none transition-colors" data-testid="input-lead-name" />
                    </div>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="text" placeholder="Company Name" value={leadForm.company} onChange={e => setLeadForm({...leadForm, company: e.target.value})} className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-aryo-lightGrey focus:border-aryo-deepBlue focus:outline-none transition-colors" data-testid="input-lead-company" />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="email" placeholder="Work Email" value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})} className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-aryo-lightGrey focus:border-aryo-deepBlue focus:outline-none transition-colors" data-testid="input-lead-email" />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="tel" placeholder="Phone (Optional)" value={leadForm.phone} onChange={e => setLeadForm({...leadForm, phone: e.target.value})} className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-aryo-lightGrey focus:border-aryo-deepBlue focus:outline-none transition-colors" data-testid="input-lead-phone" />
                    </div>
                  </div>
                  
                  <button onClick={() => setFormSubmitted(true)} className="w-full md:w-auto px-10 py-4 bg-aryo-deepBlue text-white font-bold rounded-full hover:bg-[#1e3a6b] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mx-auto text-lg" data-testid="button-get-report">
                    Get Full Report & Schedule Consultation <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-xs text-slate-400 mt-6">By submitting, you agree to receive communications about stablecoin treasury solutions. We respect your privacy.</p>
                </>
              ) : (
                <div className="py-12">
                  <CheckCircle2 className="w-20 h-20 text-aryo-greenTeal mx-auto mb-6" />
                  <h3 className="text-3xl font-serif font-bold text-aryo-deepBlue">Thank You!</h3>
                  <p className="text-slate-600 mt-4 text-lg">Your personalized report is being generated and will be sent to your email shortly.</p>
                  <p className="text-slate-500 mt-2">A treasury specialist will reach out within 24 hours to discuss your implementation.</p>
                </div>
              )}
            </div>
          </FadeIn>

          <button onClick={() => { setShowResults(false); setStep(1); }} className="mx-auto block text-aryo-deepBlue font-bold flex items-center gap-2 hover:underline transition-all" data-testid="button-recalculate">
            <RefreshCw className="w-4 h-4" /> Recalculate with different parameters
          </button>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aryo-offWhite font-sans">
      <SEO 
        title="Corporate Stablecoin Savings Calculator | Aryo Consulting Group"
        description="Calculate your potential savings from stablecoin adoption. Discover how enterprises are saving millions in cross-border payments and generating treasury yield."
      />
      <Navbar />
      
      <div className="bg-gradient-to-br from-aryo-deepBlue via-aryo-deepBlue to-aryo-teal text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-aryo-greenTeal bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm inline-block mb-6">Enterprise Treasury Tool</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Corporate Stablecoin<br/>Savings Calculator</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Quantify the impact of digital currency adoption. Discover how Fortune 500 companies are saving millions in cross-border payments and generating yield on idle treasury.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-10 text-sm font-medium">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"><CheckCircle2 className="w-5 h-5 text-aryo-greenTeal" /> 85% FX savings</div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"><CheckCircle2 className="w-5 h-5 text-aryo-greenTeal" /> Real-time Settlement</div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"><CheckCircle2 className="w-5 h-5 text-aryo-greenTeal" /> 4-5% Treasury Yield</div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-16 pb-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          
          <div className="bg-slate-50 border-b border-slate-100 p-2 flex overflow-x-auto">
            {['Industry & Size', 'Financial Details', 'Stablecoin Selection'].map((label, i) => (
              <button 
                key={i} 
                onClick={() => i + 1 < step && setStep(i + 1)} 
                disabled={i + 1 > step}
                className={`flex-1 min-w-[150px] py-4 px-6 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  step === i + 1 
                    ? 'bg-white text-aryo-deepBlue shadow-sm ring-1 ring-slate-200' 
                    : step > i + 1 
                      ? 'text-aryo-greenTeal hover:bg-white/50' 
                      : 'text-slate-400'
                }`}
                data-testid={`step-${i + 1}`}
              >
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs mr-2 ${step === i + 1 ? 'bg-aryo-deepBlue text-white' : step > i + 1 ? 'bg-aryo-greenTeal text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {step > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </span>
                {label}
              </button>
            ))}
          </div>

          <div className="p-8 md:p-12">
            {step === 1 && (
              <FadeIn className="space-y-10">
                <div>
                  <label className="block text-xs font-bold text-aryo-greenTeal tracking-[0.2em] uppercase mb-6">Select Your Industry</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {industries.map(ind => (
                      <button 
                        key={ind.id} 
                        onClick={() => setIndustry(ind.id)} 
                        className={`p-5 rounded-xl border-2 text-left transition-all group ${
                          industry === ind.id 
                            ? 'border-aryo-deepBlue bg-aryo-deepBlue/5' 
                            : 'border-aryo-lightGrey hover:border-aryo-teal'
                        }`}
                        data-testid={`industry-${ind.id}`}
                      >
                        <span className={`font-bold block text-lg group-hover:text-aryo-deepBlue transition-colors ${industry === ind.id ? 'text-aryo-deepBlue' : 'text-slate-700'}`}>
                          {ind.name}
                        </span>
                        <span className="text-xs text-slate-500 mt-1 block">Avg. Settlement: {ind.settlementDays} days</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-aryo-greenTeal tracking-[0.2em] uppercase mb-6">Company Revenue Scale</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {marketSizes.map(m => (
                      <button 
                        key={m.id} 
                        onClick={() => setMarketSize(m.id)} 
                        className={`p-5 rounded-xl border-2 text-left transition-all group ${
                          marketSize === m.id 
                            ? 'border-aryo-deepBlue bg-aryo-deepBlue/5' 
                            : 'border-aryo-lightGrey hover:border-aryo-teal'
                        }`}
                        data-testid={`size-${m.id}`}
                      >
                        <span className={`block font-bold text-lg group-hover:text-aryo-deepBlue transition-colors ${marketSize === m.id ? 'text-aryo-deepBlue' : 'text-slate-700'}`}>
                          {m.name}
                        </span>
                        <span className="text-xs text-slate-500 mt-1 block">Treasury Pct: {(m.treasuryPct * 100)}%</span>
                      </button>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {step === 2 && (
              <FadeIn className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold text-aryo-greenTeal tracking-[0.2em] uppercase mb-4">Annual Revenue (USD)</label>
                    <div className="relative group">
                      <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-aryo-deepBlue transition-colors" />
                      <input 
                        type="number" 
                        value={annualRevenue} 
                        onChange={(e) => setAnnualRevenue(e.target.value)} 
                        placeholder="e.g. 50000000"
                        className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-aryo-lightGrey focus:border-aryo-deepBlue focus:outline-none text-xl font-bold text-aryo-deepBlue placeholder:font-normal placeholder:text-slate-300 transition-colors"
                        data-testid="input-revenue"
                      />
                    </div>
                    <p className="text-sm text-slate-500 mt-3 flex items-start gap-2">
                      <Info className="w-4 h-4 mt-0.5" /> Used to estimate total treasury volume.
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-aryo-greenTeal tracking-[0.2em] uppercase mb-4">Cross-Border Payment Volume</label>
                    <div className="relative group">
                      <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-aryo-deepBlue transition-colors" />
                      <input 
                        type="number" 
                        value={crossBorderPayments} 
                        onChange={(e) => setCrossBorderPayments(e.target.value)} 
                        placeholder={`Est. ${annualRevenue ? formatCurrency(parseFloat(annualRevenue) * (selectedIndustry?.crossBorderPct || 0.4)) : '0'}`}
                        className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-aryo-lightGrey focus:border-aryo-deepBlue focus:outline-none text-xl font-bold text-aryo-deepBlue placeholder:font-normal placeholder:text-slate-300 transition-colors"
                        data-testid="input-crossborder"
                      />
                    </div>
                    <p className="text-sm text-slate-500 mt-3 flex items-start gap-2">
                      <Info className="w-4 h-4 mt-0.5" /> Optional. Defaults to industry average ({((selectedIndustry?.crossBorderPct || 0) * 100).toFixed(0)}%).
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <label className="block text-xs font-bold text-aryo-greenTeal tracking-[0.2em] uppercase">Treasury Allocation to Stablecoins</label>
                    <span className="text-2xl font-bold text-aryo-deepBlue">{treasuryAllocation}%</span>
                  </div>
                  
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    step="5"
                    value={treasuryAllocation} 
                    onChange={(e) => setTreasuryAllocation(parseInt(e.target.value))} 
                    className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-aryo-deepBlue hover:accent-aryo-teal transition-all"
                    data-testid="slider-allocation"
                  />
                  <div className="flex justify-between text-xs font-bold text-slate-400 mt-3 uppercase tracking-wider">
                    <span>Conservative (0%)</span>
                    <span>Balanced (25%)</span>
                    <span>Aggressive (50%)</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-4">Percentage of idle cash reserves to deploy into yield-bearing stablecoin instruments.</p>
                </div>
              </FadeIn>
            )}

            {step === 3 && (
              <FadeIn className="space-y-8">
                <div>
                  <label className="block text-xs font-bold text-aryo-greenTeal tracking-[0.2em] uppercase mb-6">Select Stablecoins to Analyze</label>
                  <p className="text-slate-600 mb-6">Choose which instruments to include in your simulation. We recommend a diversified basket.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stablecoinTypes.map(coin => (
                      <button 
                        key={coin.id} 
                        onClick={() => toggleCoin(coin.id)}
                        className={`p-6 rounded-2xl border-2 text-left transition-all relative group ${
                          selectedStablecoins.includes(coin.id) 
                            ? 'border-aryo-deepBlue bg-slate-50' 
                            : 'border-aryo-lightGrey opacity-60 hover:opacity-100 hover:border-aryo-teal'
                        }`}
                        data-testid={`coin-${coin.id}`}
                      >
                        {selectedStablecoins.includes(coin.id) && (
                          <div className="absolute top-5 right-5 text-aryo-greenTeal">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                        )}
                        <h4 className={`font-bold text-xl mb-1 ${selectedStablecoins.includes(coin.id) ? 'text-aryo-deepBlue' : 'text-slate-600'}`}>{coin.name}</h4>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${selectedStablecoins.includes(coin.id) ? 'bg-aryo-deepBlue text-white' : 'bg-slate-200 text-slate-500'}`}>{coin.type}</span>
                          <span className="text-xs font-bold text-aryo-teal">Yield: {coin.yieldPotential}%</span>
                        </div>
                        <p className="text-sm text-slate-600">{coin.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
              {step > 1 ? (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="text-slate-400 font-bold text-sm hover:text-aryo-deepBlue transition-colors"
                  data-testid="button-back"
                >
                  ← Back
                </button>
              ) : <div></div>}
              
              <button 
                onClick={() => {
                  if (step < 3) setStep(step + 1);
                  else setShowResults(true);
                }}
                disabled={!canProceed(step)}
                className={`px-10 py-4 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg text-lg ${
                  canProceed(step) 
                    ? 'bg-aryo-deepBlue text-white hover:shadow-xl hover:bg-[#1e3a6b] transform hover:-translate-y-1' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                }`}
                data-testid="button-next"
              >
                {step === 3 ? 'Generate Analysis' : 'Next Step'} 
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
