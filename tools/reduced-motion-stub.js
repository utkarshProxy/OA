/* Loaded before hero-field.js by reduced-motion-test.html. Forces
   prefers-reduced-motion to report "reduce" and counts requestAnimationFrame
   calls, so the frozen-frame path can be exercised without touching OS
   settings. Kept in its own file because the site's CSP forbids inline script. */
(function () {
  "use strict";
  window.__rafCalls = 0;
  var realRaf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = function (cb) {
    window.__rafCalls++;
    return realRaf(cb);
  };
  var realMM = window.matchMedia.bind(window);
  window.matchMedia = function (q) {
    if (q.indexOf("prefers-reduced-motion") !== -1) {
      return {
        matches: true,
        media: q,
        addEventListener: function () {},
        removeEventListener: function () {}
      };
    }
    return realMM(q);
  };
})();
