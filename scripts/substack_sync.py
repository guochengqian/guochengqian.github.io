#!/usr/bin/env python3
"""Sync blog posts from static/blog/ to Substack as drafts (never publishes)."""
import os, re, json, base64, pathlib, sys, mimetypes, urllib.request, urllib.error
from html.parser import HTMLParser
from PIL import Image

BLOG = pathlib.Path('/Users/gqian/Documents/codefiles/guochengqian.github.io/static/blog')
# Substack-only artifacts (rasterized SVGs, pre-rendered chart/table PNGs,
# upload cache) — derived files the website itself never references.
SCRATCH = pathlib.Path(__file__).parent / 'substack-cache'
SCRATCH.mkdir(exist_ok=True)
SITE = 'https://guochengqian.github.io/blog'
PUB = 'https://gordonqian.substack.com'
USER_ID = 400777877
SID = os.environ.get('SUBSTACK_SID', '')
CACHE_FILE = SCRATCH / 'upload-cache.json'

# figures that must be replaced by pre-rendered PNGs (JS canvas / HTML table)
SPECIAL = {
    ('next-scaling-after-model-scaling', 'canvas'): SCRATCH / 'chart-tokens.png',
    ('agent-for-finance', 'table'): SCRATCH / 'table-returns.png',
}

CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

def rasterize_svg(fspath):
    """Substack rejects SVG uploads; render to PNG at the SVG's intrinsic size."""
    out = SCRATCH / (pathlib.Path(fspath).stem + '.svg.png')
    if out.exists():
        return out
    svg = pathlib.Path(fspath).read_text()
    m = re.search(r'viewBox="[\d.\s-]*?([\d.]+)\s+([\d.]+)"', svg)
    w, h = (int(float(m.group(1))), int(float(m.group(2)))) if m else (1200, 800)
    import subprocess
    subprocess.run([CHROME, '--headless', '--disable-gpu', f'--window-size={w},{h}',
                    f'--screenshot={out}', f'file://{fspath}'],
                   check=True, capture_output=True)
    return out

# ---------- tiny DOM ----------
VOID = {'img', 'br', 'hr', 'meta', 'link', 'input', 'source'}

class Node:
    def __init__(self, tag, attrs=None):
        self.tag = tag
        self.attrs = dict(attrs or {})
        self.children = []
    def cls(self):
        return (self.attrs.get('class') or '').split()
    def text(self):
        out = []
        for c in self.children:
            out.append(c if isinstance(c, str) else c.text())
        return ''.join(out)
    def find_all(self, tag):
        res = []
        for c in self.children:
            if isinstance(c, Node):
                if c.tag == tag:
                    res.append(c)
                res += c.find_all(tag)
        return res

class TreeBuilder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node('root')
        self.stack = [self.root]
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs)
        self.stack[-1].children.append(n)
        if tag not in VOID:
            self.stack.append(n)
    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                break
    def handle_data(self, data):
        if data:
            self.stack[-1].children.append(data)

def parse(html):
    tb = TreeBuilder()
    tb.feed(html)
    return tb.root

# ---------- inline conversion ----------
def resolve(href, slug):
    if not href or href.startswith(('http://', 'https://', 'mailto:', '#')):
        return href
    if href.startswith('/'):
        return 'https://guochengqian.github.io' + href
    return f'{SITE}/{slug}/{href}'.replace('/./', '/')

def inline_nodes(node, slug, marks=None):
    marks = marks or []
    out = []
    for c in node.children:
        if isinstance(c, str):
            t = re.sub(r'\s+', ' ', c)
            if t.strip('​') and t != ' ' or (t == ' ' and out):
                n = {'type': 'text', 'text': t}
                if marks:
                    n['marks'] = [dict(m) for m in marks]
                out.append(n)
        elif c.tag in ('strong', 'b'):
            out += inline_nodes(c, slug, marks + [{'type': 'strong'}])
        elif c.tag in ('em', 'i'):
            out += inline_nodes(c, slug, marks + [{'type': 'em'}])
        elif c.tag == 'code':
            out += inline_nodes(c, slug, marks + [{'type': 'code'}])
        elif c.tag == 'a':
            href = resolve(c.attrs.get('href', ''), slug)
            out += inline_nodes(c, slug, marks + [{'type': 'link', 'attrs': {'href': href}}])
        elif c.tag == 'br':
            out.append({'type': 'text', 'text': ' '})
        elif c.tag == 'span':
            out += inline_nodes(c, slug, marks)
        elif c.tag == 'img':
            pass  # handled at block level
        else:
            out += inline_nodes(c, slug, marks)
    # trim leading/trailing whitespace-only fragments
    while out and not out[0]['text'].strip():
        out.pop(0)
    while out and not out[-1]['text'].strip():
        out.pop()
    if out:
        out[0]['text'] = out[0]['text'].lstrip()
        out[-1]['text'] = out[-1]['text'].rstrip()
    return [n for n in out if n['text']]

