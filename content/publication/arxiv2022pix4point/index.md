+++

title = "Improving Standard Transformer Models for 3D Point Cloud Understanding with Image Pretraining"
date = 2022-08-15T00:00:00
draft = false

# Authors. Comma separated list, e.g. ["Bob Smith", "__**David Jones**__"].
authors = ["__**Guocheng Qian**__", "Xingdi Zhang", "Abdullah Hamdi", "Bernard Ghanem"]

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
publication ="Arxiv, 2022"
publication_short = "*Arxiv'22*"

# Abstract and optional shortened version.
abstract = "While Standard Transformer (ST) models have achieved impressive success in natural language processing and computer vision, their performance on 3D point clouds is relatively poor. This is mainly due to the limitation of Transformers: a demanding need for large training data. Unfortunately, in the realm of 3D point clouds, the availability of large datasets is a challenge, which exacerbates the issue of training ST models for 3D tasks. In this work, we propose two contributions to improve ST models on point clouds. First, we contribute a new ST-based point cloud network, by using Progressive Point Patch Embedding as the tokenizer and Feature Propagation with global representation appending as the decoder. Our network is shown to be less hungry for data, and enables ST to achieve performance comparable to the state-of-the-art. Second, we formulate a simple yet effective pipeline dubbed \textit{Pix4Point}, which allows harnessing Transformers pretrained in the image domain to enhance downstream point cloud understanding. This is achieved through a modality-agnostic ST backbone with the help of our proposed tokenizer and decoder specialized in the 3D domain. Pretrained on a large number of widely available images, we observe significant gains of our ST model in the tasks of 3D point cloud classification, part segmentation, and semantic segmentation on ScanObjectNN, ShapeNetPart, and S3DIS benchmarks, respectively."
abstract_short = "We propose a state-of-the-art Standard Transformer model for point cloud understanding and find that image pretraining helps point cloud tasks. "
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
tags = ["point cloud", "3D"]

# Links (optional).
url_preprint = "https://arxiv.org/abs/2206.04670"
url_code = "https://github.com/guochengqian/pix4point"
#url_dataset = ""
#url_project = "https://www.deepgcns.org/"
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
