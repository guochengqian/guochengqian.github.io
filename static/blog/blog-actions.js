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

  /* This script may be injected dynamically (by blog-layout.js) after
     DOMContentLoaded has already fired, so run immediately when ready. */
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    if (!document.querySelector('article')) return;

    var bar = el('div', 'action-bar');
    var HEART = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
    var MAIL = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>';
    var CHAT = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';

    var ARROW_L = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>';
    var ARROW_R = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/></svg>';
    var ARROW_U = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>';
    var ARROW_D = '<svg class="ab-hint" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg>';

    var SHARE = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>';

    var likeBtn = el('button', 'ab-btn ab-like', HEART + '<span>Like</span><span class="ab-count"></span>');
    var emailBtn = el('button', 'ab-btn', MAIL + '<span>Email</span>');
    var commentBtn = el('button', 'ab-btn', CHAT + '<span>Comment</span>' + ARROW_D);
    var shareBtn = el('button', 'ab-btn', SHARE + '<span>Share</span>');
    var prevBtn = el('button', 'ab-btn ab-icon', ARROW_L);
    var topBtn = el('button', 'ab-btn ab-icon', ARROW_U);
    var nextBtn = el('button', 'ab-btn ab-icon', ARROW_R);
    likeBtn.title = 'Like';
    emailBtn.title = 'Email this blog';
    commentBtn.title = 'Jump to comments';
    shareBtn.title = 'Share';
    bar.appendChild(likeBtn);
    bar.appendChild(el('span', 'ab-sep'));
    bar.appendChild(emailBtn);
    bar.appendChild(el('span', 'ab-sep'));
    bar.appendChild(commentBtn);
    bar.appendChild(el('span', 'ab-sep'));
    bar.appendChild(shareBtn);
    bar.appendChild(el('span', 'ab-sep'));
    bar.appendChild(prevBtn);
    bar.appendChild(topBtn);
    bar.appendChild(nextBtn);

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

    // --- share menu ---
    var pageUrl = (document.querySelector('meta[property="og:url"]') || {}).content || location.href;
    var h1 = document.querySelector('article h1');
    var pageTitle = (h1 ? h1.textContent : document.title).trim();
    var shareText = pageTitle + ' — Gordon Qian’s Blog';
    var shareMsg = shareText + '\n' + pageUrl;
    function copyShare() {
      if (navigator.clipboard) { navigator.clipboard.writeText(shareMsg).catch(function () {}); return; }
      var ta = document.createElement('textarea');
      ta.value = shareMsg; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      ta.remove();
    }
    var menu = el('div', 'ab-menu');
    function menuLink(label, href) {
      var a = el('a', 'ab-menu-item', label);
      a.href = href; a.target = '_blank'; a.rel = 'noopener';
      menu.appendChild(a);
      return a;
    }
    function menuCopy(label, site) {
      /* No share-intent URL for this platform: copy the message, then open it. */
      var b = el('button', 'ab-menu-item', label);
      b.addEventListener('click', function () {
        copyShare();
        b.textContent = 'Copied — paste to share';
        setTimeout(function () {
          b.innerHTML = label;
          if (site) window.open(site, '_blank', 'noopener');
          menu.classList.remove('is-open');
        }, 600);
      });
      menu.appendChild(b);
      return b;
    }
    var copyItem = el('button', 'ab-menu-item', 'Copy link');
    copyItem.addEventListener('click', function () {
      copyShare();
      copyItem.textContent = 'Copied ✓';
      setTimeout(function () { copyItem.textContent = 'Copy link'; menu.classList.remove('is-open'); }, 900);
    });
    menu.appendChild(copyItem);
    menuLink('Substack Notes', 'https://substack.com/notes?action=compose&message=' + encodeURIComponent(shareMsg));
    menuLink('X / Twitter', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText) + '&url=' + encodeURIComponent(pageUrl));
    menuLink('Facebook', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pageUrl));
    menuLink('LinkedIn', 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(pageUrl));
    menuLink('Email', 'mailto:?subject=' + encodeURIComponent(pageTitle) + '&body=' + encodeURIComponent(shareMsg));
    menuCopy('WeChat 微信', null);
    menuCopy('Rednote 小红书', 'https://www.xiaohongshu.com/');
    menuCopy('Zhihu 知乎', 'https://www.zhihu.com/');
    bar.appendChild(menu);

    function closeMenu() { menu.classList.remove('is-open'); }

    shareBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      pop.classList.remove('is-open');
      if (menu.classList.contains('is-open')) closeMenu();
      else menu.classList.add('is-open');
    });

    // --- email popover ---
    emailBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeMenu();
      pop.classList.toggle('is-open');
      if (pop.classList.contains('is-open')) pop.querySelector('input').focus();
    });
    document.addEventListener('click', function (e) {
      if (!pop.contains(e.target) && e.target !== emailBtn) pop.classList.remove('is-open');
      if (!menu.contains(e.target) && e.target !== shareBtn && !shareBtn.contains(e.target)) closeMenu();
    });

    // --- comment ---
    commentBtn.addEventListener('click', function () {
      var c = document.querySelector('.comments');
      if (c) c.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    /* --- prev / top / next ---
       Prev/next targets are published by blog-layout.js as window.BLOG_NAV
       (it injects this script, so the global is set before we run). */
    var nav = window.BLOG_NAV || {};
    function wireNav(btn, target, fallbackLabel) {
      if (target) {
        btn.title = fallbackLabel + ': ' + target.title;
        btn.setAttribute('aria-label', btn.title);
        btn.addEventListener('click', function () { location.href = target.url; });
      } else {
        btn.disabled = true;
        btn.title = 'No ' + fallbackLabel.toLowerCase();
        btn.setAttribute('aria-label', btn.title);
      }
    }
    wireNav(prevBtn, nav.prev, 'Previous post');
    wireNav(nextBtn, nav.next, 'Next post');
    topBtn.title = 'Back to top';
    topBtn.setAttribute('aria-label', 'Back to top');
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();
