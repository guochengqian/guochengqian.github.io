+++

title = "CanvasComposer: Personalized Group Photo Generation via a Multi-Reference Canvas"
date = 2026-09-07T00:00:00
draft = false

# Authors. Comma separated list, e.g. ["Bob Smith", "__**David Jones**__"].
authors = [
"__**Gordon Guocheng Qian**__", 
"Ruihang Zhang", 
"Tsai-Shien Chen", 
"Yusuf Dalva", 
"Anujraaj Argo Goyal", 
"Willi Menapace", 
"Ivan Skorokhodov", 
"Meng Dong", 
"Arpit Sahni", 
"Daniil Ostashev", 
"Ju Hu", 
"Mukesh Singhal", 
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
publication_types = ["1"]

# Publication name and optional abbreviated version.
publication ="SIGGRAPH Asia, 2026"
publication_short = "*SIGGRAPH Asia'26*"

# Abstract and optional shortened version.
abstract = "Existing personalized image generators still struggle to preserve multiple reference identities in natural and coherent multi-human generations. To address these limitations, we present CanvasComposer, an interactive framework for personalized group photo generation. Inspired by professional image-editing software, CanvasComposer allows users to place reference subjects on a shared canvas, where each subject keeps its own RGBA cutout of the input. This multi-reference canvas preserves reference content under overlap while providing an intuitive interface for organizing multiple identities; the subjects remain separate elements on the input canvas, and the model outputs a single personalized and harmonized image. To keep this representation efficient, transparent latent pruning retains only tokens from each subject's non-transparent region, and cross-reference training mitigates copy-paste artifacts by learning to harmonize references sampled from different images. Extensive experiments demonstrate that CanvasComposer achieves coherent generation and strong identity preservation compared to state-of-the-art methods in multi-human personalized image generation."
abstract_short = "CanvasComposer enables Photoshop-like personalized group photo generation: users place RGBA cutouts of multiple reference subjects on a shared canvas, and the model outputs a single harmonized image with strong identity preservation."
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
tags = ["Generative Models", "Personalization", "Multi-Human Generation", "Interactive AI"]

# Links (optional).
url_preprint = "https://arxiv.org/abs/2510.20820"
#url_code = ""
#url_dataset = ""
url_project = "https://snap-research.github.io/canvascomposer/"
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
  # caption = "CanvasComposer"
  
  # Focal point (optional)
  # Options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
  focal_point = "Center"
  placement = 2
  # preview_only = true

+++

