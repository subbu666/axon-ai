# Axon AI

**Intelligent Workflow Automation Platform**

A premium, production-grade SaaS landing page built for the Frontend Battle hackathon. Features technical, authoritative design aesthetics inspired by Stripe, Linear, and Vercel.

---

## Demo

The landing page showcases:

- Matrix-driven pricing engine with real-time currency conversion
- Responsive bento grid that transforms into an accordion on mobile
- Theme switching with zero flicker
- GPU-accelerated animations with scroll-triggered reveals

---

## Tech Stack

| Layer     | Technology                                 |
| --------- | ------------------------------------------ |
| Framework | React 18                                   |
| Build     | Vite 5                                     |
| Styling   | Tailwind CSS 3 + CSS Custom Properties     |
| Animation | Native CSS @keyframes + Web Animations API |
| Fonts     | JetBrains Mono + Inter (Google Fonts)      |

**Zero External Animation Libraries** — All motion is handled via native CSS transitions and keyframe animations for maximum performance.

---

## Features

### Pricing Engine (15 pts — Re-render Isolation)

The pricing matrix drives a fully isolated update system:

- **3 pricing tiers**: Starter, Pro, Enterprise
- **3 currencies**: USD, INR, EUR
- **2 billing modes**: Monthly, Annual (20% discount)

Price updates use direct DOM manipulation via refs — zero React reconciler involvement. Toggle billing or currency 5 times in Chrome DevTools Performance tab and the flame graph shows no layout/paint work outside the price spans.

### Bento-to-Accordion Context Lock (10 pts)

Desktop view shows a 6-card bento grid. Mobile view transforms into an accordion. The **active feature index persists** across breakpoint transitions using a `ResizeObserver`-based context lock system.

### Icon System

14 custom SVG icons imported via Vite's `?raw` suffix:

- `currentColor` injection for theme compatibility
- Accessible with `role="img"` and `aria-label`
- Factory pattern for consistent sizing and styling

### SEO & Semantics

- Complete OpenGraph and Twitter Card meta tags
- Proper heading hierarchy (single `<h1>`)
- ARIA labels and roles throughout
- Semantic HTML5 structure

---

## Project Structure

```
src/
├── assets/
│   └── icons/              # 14 SVG icon files
├── components/
│   ├── icons/
│   │   └── index.jsx       # SVG factory with currentColor injection
│   ├── layout/
│   │   ├── Header.jsx      # Sticky nav with scroll blur
│   │   └── Footer.jsx      # Semantic footer
│   ├── sections/
│   │   ├── Hero.jsx        # Hero with ambient floating icons
│   │   ├── Features.jsx    # Bento → Accordion with context lock
│   │   ├── Pricing.jsx     # Matrix-driven pricing with refs
│   │   ├── SocialProof.jsx # Metrics + testimonial carousel
│   │   └── CTA.jsx         # Email capture CTA
│   └── ui/
│       └── ThemeToggle.jsx # Dark/light switch with localStorage
├── data/
│   ├── pricingMatrix.js    # Tier definitions + computePrice()
│   └── featuresData.js      # Feature cards + testimonials
├── hooks/
│   ├── useTheme.js         # Theme state management
│   ├── useBreakpoint.js    # ResizeObserver breakpoint detection
│   └── useScrollReveal.js  # IntersectionObserver triggers
├── styles/
│   ├── tokens.css          # CSS custom properties (colors)
│   ├── animations.css      # All @keyframes
│   └── index.css           # Tailwind + base styles
├── App.jsx
└── main.jsx
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The dev server runs at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

Outputs to `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Design System

### Color Palette

| Token              | Dark Theme | Light Theme | Usage            |
| ------------------ | ---------- | ----------- | ---------------- |
| `--bg-base`        | #172B36    | #F1F6F4     | Page canvas      |
| `--bg-surface`     | #114C5A    | #D9E8E2     | Card backgrounds |
| `--text-primary`   | #F1F6F4    | #172B36     | Main text        |
| `--text-secondary` | #D9E8E2    | #114C5A     | Supporting text  |
| `--accent`         | #FFC801    | #FF9932     | Primary accent   |
| `--accent-warm`    | #FF9932    | #FFC801     | Gradient partner |

### Typography

| Element          | Font           | Weight  |
| ---------------- | -------------- | ------- |
| Headings (h1–h4) | JetBrains Mono | 500–700 |
| Brand name       | JetBrains Mono | 700     |
| Pricing amounts  | JetBrains Mono | 700     |
| Body text        | Inter          | 400     |
| Buttons          | Inter          | 600     |
| Nav links        | Inter          | 500     |

### Animation Timing

| Token          | Value | Usage                            |
| -------------- | ----- | -------------------------------- |
| `--dur-micro`  | 160ms | Hover states, micro-interactions |
| `--dur-layout` | 350ms | Accordion, mobile nav            |
| `--dur-entry`  | 380ms | Hero entrance, scroll reveal     |

All animations use `cubic-bezier(0.0, 0.0, 0.2, 1)` for consistent easing.

---

## Performance Optimizations

1. **GPU-accelerated animations** — Only `transform` and `opacity` animated
2. **Observer patterns** — `IntersectionObserver` for scroll, `ResizeObserver` for breakpoints (no scroll/resize event listeners)
3. **Font loading** — Google Fonts with `display=swap`
4. **Theme init** — Inline `<script>` prevents FOUC
5. **will-change management** — Applied only during animation, removed after

---

## Accessibility

- All interactive elements have `aria-label` or visible text
- Accordion triggers use `aria-expanded` and `aria-controls`
- Price displays use `aria-live="polite"` for updates
- Touch targets meet 44×44px minimum
- Color contrast exceeds WCAG AA

---

## Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 14+
- Mobile Safari iOS 14+
- Chrome for Android 90+

---

## License

MIT
