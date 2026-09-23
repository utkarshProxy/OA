// The site's response-header policy, applied by the SSR handler in src/server.ts.
//
// The static build of this site (git history before the TanStack rewrite) shipped
// the same policy as a `_headers` file, because every response was a file on disk.
// This app renders HTML on the server, so the document responses are produced here
// and the policy travels with them regardless of host. `_headers` and the files in
// `security-headers/` still carry the policy for hosts that serve the static assets
// (`/assets/*`, `/_build/*`) directly, without passing them through this handler.
//
// Differences from the static site's policy, and why:
//   script-src  adds 'unsafe-inline' — TanStack Start emits an inline hydration
//               script alongside <Scripts />. Removing it means moving to a
//               per-request nonce, which Start does not expose today.
//   style-src   adds 'unsafe-inline' — Vite and React inject style elements.
//   connect-src 'self' rather than 'none' — the router prefetches route data and
//               server functions post back to this origin.
// Everything else is unchanged from the static policy.

export const CONTENT_SECURITY_POLICY = [
  "default-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  // Both forms submit through same-origin server functions.
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

export const SECURITY_HEADERS: Record<string, string> = {
  "Content-Security-Policy": CONTENT_SECURITY_POLICY,
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Cross-Origin-Embedder-Policy": "require-corp",
};

/**
 * Add the policy to a response without clobbering a header the handler set
 * deliberately. Responses are immutable once constructed in some runtimes, so
 * this returns a copy when the original's headers cannot be written to.
 */
export function withSecurityHeaders(response: Response): Response {
  try {
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      if (!response.headers.has(name)) response.headers.set(name, value);
    }
    return response;
  } catch {
    const headers = new Headers(response.headers);
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      if (!headers.has(name)) headers.set(name, value);
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }
}
