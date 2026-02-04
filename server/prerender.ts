import { Request, Response, NextFunction } from "express";
import { chromium, Browser } from "playwright";

// Bot user agents to detect search engine crawlers
const BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'yandexbot',
  'duckduckbot',
  'slurp',
  'baiduspider',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest',
  'applebot',
  'slackbot',
  'vkshare',
  'w3c_validator',
  'redditbot',
  'whatsapp',
  'flipboard',
  'tumblr',
  'bitlybot',
  'screaming frog',
  'semrush',
  'ahrefs',
  'mj12bot',
  'dotbot',
];

// In-memory cache for pre-rendered pages
interface CacheEntry {
  html: string;
  timestamp: number;
}

const prerenderCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const RENDER_TIMEOUT_MS = 15000; // 15 seconds max render time

// Shared browser instance
let browserInstance: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (!browserInstance || !browserInstance.isConnected()) {
    browserInstance = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
  }
  return browserInstance;
}

export function isBot(userAgent: string): boolean {
  if (!userAgent) return false;
  const lowerUA = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => lowerUA.includes(bot));
}

export async function prerenderPage(url: string): Promise<string> {
  const browser = await getBrowser();
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (compatible; AryoPrerender/1.0)',
    viewport: { width: 1280, height: 800 }
  });
  
  const page = await context.newPage();
  
  try {
    // Navigate and wait for load
    await page.goto(url, { 
      waitUntil: 'load',
      timeout: RENDER_TIMEOUT_MS 
    });
    
    // Wait for React to render content - look for actual rendered elements
    // React apps render into #root, so wait for content inside it
    await page.waitForFunction(() => {
      const root = document.getElementById('root');
      return root && root.innerHTML && root.innerHTML.length > 100;
    }, { timeout: 10000 }).catch(() => {});
    
    // Wait for navigation elements that indicate full page load
    await page.waitForSelector('nav, header, footer', { timeout: 5000 }).catch(() => {});
    
    // Wait for images and fonts to load
    await page.waitForLoadState('networkidle').catch(() => {});
    
    // Additional wait for any remaining dynamic content
    await page.waitForTimeout(2000);
    
    // Get the full HTML including rendered React content
    const html = await page.content();
    
    // Add prerender meta tag so we know this was pre-rendered
    const modifiedHtml = html.replace(
      '</head>',
      '<meta name="prerender-status" content="200">\n</head>'
    );
    
    return modifiedHtml;
  } finally {
    await context.close();
  }
}

function getCacheKey(req: Request): string {
  return `${req.protocol}://${req.get('host')}${req.originalUrl}`;
}

function cleanCache(): void {
  const now = Date.now();
  const entries = Array.from(prerenderCache.entries());
  for (let i = 0; i < entries.length; i++) {
    const [key, entry] = entries[i];
    if (now - entry.timestamp > CACHE_TTL_MS) {
      prerenderCache.delete(key);
    }
  }
}

// Clean cache every hour
setInterval(cleanCache, 60 * 60 * 1000);

// Pages that should be pre-rendered for bots
const PRERENDER_PATHS = [
  '/',
  '/about',
  '/capabilities',
  '/industries',
  '/case-studies',
  '/insights',
  '/careers',
  '/contact',
  '/nyc',
  '/value-creation',
  '/digital-transformation',
  '/ma-advisory',
  '/governance-risk',
  '/operational-excellence',
  '/talent-organization',
  '/growth-strategy',
  '/pitch-decks',
  '/pitch-deck',
  '/tools/pe-valuation-tool',
  '/tools/stablecoin-calculator',
  '/tools/website-analyzer',
  '/valuation-tool',
  '/ai-consultant',
  '/reports/q4-hiring-abroad',
];

function shouldPrerender(path: string): boolean {
  // Don't prerender API routes, static assets, or auth pages
  if (path.startsWith('/api/') || 
      path.startsWith('/assets/') || 
      path.includes('.') ||
      path.startsWith('/login') ||
      path.startsWith('/register') ||
      path.startsWith('/partner') ||
      path.startsWith('/admin')) {
    return false;
  }
  
  // Check if path matches any prerender paths
  return PRERENDER_PATHS.some(p => path === p || path.startsWith(p + '/'));
}

export function prerenderMiddleware() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userAgent = req.get('user-agent') || '';
    
    // Only intercept GET requests from bots for prerenderable pages
    if (req.method !== 'GET' || !isBot(userAgent) || !shouldPrerender(req.path)) {
      return next();
    }
    
    const cacheKey = getCacheKey(req);
    
    // Check cache first
    const cached = prerenderCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp) < CACHE_TTL_MS) {
      console.log(`[Prerender] Serving cached page for bot: ${req.path}`);
      res.set('X-Prerender-Cache', 'HIT');
      res.set('Content-Type', 'text/html');
      return res.send(cached.html);
    }
    
    // Render the page
    try {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const fullUrl = `${baseUrl}${req.originalUrl}`;
      
      console.log(`[Prerender] Rendering page for bot: ${fullUrl}`);
      const html = await prerenderPage(fullUrl);
      
      // Cache the result
      prerenderCache.set(cacheKey, {
        html,
        timestamp: Date.now()
      });
      
      res.set('X-Prerender-Cache', 'MISS');
      res.set('Content-Type', 'text/html');
      return res.send(html);
    } catch (error) {
      console.error(`[Prerender] Error rendering ${req.path}:`, error);
      // Fall through to normal SPA handling on error
      return next();
    }
  };
}

// Warm up cache for critical pages
export async function warmupCache(baseUrl: string): Promise<void> {
  console.log('[Prerender] Warming up cache for critical pages...');
  
  const criticalPages = ['/', '/about', '/capabilities', '/contact'];
  
  for (const path of criticalPages) {
    try {
      const url = `${baseUrl}${path}`;
      const html = await prerenderPage(url);
      prerenderCache.set(url, {
        html,
        timestamp: Date.now()
      });
      console.log(`[Prerender] Cached: ${path}`);
    } catch (error) {
      console.error(`[Prerender] Failed to cache ${path}:`, error);
    }
  }
  
  console.log('[Prerender] Cache warmup complete');
}

// Get cache stats for monitoring
export function getCacheStats() {
  return {
    size: prerenderCache.size,
    entries: Array.from(prerenderCache.keys())
  };
}
