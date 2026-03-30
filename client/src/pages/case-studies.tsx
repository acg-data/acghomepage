import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'wouter';
import type { CaseStudy } from '@shared/schema';
import { 
  ArrowRight, 
  ArrowLeft, 
  Building2, 
  TrendingUp, 
  CheckCircle,
  ChevronRight,
  Download
} from 'lucide-react';
import { PageLayout } from '@/components/layout';
import { SEO } from '@/components/seo';
import { useWPCaseStudies, useWPCaseStudy, type WPCaseStudy } from '@/lib/wordpress';

interface CaseStudyExtended extends CaseStudy {
  pdfDownload?: string;
  stats?: { label: string; value: string }[];
}

const fallbackCaseStudies: CaseStudyExtended[] = [
  {
    id: 'greenace',
    title: 'How We Increased GreenAce\'s Revenue by 62% in 6 Months',
    client: 'GreenAce Lawn Care, LLC',
    industry: 'Lawn Care & Landscaping',
    challenge: 'Despite strong operational performance and a solid local reputation, GreenAce faced stalled growth and inconsistent revenue predictability. Their online positioning emphasized general lawn care rather than higher-margin services like patios and drainage, attracting price-sensitive inquiries. They had limited visibility in high-income neighborhoods where larger projects were concentrated.',
    solution: 'We replaced fragmented marketing efforts with a structured, profit-focused growth system. We aligned the website with the Google Business Profile, redesigned service pages around high-margin offerings, and strengthened local authority signals across target service areas. We implemented structured follow-up processes, targeted PPC campaigns separated by service type, and repositioned social media as a credibility tool highlighting real projects in specific neighborhoods.',
    results: 'Website traffic increased by 58%. Conversion rate improved by 37%. Overall revenue grew by 62%. Growth became structured, lead quality improved, and marketing became measurable. Instead of chasing more jobs, GreenAce began attracting the right jobs.',
    valueUnlocked: '+62% Revenue',
    slug: 'greenace-digital-growth',
    featured: true,
    imageUrl: null,
    createdAt: new Date(),
    pdfDownload: '/api/case-studies/greenace-digital/download',
    stats: [
      { label: 'Website Traffic', value: '+58%' },
      { label: 'Conversion Rate', value: '+37%' },
      { label: 'Overall Revenue', value: '+62%' },
    ],
  },
  {
    id: '1',
    title: 'Private Equity Portfolio Optimization',
    client: 'Meridian Capital Partners',
    industry: 'Financial Services',
    challenge: 'A mid-market private equity firm was struggling with portfolio company performance visibility and lacked standardized operational metrics across their 12-company portfolio.',
    solution: 'Aryo implemented a comprehensive operational dashboard system with standardized KPIs, integrated financial reporting, and predictive analytics for early intervention on underperforming assets.',
    results: 'Portfolio EBITDA improved 23% within 18 months. Early warning system identified 3 at-risk investments before they became critical, enabling proactive restructuring.',
    valueUnlocked: '$47M',
    slug: 'meridian-capital-pe-optimization',
    featured: true,
    imageUrl: null,
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Post-Merger Integration Excellence',
    client: 'Apex Global Industries',
    industry: 'Manufacturing',
    challenge: 'Following a $2.1B acquisition, the client faced significant integration challenges including redundant systems, cultural misalignment, and synergy realization delays.',
    solution: 'We deployed a 16-week integration accelerator program with dedicated workstreams for technology consolidation, talent retention, and operational harmonization.',
    results: 'Achieved 94% of projected synergies within first year. Reduced system consolidation timeline from 24 months to 14 months. Retained 98% of key talent.',
    valueUnlocked: '$156M',
    slug: 'apex-global-pmi',
    featured: true,
    imageUrl: null,
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Digital Transformation in Healthcare',
    client: 'Regional Health Network',
    industry: 'Healthcare',
    challenge: 'A 6-hospital network was operating with fragmented legacy systems, manual revenue cycle processes, and growing cyber security vulnerabilities.',
    solution: 'Aryo orchestrated a phased digital transformation including EHR optimization, RPA implementation for revenue cycle, and comprehensive cyber security framework.',
    results: 'Revenue cycle efficiency improved 34%. Denial rates reduced by 41%. Zero successful cyber intrusions post-implementation.',
    valueUnlocked: '$28M',
    slug: 'regional-health-digital',
    featured: false,
    imageUrl: null,
    createdAt: new Date(),
  },
  {
    id: '4',
    title: 'SaaS Turnaround Strategy',
    client: 'CloudSync Technologies',
    industry: 'Technology',
    challenge: 'A high-growth SaaS company was experiencing unsustainable CAC, elevated churn rates, and declining unit economics despite strong revenue growth.',
    solution: 'We redesigned the go-to-market strategy, implemented customer success programs, and restructured pricing tiers based on value-based pricing methodology.',
    results: 'CAC reduced by 45%. Annual churn decreased from 18% to 7%. LTV:CAC ratio improved from 2.1x to 4.8x.',
    valueUnlocked: '$62M',
    slug: 'cloudsync-turnaround',
    featured: true,
    imageUrl: null,
    createdAt: new Date(),
  },
];