# ---------- image upload ----------
def api(path, payload=None, method=None):
    req = urllib.request.Request(
        PUB + path,
        data=json.dumps(payload).encode() if payload is not None else None,
        headers={
            'Cookie': f'substack.sid={SID}',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            'Content-Type': 'application/json',
            'Referer': PUB + '/publish/post',
            'Origin': PUB,
        },
        method=method or ('POST' if payload is not None else 'GET'))
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read().decode())

def upload_image(fspath):
    cache = json.loads(CACHE_FILE.read_text()) if CACHE_FILE.exists() else {}
    key = str(fspath)
    if key in cache:
        return cache[key]
    mime = mimetypes.guess_type(str(fspath))[0] or 'image/png'
    data = base64.b64encode(pathlib.Path(fspath).read_bytes()).decode()
    res = api('/api/v1/image', {'image': f'data:{mime};base64,{data}'})
    url = res['url']
    cache[key] = url
    CACHE_FILE.write_text(json.dumps(cache, indent=1))
    return url

def image_block(fspath, caption_inline, dry):
    w, h = Image.open(fspath).size
    url = f'local:{fspath}' if dry else upload_image(fspath)
    img = {'type': 'image2', 'attrs': {
        'src': url, 'fullscreen': False, 'imageSize': 'normal', 'height': h, 'width': w,
        'resizeWidth': None, 'bytes': None, 'alt': None, 'title': None, 'type': None,
        'href': None, 'belowTheFold': False, 'internalRedirect': None}}
    block = {'type': 'captionedImage', 'content': [img]}
    if caption_inline:
        block['content'].append({'type': 'caption', 'content': caption_inline})
    return block

# ---------- block conversion ----------
SKIP_CLASSES = {'byline', 'author-card', 'comments', 'chips', 'email-post-end', 'email-post-btn',
                'subscribe-form', 'subscribe-box', 'lang-row'}

def convert_blocks(parent, slug, dry, warnings):
    blocks = []
    for c in parent.children:
        if isinstance(c, str):
            if c.strip():
                blocks.append({'type': 'paragraph', 'content': [{'type': 'text', 'text': c.strip()}]})
            continue
        cls = set(c.cls())
        if c.tag in ('script', 'style') or cls & SKIP_CLASSES:
            continue
        if c.tag == 'p':
            if 'article-tag' in cls or 'subtitle' in cls:
                continue
            imgs = c.find_all('img')
            if imgs:
                for im in imgs:
                    src = (BLOG / slug / im.attrs.get('src', '')).resolve()
                    blocks.append(image_block(src, None, dry))
                continue
            marks = [{'type': 'em'}] if cls & {'chart-note', 'disclaimer', 'note-fine'} else []
            content = inline_nodes(c, slug, marks)
            if content:
                blocks.append({'type': 'paragraph', 'content': content})
        elif c.tag in ('h2', 'h3', 'h4'):
            content = inline_nodes(c, slug)
            if content:
                blocks.append({'type': 'heading', 'attrs': {'level': int(c.tag[1])}, 'content': content})
        elif c.tag == 'hr':
            blocks.append({'type': 'horizontal_rule'})
        elif c.tag in ('ul', 'ol'):
            blocks.append(convert_list(c, slug, dry, warnings))
        elif c.tag == 'blockquote':
            inner = convert_blocks(c, slug, dry, warnings)
            blocks.append({'type': 'blockquote', 'content': inner or [{'type': 'paragraph'}]})
        elif c.tag == 'pre':
            blocks.append({'type': 'code_block', 'attrs': {'language': None},
                           'content': [{'type': 'text', 'text': c.text().strip('\n')}]})
        elif c.tag == 'figure':
            blocks.append(convert_figure(c, slug, dry, warnings))
        elif c.tag == 'div':
            if 'table-wrap' in cls:
                png = SPECIAL.get((slug, 'table'))
                if png:
                    blocks.append(image_block(png, None, dry))
                else:
                    warnings.append(f'{slug}: table dropped')
            else:
                blocks += convert_blocks(c, slug, dry, warnings)
        elif c.tag == 'section':
            blocks += convert_blocks(c, slug, dry, warnings)
        elif c.tag in ('h1',):
            continue
        else:
            warnings.append(f'{slug}: unhandled <{c.tag} class={cls}>')
    return blocks

