import { useState, useEffect, useRef, useMemo } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { Check, DollarSign, RotateCcw, Globe, Wallet, TrendingUp, TrendingDown, Clock, Zap, RefreshCw, AlertCircle } from 'lucide-react';
import { SEO } from '@/components/seo';

const stablecoinTypes = [
  { id: 'usdc', name: 'USDC', type: 'Fiat-Backed', yieldPotential: 4.5, riskScore: 1, description: 'US Dollar-backed, regulated' },
  { id: 'usdt', name: 'USDT', type: 'Fiat-Backed', yieldPotential: 4.2, riskScore: 2, description: 'Largest market cap' },
  { id: 'dai', name: 'DAI', type: 'Crypto-Collateralized', yieldPotential: 5.0, riskScore: 3, description: 'Decentralized, over-collateralized' },
  { id: 'pyusd', name: 'PYUSD', type: 'Fiat-Backed', yieldPotential: 4.0, riskScore: 1, description: 'PayPal-backed' },
  { id: 'eurc', name: 'EURC', type: 'Fiat-Backed', yieldPotential: 3.8, riskScore: 1, description: 'Euro-denominated' },
  { id: 'frax', name: 'FRAX', type: 'Hybrid', yieldPotential: 5.5, riskScore: 4, description: 'Partially algorithmic' }
];

const industries: Record<string, { 
  crossBorderPct: number; 
  domesticCardPct: number; 
  payoutPct: number;
  avgTxSize: number; 
  settlementDays: number; 
  fxSpread: number; 
  wireFeePct: number; 
  compliance: number; 
  correspondentRate: number;
  treasuryFloatRate: number;
  cardInterchangeRate: number;
  fraudRate: number;
  chargebackRate: number;
  label: string;
  primaryDrivers: string[];
  marginLeverage: string;
}> = {
  fintech: { 
    crossBorderPct: 0.45, 
    domesticCardPct: 0.80,
    payoutPct: 0.15,
    avgTxSize: 500000, 
    settlementDays: 3, 
    fxSpread: 0.015, 
    wireFeePct: 0.003, 
    compliance: 0.002, 
    correspondentRate: 0.002,
    treasuryFloatRate: 0.015,
    cardInterchangeRate: 0.025,
    fraudRate: 0.002,
    chargebackRate: 0.0008,
    label: 'Financial Services & Fintech',
    primaryDrivers: ['Card interchange elimination (2.5% of domestic)', 'Floating yield on balances', 'Instant settlement'],
    marginLeverage: 'Highest: Direct cost removal from card rails'
  },
  ecommerce: { 
    crossBorderPct: 0.35, 
    domesticCardPct: 0.90,
    payoutPct: 0.05,
    avgTxSize: 50000, 
    settlementDays: 2.5, 
    fxSpread: 0.02, 
    wireFeePct: 0.025, 
    compliance: 0.001, 
    correspondentRate: 0.0025,
    treasuryFloatRate: 0.012,
    cardInterchangeRate: 0.028,
    fraudRate: 0.003,
    chargebackRate: 0.0015,
    label: 'E-Commerce & Retail',
    primaryDrivers: ['Card processing (2.8% interchange)', 'Fraud & chargeback elimination', 'FX optimization'],
    marginLeverage: 'Highest: Card fee elimination + fraud reduction'
  },
  manufacturing: { 
    crossBorderPct: 0.55, 
    domesticCardPct: 0.20,
    payoutPct: 0.40,
    avgTxSize: 250000, 
    settlementDays: 4, 
    fxSpread: 0.018, 
    wireFeePct: 0.004, 
    compliance: 0.0015, 
    correspondentRate: 0.003,
    treasuryFloatRate: 0.018,
    cardInterchangeRate: 0.022,
    fraudRate: 0.001,
    chargebackRate: 0.0005,
    label: 'Manufacturing & Supply Chain',
    primaryDrivers: ['Settlement float reduction (4 days → instant)', 'Working capital optimization', 'Payout automation'],
    marginLeverage: 'High: ROIC improvement from faster settlement'
  },
  tech: { 
    crossBorderPct: 0.60, 
    domesticCardPct: 0.70,
    payoutPct: 0.20,
    avgTxSize: 100000, 
    settlementDays: 2, 
    fxSpread: 0.012, 
    wireFeePct: 0.002, 
    compliance: 0.001, 
    correspondentRate: 0.0015,
    treasuryFloatRate: 0.010,
    cardInterchangeRate: 0.024,
    fraudRate: 0.0015,
    chargebackRate: 0.001,
    label: 'Technology & SaaS',
    primaryDrivers: ['Card interchange (2.4% of revenue)', 'Contractor payment speed', 'Float on subscription renewals'],
    marginLeverage: 'Highest: Card rails + float on recurring revenue'
  },
  pharma: { 
    crossBorderPct: 0.40, 
    domesticCardPct: 0.30,
    payoutPct: 0.50,
    avgTxSize: 750000, 
    settlementDays: 5, 
    fxSpread: 0.02, 
    wireFeePct: 0.005, 
    compliance: 0.003, 
    correspondentRate: 0.0035,
    treasuryFloatRate: 0.022,
    cardInterchangeRate: 0.020,
    fraudRate: 0.0005,
    chargebackRate: 0.0003,
    label: 'Pharmaceuticals & Healthcare',
    primaryDrivers: ['Compliance automation (0.3% AML/KYC)', 'FX (40% cross-border)', 'Regulatory cost reduction'],
    marginLeverage: 'Medium: Compliance and FX optimization'
  },
  energy: { 
    crossBorderPct: 0.70, 
    domesticCardPct: 0.10,
    payoutPct: 0.30,
    avgTxSize: 2000000, 
    settlementDays: 4, 
    fxSpread: 0.01, 
    wireFeePct: 0.002, 
    compliance: 0.002, 
    correspondentRate: 0.001,
    treasuryFloatRate: 0.008,
    cardInterchangeRate: 0.018,
    fraudRate: 0.0008,
    chargebackRate: 0.0002,
    label: 'Energy & Commodities',
    primaryDrivers: ['FX compression (70% cross-border)', 'Settlement (4 days → instant)', 'Volume efficiency at scale'],
    marginLeverage: 'Highest: FX costs on massive volume'
  },
  logistics: { 
    crossBorderPct: 0.65, 
    domesticCardPct: 0.25,
    payoutPct: 0.50,
    avgTxSize: 150000, 
    settlementDays: 3, 
    fxSpread: 0.015, 
    wireFeePct: 0.003, 
    compliance: 0.0012, 
    correspondentRate: 0.002,
    treasuryFloatRate: 0.014,
    cardInterchangeRate: 0.021,
    fraudRate: 0.0012,
    chargebackRate: 0.0006,
    label: 'Logistics & Transportation',
    primaryDrivers: ['High-frequency payout automation', 'Correspondent fee elimination', 'Just-in-time liquidity'],
    marginLeverage: 'High: Payout automation at scale'
  },
  media: { 
    crossBorderPct: 0.50, 
    domesticCardPct: 0.85,
    payoutPct: 0.15,
    avgTxSize: 75000, 
    settlementDays: 2, 
    fxSpread: 0.018, 
    wireFeePct: 0.025, 
    compliance: 0.001, 
    correspondentRate: 0.0028,
    treasuryFloatRate: 0.011,
    cardInterchangeRate: 0.027,
    fraudRate: 0.0025,
    chargebackRate: 0.002,
    label: 'Media & Entertainment',
    primaryDrivers: ['Card processing (2.7% interchange)', 'Royalty distribution automation', 'Fraud reduction'],
    marginLeverage: 'Highest: Card fees + automation'
  }
};

