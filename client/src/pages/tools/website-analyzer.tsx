import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Target, BarChart3, Zap, Shield, ArrowLeft, CheckCircle, AlertCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar, Footer } from '@/components/layout';
import { SEO, breadcrumbSchema } from '@/components/seo';
import { useToast } from '@/hooks/use-toast';

interface Category {
  name: string;
  score: number;
  grade: string;
  findings: string[];
  recommendations: string[];
  priority: 'high' | 'medium' | 'low';
}

interface AnalysisData {
  overallScore: number;
  grade: string;
  summary: string;
  categories: Category[];
  quickWins: string[];
  criticalIssues: string[];
  strengths: string[];
}

export default function WebsiteAnalyzer() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    url: string;
    screenshot: string;
    pageData: any;
    analysis: AnalysisData;
    timestamp: string;
  } | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/tools/website-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data);
      toast({
        title: 'Analysis Complete',
        description: `Analyzed ${data.url} successfully`,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to analyze website',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getGradeColor = (grade: string) => {
    const colors: Record<string, string> = {
      'A': 'bg-aryo-greenTeal',
      'B': 'bg-aryo-teal',
      'C': 'bg-yellow-500',
      'D': 'bg-orange-500',
      'F': 'bg-red-500'
    };
    return colors[grade] || 'bg-aryo-lightGrey';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-aryo-greenTeal';
    if (score >= 60) return 'text-aryo-teal';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const features = [
    {
      icon: Target,
      title: 'Comprehensive Analysis',
      description: 'Deep dive into 10 critical categories including CTA effectiveness, trust signals, and mobile optimization.'
    },
    {
      icon: BarChart3,
      title: 'Visual Reports',
      description: 'Get detailed screenshots and visual breakdowns of your website with actionable insights.'
    },
    {
      icon: Zap,
      title: 'Quick Wins',
      description: 'Identify high-impact, low-effort improvements that can boost your conversion rate immediately.'
    },
    {
      icon: Shield,
      title: 'Expert Grading',
      description: 'Receive professional A-F grades across all categories with specific recommendations.'
    }
  ];

  return (
    <div className="min-h-screen bg-aryo-offWhite">
      <SEO 
        title="Website Analyzer | Aryo Consulting Group"
        description="Analyze your website's performance and conversion optimization with AI-powered insights and professional grading."
        canonical="https://aryocg.com/tools/website-analyzer"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "https://aryocg.com" },
          { name: "Website Analyzer", url: "https://aryocg.com/tools/website-analyzer" },
        ])}
      />
      <Navbar />

      {!result ? (
        <>
          {/* Hero Section */}
          <section className="py-32 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase mb-4 block"
              >
                Professional Website Analysis
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-aryo-deepBlue mb-6"
              >
                Analyze Your Website's
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-aryo-deepBlue to-aryo-teal"> Conversion Potential</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-600 font-light mb-10 max-w-2xl mx-auto"
              >
                Get a comprehensive website analysis with AI-powered insights, actionable recommendations, 
                and professional grading across 10 critical categories.
              </motion.p>

              {/* URL Input Form */}
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto"
              >
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-aryo-lightGrey" />
                    <Input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter website URL (e.g., example.com)"
                      className="w-full pl-12 pr-4 py-4 bg-white border-2 border-aryo-lightGrey rounded-xl 
                               focus:border-aryo-teal focus:ring-2 focus:ring-aryo-teal/20 
                               transition-all text-lg h-auto"
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading || !url.trim()}
                    className="bg-aryo-deepBlue text-white px-6 py-4 rounded-xl font-semibold 
                             hover:bg-aryo-teal transition-colors duration-200 
                             disabled:opacity-50 disabled:cursor-not-allowed h-auto"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Analyzing...
                      </span>
                    ) : (
                      'Analyze Site'
                    )}
                  </Button>
                </div>
              </motion.form>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase mb-4 block">Features</span>
                <h2 className="text-4xl font-bold text-aryo-deepBlue mb-4">
                  What You Get
                </h2>
                <p className="text-slate-600 font-light max-w-2xl mx-auto">
                  A complete conversion rate optimization analysis with actionable insights
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="p-6 bg-aryo-offWhite rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 bg-aryo-teal/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-aryo-teal" />
                    </div>
                    <h3 className="text-lg font-semibold text-aryo-deepBlue mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm font-light">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Analysis Categories */}
          <section className="py-20 px-6 lg:px-8 bg-aryo-offWhite">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase mb-4 block">Categories</span>
                <h2 className="text-4xl font-bold text-aryo-deepBlue mb-4">
                  10 Critical Website Categories
                </h2>
                <p className="text-slate-600 font-light">
                  We analyze every aspect that impacts your conversion rate
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  'Visual Hierarchy & Design',
                  'Call-to-Action Effectiveness',
                  'Value Proposition Clarity',
                  'Trust & Credibility',
                  'Form Optimization',
                  'Mobile Responsiveness',
                  'Page Speed & Performance',
                  'Navigation & UX',
                  'Content Quality',
                  'Social Proof Elements'
                ].map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-aryo-lightGrey"
                  >
                    <div className="w-8 h-8 bg-aryo-deepBlue rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="font-medium text-aryo-deepBlue">{category}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Results Section */
        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => setResult(null)}
              className="flex items-center gap-2 text-slate-600 hover:text-aryo-deepBlue transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Button>
          </motion.div>

          {/* URL & Timestamp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase mb-2 block">Results</span>
            <h1 className="text-4xl font-bold text-aryo-deepBlue mb-2">
              Analysis Results
            </h1>
            <p className="text-slate-600 font-light">
              <span className="font-medium">URL:</span> {result.url}
            </p>
            <p className="text-slate-500 text-sm">
              Analyzed on {new Date(result.timestamp).toLocaleString()}
            </p>
          </motion.div>

          {/* Overall Score Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-aryo-lightGrey"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className={`w-32 h-32 ${getGradeColor(result.analysis.grade)} rounded-full flex items-center justify-center shadow-lg`}>
                  <div className="text-center text-white">
                    <div className="text-5xl font-bold">{result.analysis.grade}</div>
                    <div className="text-sm opacity-90">Grade</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className={`text-6xl font-bold ${getScoreColor(result.analysis.overallScore)} mb-2`}>
                  {result.analysis.overallScore}/100
                </div>
                <h2 className="text-2xl font-bold text-aryo-deepBlue mb-3">Overall Website Score</h2>
                <p className="text-slate-600 font-light text-lg">{result.analysis.summary}</p>
              </div>
            </div>
          </motion.div>

          {/* Screenshot & Page Data */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-xl shadow-sm p-6 border border-aryo-lightGrey">
                <h3 className="text-lg font-bold text-aryo-deepBlue mb-4">Website Screenshot</h3>
                <div className="overflow-auto max-h-[600px] rounded-lg border border-aryo-lightGrey">
                  <img
                    src={result.screenshot}
                    alt="Website Screenshot"
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-sm text-slate-500 mt-2 font-light">
                  Full-page screenshot captured at {new Date(result.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-sm p-6 border border-aryo-lightGrey">
                <h3 className="text-lg font-bold text-aryo-deepBlue mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-aryo-teal" />
                  Page Overview
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-slate-500">Title</span>
                    <p className="text-aryo-deepBlue font-medium">{result.pageData.title}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">Meta Description</span>
                    <p className="text-slate-700 text-sm font-light">{result.pageData.metaDescription || 'Not found'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-slate-500">H1 Tags</span>
                      <p className="text-2xl font-bold text-aryo-teal">{result.pageData.h1s.length}</p>
                    </div>
                    <div>
                      <span className="text-sm text-slate-500">H2 Tags</span>
                      <p className="text-2xl font-bold text-aryo-teal">{result.pageData.h2s.length}</p>
                    </div>
                    <div>
                      <span className="text-sm text-slate-500">CTAs</span>
                      <p className="text-2xl font-bold text-aryo-teal">{result.pageData.ctas.length}</p>
                    </div>
                    <div>
                      <span className="text-sm text-slate-500">Forms</span>
                      <p className="text-2xl font-bold text-aryo-teal">{result.pageData.forms.length}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-aryo-lightGrey">
                    <div className="flex items-center gap-2">
                      {result.pageData.socialProof ? (
                        <CheckCircle className="w-5 h-5 text-aryo-greenTeal" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="text-sm">Social Proof</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {result.pageData.trustBadges ? (
                        <CheckCircle className="w-5 h-5 text-aryo-greenTeal" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="text-sm">Trust Badges</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Wins & Critical Issues */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {result.analysis.quickWins.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-aryo-greenTeal/10 rounded-xl p-6 border border-aryo-greenTeal/30"
              >
                <h3 className="text-lg font-bold text-aryo-deepBlue mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-aryo-greenTeal" />
                  Quick Wins
                </h3>
                <p className="text-aryo-deepBlue/70 text-sm mb-4 font-light">
                  High-impact, low-effort improvements to boost conversions fast
                </p>
                <ul className="space-y-3">
                  {result.analysis.quickWins.slice(0, 5).map((win, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm border border-aryo-lightGrey"
                    >
                      <div className="w-8 h-8 bg-aryo-greenTeal/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-aryo-greenTeal font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-aryo-deepBlue text-sm font-light">{win}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {result.analysis.criticalIssues.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 rounded-xl p-6 border border-red-200"
              >
                <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Critical Issues
                </h3>
                <p className="text-red-700 text-sm mb-4 font-light">
                  These issues could be significantly hurting your conversion rate
                </p>
                <ul className="space-y-3">
                  {result.analysis.criticalIssues.slice(0, 5).map((issue, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm border border-aryo-lightGrey"
                    >
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-aryo-deepBlue text-sm font-light">{issue}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Category Scores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase mb-2 block">Categories</span>
            <h2 className="text-4xl font-bold text-aryo-deepBlue mb-6 flex items-center gap-2">
              <Lightbulb className="w-8 h-8 text-aryo-teal" />
              Category Analysis
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {result.analysis.categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-aryo-lightGrey"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-aryo-deepBlue">{category.name}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                        category.priority === 'high' ? 'bg-red-100 text-red-700' :
                        category.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-aryo-greenTeal/20 text-aryo-deepBlue'
                      }`}>
                        {category.priority === 'high' ? <AlertCircle className="w-4 h-4 text-red-500" /> :
                         category.priority === 'medium' ? <AlertCircle className="w-4 h-4 text-yellow-500" /> :
                         <CheckCircle className="w-4 h-4 text-aryo-greenTeal" />}
                        {category.priority.charAt(0).toUpperCase() + category.priority.slice(1)} Priority
                      </span>
                    </div>
                    <div className="text-right">
                      <div className={`w-12 h-12 ${getGradeColor(category.grade)} rounded-full flex items-center justify-center text-white font-bold`}>
                        {category.grade}
                      </div>
                      <div className={`text-xl font-bold ${getScoreColor(category.score)} mt-1`}>
                        {category.score}
                      </div>
                    </div>
                  </div>

                  {category.findings.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-aryo-deepBlue mb-2">Findings:</h4>
                      <ul className="space-y-1">
                        {category.findings.slice(0, 3).map((finding, idx) => (
                          <li key={idx} className="text-sm text-slate-600 flex items-start gap-2 font-light">
                            <span className="text-aryo-lightGrey mt-1">•</span>
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {category.recommendations.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-aryo-deepBlue mb-2">Recommendations:</h4>
                      <ul className="space-y-1">
                        {category.recommendations.slice(0, 3).map((rec, idx) => (
                          <li key={idx} className="text-sm text-aryo-teal flex items-start gap-2">
                            <span className="text-aryo-teal mt-1">→</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Strengths Section */}
          {result.analysis.strengths.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-aryo-greenTeal/10 rounded-xl p-6 border border-aryo-greenTeal/30"
            >
              <h3 className="text-lg font-bold text-aryo-deepBlue mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-aryo-greenTeal" />
                What's Working Well
              </h3>
              <ul className="space-y-2">
                {result.analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-aryo-deepBlue">
                    <span className="text-aryo-greenTeal mt-1">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </main>
      )}
      <Footer />
    </div>
  );
}
