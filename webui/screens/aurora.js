(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-countup'));
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = prefix + target.toFixed(dec) + suffix; return; }
    var dur = 620, start = performance.now();
    function frame(now) {
      var t = Math.min(1, (now - start) / dur);
      var e = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + (target * e).toFixed(dec) + suffix;
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = prefix + target.toFixed(dec) + suffix;
    }
    requestAnimationFrame(frame);
  }

  function run() {
    requestAnimationFrame(function () {
      document.body.classList.add('reveal-in');
    });
    var nums = document.querySelectorAll('[data-countup]');
    setTimeout(function () {
      for (var i = 0; i < nums.length; i++) countUp(nums[i]);
    }, reduce ? 0 : 160);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
