+++

title = "I Think, Therefore I Diffuse: Enabling Multimodal In-Context Reasoning in Diffusion Models"
date = 2025-06-13T00:00:00
draft = false

# Authors. Comma separated list, e.g. ["Bob Smith", "__**David Jones**__"].
authors = [
    "Zhenxing Mi", "Kuan-Chieh Wang", "__**Guocheng Qian**__",
    "Hanrong Ye", "Runtao Liu", "Sergey Tulyakov",
    "Kfir Aberman", "Dan Xu"
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
publication = "International Conference on Machine Learning, 2025"
publication_short = "*ICML'25*"

# Abstract and optional shortened version.
abstract = "This paper presents ThinkDiff, a novel alignment paradigm that enables multimodal in-context understanding and reasoning capabilities in text-to-image diffusion models by integrating the capabilities of vision-language models (VLMs). Directly aligning VLMs with diffusion decoders via diffusion loss requires complex and costly reasoning-based data pairs with multimodal inputs and image outputs. Instead, ThinkDiff leverages vision-language training as a proxy task, aligning VLMs to a large language model (LLM) decoder. This proxy task is feasible because the LLM decoder shares the same input feature space as diffusion decoders that use the corresponding LLM encoder for text embedding. As a result, alignment with diffusion decoders can be achieved by alignment with the LLM decoder. ThinkDiff effectively transfers multimodal in-context understanding and reasoning capabilities from VLMs to diffusion models, eliminating the need for complex reasoning-based multimodal datasets by using only readily available image-text pairs for training. Experiment results demonstrate that ThinkDiff significantly improves performance on the challenging CoBSAT benchmark for multimodal in-context reasoning generation, raising the best accuracy from 19.2% to 46.3%, with only 5 hours of training on 4 A100 GPUs."
abstract_short = "ThinkDiff enables multimodal in-context reasoning in diffusion models by aligning vision-language models to LLM decoders, transferring reasoning capabilities without requiring complex reasoning-based datasets."

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
tags = ["Generative Models", "Multimodal", "3D"]

# Links (optional).
url_preprint = "https://arxiv.org/abs/2502.10458"
url_code = "https://github.com/MiZhenxing/ThinkDiff"
#url_dataset = ""
url_project = "https://mizhenxing.github.io/ThinkDiff/"
#url_slides = ""
#url_video = ""
#url_poster = ""
#url_source = ""

# Custom links (optional).
# Uncomment line below to enable. For multiple links, use the form [{...}, {...}, {...}].
# url_custom = [{name = "Custom Link", url = "http://example.org"}]
[[links]]
  name = "Media · 机器之心"
  url  = "https://mp.weixin.qq.com/s/2A2NuLLcqQ8-bu8M-_-5uA"
  icon = "syncedtech.jpg"
  icon_pack = "img"

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

