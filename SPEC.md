# DEC4IR 2026 Landing Page — Product Specification

## 1. Overview

**Project:** DEC4IR (Drone Edu Challenge 4.0IR) 2026  
**Type:** Online drone education quiz competition landing page  
**Audience:** Malaysian school students (Primary Standard 1–6, Secondary Form 1–5), teachers, parents, and potential sponsors

---

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16, App Router | Server Components by default |
| UI | React 19, Tailwind CSS 4 | `@import "tailwindcss"` syntax |
| Language | TypeScript 5, strict mode | Path alias `@/*` = repo root |
| i18n | next-intl | Client-side locale switching, no URL routing |
| Deployment | Docker + nginx + Cloudflare Tunnel | Mac Mini self-hosted |
| Analytics | None | No tracking scripts |
| CMS | None | Static content, dev edits code |

---

## 3. Architecture Decisions

### 3.1 Static content, no CMS
All content lives in TypeScript data files (`/data/*.ts`) and next-intl translation JSON (`/messages/en.json`, `/messages/bm.json`). A dev edits and redeploys when content changes.

### 3.2 i18n — next-intl without URL routing
- Two locales: `en` (default), `bm`
- Locale detection order: `localStorage` → `navigator.language` → fall back to `en`
- Language toggle in navbar writes to `localStorage` and re-renders client side
- No URL changes (`/en/`, `/bm/` not used) — simpler deployment, no middleware routing complexity
- Translation scope: all user-facing strings

### 3.3 Next.js standalone output
`next.config.ts` sets `output: 'standalone'` for a minimal Docker image.

### 3.4 Docker stack
- `Dockerfile`: multi-stage build (deps → builder → runner using standalone output)
- `docker-compose.yml`: two services — `app` (Next.js, internal port 3000) + `nginx` (port 80)
- `nginx.conf`: reverse proxy to `app:3000`
- Cloudflare Tunnel sits in front of nginx and handles SSL externally; nginx serves plain HTTP internally

---

## 4. Page Structure

Single scrollable landing page (`/`). Navigation anchors link to each section. No sub-routes except potentially a 404 page.

### 4.1 Section Order

| # | Section | Anchor |
|---|---|---|
| 1 | Hero | `#hero` |
| 2 | About DEC4IR | `#about` |
| 3 | Tournament Activities | `#activities` |
| 4 | Event Schedule | `#schedule` |
| 5 | Categories & Certificates | `#categories` |
| 6 | Organizers | `#organizers` |
| 7 | Merchandise | `#merch` |
| 8 | FAQ | `#faq` |
| 9 | Contact / Footer | `#contact` |

---

## 5. Section Specifications

### 5.1 Navbar
- Fixed/sticky top bar
- DEC4IR logo (left)
- Nav links to each section anchor (center/right)
- Language toggle button: `EN | BM` (right)
- "Register Now" CTA button (right, accent color)
- Collapses to hamburger menu on mobile

### 5.2 Hero
- **Background:** Carousel of GIF/video assets (autoplay, loop, no controls)
  - Assets stored in `/public/media/hero/`
  - Smooth cross-fade transition between carousel items
  - Dark overlay on media for text readability
