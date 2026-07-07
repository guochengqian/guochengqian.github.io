+++

title = "Prompt2Effect: Training-Free Image-to-Video Model Specialization via LoRA Generation"
date = 2026-06-11T00:00:00
draft = false

# Authors. Comma separated list, e.g. ["Bob Smith", "__**David Jones**__"].
authors = [
"Xiaomeng Yang",
"Yanyu Li",
"__**Gordon Guocheng Qian**__",
"Ivan Skorokhodov",
"Viacheslav Ivanov",
"Avalon Vinella",
"Xuan Zhang",
"Yanzhi Wang",
"Sergey Tulyakov",
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
publication_types = ["1"]

# Publication name and optional abbreviated version.
publication = "ECCV, 2026"
publication_short = "*ECCV'26*"

# Abstract and optional shortened version.
abstract = "While personalizing Image-to-Video (I2V) diffusion models with specific visual effects is increasingly demanded for high-end generation, current practice requires training a separate Low-Rank Adaptation (LoRA) module for each effect, incurring substantial data curation and iterative optimization costs that hinder interactive control. We present Prompt2Effect, a weight-driven hypernetwork that amortizes per-effect training by directly synthesizing effect-specific LoRA weights in a single forward pass. Unlike prior hypernetworks that regress adapter weights purely from semantics, Prompt2Effect is explicitly conditioned on the frozen base model weights, grounding prediction in the structural geometry of each layer. Furthermore, instead of predicting raw LoRA matrices, we introduce an SVD-canonicalized parameterization that resolves factorization ambiguity and stabilizes large-scale synthesis. Extensive experiments demonstrate that Prompt2Effect achieves on-par or superior video quality and effect alignment compared to conventional LoRA fine-tuning, while reducing the computational cost from 56 GPU training hours to 3.3 seconds of hypernetwork inference. When used as initialization for subsequent fine-tuning, our predicted weights further improve final performance and accelerate optimization by approximately 10x."
abstract_short = "Prompt2Effect synthesizes effect-specific LoRA weights for image-to-video diffusion models in a single forward pass, reducing per-effect specialization from 56 GPU hours to 3.3 seconds."

# Is this a selected publication? (true/false)
selected = true
# Is this a featured publication? (true/false)
featured = true

# Projects (optional).
projects = []

# Slides (optional).
slides = ""

# Tags (optional).
tags = ["Video Diffusion", "Image-to-Video", "Adapter Training", "Generative Models"]

# Links (optional).
url_preprint = "https://arxiv.org/abs/2606.13971"
url_code = "https://github.com/LukeLIN-web/Prompt2Effect"
#url_dataset = ""
#url_project = ""
#url_slides = ""
url_video = "https://xiaomeng-yang.github.io/Prompt2Effect/#video-gallery"
#url_poster = ""
#url_source = ""

# Custom links (optional).
# Uncomment line below to enable. For multiple links, use the form [{...}, {...}, {...}].
# url_custom = [{name = "Custom Link", url = "http://example.org"}]

# Does this page contain LaTeX math? (true/false)
math = true

# To use, place an image named `featured.jpg/png` or video named `featured.mp4` in your page's folder.
# Placement options: 1 = Full column width, 2 = Out-set, 3 = Screen-width
# Focal point options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
# Set `preview_only` to `true` to just use the image for thumbnails.

[image]
  # Caption (optional)
  # caption = "Prompt2Effect"

  # Focal point (optional)
  # Options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
  focal_point = "Center"
  placement = 2
  # preview_only = true

+++
