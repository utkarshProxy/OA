/**
 * Hero ASCII glyph field.
 *
 * A grid of glyphs drawn over the hero. Two overlapping sine waves give each
 * cell a "current" value; a moving horizontal ribbon and a static bloom hotspot
 * turn that into a depth value, which picks the glyph and its opacity. Colour
 * cycles through the four-colour palette by grid position.
 *
 * Throttled to ~24fps, capped at 1.25x device pixel ratio, and frozen on a
 * single frame under prefers-reduced-motion.
 */
(function () {
  "use strict";

  var GLYPHS = " ·:+*x#%";
  var COLORS = ["#fc5957", "#e3f42a", "#111113", "#8b8781"];
  var FRAME_MS = 42;
  var RESIZE_DEBOUNCE_MS = 120;
  var MAX_DPR = 1.25;

  function startField(canvas) {
    var ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return function () {};

    var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var width = 0;
    var height = 0;
    var last = 0;
    var frame = null;
    var resizeTimer = null;

    function drawField(time) {
      ctx.clearRect(0, 0, width, height);

      var compact = width < 680;
      var stepX = compact ? 17 : 20;
      var stepY = compact ? 18 : 21;
      var cols = Math.ceil(width / stepX) + 2;
      var rows = Math.ceil(height / stepY) + 2;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font =
        "700 " +
        (compact ? 13 : 15) +
        "px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

      for (var row = -1; row < rows; row++) {
        for (var col = -1; col < cols; col++) {
          var x = col * stepX;
          var y = row * stepY;
          var nx = x / Math.max(width, 1);
          var ny = y / Math.max(height, 1);

          var current =
            Math.sin(nx * 8.2 - ny * 4.1 + time * 0.42) +
            Math.sin(nx * 3.4 + ny * 9.6 - time * 0.28) * 0.58;

          var ribbonCenter =
            (compact ? 0.62 : 0.46) +
            (compact ? 0.2 : 0.16) * Math.sin(nx * 5.2 - time * 0.36);
          var ribbon = Math.exp(
            -Math.pow(ny - ribbonCenter, 2) / (compact ? 0.034 : 0.022)
          );

          var bloom = Math.exp(
            -Math.pow(nx - 0.74, 2) / 0.16 - Math.pow(ny - 0.43, 2) / 0.23
          );

          var depth =
            Math.max(0, Math.min(1, (current + 1.58) / 3.05)) * ribbon;
          var alpha =
            (0.14 + bloom * 0.3 + depth * 0.85) *
            Math.min(1, 0.42 + nx * 0.78) *
            (compact ? 1.34 : 1);
          if (alpha < 0.05) continue;

          var pick = Math.max(
            0,
            Math.min(
              GLYPHS.length - 1,
              Math.floor(depth * (GLYPHS.length - 1) + ((row * 7 + col * 3) % 3))
            )
          );

          ctx.globalAlpha = Math.min(1, alpha);
          ctx.fillStyle = COLORS[Math.abs(row + col * 2) % COLORS.length];
          if (depth > 0.55) {
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = compact ? 6 : 9;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.fillText(
            GLYPHS[pick],
            x + Math.sin(row * 0.31 + time * 0.25) * 3,
            y + Math.cos(col * 0.18 - time * 0.22) * 2
          );
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    }

    function sizeField() {
      var box = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = Math.max(1, Math.round(box.width));
      height = Math.max(1, Math.round(box.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawField(motionQuery.matches ? 5 : performance.now() / 1000);
    }

    function animate(now) {
      if (now - last > FRAME_MS) {
        drawField(now / 1000);
        last = now;
      }
      frame = window.requestAnimationFrame(animate);
    }

    function onResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(sizeField, RESIZE_DEBOUNCE_MS);
    }

    function stopLoop() {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    }

    function applyMotionPreference() {
      stopLoop();
      if (motionQuery.matches) {
        drawField(5);
      } else {
        last = 0;
        frame = window.requestAnimationFrame(animate);
      }
    }

    window.addEventListener("resize", onResize, { passive: true });
    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", applyMotionPreference);
    }

    sizeField();
    if (!motionQuery.matches) {
      frame = window.requestAnimationFrame(animate);
    }

    return function teardown() {
      stopLoop();
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      if (typeof motionQuery.removeEventListener === "function") {
        motionQuery.removeEventListener("change", applyMotionPreference);
      }
    };
  }

  var canvas = document.querySelector("[data-hero-field]");
  if (canvas) startField(canvas);
})();
