# Build brief — Solutions tab switcher + system pages

For an AI coding agent (Codex) working in `utkarshProxy/OA`, branch
**`new-site-tanstack`** (NOT `main` — that's the old static site).

Visual reference: the Claude design artboards (desktop 1440px, mobile 390px).
**The artboards are a visual spec, not source code.** Their inline styles and
`sc-for` / `sc-if` tags do not exist here. Rebuild as React components using
this repo's conventions.

---

## 1. The codebase

| | |
|---|---|
| Framework | TanStack Start (`@tanstack/react-start`), React 19, Vite 8 |
| Package manager | Bun (`bun.lock`, `bunfig.toml`) |
| Styling | Tailwind v4 (`@theme inline` in `src/styles.css`) + hand-written component classes in the same file |
| UI kit | shadcn/ui + Radix (`src/components/ui/*`) |
| Icons | `lucide-react` |
| Animation | `framer-motion` (available, use sparingly) |
| Routing | File-based, `src/routes/*.tsx`. `routeTree.gen.ts` is generated — never hand-edit |
| Content | `src/lib/site-content.ts` — all copy/data lives here, components stay presentational |

Commands: `bun dev`, `bun run build`, `bun lint`, `bun run format`.

> ⚠️ This branch is connected to **Lovable**. Do not force-push, rebase, amend
> or squash pushed commits. Keep the branch in a working state — commits sync
> back to the Lovable editor. (See `AGENTS.md`.)

### House style, observed — follow it

- Components are written densely, often one line per component, with the
  section shape `<section className="x section-light"><div className="wrap">…`.
- Layout/visual CSS goes in `src/styles.css` as **semantic classes**
  (`.solution-grid`, `.flow-item`, `.segmented`), not long Tailwind utility
  strings in JSX. Match that.
- Design tokens: `--paper`, `--ink`, `--surface`, `--surface-alt`,
  `--text-secondary`, `--accent-primary` (coral), `--accent-secondary`
  (acid yellow), `--border`, `--muted`. All oklch.
- **Radius is 0** across the theme (`--radius-*: 0`). The artboards show
  rounded corners — **ignore that**, keep the hard edges.
- Fonts: self-hosted Archivo (`--font-sans`), `--font-mono` = Courier New.
  Artboard mono labels → existing `.t-label` class. No Google Fonts.
- Existing helpers to reuse, not reinvent: `PageFrame`, `SectionIntro`,
  `Eyebrow`, `Flow`, `FinalCTA`, `PrimaryLink`, `.wrap`, `.section-light`,
  `.section-dark`, `.tag-list`, `.t-h2`, `.t-label`, `.highlight-yellow`,
  `.mark-coral`, `.mark-yellow`.
- The `.segmented` control in `WorkflowCompare` is the closest existing
  precedent for a toggle — match its visual language.

---

## 2. Scope

### 2.1 Replace the homepage `Solutions()` section

`src/routes/index.tsx:62` currently maps `solutions` into `.solution-grid`.
Replace with a **5-tab switcher**. Keep `id="solutions"` (the hero links to it).

Tab order — **Operations first**, and note this reorders the existing numbering
in `site-content.ts`:

| # | Tab | Subtitle | Panel headline |
|---|---|---|---|
| 1 | Operations | Back office | Back office on **autopilot**. |
| 2 | Sales | Lead-to-Booking | **Never miss** a lead. |
| 3 | Marketing | Content | One conversation. **Every channel**. |
| 4 | Knowledge | Ask your business | **Ask** your business. |
| 5 | Custom | Built for you | Something else eating your week? **We'll build it.** |

Bold = existing `.mark-yellow` / `.highlight-yellow` treatment.

Build on `src/components/ui/tabs.tsx` (Radix) so keyboard nav, roving
tabindex and ARIA come for free. Do not hand-roll a tab widget.

### 2.2 Panel anatomy

Desktop: 2-column grid — text left, demo card right.
Mobile: stacked — headline → demo card → feature rows → button.

- Left: `.t-label` (`01 / Operations`), `h3` headline, lede, three feature rows
  (icon tile + title + one line), primary CTA link.
- Right: **dark demo card** on `--ink` with a header (icon tile, title, mono
  sub-label, `Illustrative` chip) and a body that varies per system: a
  timeline of 4–5 rows, chat bubbles, or an output list.
- **Every demo card keeps its "Illustrative" chip.** There is no client data
  yet; nothing on the site may read as a real result or metric.
- Give the panel container a `min-height` so the page doesn't jump on switch.

### 2.3 Content model

Extend `solutions` in `src/lib/site-content.ts` rather than hard-coding copy
in components. Per system add: `subtitle`, `headline`, `lede`,
`features: {icon, title, text}[]`, and a `demo` object describing the card
(kind: `timeline` | `chat` | `outputs`, plus its rows). Add the fifth entry,
`custom` (slug `custom`), which has no flow but reuses the same shape.

Icons: reference `lucide-react` names in the data (`Phone`, `AudioLines`,
`Hash`, `Calendar`, `MessageSquare`, `ArrowLeftRight`, `Inbox`, `ListChecks`,
`User`, `Sparkles`, `Wrench`, `BookOpen`, `Bell`, `Reply`) and map name → component
in one lookup object. For Instagram/WhatsApp use the **existing brand SVGs** in
`src/assets/tool-logos/` — they're already in the ticker.

### 2.4 Voice-agent waveform (Sales panel + Lead-to-Booking page)

~12–20 bars of varying height in `--accent-primary`, animating:

```css
@keyframes obo-wave { from { transform: scaleY(.28); } to { transform: scaleY(1); } }
.wave-bar { transform-origin: center; animation: obo-wave .78s ease-in-out infinite alternate; }
@media (prefers-reduced-motion: reduce) { .wave-bar { animation: none; } }
```

Stagger with `animation-delay` (~90ms steps) via `:nth-child()` or a `--i`
custom property. Wrapper gets `aria-hidden="true"`. CSS animation is enough —
don't reach for framer-motion here.

### 2.5 System pages

`/solutions` currently lists all systems with anchors. Give each system its own
route (`src/routes/solutions/$slug.tsx` or one file per system — follow
`src/routes/README.md`) with this order:

hero (Lead-to-Booking also gets the 4-way channel switcher: Call / Instagram /
WhatsApp / Form) → fact strip → system deep-dive → problem → how it works
(6 steps, reuse `Flow`) → you stay in charge → what we won't build → CTA.

Full copy is in the artboards. Lead-to-Booking is written out completely; the
other four follow the same skeleton. There is **no "Where it stands" section**
— it was deliberately removed.

The hero channel switcher is also Radix Tabs, styled as chips.

### 2.6 CTAs

`Book a call` → `BOOKING_URL` from `site-content.ts` (already the real Google
Calendar link). Do not use `#` or invent a URL.

---

## 3. Responsive

- Desktop: 5-column tab row; panel is a 2-column grid.
- ≤900px: tabs become a horizontally scrollable chip row —
  `overflow-x:auto; scroll-snap-type:x mandatory;` with `scroll-snap-align:start`
  on each trigger. Let the 4th/5th chip peek past the edge so the swipe
  affordance reads. Radix keeps keyboard nav working.
- Mobile panel: single column, full-width CTA, min 44px tap targets.
- Match the existing breakpoints in `src/styles.css` (there's already a
  `.solution-grid` collapse rule) instead of introducing new ones.

---

## 4. Accessibility

- SVG icons decorative: `aria-hidden="true"`, text label always present.
- Waveform hidden from AT; honour `prefers-reduced-motion` (the hero canvas
  already does — follow that precedent).
- Body copy uses `--text-secondary`, not `--muted`, to hold 4.5:1 on paper.
- Coral `--accent-primary` is a background for **ink** text, never white.
- Keep the global `:focus-visible` outline; don't suppress it on tab triggers.

---

## 5. Open TODOs (do not invent these)

- [ ] No pilot/client results exist. No metrics, logos or testimonials anywhere.
- [ ] "Written plan you approve", "warm transfer", "call recordings and
      transcripts" are promises in the copy — confirm they match the real
      service before shipping.
- [ ] Voice agent is Twilio + ElevenLabs. Don't name vendors on the page
      beyond what the copy already says.
- [ ] Decide whether all five system pages ship at once or only Lead-to-Booking,
      with the rest linking to `/solutions#slug` in the meantime.

---

## 6. Definition of done

- [ ] `bun run build` passes; `bun lint` clean; `bun run format` applied.
- [ ] No hand-edits to `routeTree.gen.ts`; new routes generated by the plugin.
- [ ] Tab + channel switchers fully keyboard operable; visible focus ring.
- [ ] Reduced-motion: waveform static, hero canvas still frozen.
- [ ] No new runtime dependency added — everything needed is already installed.
- [ ] Verify response headers / CSP in `_headers` and `security-headers/` still
      pass with any new asset.
- [ ] Mobile 390px: no horizontal page scroll (body already has `overflow-x:hidden`
      — make sure the chip row is the only thing that scrolls sideways).

## 7. Suggested prompt for Codex

> Read BUILD-BRIEF-SOLUTIONS.md. On branch new-site-tanstack, replace the
> Solutions section in src/routes/index.tsx with the 5-tab switcher it
> describes, driven by data in src/lib/site-content.ts, built on the existing
> Radix Tabs component. Match the visual reference in reference/ but follow
> this repo's tokens, zero-radius rule and CSS conventions. Don't add
> dependencies. Then work through the Definition of done.
