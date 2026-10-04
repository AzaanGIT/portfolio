# DESIGN.md — Azaan's Portfolio

> Single source of truth for visual design. Every component must use these tokens. Never hardcode a color, font, radius, or spacing value outside this file's tokens.

---

## 1. Design Principles

1. **Editorial calm, one loud moment.** The page is mostly white and quiet; the lime gradient + portrait hero is the single loud moment. Everything below the hero stays restrained.
2. **Type is the hero.** Contrast between a light geometric sans and a high-contrast italic serif carries the brand. No decorative clutter.
3. **Monochrome people, colored space.** Portraits are always grayscale; color lives in the background gradient and the single accent.
4. **Soft, round, tactile.** Pills, circles, and generous radii. Nothing sharp except the type.
5. **Motion with meaning.** Motion confirms, reveals, or guides. Never decorates. Respect `prefers-reduced-motion`.
6. **Engineer's proof.** Every claim is backed by a project, number, or artifact (layouts, reports, metrics).

---

## 2. Color Tokens

### Core
| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background |
| `--bg-soft` | `#F6F7F4` | Alternate sections, cards |
| `--ink` | `#0E0F0C` | Primary text, dark pill buttons |
| `--ink-2` | `#3A3D36` | Secondary text |
| `--ink-3` | `#7A7E74` | Captions, meta |
| `--line` | `#E6E8E1` | Borders, dividers |

### Accent (lime)
| Token | Hex | Usage |
|---|---|---|
| `--lime-50` | `#F4FFD9` | Faint tint |
| `--lime-200` | `#D9FF7A` | Gradient mid |
| `--lime-400` | `#A6F000` | Gradient core, status dot |
| `--lime-500` | `#8DDB00` | Hover accent, focus ring |

### Hero gradient (exact recipe)
```css
.hero-bg {
  background:
    radial-gradient(60% 55% at 50% 52%, var(--lime-400) 0%, rgba(166,240,0,0.75) 35%, rgba(217,255,122,0.45) 62%, rgba(255,255,255,0) 100%),
    linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 12%, #EFFFB8 38%, #FFFFFF 100%);
}
```
Behavior: white at the top, saturated lime band through the vertical middle (behind the face), melting back to pure white at the bottom so the portrait fades into the page.

### Dark mode
Optional, phase 2. If added: `--bg #0B0C0A`, `--ink #F4F5F0`, lime stays identical.

---

## 3. Typography

| Role | Font | Fallback | Weight / Style |
|---|---|---|---|
| Display sans (greeting, headings) | **Urbanist** (alt: Outfit, Plus Jakarta Sans) | `system-ui, sans-serif` | 300 Light for hero, 400–500 elsewhere |
| Display serif (role, accents) | **Cormorant Garamond** (alt: Playfair Display Italic, Instrument Serif) | `Georgia, serif` | 400–500 *Italic* |
| Body / UI | **Urbanist** | `system-ui, sans-serif` | 400, 500, 600 |
| Mono (tech tags, metrics) | **JetBrains Mono** | `ui-monospace, monospace` | 400, 500 |

Load via `next/font/google`. Use `display: swap`.

### Scale (fluid, `clamp`)
| Token | Size | Line height | Tracking |
|---|---|---|---|
| `--text-hero` | `clamp(3rem, 9vw, 8.5rem)` | 0.95 | -0.02em |
| `--text-h1` | `clamp(2.5rem, 6vw, 5rem)` | 1.0 | -0.02em |
| `--text-h2` | `clamp(2rem, 4vw, 3.25rem)` | 1.1 | -0.015em |
| `--text-h3` | `1.5rem` | 1.25 | -0.01em |
| `--text-body-lg` | `1.125rem` | 1.6 | 0 |
| `--text-body` | `1rem` | 1.6 | 0 |
| `--text-small` | `0.875rem` | 1.5 | 0 |
| `--text-micro` | `0.75rem` | 1.4 | 0.02em |

