# Subscription Tiers — Definitive Feature Matrix

> **Status:** Updated 27 March 2026
> **Supersedes:** All prior tier discussions
> **Decision authority:** Michael

---

## Tier Structure

**Three paid tiers + a free tier.**

Free tier gives users a taste of the manual quote builder. Voice-to-quote AI is the paywall.

| | **Free** | **Core** | **Pro** | **Master** |
|---|---|---|---|---|
| **Monthly** | **£0** | **£29/mo** | **£39/mo** | **£69/mo** |
| **Target user** | Just browsing | Sole trader, voice-to-quote | Professional tradesperson, full CRM | Established business, compliance-heavy |

### Tier names rationale

- **Free** — manual builder only, 3 quotes/month, no AI
- **Core** — voice-to-quote AI + PDF download, the entry point for paid users
- **Pro** — full CRM: email, accept portal, jobs, invoicing, photo upload
- **Master** — RAMS, AI Trade Advisor, white-label (coming soon features)

### Introductory offer

Everyone gets **all features at £29/mo** for the first 6 months. After 6 months, Pro goes to £39/mo and Master goes to £69/mo. Core stays at £29/mo.

Implementation: Stripe coupon applied at checkout — Pro/Master users pay £29/mo for 6 months, then auto-revert to full price.

### Trial quotes

New users get **3 free Pro-level quotes** (full AI, email sending, everything). A quote counts as "used" when it is **sent to a client** — onboarding/test quotes don't count. After 3 sent quotes, users are locked to the basic manual builder unless they subscribe.

---

## Feature Matrix

### 1. Quote Creation & AI

| Feature | Free | Core | Pro | Master |
|---------|------|------|-----|--------|
| Manual quote builder (Build from Scratch) | Yes | Yes | Yes | Yes |
| Quote templates | Yes | Yes | Yes | Yes |
| Voice recording + transcription | -- | Yes | Yes | Yes |
| AI quote generation from transcript | -- | Yes | Yes | Yes |
| AI project summary + scope of work | -- | Yes | Yes | Yes |
| Labour rate integration with AI | -- | Yes | Yes | Yes |
| Price list context for AI | -- | Yes | Yes | Yes |
| Custom AI instructions | -- | Yes | Yes | Yes |
| Paste/upload transcript | -- | Yes | Yes | Yes |
| Append to recording | -- | Yes | Yes | Yes |
| Recording modes (Meeting/Voice Notes/Dictation) | -- | Yes | Yes | Yes |
| Photo upload & describe | -- | -- | Yes | Yes |
| **Max recording duration** | **--** | **60 min** | **120 min** | **120 min** |
| Room-by-room capture (future) | -- | -- | -- | Yes |

### 2. Quote Management

| Feature | Free | Core | Pro | Master |
|---------|------|------|-----|--------|
| Hierarchical line items (parent/child) | Yes | Yes | Yes | Yes |
| Cost, markup, profit per item | Yes | Yes | Yes | Yes |
| Show/hide sub-items to customer | Yes | Yes | Yes | Yes |
| Quote numbering + prefix | Yes | Yes | Yes | Yes |
| Rich text introduction | Yes | Yes | Yes | Yes |
| Quote-level discount | Yes | Yes | Yes | Yes |
| Quote expiry date | Yes | Yes | Yes | Yes |
| Add items from price list | Yes | Yes | Yes | Yes |
| **PDF download** | **Yes** | **Yes** | **Yes** | **Yes** |
| **Quotes per month** | **3** | **Unlimited** | **Unlimited** | **Unlimited** |

### 3. Quote Sending & Tracking

| Feature | Free | Core | Pro | Master |
|---------|------|------|-----|--------|
| PDF download (manual send) | Yes | Yes | Yes | Yes |
| **Email sending via squote** | **--** | **--** | **Yes** | **Yes** |
| Online acceptance portal | -- | -- | Yes | Yes |
| Open/read tracking | -- | -- | Yes | Yes |
| Quote follow-up reminders | -- | -- | Yes | Yes |
| Auto-expiry reminders | -- | -- | Yes | Yes |
| Visit summary email | -- | -- | Yes | Yes |

### 4. CRM & Customers

| Feature | Free | Core | Pro | Master |
|---------|------|------|-----|--------|
| Customer list + search | Yes | Yes | Yes | Yes |
| Customer detail (name, email, phone, address) | Yes | Yes | Yes | Yes |
| Customer notes | -- | -- | Yes | Yes |
| Customer quote history | Yes | Yes | Yes | Yes |

### 5. Invoicing & Payments