const companySizes: Record<string, { treasuryPct: number; paymentFreq: number; operatingMarginPct: number; revenueMidpoint: number; label: string }> = {
  smb: { treasuryPct: 0.12, paymentFreq: 200, operatingMarginPct: 0.15, revenueMidpoint: 30000000, label: 'SMB ($10M - $50M)' },
  midmarket: { treasuryPct: 0.10, paymentFreq: 500, operatingMarginPct: 0.18, revenueMidpoint: 150000000, label: 'Mid-Market ($50M - $250M)' },
  enterprise: { treasuryPct: 0.08, paymentFreq: 2000, operatingMarginPct: 0.20, revenueMidpoint: 625000000, label: 'Enterprise ($250M - $1B)' },
  largeenterprise: { treasuryPct: 0.06, paymentFreq: 10000, operatingMarginPct: 0.22, revenueMidpoint: 5500000000, label: 'Large Enterprise ($1B - $10B)' },
  megacorp: { treasuryPct: 0.05, paymentFreq: 50000, operatingMarginPct: 0.25, revenueMidpoint: 25000000000, label: 'Global Corporation ($10B+)' }
};

const businessModels = [
  { id: 'marketplace', label: 'Marketplace Platform', cardPct: 0.85, payoutPct: 0.60, fraud: 0.003, chargeback: 0.0015, margin: 0.12, description: 'Two-sided markets with payouts to sellers' },
  { id: 'saas', label: 'B2B SaaS', cardPct: 0.60, payoutPct: 0.20, fraud: 0.001, chargeback: 0.0008, margin: 0.25, description: 'Subscription-based business software' },
  { id: 'payments', label: 'Payment Processor / PSP', cardPct: 0.95, payoutPct: 0.90, fraud: 0.004, chargeback: 0.002, margin: 0.08, description: 'Processing payments on behalf of merchants' },
  { id: 'payroll', label: 'Payroll Platform', cardPct: 0.20, payoutPct: 0.85, fraud: 0.0005, chargeback: 0.0001, margin: 0.15, description: 'Employee and contractor payouts' },
  { id: 'remittance', label: 'Cross-Border Remittance', cardPct: 0.70, payoutPct: 0.95, fraud: 0.001, chargeback: 0.0005, margin: 0.06, description: 'International money transfers' },
  { id: 'b2b', label: 'Traditional B2B', cardPct: 0.15, payoutPct: 0.40, fraud: 0.0003, chargeback: 0.0002, margin: 0.18, description: 'Invoice-based B2B payments' }
];

