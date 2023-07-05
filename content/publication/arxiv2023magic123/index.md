+++

title = "Magic123: One Image to High-Quality 3D Object Generation Using Both 2D and 3D Diffusion Priors"
date = 2023-06-05T00:00:00
draft = false

# Authors. Comma separated list, e.g. ["Bob Smith", "__**David Jones**__"].
authors = ["__**Guocheng Qian**__", "Jinjie Mai", "Abdullah Hamdi", "Jian Ren", "Aliaksandr Siarohin", "Bing Li", "Hsin-Ying Lee", "Ivan Skorokhodov", "Peter Wonka", "Sergey Tulyakov", "Bernard Ghanem"]

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
publication ="Arxiv, 2023"
publication_short = "*Arxiv'23*"

# Abstract and optional shortened version.
abstract = "We present “Magic123”, a two-stage coarse-to-fine solution for high-quality, tex-tured 3D meshes generation from a single unposed image in the wild using both 2D and 3D priors. In the first stage, we optimize a coarse neural radiance field and focus on learning geometry. In the second stage, a memory-efficient differentiable mesh representation is adopted to yield a high-resolution mesh with a visually appealing texture. In both stages, the 3D content is learned through reference view supervision and novel views guided by both 2D and 3D diffusion priors. A tradeoff parameter between the 2D and 3D priors controls the exploration (more imaginative) and exploitation (more precise) of the generated geometry. We further leverage textual inversion to encourage consistent appearances across views. Monocular depth estimation is used to constrain the 3D reconstruction and avoid collapsed solutions, e.g. flat geometry. Our Magic123 approach outperforms prior image-to-3D techniques by a large margin, as demonstrated through extensive experiments on various real images in the wild and on synthetic benchmarks. Our code, models, and generated 3D assets are available at https://guochengqian.github.io/project/magic123/."
abstract_short = "Magic123 is a coarse-to-fine image-to-3D pipeline that produces high-quality high-resolution 3D content from a single unposed image by the guidance of both 2D and 3D priors."
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
tags = ["AIGC", "3D"]

# Links (optional).
url_preprint = "https://arxiv.org/abs/2306.17843"
url_code = "https://github.com/guochengqian/Magic123"
#url_dataset = ""
url_project = "https://guochengqian.github.io/project/magic123/"
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
