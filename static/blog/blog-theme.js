/* Dark/light mode for the blog — mirrors the homepage behavior.
   Shares the homepage's localStorage key ('dark_mode'), so a choice
   made on either the homepage or the blog stays in sync. */
(function () {
  var root = document.documentElement;

  function stored() {
    try { return localStorage.getItem('dark_mode'); } catch (e) { return null; }
  }

  function autoDark() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    // Time-of-day fallback: dark in the evening and at night.
    var h = new Date().getHours();
    return h >= 19 || h < 7;
  }

  function isDark() {
    var s = stored();
    if (s === '1') return true;
    if (s === '0') return false;
    return autoDark();
  }

  function apply(dark) {
    root.classList.toggle('dark', dark);
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.textContent = dark ? '☀︎' : '☾';
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  // Apply immediately (script runs in <head>) to avoid a flash of the wrong theme.
  apply(isDark());

  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('.site-nav');
    if (nav && !document.querySelector('.theme-toggle')) {
      var btn = document.createElement('a');
      btn.href = '#';
      btn.className = 'theme-toggle';
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var dark = !root.classList.contains('dark');
        try { localStorage.setItem('dark_mode', dark ? '1' : '0'); } catch (err) {}
        apply(dark);
      });
      nav.appendChild(btn);
    }
    apply(isDark());
  });

  // Follow system/time changes as long as the user hasn't picked manually.
  function reapplyIfAuto() {
    if (stored() === null) apply(isDark());
  }
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', reapplyIfAuto);
    else if (mq.addListener) mq.addListener(reapplyIfAuto);
  }
  setInterval(reapplyIfAuto, 15 * 60 * 1000);
})();
