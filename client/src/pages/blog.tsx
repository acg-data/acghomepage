import { Link, useParams } from 'wouter';
import type { BlogPost } from '@shared/schema';
import { 
  ArrowRight, 
  ArrowLeft, 
  Calendar,
  User,
  Clock,
  ChevronRight
} from 'lucide-react';
import { PageLayout } from '@/components/layout';
import { SEO } from '@/components/seo';
import { useWPBlogPosts, useWPBlogPost, type WPBlogPost } from '@/lib/wordpress';

const fallbackBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of M&A: Navigating Uncertainty in 2025',
    excerpt: 'As market conditions evolve, successful acquirers are adapting their due diligence and integration approaches. Here\'s what leading firms are doing differently.',
    content: `
The M&A landscape has fundamentally shifted over the past 24 months. Rising interest rates, geopolitical tensions, and evolving regulatory frameworks have created a new playbook for successful deal-making.

## Key Trends We're Observing

### 1. Extended Due Diligence Timelines
Smart acquirers are taking more time upfront to deeply understand target companies. The era of rapid-fire deal-making has given way to more thoughtful, comprehensive evaluation processes.

### 2. Operational Focus Over Financial Engineering
With higher borrowing costs, the path to value creation increasingly runs through operational improvement rather than leverage arbitrage. Acquirers are prioritizing targets with clear operational improvement pathways.

### 3. Technology Integration Planning
Given the complexity of modern tech stacks, integration planning now begins during due diligence rather than post-close. We're seeing dedicated technology integration workstreams become standard practice.

## What This Means for 2025

Organizations considering acquisitions should prepare for longer deal cycles, more intensive operational planning, and greater emphasis on post-merger execution capabilities.

The firms that will succeed in this environment are those that view M&A not as a series of discrete transactions, but as a core organizational capability requiring dedicated resources and institutional knowledge.
    `,
    author: 'James Richardson',
    authorTitle: 'Managing Partner, M&A Practice',
    category: 'M&A Strategy',
    slug: 'future-of-ma-2025',
    imageUrl: null,
    published: true,
    createdAt: new Date('2024-12-05'),
    publishedAt: new Date('2024-12-05'),
  },
  {
    id: '2',
    title: 'Digital Transformation: Beyond the Technology',
    excerpt: 'Why most digital transformation initiatives fail to deliver expected value, and the organizational capabilities that separate success from failure.',
    content: `
After partnering with dozens of organizations on digital transformation initiatives, we've identified a consistent pattern: technology is rarely the limiting factor in transformation success.

## The Capability Gap

Most organizations approach digital transformation as a technology problem. They invest heavily in new systems, platforms, and tools. Yet our research shows that organizations achieve only 30% of expected value from these investments on average.

The missing ingredient? Organizational capability development.

## Five Critical Capabilities for Transformation Success

### 1. Change Leadership at All Levels
Digital transformation requires advocates throughout the organization, not just in the C-suite. Middle management is often the critical layer for driving adoption and sustainment.

### 2. Data Literacy
New technologies generate exponentially more data. Organizations must build broad-based analytical capabilities to extract value from this information.

### 3. Agile Operating Models
Traditional hierarchical structures struggle to adapt at the pace digital environments demand. Successful transformers redesign their operating models for speed and flexibility.

### 4. Customer-Centric Design Thinking
Technology should serve customer needs, not the reverse. Organizations that embed design thinking into their DNA consistently outperform those that don't.

### 5. Continuous Learning Culture
Digital transformation is not a destination—it's an ongoing journey. Organizations must build learning mechanisms that evolve capabilities over time.

## Implications for Leaders

The most important investment you can make in digital transformation isn't technology—it's people. Focus on capability building alongside technology deployment, and you'll dramatically improve your odds of success.
    `,
    author: 'Sarah Chen',
    authorTitle: 'Partner, Digital Practice',
    category: 'Digital Strategy',
    slug: 'digital-transformation-beyond-technology',
    imageUrl: null,
    published: true,
    createdAt: new Date('2024-11-28'),
    publishedAt: new Date('2024-11-28'),
  },
  {
    id: '3',
    title: 'Governance in the Age of AI: A Board\'s Guide',
    excerpt: 'AI adoption raises new questions for corporate governance. Here\'s how forward-thinking boards are adapting their oversight frameworks.',
    content: `
Artificial intelligence is moving from experimental pilots to core business operations. This transition creates both opportunities and governance challenges that boards must address.

## The Governance Challenge

AI systems make decisions that historically required human judgment. This raises fundamental questions about accountability, risk management, and strategic oversight.

## Key Areas for Board Attention

### 1. AI Strategy Oversight
Boards should understand their organization's AI strategy and ensure alignment with overall business objectives. This includes understanding where AI is being deployed and why.

### 2. Risk Framework Expansion
Traditional risk frameworks often don't adequately address AI-specific risks including algorithmic bias, model drift, and cybersecurity vulnerabilities unique to AI systems.

### 3. Ethics and Responsibility
Organizations need clear policies on ethical AI use. Boards should ensure these policies exist and are being followed.

### 4. Talent and Capability
AI implementation requires specialized talent. Boards should understand their organization's capability gaps and plans to address them.

## Practical Steps for Board Members

1. Request regular AI briefings from management
2. Ensure AI governance is part of the risk committee's mandate
3. Consider adding AI expertise to the board
4. Review AI-related policies and controls
5. Understand third-party AI dependencies

## Looking Ahead

AI governance will only become more important as these technologies become more capable and more pervasive. Boards that establish strong governance foundations now will be better positioned to navigate the challenges ahead.
    `,
    author: 'Michael Torres',
    authorTitle: 'Senior Advisor, Governance Practice',
    category: 'Governance',
    slug: 'governance-ai-board-guide',
    imageUrl: null,
    published: true,
    createdAt: new Date('2024-11-15'),
    publishedAt: new Date('2024-11-15'),
  },
  {
    id: '4',
    title: 'Unlocking Value Through Operational Excellence',
    excerpt: 'How systematic operational improvement creates sustainable competitive advantage and drives enterprise value.',
    content: `
In a world of compressed margins and intensifying competition, operational excellence has become a critical source of competitive advantage.

## The Operational Excellence Imperative

Organizations that systematically improve their operations outperform peers across key metrics including profitability, customer satisfaction, and employee engagement.

## Core Principles of Operational Excellence

### 1. Process Standardization
Consistent processes enable measurement, improvement, and scale. The first step in any operational excellence journey is understanding and standardizing core processes.

### 2. Data-Driven Decision Making
Operational excellence requires visibility into performance. Organizations must build measurement systems that provide real-time insight into operational health.

### 3. Continuous Improvement Culture
Sustainable operational excellence requires embedding improvement into organizational culture. This means creating mechanisms for identifying and addressing improvement opportunities at all levels.

### 4. Technology Enablement
Modern technologies can dramatically accelerate operational improvement. Automation, analytics, and AI all have roles to play in operational excellence programs.

## Implementation Approach

Successful operational excellence programs typically follow a structured approach:

1. Baseline current performance
2. Identify improvement opportunities
3. Prioritize based on impact and feasibility
4. Implement improvements in waves
5. Measure results and iterate

## The Value Creation Opportunity

Our analysis suggests that most organizations have 15-25% operational improvement potential. Capturing this opportunity creates significant enterprise value.
    `,
    author: 'David Park',
    authorTitle: 'Partner, Operations Practice',
    category: 'Operations',
    slug: 'unlocking-value-operational-excellence',
    imageUrl: null,
    published: true,
    createdAt: new Date('2024-11-01'),
    publishedAt: new Date('2024-11-01'),
  },
];

