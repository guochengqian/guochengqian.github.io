+++

title = "PDMD: Projected Distribution Matching Distillation for Video Diffusion Models"
date = 2026-09-28T17:59:52
draft = false

# Authors. Comma separated list, e.g. ["Bob Smith", "__**David Jones**__"].
authors = [
"Zimo Wang",
"Junkun Yuan",
"Angtian Wang",
"Haotian Yang",
"Canyu Zhang",
"Siyuan Yuan",
"Xingchang Huang",
"Bo Liu",
"Yizhi Wang",
"Yiding Yang",
"Chongyang Ma",
"__**Gordon Guocheng Qian**__",
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
publication = "preprint, 2026"
publication_short = "*arXiv'26*"

# Abstract and optional shortened version.
abstract = "Modern video diffusion models require tens of denoising evaluations over long spatiotemporal token sequences. Distribution Matching Distillation (DMD) reduces the number of function evaluations (NFE) to just a few. However, DMD samples can degrade during training, exhibiting progressive oversaturation and artifacts. We trace this instability to critic errors, which enter successive student updates and accumulate over time. We introduce Projected Distribution Matching Distillation (PDMD) to filter critic errors. PDMD projects out the component of the DMD update parallel to the student-critic endpoint residual. At a fixed noisy query, we prove that this residual is an unbiased estimate of the critic's endpoint error. Under high-dimensional assumptions, this projection removes a constant fraction of critic error while discarding only a vanishing fraction of ideal DMD signal. Empirically, the projection stabilizes training and improves sample quality where DMD degrades and develops unnatural textures. PDMD requires only a one-line code change to DMD, with no extra loss, network, data, model pass, or multi-stage training. With Wan2.1, PDMD achieves a VBench total score of 83.73 at 4 NFE, surpassing matched DMD by 1.03 points. On MiniMax-H3 joint video-audio generation, PDMD achieves a VideoGen-Eval visual total score of 83.17, 0.41 points above the strongest distilled baseline. PDMD also achieves the best performance on all six audio metrics among the compared 4-NFE models. Qualitative comparisons and user studies favor PDMD over the distilled baselines in visual quality, motion, and audio quality. Code and models are available at https://pdmd2026.github.io/."
abstract_short = "PDMD stabilizes distribution matching distillation for video diffusion models with a one-line projection that filters critic errors, achieving state-of-the-art 4-NFE and 2-NFE video-audio generation."

# Is this a selected publication? (true/false)
selected = true
# Is this a featured publication? (true/false)
featured = true

# Projects (optional).
projects = []

# Slides (optional).
slides = ""

# Tags (optional).
tags = ["Video Diffusion", "Diffusion Distillation", "Video Generation", "Generative Models"]

# Links (optional).
url_preprint = "https://arxiv.org/abs/2609.35768"
url_code = "https://github.com/ZeamoxWang/pdmd"
#url_dataset = ""
url_project = "https://pdmd2026.github.io/"
#url_slides = ""
#url_video = ""
#url_poster = ""
#url_source = ""

# Custom links (optional).
# Uncomment line below to enable. For multiple links, use the form [{...}, {...}, {...}].
# links = [{name = "Custom Link", url = "http://example.org"}]
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
  # caption = "PDMD"

  # Focal point (optional)
  # Options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
  focal_point = "Center"
  placement = 2
  # preview_only = true

+++
