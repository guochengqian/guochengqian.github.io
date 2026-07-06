/* Floating action bar for blog posts: Like / Email / Comment.
   Likes are counted via the free Abacus counter API (namespace gordonqian-blog),
   with localStorage guarding one like per browser; failures degrade silently. */
(function () {
  var slug = location.pathname.replace(/\/index\.html$/, '/').replace(/^.*\/blog\//, '').replace(/\/$/, '');
  if (!slug) return;
  var COUNTER = 'https://abacus.jasoncameron.dev';
  var NS = 'gordonqian-blog';
  var LIKED_KEY = 'blog_liked_' + slug;

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function liked() {
    try { return localStorage.getItem(LIKED_KEY) === '1'; } catch (e) { return false; }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!document.querySelector('article')) return;

    var bar = el('div', 'action-bar');
    var HEART = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
    var MAIL = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>';
    var CHAT = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';

    var likeBtn = el('button', 'ab-btn ab-like', HEART + '<span>Like</span><span class="ab-count"></span>');
    var emailBtn = el('button', 'ab-btn', MAIL + '<span>Email</span>');
    var commentBtn = el('button', 'ab-btn', CHAT + '<span>Comment</span>');
    bar.appendChild(likeBtn);
    bar.appendChild(el('span', 'ab-sep'));
    bar.appendChild(emailBtn);
    bar.appendChild(el('span', 'ab-sep'));
    bar.appendChild(commentBtn);

    var pop = el('div', 'ab-popover');
    pop.innerHTML = '<form class="subscribe-form">' +
      '<input type="email" name="email" required placeholder="Type your email…">' +
      '<button type="submit">Send</button></form>';
    bar.appendChild(pop);
    document.body.appendChild(bar);

    // --- like ---
    var countEl = likeBtn.querySelector('.ab-count');
    function setCount(n) { countEl.textContent = n > 0 ? String(n) : ''; }
    if (liked()) likeBtn.classList.add('is-liked');
    fetch(COUNTER + '/get/' + NS + '/' + slug)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (d) setCount(d.value); })
      .catch(function () {});
    likeBtn.addEventListener('click', function () {
      if (liked()) { likeBtn.classList.add('ab-pulse'); setTimeout(function(){likeBtn.classList.remove('ab-pulse');}, 400); return; }
      try { localStorage.setItem(LIKED_KEY, '1'); } catch (e) {}
      likeBtn.classList.add('is-liked', 'ab-pulse');
      setTimeout(function(){likeBtn.classList.remove('ab-pulse');}, 400);
      fetch(COUNTER + '/hit/' + NS + '/' + slug)
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) { if (d) setCount(d.value); })
        .catch(function () {});
    });

    // --- email popover ---
    emailBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      pop.classList.toggle('is-open');
      if (pop.classList.contains('is-open')) pop.querySelector('input').focus();
    });
    document.addEventListener('click', function (e) {
      if (!pop.contains(e.target) && e.target !== emailBtn) pop.classList.remove('is-open');
    });
    pop.querySelector('form').addEventListener('submit', function () {
      setTimeout(function () { pop.classList.remove('is-open'); }, 300);
    });

    // --- comment ---
    commentBtn.addEventListener('click', function () {
      var c = document.querySelector('.comments');
      if (c) c.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
