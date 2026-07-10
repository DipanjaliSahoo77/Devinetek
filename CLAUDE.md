# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page marketing website for DEVINETEK, a career-development company (Training, Placement, Software, Hospitality Solutions). React 19 + Vite 6 + Tailwind CSS v4 (via `@tailwindcss/vite` — no tailwind.config file; theme lives in `src/index.css` under `@theme`). Icons from `lucide-react`, scroll/slide animations from `framer-motion`.

## Commands

- `npm run dev` — dev server at http://localhost:5173
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build

No tests or linter are configured.

## Architecture

`src/App.jsx` composes one-per-section components from `src/components/` in page order: Navbar, Hero, Stats, About, Services, WhyUs, Testimonials, CtaBanner, Contact, Footer. Navigation is anchor-based (`#about`, `#services`, `#why-us`, `#testimonials`, `#contact`); sections carry `scroll-mt-20` to offset the fixed navbar.

Cross-cutting pieces:
- `Reveal.jsx` — framer-motion scroll-reveal wrapper used by every section, plus `StaggerContainer`/`StaggerItem` exports for ~0.1s cascading child reveals; all respect `prefers-reduced-motion`.
- `ScrollProgress.jsx` — fixed gold top progress bar (`useScroll` + spring `scaleX`), rendered by App above Navbar.
- `ParticleNetwork.jsx` — hero-only canvas particle network; idle-started, pauses on tab-hide and off-screen, skipped under reduced motion. The hero layers back-to-front: parallax photo slider → navy overlays → aurora blobs (framer loops) → particle canvas → `.beam` CSS streaks (keyframes in index.css) → content.
- `SectionHeading.jsx` — shared eyebrow/title/lead header (`dark` prop for navy sections, `align` left/center).
- Brand tokens in `src/index.css`: `navy-*` (primary #152a52 = navy-900) and `gold-*` (accent #d4a017 = gold-500) palettes, `font-display` (Poppins) / `font-sans` (Inter), plus the `ken-burns` and `dot-grid` utility classes.

Design system conventions: gold is used sparingly (CTAs, icons, underline accents) on a navy/white base; cards are rounded-2xl/3xl with hover lift + gold border glow; the Hero is a 3-image auto-advancing slider (Ken Burns zoom) whose bottom edge is overlapped by the floating Stats card (`-mt-24 z-20`), so changes to the hero's bottom padding and Stats' negative margin must stay in sync.

Static assets live in `public/assets/` (`logo.png`, `img/*.jpg` — Unsplash photography; hero images are `hero-*.jpg`). The root-level `assets/` folder holds the original logo only and is not served.

`puppeteer-core` (devDependency) is used ad hoc with the locally installed Chrome for screenshot verification; it is not part of the app.
