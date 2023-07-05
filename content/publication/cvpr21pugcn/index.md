+++

title = "PU-GCN: Point Cloud Upsampling using Graph Convolutional Networks"
date = 2021-03-01T00:00:00
draft = false

# Authors. Comma separated list, e.g. ["Bob Smith", "__**David Jones**__"].
authors = ["__**Guocheng Qian**__", "Abdulellah Abualshour", "Guohao Li", "Ali Thabet", "Bernard Ghanem"]

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
publication ="*2021 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR' 2021)*"
publication_short = "*CVPR'2021*"

# Abstract and optional shortened version.
abstract = "Upsampling sparse, noisy, and non-uniform point clouds is a challenging task. In this paper, we propose 3 novel point upsampling modules: Multi-branch GCN, Clone GCN, and NodeShuffle. Our modules use Graph Convolutional Networks (GCNs) to better encode local point information. Our upsampling modules are versatile and can be incorporated into any point cloud upsampling pipeline. We show how our 3 modules consistently improve state-of-the-art methods in all point upsampling metrics. We also propose a new multi-scale point feature extractor, called Inception DenseGCN. We modify current Inception GCN algorithms by introducing DenseGCN blocks. By aggregating data at multiple scales, our new feature extractor is more resilient to density changes along point cloud surfaces. We combine Inception DenseGCN with one of our upsampling modules (NodeShuffle) into a new point upsampling pipeline: PU-GCN. We show both qualitatively and quantitatively the advantages of PU-GCN against the state-of-the-art in terms of fine-grained upsampling quality and point cloud uniformity. "


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
tags = ["point cloud", "graph convolutional network", "3D", "AIGC"]

# Links (optional).
url_preprint = "https://arxiv.org/abs/1912.03264.pdf"
url_code = "https://github.com/guochengqian/PU-GCN"
url_video = "https://www.youtube.com/watch?v=dbWLdnq0FQ8"
url_project = "https://sites.google.com/kaust.edu.sa/pugcn"
url_dataset = "https://sites.google.com/kaust.edu.sa/pugcn"
url_abstract = "Upsampling sparse, noisy, and non-uniform point clouds is a challenging task. In this paper, we propose 3 novel point upsampling modules: Multi-branch GCN, Clone GCN, and NodeShuffle. Our modules use Graph Convolutional Networks (GCNs) to better encode local point information. Our upsampling modules are versatile and can be incorporated into any point cloud upsampling pipeline. We show how our 3 modules consistently improve state-of-the-art methods in all point upsampling metrics. We also propose a new multi-scale point feature extractor, called Inception DenseGCN. We modify current Inception GCN algorithms by introducing DenseGCN blocks. By aggregating data at multiple scales, our new feature extractor is more resilient to density changes along point cloud surfaces. We combine Inception DenseGCN with one of our upsampling modules (NodeShuffle) into a new point upsampling pipeline: PU-GCN. We show both qualitatively and quantitatively the advantages of PU-GCN against the state-of-the-art in terms of fine-grained upsampling quality and point cloud uniformity. "
# Custom links (optional).
# Uncomment line below to enable. For multiple links, use the form [{...}, {...}, {...}].
url_website =  [{name = "website", url = "https://sites.google.com/kaust.edu.sa/pugcn"}]
# Digital Object Identifier (DOI)


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
