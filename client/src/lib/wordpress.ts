import { useQuery } from '@tanstack/react-query';

const WP_BASE_URL = import.meta.env.VITE_WORDPRESS_URL || '';

interface WPMediaDetails {
  sizes?: {
    full?: { source_url: string };
    medium?: { source_url: string };
    thumbnail?: { source_url: string };
  };
}

interface WPMedia {
  id: number;
  source_url: string;
  media_details: WPMediaDetails;
  alt_text: string;
}

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: WPMedia[];
    author?: { name: string; description: string }[];
  };
  acf?: Record<string, any>;
  categories?: number[];
  tags?: number[];
}

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: Record<string, any>;
  _embedded?: {
    'wp:featuredmedia'?: WPMedia[];
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPTeamMember {
  name: string;
  title: string;
  bio: string;
  initials: string;
  imageUrl?: string;
}

export interface WPLocation {
  city: string;
  status: 'active' | 'coming';
  address: string;
  description: string;
}

export interface WPCapability {
  title: string;
  subtitle: string;
  description: string;
  services: string[];
  outcome: string;
  link: string;
  iconName: string;
}

export interface WPIndustry {
  title: string;
  description: string;
  clients: string[];
  expertise: string[];
  metric: string;
  iconName: string;
}

export interface WPCaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  valueUnlocked: string;
  slug: string;
  featured: boolean;
  imageUrl: string | null;
  pdfDownload?: string;
  stats?: { label: string; value: string }[];
}

export interface WPBlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorTitle: string;
  category: string;
  slug: string;
  imageUrl: string | null;
  published: boolean;
  publishedAt: string | null;
}

export interface WPTestimonial {
  quote: string;
  author: string;
  title: string;
}

export interface WPPosition {
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export interface WPStat {
  value: number;
  suffix: string;
  label: string;
}

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

function isWPConfigured(): boolean {
  return Boolean(WP_BASE_URL && WP_BASE_URL.length > 0);
}

async function wpFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  if (!isWPConfigured()) {
    throw new Error('WordPress URL not configured');
  }

  const url = new URL(`/wp-json/wp/v2/${endpoint}`, WP_BASE_URL);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  url.searchParams.set('_embed', '1');

