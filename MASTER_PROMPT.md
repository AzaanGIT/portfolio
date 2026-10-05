# MASTER PROMPT — Azaan's Portfolio Website

> Paste everything below the line into your AI builder (Claude Code, Cursor, Lovable, v0, Bolt, etc.). Also attach: `DESIGN.md`, your portrait PNG, and the reference hero screenshot.

---

You are a senior product designer and front-end engineer with 15 years of experience shipping award-winning portfolio sites. Build a complete, production-ready personal portfolio website for **Azaan**, a B.Tech Electronics & Communication Engineering student at VIT Vellore specializing in **VLSI Physical Design**, who is targeting **Physical Design Engineer** roles.

## 0. Inputs you have
- `DESIGN.md` — the design system. **Follow it strictly.** Use its tokens for every color, font, radius, spacing, and motion value.
- Reference screenshot — the hero section must match it **exactly** in layout, hierarchy, proportions, gradient, and typography feel.
- `public/images/azaan-cutout.png` — my transparent-background portrait (I'll supply it). Until it exists, render a clearly marked placeholder silhouette in the same position.

## 1. Tech stack
- Next.js 14+ (App Router) + TypeScript
- Tailwind CSS with CSS variables mapped from DESIGN.md tokens
- Framer Motion for animation, Lenis for smooth scroll
- `next/font/google`: Urbanist, Cormorant Garamond (italic), JetBrains Mono
- Content in typed data files (`/content/*.ts`) or MDX for case studies and notes — no hardcoded copy inside components
- Contact form via a Next.js route handler (Resend or Formspree)
- Deploy-ready for Vercel

## 2. Hero section (highest priority — pixel-faithful to the reference)
Rebuild the reference hero with my details:

- Background: white-to-lime vertical gradient with a saturated lime glow behind the face fading to pure white at the bottom (use the exact gradient recipe in DESIGN.md §2).
- Top-left wordmark "Azaan" in Cormorant Garamond italic. Top-right 44px circular white menu button with a 2-line hamburger.
- Top-center small badge with laurel icon: "VIT · ECE · VLSI Physical Design".
- Headline line 1: **"Hi I'm Azaan"** — Urbanist Light (300), very large, tight tracking, centered.
- Headline line 2: **typewriter role** in Cormorant Garamond *italic*, slightly larger than line 1, centered, sitting directly beneath line 1.
- Typewriter behavior: types `Physical Design Engineer` → holds → deletes → types `VLSI Designer` → `RTL-to-GDS Enthusiast` → `ML for EDA Explorer` → loops. 70ms type, 40ms delete, 1600ms hold, blinking caret. No layout shift. Respect `prefers-reduced-motion`.
- Portrait: my grayscale cutout, bottom-center, large, **in front of the role text** (the head overlaps part of line 2 like the reference) and **behind** the UI chrome. Bottom edge fades into white via mask.
- Left, mid-height: white pill with pulsing lime dot — "Available for new opportunities".
- Right, mid-height: short tagline — "Passionate about turning RTL into clean, routable, timing-closed silicon."
- Bottom-left: social-proof strip. **Do not fake numbers.** Use "Open to Physical Design roles" or a real stat like "3+ flow projects, Cadence & open-source".
- Bottom-center-right: dark pill CTA "→ Get in Touch" with soft white halo ring. Scrolls to Contact.
- Entrance animation sequence exactly as in DESIGN.md §5.
- Fully responsive (mobile layout rules in DESIGN.md §5).

## 3. Pages and sections

### Home
1. Hero (above)
2. Intro strip — 2–3 lines on who I am and what I do, with an italic serif emphasis word
3. Selected Work — 3 featured project cards
4. Skills marquee — infinite horizontal scroll of tool names/logos (Genus, Innovus, Virtuoso, PrimeTime, Qflow, Xcelium, Verilog, SystemVerilog, TCL, Perl, Python, Linux)
5. Experience snapshot — Maven Silicon + VIT
6. Metrics row — animated count-up tiles (real numbers only)
7. Gallery teaser — 4–6 photos (I'm Photography Head at SAHITI)
8. Big closing CTA + footer

### About
Personal story, how I got into VLSI, what I'm aiming for (Physical Design Engineer), CGPA 8.47, education at VIT, photo, resume download button.

### Projects (index + dynamic `/projects/[slug]`)
Filter chips: All · Physical Design · ML for EDA · Embedded · Web. Case study template per DESIGN.md §10. Seed with:

1. **SPI Controller — RTL-to-GDS with Qflow**
   Physical design of an SPI controller using the open-source Qflow flow on the OSU018 (180nm) library, covering synthesis through DRC/LVS, with a formal report and Qflow GUI checklist screenshots.
2. **RV32I Congestion Predictor — ML for EDA**
   Machine-learning tool that predicts routing congestion for an RV32I processor from floorplan knobs (utilization, aspect ratio, core margin) plus per-metal-layer routing resources (Metal 1–10). Custom dataset generated with Cadence Genus, Innovus, Xcelium sweeps (30,500 rows). Flask backend + web UI with per-layer heatmap, side-view layer stack, and recommended parameter fixes. Also explored the CircuitNet routability dataset.
3. **Add-on slot** — "More coming" card or an embedded/ECE project (placeholder I'll fill).

Use placeholders (`TODO: add image`) where I haven't supplied media. Never invent results.

### Skills & Tools
Grouped cards: EDA Tools · Languages & Scripting · Flow Stages (synthesis, floorplan, placement, CTS, routing, STA, DRC/LVS) · ML/Web (Python, Flask, scikit-learn, XGBoost).

### Experience
Vertical timeline: Maven Silicon Pvt. Ltd. (training/internship), VIT B.Tech ECE, leadership roles. Placeholders for dates and bullet points I'll fill.

### Leadership & Clubs
SAHITI Club — Photography Head; VRIKSH Club — Outreach Head. Short impact blurbs with placeholders.

### Gallery
Masonry photography grid with lightbox, keyboard navigation, lazy loading, category filter.

### Notes (optional blog)
MDX posts with reading time and tags. Seed 2 titles: "Why congestion happens after placement" and "My RTL-to-GDS flow in Qflow."

### Resume
Embedded PDF viewer + "Download PDF" button.

### Contact
Form (name, email, message, honeypot spam field), direct email, LinkedIn, GitHub, success/error states, location "Vellore, India".

### 404
On-theme: "Route not found." with a button back home.

## 4. Global components
Sticky blur header, full-screen overlay menu (huge serif-italic links on lime gradient), custom cursor "View" on project cards (desktop only), footer with big CTA, scroll progress bar (thin lime line), back-to-top circle, toast system.

## 5. UX & quality bar
- Think like a master UI/UX designer: clear hierarchy, one primary action per viewport, generous whitespace, consistent rhythm (DESIGN.md §8), purposeful motion only.
- A recruiter should understand in 5 seconds: **who I am, what role I want, and see proof**. Make "View Projects" and "Download Resume" reachable from anywhere in one click.
- Accessibility: WCAG AA, focus states, skip link, semantic HTML, alt text, reduced-motion support.
- Performance: Lighthouse ≥ 90 perf, ≥ 95 a11y/SEO. `next/image`, AVIF/WebP, hero portrait `priority`, fonts with `display: swap`.
- SEO: metadata per page, Open Graph image, sitemap, robots, JSON-LD `Person`.
- Analytics-ready (Vercel Analytics or Plausible), no cookie banner needed.

## 6. Content rules
- All copy lives in `/content`. Use my real details above; mark anything missing as `TODO:` rather than inventing it.
- Honest claims only. Do not copy the reference's awards or client counts.
- Tone: confident, precise, human. Short sentences. Mix one italic serif word into each heading for rhythm.

## 7. Deliverables
1. Complete project with folder structure, installable with `npm install && npm run dev`
2. Tailwind config + `globals.css` implementing every DESIGN.md token
3. Reusable components: `Hero`, `Typewriter`, `Header`, `MenuOverlay`, `ProjectCard`, `MetricTile`, `Timeline`, `SkillGroup`, `GalleryGrid`, `ContactForm`, `Footer`
4. `README.md` explaining how to swap the portrait, edit roles, add projects/notes, and deploy
5. A short checklist of the `TODO:` items I must fill in

## 8. Build order
1. Tokens + fonts + layout shell
2. **Hero (match reference, get approval before continuing)**
3. Header / menu / footer
4. Home sections
5. Projects + case studies
6. Remaining pages
7. Motion polish, accessibility pass, performance pass

Start with steps 1–2 and show me the hero before building the rest.