def convert_list(node, slug, dry, warnings):
    typ = 'bullet_list' if node.tag == 'ul' else 'ordered_list'
    items = []
    for li in node.children:
        if not isinstance(li, Node) or li.tag != 'li':
            continue
        content = []
        inline_acc = Node('tmp')
        for ch in li.children:
            if isinstance(ch, Node) and ch.tag in ('ul', 'ol', 'p', 'blockquote', 'pre', 'figure'):
                inl = inline_nodes(inline_acc, slug)
                if inl:
                    content.append({'type': 'paragraph', 'content': inl})
                inline_acc = Node('tmp')
                if ch.tag in ('ul', 'ol'):
                    content.append(convert_list(ch, slug, dry, warnings))
                else:
                    wrap = Node('wrap')
                    wrap.children = [ch]
                    content += convert_blocks(wrap, slug, dry, warnings)
            else:
                inline_acc.children.append(ch)
        inl = inline_nodes(inline_acc, slug)
        if inl:
            content.append({'type': 'paragraph', 'content': inl})
        if not content:
            content = [{'type': 'paragraph'}]
        items.append({'type': 'list_item', 'content': content})
    out = {'type': typ, 'content': items}
    if typ == 'ordered_list':
        out['attrs'] = {'start': int(node.attrs.get('start', 1)), 'order': int(node.attrs.get('start', 1))}
    return out

def convert_figure(fig, slug, dry, warnings):
    if fig.find_all('canvas'):
        png = SPECIAL.get((slug, 'canvas'))
        return image_block(png, None, dry)  # legend/caption baked into render
    imgs = fig.find_all('img')
    capnodes = [c for c in fig.children if isinstance(c, Node) and c.tag == 'figcaption']
    caption = inline_nodes(capnodes[0], slug) if capnodes else None
    if imgs:
        src = imgs[0].attrs.get('src', '')
        fspath = (BLOG / slug / src).resolve()
        if src.endswith('.svg'):
            fspath = rasterize_svg(fspath)
        return image_block(fspath, caption, dry)
    return {'type': 'paragraph'}

# ---------- per post ----------
# Substack subscribe widget, inserted after the intro paragraph and again at
# the end of every post (matches the placement Gordon uses in the editor).
# Keeping this in the sync keeps `update` mode from wiping manually-added ones.
SUBSCRIBE_WIDGET = {
    'type': 'subscribeWidget',
    'attrs': {'url': '%%checkout_url%%', 'text': 'Subscribe', 'language': 'en'},
    'content': [{'type': 'ctaCaption', 'content': [{'type': 'text', 'text':
        'Thanks for reading! Subscribe for free to receive new posts and support my work.'}]}],
}

def insert_subscribe_widgets(blocks):
    import copy
    for i, b in enumerate(blocks):
        if b['type'] == 'paragraph' and any(n.get('text', '').strip() for n in b.get('content', [])):
            blocks.insert(i + 1, copy.deepcopy(SUBSCRIBE_WIDGET))
            break
    blocks.append(copy.deepcopy(SUBSCRIBE_WIDGET))

