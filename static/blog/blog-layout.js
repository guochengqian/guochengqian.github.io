/* Shared layout for the blog — injects the site header, post-nav
   (previous/next), author card, utterances comments, and footer, so the
   individual post files no longer carry verbatim copies of those blocks.

   SEO-critical tags (<title>, meta description, og:*) stay static in each
   file's <head>; this script only injects chrome that crawlers don't need.

   Loaded with `defer`, so it runs after the DOM is parsed but before
   DOMContentLoaded (and before blog-theme.js's DOMContentLoaded handler
   appends the theme toggle) — normally before first paint, which avoids
   visible injection flicker. */
(function () {
  'use strict';

  /* Central post manifest, oldest first. `image` is the preview used in
     post-nav cards and on the list page; `dek` is the list-page teaser. */
  var POSTS = [
    { slug: 'hermes-agent',
      title: 'How I Use Hermes Agent as My Always-On Research and Writing Assistant',
      date: 'May 18, 2026', read: '7 min read', tag: 'AI', image: 'preview.png',
      dek: 'My setup for an 8am daily briefing, 10pm summaries, paper writing, blogging, and remote work from my phone.' },
    { slug: 'elorian-ai',
      title: 'Silicon Valley Has No Secrets. It Has Heretics.',
      date: 'May 24, 2026', read: '14 min read', tag: 'AI', image: 'visual_reasoning_hero.png',
      dek: 'Notes from Andrew Dai’s interview: 14 years inside Google’s AI machine, why he left after Gemini, and Elorian’s bet on visual reasoning.' },
    { slug: 'agent-for-finance',
      title: 'Agent Stock Skills: +20% in a Month, and Next Week’s AI Watchlist',
      date: 'May 30, 2026', read: '7 min read', tag: 'Markets', image: 'core_basket_returns.png',
      dek: 'When an agent has million-token context and tracks policy, news, and market data faster than any retail investor, it becomes a real research edge.' },
    { slug: 'visual-generation-chatbot-accessory',
      title: 'Visual Generation Models Are Becoming Chatbot Accessories',
      date: 'June 3, 2026', read: '8 min read', tag: 'AI', image: 'preview.png',
      dek: 'Visual generation is moving from standalone apps into chatbots, agents, and multimodal operating systems.' },
    { slug: 'post-training-market',
      title: 'Post-training is demanding 10x pretraining’s Computing',
      date: 'June 10, 2026', read: '7 min read', tag: 'AI', image: 'preview.jpg',
      dek: 'Two years ago pretraining used ~10x more compute than post-training. Six months ago the ratio was closer to 1:1. Now it may flip.' },
    { slug: 'opd',
      title: 'On-Policy Distillation: The Frontier Lab Recipe for Merging Experts',
      date: 'June 15, 2026', read: '9 min read', tag: 'AI', image: 'opd-illustration.png',
      dek: 'OPD is not just a loss function. It is how a thousand-person lab works in parallel on the same intelligence.' },
    { slug: 'gemini-omni-architecture',
      title: 'How Gemini-Omni Might Work',
      date: 'June 18, 2026', read: '6 min read', tag: 'AI', image: 'transfusion.png',
      dek: 'Three plausible architectures for Google’s latest video model, ranked — and why a Transfusion-style unified transformer is my top guess.' },
    { slug: 'research-labs-shutdown',
      title: 'Big Tech Research in Retreat: The Paper Era Is Ending',
      date: 'June 20, 2026', read: '4 min read', tag: 'AI', image: 'preview.png',
      dek: 'Research labs at the giants are shutting down, merging, and shrinking. This is not one company’s problem — it is the organizational reconstruction that follows AI industrialization.' },
    { slug: 'next-scaling-after-model-scaling',
      title: 'What Is the Next Scaling After Model Scaling?',
      date: 'June 22, 2026', read: '9 min read', tag: 'AI', image: 'preview.png',
      dek: 'Context scaling and agent scaling are the next product frontier — and both demand far more memory bandwidth. The HBM shortage is far from over.' },
    { slug: 'stock-inspiration-20260701',
      title: 'Priced In Is Not the Same as Exhausted',
      date: 'July 1, 2026', read: '5 min read', tag: 'Markets', image: 'preview.png',
      dek: 'META’s move reminded me why “it’s already priced in” is often too lazy. Expectation, confirmation, and scale are different stages.' },
    { slug: 'claude-hosted-blog',
      title: 'I Build a Commentable Blog for Free with Claude in 20 Mins',
      date: 'July 5, 2026', read: '3 min read', tag: 'AI', image: 'preview.png',
      dek: 'A clean, free blog on GitHub Pages — likes, comments, email, and sharing to X, WeChat, Rednote, and Zhihu — built entirely by talking to an agent.' },
    { slug: 'squirrel-rime',
      title: '我的 Mac 连我的名字都记不住',
      date: '2026 年 7 月 6 日', read: '阅读约 3 分钟', tag: '工具', image: 'preview.png',
      dek: '苹果自带的中文输入法不会记住你的常用字。Squirrel（Rime）记得住 —— 你的名字、常用词、甚至 emoji。配置也不用自己动手，交给你的 agent 就好。' },
    { slug: 'sync-skills-across-agents',
      title: 'One Git Repo to Sync All My Agents',
      date: 'July 6, 2026', read: '2 min read', tag: 'AI', image: 'preview.png',
      dek: 'Claude, Codex, and Hermes share one set of skills across three machines — and the only commands I run are git pull and git push.' }
  ];

  var ACTIONS_VERSION = '202607060100'; // blog-actions.js cache-buster, managed here only.
  var SITE_URL = 'https://guochengqian.github.io/blog/';

  /* Slug: prefer <body data-blog-slug="...">, else derive from the path
     (same rule as blog-actions.js). Empty string means the list page. */
  var slug = (document.body && document.body.getAttribute('data-blog-slug')) ||
    location.pathname.replace(/index\.html$/, '').replace(/^.*\/blog\//, '').replace(/\/$/, '');
  var isPost = !!slug;
  var prefix = isPost ? '../' : ''; // relative path back to /blog/

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  var page = document.querySelector('.page');
  if (!page) return;
  var article = document.querySelector('article');

  /* --- site header --- */
  var header = el('header', 'site-header',
    '<a class="brand" href="' + (prefix || './') + '"><img src="' + prefix + 'img/avatar.jpg" alt="Gordon Guocheng Qian"> Gordon Guocheng Qian</a>' +
    '<nav class="site-nav">' +
      '<a href="/">About</a>' +
      '<a href="' + (prefix || './') + '">Blog</a>' +
      '<a href="' + prefix + 'rss.xml">RSS</a>' +
    '</nav>');
  page.insertBefore(header, page.firstChild);

  /* --- global language preference (localStorage `blog_lang`: 'en' | 'zh') ---
     Each post page carries a .lang-switch pill pointing at its other-language
     version. The header button sets a site-wide preference; on entering any
     post whose language differs, we hop to the alternate before paint.
     Clicking a per-post pill also records the choice as the preference. */
  function getLang() { try { return localStorage.getItem('blog_lang'); } catch (e) { return null; } }
  function setLang(v) { try { localStorage.setItem('blog_lang', v); } catch (e) {} }
  var langSwitch = document.querySelector('.lang-switch');
  var pageLang = (document.documentElement.getAttribute('lang') || 'en').indexOf('zh') === 0 ? 'zh' : 'en';
  var altLang = langSwitch ?
    (((langSwitch.getAttribute('hreflang') || '').indexOf('zh') === 0) ? 'zh' : 'en') : null;

  var langPref = getLang();
  if (isPost && langSwitch && langPref && langPref !== pageLang && langPref === altLang) {
    location.replace(langSwitch.getAttribute('href'));
    return; // stop building this page; we are navigating away
  }
  if (langSwitch) {
    langSwitch.addEventListener('click', function () { if (altLang) setLang(altLang); });
  }

  var navBox = header.querySelector('.site-nav');
  var langBtn = el('a', 'nav-lang');
  langBtn.href = '#';
  function paintLangBtn() {
    var cur = getLang() || pageLang;
    langBtn.textContent = cur === 'zh' ? 'EN' : '中文';
    langBtn.setAttribute('aria-label', cur === 'zh' ? 'Switch to English' : '切换到中文');
    langBtn.title = cur === 'zh' ? 'Read the blog in English' : '全站切换为中文';
  }
  paintLangBtn();
  langBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var next = (getLang() || pageLang) === 'zh' ? 'en' : 'zh';
    setLang(next);
    if (isPost && langSwitch && altLang === next && pageLang !== next) {
      location.href = langSwitch.getAttribute('href');
      return;
    }
    paintLangBtn();
  });
  navBox.appendChild(langBtn);

  /* --- list page: render the post list from the manifest --- */
  if (!isPost) {
    var list = document.querySelector('.post-list');
    if (list) {
      list.innerHTML = POSTS.slice().reverse().map(function (p) {
        return '<li class="post-item">' +
          '<a class="post-thumb" href="' + p.slug + '/" tabindex="-1" aria-hidden="true"><img src="' + p.slug + '/' + p.image + '" alt=""></a>' +
          '<div class="post-body"><p class="post-meta"><span class="tag">' + esc(p.tag) + '</span> &middot; ' + esc(p.date) + '</p>' +
          '<h2><a href="' + p.slug + '/">' + esc(p.title) + '</a></h2>' +
          '<p class="post-dek">' + esc(p.dek) + '</p>' +
          '<span class="post-read">' + esc(p.read) + '</span> ' +
          '<form class="subscribe-form subscribe-compact" data-title="' + esc(p.title) + '" data-url="' + SITE_URL + p.slug + '/">' +
            '<input type="email" name="email" required placeholder="Type your email…"><button type="submit">Email this blog</button>' +
          '</form></div></li>';
      }).join('\n');
    }
  }

  /* --- post pages: post-nav, author card, comments --- */
  if (isPost && article) {
    var idx = -1;
    for (var i = 0; i < POSTS.length; i++) if (POSTS[i].slug === slug) { idx = i; break; }

    if (idx >= 0) {
      var prev = idx > 0 ? POSTS[idx - 1] : null;
      var next = idx < POSTS.length - 1 ? POSTS[idx + 1] : null;
      /* Hand prev/next to blog-actions.js (injected below) for the
         floating bar's arrow buttons. */
      window.BLOG_NAV = {
        prev: prev ? { url: '../' + prev.slug + '/', title: prev.title } : null,
        next: next ? { url: '../' + next.slug + '/', title: next.title } : null
      };
      function navCard(p, label, arrowBefore) {
        var lbl = arrowBefore ? '&larr; ' + label : label + ' &rarr;';
        return '<a class="post-nav-card" href="../' + p.slug + '/">' +
          '<span class="post-nav-label">' + lbl + '</span>' +
          '<span class="post-nav-title">' + esc(p.title) + '</span>' +
          '<img src="../' + p.slug + '/' + p.image + '" alt="" loading="lazy"></a>';
      }
      if (prev || next) {
        /* Keep a placeholder for a missing side: .post-nav is a two-column
           grid and the CSS targets the "Next" card via :nth-child(2). */
        var nav = el('nav', 'post-nav',
          (prev ? navCard(prev, 'Previous post', true) : '<span class="post-nav-empty"></span>') +
          (next ? navCard(next, 'Next post', false) : '<span class="post-nav-empty"></span>'));
        nav.setAttribute('aria-label', 'More posts');
        article.appendChild(nav);
      }
    }

    article.appendChild(el('div', 'author-card',
      '<img src="../img/avatar.jpg" alt="Gordon Guocheng Qian">' +
      '<div>' +
        '<div class="author-name">Gordon Guocheng Qian</div>' +
        '<p>Senior Research Scientist at Snap Inc. Writing about GenAI research, agents, and AI markets.</p>' +
        '<div class="author-links">' +
          '<a href="/">Homepage</a>' +
          '<a href="https://scholar.google.com/citations?user=DUDaxg4AAAAJ">Google Scholar</a>' +
          '<a href="https://github.com/guochengqian">GitHub</a>' +
          '<a href="https://twitter.com/guocheng_qian">X</a>' +
          '<a href="https://www.linkedin.com/in/guochengqian/">LinkedIn</a>' +
          '<a href="https://www.xiaohongshu.com/user/profile/58894a2982ec39681b4a7842">Rednote 小红书</a>' +
        '</div>' +
      '</div>'));

    /* utterances comments — issue-term derived from the slug; theme follows
       the current dark/light mode and stays in sync with the toggle. */
    var comments = el('section', 'comments', '<h2 class="comments-title">Comments</h2>');
    var utter = document.createElement('script');
    utter.src = 'https://utteranc.es/client.js';
    utter.setAttribute('repo', 'guochengqian/blog-comments');
    utter.setAttribute('issue-term', 'blog/' + slug + '/');
    utter.setAttribute('label', 'blog-comments');
    utter.setAttribute('theme', document.documentElement.classList.contains('dark') ? 'github-dark' : 'github-light');
    utter.setAttribute('crossorigin', 'anonymous');
    utter.async = true;
    comments.appendChild(utter);
    article.appendChild(comments);

    // Keep the utterances iframe in sync when the theme toggle is used.
    if (window.MutationObserver) {
      new MutationObserver(function () {
        var frame = document.querySelector('iframe.utterances-frame');
        if (!frame || !frame.contentWindow) return;
        var theme = document.documentElement.classList.contains('dark') ? 'github-dark' : 'github-light';
        frame.contentWindow.postMessage({ type: 'set-theme', theme: theme }, 'https://utteranc.es');
      }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }

    /* Action bar (like/email/comment) is only needed on posts; load it here
       so its version is managed in one place. */
    if (!document.querySelector('script[src*="blog-actions.js"]')) {
      var actions = document.createElement('script');
      actions.src = '../blog-actions.js?v=' + ACTIONS_VERSION;
      actions.defer = true;
      document.head.appendChild(actions);
    }
  }

  /* --- footer --- */
  var footer = el('footer', 'site-footer',
    '&copy; 2026 Gordon Guocheng Qian &middot; <a href="' + prefix + 'rss.xml">RSS</a> &middot; ' +
    (isPost ? '<a href="../">All posts</a>' : '<a href="/">guochengqian.github.io</a>'));
  page.appendChild(footer);
})();
