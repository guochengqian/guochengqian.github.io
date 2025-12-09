+++

title = "LayerComposer: Multi-Human Personalized Generation via Layered Canvas"
date = 2025-10-25T00:00:00
draft = false

# Authors. Comma separated list, e.g. ["Bob Smith", "__**David Jones**__"].
authors = [
"__**Guocheng Gordon Qian**__", 
"Ruihang Zhang", 
"Tsai-Shien Chen", 
"Yusuf Dalva", 
"Anujraaj Goyal", 
"Willi Menapace", 
"Ivan Skorokhodov", 
"Daniil Ostashev", 
"Meng Dong", 
"Arpit Sahni", 
"Ju Hu", 
"Sergey Tulyakov", 
"Kuan-Chieh Jackson Wang", 
]

# Publication type.
# Legend:
# 0 = Uncategorized
# 1 = Conference paper
# 2 = Journal article
# 3 = Manuscript
# 4 = Report
# 5 = Book
# 6 = Book section
publication_types = ["3"]

# Publication name and optional abbreviated version.
publication ="arXiv preprint, 2025"
publication_short = "*arXiv'25*"

# Abstract and optional shortened version.
abstract = "Despite their impressive visual fidelity, existing personalized generative models lack interactive control over spatial composition and scale poorly to multiple subjects. To address these limitations, we present LayerComposer, an interactive framework for personalized, multi-subject text-to-image generation. Our approach introduces two main contributions: (1) a layered canvas, a novel representation in which each subject is placed on a distinct layer, enabling occlusion-free composition; and (2) a locking mechanism that preserves selected layers with high fidelity while allowing the remaining layers to adapt flexibly to the surrounding context. Similar to professional image-editing software, the layered canvas allows users to place, resize, or lock input subjects through intuitive layer manipulation. Our versatile locking mechanism requires no architectural changes, relying instead on inherent positional embeddings combined with a complementary data sampling strategy. Extensive experiments demonstrate that LayerComposer achieves superior spatial control and identity preservation compared to the state-of-the-art methods in human-centric personalized image generation."
abstract_short = "LayerComposer enables Photoshop-like control for multi-subject text-to-image generation, allowing users to naturally compose scenes by intuitively placing, resizing, and locking elements in a layered canvas with high fidelity."
# Is this a selected publication? (true/false)
selected = true
# Is this a featured publication? (true/false)
featured = true

# Projects (optional).
# Associate this publication with one or more of your projects.
# Simply enter your project's folder or file name without extension.
# E.g. projects = ["deep-learning"] references
# content/project/deep-learning/index.md.
# Otherwise, set projects = [].
projects = []

# Slides (optional).
# Associate this publication with Markdown slides.
# Simply enter your slide deck's filename without extension.
# E.g. slides = "example-slides" references
# content/slides/example-slides.md.
# Otherwise, set slides = "".
slides = ""

# Tags (optional).
# Set tags = [] for no tags, or use the form tags = ["A Tag", "Another Tag"] for one or more tags.
tags = ["Generative Models", "Personalization", "Interactive AI"]

# Links (optional).
url_preprint = "https://arxiv.org/abs/2510.20820"
#url_code = ""
#url_dataset = ""
url_project = "https://snap-research.github.io/layercomposer/"
#url_slides = ""
url_video = "https://www.youtube.com/watch?v=veBk9Ur3Fe4"
#url_poster = ""
#url_source = ""

# Custom links (optional).
# Uncomment line below to enable. For multiple links, use the form [{...}, {...}, {...}].
# url_custom = [{name = "Custom Link", url = "http://example.org"}]
[[links]]
  name = "Media · 新智元"
  url  = "https://mp.weixin.qq.com/s/r4sNRsMipn2fZ0a0pFWMGw"
  icon = "aiera.png"
  icon_pack = "img"

# Digital Object Identifier (DOI)
doi = ""

# Does this page contain LaTeX math? (true/false)
math = true

# To use, place an image named `featured.jpg/png` in your page's folder.
# Placement options: 1 = Full column width, 2 = Out-set, 3 = Screen-width
# Focal point options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
# Set `preview_only` to `true` to just use the image for thumbnails.

[image]  
  # Caption (optional)
  # caption = "LayerComposer"
  
  # Focal point (optional)
  # Options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
  focal_point = "Center"
  placement = 2
  # preview_only = true

+++

