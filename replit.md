# Aryo Consulting Group Website

## Overview
A professional corporate consulting firm website featuring sophisticated animations, interactive data visualizations, premium brand identity, partner authentication, case studies, and blog/insights sections built with React, TypeScript, Tailwind CSS, and Express.js.

## Current State
The application is a complete, multi-page corporate consulting website with:
- Public landing page with all marketing sections
- About page with team, locations (Boston, NYC + 4 coming Q4 2026), and company story
- Capabilities page showcasing 6 service areas
- Industries page with 6 sector specializations
- Case studies and blog/insights content sections
- Careers page with open positions and culture
- Dedicated Contact page with form
- Valuation Tool placeholder (for custom implementation)
- AI Consultant placeholder (for custom implementation)
- Partner authentication system (login/register/protected dashboard)
- Q4 Hiring Abroad Report gated download with email signup
- Email notifications for contact form submissions (via Resend)

## Project Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript, Vite bundler
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: Wouter for client-side navigation
- **State Management**: TanStack React Query, Context API for auth
- **Backend**: Express.js with session-based authentication
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with bcrypt password hashing
- **CMS**: Headless WordPress (optional, via REST API)
- **HTML Sanitization**: DOMPurify for WordPress content rendering

### Key Files
- `client/src/components/layout.tsx` - Shared PageLayout component (standardized header/footer)
- `client/src/pages/home.tsx` - Main landing page with all sections
- `client/src/pages/about.tsx` - About page with team (4 members), locations, company story
- `client/src/pages/capabilities.tsx` - Service offerings page
- `client/src/pages/industries.tsx` - Industry expertise page
- `client/src/pages/careers.tsx` - Careers and open positions
- `client/src/pages/contact.tsx` - Dedicated contact page
- `client/src/pages/valuation-tool.tsx` - Placeholder for valuation calculator
- `client/src/pages/ai-consultant.tsx` - Placeholder for AI consultant feature
- `client/src/pages/case-studies.tsx` - Case studies list and detail views
- `client/src/pages/blog.tsx` - Blog/insights list and detail views
- `client/src/pages/login.tsx` - Partner login page
- `client/src/pages/register.tsx` - Partner registration page
- `client/src/pages/partner.tsx` - Protected partner dashboard
- `client/src/pages/admin.tsx` - Contact management admin panel (partner-only)
- `client/src/pages/report-q4-hiring-abroad.tsx` - Q4 Hiring Abroad Report signup page
- `client/src/lib/auth.tsx` - Authentication context, ProtectedRoute, and PartnerRoute components
- `client/src/lib/wordpress.ts` - WordPress REST API client, types, and custom hooks
- `server/routes.ts` - API routes (auth, contact, case studies, blog, report, aryo-logo)
- `server/storage.ts` - Database storage implementation
- `shared/schema.ts` - Database schema definitions
- `tailwind.config.ts` - Brand colors, fonts, and custom animations
- `client/src/index.css` - CSS variables and utility classes
- `wordpress-setup-guide.md` - Guide for configuring WordPress custom post types and ACF fields

### Database Schema
- **users** - Partner accounts (id, username, email, password, fullName, company, isPartner)
- **contactSubmissions** - Contact form submissions
- **caseStudies** - Case study content
- **blogPosts** - Blog/insights articles
- **reportDownloads** - Report download signups (firstName, lastName, email, reportSlug, emailSent)

