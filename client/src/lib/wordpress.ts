import { useQuery } from '@tanstack/react-query';

const WP_BASE_URL = import.meta.env.VITE_WORDPRESS_URL || '';

interface WPMediaSize {
  source_url: string;
}

interface WPMediaDetails {
  sizes?: {
    full?: WPMediaSize;
    medium?: WPMediaSize;
    thumbnail?: WPMediaSize;
  };
}

interface WPMedia {
  id: number;
  source_url: string;
  media_details: WPMediaDetails;
  alt_text: string;
}

interface WPAuthorEmbed {
  name: string;
  description: string;
}

interface WPEmbedded {
  'wp:featuredmedia'?: WPMedia[];
  author?: WPAuthorEmbed[];
}

interface WPRendered {
  rendered: string;
}

interface ACFBlogPostFields {
  author_title?: string;
  category?: string;
}

interface ACFCaseStudyStatItem {
  label: string;
  value: string;
}

interface ACFCaseStudyFields {
  client?: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  value_unlocked?: string;
  featured?: boolean | string;
  pdf_download?: string;
  stats?: ACFCaseStudyStatItem[];
}

interface ACFTestimonialFields {
  quote?: string;
  author_name?: string;
  author_title?: string;
}

interface ACFTeamMemberFields {
  job_title?: string;
  bio?: string;
}

interface ACFPositionRequirementItem {
  requirement: string;
}

interface ACFPositionFields {
  location?: string;
  employment_type?: string;
  description?: string;
  requirements?: ACFPositionRequirementItem[] | string;
}

interface ACFCapabilityServiceItem {
  service: string;
}

interface ACFCapabilityFields {
  subtitle?: string;
  description?: string;
  services?: ACFCapabilityServiceItem[] | string;
  outcome?: string;
  link?: string;
  icon_name?: string;
}

interface ACFIndustryListItem {
  item: string;
}

interface ACFIndustryFields {
  description?: string;
  clients?: ACFIndustryListItem[] | string;
  expertise?: ACFIndustryListItem[] | string;
  metric?: string;
  icon_name?: string;
}

interface ACFHomepageStatItem {
  value: string | number;
  suffix: string;
  label: string;
}

interface ACFHomepageHeroBullet {
  text: string;
}

interface ACFHomepagePillar {
  name: string;
  tagline: string;
  description: string;
  active: boolean | string;
}

interface ACFHomepageDifferentiator {
  title: string;
  description: string;
}

interface ACFHomepageProcessStep {
  phase: string;
  title: string;
  time: string;
  description: string;
}

interface ACFRadarCompetitor {
  name: string;
  values: string;
}

interface ACFRadarConfig {
  aryo_values?: string;
  competitors?: ACFRadarCompetitor[];
  levers?: { label: string }[];
}

interface ACFHomepageFields {
  stats?: ACFHomepageStatItem[];
  hero_headline?: string;
  hero_subheadline?: string;
  hero_description?: string;
  hero_bullets?: ACFHomepageBullet[];
  pillars?: ACFHomepagePillar[];
  process_steps?: ACFHomepageProcessStep[];
  differentiators?: ACFHomepageDifferentiator[];
  radar?: ACFRadarConfig;
}

interface ACFHomepageBullet {
  text: string;
}

interface ACFAboutValue {
  title: string;
  description: string;
  icon_name?: string;
}

interface ACFAboutLocation {
  city: string;
  status: string;
  address: string;
  description: string;
}

interface ACFAboutFields {
  story_paragraphs?: { text: string }[];
  story_metric?: string;
  values?: ACFAboutValue[];
  locations?: ACFAboutLocation[];
}

interface ACFCareersBenefit {
  title: string;
  description: string;
  icon_name?: string;
}

interface ACFCareersValue {
  title: string;
  description: string;
}

interface ACFCareersFields {
  why_aryo_paragraphs?: { text: string }[];
  benefits?: ACFCareersBenefit[];
  culture_values?: ACFCareersValue[];
}

