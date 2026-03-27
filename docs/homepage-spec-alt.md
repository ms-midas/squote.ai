# squote.app — Homepage Spec
*Inspired by heylemon.ai structure and motion quality. Distinct visual identity.*

---

## Brand Identity

### Colour Palette
| Token | Value | Usage |
|---|---|---|
| `--navy` | `#1B2D4F` | Hero gradient, headings, dark sections |
| `--orange` | `#FF6B35` | CTAs, accent highlights, italic emphasis |
| `--off-white` | `#FAF8F5` | Page background |
| `--slate` | `#EEF1F6` | Card/surface backgrounds |
| `--ink` | `#111827` | Body text |
| `--muted` | `#6B7280` | Subtext, labels |

### Typography
- **Headlines:** `Fraunces` (serif, variable — supports optical size + italic) — editorial, premium, distinctive
- **Body / UI:** `Inter` — clean, legible, universally trusted
- **Headline style:** Large serif for section headlines; key phrase in italic orange for emphasis

### Motion Principles
- Scroll-triggered, not auto-playing on load
- Nothing bounces or feels playful — deliberate and confident
- All demos simulate real product interaction (typing, mic pulse, quote appearing)
- On mobile: all scroll-triggered animations replaced with simple fade-in

### Easing Curves
Three curves cover every case — never use browser defaults:

| Use | Curve | CSS |
|---|---|---|
| Default entrances | Expo out | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Transitions between states | Quint in-out | `cubic-bezier(0.83, 0, 0.17, 1)` |
| CTA button hover/press | Soft spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

The principle: fast start, ultra-soft landing. Elements should feel like they're settling into place, not stopping.

### Entrance Animation — Blur-to-Focus
Every scroll-triggered element uses blur + slide + fade — not just fade:
```css
/* Before (off-screen state) */
.animate-in {
  opacity: 0;
  transform: translateY(16px);
  filter: blur(4px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

/* After (visible state) */
.animate-in.visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0px);
}
```
This makes elements feel like they're materialising, not just appearing. Used by Linear, Vercel, Stripe.

### Stagger — Eased, Not Equal
List items (feature switcher, stat cards, etc.) use an eased stagger — faster at start, slower toward end:
```js
// GSAP
gsap.from(".list-item", {
  opacity: 0,
  y: 20,
  filter: "blur(4px)",
  duration: 0.6,
  stagger: {
    each: 0.08,
    ease: "power2.out" // stagger itself is eased
  }
});
```
Six items should feel like one fluid motion, not six separate ones.

---

## Page Structure

---

### 1. Navigation
**Sticky top bar, white background, subtle bottom border on scroll**

- Left: squote logo (wordmark)
- Centre: How it works · Features · Pricing
- Right: `Log in` (text link) + `Start free` (navy pill button)

---

### 2. Hero Section
**Full-viewport, navy-to-off-white gradient (top navy, fades to warm white by fold)**

**Layout:** Two-column — copy left, animated product mockup right

**Headline (large serif, ~72px):**
```
Describe the job.
We'll write the quote.
```
*(last three words in italic orange)*

**Subheadline (sans, ~20px, muted):**
```
squote turns a 60-second voice note into a professional quote
your customer can accept in one tap.
```

**CTAs:**
- `Start free — no card needed` (navy pill, large)
- `Watch it work` (text link with play icon)

