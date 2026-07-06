+++

title = "ComposeMe: Attribute-Specific Image Prompts for Controllable Human Image Generation"
date = 2025-08-21T00:00:00
draft = false

# Authors. Comma separated list, e.g. ["Bob Smith", "__**David Jones**__"].
authors = [
"__**Gordon Guocheng Qian**__",
"Daniil Ostashev",
"Egor Nemchinov",
"Avihay Assouline",
"Sergey Tulyakov",
"Kuan-Chieh Jackson Wang",
"Kfir Aberman",
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
publication ="SIGGRAPH Asia, 2025"
publication_short = "*SIGGRAPH Asia'25*"

# Abstract and optional shortened version.
abstract = "Generating high-fidelity images of humans with fine-grained control over attributes such as hairstyle and clothing remains a core challenge in personalized text-to-image synthesis. While prior methods emphasize identity preservation from a reference image, they lack modularity and fail to provide disentangled control over specific visual attributes. We introduce a new paradigm for attribute-specific image prompting, in which distinct sets of reference images are used to guide the generation of individual aspects of human appearance, such as hair, clothing, and identity. Our method encodes these inputs into attribute-specific tokens, which are injected into a pre-trained text-to-image diffusion model. This enables compositional and disentangled control over multiple visual factors, even across multiple people within a single image. To promote natural composition and robust disentanglement, we curate a cross-reference training dataset featuring subjects in diverse poses and expressions, and propose a multi-attribute cross-reference training strategy that encourages the model to generate faithful outputs from misaligned attribute inputs while adhering to both identity and textual conditioning. Extensive experiments show that our method achieves state-of-the-art performance in accurately following both visual and textual prompts. Our framework paves the way for more configurable human image synthesis by combining visual prompting with text-driven generation."
abstract_short = "ComposeMe is a human-centric generative model that enables disentangled control over multiple visual attributes — such as identity, hair, and garment — across multiple subjects, while also supporting text-based control."
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
tags = ["Generative Models", "Personalization"]

# Links (optional).
url_preprint = "https://arxiv.org/abs/2509.18092"
#url_code = "https://snap-research.github.io/Omni-ID/"
#url_dataset = ""
url_project = "https://snap-research.github.io/composeme/"
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