type ACFFields =
  | ACFBlogPostFields
  | ACFCaseStudyFields
  | ACFTestimonialFields
  | ACFTeamMemberFields
  | ACFPositionFields
  | ACFCapabilityFields
  | ACFIndustryFields
  | ACFHomepageFields
  | ACFAboutFields
  | ACFCareersFields
  | Record<string, unknown>;

export interface WPPost {
  id: number;
  slug: string;
  title: WPRendered;
  excerpt: WPRendered;
  content: WPRendered;
  date: string;
  modified: string;
  featured_media: number;
  _embedded?: WPEmbedded;
  acf?: Record<string, unknown>;
  categories?: number[];
  tags?: number[];
}

export interface WPPage {
  id: number;
  slug: string;
  title: WPRendered;
  content: WPRendered;
  acf?: Record<string, unknown>;
  _embedded?: WPEmbedded;
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

export interface WPHeroContent {
  headline: string;
  subheadline: string;
  description: string;
  bullets: string[];
}

export interface WPPillar {
  name: string;
  tagline: string;
  desc: string;
  active: boolean;
}

export interface WPProcessStep {
  phase: string;
  title: string;
  time: string;
  desc: string;
}

export interface WPDifferentiator {
  title: string;
  description: string;
}

export interface WPRadarData {
  aryoValues: number[];
  competitors: Record<string, number[]>;
  levers: string[];
}

export interface WPAboutContent {
  storyParagraphs: string[];
  storyMetric: string;
  values: { title: string; description: string; iconName: string }[];
  locations: WPLocation[];
}

export interface WPCareersBenefit {
  title: string;
  description: string;
  iconName: string;
}

export interface WPCareersValue {
  title: string;
  description: string;
}

export interface WPCareersContent {
  whyAryoParagraphs: string[];
  benefits: WPCareersBenefit[];
  cultureValues: WPCareersValue[];
}

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

function isWPConfigured(): boolean {
  return Boolean(WP_BASE_URL && WP_BASE_URL.length > 0);
}

function asString(val: unknown): string {
  return typeof val === 'string' ? val : '';
}

function asBool(val: unknown): boolean {
  return val === true || val === '1' || val === 'true';
}

function parseStringList(field: unknown): string[] {
  if (Array.isArray(field)) {
    return field.map((f: unknown) => {
      if (typeof f === 'string') return f;
      if (f && typeof f === 'object') {
        const obj = f as Record<string, unknown>;
        return asString(obj.item || obj.service || obj.requirement || obj.text || '');
      }
      return '';
    }).filter(Boolean);
  }
  if (typeof field === 'string') return field.split('\n').filter(Boolean);
  return [];
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

async function wpFetchAll<T>(endpoint: string, params: Record<string, string> = {}): Promise<T[]> {
  if (!isWPConfigured()) {
    throw new Error('WordPress URL not configured');
  }

  const allItems: T[] = [];
  let page = 1;
  const perPage = '100';

  while (true) {
    const url = new URL(`/wp-json/wp/v2/${endpoint}`, WP_BASE_URL);
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
    url.searchParams.set('_embed', '1');
    url.searchParams.set('per_page', perPage);
    url.searchParams.set('page', String(page));

    const response = await fetch(url.toString(), {
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      if (page > 1 && response.status === 400) break;
      throw new Error(`WP API error: ${response.status} ${response.statusText}`);
    }

    const items: T[] = await response.json();
    allItems.push(...items);

    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
    if (page >= totalPages) break;
    page++;
  }

  return allItems;
}

function mapWPPostToBlogPost(post: WPPost): WPBlogPost {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const authorInfo = post._embedded?.author?.[0];
  const acf = (post.acf || {}) as ACFBlogPostFields;

  return {
    id: String(post.id),
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    content: post.content.rendered,
    author: authorInfo?.name || 'Aryo Consulting',
    authorTitle: acf.author_title || authorInfo?.description || '',
    category: acf.category || 'Insights',
    slug: post.slug,
    imageUrl: featuredImage,
    published: true,
    publishedAt: post.date,
  };
}

function mapWPPostToCaseStudy(post: WPPost): WPCaseStudy {
  const acf = (post.acf || {}) as ACFCaseStudyFields;
  let stats: { label: string; value: string }[] | undefined;

  if (acf.stats && Array.isArray(acf.stats)) {
    stats = acf.stats.map((s) => ({ label: s.label, value: s.value }));
  }

  return {
    id: String(post.id),
    title: stripHtml(post.title.rendered),
    client: asString(acf.client),
    industry: asString(acf.industry),
    challenge: asString(acf.challenge) || stripHtml(post.content.rendered),
    solution: asString(acf.solution),
    results: asString(acf.results),
    valueUnlocked: asString(acf.value_unlocked),
    slug: post.slug,
    featured: asBool(acf.featured),
    imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    pdfDownload: asString(acf.pdf_download) || undefined,
    stats,
  };
}

function mapWPPostToTestimonial(post: WPPost): WPTestimonial {
  const acf = (post.acf || {}) as ACFTestimonialFields;
  return {
    quote: asString(acf.quote) || stripHtml(post.content.rendered),
    author: asString(acf.author_name) || stripHtml(post.title.rendered),
    title: asString(acf.author_title),
  };
}

function mapWPPostToPosition(post: WPPost): WPPosition {
  const acf = (post.acf || {}) as ACFPositionFields;
  let requirements: string[] = [];
  if (acf.requirements) {
    if (Array.isArray(acf.requirements)) {
      requirements = acf.requirements.map((r) => r.requirement || '').filter(Boolean);
    } else if (typeof acf.requirements === 'string') {
      requirements = acf.requirements.split('\n').filter(Boolean);
    }
  }

  return {
    title: stripHtml(post.title.rendered),
    location: asString(acf.location),
    type: asString(acf.employment_type) || 'Full-time',
    description: asString(acf.description) || stripHtml(post.excerpt.rendered),
    requirements,
  };
}

export function useWPBlogPosts() {
  return useQuery<WPBlogPost[]>({
    queryKey: ['wp', 'blog-posts'],
    queryFn: async () => {
      const posts = await wpFetchAll<WPPost>('posts', {
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
      const posts = await wpFetchAll<WPPost>('case_study', {
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
      const posts = await wpFetchAll<WPPost>('testimonial', {
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
      const posts = await wpFetchAll<WPPost>('position', {
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
      const posts = await wpFetchAll<WPPost>('team_member', {
        orderby: 'menu_order',
        order: 'asc',
      });
      return posts.map((post) => {
        const acf = (post.acf || {}) as ACFTeamMemberFields;
        const name = stripHtml(post.title.rendered);
        const nameParts = name.split(' ');
        const initials = nameParts.map(p => p[0]).join('').toUpperCase();
        return {
          name,
          title: asString(acf.job_title),
          bio: asString(acf.bio) || stripHtml(post.content.rendered),
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
      const posts = await wpFetchAll<WPPost>('capability', {
        orderby: 'menu_order',
        order: 'asc',
      });
      return posts.map((post) => {
        const acf = (post.acf || {}) as ACFCapabilityFields;
        const services = parseStringList(acf.services);
        return {
          title: stripHtml(post.title.rendered),
          subtitle: asString(acf.subtitle),
          description: asString(acf.description) || stripHtml(post.excerpt.rendered),
          services,
          outcome: asString(acf.outcome),
          link: asString(acf.link),
          iconName: asString(acf.icon_name) || 'Layers',
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
      const posts = await wpFetchAll<WPPost>('industry', {
        orderby: 'menu_order',
        order: 'asc',
      });
      return posts.map((post) => {
        const acf = (post.acf || {}) as ACFIndustryFields;
        return {
          title: stripHtml(post.title.rendered),
          description: asString(acf.description) || stripHtml(post.excerpt.rendered),
          clients: parseStringList(acf.clients),
          expertise: parseStringList(acf.expertise),
          metric: asString(acf.metric),
          iconName: asString(acf.icon_name) || 'Building2',
        };
      });
    },
    enabled: isWPConfigured(),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}

export function useWPHomepage() {
  return useQuery<{
    stats: WPStat[];
    hero: WPHeroContent | null;
    pillars: WPPillar[];
    processSteps: WPProcessStep[];
    differentiators: WPDifferentiator[];
    radar: WPRadarData | null;
  } | null>({
    queryKey: ['wp', 'homepage'],
    queryFn: async () => {
      const pages = await wpFetch<WPPage[]>('pages', { slug: 'homepage' });
      if (pages.length === 0) return null;
      const acf = (pages[0].acf || {}) as ACFHomepageFields;

      const stats: WPStat[] = (acf.stats || []).map((s) => ({
        value: Number(s.value) || 0,
        suffix: s.suffix || '',
        label: s.label || '',
      }));

      const hero: WPHeroContent | null = acf.hero_headline ? {
        headline: asString(acf.hero_headline),
        subheadline: asString(acf.hero_subheadline),
        description: asString(acf.hero_description),
        bullets: (acf.hero_bullets || []).map((b) => b.text),
      } : null;

      const pillars: WPPillar[] = (acf.pillars || []).map((p) => ({
        name: p.name,
        tagline: p.tagline,
        desc: p.description,
        active: asBool(p.active),
      }));

      const processSteps: WPProcessStep[] = (acf.process_steps || []).map((s) => ({
        phase: s.phase,
        title: s.title,
        time: s.time,
        desc: s.description,
      }));

      const differentiators: WPDifferentiator[] = (acf.differentiators || []).map((d) => ({
        title: d.title,
        description: d.description,
      }));

      let radar: WPRadarData | null = null;
      if (acf.radar) {
        const parseValues = (str: string): number[] =>
          str.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));

        const aryoValues = acf.radar.aryo_values ? parseValues(acf.radar.aryo_values) : [];
        const competitors: Record<string, number[]> = {};
        (acf.radar.competitors || []).forEach((c) => {
          competitors[c.name] = parseValues(c.values);
        });
        const levers = (acf.radar.levers || []).map(l => l.label);

        if (aryoValues.length > 0) {
          radar = { aryoValues, competitors, levers };
        }
      }

      return { stats, hero, pillars, processSteps, differentiators, radar };
    },
    enabled: isWPConfigured(),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}

export function useWPAboutPage() {
  return useQuery<WPAboutContent | null>({
    queryKey: ['wp', 'about-page'],
    queryFn: async () => {
      const pages = await wpFetch<WPPage[]>('pages', { slug: 'about' });
      if (pages.length === 0) return null;
      const acf = (pages[0].acf || {}) as ACFAboutFields;

      return {
        storyParagraphs: (acf.story_paragraphs || []).map((p) => p.text),
        storyMetric: asString(acf.story_metric),
        values: (acf.values || []).map((v) => ({
          title: v.title,
          description: v.description,
          iconName: asString(v.icon_name) || 'Target',
        })),
        locations: (acf.locations || []).map((l) => ({
          city: l.city,
          status: (l.status === 'active' ? 'active' : 'coming') as 'active' | 'coming',
          address: l.address,
          description: l.description,
        })),
      };
    },
    enabled: isWPConfigured(),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}

export function useWPCareersPage() {
  return useQuery<WPCareersContent | null>({
    queryKey: ['wp', 'careers-page'],
    queryFn: async () => {
      const pages = await wpFetch<WPPage[]>('pages', { slug: 'careers' });
      if (pages.length === 0) return null;
      const acf = (pages[0].acf || {}) as ACFCareersFields;

      return {
        whyAryoParagraphs: (acf.why_aryo_paragraphs || []).map((p) => p.text),
        benefits: (acf.benefits || []).map((b) => ({
          title: b.title,
          description: b.description,
          iconName: asString(b.icon_name) || 'Target',
        })),
        cultureValues: (acf.culture_values || []).map((v) => ({
          title: v.title,
          description: v.description,
        })),
      };
    },
    enabled: isWPConfigured(),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}

export { isWPConfigured };
