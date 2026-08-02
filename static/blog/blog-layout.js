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
      dek: 'My setup for an 8am daily briefing, 10pm summaries, paper writing, blogging, and remote work from my phone.',
      zh: { file: 'cn.html', title: '我如何把 Hermes Agent 用作全天候在线的研究与写作助手',
        date: '2026 年 5 月 18 日', read: '阅读约 7 分钟', tag: 'AI',
        dek: '我的配置：早上 8 点每日简报、晚上 10 点每日与每周总结、论文写作、写博客，以及用手机远程办公。' } },
    { slug: 'elorian-ai',
      title: 'Silicon Valley Has No Secrets. It Has Heretics.',
      date: 'May 24, 2026', read: '14 min read', tag: 'AI', image: 'visual_reasoning_hero.png',
      dek: 'Notes from Andrew Dai’s interview: 14 years inside Google’s AI machine, why he left after Gemini, and Elorian’s bet on visual reasoning.',
      zh: { file: 'cn.html', title: '硅谷没有秘密，只有异端者。',
        date: '2026 年 5 月 24 日', read: '阅读约 14 分钟', tag: 'AI',
        dek: 'Andrew Dai 2026 年 5 月访谈笔记：在 Google AI 机器内部的 14 年、Gemini 之后为何离开，以及 Elorian 对视觉推理的押注。' } },
    { slug: 'agent-for-finance',
      title: 'Agent Stock Skills: +20% in a Month, and Next Week’s AI Watchlist',
      date: 'May 30, 2026', read: '7 min read', tag: 'Markets', image: 'core_basket_returns.png',
      dek: 'When an agent has million-token context and tracks policy, news, and market data faster than any retail investor, it becomes a real research edge.',
      zh: { file: 'cn.html', title: 'Agent 股票技能：一个月 +20%，以及下周的 AI 观察清单',
        date: '2026 年 5 月 30 日', read: '阅读约 7 分钟', tag: '市场',
        dek: '当 agent 拥有百万 token 上下文，能比任何散户更快地追踪政策、新闻和市场数据时，它就成为一种真正的研究优势。' } },
    { slug: 'visual-generation-chatbot-accessory',
      title: 'Visual Generation Models Are Becoming Chatbot Accessories',
      date: 'June 3, 2026', read: '8 min read', tag: 'AI', image: 'preview.png',
      dek: 'Visual generation is moving from standalone apps into chatbots, agents, and multimodal operating systems.',
      zh: { file: 'cn.html', title: '视觉生成模型正在成为 Chatbot 的配件',
        date: '2026 年 6 月 3 日', read: '阅读约 8 分钟', tag: 'AI',
        dek: '为什么视觉生成正在从独立应用走进 chatbot、agent 与多模态模型系统。' } },
    { slug: 'post-training-market',
      title: 'Post-training is demanding 10x pretraining’s Computing',
      date: 'June 10, 2026', read: '7 min read', tag: 'AI', image: 'preview.jpg',
      dek: 'Two years ago pretraining used ~10x more compute than post-training. Six months ago the ratio was closer to 1:1. Now it may flip.',
      zh: { file: 'cn.html', title: '后训练正在消耗 10 倍于预训练的算力',
        date: '2026 年 6 月 10 日', read: '阅读约 7 分钟', tag: 'AI',
        dek: '两年前，预训练消耗的算力约为后训练的 10 倍。半年前，这一比例已接近 1:1。现在，它可能会反转。' } },
    { slug: 'opd',
      title: 'On-Policy Distillation: The Frontier Lab Recipe for Merging Experts',
      date: 'June 15, 2026', read: '9 min read', tag: 'AI', image: 'opd-illustration.png',
      dek: 'OPD is not just a loss function. It is how a thousand-person lab works in parallel on the same intelligence.',
      zh: { file: 'cn.html', title: '同策略蒸馏（On-Policy Distillation）：前沿实验室合并专家模型的配方',
        date: '2026 年 6 月 15 日', read: '阅读约 9 分钟', tag: 'AI',
        dek: 'OPD 不只是一个损失函数。它是一个千人规模的实验室并行打磨同一份智能的工作方式。' } },
    { slug: 'gemini-omni-architecture',
      title: 'How Gemini-Omni Might Work',
      date: 'June 18, 2026', read: '6 min read', tag: 'AI', image: 'transfusion.png',
      dek: 'Three plausible architectures for Google’s latest video model, ranked — and why a Transfusion-style unified transformer is my top guess.',
      zh: { file: 'cn.html', title: 'Gemini-Omni 可能是如何实现的',
        date: '2026 年 6 月 18 日', read: '阅读约 6 分钟', tag: 'AI',
        dek: '对 Google 最新视频模型的三种可能架构按概率排序——以及为什么 Transfusion 式统一 transformer 是我的首选猜测。' } },
    { slug: 'research-labs-shutdown',
      title: 'Big Tech Research in Retreat: The Paper Era Is Ending',
      date: 'June 20, 2026', read: '4 min read', tag: 'AI', image: 'preview.png',
      dek: 'Research labs at the giants are shutting down, merging, and shrinking. This is not one company’s problem — it is the organizational reconstruction that follows AI industrialization.',
      zh: { file: 'cn.html', title: '大厂研究院集体退潮：论文时代正在落幕',
        date: '2026 年 6 月 20 日', read: '阅读约 4 分钟', tag: 'AI',
        dek: '巨头们的研究院正在接连关停、合并、收缩。这是 AI 工业化之后随之而来的组织重构。' } },
    { slug: 'next-scaling-after-model-scaling',
      title: 'What Is the Next Scaling After Model Scaling?',
      date: 'June 22, 2026', read: '9 min read', tag: 'AI', image: 'preview.png',
      dek: 'Context scaling and agent scaling are the next product frontier — and both demand far more memory bandwidth. The HBM shortage is far from over.',
      zh: { file: 'cn.html', title: '模型 Scaling 之后，下一个 Scaling 是什么？',
        date: '2026 年 6 月 22 日', read: '阅读约 9 分钟', tag: 'AI',
        dek: 'Context scaling 与 agent scaling 是下一个产品前沿——两者都需要远超以往的内存带宽。HBM 短缺远未结束。' } },
    { slug: 'stock-inspiration-20260701',
      title: 'Priced In Is Not the Same as Exhausted',
      date: 'July 1, 2026', read: '5 min read', tag: 'Markets', image: 'preview.png',
      dek: 'META’s move reminded me why “it’s already priced in” is often too lazy. Expectation, confirmation, and scale are different stages.',
      zh: { file: 'cn.html', title: '已被定价，不等于利好出尽',
        date: '2026 年 7 月 1 日', read: '阅读约 5 分钟', tag: '市场',
        dek: 'META 今天的走势提醒我，“已经被定价了”这句话往往太偷懒。预期、确认、规模化，是完全不同的阶段。' } },
    { slug: 'claude-hosted-blog',
      title: 'I Build a Commentable Blog for Free with Claude in 20 Mins',
      date: 'July 5, 2026', read: '3 min read', tag: 'AI', image: 'preview.png',
      dek: 'A clean, free blog on GitHub Pages — likes, comments, email, and sharing to X, WeChat, Rednote, and Zhihu — built entirely by talking to an agent.',
      zh: { file: 'cn.html', title: '我用 Claude 20 分钟免费搭了个可评论的博客',
        date: '2026 年 7 月 5 日', read: '阅读约 3 分钟', tag: 'AI',
        dek: '一个部署在 GitHub Pages 上的免费简洁博客，支持点赞、评论、邮件，还能分享到 X、微信、小红书和知乎——全程只靠和 agent 对话搭建。' } },
    { slug: 'squirrel-rime',
      title: '我的 Mac 连我的名字都记不住',
      date: '2026 年 7 月 6 日', read: '阅读约 3 分钟', tag: '工具', image: 'preview.png',
      dek: '苹果自带的中文输入法不会记住你的常用字。Squirrel（Rime）记得住 —— 你的名字、常用词、甚至 emoji。配置也不用自己动手，交给你的 agent 就好。',
      en: { file: 'en.html', title: 'My Mac Couldn’t Type My Name',
        date: 'July 6, 2026', read: '3 min read', tag: 'Tools',
        dek: 'Apple’s built-in Chinese input never learns your words. Squirrel (Rime) remembers your name, your phrases, even your emoji — and an agent can configure all of it for you.' } },
    { slug: 'sync-skills-across-agents',
      title: 'One Git Repo to Sync All My Agents',
      date: 'July 6, 2026', read: '2 min read', tag: 'AI', image: 'preview.png',
      dek: 'Claude, Codex, and Hermes share one set of skills across three machines — and the only commands I run are git pull and git push.',
      zh: { file: 'cn.html', title: '一个 Git 仓库，同步我所有的 Agent',
        date: '2026 年 7 月 6 日', read: '阅读约 2 分钟', tag: 'AI',
        dek: 'Claude、Codex、Hermes 在三台机器上共用同一套 skills —— 我需要敲的命令只有 git pull 和 git push。' } },
    { slug: 'wake-my-gpu-on-demand',
      title: 'A Visual Generation Practitioner’s Three Machines',
      date: 'July 8, 2026', read: '2 min read', tag: 'Tools', image: 'preview.png',
      dek: 'A roaming laptop, a Mac mini running my agents around the clock, and an RTX 5090 that sleeps until something wakes it in 30 seconds.',
      zh: { file: 'cn.html', title: '视觉生成从业者的三台机器',
        date: '2026 年 7 月 8 日', read: '阅读约 2 分钟', tag: 'Tools',
        dek: '到处跑的笔记本、24 小时跑 agent 的 Mac mini，以及一台默认睡着、30 秒就能被叫醒的 5090。' } },
    { slug: 'ai-compute-load-sheet',
      title: '1 Gigawatt Is No Longer the Ceiling — It’s the Cover Charge',
      date: 'July 9, 2026', read: '8 min read', tag: 'AI', image: 'preview.png',
      dek: 'In 2024 no datacenter ran at a gigawatt. In 2026 five switch on, one per hyperscaler. A load sheet of who has how much power, how many chips, and how much Nvidia has actually sold — every number tagged by how far you can trust it.',
      zh: { file: 'cn.html', title: '1GW 不再是天花板，是入场券',
        date: '2026 年 7 月 9 日', read: '阅读约 8 分钟', tag: 'AI',
        dek: '2024 年全世界没有一座数据中心跑到 1 吉瓦，2026 年五座同时上线、各属一家。一份把「谁有多少电、多少卡、Nvidia 卖了多少」放在一起、并逐项标注可信度的算力负载表。' } },
    { slug: 'meta-missing-culture',
      title: 'Meta 什么都有了，唯独缺了文化',
      date: '2026 年 7 月 10 日', read: '阅读约 3 分钟', tag: 'AI', image: 'preview.png',
      dek: 'SemiAnalysis 复盘 Meta 超级智能一周年：数据、算力、人才、全球一半人口的用户，它全有了，唯独缺了最难补的那一样——文化。',
      en: { file: 'en.html', title: 'Meta Has Everything — Except a Culture',
        date: 'July 10, 2026', read: '3 min read', tag: 'AI',
        dek: 'A one-year review of Meta Superintelligence: data, compute, talent, and half the planet’s users — Meta has it all, except the one thing hardest to buy: culture.' } },
    { slug: 'parallelism-from-first-principles',
      title: 'Transformer Parallelism',
      date: 'July 17, 2026', read: '13 min read', tag: 'AI', image: 'preview.png',
      dek: 'What data, tensor, pipeline, context, and expert parallelism actually partition.',
      zh: { file: 'cn.html', title: '大模型训练的并行策略：基础必备知识你都知道吗？',
        date: '2026 年 7 月 17 日', read: '阅读约 7 分钟', tag: 'AI',
        dek: 'FSDP、TP、PP、CP 和 EP 的区别：它们各自切分什么。' } },
    { slug: 'fault-tolerance-at-10k-gpu-training',
      title: 'When 10,000-GPU Training Fails, How Does It Keep Going?',
      date: 'July 18, 2026', read: '6 min read', tag: 'AI Systems', image: 'preview.png',
      dek: 'A visual map of stragglers, hard failures, slow recovery, and silent data corruption — with the response for each.',
      zh: { file: 'cn.html', title: '万卡训练平均三小时就有一次硬件错误，怎么解决的？',
        date: '2026 年 7 月 18 日', read: '阅读约 6 分钟', tag: 'AI Systems',
        dek: '一张图看懂万卡训练的四类问题：慢卡、硬故障、慢恢复、静默算错，以及每一类的处理方法。' } },
    { slug: 'optimizer-evolution-sgd-adamw-lamb-muon',
      title: '从 SGD 到 Muon per head：优化器到底在控制什么？',
      date: '2026 年 7 月 18 日', read: '阅读约 10 分钟', tag: 'AI', image: 'preview.png',
      dek: '从 SGD、Adam、AdamW、LAMB 到 Muon、MuonClip：更新控制粒度如何从全局步长推进到每一个 attention head。' }
  ];

  var ACTIONS_VERSION = '202607081900'; // blog-actions.js cache-buster, managed here only.
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
    if (!isPost) renderList(next);
    paintLangBtn();
  });
  navBox.appendChild(langBtn);

  /* --- list page: render the post list from the manifest ---
     Cards render in the preferred language when the post has a translation
     (`zh`/`en` variant objects carry title/dek/date/read/tag + file). */
  function loc(p, lang) {
    var v = lang === 'zh' ? p.zh : p.en;
    return {
      title: (v && v.title) || p.title,
      dek: (v && v.dek) || p.dek,
      date: (v && v.date) || p.date,
      read: (v && v.read) || p.read,
      tag: (v && v.tag) || p.tag,
      href: p.slug + '/' + ((v && v.file) || '')
    };
  }
  function renderList(lang) {
    var list = document.querySelector('.post-list');
    if (!list) return;
    var zhUI = lang === 'zh';
    list.innerHTML = POSTS.slice().reverse().map(function (p) {
      var L = loc(p, lang);
      return '<li class="post-item">' +
        '<a class="post-thumb" href="' + L.href + '" tabindex="-1" aria-hidden="true"><img src="' + p.slug + '/' + p.image + '" alt=""></a>' +
        '<div class="post-body"><p class="post-meta"><span class="tag">' + esc(L.tag) + '</span> &middot; ' + esc(L.date) + '</p>' +
        '<h2><a href="' + L.href + '">' + esc(L.title) + '</a></h2>' +
        '<p class="post-dek">' + esc(L.dek) + '</p>' +
        '<span class="post-read">' + esc(L.read) + '</span> ' +
        '<form class="subscribe-form subscribe-compact" data-title="' + esc(L.title) + '" data-url="' + SITE_URL + L.href + '">' +
          '<input type="email" name="email" required placeholder="' + (zhUI ? '输入你的邮箱…' : 'Type your email…') + '"><button type="submit">' + (zhUI ? '发送到邮箱' : 'Email this blog') + '</button>' +
        '</form></div></li>';
    }).join('\n');
  }
  if (!isPost) renderList(getLang() || 'en');

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
        '<p>Staff Researcher at ByteDance. Writing about GenAI research, agents, and AI markets.</p>' +
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