**Right side animation — multi-layer parallax (3 depth layers):**
```js
// Foreground (mic pulse rings) — moves fastest
gsap.to(".hero-rings", { y: -60, scrollTrigger: { scrub: 1.5 } });

// Midground (voice recorder card)
gsap.to(".hero-card", { y: -20, scrollTrigger: { scrub: 2.5 } });

// Background (navy glow) — moves slowest = feels furthest away
gsap.to(".hero-glow", { y: -8, scrollTrigger: { scrub: 4 } });
```
- Floating UI card showing the squote voice recorder
- Animated mic pulse rings ripple outward (Lottie)
- Speech-to-text transcript appears word by word (variable-speed typing — see below)
- Below it, a quote document card slides up with line items populating one by one
- Annotation text curves around the illustration: *"Say the job"* → *"Quote ready in seconds"*
- Subtle drop shadow, slight tilt (like it's sitting on a desk)

---

### 3. Social Proof Strip
**White background, full-width**

```
Trusted by 500+ tradespeople across the UK
```

Logo row: electricians / plumbers / builders / gas engineers / landscapers
*(illustrated trade icons, not photos — cleaner, timeless)*

---

### 4. The Problem Section
**Off-white background**

**Headline (serif, centred):**
```
You're good at the work.
The paperwork is killing your evenings.
```

**Stat cards — three cards in a slight fan/overlap layout (same pattern as Lemon.ai but navy/slate coloured):**
- Card 1 (slate): `Average quote takes 45 mins to write`
- Card 2 (navy, centre, elevated): `Most tradespeople quote for free — and lose jobs anyway`
- Card 3 (orange): `Slow quotes lose jobs. Fast quotes win them.`

Each card has a subtle icon and a "Fix this →" CTA.

---

### 5. How It Works (Feature Switcher)
**White background, two-column sticky section**

**Left column — feature list (eased stagger scroll-in):**
Each item has a fill-progress bar underneath it that animates over ~3 seconds while active, then auto-advances to the next item:
```
[ Record your voice          ████████████ ] ← fills over 3s
[ Quote is generated         ░░░░░░░░░░░░ ]
[ Review and send            ░░░░░░░░░░░░ ]
[ Customer accepts in one tap ░░░░░░░░░░░ ]
[ Convert to invoice         ░░░░░░░░░░░░ ]
```
User can also click any item to jump directly. Clicking resets and starts the progress bar for that item.

**Scroll snapping — prevents animation collisions on fast scroll:**
```css
.feature-section {
  scroll-snap-type: y mandatory;
}
.feature-card {
  scroll-snap-align: start;
  scroll-snap-stop: always; /* forces full stop at each card */
}
```

**Right column — animated demo window:**
Each step shows a simulated product interaction:

1. **Record** — mic button pulses, waveform animates, transcript types in with variable speed (see typing spec below)
2. **Generated** — line items appear one by one with labour/materials tags, blur-to-focus entrance
3. **Review** — cursor moves, a price is edited, markup updates live
4. **Send** — quote email mockup, customer taps "Accept", confetti pop
5. **Invoice** — "Convert to Invoice" button click, INV-001 appears

**Section headline (above the switcher):**
```
From site to sent
in under two minutes.
```

---

### 6. Deep Dive Features
**Alternating left/right sections on off-white, one feature per scroll stop**

**Feature 1 — Voice quoting**
Headline: `Say it. Don't type it.`
Copy: Record a voice note on site — squote transcribes, structures, and prices the job automatically.
Visual: Illustrated phone with mic + quote emerging

**Feature 2 — Smart price list**
Headline: `Your rates. Always applied.`
Copy: Build your own price list over time. squote learns your pricing and applies it automatically to every quote.
Visual: Illustrated price list with toggle states

**Feature 3 — Customer accept page**
Headline: `One link. One tap. Done.`
Copy: Customers get a clean, branded page to review and accept your quote — no login, no friction.
Visual: Illustrated mobile screen showing the accept page

**Feature 4 — Staged payments**
Headline: `Get paid in stages, automatically.`
Copy: Set deposit, mid-stage, and final payment terms on the quote. Customers see it before they accept.
Visual: Illustrated payment timeline with three milestones

---

### 7. Testimonials
**Navy background, white text — warmth break**

**Headline:**
```
"Honestly, I don't know how I quoted
before squote."
```
*(full-width serif pull quote, large)*

Below: three testimonial cards on dark surface
- Name, trade, location
- Short quote focused on time saved or jobs won
- Star rating

---

### 8. Pricing Section
**Off-white background**

**Headline:**
```
Simple pricing.
No surprises.
```

Three-column pricing cards:
- **Free** — 5 quotes/month, manual entry
- **Core** — Unlimited quotes, voice quoting, price list (£19/mo)
- **Pro** — Everything + remove squote branding, staged payments (£39/mo)

Pro card elevated, navy background, orange CTA.

---

### 9. Final CTA Section
**Full-bleed navy background**

**Left:**
```
Your voice is your
most powerful tool.
Start using it.
```
*(large serif, white + italic orange emphasis)*

Subtext: `Ready to win more jobs and get your evenings back?`

CTA: `Start free — no card needed` (large orange pill button)

**Right:** Illustrated scene — tradesperson on a job site, phone in hand, quote sending animation

Curved ribbon annotation: *"Just say what you need"* → *"And watch it get sent"*

---

### 10. Footer
**Dark charcoal `#0F172A` background**

- Left: squote logo + tagline `Quote fast. Win jobs. Get paid.` + social icons
- Right: Product / Company / Legal columns
- Bottom: `© 2026 squote.app — All rights reserved`
- Ghosted large wordmark `squote` behind footer content (same trick as Lemon.ai but in a darker tone)

---

## Implementation Notes

### Tech recommendation
- **Framer** — best for this level of scroll animation without custom code
- Alternative: React + **Framer Motion** + **GSAP ScrollTrigger** if keeping in the existing codebase

### Fonts to load
```css
@import url('https://fonts.google.com/specimen/Fraunces'); /* serif headlines */
@import url('https://fonts.google.com/specimen/Inter');    /* body */
```

### Animation library
- Framer Motion for React component animations
- GSAP ScrollTrigger for scroll-linked sequences
- Lottie for the voice/mic pulse animation

### Typing Simulation — Variable Speed + Blinking Cursor
Transcripts in the demo must feel human. Constant-speed typing feels robotic:
```js
const text = "Replace boiler, 1 day labour, parts included...";

// Variable character delay — 40–100ms, with pauses at punctuation
const delays = text.split('').map((char) => {
  if (['.', ',', '—'].includes(char)) return 200; // brief hesitation
  if (char === char.toUpperCase() && char !== ' ') return 120; // pause before capitals
  return Math.random() * 60 + 40; // 40–100ms normal
});
```
Add a blinking cursor `|` after the last typed character. Blink interval: **530ms** — the actual macOS cursor blink rate. Subconsciously correct.

### CTA Button Micro-interaction
The "Start free" button should feel physical:
```css
.cta-button {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.2s ease;
}

.cta-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 30px rgba(255, 107, 53, 0.35); /* orange glow matches brand */
}

.cta-button:active {
  transform: translateY(0px) scale(0.98); /* satisfying press-down */
}
```

### Implementation Priority Order
| Priority | Improvement | Impact |
|---|---|---|
| 1st | Upgrade easing curves site-wide | Biggest overall uplift |
| 2nd | Blur-to-focus on all entrances | Instantly feels more premium |
| 3rd | Feature switcher progress bar | Better UX + more polished |
| 4th | Hero parallax layering | Adds depth and wow |
| 5th | Scroll snapping on feature section | Fixes fast-scroll jank |
| 6th | CTA micro-interaction | Small but satisfying |
| 7th | Eased stagger timing | Subtle but noticeable |
| 8th | Variable typing speed | Fine detail, worth it |

### Mobile
- All scroll-triggered animations replaced with simple fade-in on mobile
- Feature switcher becomes vertical accordion (no progress bars, no scroll snap)
- Hero becomes single column, mockup below copy
- Stat cards stack vertically
- Parallax disabled on mobile (performance + motion sensitivity)

---

## Copy Tone Guide
- **Short sentences.** Tradespeople don't read essays.
- **Concrete, not abstract.** "3-minute quote" not "streamlined workflow"
- **No jargon.** No "AI-powered", no "leverage", no "seamlessly"
- **British English.** "labour" not "labor", "organised" not "organized"
- **Confidence without hype.** State facts. Let the product speak.
