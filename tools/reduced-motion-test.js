(function () {
  "use strict";
  var canvas = document.querySelector("[data-hero-field]");
  var ctx = canvas.getContext("2d", { willReadFrequently: true });

  function sum() {
    var d = ctx.getImageData(0, 0, 300, 150).data;
    var t = 0;
    for (var i = 0; i < d.length; i++) t += d[i];
    return t;
  }

  var first = sum();
  setTimeout(function () {
    var second = sum();
    var drew = first > 0;
    var frozen = first === second;
    var noLoop = window.__rafCalls === 0;
    document.getElementById("out").textContent = JSON.stringify(
      {
        drewStaticFrame: drew,
        frameFrozen: frozen,
        requestAnimationFrameNeverCalled: noLoop,
        rafCalls: window.__rafCalls,
        result: drew && frozen && noLoop ? "PASS" : "FAIL"
      },
      null,
      2
    );
  }, 700);
})();