| Feature | Free | Core | Pro | Master |
|---------|------|------|-----|--------|
| Invoice generation from quotes | -- | -- | Yes | Yes |
| Invoice management (unpaid/paid/overdue) | -- | -- | Yes | Yes |
| Invoice PDF download | -- | -- | Yes | Yes |
| Invoice email sending | -- | -- | Yes | Yes |
| Instalment schedules | -- | -- | Yes | Yes |

### 6. Jobs

| Feature | Free | Core | Pro | Master |
|---------|------|------|-----|--------|
| Job creation from accepted quote | -- | -- | Yes | Yes |
| Job status tracking | -- | -- | Yes | Yes |
| Job numbering | -- | -- | Yes | Yes |

### 7. Company Settings & Branding

| Feature | Free | Core | Pro | Master |
|---------|------|------|-----|--------|
| Company details, logo, brand colour | Yes | Yes | Yes | Yes |
| Labour rates management | Yes | Yes | Yes | Yes |
| Terms & conditions | Yes | Yes | Yes | Yes |
| **Hide squote branding (white-label)** | **--** | **--** | **Yes** | **Yes** |

### 8. Master-Only Features (Planned)

| Feature | Status |
|---------|--------|
| RAMS generation (from quote data) | PLANNED |
| AI Trade Advisor chatbot | PLANNED |
| Inspection reports | PLANNED |
| Priority support | PLANNED |

---

## Stripe Product & Price Structure

### Products (create in Stripe Dashboard)

| Stripe Product | Description |
|---|---|
| `squote Core` | Voice-to-quote AI, PDF download |
| `squote Pro` | Full CRM: email, accept portal, jobs, invoicing |
| `squote Master` | RAMS, AI Trade Advisor, white-label (coming soon) |

### Prices (create under each product)

| Price ID Env Var | Product | Amount | Interval |
|---|---|---|---|
| `STRIPE_CORE_PRICE_ID` | squote Core | £29.00 | Monthly |
| `STRIPE_PRO_PRICE_ID` | squote Pro | £39.00 | Monthly |
| `STRIPE_MASTER_PRICE_ID` | squote Master | £69.00 | Monthly |

### Introductory Coupon

| Coupon | Type | Value | Duration | Use |
|---|---|---|---|---|
| `INTRO29` | Fixed amount off | Reduces Pro/Master to £29/mo | `repeating`, 6 months | Intro offer for all users |

---

## Upsell Trigger Points

### Free to Core

| Trigger | Location | Message |
|---|---|---|
| User taps Record button | `VoiceRecorder.tsx` | "Voice recording needs Core. Start at £29/mo." |
| User tries AI generation | `VoiceRecorder.tsx` | "AI quoting needs a subscription. Try Core for £29/mo." |
| User hits 3-quote limit | `CreateQuote.tsx` | "You've used your 3 free quotes. Upgrade to Core for unlimited." |

### Core to Pro

| Trigger | Location | Message |
|---|---|---|
| User tries to email a quote | `SendQuoteModal.tsx` | "Email sending is a Pro feature. Upgrade for £39/mo." |
| User tries to create an invoice | `Invoices.tsx` | "Invoicing is available on Pro. Upgrade for £39/mo." |
| User views online acceptance link | `QuoteBuilder.tsx` | "Customer acceptance portal needs Pro. Upgrade for £39/mo." |
| User tries photo upload | `VoiceRecorder.tsx` | "Photo upload is a Pro feature. Upgrade for £39/mo." |

### Pro to Master

| Trigger | Location | Message |
|---|---|---|
| User hits 60min recording limit | `VoiceRecorder.tsx` | "Upgrade to Master for 120-minute recordings." |
| RAMS button (when built) | `QuoteBuilder.tsx` | "Generate RAMS documents with Master." |
| AI Trade Advisor (when built) | Chat interface | "Get expert trade advice with Master." |

---

## Cost Analysis (per quote)

| Service | Cost |
|---|---|
| Deepgram transcription | ~£1.00–2.50 (dominant cost) |
| Claude API (AI generation) | ~£0.05–0.08 |
| Resend email | ~£0.001 |
| **Total per AI quote** | **~£1.05–2.60** |

At £29/mo Core, breakeven is ~12-28 AI quotes/month. Most tradespeople will do 5-15.

---

## Decision Log

| Decision | Rationale |
|---|---|
| Free tier with 3 quotes/mo | Lets users try the manual builder; AI is the paywall |
| Core at £29/mo for voice-to-quote only | Covers per-quote costs; entry price for AI |
| Pro at £39/mo for full CRM | £10 step-up from Core is easy upsell; email/invoicing = real value |
| Master at £69/mo for compliance features | RAMS alone costs £700+/yr elsewhere |
| Intro offer: all at £29/mo for 6 months | Removes price as a barrier; auto-reverts |
| 3 free Pro-level trial quotes | Users experience the best; sent = counts |
| Per-account not per-user | Major differentiator vs Tradify, Fergus |
