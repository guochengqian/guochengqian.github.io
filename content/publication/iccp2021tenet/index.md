+++

title = "Rethinking Learning-based Demosaicing, Denoising, and Super-Resolution Pipeline"
date = 2022-08-01T00:00:00
draft = false

# Authors. Comma separated list, e.g. ["Bob Smith", "__**David Jones**__"].
authors = ["__**Guocheng Qian**__", "Yuanhao Wang", "Jinjin Gu", "Chao Dong", "Wolfgang Heidrich", "Bernard Ghanem", "Jimmy S. Ren"]

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
publication ="2022 IEEE International Conference on Computational Photography (ICCP)"
publication_short = "*ICCP'2022*"

# Abstract and optional shortened version.
abstract = "Imaging is usually a mixture problem of incomplete color sampling, noise degradation, and limited resolution. This mixture problem is typically solved by a sequential solution that applies demosaicing (DM), denoising (DN), and super-resolution (SR) sequentially in a fixed and predefined pipeline (execution order of tasks), DM→DN→SR. The most recent work on image processing focuses on developing more sophisticated architectures to achieve higher image quality. Little attention has been paid to the design of the pipeline, and it is still not clear how significant the pipeline is to image quality. In this work, we comprehensively study the effects of pipelines on the mixture problem of learning-based DN, DM, and SR, in both sequential and joint solutions. On the one hand, in sequential solutions, we find that the pipeline has a non-trivial effect on the resulted image quality. Our suggested pipeline DN→SR→DM yields consistently better performance than other sequential pipelines in various experimental settings and benchmarks. On the other hand, in joint solutions, we propose an end-to-end Trinity Pixel Enhancement NETwork (TENet) that achieves the state-of-the-art performance for the mixture problem. We further present a novel and simple method that can integrate a certain pipeline into a given end-to-end network by providing intermediate supervision using a detachable head. Extensive experiments show that an end-to-end network with the proposed pipeline can attain only a consistent but insignificant improvement. Our work indicates that the investigation of pipelines is applicable in sequential solutions, but is not very necessary in end-to-end networks."



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
projects = ["pixelshift200"]

# Slides (optional).
# Associate this publication with Markdown slides.
# Simply enter your slide deck's filename without extension.
# E.g. slides = "example-slides" references
# content/slides/example-slides.md.
# Otherwise, set slides = "".
slides = ""

# Tags (optional).
# Set tags = [] for no tags, or use the form tags = ["A Tag", "Another Tag"] for one or more tags.
tags = ["image processing"]

# Links (optional).
url_preprint = "https://arxiv.org/abs/1905.02538"
url_code = "https://github.com/guochengqian/TENet"
url_dataset = "project/pixelshift200"
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