function formatCurrency(value: number): string {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(0)}K`;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function parseCurrency(value: string): number {
  return parseInt(value.replace(/[^0-9.-]+/g, '')) || 0;
}

function formatInputCurrency(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export default function StablecoinCalculator() {
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [businessModel, setBusinessModel] = useState('');
  const [annualRevenue, setAnnualRevenue] = useState(100000000);
  const [crossBorderPayments, setCrossBorderPayments] = useState(0);
  const [treasuryAllocation, setTreasuryAllocation] = useState(20);
  const [selectedStablecoins, setSelectedStablecoins] = useState<string[]>(['usdc', 'usdt']);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{
    crossBorder: number;
    domesticCard: number;
    payoutVolume: number;
    treasury: number;
    traditional: { 
      cardInterchange: number;
      cardAcquirerFees: number;
      chargebacks: number;
      fraudLosses: number;
      fxCosts: number;
      wireFees: number;
      settlementCost: number;
      complianceCost: number;
      correspondentFees: number;
      automationCosts: number;
      totalCost: number;
      paymentFreq: number;
    };
    analysis: Array<{ id: string; name: string; type: string; yieldPotential: number; riskScore: number; totalSavings: number; treasuryYield: number; totalBenefit: number; savings: { cardInterchange: number; cardFees: number; chargeback: number; fraud: number; fx: number; wire: number; settlement: number; compliance: number; correspondent: number; automation: number } }>;
    best: { id: string; name: string; type: string; yieldPotential: number; totalBenefit: number; savings: { cardInterchange: number; cardFees: number; chargeback: number; fraud: number; fx: number; wire: number; settlement: number; compliance: number; correspondent: number; automation: number }; treasuryYield: number } | null;
    fiveYear: number;
    revenue: number;
    currentMargin: number;
    marginUpliftBps: number;
    newMargin: number;
  } | null>(null);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);
  const savingsChartRef = useRef<HTMLCanvasElement>(null);
  const savingsChartInstanceRef = useRef<any>(null);

  const selectedIndustry = industry ? industries[industry] : null;
  const selectedSize = companySize ? companySizes[companySize] : null;

  const crossBorderEstimate = useMemo(() => {
    if (!selectedIndustry) return 0;
    return annualRevenue * selectedIndustry.crossBorderPct;
  }, [annualRevenue, selectedIndustry]);

  const effectiveCrossBorder = crossBorderPayments > 0 ? crossBorderPayments : crossBorderEstimate;

  const calculateSavings = () => {
    if (!industry || !companySize || !businessModel) {
      alert('Please select industry, company size, and business model');
      return;
    }

    const ind = industries[industry];
    const size = companySizes[companySize];
    const bm = businessModels.find(b => b.id === businessModel)!;
    const crossBorder = effectiveCrossBorder;
    const domesticCard = (annualRevenue - crossBorder) * (ind.domesticCardPct || bm.cardPct);
    const payoutVolume = annualRevenue * (ind.payoutPct || bm.payoutPct);
    const treasury = annualRevenue * size.treasuryPct;
    const paymentFreq = size.paymentFreq;

    const trad = {
      cardInterchange: domesticCard * (ind.cardInterchangeRate || 0.025),
      cardAcquirerFees: domesticCard * 0.005,
      chargebacks: domesticCard * (ind.chargebackRate || bm.chargeback),
      fraudLosses: domesticCard * (ind.fraudRate || bm.fraud),
      fxCosts: crossBorder * ind.fxSpread,
      wireFees: paymentFreq * 35,
      settlementCost: crossBorder * ind.treasuryFloatRate * ind.settlementDays / 365,
      complianceCost: crossBorder * ind.compliance,
      correspondentFees: crossBorder * ind.correspondentRate,
      automationCosts: annualRevenue * 0.0015,
      totalCost: 0,
      paymentFreq
    };
    trad.totalCost = trad.cardInterchange + trad.cardAcquirerFees + trad.chargebacks + trad.fraudLosses + trad.fxCosts + trad.wireFees + trad.settlementCost + trad.complianceCost + trad.correspondentFees + trad.automationCosts;

    const analysis = selectedStablecoins.map(coinId => {
      const coin = stablecoinTypes.find(c => c.id === coinId)!;
      const txCost = paymentFreq * 0.50;
      const savings = {
        cardInterchange: trad.cardInterchange * 0.95,
        cardFees: trad.cardAcquirerFees * 0.95,
        chargeback: trad.chargebacks * 0.85,
        fraud: trad.fraudLosses * 0.85,
        fx: trad.fxCosts * 0.85,
        wire: trad.wireFees * 0.90,
        settlement: trad.settlementCost * 0.95,
        compliance: trad.complianceCost * 0.40,
        correspondent: trad.correspondentFees * 0.95,
        automation: trad.automationCosts * 0.70
      };
      const totalSavings = Object.values(savings).reduce((a, b) => a + b, 0) - txCost;
      const treasuryYield = (treasury * (treasuryAllocation / 100)) * (coin.yieldPotential / 100);
      return { ...coin, txCost, savings, totalSavings, treasuryYield, totalBenefit: totalSavings + treasuryYield };
    });

    const best = analysis.length > 0 ? analysis.reduce((a, b) => a.totalBenefit > b.totalBenefit ? a : b) : null;

    const currentMargin = annualRevenue * size.operatingMarginPct;
    const marginUpliftBps = best ? (best.totalBenefit / annualRevenue) * 10000 : 0;

    setResults({
      revenue: annualRevenue,
      crossBorder,
      domesticCard,
      payoutVolume,
      treasury,
      traditional: trad,
      analysis,
      best,
      fiveYear: best ? best.totalBenefit * 5.5 : 0,
      currentMargin,
      marginUpliftBps,
      newMargin: currentMargin + (best ? best.totalBenefit : 0)
    });
    setShowResults(true);
  };

  useEffect(() => {
    if (showResults && results && results.best) {
      const best = results.best;
      const loadCharts = async () => {
        const { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } = await import('chart.js');
        Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

        // Savings Breakdown Chart
        if (savingsChartRef.current) {
          if (savingsChartInstanceRef.current) {
            savingsChartInstanceRef.current.destroy();
          }

          const savingsData = [
            { label: 'Card Processing', value: best.savings.cardInterchange + best.savings.cardFees, color: '#274D8E' },
            { label: 'Treasury Yield', value: best.treasuryYield, color: '#47B5CB' },
            { label: 'Settlement Speed', value: best.savings.settlement, color: '#4EB9A7' },
            { label: 'FX Costs', value: best.savings.fx, color: 'rgba(39, 77, 142, 0.7)' },
            { label: 'Fraud & Chargebacks', value: best.savings.fraud + best.savings.chargeback, color: 'rgba(71, 181, 203, 0.7)' },
            { label: 'Automation', value: best.savings.automation, color: 'rgba(78, 185, 167, 0.7)' }
          ].sort((a, b) => b.value - a.value);

          savingsChartInstanceRef.current = new Chart(savingsChartRef.current!, {
            type: 'bar',
            data: {
              labels: savingsData.map(d => d.label),
              datasets: [{
                label: 'Annual Savings',
                data: savingsData.map(d => d.value),
                backgroundColor: savingsData.map(d => d.color),
                borderRadius: 4,
              }],
            },
            options: {
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              plugins: { 
                legend: { display: false }, 
                tooltip: { callbacks: { label: (ctx) => formatCurrency(ctx.raw as number) } } 
              },
              scales: { 
                x: { beginAtZero: true, ticks: { callback: (value: number | string) => formatCurrency(Number(value)) } },
                y: { grid: { display: false } }
              },
            },
          });
        }

        // Stablecoin Comparison Chart
        if (chartRef.current) {
          if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
          }

          const labels = results.analysis.map(c => c.name);
          chartInstanceRef.current = new Chart(chartRef.current!, {
            type: 'bar',
            data: {
              labels,
              datasets: [
                { label: 'Cost Savings', data: results.analysis.map(c => c.totalSavings), backgroundColor: '#4EB9A7' },
                { label: 'Treasury Yield', data: results.analysis.map(c => c.treasuryYield), backgroundColor: '#47B5CB' },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label || ''}: ${formatCurrency(ctx.raw as number)}` } } },
              scales: { 
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true, ticks: { callback: (value: number | string) => formatCurrency(Number(value)) } } 
              },
            },
          });
        }
      };
      loadCharts();
    }
  }, [showResults, results]);

  const resetForm = () => {
    setIndustry('');
    setCompanySize('');
    setBusinessModel('');
    setAnnualRevenue(100000000);
    setCrossBorderPayments(0);
    setTreasuryAllocation(20);
    setSelectedStablecoins(['usdc', 'usdt']);
    setShowResults(false);
    setResults(null);
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }
    if (savingsChartInstanceRef.current) {
      savingsChartInstanceRef.current.destroy();
      savingsChartInstanceRef.current = null;
    }
  };

  const toggleCoin = (id: string) => {
    setSelectedStablecoins(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <>
      <SEO 
        title="Stablecoin Savings Calculator | Aryo Consulting Group"
        description="Calculate your potential savings from stablecoin adoption. Discover FX savings, treasury yield, and settlement efficiency gains."
        canonical="/tools/stablecoin-calculator"
      />
      <Navbar />
      
      <header className="bg-gradient-to-br from-aryo-deepBlue to-[#1a3666] pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-50" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-xs font-bold text-aryo-greenTeal tracking-[0.2em] uppercase mb-4 block">Treasury Optimization Tool</span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">Corporate Stablecoin Calculator</h1>
          <p className="text-white/80 text-lg font-light max-w-xl">Quantify FX savings, treasury yield, and settlement efficiency from digital currency adoption.</p>
        </div>
      </header>

      <main className="py-12 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 lg:gap-12">
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="px-7 py-6 border-b border-slate-100">
                <h2 className="font-serif text-xl font-semibold text-aryo-deepBlue">Calculator Parameters</h2>
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
                          <option value="tech">Technology & SaaS</option>
                          <option value="fintech">Financial Services & Fintech</option>
                        </optgroup>
                        <optgroup label="Consumer & Retail">
                          <option value="ecommerce">E-Commerce & Retail</option>
                          <option value="media">Media & Entertainment</option>
                        </optgroup>
                        <optgroup label="Industrial">
                          <option value="manufacturing">Manufacturing & Supply Chain</option>
                          <option value="logistics">Logistics & Transportation</option>
                          <option value="energy">Energy & Commodities</option>
                        </optgroup>
                        <optgroup label="Healthcare">
                          <option value="pharma">Pharmaceuticals & Healthcare</option>
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Company Size</label>
                      <select 
                        value={companySize} 
                        onChange={(e) => {
                          const newSize = e.target.value;
                          setCompanySize(newSize);
                          if (newSize && companySizes[newSize]) {
                            setAnnualRevenue(companySizes[newSize].revenueMidpoint);
                          }
                        }}
                        className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-aryo-deepBlue focus:ring-2 focus:ring-aryo-deepBlue/10 appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: '40px' }}
                        data-testid="select-company-size"
                      >
                        <option value="">Select Company Size</option>
                        {Object.entries(companySizes).map(([key, val]) => (
                          <option key={key} value={key}>{val.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Business Model</label>
                      <select 
                        value={businessModel} 
                        onChange={(e) => setBusinessModel(e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-aryo-deepBlue focus:ring-2 focus:ring-aryo-deepBlue/10 appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: '40px' }}
                        data-testid="select-business-model"
                      >
                        <option value="">Select Business Model</option>
                        {businessModels.map(bm => (
                          <option key={bm.id} value={bm.id}>{bm.label}</option>
                        ))}
                      </select>
                      <p className="text-xs text-slate-400 mt-2">{businessModels.find(bm => bm.id === businessModel)?.description}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-aryo-greenTeal tracking-[0.15em] uppercase mb-5 pb-3 border-b border-slate-100">Financial Parameters</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Annual Revenue <span className="font-normal text-slate-400">(LTM)</span></label>
                      <div className="flex">
                        <span className="px-4 py-3 text-sm font-medium text-slate-500 bg-slate-50 border border-r-0 border-slate-200 rounded-l-lg">$</span>
                        <input 
                          type="text" 
                          value={formatInputCurrency(annualRevenue)} 
                          onChange={(e) => setAnnualRevenue(parseCurrency(e.target.value))}
                          className="flex-1 px-4 py-3 text-sm border border-slate-200 rounded-r-lg focus:outline-none focus:border-aryo-deepBlue"
                          data-testid="input-revenue"
                        />
                      </div>
                      <input type="range" min={10000000} max={10000000000} step={10000000} value={annualRevenue} onChange={(e) => setAnnualRevenue(parseInt(e.target.value))} className="w-full mt-3 h-1 bg-slate-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-aryo-deepBlue [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow" data-testid="slider-revenue" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Cross-Border Payment Volume <span className="font-normal text-slate-400">(Optional)</span></label>
                      <div className="flex">
                        <span className="px-4 py-3 text-sm font-medium text-slate-500 bg-slate-50 border border-r-0 border-slate-200 rounded-l-lg">$</span>
                        <input 
                          type="text" 
                          value={crossBorderPayments > 0 ? formatInputCurrency(crossBorderPayments) : ''} 
                          onChange={(e) => setCrossBorderPayments(parseCurrency(e.target.value))}
                          placeholder={crossBorderEstimate > 0 ? `Est. ${formatCurrency(crossBorderEstimate)}` : 'Based on industry avg'}
                          className="flex-1 px-4 py-3 text-sm border border-slate-200 rounded-r-lg focus:outline-none focus:border-aryo-deepBlue placeholder:text-slate-400"
                          data-testid="input-crossborder"
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-2">Defaults to industry average ({selectedIndustry ? `${(selectedIndustry.crossBorderPct * 100).toFixed(0)}%` : '—'})</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700">Treasury Allocation</label>
                        <span className="text-base font-semibold text-aryo-deepBlue">{treasuryAllocation}%</span>
                      </div>
                      <input type="range" min={0} max={50} step={5} value={treasuryAllocation} onChange={(e) => setTreasuryAllocation(parseInt(e.target.value))} className="w-full h-1 bg-slate-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-aryo-deepBlue [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow" data-testid="slider-allocation" />
                      <div className="flex justify-between text-xs text-slate-400 mt-2">
                        <span>Conservative</span>
                        <span>Aggressive</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">% of idle cash deployed into yield-bearing stablecoins</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-aryo-greenTeal tracking-[0.15em] uppercase mb-5 pb-3 border-b border-slate-100">Stablecoin Selection</h3>
                  <div className="space-y-2">
                    {stablecoinTypes.map((coin) => (
                      <button
                        key={coin.id}
                        onClick={() => toggleCoin(coin.id)}
                        className={`w-full p-3 text-left rounded-lg border transition-all flex items-center justify-between ${selectedStablecoins.includes(coin.id) ? 'bg-aryo-deepBlue text-white border-aryo-deepBlue' : 'bg-slate-50 border-slate-200'}`}
                        data-testid={`button-coin-${coin.id}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedStablecoins.includes(coin.id) ? 'bg-white border-white' : 'border-slate-300'}`}>
                            {selectedStablecoins.includes(coin.id) && <Check size={12} className="text-aryo-deepBlue" />}
                          </div>
                          <div>
                            <div className={`font-semibold text-sm ${selectedStablecoins.includes(coin.id) ? 'text-white' : 'text-slate-800'}`}>{coin.name}</div>
                            <div className={`text-xs ${selectedStablecoins.includes(coin.id) ? 'text-white/70' : 'text-slate-500'}`}>{coin.type} • {coin.yieldPotential}% yield</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-xs font-semibold text-slate-600 mb-3">Traditional Payment Costs Include:</div>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      'Card interchange & acquirer fees (1.5-3.5%)',
                      'FX conversion spreads & wire fees',
                      'Settlement float cost',
                      'Chargebacks & fraud losses',
                      'Correspondent banking',
                      'Compliance overhead',
                      'Manual reconciliation'
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-slate-500">
                        <Check size={14} className="text-aryo-greenTeal flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-slate-100">
                  <button onClick={calculateSavings} className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-aryo-deepBlue text-white font-semibold rounded-lg transition-colors" data-testid="button-calculate">
                    <DollarSign size={16} />
                    Calculate Savings
                  </button>
                  <button onClick={resetForm} className="px-6 py-3.5 bg-white text-slate-600 font-semibold rounded-lg border border-slate-200 transition-colors" data-testid="button-reset">
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {!showResults ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <svg className="w-16 h-16 mx-auto mb-6 text-slate-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-serif text-xl font-semibold text-aryo-deepBlue mb-3">Configure Your Analysis</h3>
                  <p className="text-slate-500 max-w-md mx-auto">Select your industry, company size, and business model, then click "Calculate Savings" to generate a comprehensive stablecoin savings analysis.</p>
                </div>
              ) : results && results.best && (
                <>
                  <div className="bg-white rounded-xl border border-slate-200 p-10 relative overflow-hidden">
                    <div className="relative z-10">
                      <span className="text-xs font-bold tracking-[0.2em] uppercase text-aryo-teal mb-4 block">Estimated Annual Savings</span>
                      <div className="font-serif text-3xl md:text-4xl font-semibold text-aryo-deepBlue mb-2" data-testid="text-total-savings">{formatCurrency(results.best.totalBenefit)}</div>
                      <div className="text-lg text-slate-600 font-light" data-testid="text-five-year">5-Year Projection: {formatCurrency(results.fiveYear)}</div>
                      <div className="flex gap-6 mt-6 pt-6 border-t border-slate-200">
                        <div className="flex-1">
                          <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Recommended</div>
                          <div className="text-base font-semibold text-aryo-deepBlue" data-testid="text-recommended-coin">{results.best.name} ({results.best.type})</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Treasury Yield</div>
                          <div className="text-base font-semibold text-aryo-deepBlue" data-testid="text-treasury-yield">{results.best.yieldPotential}% APY</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200">
                    <div className="px-6 py-5 border-b border-slate-100">
                      <h3 className="font-serif text-lg font-semibold text-aryo-deepBlue">Savings Breakdown (Ranked by Impact)</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative">
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-aryo-deepBlue rounded-r" />
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold bg-aryo-deepBlue/10 text-aryo-deepBlue px-2 py-0.5 rounded">#1 Highest Impact</span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <Zap size={14} className="text-aryo-deepBlue" />
                            <span className="text-sm font-semibold text-aryo-deepBlue">Card Processing</span>
                          </div>
                          <div className="text-lg font-bold text-slate-800 mb-1">{formatCurrency(results.traditional.cardInterchange + results.traditional.cardAcquirerFees)}</div>
                          <div className="text-xs text-aryo-greenTeal font-semibold">Save {formatCurrency(results.best.savings.cardInterchange + results.best.savings.cardFees)}</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative">
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-aryo-teal rounded-r" />
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold bg-aryo-teal/10 text-aryo-teal px-2 py-0.5 rounded">#2 Float Capture</span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <RefreshCw size={14} className="text-aryo-teal" />
                            <span className="text-sm font-semibold text-aryo-deepBlue">Reserves Yield</span>
                          </div>
                          <div className="text-lg font-bold text-aryo-greenTeal mb-1">+{formatCurrency(results.best.treasuryYield)}</div>
                          <div className="text-xs text-slate-500">{treasuryAllocation}% allocation @ {results.best.yieldPotential}%</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative">
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-aryo-greenTeal rounded-r" />
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold bg-aryo-greenTeal/10 text-aryo-greenTeal px-2 py-0.5 rounded">#3 ROIC Gain</span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <Clock size={14} className="text-aryo-greenTeal" />
                            <span className="text-sm font-semibold text-aryo-deepBlue">Settlement Speed</span>
                          </div>
                          <div className="text-lg font-bold text-slate-800 mb-1">{formatCurrency(results.traditional.settlementCost)}</div>
                          <div className="text-xs text-aryo-greenTeal font-semibold">Save {formatCurrency(results.best.savings.settlement)}</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative">
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-aryo-deepBlue/70 rounded-r" />
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-aryo-deepBlue flex items-center gap-2"><RefreshCw size={14} className="text-aryo-deepBlue/70" /> FX Costs (Current)</span>
                          </div>
                          <div className="text-lg font-bold text-slate-800 mb-1">{formatCurrency(results.traditional.fxCosts)}</div>
                          <div className="text-xs text-aryo-greenTeal font-semibold">Save {formatCurrency(results.best.savings.fx)}</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative">
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-aryo-teal/70 rounded-r" />
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-aryo-deepBlue flex items-center gap-2"><AlertCircle size={14} className="text-aryo-teal/70" /> Fraud & Chargebacks</span>
                          </div>
                          <div className="text-lg font-bold text-slate-800 mb-1">{formatCurrency(results.traditional.fraudLosses + results.traditional.chargebacks)}</div>
                          <div className="text-xs text-aryo-greenTeal font-semibold">Save {formatCurrency(results.best.savings.fraud + results.best.savings.chargeback)}</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative">
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-aryo-greenTeal/70 rounded-r" />
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-aryo-deepBlue flex items-center gap-2"><Zap size={14} className="text-aryo-greenTeal/70" /> Automation</span>
                          </div>
                          <div className="text-lg font-bold text-slate-800 mb-1">{formatCurrency(results.traditional.automationCosts)}</div>
                          <div className="text-xs text-aryo-greenTeal font-semibold">Save {formatCurrency(results.best.savings.automation)}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200">
                    <div className="px-6 py-5 border-b border-slate-100">
                      <h3 className="text-base font-semibold text-aryo-deepBlue">Savings by Category</h3>
                    </div>
                    <div className="p-6">
                      <div className="h-[280px]">
                        <canvas ref={savingsChartRef} data-testid="chart-savings-breakdown" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200">
                    <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="text-base font-semibold text-aryo-deepBlue">Stablecoin Comparison</h3>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="w-2.5 h-2.5 rounded-sm bg-aryo-greenTeal" /> Cost Savings
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="w-2.5 h-2.5 rounded-sm bg-aryo-teal" /> Treasury Yield
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="h-[300px]">
                        <canvas ref={chartRef} data-testid="chart-comparison" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200">
                    <div className="px-6 py-5 border-b border-slate-100">
                      <h3 className="font-serif text-lg font-semibold text-aryo-deepBlue">Industry-Specific Savings Drivers</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedIndustry?.primaryDrivers.map((driver, idx) => (
                          <div key={idx} className="bg-slate-50 rounded-lg p-4 flex items-start gap-3">
                            <Check size={16} className="text-aryo-greenTeal mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-700 font-medium">{driver}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200">
                    <div className="px-6 py-5 border-b border-slate-100">
                      <h3 className="font-serif text-lg font-semibold text-aryo-deepBlue">EBITDA Margin Impact Analysis</h3>
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="flex items-center justify-center gap-4 md:gap-8">
                        <div className="text-center">
                          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Current Margin</div>
                          <div className="text-3xl md:text-4xl font-bold text-slate-700">{(results.currentMargin / results.revenue * 100).toFixed(1)}%</div>
                          <div className="text-sm text-slate-400 mt-1">{formatCurrency(results.currentMargin)}</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-slate-300 via-aryo-teal to-aryo-greenTeal relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-aryo-teal rounded-full p-1">
                              <TrendingUp className="w-4 h-4 text-aryo-greenTeal" />
                            </div>
                          </div>
                          <div className="mt-3 px-3 py-1 bg-aryo-greenTeal/10 rounded-full">
                            <span className="text-sm font-bold text-aryo-greenTeal">+{results.marginUpliftBps.toFixed(0)} bps</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-medium text-aryo-greenTeal uppercase tracking-wide mb-2">Projected Margin</div>
                          <div className="text-3xl md:text-4xl font-bold text-aryo-greenTeal">{(results.newMargin / results.revenue * 100).toFixed(1)}%</div>
                          <div className="text-sm text-slate-400 mt-1">{formatCurrency(results.newMargin)}</div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-aryo-deepBlue/5 via-aryo-teal/5 to-aryo-greenTeal/5 rounded-lg p-5 border border-aryo-teal/20">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-aryo-greenTeal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <TrendingUp className="w-4 h-4 text-aryo-greenTeal" />
                          </div>
                          <div>
                            <div className="font-semibold text-aryo-deepBlue mb-1">Margin Expansion Insight</div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Stablecoin adoption drives a <span className="font-semibold text-aryo-greenTeal">{results.marginUpliftBps.toFixed(0)} basis point</span> improvement to your operating margin, translating to an additional <span className="font-semibold text-aryo-greenTeal">{formatCurrency(results.best.totalBenefit)}</span> in annual operating income. This represents a <span className="font-semibold text-aryo-greenTeal">{((results.best.totalBenefit / results.currentMargin) * 100).toFixed(1)}%</span> increase in bottom-line profitability without revenue growth.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-xs text-slate-500 mb-1">EBITDA Add-Back</div>
                          <div className="text-lg font-bold text-aryo-deepBlue">{formatCurrency(results.best.totalBenefit)}</div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-xs text-slate-500 mb-1">% of Current EBITDA</div>
                          <div className="text-lg font-bold text-aryo-teal">+{((results.best.totalBenefit / results.currentMargin) * 100).toFixed(1)}%</div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-xs text-slate-500 mb-1">5-Year Value</div>
                          <div className="text-lg font-bold text-aryo-greenTeal">{formatCurrency(results.fiveYear)}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200">
                    <div className="px-6 py-5 border-b border-slate-100">
                      <h3 className="font-serif text-lg font-semibold text-aryo-deepBlue">Strategic Insights</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                          <Clock className="w-6 h-6 mx-auto text-aryo-teal mb-2" />
                          <div className="text-lg font-bold text-aryo-deepBlue">{selectedIndustry?.settlementDays}d → 3min</div>
                          <div className="text-xs text-slate-500">Settlement Time</div>
                        </div>
                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                          <Globe className="w-6 h-6 mx-auto text-aryo-teal mb-2" />
                          <div className="text-lg font-bold text-aryo-deepBlue">{formatCurrency(results.crossBorder)}</div>
                          <div className="text-xs text-slate-500">Volume Optimized</div>
                        </div>
                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                          <Wallet className="w-6 h-6 mx-auto text-aryo-teal mb-2" />
                          <div className="text-lg font-bold text-aryo-deepBlue">{formatCurrency(results.treasury * (treasuryAllocation / 100))}</div>
                          <div className="text-xs text-slate-500">Earning Yield</div>
                        </div>
                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                          <TrendingUp className="w-6 h-6 mx-auto text-aryo-teal mb-2" />
                          <div className="text-lg font-bold text-aryo-deepBlue">{((results.best.totalBenefit / results.revenue) * 100).toFixed(2)}%</div>
                          <div className="text-xs text-slate-500">Revenue Impact</div>
                        </div>
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