### Hero type rules
- Line 1 "Hi I'm Azaan": Urbanist **300**, `--text-hero`, `--ink`.
- Line 2 (typewriter role): Cormorant Garamond **italic 400**, **~1.15× the size of line 1** (italic serif reads smaller; scale up to match visual weight), `--ink`.
- Lines are tightly stacked (line 2 overlaps line 1's descender zone by ~0.05em).

---

## 4. Spacing, Radius, Elevation

- Base unit: **4px**. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
- Section vertical padding: `clamp(96px, 12vw, 160px)`.
- Container: max-width **1280px**, side padding `clamp(20px, 4vw, 48px)`.
- Radius: `--r-sm 12px`, `--r-md 20px`, `--r-lg 32px`, `--r-pill 999px`.
- Elevation:
  - `--shadow-1`: `0 1px 2px rgba(14,15,12,.06)`
  - `--shadow-2`: `0 8px 24px rgba(14,15,12,.08)`
  - `--shadow-pill`: `0 0 0 4px rgba(255,255,255,.55), 0 6px 18px rgba(14,15,12,.18)` (the soft halo ring around the dark CTA)

---

## 5. Hero Specification (match the reference exactly)

**Viewport:** `min-height: 100svh`, content centered, overflow hidden at bottom.

### Layer order (back → front)
1. Gradient background (`.hero-bg`)
2. "Hi I'm Azaan" line — **above the head, not overlapped**
3. Role line (typewriter) — **behind the portrait** (the head covers part of the role text, like the reference)
4. Grayscale portrait cutout — bottom-anchored, horizontally centered
5. UI chrome: logo, menu button, badge, pills, tagline, CTA

### Layout (desktop ≥1024px)
| Element | Position |
|---|---|
| Logo wordmark "Azaan" | Top-left, Cormorant Garamond italic, 28px |
| Menu button | Top-right, 44px circle, white, 1px `--line` border, hamburger icon (2 lines), opens full-screen menu |
| Top badge | Top-center, ~28px below header: small laurel icon + "VIT · ECE · VLSI Physical Design" (14px, `--ink`) |
| Greeting + role block | Centered, top of block at ~14% viewport height |
| Portrait | Bottom-center, height ≈ 78% of viewport, width auto, head top aligns just under the greeting line and overlaps the role line |
| Availability pill | Left, vertically ~58%; white pill, 48px high, radius pill, lime pulsing dot (inside a lime-200 ring) + "Available for new opportunities" |
| Tagline | Right, vertically ~58%, max-width 260px, 16px, `--ink`, left-aligned |
| Social proof (bottom-left) | 3 overlapping 36px circular avatars + 11px grey caption (see Content Honesty) |
| CTA | Bottom-right-of-center (~x 70%), dark pill `--ink`, white text, arrow icon on left, "Get in Touch", with `--shadow-pill` |

### Layout (mobile <768px)
- Greeting 3.2rem, role 3.6rem italic; portrait 62% of viewport height, centered.
- Availability pill moves above portrait, centered.
- Tagline moves below role line, centered, 14px.
- CTA becomes full-width-ish pill (max 320px), fixed to bottom with safe-area inset.
- Social proof hidden or collapsed to one line.

### Typewriter role (behavior)
- Roles (editable array): `Physical Design Engineer`, `VLSI Designer`, `RTL-to-GDS Enthusiast`, `ML for EDA Explorer`.
- Type speed **70ms/char**, delete speed **40ms/char**, hold **1600ms** at full word, **350ms** pause before next word.
- Blinking caret: 2px wide, `--ink`, `animation: blink 1s steps(1) infinite`. Caret stays visible while pausing.
- Layout stability: line box has fixed `min-height` equal to one line; text is **center-aligned** and grows from center. No layout shift on the greeting above or the tagline.
- Accessibility: visually render typing, but expose the full current role to screen readers via `aria-label` on a wrapper; use `aria-live="off"`. With `prefers-reduced-motion`, show the first role statically.

### Hero entrance animation (once)
1. Gradient fades in (600ms).
2. Greeting line rises 24px + fades (700ms, ease-out-expo).
3. Role line begins typing at 900ms.
4. Portrait rises 40px + fades (900ms), starts at 300ms.
5. Pills, tagline, CTA fade up staggered (80ms each) from 1000ms.

### Portrait asset requirements
- Transparent-background PNG cutout (or WebP), min 2000px tall, framed waist-up.
- Convert to grayscale with CSS `filter: grayscale(1) contrast(1.05)` (keep original color file as backup).
- Soft bottom fade: `mask-image: linear-gradient(to bottom, #000 82%, transparent 100%)`.
- Provide `alt="Portrait of Azaan"`.

---

## 6. Components

### Buttons
- **Primary (dark pill):** `--ink` bg, white text, 52px high, padding 0 28px, radius pill, `--shadow-pill`. Hover: lift 2px, arrow nudges 4px right. Active: scale .98.
- **Secondary (outline pill):** transparent, 1px `--ink` border. Hover: fills `--ink`, text white.
- **Ghost link:** underline grows from left on hover, 1px, `--ink`.
- Focus ring (all): `outline: 2px solid var(--lime-500); outline-offset: 3px`.

### Pills / badges
White bg, 1px `--line`, radius pill, 13–14px text. Status dot: 10px `--lime-400` with a 6px translucent ring pulsing every 2s.

### Project card
- Large 4:3 media area (layout screenshot / GDS render / UI), radius `--r-lg`, `--bg-soft` fallback.
- Below: title (h3), one-line outcome, 3 mono tech tags.
- Hover: media scales 1.03, a lime circle with ↗ arrow appears bottom-right, cursor becomes "View".

### Metric tile
Big number (Urbanist 300, h1 size) + small caption. Example: `10.5k` "rows in custom congestion dataset". Numbers count up on first scroll into view.

### Timeline item (experience / education)
Left date in mono, vertical 1px `--line` rail with lime node, right content card.

### Navigation
- Sticky transparent header → turns white with blur (`backdrop-filter: blur(12px)`) and 1px bottom `--line` after 24px scroll.
- Desktop: logo left, links center (Work, About, Skills, Experience, Gallery, Contact), "Get in Touch" pill right.
- Menu button (circle) opens full-screen overlay: huge serif-italic links, lime gradient backdrop, staggered reveal.

### Footer
Large CTA headline ("Let's build something that tapes out."), email, social links, resume button, small "Designed & built by Azaan", back-to-top circle.

---

## 7. Motion Tokens

- Easing: `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`, `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`.
- Durations: micro 150ms, ui 250ms, reveal 700ms, hero 900ms.
- Scroll reveal: translateY(32px) + opacity 0 → 1, once, `viewport={{ once: true, amount: 0.25 }}`.
- Smooth scroll: Lenis, duration 1.1.
- Page transitions: 300ms cross-fade.
- Reduced motion: disable parallax, typewriter loop, count-ups, and Lenis.

---

## 8. Layout & Grid

- 12-column grid, 24px gutters desktop, 16px mobile.
- Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.
- Section rhythm: Hero (full viewport) → alternating white / `--bg-soft` sections. Each section opens with a mono eyebrow label (e.g. `01 — SELECTED WORK`), then an h2 mixing sans + one italic serif word.

---

## 9. Page Inventory

1. **Home** — Hero, intro strip, featured projects (3), skills marquee, experience snapshot, metrics, gallery teaser, CTA.
2. **About** — story, education (VIT B.Tech ECE), journey toward physical design, values, photo, resume button.
3. **Projects** (index with filters: Physical Design / ML for EDA / Embedded / Web) + **Project case study template**.
4. **Skills & Tools** — grouped: EDA tools, languages/scripting, flow stages (synthesis → floorplan → place → CTS → route → STA → DRC/LVS).
5. **Experience** — Maven Silicon training/internship, education, leadership timeline.
6. **Leadership & Clubs** — SAHITI (Photography Head), VRIKSH (Outreach Head).
7. **Gallery** — photography grid (lightbox). A human differentiator.
8. **Notes / Blog** — short PD learnings (CTS, congestion, STA basics). Optional but strong for SEO.
9. **Resume** — embedded PDF viewer + download.
10. **Contact** — form + email + LinkedIn + GitHub.
11. **404** — playful chip-themed "Route not found".

---

## 10. Case Study Template

Hero (title, role, tools, duration, link) → Problem → Constraints → Flow/Approach (diagram) → Key results (metric tiles) → Visuals (layout screenshots, plots) → Learnings → Next project card.

---

## 11. Content Honesty Rules

- **Do not** show awards, badges, or client counts you haven't earned (the reference's "Google Website of the Day" and "1200+ happy clients" are placeholders for *that* designer). Replace with true items: college badge, project count, tools count, or "Open to Physical Design roles — 2026".
- Social-proof avatars: use real teammates/mentors only with permission; otherwise swap for tool logos or remove.
- Every metric must be real and traceable to a project artifact.

---

## 12. Accessibility & Performance

- WCAG AA contrast. Ink on lime/white always ≥ 4.5:1. Never put white text on lime.
- Visible focus states, skip-to-content link, semantic landmarks, keyboard-accessible menu and lightbox.
- Images: `next/image`, WebP/AVIF, explicit width/height, hero portrait `priority`.
- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95. LCP < 2.2s.
- Meta: title, description, Open Graph image (hero crop), JSON-LD `Person`.

---

## 13. Do / Don't

**Do:** huge whitespace, one accent color, italic serif for emphasis words, grayscale portraits, round shapes.
**Don't:** gradients beyond the hero, drop shadows on text, more than 2 typefaces + mono, neon on every element, stock imagery, auto-playing sound.