function BlogPostCard({ post }: { post: BlogPost }) {
  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <Link href={`/insights/${post.slug}`}>
      <div className="bg-white border border-aryo-lightGrey p-8 hover:border-aryo-deepBlue transition-all cursor-pointer group h-full flex flex-col" data-testid={`card-blog-post-${post.id}`}>
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
          <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">{post.category}</span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {formattedDate}
          </span>
        </div>
        <h3 className="text-xl font-serif font-bold text-aryo-deepBlue mb-3 group-hover:text-aryo-teal transition-colors">{post.title}</h3>
        <p className="text-slate-600 mb-6 flex-1 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-4 border-t border-aryo-lightGrey">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-aryo-deepBlue rounded-full flex items-center justify-center text-white font-bold text-sm">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-sm font-bold text-aryo-deepBlue">{post.author}</p>
              <p className="text-xs text-slate-500">{post.authorTitle}</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-aryo-deepBlue group-hover:text-aryo-teal transition-colors" />
        </div>
      </div>
    </Link>
  );
}

function BlogPostDetail({ slug }: { slug: string }) {
  const { data: wpPost, isLoading: wpLoading, isError } = useWPBlogPost(slug);
  const fallback = fallbackBlogPosts.find(p => p.slug === slug);
  
  const post = (wpPost && wpPost.title) ? {
    id: wpPost.id,
    title: wpPost.title,
    excerpt: wpPost.excerpt,
    content: wpPost.content,
    author: wpPost.author,
    authorTitle: wpPost.authorTitle || '',
    category: wpPost.category,
    slug: wpPost.slug,
    imageUrl: wpPost.imageUrl,
    published: wpPost.published,
    publishedAt: wpPost.publishedAt ? new Date(wpPost.publishedAt) : null,
    createdAt: wpPost.publishedAt ? new Date(wpPost.publishedAt) : new Date(),
  } as BlogPost : fallback;

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

  if (!post) {
    return (
      <div className="min-h-screen bg-aryo-offWhite flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-aryo-deepBlue mb-4">Article Not Found</h1>
          <Link href="/insights" className="text-aryo-teal hover:text-aryo-deepBlue transition-colors">
            Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  const readTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/insights" className="flex items-center gap-2 text-aryo-deepBlue hover:text-aryo-teal transition-colors mb-8" data-testid="link-back-insights">
          <ArrowLeft size={16} />
          <span className="text-sm font-bold uppercase tracking-widest">All Insights</span>
        </Link>

        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <Link href="/" className="hover:text-aryo-deepBlue">Home</Link>
          <ChevronRight size={14} />
          <Link href="/insights" className="hover:text-aryo-deepBlue">Insights</Link>
          <ChevronRight size={14} />
          <span className="text-aryo-deepBlue">{post.category}</span>
        </div>

        <article className="bg-white border border-aryo-lightGrey p-12 mb-8">
          <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">{post.category}</span>
          <h1 className="text-4xl font-serif text-aryo-deepBlue mt-4 mb-6">{post.title}</h1>
          
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-aryo-lightGrey">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-aryo-deepBlue rounded-full flex items-center justify-center text-white font-bold">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-bold text-aryo-deepBlue">{post.author}</p>
                <p className="text-sm text-slate-500">{post.authorTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {readTime} min read
              </span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-slate-600">
            {post.content.split('\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={i} className="text-2xl font-serif text-aryo-deepBlue mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={i} className="text-xl font-serif text-aryo-deepBlue mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.trim().startsWith('1.') || paragraph.trim().startsWith('2.') || paragraph.trim().startsWith('3.') || paragraph.trim().startsWith('4.') || paragraph.trim().startsWith('5.')) {
                return <p key={i} className="mb-2 pl-4">{paragraph}</p>;
              }
              if (paragraph.trim()) {
                return <p key={i} className="mb-4 leading-relaxed">{paragraph}</p>;
              }
              return null;
            })}
          </div>
        </article>

        <div className="bg-aryo-deepBlue p-8 text-center">
          <h3 className="text-xl font-serif text-white mb-4">Explore how these insights can apply to your organization</h3>
          <Link href="/#contact" className="inline-flex items-center gap-2 bg-white text-aryo-deepBlue px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-aryo-offWhite transition-colors" data-testid="button-contact-cta">
            Request a Consultation <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}

export default function Blog() {
  const params = useParams();
  const slug = params.slug as string | undefined;
  const { data: wpPosts, isLoading: wpPostsLoading } = useWPBlogPosts();

  if (slug) {
    return <BlogPostDetail slug={slug} />;
  }

  const posts: BlogPost[] = (wpPosts && wpPosts.length > 0)
    ? wpPosts.map(wp => ({
        id: wp.id,
        title: wp.title,
        excerpt: wp.excerpt,
        content: wp.content,
        author: wp.author,
        authorTitle: wp.authorTitle,
        category: wp.category,
        slug: wp.slug,
        imageUrl: wp.imageUrl,
        published: wp.published,
        createdAt: wp.publishedAt ? new Date(wp.publishedAt) : new Date(),
        publishedAt: wp.publishedAt ? new Date(wp.publishedAt) : null,
      }))
    : fallbackBlogPosts;

  return (
    <>
      <SEO 
        title="Insights & Blog | Aryo Consulting Group"
        description="Strategic insights, industry analysis, and thought leadership from Aryo Consulting Group. Expert perspectives on M&A, digital transformation, and corporate strategy."
        canonical="https://aryocg.com/insights"
      />
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <Link href="/" className="hover:text-aryo-deepBlue">Home</Link>
          <ChevronRight size={14} />
          <span className="text-aryo-deepBlue">Insights</span>
        </div>

        <div className="mb-12">
          <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">Thought Leadership</span>
          <h1 className="text-4xl md:text-5xl font-serif text-aryo-deepBlue mt-4 mb-6">Insights</h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Expert perspectives on strategy, operations, and governance from our leadership team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {wpPostsLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white border border-aryo-lightGrey p-8 animate-pulse">
                <div className="h-4 w-20 bg-slate-200 rounded mb-4" />
                <div className="h-6 w-3/4 bg-slate-200 rounded mb-3" />
                <div className="h-4 w-full bg-slate-200 rounded mb-2" />
                <div className="h-4 w-2/3 bg-slate-200 rounded mb-6" />
                <div className="h-4 w-32 bg-slate-200 rounded" />
              </div>
            ))
          ) : (
            posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))
          )}
        </div>

        <div className="mt-16 bg-aryo-deepBlue p-12 text-center">
          <h3 className="text-2xl font-serif text-white mb-4">Subscribe to Aryo Insights</h3>
          <p className="text-aryo-lightBlue/70 mb-8 max-w-xl mx-auto">
            Receive quarterly thought leadership and market analysis directly to your inbox.
          </p>
          <Link href="/#contact" className="inline-flex items-center gap-2 bg-white text-aryo-deepBlue px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-aryo-offWhite transition-colors" data-testid="button-subscribe">
            Subscribe Now <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </PageLayout>
    </>
  );
}