  const response = await fetch(url.toString(), {
    headers: { 'Accept': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`WP API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function mapWPPostToBlogPost(post: WPPost): WPBlogPost {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const authorInfo = post._embedded?.author?.[0];

  return {
    id: String(post.id),
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    content: post.content.rendered,
    author: authorInfo?.name || 'Aryo Consulting',
    authorTitle: post.acf?.author_title || authorInfo?.description || '',
    category: post.acf?.category || 'Insights',
    slug: post.slug,
    imageUrl: featuredImage,
    published: true,
    publishedAt: post.date,
  };
}

function mapWPPostToCaseStudy(post: WPPost): WPCaseStudy {
  const acf = post.acf || {};
  let stats: { label: string; value: string }[] | undefined;

  if (acf.stats && Array.isArray(acf.stats)) {
    stats = acf.stats.map((s: any) => ({ label: s.label, value: s.value }));
  }

  return {
    id: String(post.id),
    title: stripHtml(post.title.rendered),
    client: acf.client || '',
    industry: acf.industry || '',
    challenge: acf.challenge || stripHtml(post.content.rendered),
    solution: acf.solution || '',
    results: acf.results || '',
    valueUnlocked: acf.value_unlocked || '',
    slug: post.slug,
    featured: acf.featured === true || acf.featured === '1',
    imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    pdfDownload: acf.pdf_download || undefined,
    stats,
  };
}

function mapWPPostToTestimonial(post: WPPost): WPTestimonial {
  const acf = post.acf || {};
  return {
    quote: acf.quote || stripHtml(post.content.rendered),
    author: acf.author_name || stripHtml(post.title.rendered),
    title: acf.author_title || '',
  };
}

function mapWPPostToPosition(post: WPPost): WPPosition {
  const acf = post.acf || {};
  let requirements: string[] = [];
  if (acf.requirements) {
    if (Array.isArray(acf.requirements)) {
      requirements = acf.requirements.map((r: any) => typeof r === 'string' ? r : r.requirement || '');
    } else if (typeof acf.requirements === 'string') {
      requirements = acf.requirements.split('\n').filter(Boolean);
    }
  }

  return {
    title: stripHtml(post.title.rendered),
    location: acf.location || '',
    type: acf.employment_type || 'Full-time',
    description: acf.description || stripHtml(post.excerpt.rendered),
    requirements,
  };
}

export function useWPBlogPosts() {
  return useQuery<WPBlogPost[]>({
    queryKey: ['wp', 'blog-posts'],
    queryFn: async () => {
      const posts = await wpFetch<WPPost[]>('posts', {
        per_page: '20',
        orderby: 'date',
        order: 'desc',
        status: 'publish',
      });
      return posts.map(mapWPPostToBlogPost);
    },
    enabled: isWPConfigured(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useWPBlogPost(slug: string) {
  return useQuery<WPBlogPost | null>({
    queryKey: ['wp', 'blog-posts', slug],
    queryFn: async () => {
      const posts = await wpFetch<WPPost[]>('posts', { slug });
      if (posts.length === 0) return null;
      return mapWPPostToBlogPost(posts[0]);
    },
    enabled: isWPConfigured() && Boolean(slug),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useWPCaseStudies() {
  return useQuery<WPCaseStudy[]>({
    queryKey: ['wp', 'case-studies'],
    queryFn: async () => {
      const posts = await wpFetch<WPPost[]>('case_study', {
        per_page: '20',
        orderby: 'date',
        order: 'desc',
      });
      return posts.map(mapWPPostToCaseStudy);
    },
    enabled: isWPConfigured(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useWPCaseStudy(slug: string) {
  return useQuery<WPCaseStudy | null>({
    queryKey: ['wp', 'case-studies', slug],
    queryFn: async () => {
      const posts = await wpFetch<WPPost[]>('case_study', { slug });
      if (posts.length === 0) return null;
      return mapWPPostToCaseStudy(posts[0]);
    },
    enabled: isWPConfigured() && Boolean(slug),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useWPTestimonials() {
  return useQuery<WPTestimonial[]>({
    queryKey: ['wp', 'testimonials'],
    queryFn: async () => {
      const posts = await wpFetch<WPPost[]>('testimonial', {
        per_page: '20',
        orderby: 'menu_order',
        order: 'asc',
      });
      return posts.map(mapWPPostToTestimonial);
    },
    enabled: isWPConfigured(),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}

export function useWPPositions() {
  return useQuery<WPPosition[]>({
    queryKey: ['wp', 'positions'],
    queryFn: async () => {
      const posts = await wpFetch<WPPost[]>('position', {
        per_page: '20',
        orderby: 'date',
        order: 'desc',
      });
      return posts.map(mapWPPostToPosition);
    },
    enabled: isWPConfigured(),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}

export function useWPPage(slug: string) {
  return useQuery<WPPage | null>({
    queryKey: ['wp', 'pages', slug],
    queryFn: async () => {
      const pages = await wpFetch<WPPage[]>('pages', { slug });
      if (pages.length === 0) return null;
      return pages[0];
    },
    enabled: isWPConfigured() && Boolean(slug),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}

export function useWPTeamMembers() {
  return useQuery<WPTeamMember[]>({
    queryKey: ['wp', 'team-members'],
    queryFn: async () => {
      const posts = await wpFetch<WPPost[]>('team_member', {
        per_page: '20',
        orderby: 'menu_order',
        order: 'asc',
      });
      return posts.map((post) => {
        const acf = post.acf || {};
        const name = stripHtml(post.title.rendered);
        const nameParts = name.split(' ');
        const initials = nameParts.map(p => p[0]).join('').toUpperCase();
        return {
          name,
          title: acf.job_title || '',
          bio: acf.bio || stripHtml(post.content.rendered),
          initials,
          imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || undefined,
        };
      });
    },
    enabled: isWPConfigured(),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}

export function useWPCapabilities() {
  return useQuery<WPCapability[]>({
    queryKey: ['wp', 'capabilities'],
    queryFn: async () => {
      const posts = await wpFetch<WPPost[]>('capability', {
        per_page: '20',
        orderby: 'menu_order',
        order: 'asc',
      });
      return posts.map((post) => {
        const acf = post.acf || {};
        let services: string[] = [];
        if (acf.services) {
          if (Array.isArray(acf.services)) {
            services = acf.services.map((s: any) => typeof s === 'string' ? s : s.service || '');
          } else if (typeof acf.services === 'string') {
            services = acf.services.split('\n').filter(Boolean);
          }
        }
        return {
          title: stripHtml(post.title.rendered),
          subtitle: acf.subtitle || '',
          description: acf.description || stripHtml(post.excerpt.rendered),
          services,
          outcome: acf.outcome || '',
          link: acf.link || '',
          iconName: acf.icon_name || 'Layers',
        };
      });
    },
    enabled: isWPConfigured(),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}

export function useWPIndustries() {
  return useQuery<WPIndustry[]>({
    queryKey: ['wp', 'industries'],
    queryFn: async () => {
      const posts = await wpFetch<WPPost[]>('industry', {
        per_page: '20',
        orderby: 'menu_order',
        order: 'asc',
      });
      return posts.map((post) => {
        const acf = post.acf || {};
        const parseList = (field: any): string[] => {
          if (Array.isArray(field)) return field.map((f: any) => typeof f === 'string' ? f : f.item || '');
          if (typeof field === 'string') return field.split('\n').filter(Boolean);
          return [];
        };
        return {
          title: stripHtml(post.title.rendered),
          description: acf.description || stripHtml(post.excerpt.rendered),
          clients: parseList(acf.clients),
          expertise: parseList(acf.expertise),
          metric: acf.metric || '',
          iconName: acf.icon_name || 'Building2',
        };
      });
    },
    enabled: isWPConfigured(),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}

export function useWPStats() {
  return useQuery<WPStat[]>({
    queryKey: ['wp', 'stats'],
    queryFn: async () => {
      const page = await wpFetch<WPPage[]>('pages', { slug: 'homepage' });
      if (page.length === 0 || !page[0].acf?.stats) return [];
      return (page[0].acf.stats as any[]).map((s: any) => ({
        value: Number(s.value) || 0,
        suffix: s.suffix || '',
        label: s.label || '',
      }));
    },
    enabled: isWPConfigured(),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}

export { isWPConfigured };
