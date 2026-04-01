import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, BarChart3, Zap, Shield, ArrowLeft, CheckCircle, AlertCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/layout';
import { SEO } from '@/components/seo';
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

export default function PitchDeckAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    filename: string;
    analysis: AnalysisData;
    timestamp: string;
  } | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/tools/pitch-deck-analyze', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data);
      toast({
        title: 'Analysis Complete',
        description: `Analyzed ${data.filename} successfully`,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to analyze pitch deck',
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
      icon: FileText,
      title: 'Comprehensive Analysis',
      description: 'Deep dive into 10 critical pitch deck categories including structure, content, and visual design.'
    },
    {
      icon: BarChart3,
      title: 'Professional Grading',
      description: 'Receive expert A-F grades with detailed feedback on each aspect of your pitch deck.'
    },
    {
      icon: Zap,
      title: 'Quick Wins',
      description: 'Identify high-impact improvements that can significantly improve your investor appeal.'
    },
    {
      icon: Shield,
      title: 'Investor-Ready Insights',
      description: 'Get actionable recommendations based on what top investors look for in pitch decks.'
    }
  ];

  return (
    <div className="min-h-screen bg-aryo-offWhite">
      <SEO 
        title="Pitch Deck Analyzer | Aryo Consulting Group"
        description="Analyze your pitch deck with AI-powered insights and professional grading to impress investors."
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
                AI-Powered Analysis
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-aryo-deepBlue mb-6"
              >
                Perfect Your
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-aryo-deepBlue to-aryo-teal"> Pitch Deck</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-600 font-light mb-10 max-w-2xl mx-auto"
              >
                Get comprehensive AI-powered analysis of your pitch deck with professional grading 
                across 10 critical categories to impress investors and secure funding.
              </motion.p>

              {/* File Upload Form */}
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto"
              >
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <Input
                      type="file"
                      accept=".pdf,.ppt,.pptx"
                      onChange={handleFileChange}
                      className="w-full py-4 px-4 bg-white border-2 border-aryo-lightGrey rounded-xl 
                               focus:border-aryo-teal focus:ring-2 focus:ring-aryo-teal/20 
                               transition-all text-lg h-auto file:mr-4 file:py-2 file:px-4
                               file:rounded-full file:border-0 file:text-sm file:font-semibold
                               file:bg-aryo-deepBlue file:text-white hover:file:bg-aryo-teal"
                      disabled={isLoading}
                    />
                  </div>
                  {file && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <FileText className="w-5 h-5" />
                      <span>{file.name}</span>
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={isLoading || !file}
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
                      <span className="flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        Analyze Pitch Deck
                      </span>
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
                  Professional pitch deck analysis to help you secure funding
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
                  10 Critical Pitch Deck Categories
                </h2>
                <p className="text-slate-600 font-light">
                  We analyze every aspect that impacts investor decisions
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  'Structure & Flow',
                  'Visual Design',
                  'Content Clarity',
                  'Financial Section',
                  'Team Presentation',
                  'Market Analysis',
                  'Call to Action',
                  'Length & Density',
                  'Data Visualization',
                  'Overall Impact'
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

          {/* File & Timestamp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="text-xs font-bold font-sans text-aryo-greenTeal tracking-[0.2em] uppercase mb-2 block">Results</span>
            <h1 className="text-4xl font-bold text-aryo-deepBlue mb-2">
              Pitch Deck Analysis
            </h1>
            <p className="text-slate-600 font-light">
              <span className="font-medium">File:</span> {result.filename}
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
                <h2 className="text-2xl font-bold text-aryo-deepBlue mb-3">Overall Pitch Deck Score</h2>
                <p className="text-slate-600 font-light text-lg">{result.analysis.summary}</p>
              </div>
            </div>
          </motion.div>

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
                  High-impact improvements to boost investor appeal fast
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
                  These issues could be hurting your chances with investors
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
    </div>
  );
}
