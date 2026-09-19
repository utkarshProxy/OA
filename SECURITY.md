# Security

## What this site is

A static, single-page marketing site. No server-side code, no database, no
forms, no authentication, no user input, no cookies, no local storage, no
analytics, no third-party scripts, no npm dependencies. The only runtime
JavaScript is `scripts/hero-field.js`, which draws glyphs on a canvas and
touches nothing else.

That shape is the primary security control. Almost every class of web
vulnerability — injection, XSS via user content, CSRF, SSRF, auth bypass,
dependency compromise — needs an attack surface this page does not have.

## Headers

`security-headers/POLICY.txt` is the canonical policy; `_headers`,
`security-headers/vercel.json`, `nginx.conf` and `apache.htaccess` express the
same thing per host. Change one, change all of them.

```
Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self';
  img-src 'self' data:; font-src 'self'; connect-src 'none'; form-action 'none';
  frame-ancestors 'none'; base-uri 'none'; object-src 'none';
  upgrade-insecure-requests
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(),
  magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

### Why the policy can be this strict

`default-src 'none'` with no `'unsafe-inline'` anywhere is only possible
because the page has **zero** inline scripts and **zero** `style` attributes.
The prototype in the handoff carried every rule as a `style=""` attribute and
its animation as an inline `<script>`; both were lifted into external files
during the rebuild specifically so the policy would not need `'unsafe-inline'`.
A CSP containing `'unsafe-inline'` for styles or scripts provides very little
XSS protection, so this was worth the move.

`connect-src 'none'` and `form-action 'none'` are deliberate, not oversights:
the page makes no network calls and submits no forms. They are tripwires. If
someone later adds a contact form or an analytics snippet, the browser will
block it and they will have to make a conscious decision about the policy
rather than silently widening it.

Self-hosting Archivo instead of loading it from `fonts.googleapis.com` is what
lets `font-src` and `style-src` stay at `'self'`. It also means no visitor IP
is disclosed to a third party for the sake of a typeface.

### Verified, not just configured

The CSP was confirmed to actually block inline code: a test page with an inline
`<script>` and an inline `<style>` was served from the dev server and the
browser refused both with `Executing inline script violates the following
Content Security Policy directive 'script-src 'self''`. See `QA-REPORT.md`.

`tools/dev-server.py` sends the same headers locally so this stays true during
development. It also binds to `127.0.0.1` only — it is a preview tool, not a
production server, and should never be exposed.

## Outbound links

The page has exactly one external destination — the Google Calendar booking
link, which is the site's contact method and is reached from seven links. Every
one carries `target="_blank" rel="noopener noreferrer"`, so the opened tab
cannot reach back through `window.opener` and no referrer leaks. Apart from
same-page anchors, no other URL appears on the page; `calendar.app.google` is
the only external host.

## Supply chain

There is none. No `package.json`, no lockfile, no CDN, no build tooling. The
only third-party artefact in the repo is the Archivo webfont, self-hosted from
the Google Fonts release, licence in `assets/fonts/OFL.txt`.

`assets/logo.svg` came from the handoff. It is rendered through `<img>`, not
inlined, so any script inside an SVG would not execute in the page's context —
`<img>` treats SVG as a static image. It does carry a large embedded C2PA
provenance manifest, which is inert metadata; it was left intact rather than
stripped so the asset's provenance chain stays verifiable.

## Accessibility

Not a security property, but tracked in the same place: every filled-button
state now clears WCAG AA contrast. The primary button's label was moved from
paper to ink (2.86:1 to 6.02:1) as a deliberate departure from the handoff's
"colours are final"; the fill is unchanged. See `QA-REPORT.md`.

## Reporting

There is no security contact address yet. Until one exists, report anything
through the booking link in the footer.
