# Aryo Consulting Group Website

## Overview
Aryo Consulting Group's website is a professional corporate consulting platform designed to showcase their services, expertise, and thought leadership. It features sophisticated animations, interactive data visualizations, and a premium brand identity. The site includes sections for public marketing, company information, service capabilities, industry specializations, case studies, and a blog. It also incorporates partner authentication, a gated content download, and placeholders for advanced tools like a Valuation Tool and an AI Consultant. The project aims to enhance Aryo Consulting Group's online presence, attract new clients, and provide valuable resources.

## User Preferences
I prefer iterative development with a focus on delivering functional, tested components. For communication, I appreciate clear, concise explanations and prefer to be asked before major architectural changes or significant code refactoring. I expect detailed explanations when new features are implemented or complex issues are resolved. Do not make changes to the `wordpress-setup-guide.md` file.

## System Architecture
The project is built with a modern web stack.

### Frontend
- **Framework**: React 18 with TypeScript.
- **Bundler**: Vite.
- **Styling**: Tailwind CSS, utilizing custom design tokens for brand consistency.
- **Routing**: Wouter for efficient client-side navigation.
- **State Management**: TanStack React Query for data fetching and caching, and React's Context API for authentication state.
- **UI/UX**: Features sophisticated animations (animated gradient text, scroll-triggered fade-ins, counting animations), interactive data visualizations (RadarChart), and a fixed, responsive Navbar. The design adheres to a premium brand identity with a deep blue primary color and teal accents.
- **SEO**: Comprehensive SEO component with dynamic title, description, canonical URLs, Open Graph tags, Twitter Card tags, and extensive JSON-LD structured data for various content types, supporting server-side injection for crawlers.

### Backend
- **Framework**: Express.js, handling API routes and server-side rendering support.
- **Authentication**: Session-based authentication using Passport.js with bcrypt for secure password hashing.
- **Database**: PostgreSQL, managed with Drizzle ORM.
- **Content Management**: Headless WordPress integration (optional) via REST API for dynamic content like case studies, blog posts, team members, and testimonials. DOMPurify is used for HTML sanitization of WordPress content.

### Core Features
- **Partner Authentication**: Secure login, registration, and a protected dashboard for partners, including role-based access control and an admin panel for contact management.
- **Content Sections**: Dedicated pages for Case Studies and Blog/Insights, with content managed either via the database or a Headless WordPress instance.
- **Interactive Elements**: RadarChart for competitive analysis, AnimatedNumber for statistics, and FadeIn effects for visual engagement.
- **Contact Management**: A working contact form integrated with a backend API, sending email notifications via Resend, and an admin interface for partners to manage submissions.
- **Gated Content**: A system for gated report downloads (e.g., Q4 Hiring Abroad Report) requiring email signup, with PDF delivery via email.
- **Market Research Reports Landing Page**: A self-contained sales landing page for specific market reports, featuring a unique navigation, purchase options, and detailed report breakdowns.

### Brand Identity
- **Primary Color**: Deep Blue (#274D8E)
- **Accent Colors**: Teal (#47B5CB), Green-Teal (#4EB9A7)
- **Typography**: Playfair Display (serif for headings), Inter (sans-serif for body text)

## External Dependencies
- **PostgreSQL**: Relational database for persistent storage.
- **Drizzle ORM**: TypeScript ORM for interacting with PostgreSQL.
- **Express.js**: Backend web application framework.
- **Passport.js**: Authentication middleware for Node.js.
- **Resend**: Email API for sending transactional emails (e.g., contact form notifications, gated content delivery).
- **Headless WordPress**: Optional external CMS for dynamic content.
- **TanStack React Query**: Library for data fetching, caching, and state management.