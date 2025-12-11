# Aryo Consulting Group - Design Guidelines

## Design Approach
**Reference-Based Approach**: Professional consulting/financial services aesthetic (inspired by firms like McKinsey, Deloitte, Bloomberg) combined with modern web design sophistication. Emphasis on credibility, data visualization, and executive-level polish.

## Brand Identity

**Color Palette**:
- Deep Blue (#274D8E): Primary brand color for headings, navigation, CTAs
- Teal (#47B5CB): Secondary accent for highlights and interactive elements
- Green-Teal (#4EB9A7): Tertiary accent for gradients and visual interest
- Light Blue (#ADD6DE): Data visualization and subtle accents
- Light Grey (#CECECE): Borders, dividers, subtle backgrounds
- Off-White (#F8FAFC): Section backgrounds for depth
- White (#FFFFFF): Primary backgrounds, cards

**Typography**:
- **Headings**: Serif font (elegant, traditional) - sizes: 5xl-7xl for hero, 3xl-4xl for sections
- **Body & UI**: Sans-serif (modern, clean) - tracking: 0.15em-0.25em for uppercase labels
- **Weights**: Light (300) for descriptions, Bold (700) for labels/buttons, Extrabold (800) for logo
- **Uppercase Treatment**: All navigation, buttons, and labels in uppercase with generous letter-spacing

## Layout System

**Spacing Primitives**: Tailwind units of 3, 4, 6, 8, 10, 12, 20, 24
- Section padding: py-20 to py-24
- Container: max-w-7xl with px-6 lg:px-8
- Component gaps: gap-3, gap-6, gap-12

**Grid System**: 
- Mobile: Single column (grid-cols-1)
- Tablet: 2 columns where appropriate (md:grid-cols-2)
- Desktop: Up to 4 columns for features/stats (lg:grid-cols-4)

## Component Library

**Navigation**:
- Fixed navbar with scroll-based backdrop blur (bg-white/95 backdrop-blur-md)
- Height: h-24
- Border transitions on scroll
- Mobile hamburger menu with slide-down panel

**Buttons**:
- Primary: Deep blue background, white text, uppercase, tracking-[0.2em], shadow-lg
- Secondary: White background, bordered, hover states with border color change
- Size: px-8 to px-10, py-3 to py-4
- Icons: Right-aligned arrow with translate-x hover effect

**Cards**:
- White background with border-[#CECECE]
- Subtle shadow-sm
- Padding: p-6 to p-8

**Data Visualization**:
- Interactive radar chart (SVG-based) comparing capabilities
- Animated statistics with scroll-triggered counting
- Client ticker tape with infinite scroll animation

**Decorative Elements**:
- Horizontal divider lines (h-px w-12)
- Gradient text effects using bg-clip-text
- Geometric SVG patterns at 10% opacity for backgrounds
- Section gradients from brand colors

## Animations

**Scroll-Based Effects**:
- Fade-in with translate-y-12 to translate-y-0 transition
- Staggered delays (0ms, 200ms, 300ms, 400ms)
- Duration: 1000ms with ease-out timing
- Trigger: -50px before viewport (intersection observer)

**Micro-Interactions**:
- Button hover: translate-x-1 for arrows
- Link hover: opacity and color transitions
- Card hover: grayscale removal, opacity increase
- Navbar: backdrop blur activation on scroll

**Special Animations**:
- Number counting (ease-out-quart, 2500ms duration)
- Marquee ticker tape (continuous infinite scroll)
- Gradient fade masks on ticker edges (w-24)

## Images

**Hero Section**: Background geometric SVG patterns (abstract triangular shapes in brand colors at 10% opacity, positioned right side). NO photographic hero image - maintains professional, abstract aesthetic.

**Icons**: Lucide React icons throughout (18px for features, 14px for data labels, 16px for buttons)

**Logo**: Custom SVG combining letter "A" geometric shape with bar chart visual (48x48px)

## Key Design Principles

1. **Executive Polish**: Every element conveys sophistication and credibility
2. **Data-Driven**: Emphasize charts, statistics, and quantifiable metrics
3. **Restrained Motion**: Animations enhance without distraction - scroll-triggered only
4. **Geometric Precision**: Clean lines, sharp angles, mathematical layouts
5. **Trust Signals**: Client logos, certifications, professional credentials prominent
6. **Breathing Room**: Generous whitespace, never cramped
7. **Hierarchical Clarity**: Size, weight, and spacing create obvious information architecture