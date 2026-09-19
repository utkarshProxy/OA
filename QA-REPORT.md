# QA report

Tested in the Chromium-based browser pane against `tools/dev-server.py`, which
serves the production security headers. Viewports exercised: 375, 768, 1250,
1280 and 1440 px wide.

## Defects found and fixed

### 1. Header lost its side gutters at every viewport — fixed

`.site-nav` carried `padding: 22px 0`. Because `.wrap` and `.site-nav` are the
same element, that shorthand reset `.wrap`'s `padding-inline` to `0`, so the
logo and the nav badge sat flush against the viewport edges.

Invisible above 1304px (the `.wrap` max-width centres the row and leaves
margin), obvious at 375px, where the nav link row ran from x=0 to x=375 with no
gutter at all.

Fixed by using `padding-block` instead of the shorthand. Verified at 1250px:
brand starts at x=37, badge ends at x=1213 inside a 1250px viewport.

### 2. Focus indicator under the WCAG 2.2 contrast minimum — fixed

The focus ring used signal orange, which is **2.86:1** against paper — below
the 3:1 minimum for a non-text focus indicator (SC 1.4.11 / 2.4.11). Switched
to ink on light grounds (17.22:1) and acid yellow on dark (15.48:1).

### 3. Poster CTA label just missed AA — fixed

`--color-accent-3` green on the acid-yellow button measured **4.27:1**, just
under 4.5:1. `--color-accent-3` was a reconstruction (the original token was
not shipped in the handoff), so its lightness moved from `oklch(52%…)` to
`oklch(50%…)`, giving **4.65:1**. The hover and active steps the handoff pins
explicitly were left untouched.

### 4. Nav and footer links below the minimum target size — fixed

Those links were 19–23px tall, under the 24×24 CSS px minimum (SC 2.5.8).
Added `padding-block` to `.obo-link` and reduced the footer's grid gap to
compensate, so the rendered spacing is unchanged. Now zero elements under 24px.

### 5. `frame-ancestors` in the `<meta>` CSP threw a console error — fixed

`frame-ancestors` is ignored in a meta-delivered CSP and logs an error on every
load. Removed from the meta tag; it remains in the response headers, where it
works, alongside `X-Frame-Options: DENY`.

### 6. Filled orange buttons failed AA — fixed

`.btn-primary` rendered paper text on signal orange at **2.86:1**, against a
4.5:1 requirement for its 13px label. This affected the hero CTA, the process
banner CTA and "Choose a quick win". `.btn-secondary:hover`, which fills with
the same orange, had the same problem.

The handoff marks colours as final, so this was raised rather than changed
silently, and then fixed on your call. Labels are now ink: **6.02:1**. The
orange fill is untouched.

The pressed state needed the opposite treatment. On `accent-700` (`#c9302e`)
the ramp flips — ink falls to 3.54:1 while paper reaches 4.86:1 — so `:active`
keeps a paper label. Every state of every filled button now clears AA.

## Verified working

| Check | Result |
| --- | --- |
| Inline script blocked by CSP | Blocked — browser refused a test inline `<script>` |
| Inline style blocked by CSP | Blocked — browser refused a test inline `<style>` |
| Third-party network requests | **0** — all 56 requests same-origin |
| `style` attributes in the page | 0 |
| Inline `<script>` elements | 0 |
| External link hardening | all 7 booking links `target="_blank" rel="noopener noreferrer"` |
| External hosts | 1 — `calendar.app.google` |
| Anchor targets resolve | `#main` `#home` `#services` `#pricing` `#contact` all present |
| Heading structure | one `h1`, then `h2`/`h3` in order, no skipped levels |
| Landmarks | 1 `header`, 1 `main`, 1 `footer`, 2 labelled `nav` |
| Images without `alt` | 0 |
| Skip link | appears on first Tab, moves focus to `#main` |
| Horizontal overflow | none at 375 / 768 / 1250 / 1280 / 1440 |
| Grid collapse at 860px | services and pricing both go single-column |
| Canvas DPR cap | 1.25 as specified (1280 CSS px → 1600 device px) |
| Canvas animates over time | yes — successive redraws differ |
| `prefers-reduced-motion` | **PASS** — static frame drawn, `requestAnimationFrame` never called |

The reduced-motion result comes from `tools/reduced-motion-test.html`, which
stubs `matchMedia` before the hero script initialises and asserts that a frame
was drawn, that it never changes, and that the animation loop never starts.
Open it at `/tools/reduced-motion-test.html` with the dev server running.

## Contrast measurements

All WCAG AA (4.5:1 for normal text) unless noted.

| Pair | Ratio | |
| --- | --- | --- |
| Ink on paper | 17.22 | pass |
| Paper on ink | 17.22 | pass |
| Body copy — neutral-700 on paper | 7.11 | pass |
| Secondary — neutral-300 on ink | 9.14 | pass |
| Micro — neutral-500 on ink | 5.28 | pass |
| Service eyebrow — accent-700 on paper | 4.86 | pass |
| Price eyebrow — neutral-300 on card | 8.24 | pass |
| Price note — neutral-500 on card | 4.76 | pass |
| Featured card — ink on acid yellow | 15.48 | pass |
| Poster — ink on signal orange | 6.02 | pass |
| Footer eyebrow — acid yellow on ink | 15.48 | pass |
| Poster CTA — accent-3 on acid yellow | 4.65 | pass (was 4.27) |
| Poster CTA hover — paper on accent-3-600 | 6.42 | pass |
| Primary button — ink on signal orange | 6.02 | pass (was 2.86 with paper) |
| Primary button hover — ink on accent-600 | 4.70 | pass |
| Primary button pressed — paper on accent-700 | 4.86 | pass |
| Secondary button hover — ink on signal orange | 6.02 | pass (was 2.86) |
| Secondary button pressed — paper on accent-700 | 4.86 | pass |

## Not covered

- **Real browser matrix.** Everything above was measured in one Chromium
  engine. Safari and Firefox were not available on this machine. The page uses
  no exotic features — `mask-image` is prefixed, `oklch()` has been baseline
  since 2023 — but it has not been seen in WebKit or Gecko.
- **The `requestAnimationFrame` loop running continuously.** The browser pane
  reported `document.visibilityState: "hidden"` throughout, and browsers
  throttle `requestAnimationFrame` to zero in hidden documents. The drawing
  function and the resize path were verified directly instead (successive
  redraws at different timestamps produce different pixels), and the
  reduced-motion branch was verified in full. The loop itself should be
  eyeballed once on a real screen.
- **Screen reader testing.** Structure, landmarks, labels and focus order were
  checked; no assistive technology was actually driven.
- **Lighthouse / axe.** No Node toolchain on this machine, so the automated
  suites were not run. The checks above were done by hand and by direct
  measurement in the page.