function CaseStudyCard({ study }: { study: CaseStudyExtended }) {
  return (
    <div className="bg-white border border-aryo-lightGrey p-8 hover:border-aryo-deepBlue transition-all group h-full flex flex-col" data-testid={`card-case-study-${study.id}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">{study.industry}</span>
        {study.featured && (
          <span className="text-xs font-bold bg-aryo-deepBlue text-white px-2 py-0.5 uppercase tracking-wider">Featured</span>
        )}
      </div>
      <Link href={`/case-studies/${study.slug}`} className="cursor-pointer">
        <h3 className="text-xl font-serif font-bold text-aryo-deepBlue mb-2 group-hover:text-aryo-teal transition-colors">{study.title}</h3>
      </Link>
      <p className="text-sm text-slate-500 mb-4">{study.client}</p>
      <p className="text-slate-600 mb-6 flex-1 line-clamp-3">{study.challenge}</p>
      {study.stats && (
        <div className="flex gap-4 mb-6">
          {study.stats.map((stat) => (
            <div key={stat.label} className="bg-aryo-offWhite px-3 py-2 flex-1 text-center">
              <p className="text-lg font-serif font-bold text-aryo-deepBlue">{stat.value}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between pt-4 border-t border-aryo-lightGrey">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest">Value Unlocked</p>
          <p className="text-2xl font-serif text-aryo-deepBlue">{study.valueUnlocked}</p>
        </div>
        <Link href={`/case-studies/${study.slug}`} className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest hover:text-aryo-teal transition-colors flex items-center gap-2" data-testid={`link-read-more-${study.id}`}>
            Read More <ArrowRight size={14} />
          </Link>
      </div>
    </div>
  );
}

function wpToExtended(wp: WPCaseStudy): CaseStudyExtended {
  return {
    id: wp.id,
    title: wp.title,
    client: wp.client,
    industry: wp.industry,
    challenge: wp.challenge,
    solution: wp.solution,
    results: wp.results,
    valueUnlocked: wp.valueUnlocked,
    slug: wp.slug,
    featured: wp.featured,
    imageUrl: wp.imageUrl,
    createdAt: new Date(),
    pdfDownload: wp.pdfDownload,
    stats: wp.stats,
  };
}

function CaseStudyDetail({ slug }: { slug: string }) {
  const { data: wpStudy, isLoading: wpLoading } = useWPCaseStudy(slug);
  const fallback = fallbackCaseStudies.find(s => s.slug === slug);
  const study = (wpStudy && wpStudy.title) ? wpToExtended(wpStudy) : fallback;

  if (wpLoading && !fallback) {
    return (
      <PageLayout>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            <div className="h-12 bg-slate-200 rounded w-2/3"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen bg-aryo-offWhite flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-aryo-deepBlue mb-4">Case Study Not Found</h1>
          <Link href="/case-studies" className="text-aryo-teal hover:text-aryo-deepBlue transition-colors">
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/case-studies" className="flex items-center gap-2 text-aryo-deepBlue hover:text-aryo-teal transition-colors mb-8" data-testid="link-back-case-studies">
          <ArrowLeft size={16} />
          <span className="text-sm font-bold uppercase tracking-widest">All Case Studies</span>
        </Link>

        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <Link href="/" className="hover:text-aryo-deepBlue">Home</Link>
          <ChevronRight size={14} />
          <Link href="/case-studies" className="hover:text-aryo-deepBlue">Case Studies</Link>
          <ChevronRight size={14} />
          <span className="text-aryo-deepBlue">{study.client}</span>
        </div>

        <div className="bg-white border border-aryo-lightGrey p-12 mb-8">
          <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">{study.industry}</span>
          <h1 className="text-4xl font-serif text-aryo-deepBlue mt-4 mb-4">{study.title}</h1>
          <p className="text-xl text-slate-600 mb-8">{study.client}</p>

          <div className="grid md:grid-cols-3 gap-6 mb-12 pb-8 border-b border-aryo-lightGrey">
            <div className="bg-aryo-offWhite p-6">
              <Building2 size={24} className="text-aryo-deepBlue mb-3" />
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Industry</p>
              <p className="font-bold text-aryo-deepBlue">{study.industry}</p>
            </div>
            <div className="bg-aryo-offWhite p-6">
              <TrendingUp size={24} className="text-aryo-greenTeal mb-3" />
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Value Unlocked</p>
              <p className="font-bold text-aryo-deepBlue text-2xl">{study.valueUnlocked}</p>
            </div>
            <div className="bg-aryo-offWhite p-6">
              <CheckCircle size={24} className="text-aryo-teal mb-3" />
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Status</p>
              <p className="font-bold text-aryo-deepBlue">Completed</p>
            </div>
          </div>

          {study.pdfDownload && (
            <div className="bg-aryo-offWhite border border-aryo-lightGrey p-6 mb-12 flex items-center justify-between">
              <div>
                <p className="font-serif font-bold text-aryo-deepBlue text-lg">Download Full Case Study</p>
                <p className="text-sm text-slate-500 mt-1">Get the complete report with detailed methodology and results</p>
              </div>
              <a
                href={study.pdfDownload}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-aryo-deepBlue text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-aryo-teal transition-colors"
                data-testid="button-download-case-study-pdf"
              >
                <Download size={14} /> Download PDF
              </a>
            </div>
          )}

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-serif text-aryo-deepBlue mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-aryo-deepBlue text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                The Challenge
              </h2>
              <p className="text-slate-600 leading-relaxed pl-11">{study.challenge}</p>
            </div>

            <div>
              <h2 className="text-xl font-serif text-aryo-deepBlue mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-aryo-teal text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Our Solution
              </h2>
              <p className="text-slate-600 leading-relaxed pl-11">{study.solution}</p>
            </div>

            <div>
              <h2 className="text-xl font-serif text-aryo-deepBlue mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-aryo-greenTeal text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                The Results
              </h2>
              <p className="text-slate-600 leading-relaxed pl-11">{study.results}</p>
            </div>
          </div>
        </div>

        <div className="bg-aryo-deepBlue p-8 text-center">
          <h3 className="text-xl font-serif text-white mb-4">Ready to unlock similar value for your organization?</h3>
          <Link href="/#contact" className="inline-flex items-center gap-2 bg-white text-aryo-deepBlue px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-aryo-offWhite transition-colors" data-testid="button-contact-cta">
            Request a Consultation <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}

export default function CaseStudies() {
  const params = useParams();
  const slug = params.slug as string | undefined;
  const { data: wpStudies, isLoading: wpStudiesLoading } = useWPCaseStudies();

  if (slug) {
    return <CaseStudyDetail slug={slug} />;
  }

  const studies: CaseStudyExtended[] = (wpStudies && wpStudies.length > 0)
    ? wpStudies.map(wpToExtended)
    : fallbackCaseStudies;

  return (
    <>
      <SEO 
        title="Case Studies | Aryo Consulting Group"
        description="Explore Aryo Consulting Group's case studies showcasing successful client engagements in M&A, digital transformation, operational excellence, and strategic advisory."
        canonical="https://aryocg.com/case-studies"
      />
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <Link href="/" className="hover:text-aryo-deepBlue">Home</Link>
          <ChevronRight size={14} />
          <span className="text-aryo-deepBlue">Case Studies</span>
        </div>

        <div className="mb-12">
          <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">Client Success Stories</span>
          <h1 className="text-4xl md:text-5xl font-serif text-aryo-deepBlue mt-4 mb-6">Case Studies</h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Explore how we've partnered with leading organizations to unlock enterprise value and drive transformational change.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {wpStudiesLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white border border-aryo-lightGrey p-8 animate-pulse">
                <div className="h-4 w-24 bg-slate-200 rounded mb-4" />
                <div className="h-6 w-3/4 bg-slate-200 rounded mb-3" />
                <div className="h-4 w-full bg-slate-200 rounded mb-2" />
                <div className="h-4 w-2/3 bg-slate-200 rounded mb-6" />
                <div className="flex gap-4">
                  <div className="h-10 w-16 bg-slate-200 rounded" />
                  <div className="h-10 w-16 bg-slate-200 rounded" />
                  <div className="h-10 w-16 bg-slate-200 rounded" />
                </div>
              </div>
            ))
          ) : (
            studies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))
          )}
        </div>

        <div className="mt-16 bg-aryo-deepBlue p-12 text-center">
          <h3 className="text-2xl font-serif text-white mb-4">See how Aryo can transform your organization</h3>
          <p className="text-aryo-lightBlue/70 mb-8 max-w-xl mx-auto">
            Schedule a confidential consultation to discuss how our integrated approach can unlock trapped value in your enterprise.
          </p>
          <Link href="/#contact" className="inline-flex items-center gap-2 bg-white text-aryo-deepBlue px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-aryo-offWhite transition-colors" data-testid="button-request-briefing">
            Request Executive Briefing <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </PageLayout>
    </>
  );
}
