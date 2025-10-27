+++

title = "AToM: Amortized Text-to-Mesh using 2D Diffusion"
date = 2024-02-03T00:00:00
draft = false

# Authors. Comma separated list, e.g. ["Bob Smith", "__**David Jones**__"].
authors = ["__**Guocheng Qian**__", "Junli Cao", "Aliaksandr Siarohin", "Yash Kant", "Chaoyang Wang", "Michael Vasilkovsky", "Hsin-Ying Lee", "Yuwei Fang", "Ivan Skorokhodov", "Peiye Zhuang", "Igor Gilitschenski", "Jian Ren", "Bernard Ghanem", "Kfir Aberman", "Sergey Tulyakov"]
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
publication ="preprint, 2024"
publication_short = "*arXiv'24*"

# Abstract and optional shortened version.
abstract = "We introduce Amortized Text-to-Mesh (AToM), a feed-forward text-to-mesh framework optimized across multiple text prompts simultaneously. In contrast to existing text-to-3D methods that often entail time-consuming per-prompt optimization and commonly output representations other than polygonal meshes, AToM directly generates high-quality textured meshes in less than 1 second in inference with around 10 times reduction in the training cost, and generalizes to unseen prompts. Our key idea is a novel triplane-based text-to-mesh architecture with a two-stage training strategy that ensures stable optimization and scalability. Through extensive experiments on various prompt benchmarks, AToM significantly outperforms state-of-the-art amortized approaches with over 4 times higher accuracy (in DF415 dataset) and more distinguishable and higher-quality 3D outputs. AToM demonstrates strong generalizability, offering finegrained details of 3D content for unseen interpolated prompts, unlike per-prompt solutions. Our code, models, and generated 3D assets are available at https://github.com/snap-research/AToM."
abstract_short = "AToM trains a single text-to-mesh model on many prompts using 2D diffusion without 3D supervision, yileds high-quality textured meshes under a second, and generalizes to unseen prompts."
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
tags = ["Generative Models", "3D"]

# Links (optional).
url_preprint = "https://arxiv.org/abs/2402.00867"
#url_code = "https://github.com/snap-research/AToM"
#url_dataset = ""
url_project = "https://snap-research.github.io/AToM/"
#url_slides = "https://docs.google.com/presentation/d/1L82wWymMnHyYJk3xUKvteEWD5fX0jVRbCbI65Cxxku0/edit?usp=sharing"
#url_video = "https://youtu.be/CHB96wBV4Ts"
#url_poster = ""
#url_source = ""

# Custom links (optional).
# Uncomment line below to enable. For multiple links, use the form [{...}, {...}, {...}].
# url_custom = [{name = "Custom Link", url = "http://example.org"}]
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
  # caption = "123"
  
  # Focal point (optional)
  # Options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
  focal_point = "Center"
  placement = 2
  # preview_only = true

+++