- **Content overlay (centered):**
  - Wordmark: 7th Drone Edu Challenge IR 4.0 2026 (DEC4IR 2026)
  - Tagline (Science Technology, Engineering, and Mathematics (STEM) Education; National Online Tournament; Prestigious National Certificate) (bilingual via i18n)
  - Organizers' logos row (bottom of hero)
  - Primary CTA: "Register Now" → external registration URL (https://dec4ir.org/portal)
- **No countdown timer**

### 5.3 About DEC4IR
- Mission statement: Drone Edu Challenge Industrial Revolution 4.0 (DEC4IR) is Malaysia’s premier online drone education competition, empowering secondary and primary school students with knowledge and hands-on experience in drone technology and programming.
- Since its inception, DEC4IR has impacted over 100,000 students, fostering interest in STEM (Science, Technology, Engineering, and Mathematics) and Industry 4.0 technologies.
- Some stats: 100000++ students benefitted, 1000++ schools participated, 6 years experience
- Text + supporting illustration or icon set
- Content fully bilingual via i18n

### 5.4 Platform Features ("How It Works")
Six feature cards showing what participants use to learn and compete:

| Feature | Description | Image/Video |
|---|---|---|
| Drone Control Mobile App | Participants learn the basic drone input via mobile. | public/media/features/gofly-mobile.jpeg |
| VR Training | Immersive virtual reality drone training environment. | public/media/features/gofly.mp4 |
| Code Block Flight Simulation | Visual programming to control drone flight paths. | public/media/features/droneblock.mp4 |
| Drone Block Coding 101 Workbook | Introduces students to the fundamentals of STEM-based drone programming. Using visual block coding, learners explore essential programming concepts such as sequencing, loops, and conditional logic while applying them to real-world drone flight missions. Each lesson is designed to gradually build coding proficiency, problem-solving skills, and creativity as students program drones to perform tasks like take-off, navigation, obstacle avoidance, and landing. This workbook not only fosters computational thinking but also inspires innovation, teamwork, and curiosity in STEM education. | public/media/features/droneblockcodingworkbook.jpg |
| Video Learning | Structured video curriculum for competition preparation. | public/media/features/elearning2.mp4 |
| Quiz Platform | Online quiz system used for trial, screening to test the student how far they gain the drone`s knowledge. | public/media/features/kuiz.mp4 |
| Assignment | Shortlisted students will be continue to final assignment to improve soft and hard skills, hands-on practice on drone structure  | public/media/features/teamwork.mp4 |
| MOE Certified Certificate | Ministry of Education Malaysia recognised certificate. | public/media/features/certificate.png |

Layout: tab widget, 4:8 (tabs:content) on desktop, single column on mobile (tabs at top, bottom is content). Each content: image/GIF/video + title + 1-line description.

### 5.5 Event Schedule / Timeline
Horizontal timeline on desktop, vertical on mobile.

**Phases:**

| Phase | Event | Date |
|---|---|---|
| 1 | Registration Opens | 13 May 2026 |
| 1 | Learning Materials Open | 13 May 2026 |
| 2 | Registration Closes | 16 June 2026 |
| 3 | Trial Quiz | 19 June 2026 |
| 4 | Screening Quiz (Best individual for each state will be shortlisted for the final) | 30 June 2026 |
| 5 | Announcement of Screening Quiz Shortlists and Final Assignement | 7 July 2026 |
| 6 | Final Assignment Submission Deadline | 8 August 2026 |
| 7 | Results Announcement | 30 August 2026 |

**Phase descriptions (bilingual):**
- **Trial Quiz:** Open to all registered participants. Dummy questions — no scoring. Purpose: familiarise with the platform.
- **Screening Quiz:** Timed, scored quiz. Top performers per category advance.
- **Final Assignment:** Project-based or extended task for shortlisted participants only.

### 5.6 Categories & Certificates

**Competition categories:**

| Category | Level | School Grade |
|---|---|---|
| National Primary | Level 1 | Standard 1 – 3 |
| National Primary | Level 2 | Standard 4 – 6 |
| National Secondary | Lower Secondary | Form 1 – 3 |
| National Secondary | Upper Secondary | Form 4 – 5 |

**Certificate tiers (Ministry of Education Malaysia certified):**

| Certificate | Recipients |
|---|---|
| Certificate of Participation | All quiz participants who complete the screening |
| Certificate of Achievement | Shortlisted participants (advanced to final) |
| Certificate of Excellence | Winners per category |

Layout: Category cards with badge/icon per level + certificate tier breakdown with MOE logo/seal.

### 5.7 Organizers
Logo grid.

**Placeholder tier structure:**
- **Main Organizers** — 2 slots, large logo, prominent placement: Universiti Teknologi Malaysia (UTM), Ministry of Education Malaysia
- **Strategic Partners** — up to 4 slots, medium logos: Sport Innovation & Technology Center (SITC), iHumEn (Institute of Human Centered Engineering), Dronecraft Solutions, KetupART Studio

Each logo: hover effect (slight glow/scale), clickable link to organizers' website. Placeholder grey boxes with tier label if logo not yet provided.

### 5.8 Merchandise
- Section heading + short description
- Grid of merch item cards (image + item name + short description)
- Each card has a "Shop Now" button → external Shopee store (URL: https://shopee.com.my/DEC4IR-Stainless-Key-Ring-Keychain-i.1630383609.49051278865?extraParams=%7B%22display_model_id%22%3A360114462537%2C%22model_selection_logic%22%3A3%7D)
- No cart, no payment on this site

### 5.9 FAQ
Accordion component. Each item: question (bold) → expands to answer on click.

Content:
- Does the program take place face-to-face or online? (The DEC4IR program is conducted entirely online.)
- What should participants and teachers do throughout this program? (Please refer to the tentative program. An online briefing session will be held on the YouTube channel www.youtube.com/c/DroneEduChallengeIR40. The recording will be available on the Facebook page for those who cannot watch it live.)
- Should students or schools have their own drones? (It is not necessary to have your own drone.)
- Participants need to fly a drone? (No need to fly a drone.)
- We have no experience in drones, can we join this program? (Can join and follow the program. No experience needed.)
- Do mentors/teachers need to have experience in drones? (No need. The mentor only needs to help manage the participants` participation and ensure that the participants fully follow the program.)
- Where can I get the latest information about this program? (All official announcements will be made on the official Facebook page https://www.facebook.com/droneeduchallenge/. Please Subscribe to our YouTube channel on Facebook https://www.youtube.com/c/DroneEduChallengeIR40.)
- How to register? (Registration link: https://dec4ir.org/portal. Use MOE email to register -> create a minimum 6 characters password -> full name and telephone number -> click register button -> after login, open teacher's profile and set your school -> then, upload student's data as the provided CSV template)
- How to login? (Login link: https://dec4ir.org/portal. Enter MOE email -> enter password -> click login button)
- Forget my password? (Contact the event organizers to reset the password)
- Will teachers & participants get certificates? PAJSK score? (Yes, PAJSK scores will be calculated for participants who successfully follow the program. Teachers will get a certificate of appreciation, participants will get a certificate of participation.)
- Is the certificate of participation recognized at the national level? (Yes, Participants who successfully pass the initial screening stage will receive a national level certificate.)

BM translations of all FAQ content required.

### 5.10 Contact / Footer
**Contact channels:**
- Email: `mydrone@utm.my` (mailto: link)
- Facebook: `https://www.facebook.com/droneeduchallenge`
- Address: `Sport Innovation & Technology Center (SITC), Level 2, Wing B, V01, Faculty of Engineering Universiti Teknologi Malaysia, 81310 Johor Bahru, Johor`

**Footer content:**
- DEC4IR logo
- Navigation links (repeat of navbar)
- Copyright line: `© 2026 DEC4IR. All rights reserved.`
- Organizer name/entity (Universiti Teknologi Malaysia)

---

## 6. Design System

### 6.1 Theme
Futuristic / tech-forward. References: aerospace HUDs, drone tech interfaces, educational innovation.

### 6.2 Color Palette

CSS custom properties defined in `app/globals.css`:

| Token | Value | Usage |
|---|---|---|
| `--color-base` | `#1e1e1e` | Page background (`body`) |
| `--color-surface` | `#141414` | Darker sections, footer |
| `--color-elevated` | `#262626` | Solid card/panel background (Organizers, non-glass areas) |
| `--color-glass` | `rgba(38,38,38,0.45)` | Glass card/panel background (**new token**) |
| `--color-boundary` | `#3a3a3a` | Default borders |
| `--color-accent` | `#800f3d` | Primary accent (maroon) |
| `--color-glow` | `#e69125` | Secondary accent / glow (gold) |
| `--color-primary` | `#ffffff` | Primary text |
| `--color-secondary` | `#f8f2dc` | Secondary text (warm white) |
| `--color-subtle` | `#9e8a80` | Muted/helper text |

### 6.3 Card & Panel Style

#### 6.3.1 Affected sections
Cards and panels in the following sections use the **glass + gradient-border** treatment:
**About, Tournament Activities, Categories & Certificates, Merchandise, FAQ, Contact**

The **Organizers** section retains its existing plain bordered card style — no gradient border, no glass.

#### 6.3.2 Glass background
- Token: `bg-glass` (`--color-glass`: `rgba(38,38,38,0.45)`)
- Backdrop blur: ~8px (`backdrop-blur-sm`) — subtle, not heavy
- Replaces `bg-elevated` on affected cards/panels
- Works on top of the section's radial gradient or solid background

#### 6.3.3 Gradient border
- Direction: left → right
- Colors: `#e69125` (gold, left) → `#800f3d` (maroon, right)
- Thickness: ~1px (same as current `border-boundary`)
- Implementation: wrapper pseudo-element (`::before` or CSS `background-clip: padding-box` + outer `background: linear-gradient(...)`) — **not** CSS `border-image` (breaks border-radius)
- On hover: border brightens / glow shadow bleeds through using `--color-glow` at reduced opacity

### 6.4 Section Background Strategy

| Section | Background |
|---|---|
| Hero | Carousel (video / image / gradient) — unchanged |
| About | Radial gradient (dark navy/teal) |
| Tournament Activities | Radial gradient (dark purple/navy) |
| Event Schedule | Solid `bg-base` |
| Categories & Certificates | Radial gradient (dark navy/teal) |
| Organizers | Solid `bg-surface` |
| Merchandise | Solid `bg-base` |
| FAQ | Radial gradient (dark purple/navy) |
| Contact | Radial gradient (dark neutral) |
| Footer | Solid `bg-surface` (fully dark, no gradient) |

**Radial gradient style** (reference: `PLACEHOLDER_SLIDES` in `components/ui/HeroCarousel.tsx`):
- Composed from two elliptical radial gradients for depth and atmosphere
- Color palette: deep navy/teal (`#003a5a`), deep purple (`#2a0050`), dark mid-blue (`#00203a`), accent halos (`#00d4ff12`, `#7c3aed12`) — always fading to near-black (`#050f1e` / `--color-base`)
- Gradients must remain dark enough for text legibility without a separate scrim overlay
- Alternate between two "flavors" to avoid monotony:
  - **Teal flavor** (About, Categories): warm side toward teal/navy
  - **Purple flavor** (Tournament, FAQ, Contact): warm side toward purple/indigo

### 6.5 Hero → About Section Transition

The bottom of the Hero section fades seamlessly into the About section's radial gradient background:
- Absolute-positioned gradient overlay at the bottom of the Hero: ~`h-24` to `h-32`
- Gradient: `from-transparent` → About section's background color (the dark base of its radial gradient)
- Goal: eliminate the hard visible edge between Hero and About; the page should feel like one continuous surface

### 6.6 Footer

- Background: `bg-surface` (`#141414`) — fully dark, no radial gradient
- Sits directly below the Contact section (which has a radial gradient)
- No gradient border — plain dark panel consistent with the overall footer role

### 6.7 Typography
- **Primary font:** Inter
- **Title font:** Squada One
- **Mono/code elements:** Geist Mono
- **Scale:** Tailwind default type scale

### 6.8 Animations
- Hover effects on interactive elements (buttons, cards, sponsor logos, nav links)
- Smooth CSS transitions (200–300ms ease)
- Hero carousel cross-fade
- FAQ accordion expand/collapse
- **No scroll-triggered animations** (performance + accessibility)
- **No parallax or particle effects**

### 6.9 Responsive Breakpoints
Mobile-first. Tailwind defaults: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px.

### 6.10 Scroll-to-Top Button
- Locate at bottom right, absolute position.
- Only appear after the user scrolls down a certain amount.
- Circle shape with primary accent border, with an up icon in text secondary.
- Once hover, transition to glow border, up icon to text primary.
- Once click, scroll to the top.

---

## 7. Internationalization (i18n)

### 7.1 Setup
- Library: `next-intl`
- Locales: `en` (English, default), `bm` (Bahasa Malaysia)
- Translation files: `messages/en.json`, `messages/bm.json`

### 7.2 Locale detection logic
```
1. Read from localStorage key "dec4ir_locale"
2. If not set → check navigator.language
3. If navigator.language starts with "ms" → use "bm"
4. Otherwise → use "en"
5. Store result in localStorage
```

### 7.3 Language toggle
- UI: Toggle button `EN | BM` in navbar
- On toggle: update localStorage + re-render (no page reload)
- Implementation: Client component wrapping the page with next-intl provider

### 7.4 Content scope
All user-facing strings must have translations. Data-driven content (dates, emails, URLs) is locale-agnostic. Images are not duplicated per locale.

---

## 8. Docker & Deployment

### 8.1 Dockerfile (multi-stage)
```
Stage 1 (deps):    node:20-alpine — install prod dependencies
Stage 2 (builder): node:20-alpine — full build with next build
Stage 3 (runner):  node:20-alpine — copy standalone output only
```
Exposes port 3000. Runs as non-root user.

### 8.2 docker-compose.yml
```yaml
services:
  app:
    build: .
    restart: unless-stopped
    # internal only, not exposed to host

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - app
    restart: unless-stopped
```

### 8.3 nginx.conf
- Proxy pass all requests to `http://app:3000`
- Pass `X-Forwarded-*` headers for Cloudflare Tunnel compatibility
- Serve Next.js static assets with caching headers
- Gzip compression enabled

### 8.4 Environment variables
- `NODE_ENV=production`
- `PORT=3000`
- Any future env vars (registration URL, etc.) passed via `docker-compose.yml` `environment:` block

---

## 9. File & Component Structure

```
/
├── app/
│   ├── layout.tsx           # Root layout, Geist fonts, next-intl provider
│   ├── page.tsx             # Home page — composes all sections
│   ├── globals.css          # CSS custom properties, global styles
│   └── not-found.tsx        # 404 page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── PlatformFeatures.tsx
│   │   ├── EventSchedule.tsx
│   │   ├── Categories.tsx
│   │   ├── Sponsors.tsx
│   │   ├── Merchandise.tsx
│   │   ├── FAQ.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── HeroCarousel.tsx
│       ├── AccordionItem.tsx
│       ├── FeatureCard.tsx
│       ├── SponsorLogo.tsx
│       ├── TimelineStep.tsx
│       └── LanguageToggle.tsx
│
├── data/
│   ├── schedule.ts          # Event phase dates and descriptions
│   ├── categories.ts        # Competition categories and certificate tiers
│   ├── sponsors.ts          # Sponsor tiers and logo data
│   ├── merchandise.ts       # Merch items and Shopify links
│   └── platform-features.ts # Feature cards data
│
├── messages/
│   ├── en.json              # English translations
│   └── bm.json              # Bahasa Malaysia translations
│
├── public/
│   ├── media/
│   │   └── hero/            # Carousel GIFs/videos
│   ├── logos/
│   │   ├── dec4ir.svg       # Main event logo
│   │   ├── organizers/      # Organizer logos
│   │   └── sponsors/        # Sponsor logos (added as confirmed)
│   └── merchandise/         # Merch product images
│
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── next.config.ts           # output: 'standalone', i18n config
├── postcss.config.mjs
├── eslint.config.mjs
└── tsconfig.json
```

---

## 10. Registration Flow

- Registration happens on an **external platform** (https://dec4ir.org/portal)
- This site provides: CTA buttons (Navbar, Hero, Categories section) that `target="_blank"` link to the external URL
- No form, no data collection, no backend on this site
- Registration URL stored in a single config constant for easy update

---

## 11. Out of Scope

- Results page (external link only — this site will link to it when ready)
- Prize/cash award section (deferred)
- Payment processing (Shopify handles merch)
- User accounts or authentication
- Backend API routes
- Analytics or tracking scripts
- Admin panel or CMS
- Countdown timer
- Scroll-triggered animations or parallax
