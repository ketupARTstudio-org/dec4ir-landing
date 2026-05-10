# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Next.js Version Warning

This project uses **Next.js 16**, which has breaking changes from prior versions. APIs, conventions, and file structure may differ from training data. Before writing any code, check `node_modules/next/dist/docs/` for the authoritative reference and heed all deprecation notices.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a **Next.js 16 App Router** landing page with:
- **React 19** — use Server Components by default; add `"use client"` only when needed
- **TypeScript 5** in strict mode — path alias `@/*` maps to the repository root
- **Tailwind CSS 4** — configured via `@tailwindcss/postcss` in [postcss.config.mjs](postcss.config.mjs); import with `@import "tailwindcss"` (not `@tailwind` directives)
- **ESLint 9** with flat config format in [eslint.config.mjs](eslint.config.mjs)

### Routing and layout

All routes live under [app/](app/) using the App Router file conventions:

- [app/layout.tsx](app/layout.tsx) — root layout; sets Geist font CSS variables (`--font-geist-sans`, `--font-geist-mono`) and wraps all pages
- [app/globals.css](app/globals.css) — global styles; defines CSS custom properties for light/dark color scheme
- [app/page.tsx](app/page.tsx) — home page (`/` route)

New routes are created by adding `page.tsx` files in subdirectories of `app/`. Shared UI across a subtree goes in a nested `layout.tsx`.
