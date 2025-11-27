+++

title = "Preventing Shortcuts in Adapter Training via Providing the Shortcuts"
date = 2025-09-15T00:00:00
draft = false

# Authors. Comma separated list, e.g. ["Bob Smith", "__**David Jones**__"].
authors = [
"Anujraaj Goyal", 
"__**Guocheng Gordon Qian**__<sup>†</sup>", 
"Huseyin Coskun", 
"Aarush Gupta",
"Himmy Tam",
"Daniil Ostashev",
"Ju Hu",
"Dhritiman Sagar",
"Sergey Tulyakov",
"Kfir Aberman",
"Kuan-Chieh Jackson Wang<sup>†</sup>",
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
publication ="Conference on Neural Information Processing Systems, 2025"
publication_short = "*NeurIPS'25*"

# Abstract and optional shortened version.
abstract = "Adapter modules have emerged as a parameter-efficient method for fine-tuning large pre-trained models to downstream tasks. However, adapter training can suffer from shortcut learning, where the model exploits spurious correlations in the training data rather than learning robust, generalizable features. We propose a novel approach to prevent shortcuts in adapter training by explicitly providing the shortcuts during training. By exposing the model to the shortcuts it might otherwise exploit, we force the adapter to learn more robust representations that go beyond simple pattern matching. Our method demonstrates improved generalization and robustness across various benchmarks while maintaining the parameter efficiency of standard adapter training."
abstract_short = "We prevent shortcuts in adapter training by explicitly providing the shortcuts during training, forcing the model to learn more robust representations."

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
tags = ["Machine Learning", "Transfer Learning", "Adapter Training"]

# Links (optional).
url_preprint = "https://arxiv.org/abs/2510.20887"
#url_code = ""
#url_dataset = ""
url_project = "https://snap-research.github.io/shortcut-rerouting/"
#url_slides = ""
#url_video = ""
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
  # caption = "Preventing Shortcuts"
  
  # Focal point (optional)
  # Options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
  focal_point = "Center"
  placement = 2
  # preview_only = true

+++

