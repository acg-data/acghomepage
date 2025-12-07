# ARYO Consulting Group Website

## Overview
A professional corporate consulting firm landing page featuring sophisticated animations, interactive data visualizations, and a premium brand identity built with React, TypeScript, and Tailwind CSS.

## Current State
The application is a complete, polished single-page website ready for production use.

## Project Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript, Vite bundler
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: Wouter
- **Backend**: Express.js (minimal - serves static content)

### Key Files
- `client/src/pages/home.tsx` - Main landing page with all sections
- `tailwind.config.ts` - Brand colors, fonts, and custom animations
- `client/src/index.css` - CSS variables and utility classes
- `client/index.html` - Meta tags and Google Fonts

### Brand Identity
- **Deep Blue** (#274D8E) - Primary brand color
- **Teal** (#47B5CB) - Accent color
- **Green-Teal** (#4EB9A7) - Secondary accent
- **Typography**: Playfair Display (serif headings), Inter (sans-serif body)

## Features

### Interactive Components
1. **Navbar** - Fixed with scroll effects, mobile responsive menu
2. **Hero Section** - Animated gradient text, client ticker tape (marquee)
3. **RadarChart** - Interactive comparison between ARYO and competitors
4. **AnimatedNumber** - Scroll-triggered counting animation for stats
5. **FadeIn** - Scroll-triggered fade-in animations for all sections

### Page Sections
- Hero with client logos ticker
- Industries/Sectors grid
- Value Drivers methodology
- Process timeline
- Statistics with animated counters
- Testimonials
- Contact form with CTA
- Footer with navigation

## Recent Changes
- December 2024: Initial build with complete landing page
- Fixed AnimatedNumber with StrictMode-safe animation guard
- Fixed marquee with consistent gap spacing for seamless loop
- Added inline style for radar chart transition (resolved Tailwind warning)

## Running the Project
The application runs with `npm run dev` via the "Start application" workflow, serving on port 5000.