def build_post(slug, dry=True):
    html = (BLOG / slug / 'index.html').read_text()
    root = parse(html)
    art = root.find_all('article')[0]
    title = art.find_all('h1')[0].text().strip()
    subtitle = next((c.text().strip() for c in art.children
                     if isinstance(c, Node) and c.tag == 'p' and 'subtitle' in c.cls()), '')
    if len(subtitle) > 280:  # Substack rejects long subtitles
        first = re.split(r'(?<=[.!?])\s+', subtitle)[0]
        subtitle = first if len(first) <= 280 else first[:277] + '…'
    byline = next((n for n in art.find_all('div') if 'byline-sub' in n.cls()), None)
    date = byline.text().split('·')[0].strip() if byline else ''
    warnings = []
    blocks = convert_blocks(art, slug, dry, warnings)
    insert_subscribe_widgets(blocks)
    blocks.append({'type': 'horizontal_rule'})
    blocks.append({'type': 'paragraph', 'content': [
        {'type': 'text', 'text': 'Originally published on '},
        {'type': 'text', 'text': 'my blog', 'marks': [{'type': 'link', 'attrs': {'href': f'{SITE}/{slug}/'}}]},
        {'type': 'text', 'text': f' on {date}.' if date else '.'},
    ]})
    doc = {'type': 'doc', 'attrs': {'schemaVersion': 'v1'}, 'content': blocks}
    return {'title': title, 'subtitle': subtitle, 'date': date, 'doc': doc, 'warnings': warnings}

def draft_payload(post, slug, dry=False):
    payload = {
        'draft_title': post['title'],
        'draft_subtitle': post['subtitle'],
        'draft_body': json.dumps(post['doc']),
        'draft_bylines': [{'id': USER_ID, 'is_guest': False}],
        'audience': 'everyone',
        'type': 'newsletter',
        'draft_section_id': None,
        'section_chosen': False,
    }
    # a preview.* file next to the post becomes the Substack cover image
    for ext in ('jpg', 'jpeg', 'png'):
        p = BLOG / slug / f'preview.{ext}'
        if p.exists():
            payload['cover_image'] = f'local:{p}' if dry else upload_image(p)
            break
    return payload

def create_draft(post, slug):
    return api('/api/v1/drafts', draft_payload(post, slug))

def update_draft(post, slug):
    return api(f'/api/v1/drafts/{DRAFT_IDS[slug]}', draft_payload(post, slug), method='PUT')

# slug -> existing Substack post id. Most are from the 2026-07-05 initial
# sync; opd and post-training-market point at the posts Gordon published
# manually in May 2026 (the synced duplicates were deleted).
DRAFT_IDS = {
    'opd': 199884675, 'hermes-agent': 205424199, 'elorian-ai': 205424207,
    'post-training-market': 199263879, 'gemini-omni-architecture': 205424225,
    'research-labs-shutdown': 205424228, 'stock-inspiration-20260701': 205424233,
    'agent-for-finance': 205424275, 'visual-generation-chatbot-accessory': 205424278,
    'next-scaling-after-model-scaling': 205424280, 'claude-hosted-blog': 205711895,
    'squirrel-rime': 205713056, 'sync-skills-across-agents': 205717419,
}

SLUGS = ['hermes-agent', 'elorian-ai', 'agent-for-finance', 'visual-generation-chatbot-accessory',
         'post-training-market', 'opd', 'gemini-omni-architecture', 'research-labs-shutdown',
         'next-scaling-after-model-scaling', 'stock-inspiration-20260701', 'claude-hosted-blog',
         'squirrel-rime', 'sync-skills-across-agents']  # oldest -> newest

if __name__ == '__main__':
    mode = sys.argv[1] if len(sys.argv) > 1 else 'dry'  # dry | push | update
    targets = sys.argv[2:] or SLUGS
    for slug in targets:
        post = build_post(slug, dry=(mode == 'dry'))
        n_img = str(post['doc']).count('captionedImage')
        print(f"== {slug}\n   title: {post['title']}\n   subtitle: {post['subtitle'][:70]}...\n   date: {post['date']} | blocks: {len(post['doc']['content'])} | images: {n_img}")
        for w in post['warnings']:
            print('   WARN:', w)
        try:
            if mode == 'push':
                res = create_draft(post, slug)
                print(f"   -> created draft {res.get('id')} : {PUB}/publish/post/{res.get('id')}")
            elif mode == 'update':
                res = update_draft(post, slug)
                print(f"   -> updated draft {res.get('id')} : {PUB}/publish/post/{res.get('id')}")
        except urllib.error.HTTPError as e:
            print('   ERROR', e.code, e.read().decode()[:300])
