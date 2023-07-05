+++

title = "ASSANet: An Anisotropic Separable Set Abstraction for Efficient Point Cloud Representation Learning"
date = 2021-10-10T00:00:00
draft = false

# Authors. Comma separated list, e.g. ["Bob Smith", "__**David Jones**__"].
authors = ["__**Guocheng Qian**__", "Hasan Abed Al Kader Hammoud", "Guohao Li", "Ali Thabet", "Bernard Ghanem"]

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
publication = "*2021 Conference on Neural Information Processing Systems (NeurIPS21)"
publication_short = "*NeurIPS'21, Spotlight*"

# Abstract and optional shortened version.
abstract = "Access to 3D point cloud representations has been widely facilitated by LiDAR sensors embedded in various mobile devices.  This has led to an emerging needfor fast and accurate point cloud processing techniques. In this paper, we revisitand dive deeper into PointNet++, one of the most influential yet under-explored networks, and develop faster and more accurate variants of the model.  We first present  a  novel  Separable  Set  Abstraction  (SA)  module  that  disentangles  the vanilla SA module used in PointNet++ into two separate learning stages:  (1)learning channel correlation and (2) learning spatial correlation. The Separable SA module is significantly faster than the vanilla version, yet it achieves comparable performance. We then introduce a new Anisotropic Reduction function into our Separable SA module and propose an Anisotropic Separable SA (ASSA) modulethat substantially increases the network’s accuracy.  We later replace the vanilla SA modules in PointNet++ with the proposed ASSA modules, and denote the modified network as ASSANet. Extensive experiments on point cloud classification,semantic segmentation, and part segmentation show that ASSANet outperforms PointNet++ and other methods, achieving much higher accuracy and faster speeds.In particular, ASSANet outperforms PointNet++ by 7.4 mIoU on S3DIS Area 5, while maintaining 1.6$\times$ faster inference speed on a single NVIDIA 2080Ti GPU. Our scaled ASSANet variant achieves 66.8mIoU and outperforms KPConv, while being more than 54$\times$ faster."
abstract_short = "ASSANet makes PointNet++ faster and more accurate."
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
url_preprint = "https://arxiv.org/abs/2110.10538"
url_code = "https://github.com/guochengqian/ASSANet"
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
