+++

title = "Diffusion-DRF: Free, Rich, and Differentiable Reward for Video Diffusion Fine-Tuning"
date = 2026-01-07T00:00:00
draft = false

# Authors. Comma separated list, e.g. ["Bob Smith", "__**David Jones**__"].
authors = [
"Yifan Wang", 
"Yanyu Li", 
"__**Gordon Guocheng Qian**__<sup>†</sup>", 
"Sergey Tulyakov", 
"Yun Fu", 
"Anil Kag",
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
publication ="arXiv preprint, 2026"
publication_short = "*arXiv'26*"

# Abstract and optional shortened version.
abstract = "Video diffusion alignment has been heavily relied on scalar rewards. These rewards are typically derived from learned reward models in human preference datasets, requiring additional training and extensive collection. Moreover, scalar rewards provide coarse, global supervision, offering limited prompt-generation mismatch credit assignment and making models prone to reward exploitation and unstable optimization. We propose Diffusion-DRF, a free, rich, and differentiable reward framework for video diffusion fine-tuning."
abstract_short = "Diffusion-DRF uses a frozen VLM critic to provide free, rich, and differentiable feedback for stable video diffusion fine-tuning."
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
tags = ["Video Diffusion", "Reward Learning", "VLM", "Fine-Tuning"]

# Links (optional).
url_preprint = "https://arxiv.org/abs/2601.04153"
#url_code = ""
#url_dataset = ""
url_project = "https://snap-research.github.io/diffusion-drf/"
#url_slides = ""
#url_video = ""
#url_poster = ""
#url_source = ""

# Custom links (optional).
# Uncomment line below to enable. For multiple links, use the form [{...}, {...}, {...}].
# url_custom = [{name = "Custom Link", url = "http://example.org"}]
# Does this page contain LaTeX math? (true/false)
math = true

# To use, place an image named `featured.jpg/png` in your page's folder.
# Placement options: 1 = Full column width, 2 = Out-set, 3 = Screen-width
# Focal point options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
# Set `preview_only` to `true` to just use the image for thumbnails.

[image]  
  # Caption (optional)
  # caption = "Diffusion-DRF"
  
  # Focal point (optional)
  # Options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
  focal_point = "Center"
  placement = 2
  # preview_only = true

+++
