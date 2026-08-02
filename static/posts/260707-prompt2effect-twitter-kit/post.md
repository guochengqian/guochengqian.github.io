# Prompt2Effect post kit — source notes

## Source facts used

- Project title: **Prompt2Effect: Training-Free Image-to-Video Model Specialization via LoRA Generation**.
- Venue/page label: **ECCV 2026**.
- Authors include Gordon Guocheng Qian; local homepage publication entry marks this as selected/featured.
- Core claim from arXiv/project page: current per-effect I2V personalization often trains a separate LoRA; Prompt2Effect instead uses a weight-driven hypernetwork to synthesize effect-specific LoRA weights in one forward pass.
- Cost claim from abstract/project page: conventional per-effect LoRA training cost is reduced from **56 GPU training hours** to **3.3 seconds** of hypernetwork inference.
- Architecture detail from paper/project figure: **1.3B-parameter Transformer hypernetwork** jointly processes compressed base-weight tokens, effect prompt, and layer metadata.
- Design ideas:
  1. **Weight-driven prediction**: condition on frozen base-model weights W₀, because a LoRA update is defined relative to the base weight matrix.
  2. **SVD-canonicalized LoRA prediction**: avoid the non-identifiability of raw BA factors.
  3. **Fast adaptation**: predicted weights can initialize later LoRA fine-tuning, giving roughly **10×** faster optimization.
  4. **Effect composition**: predicted LoRA weights can be interpolated in weight space to blend effects.
- Future-work thread note from Gordon: **Multimodal2Effect** could support both natural-language effect descriptions and visual video examples as input.
- Project-page transparency note: original Prompt2Effect implementation was developed at Snap and is not public; the linked code is an independent reproduction built on Wan image-to-video.

## Links

- Project page: https://xiaomeng-yang.github.io/Prompt2Effect/
- arXiv: https://arxiv.org/abs/2606.13971
- Code reproduction: https://github.com/LukeLIN-web/Prompt2Effect
- Local homepage entry: `/Users/gqian/Documents/codefiles/guochengqian.github.io/content/publication/arxiv2026prompt2effect/index.md`

## Files in this kit

- `tweet.txt` — single first tweet, copy-paste ready.
- `twitter_thread.md` — 8-tweet draft with media plan.
- `thread_lengths.txt` — weighted X length verification.
- `01-facing-your-older-self.gif` — main media, copied from `/tmp/prompt2effect_gif/facing_your_older_self_base_vs_prompt2effect_chat.gif`.
- `02-method.jpg` through `07-composition-card.jpg` — supporting images for thread replies.
- `source_assets/` — raw downloaded/copied source images, videos, previews, and file inventory.
