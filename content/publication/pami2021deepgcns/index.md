+++

title = "DeepGCNs: Making GCNs Go as Deep as CNNs"
date = 2021-03-07T00:00:00
draft = false

# Authors. Comma separated list, e.g. ["Bob Smith", "__**David Jones**__"].
authors = ["__**Guocheng Qian***__", "Guohao Li*", "Matthias Müller*", "Itzel C. Delgadillo", "Abdulellah Abualshour", "Ali Thabet", "Bernard Ghanem"]

# Publication type.
# Legend:
# 0 = Uncategorized
# 1 = Conference paper
# 2 = Journal article
# 3 = Manuscript
# 4 = Report
# 5 = Book
# 6 = Book section
publication_types = ["2"]

# Publication name and optional abbreviated version.
publication = "*IEEE Transactions on Pattern Analysis and Machine Intelligence, 2019*."
publication_short = "*TPAMI'2021*"

# Abstract and optional shortened version.
abstract = "Convolutional Neural Networks (CNNs) have been very successful at solving a variety of computer vision tasks such as object classification and detection, semantic segmentation, activity understanding, to name just a few. One key enabling factor for their great performance has been the ability to train very deep CNNs. Despite their huge success in many tasks, CNNs do not work well with non-Euclidean data which is prevalent in many real-world applications. Graph Convolutional Networks (GCNs) offer an alternative that allows for non-Eucledian data as input to a neural network similar to CNNs. While GCNs already achieve encouraging results, they are currently limited to shallow architectures with 2-4 layers due to vanishing gradients during training. This work transfers concepts such as residual/dense connections and dilated convolutions from CNNs to GCNs in order to successfully train very deep GCNs. We show the benefit of deep GCNs with as many as 112 layers experimentally across various datasets and tasks. Specifically, we achieve state-of-the-art performance in part segmentation and semantic segmentation on point clouds and in node classification of protein functions across biological protein-protein interaction (PPI) graphs. We believe that the insights in this work will open a lot of avenues for future research on GCNs and transfer to further tasks not explored in this work."
abstract_short = "This work transfers concepts such as residual/dense connections and dilated convolutions from CNNs to GCNs in order to successfully train very deep GCNs."
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
tags = ["point cloud", "graph convolutional network", "3D"]

# Links (optional).
url_preprint = "https://arxiv.org/abs/1910.06849"
url_code = "https://github.com/lightaime/deep_gcns"
#url_dataset = ""
url_project = "https://www.deepgcns.org/"
url_slides = "https://docs.google.com/presentation/d/1L82wWymMnHyYJk3xUKvteEWD5fX0jVRbCbI65Cxxku0/edit?usp=sharing"
url_video = "https://youtu.be/CHB96wBV4Ts"
#url_poster = ""
#url_source = ""

# Custom links (optional).
# Uncomment line below to enable. For multiple links, use the form [{...}, {...}, {...}].
# url_custom = [{name = "Custom Link", url = "http://example.org"}]
# Digital Object Identifier (DOI)
doi = ""

# Does this page contain LaTeX math? (true/false)
math = false

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
