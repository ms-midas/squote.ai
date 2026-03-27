# squote.ai — Landing Page

## What This Is
Marketing landing page for squote (voice-to-quote AI for UK tradespeople). Lives at `squote.ai`. The product app lives separately at `squote.app`.

## Tech Stack
- **Pure HTML + CSS + vanilla JS** — no frameworks, no build step
- **Single page**: `index.html` + `css/styles.css` + `js/main.js`
- **Deployed on Vercel** as a static site
- **Font**: Inter (Google Fonts) — 400 body, 500 medium, 600 semi, 700 headings
- **Images**: WebP preferred, JPG fallback. Hero images are in `assets/hero/`

## Brand System
| Token | Hex | Usage |
|-------|-----|-------|
| Terracotta | `#C4572A` | CTAs, accents, active states, step circles |
| Copper | `#B87333` | Warm highlights, financial figures, tagline |
| Concrete | `#8A8680` | Secondary text, muted labels |
| Charcoal | `#2B2926` | Primary text, dark sections |
| Plaster White | `#F5F0EA` | Light backgrounds |

## Pricing (confirmed)
| Plan | Monthly | Key Features |
|------|---------|--------------|
| Free | £0 | Manual builder only, 3 quotes/month, no AI |
| Core | £29/mo | Voice-to-quote AI, PDF download, price list, labour rates |
| Pro | £39/mo | **MOST POPULAR** — Email sending, online accept/decline, CRM, invoicing, jobs, photos |
| Master | £69/mo | RAMS generation, AI trade advisor (coming soon), priority support |

**Introductory offer**: All features at £19/mo for the first month (all tiers).
**Trial**: 3 free Pro-level quotes for everyone. A quote counts as "used" when sent to a client.
**Annual billing**: Save 2 months (show toggle).

## Page Structure (10 sections)
The full spec is in `docs/squote landing page spec.pdf`. Key rhythm:
1. **Hero** — full-bleed trade photo, parallax, big headline, phone mockup
2. **Social Proof Strip** — terracotta bar, "Trusted by 500+ UK tradespeople"
3. **How It Works** — white, 3 steps (Record → Review → Send), connecting line animation
4. **The Problem** — full-bleed trade photo, "33 hours a month" stat, pain points
5. **Features** — white, 3 groups (QUOTE / MANAGE / GROW), clean list
6. **Testimonial** — centred quote with decorative marks
7. **Pricing** — 4 cards, annual/monthly toggle, Pro highlighted
8. **Find Your Trade** — interactive section, trade icons, background crossfade on hover/tap
9. **Trust Signals** — single line: MOBILE-FIRST · GDPR COMPLIANT · UK DATA CENTRES · BUILT IN BRITAIN
10. **Final CTA** — charcoal bg, "Your first quote pays for itself"

## Assets Available
- `assets/logos/` — SVG + PNG wordmarks (light, dark, mono), favicon, app icons, terracotta mic logo
- `assets/hero/` — 21 trade-specific photos (landscape + portrait variants) for hero sections and "Find Your Trade"
- `assets/icons/` — 21 SVG UI icons (microphone, send, camera, quotes, customers, jobs, etc.)
- `assets/trade-icons/` — (empty, needs terracotta trade category icons — create inline SVGs or source)
- `docs/` — brand identity PDF, landing page spec PDF, subscription tiers, alternative homepage spec

## Hero Images (trade mapping)
| Trade | Landscape | Portrait |
|-------|-----------|----------|
| Painter | hero-painter-wall.jpg, hero-painter-splatter.jpg | hero-painter-wall-portrait.jpg, hero-painter-splatter-portrait.jpg |
| Electrician | hero-electrician-lightning.jpg | hero-electrician-fusebox-portrait.jpg |
| Plumber | hero-plumber-copper.jpg | hero-plumber-steam-portrait.jpg |
| Roofer | hero-roofer-slates.jpg | hero-roofer-slates-portrait.jpg |
| Landscaper | hero-landscaper-garden.jpg, hero-landscaper-soil.jpg | hero-landscaper-garden-portrait.jpg, hero-landscaper-wall-portrait.jpg |
| Carpenter | — | hero-brickwall-carpenter-portrait.jpg |
| Builder | hero-brick-wall-smash.jpg, hero-construction-sunrise.jpg, hero-demolition-site.jpg | hero-construction-workshop-portrait.jpg, hero-concrete-rooftop-portrait.jpg |

## Animation & Interaction Guidelines
- **Scroll-triggered**: Intersection Observer API, threshold 0.2, animate once only
- **Fade-up**: 400ms ease-out
- **Stagger**: 100-200ms between items
- **Scale**: 300ms ease
- **Background crossfades**: 300ms ease-in-out
- **Counters**: 800ms ease-out
- **Parallax**: Hero + Problem sections at 60% scroll speed
- **No bouncy/playful animations** — premium, confident motion only

## CTA Behaviour
- "Try 3 Quotes Free" buttons → link to `https://squote.app` (triggers signup flow)
- "Start Free" on pricing cards → link to `https://squote.app` with plan param (e.g. `?plan=core`)
- Sticky header "Try Free" → same as hero CTA

## Don't
- Don't use React, Vue, or any JS framework — keep it vanilla for speed and SEO
- Don't over-animate — the spec has specific timings, stick to them
- Don't use placeholder/stock imagery — all photos are custom AI-generated for squote
- Don't hardcode widths — mobile-first, use max-width containers
- Don't forget: this is a UK product for UK tradespeople — keep the tone direct, no corporate waffle

## Build Phases (suggested)
1. Sticky header + Hero + Social proof (sections 1-2) — nail brand system first
2. How It Works + The Problem (sections 3-4) — parallax rhythm
3. Features + Testimonial + Pricing (sections 5-7) — content-heavy
4. Find Your Trade interactive section (section 8) — most complex
5. Trust signals + Final CTA + Footer (sections 9-10) + polish & performance
