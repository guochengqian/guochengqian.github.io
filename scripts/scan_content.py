#!/usr/bin/env python3
"""Scan the three content sources and report per-slug readiness.

    python3 scripts/scan_content.py           # table
    python3 scripts/scan_content.py --json    # JSON to stdout, for feeding Notion

Feeds the "Blog/Post/Video Ready" columns of the Posts database in Notion
(2026 Daily Plan → 博客计划).
"""
import json
import sys
from pathlib import Path

SITE = Path.home() / "Documents/codefiles/guochengqian.github.io/static"
BLOG = SITE / "blog"
POSTS = SITE / "posts"
VIDEO = Path.home() / "Documents/codefiles/gordon-video-posts"

# non-slug entries living alongside slugs
BLOG_SKIP = {"img"}
VIDEO_SKIP = {"_assets", "_brand", "_voice"}


def is_dir(p):
    return p.is_dir() and not p.name.startswith(".")


blog_slugs = {d.name for d in BLOG.iterdir() if is_dir(d) and d.name not in BLOG_SKIP}
post_slugs = {d.name for d in POSTS.iterdir() if is_dir(d)}
video_slugs = {d.name for d in VIDEO.iterdir() if is_dir(d) and d.name not in VIDEO_SKIP}

rows = []
for slug in sorted(blog_slugs | post_slugs | video_slugs):
    b, p, v = BLOG / slug, POSTS / slug, VIDEO / slug

    blog_en = (b / "index.html").is_file()
    blog_cn = (b / "cn.html").is_file()

    post_files = []
    if p.is_dir():
        post_files = [f.name for f in p.iterdir() if f.is_file()]
    has_tweet = any(f in ("tweet.txt", "tweet.md") or f.endswith("_twitter.md") for f in post_files)
    has_xhs = any(f == "xhs.html" or f.endswith("_cn.md") for f in post_files)
    has_img = any(f.lower().endswith((".jpg", ".jpeg", ".png")) for f in post_files)

    # rendered master lives in <slug>/results/*.mp4 ; renders/ is the silent intermediate
    results = v / "results"
    finals = sorted(results.glob("*.mp4")) if results.is_dir() else []
    silent = (v / "renders").is_dir() and any((v / "renders").glob("*.mp4"))

    rows.append({
        "slug": slug,
        "blog": "EN+CN" if blog_en and blog_cn else "EN" if blog_en else "CN" if blog_cn else "",
        "post": "".join(["T" if has_tweet else "", "X" if has_xhs else "", "I" if has_img else ""]),
        "video": "final" if finals else "silent" if silent else "scaffold" if v.is_dir() else "",
        "video_files": [f.name for f in finals],
    })

if "--json" in sys.argv:
    print(json.dumps(rows, ensure_ascii=False, indent=1))
    sys.exit()

w = max(len(r["slug"]) for r in rows) + 2
print(f"{'slug':<{w}} {'blog':<7} {'post':<6} {'video'}")
print("-" * (w + 24))
for r in rows:
    print(f"{r['slug']:<{w}} {r['blog'] or '·':<7} {r['post'] or '·':<6} {r['video'] or '·'}")

print(f"\n共 {len(rows)} 个 slug")
print(f"blog ready: {sum(1 for r in rows if r['blog'])}   "
      f"post ready: {sum(1 for r in rows if r['post'])}   "
      f"video final: {sum(1 for r in rows if r['video'] == 'final')}")
print("\npost 图例: T=推文 X=中文/小红书 I=配图")
