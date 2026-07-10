/* Load-sheet charts — pure SVG, theme-aware via CSS vars, bilingual by <html lang>.
   Colors are read from CSS custom properties defined in each post's <style>, so a
   dark-mode toggle (html.dark) reflows every fill with no redraw. */
(function () {
  "use strict";

  var ZH = (document.documentElement.lang || "").toLowerCase().indexOf("zh") === 0;
  var NS = "http://www.w3.org/2000/svg";
  function el(n, a) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); return e; }
  function t(zh, en) { return ZH ? zh : en; }

  /* shared tooltip */
  var tip = document.createElement("div");
  tip.className = "ls-tip";
  document.body.appendChild(tip);
  function showTip(html, ev) {
    tip.innerHTML = html; tip.classList.add("on");
    var r = tip.getBoundingClientRect();
    var x = ev.clientX + 14, y = ev.clientY - r.height - 10;
    if (x + r.width > window.innerWidth - 8) x = ev.clientX - r.width - 14;
    if (y < 8) y = ev.clientY + 20;
    tip.style.left = x + "px"; tip.style.top = y + "px";
  }
  function hideTip() { tip.classList.remove("on"); }
  window.addEventListener("scroll", hideTip, { passive: true });

  function hatch(svg, id, cssVar) {
    var defs = el("defs", {});
    var p = el("pattern", { id: id, width: 6, height: 6, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" });
    p.appendChild(el("rect", { width: 6, height: 6, fill: cssVar, "fill-opacity": ".18" }));
    p.appendChild(el("rect", { width: 2.4, height: 6, fill: cssVar }));
    defs.appendChild(p); svg.appendChild(defs);
  }
  function attachTip(node, html) {
    node.addEventListener("mousemove", function (e) { showTip(html, e); });
    node.addEventListener("mouseleave", hideTip);
    node.addEventListener("focus", function () {
      var r = node.getBoundingClientRect();
      showTip(html, { clientX: r.left + r.width / 2, clientY: r.top + 20 });
    });
    node.addEventListener("blur", hideTip);
  }
  var LIVE = "var(--c-live)", PLAN = "var(--c-plan)", BOOK = "var(--c-book)";
  var GRID = "var(--c-grid)", AXIS = "var(--c-axis)", TXT = "var(--c-txt)";

  /* ============================ DATA ============================ */
  var TIMELINE = [
    { m: t("1月", "Jan"), name: "New Carlisle", org: "Amazon / Anthropic" },
    { m: t("2月", "Feb"), name: "Colossus 2", org: "xAI" },
    { m: t("3月", "Mar"), name: "Fayetteville", org: "Microsoft" },
    { m: t("5月", "May"), name: "Prometheus", org: "Meta" },
    { m: t("7月", "Jul"), name: "Stargate Abilene", org: "OpenAI / Oracle" }
  ];

  var SITES = [
    { name: "Meta Hyperion", loc: t("路易斯安那", "Louisiana"), live: 1.5, plan: 5.0, planEst: false, liveEst: false, note: t("三栋 400MW 单体，世界最大单体建筑", "Three 400MW halls, the largest buildings on Earth") },
    { name: "Meta Prometheus", loc: t("俄亥俄", "Ohio"), live: 1.0, plan: 3.0, planEst: true, liveEst: false, note: t("6 园区 27 个数据中心，已扩至 3GW+", "6 campuses, 27 datacenters; already past 3GW+") },
    { name: "xAI Colossus 2", loc: t("孟菲斯", "Memphis"), live: 1.0, plan: 2.0, planEst: false, liveEst: false, note: t("55.5 万张 GPU，$180 亿", "555k GPUs, $18B") },
    { name: "AWS New Carlisle", loc: t("印第安纳", "Indiana"), live: 0.8, plan: 2.2, planEst: true, liveEst: true, note: t("Project Rainier，供 Anthropic 使用", "Project Rainier, for Anthropic") },
    { name: "Google The Dalles", loc: t("俄勒冈", "Oregon"), live: 0, plan: 1.2, planEst: true, liveEst: false, note: t("400 万平方英尺，主要跑 TPU", "4M sq ft, mostly TPUs") },
    { name: "OpenAI Abilene", loc: t("德州", "Texas"), live: 0.3, plan: 1.2, planEst: false, liveEst: true, note: t("8 栋楼约 4 栋在跑，工期延误", "~4 of 8 halls live; behind schedule") },
    { name: "MSFT Fayetteville", loc: t("北卡", "N. Carolina"), live: 1.0, plan: 0, planEst: false, liveEst: true, note: t("2026 年 3 月跨过 1GW", "crossed 1GW in Mar 2026") }
  ];

  var PLAYERS = [
    { co: "Google", accLo: 250, accHi: 450, pwLo: 3.0, pwHi: 6.0, goal: t("未披露", "undisclosed"), pill: t("预估值", "estimate"),
      note: t("绝大部分是自研 TPU，不是 Nvidia 卡。锚点：Epoch AI 2024-10 估 >100 万 H100e；2026 年 TPU 出货预测约 430 万颗（含对外销售）。TPU 每当量能效优于 Nvidia，故功率取区间下沿。",
              "Mostly its own TPUs, not Nvidia cards. Anchor: Epoch AI (Oct 2024) &gt;1M H100e; 2026 TPU shipments forecast ~4.3M (incl. external sales). TPUs are more efficient per equivalent, so power takes the low end of the range.") },
    { co: "Meta", accLo: 220, accHi: 300, pwLo: 3.0, pwHi: 4.0, goal: t("2026 年底 >10 GW", ">10 GW by end-2026"), pill: t("预估值", "estimate"),
      note: t("物理卡约 180–250 万张（扎克伯格 2025-01 称 2025 年底超 130 万张），按混合代际 ×1.2 折成当量。在线功率＝Prometheus（已扩 3GW+）＋ Hyperion 部分投产。10GW 是年底目标，不是现在插着电的。",
              "~1.8–2.5M physical cards (Zuckerberg, Jan 2025: over 1.3M by end-2025), folded to equivalents at ×1.2 for mixed generations. Online power = Prometheus (past 3GW+) plus part of Hyperion. 10GW is the year-end goal, not what&rsquo;s plugged in now.") },
    { co: "Microsoft", accLo: 200, accHi: 300, pwLo: 3.5, pwHi: 5.0, goal: t("2027 前产能翻倍", "double by 2027"), pill: t("预估值", "estimate"),
      note: t("常被引用的「50 万 H100e」是 Epoch AI 2024-10 的快照，已严重过时。2025 年新建约 2GW，FY26 Q2、Q3 各再加约 1GW，AI 容量同比 +80%。Fairwater（威斯康星）规划 2GW。",
              "The often-quoted &ldquo;500k H100e&rdquo; is an Oct-2024 Epoch AI snapshot, badly outdated. ~2GW built in 2025, ~1GW each in FY26 Q2 and Q3, AI capacity +80% YoY. Fairwater (Wisconsin) planned for 2GW.") },
    { co: "Amazon", accLo: 180, accHi: 260, pwLo: 3.0, pwHi: 4.0, goal: t("2027 年底总功率翻倍", "double power by end-2027"), pill: t("预估值", "estimate"),
      note: t("三代 Trainium 累计约 140 万颗，另有 AWS 对外出租的 Nvidia 机队。Project Rainier 是 AWS 为 Anthropic 专建的集群（近 50 万颗 Trainium2），只是其中一部分。2025 年新增 3.8GW 电力容量。",
              "~1.4M Trainium chips across three generations, plus the Nvidia fleet AWS rents out. Project Rainier is AWS&rsquo;s dedicated cluster for Anthropic (~500k Trainium2), only one part of the whole. Added 3.8GW of power capacity in 2025.") },
    { co: "xAI", accLo: 100, accHi: 130, pwLo: 1.8, pwHi: 2.2, goal: t("2026 年底 200 万张卡", "2M cards by end-2026"), pill: t("报道值", "reported"),
      note: t("Colossus 1+2（孟菲斯）。55.5 万张物理卡（2026-01 报道），含 H100/H200/GB200，按混合代际折成当量。Colossus 1 自 2026 年 5 月起租给 Anthropic。",
              "Colossus 1+2 (Memphis). 555k physical cards (reported Jan 2026), a mix of H100/H200/GB200, folded to equivalents. Colossus 1 leased to Anthropic from May 2026.") },
    { co: "OpenAI / Oracle", accLo: 20, accHi: 40, pwLo: 0.3, pwHi: 0.7, goal: t("Stargate 10 GW", "Stargate 10 GW"), pill: t("预估值", "estimate"),
      note: t("自有算力最少，因为它主要<b>租用</b>微软、Oracle、CoreWeave 的机房，而不是自己持有。Abilene 实跑约 0.3GW（8 栋楼中约 4 栋）。45 万张 GB200 是 Abilene 满配后的规划量，不是已上线量。",
              "The least self-owned compute, because it mostly <b>rents</b> from Microsoft, Oracle and CoreWeave rather than holding its own. Abilene runs ~0.3GW live (~4 of 8 halls). The 450k GB200 figure is Abilene&rsquo;s fully-built plan, not what&rsquo;s online.") }
  ];

  var REV = [
    { y: 2019, v: 2.98, est: false, fy: "FY2020" },
    { y: 2020, v: 6.70, est: false, fy: "FY2021" },
    { y: 2021, v: 10.61, est: false, fy: "FY2022" },
    { y: 2022, v: 15.01, est: false, fy: "FY2023" },
    { y: 2023, v: 47.5, est: false, fy: "FY2024" },
    { y: 2024, v: 115.2, est: false, fy: "FY2025" },
    { y: 2025, v: 193.7, est: false, fy: "FY2026" },
    { y: 2026, v: 340, est: true, fy: t("FY2027 推算", "FY2027 est.") }
  ];

  var UNITS = [
    { y: 2019, v: null }, { y: 2020, v: null }, { y: 2021, v: null },
    { y: 2022, v: 2.64, src: t("Omdia 实测", "Omdia actual"), est: false },
    { y: 2023, v: 3.76, src: t("Omdia 实测", "Omdia actual"), est: false },
    { y: 2024, v: null },
    { y: 2025, v: 6.0, src: t("Jefferies 估算", "Jefferies est."), est: true }
  ];

  var BOOK = [
    { d: "2025-10", label: t("GTC 数据中心口径", "GTC DC guidance"), v: 500, sub: t("Blackwell + Rubin，至 2026 年底", "Blackwell + Rubin, through 2026") },
    { d: "2026-03", label: t("GTC 主题演讲", "GTC keynote"), v: 1000, sub: t("Blackwell + Vera Rubin，至 2027 年底", "Blackwell + Vera Rubin, through 2027") }
  ];

  /* ============================ 1. TIMELINE ============================ */
  (function () {
    var box = document.getElementById("ls-timeline");
    if (!box) return;
    var W = 720, H = 118, padX = 60, y0 = 46;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, role: "img" });
    svg.setAttribute("aria-label", t("2026 年五座 1GW+ 数据中心依次上线的时间线", "Timeline of five 1GW+ datacenters coming online through 2026"));
    svg.appendChild(el("line", { x1: padX, x2: W - padX, y1: y0, y2: y0, stroke: GRID, "stroke-width": 2 }));
    TIMELINE.forEach(function (d, i) {
      var x = padX + (i / (TIMELINE.length - 1)) * (W - 2 * padX);
      var mo = el("text", { x: x, y: y0 - 20, fill: AXIS, "font-size": 11, "text-anchor": "middle", "font-family": "var(--sans)", "letter-spacing": ".04em" });
      mo.textContent = d.m; svg.appendChild(mo);
      svg.appendChild(el("circle", { cx: x, cy: y0, r: 6, fill: LIVE, stroke: "var(--soft)", "stroke-width": 2.5 }));
      var nm = el("text", { x: x, y: y0 + 24, fill: TXT, "font-size": 12, "text-anchor": "middle", "font-weight": 600, "font-family": "var(--sans)" });
      nm.textContent = d.name; svg.appendChild(nm);
      var og = el("text", { x: x, y: y0 + 40, fill: AXIS, "font-size": 10, "text-anchor": "middle", "font-family": "var(--sans)" });
      og.textContent = d.org; svg.appendChild(og);
    });
    box.appendChild(svg);
  })();

  /* ============================ 2. SITE POWER ============================ */
  (function () {
    var box = document.getElementById("ls-sites");
    if (!box) return;
    var W = 720, rowH = 40, padL = 150, padR = 66, padT = 16, padB = 28;
    var H = padT + SITES.length * rowH + padB;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, role: "img" });
    svg.setAttribute("aria-label", t("各大数据中心园区已上线功率与规划功率对比", "Live vs planned power for major datacenter campuses"));
    hatch(svg, "ls-hp", PLAN); hatch(svg, "ls-hl", LIVE);
    var maxV = 5.2, x = function (v) { return padL + (v / maxV) * (W - padL - padR); };
    for (var g = 0; g <= 5; g++) {
      svg.appendChild(el("line", { x1: x(g), x2: x(g), y1: padT - 6, y2: H - padB + 2, stroke: GRID, "stroke-width": 1 }));
      var gl = el("text", { x: x(g), y: H - padB + 16, fill: AXIS, "font-size": 10, "text-anchor": "middle", "font-family": "var(--sans)" });
      gl.textContent = g + (g === 5 ? " GW" : ""); svg.appendChild(gl);
    }
    SITES.forEach(function (d, i) {
      var y = padT + i * rowH, bh = 15, by = y + (rowH - bh) / 2 - 2;
      var nm = el("text", { x: padL - 10, y: by + 6, fill: TXT, "text-anchor": "end", "font-size": 11, "font-weight": 600, "font-family": "var(--sans)" });
      nm.textContent = d.name; svg.appendChild(nm);
      var lc = el("text", { x: padL - 10, y: by + 18, fill: AXIS, "text-anchor": "end", "font-size": 9, "font-family": "var(--sans)" });
      lc.textContent = d.loc; svg.appendChild(lc);
      var planW = Math.max(0, x(d.plan) - padL), liveW = Math.max(0, x(d.live) - padL);
      if (d.plan > 0) svg.appendChild(el("rect", { x: padL, y: by, width: planW, height: bh, rx: 3, fill: d.planEst ? "url(#ls-hp)" : PLAN, "fill-opacity": d.planEst ? 1 : .32 }));
      if (d.live > 0) {
        svg.appendChild(el("rect", { x: padL, y: by - 1, width: liveW + 2, height: bh + 2, rx: 4, fill: "var(--soft)" }));
        svg.appendChild(el("rect", { x: padL, y: by, width: liveW, height: bh, rx: 3, fill: LIVE, "fill-opacity": d.liveEst ? .5 : 1 }));
        if (d.liveEst) svg.appendChild(el("rect", { x: padL, y: by, width: liveW, height: bh, rx: 3, fill: "url(#ls-hl)" }));
      }
      var lbl = el("text", { x: x(Math.max(d.plan, d.live)) + 8, y: by + 12, fill: TXT, "font-size": 11, "font-weight": 600, "font-family": "var(--sans)" });
      lbl.textContent = (d.plan > 0 ? d.plan : d.live).toFixed(1); svg.appendChild(lbl);
      var hit = el("rect", { x: 0, y: y, width: W, height: rowH, fill: "transparent", tabindex: 0, style: "cursor:crosshair" });
      attachTip(hit, "<b>" + d.name + "</b><br>" + t("已上线", "Live") + " " + (d.live > 0 ? d.live.toFixed(1) + " GW" : "—") + (d.liveEst ? t("（估算）", " (est.)") : "") + "<br>" + t("规划", "Planned") + " " + (d.plan > 0 ? d.plan.toFixed(1) + " GW" : "—") + (d.planEst ? t("（估算）", " (est.)") : "") + "<br><span class='ls-tip-note'>" + d.note + "</span>");
      svg.appendChild(hit);
    });
    box.appendChild(svg);
  })();

  /* ============================ 3. PAIRED GPU / POWER ============================ */
  (function () {
    var box = document.getElementById("ls-pair");
    if (!box) return;
    var W = 720, rowH = 40, padT = 50, padB = 34, labelW = 118, gap = 40, valGut = 50;
    var panelW = (W - labelW - gap - valGut * 2) / 2;
    var H = padT + PLAYERS.length * rowH + padB;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, role: "img" });
    svg.setAttribute("aria-label", t("六家公司 GPU 保有量与在线功率的预估区间对比", "Estimated GPU stock and online power ranges for six companies"));
    hatch(svg, "ls-hpair", LIVE);
    var panels = [
      { x0: labelW, max: 500, ticks: [0, 100, 200, 300, 400, 500], unit: t("万", ""), title: t("GPU · H100 当量（万）", "GPUs · H100-equiv (10k)"), lo: function (d) { return d.accLo; }, hi: function (d) { return d.accHi; } },
      { x0: labelW + panelW + valGut + gap, max: 6.5, ticks: [0, 2, 4, 6], unit: "GW", title: t("当前在线功率（GW）", "Online power (GW)"), lo: function (d) { return d.pwLo; }, hi: function (d) { return d.pwHi; } }
    ];
    panels.forEach(function (pn) {
      var x = function (v) { return pn.x0 + (v / pn.max) * panelW; };
      var tt = el("text", { x: pn.x0, y: padT - 28, fill: TXT, "font-size": 10.5, "font-weight": 600, "font-family": "var(--sans)" });
      tt.textContent = pn.title; svg.appendChild(tt);
      pn.ticks.forEach(function (g) {
        svg.appendChild(el("line", { x1: x(g), x2: x(g), y1: padT - 12, y2: H - padB + 2, stroke: GRID, "stroke-width": 1 }));
        var gl = el("text", { x: x(g), y: H - padB + 15, fill: AXIS, "font-size": 9, "text-anchor": "middle", "font-family": "var(--sans)" });
        gl.textContent = g === pn.ticks[pn.ticks.length - 1] ? g + " " + pn.unit : g; svg.appendChild(gl);
      });
      PLAYERS.forEach(function (d, i) {
        var y = padT + i * rowH, bh = 13, by = y + (rowH - bh) / 2 - 1;
        var lo = pn.lo(d), hi = pn.hi(d), mid = (lo + hi) / 2;
        svg.appendChild(el("rect", { x: x(lo), y: by, width: Math.max(2, x(hi) - x(lo)), height: bh, rx: 3, fill: "url(#ls-hpair)" }));
        svg.appendChild(el("rect", { x: x(mid) - 1.25, y: by - 3, width: 2.5, height: bh + 6, rx: 1, fill: LIVE }));
        var vt = el("text", { x: pn.x0 + panelW + 8, y: by + 10, fill: AXIS, "font-size": 9, "text-anchor": "start", "font-family": "var(--sans)" });
        vt.textContent = lo + "–" + hi; svg.appendChild(vt);
      });
    });
    PLAYERS.forEach(function (d, i) {
      var y = padT + i * rowH;
      var nm = el("text", { x: labelW - 12, y: y + rowH / 2 + 2, fill: TXT, "text-anchor": "end", "font-size": 11, "font-weight": 600, "font-family": "var(--sans)" });
      nm.textContent = d.co; svg.appendChild(nm);
      var hit = el("rect", { x: 0, y: y, width: W, height: rowH, fill: "transparent", tabindex: 0, style: "cursor:crosshair" });
      attachTip(hit, "<b>" + d.co + "</b><br>" + t("GPU ", "GPUs ") + d.accLo + "–" + d.accHi + t(" 万 H100e", "0k H100e") + "<br>" + t("在线功率 ", "Online ") + d.pwLo + "–" + d.pwHi + " GW<br><span class='ls-tip-note'>" + t("公开目标：", "Stated goal: ") + d.goal + "</span>");
      svg.appendChild(hit);
    });
    box.appendChild(svg);
  })();

  /* ============================ 3b. PLAYERS TABLE ============================ */
  (function () {
    var tb = document.getElementById("ls-players");
    if (!tb) return;
    PLAYERS.forEach(function (p) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td class="lst-co">' + p.co + '</td>' +
        '<td class="lst-n">' + p.accLo + "–" + p.accHi + '</td>' +
        '<td class="lst-n">' + p.pwLo + "–" + p.pwHi + '</td>' +
        '<td class="lst-goal">' + p.goal + '</td>' +
        '<td class="lst-note">' + p.note + '</td>';
      tb.appendChild(tr);
    });
  })();

  /* ============================ 4a. NVIDIA REVENUE ============================ */
  (function () {
    var box = document.getElementById("ls-rev");
    if (!box) return;
    var W = 720, H = 250, padL = 46, padR = 12, padT = 20, padB = 40;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, role: "img" });
    svg.setAttribute("aria-label", t("Nvidia 数据中心分部收入，2019 至 2026", "Nvidia data-center segment revenue, 2019–2026"));
    hatch(svg, "ls-hrev", LIVE);
    var maxV = 360, y = function (v) { return padT + (1 - v / maxV) * (H - padT - padB); }, bw = (W - padL - padR) / REV.length;
    [0, 100, 200, 300].forEach(function (g) {
      svg.appendChild(el("line", { x1: padL, x2: W - padR, y1: y(g), y2: y(g), stroke: GRID, "stroke-width": 1 }));
      var gl = el("text", { x: padL - 8, y: y(g) + 4, fill: AXIS, "font-size": 9.5, "text-anchor": "end", "font-family": "var(--sans)" });
      gl.textContent = "$" + g + (g === 300 ? "B" : ""); svg.appendChild(gl);
    });
    REV.forEach(function (d, i) {
      var cx = padL + i * bw + bw / 2, w = Math.min(bw - 12, 46), top = y(d.v), h = y(0) - top;
      svg.appendChild(el("rect", { x: cx - w / 2, y: top, width: w, height: h, rx: 3, fill: d.est ? "url(#ls-hrev)" : LIVE }));
      var vt = el("text", { x: cx, y: top - 6, fill: TXT, "font-size": 9.5, "text-anchor": "middle", "font-weight": 600, "font-family": "var(--sans)" });
      vt.textContent = d.v >= 100 ? Math.round(d.v) : d.v.toFixed(1); svg.appendChild(vt);
      var yl = el("text", { x: cx, y: H - padB + 16, fill: AXIS, "font-size": 9.5, "text-anchor": "middle", "font-family": "var(--sans)" });
      yl.textContent = d.y; svg.appendChild(yl);
      if (d.est) { var e2 = el("text", { x: cx, y: H - padB + 28, fill: AXIS, "font-size": 8, "text-anchor": "middle", "font-family": "var(--sans)" }); e2.textContent = t("推算", "est."); svg.appendChild(e2); }
      var hit = el("rect", { x: cx - bw / 2, y: padT, width: bw, height: H - padT - padB, fill: "transparent", tabindex: 0, style: "cursor:crosshair" });
      attachTip(hit, "<b>" + d.y + "</b><br>" + t("数据中心收入 $", "Data-center rev $") + d.v + "B<br><span class='ls-tip-note'>" + d.fy + "</span>");
      svg.appendChild(hit);
    });
    box.appendChild(svg);
  })();

  /* ============================ 4b. NVIDIA UNITS ============================ */
  (function () {
    var box = document.getElementById("ls-units");
    if (!box) return;
    var W = 720, H = 220, padL = 46, padR = 12, padT = 22, padB = 40;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, role: "img" });
    svg.setAttribute("aria-label", t("Nvidia 数据中心 GPU 出货量，仅部分年份有数据", "Nvidia data-center GPU units shipped; only some years have data"));
    hatch(svg, "ls-hu", PLAN);
    var maxV = 7, y = function (v) { return padT + (1 - v / maxV) * (H - padT - padB); }, bw = (W - padL - padR) / UNITS.length;
    [0, 2, 4, 6].forEach(function (g) {
      svg.appendChild(el("line", { x1: padL, x2: W - padR, y1: y(g), y2: y(g), stroke: GRID, "stroke-width": 1 }));
      var gl = el("text", { x: padL - 8, y: y(g) + 4, fill: AXIS, "font-size": 9.5, "text-anchor": "end", "font-family": "var(--sans)" });
      gl.textContent = g === 6 ? t("600万", "6M") : (g ? (ZH ? g * 100 + "万" : g + "M") : "0"); svg.appendChild(gl);
    });
    UNITS.forEach(function (d, i) {
      var cx = padL + i * bw + bw / 2, w = Math.min(bw - 16, 48);
      if (d.v == null) {
        var gh = 40;
        svg.appendChild(el("rect", { x: cx - w / 2, y: y(0) - gh, width: w, height: gh, rx: 3, fill: "none", stroke: AXIS, "stroke-width": 1.1, "stroke-dasharray": "3 3", "stroke-opacity": .5 }));
        var q = el("text", { x: cx, y: y(0) - gh / 2 + 4, fill: AXIS, "font-size": 12, "text-anchor": "middle", "font-weight": 600, "font-family": "var(--sans)" });
        q.textContent = "?"; svg.appendChild(q);
      } else {
        var top = y(d.v), h = y(0) - top;
        svg.appendChild(el("rect", { x: cx - w / 2, y: top, width: w, height: h, rx: 3, fill: d.est ? "url(#ls-hu)" : LIVE }));
        var vt = el("text", { x: cx, y: top - 6, fill: TXT, "font-size": 9.5, "text-anchor": "middle", "font-weight": 600, "font-family": "var(--sans)" });
        vt.textContent = d.v.toFixed(2).replace(/0$/, "") + "M"; svg.appendChild(vt);
      }
      var yl = el("text", { x: cx, y: H - padB + 16, fill: AXIS, "font-size": 9.5, "text-anchor": "middle", "font-family": "var(--sans)" });
      yl.textContent = d.y; svg.appendChild(yl);
      var hit = el("rect", { x: cx - bw / 2, y: padT, width: bw, height: H - padT - padB, fill: "transparent", tabindex: 0, style: "cursor:crosshair" });
      attachTip(hit, d.v == null ? "<b>" + d.y + "</b><br><span class='ls-tip-note'>" + t("无可信公开数据", "no credible public data") + "</span>" : "<b>" + d.y + "</b><br>" + (ZH ? (d.v * 100).toFixed(0) + " 万张" : d.v + "M " + t("张", "units")) + "<br><span class='ls-tip-note'>" + d.src + "</span>");
      svg.appendChild(hit);
    });
    box.appendChild(svg);
  })();

  /* ============================ 5. ORDER BOOK ============================ */
  (function () {
    var box = document.getElementById("ls-book");
    if (!box) return;
    var W = 720, H = 150, padL = 116, padR = 28, padT = 18;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, role: "img" });
    svg.setAttribute("aria-label", t("Nvidia 在手订单从 5000 亿增至 1 万亿美元", "Nvidia order book grows from $500B to $1T"));
    var maxV = 1050, x = function (v) { return padL + (v / maxV) * (W - padL - padR); };
    BOOK.forEach(function (d, i) {
      var y = padT + i * 58, bh = 26;
      var t1 = el("text", { x: padL - 12, y: y + 13, fill: TXT, "text-anchor": "end", "font-size": 11, "font-weight": 600, "font-family": "var(--sans)" });
      t1.textContent = d.d; svg.appendChild(t1);
      var t2 = el("text", { x: padL - 12, y: y + 25, fill: AXIS, "text-anchor": "end", "font-size": 9, "font-family": "var(--sans)" });
      t2.textContent = d.label; svg.appendChild(t2);
      svg.appendChild(el("rect", { x: padL, y: y, width: x(d.v) - padL, height: bh, rx: 3, fill: BOOK, "fill-opacity": i === 0 ? .42 : 1 }));
      var v = el("text", { x: x(d.v) + 9, y: y + 18, fill: TXT, "font-size": 13, "font-weight": 700, "font-family": "var(--sans)" });
      v.textContent = "$" + (d.v >= 1000 ? "1.0T" : d.v + "B"); svg.appendChild(v);
      var s = el("text", { x: padL + 9, y: y + bh + 13, fill: AXIS, "font-size": 9, "font-family": "var(--sans)" });
      s.textContent = d.sub; svg.appendChild(s);
    });
    var a = el("text", { x: padL, y: H - 6, fill: BOOK, "font-size": 10.5, "font-weight": 600, "font-family": "var(--sans)" });
    a.textContent = t("↑ 九个月内翻倍", "↑ doubled in nine months"); svg.appendChild(a);
    box.appendChild(svg);
  })();

})();