### Brand Identity
- **Deep Blue** (#274D8E) - Primary brand color
- **Teal** (#47B5CB) - Accent color
- **Green-Teal** (#4EB9A7) - Secondary accent
- **Typography**: Playfair Display (serif headings), Inter (sans-serif body)

## Features

### Interactive Components
1. **Navbar** - Fixed with scroll effects, mobile responsive menu, links to all sections
2. **Hero Section** - Animated gradient text, client ticker tape (marquee), Q4 report download
3. **RadarChart** - Interactive comparison between Aryo and competitors
4. **AnimatedNumber** - Scroll-triggered counting animation for stats
5. **FadeIn** - Scroll-triggered fade-in animations for all sections
6. **Contact Form** - Working form with API integration and success/error feedback

### Page Sections (Home)
- Hero with client logos ticker and CTAs
- Industries/Sectors grid
- Value Drivers methodology with radar chart
- Process timeline
- Statistics with animated counters
- Testimonials
- Contact form with API integration
- Footer with navigation

### Authentication System
- Session-based authentication with PostgreSQL session store
- Password hashing with bcrypt
- Protected routes with automatic redirect to login
- Partner dashboard with engagement tracking
- Role-based access control (isPartner flag)
- Admin panel for contact management (partner-only access)

### API Endpoints
- `POST /api/contact` - Submit contact form
- `POST /api/auth/register` - Register new partner
- `POST /api/auth/login` - Partner login
- `POST /api/auth/logout` - Partner logout
- `GET /api/auth/me` - Check authentication status
- `GET /api/case-studies` - List case studies
- `GET /api/case-studies/:slug` - Get case study by slug
- `GET /api/blog` - List blog posts
- `GET /api/blog/:slug` - Get blog post by slug
- `GET /api/report/q4-2024` - Download Q4 market report PDF
- `GET /api/admin/contacts` - List all contact submissions (partner-only)
- `PATCH /api/admin/contacts/:id/status` - Update contact status (partner-only)
- `DELETE /api/admin/contacts/:id` - Delete contact submission (partner-only)
- `POST /api/reports/q4-hiring-abroad/signup` - Submit email for Q4 report (sends PDF via email)
- `GET /api/reports/q4-hiring-abroad/download` - Download Q4 Hiring Abroad Report PDF

## Recent Changes
- December 2024: Initial build with complete landing page
- Fixed AnimatedNumber with StrictMode-safe animation guard
- Fixed marquee with consistent gap spacing for seamless loop
- Added PostgreSQL database with Drizzle ORM
- Implemented partner authentication system (login/register/logout)
- Created protected partner dashboard with engagement data
- Added case studies section with list and detail views
- Added blog/insights section with list and detail views
- Connected contact form to backend API
- Added Q4 market report download functionality
- Fixed ProtectedRoute to properly guard authenticated routes
- Fixed object storage logo serving (access result.value[0] for Buffer)
- Added cache-busting to logo images to prevent broken image caching
- Fixed AnimatedNumber using ref instead of state for StrictMode compatibility
- Added About page with team (6 members), locations (Boston, NYC + 4 coming Q4 2026)
- Added Capabilities page with 6 service areas
- Added Industries page with 6 sector specializations
- Added Careers page with open positions and culture
- Added dedicated Contact page with form
- Added Valuation Tool placeholder page
- Added AI Consultant placeholder page
- Updated navigation with all new pages
- Added admin panel for contact form submission management (partner-only)
- Added PartnerRoute component for role-based access control
- Contact management features: search, filter by status, update status, delete
- Updated team to 4 members: Justin Abrams (Founder & CEO), Josh Eissler (Head of Technology), Vivian Sierra (Associate), Shohel Das (Associate)
- Created shared PageLayout component for standardized header/footer across all pages
- Integrated Aryo logo from object storage via /api/aryo-logo endpoint
- Doubled logo size (80px in header) for better visibility
- Removed redundant "Aryo Consulting Group" text (logo contains full name)
- Migrated all pages to use PageLayout: about, capabilities, industries, careers, contact, valuation-tool, ai-consultant, case-studies, blog
- Created custom branded 404 page with navigation to main sections
- Added SEO component (client/src/components/seo.tsx) with full meta tag management:
  - Dynamic title, description, canonical URL per page
  - Open Graph tags (og:title, og:description, og:image, og:url, og:type, og:site_name)
  - Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
  - JSON-LD structured data support (Organization, LocalBusiness, Service, Article, BreadcrumbList, FAQPage, WebPage, ProfessionalService, JobPosting, CollectionPage schemas)
  - Stale canonical/og:url cleanup on page transitions
  - Schema helper exports: organizationSchema(), localBusinessSchema(), serviceSchema(), articleSchema(), breadcrumbSchema(), faqSchema(), webPageSchema(), professionalServiceSchema(), jobPostingSchema(), collectionPageSchema()
- Comprehensive JSON-LD structured data on all pages:
  - Home: Organization + LocalBusiness (Boston, NYC)
  - About: AboutPage + ProfessionalService + BreadcrumbList
  - Careers: WebPage + JobPosting (per open position) + BreadcrumbList
  - Contact: ContactPage + BreadcrumbList
  - Capabilities overview: Service schemas for all 6 services + BreadcrumbList
  - Capability sub-pages: Service + BreadcrumbList
  - Industries: WebPage + BreadcrumbList
  - Blog/Insights list: CollectionPage + BreadcrumbList
  - Blog detail: Article + BreadcrumbList
  - Case Studies list: CollectionPage + BreadcrumbList
  - Pitch Decks: Service + FAQPage + BreadcrumbList
  - NYC: LocalBusiness + BreadcrumbList
  - Tool pages (PE Valuation, Stablecoin, Website Analyzer, Value Creation): WebPage + BreadcrumbList
  - Placeholder pages (Valuation Tool, AI Consultant): WebPage + BreadcrumbList
- Server-side /sitemap.xml endpoint covering all public routes with priority/changefreq
- robots.txt with crawl directives and sitemap reference
- Default OG image and Twitter Card tags in index.html
- Added email notification for contact form submissions (sends to justin@aryocg.com via Resend)
- Added Q4 Hiring Abroad Report gated download feature:
  - Changed "View Q4 Market Report" to "View Q4 Hiring Abroad Report" on home and NYC pages
  - Created /reports/q4-hiring-abroad page with email signup form
  - Report PDF ("Outsourcing Smartly") sent via email to users who sign up
  - Duplicate signup prevention to avoid spamming users
  - PDF cached at startup for performance

### Headless WordPress Integration
- **Configuration**: Set `VITE_WORDPRESS_URL` environment variable to WordPress URL (e.g., `https://cms.aryocg.com`)
- **Fallback**: All pages gracefully fall back to hardcoded data when WordPress is not configured or unreachable
- **WordPress client**: `client/src/lib/wordpress.ts` provides typed hooks for all content types
- **Custom post types supported**: `case_study`, `testimonial`, `team_member`, `position`, `capability`, `industry`
- **Standard posts**: WordPress blog posts map to the Insights/Blog section
- **Pages with ACF**: Homepage stats via `homepage` page slug
- **Setup guide**: See `wordpress-setup-guide.md` for complete WordPress configuration instructions
- **Pages integrated**: home (testimonials, stats), about (team), capabilities, industries, careers (positions), case-studies, blog/insights

## Running the Project
The application runs with `npm run dev` via the "Start application" workflow, serving on port 5000.

## Database Commands
- `npm run db:push` - Push schema changes to database
- `npm run db:push --force` - Force push schema changes
