# OBOU Automations — marketing site

One-page marketing site for OBOU Automations, built from
`design_handoff_obou_automations` (the "Modernist" Swiss/International
Typographic design system: two grounds, two accents, zero radius).

Static HTML, CSS and one vanilla-JS file. No build step, no package manager,
no runtime dependencies, no third-party requests.

```bash
./serve.sh          # http://127.0.0.1:8000
./serve.sh 4321     # any port
```

`serve.sh` runs `tools/dev-server.py`, which sends the same security headers
the production site should send — so a CSP violation shows up locally rather
than after deploy. It needs only `python3`, which ships with macOS.

## Why no framework

The handoff says to rebuild in the target codebase's stack, or pick one if no
frontend stack exists. There was no existing codebase, and the machine this was
built on has no Node toolchain, so a framework could not have been installed,
built or verified here. The page is one static document with a single canvas
animation and no application state — vanilla HTML/CSS/JS renders it at full
fidelity, and the absence of a dependency tree removes the whole npm supply
chain from the site's attack surface.

If this later needs to become part of a React/Next/Astro app, the markup maps
one-to-one onto components and `scripts/hero-field.js` drops into a
`useEffect`-managed canvas ref unchanged.

## Layout

```
index.html                  the page
styles/design-system.css    Modernist tokens, type scale, grounds, buttons
styles/site.css             page composition (no style attributes anywhere)
scripts/hero-field.js       hero ASCII glyph field
assets/logo.svg             34x34 mark from the handoff
assets/fonts/               self-hosted Archivo (OFL), latin + latin-ext
_headers                    Netlify / Cloudflare Pages response headers
security-headers/           the same policy for Vercel, nginx and Apache
tools/dev-server.py         local preview with production headers
tools/reduced-motion-*      harness proving the reduced-motion path
QA-REPORT.md                what was tested, what was found, what was fixed
SECURITY.md                 threat model and the reasoning behind the policy
```

## Design system notes

The handoff referenced a bundled design-system stylesheet
(`_ds/solana-site-design-.../styles.css`) that was **not** included in the zip.
Every token in `styles/design-system.css` is therefore authored to the values
documented in the handoff README, not copied from the original system. The
documented values — Paper `#f9f4eb`, Ink `#111113`, Acid Yellow `#e3f42a`,
Signal Orange `#fc5957`, the type scale, the 2px rules, zero radius — are
reproduced exactly. Three things had to be inferred:

- **The neutral ramp.** Steps 100/300/500/700/900 are named in the handoff but
  no hex values are given. They are set to a warm ramp sitting between paper and
  ink, chosen so every documented usage (`neutral-700` body copy on paper,
  `neutral-300`/`neutral-500` on ink) clears WCAG AA.
- **`--color-divider`.** Contextual: a warm light rule on paper, a dark grey
  rule on ink, so the same 2px gap reads correctly on both grounds.
- **`--color-accent-3`.** Used only by the poster CTA override. The handoff
  pins that button's hover and active states to `oklch(45% .12 152)` and
  `oklch(38% .12 152)`, so the ramp is anchored on that green hue.

## Fonts

PP Rader, PP Neue Montreal and Sligoil Micro are licensed faces and are not
included. Each stack names its licensed face first and falls back to Archivo,
exactly as the handoff specifies. To switch the real faces on, drop the webfont
files into `assets/fonts/` and add their `@font-face` blocks at the top of
`styles/design-system.css` — nothing else changes.

Archivo is self-hosted rather than loaded from Google Fonts. That keeps the
site free of third-party requests, which is what lets the CSP stay at
`default-src 'none'`. Licence in `assets/fonts/OFL.txt`.

## Two things to decide before launch

1. **`assets/logo.svg` is a red cartoon blob mascot.** That is the asset the
   handoff shipped, so it is used as-is, but it does not match the Swiss
   modernist system around it. Worth a look before this goes public.
2. **Contact details are placeholders.** The footer says the business email and
   booking link "will be added before public launch", and the only real
   destination on the page is the Google Calendar booking link on the poster
   CTA. The nav's "Contact" anchor scrolls to the footer rather than to contact
   details.

## Deploying

Copy the repo contents to any static host. Then apply the response headers:

- **Netlify / Cloudflare Pages** — `_headers` is already at the root; nothing to do.
- **Vercel** — move `security-headers/vercel.json` to the root.
- **nginx** — include `security-headers/nginx.conf` in the `server {}` block.
- **Apache** — rename `security-headers/apache.htaccess` to `.htaccess` at the docroot.

`security-headers/POLICY.txt` is the canonical policy the four files express.
Serve over HTTPS; `Strict-Transport-Security` and `upgrade-insecure-requests`
assume it.

`tools/` is a development harness. It is harmless to deploy but does not need
to be — excluding it from the published output changes nothing about the site.
