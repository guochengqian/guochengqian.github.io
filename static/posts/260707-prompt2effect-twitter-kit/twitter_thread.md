# Prompt2Effect X/Twitter thread draft

Status: draft only — not posted.
Account voice: Gordon / co-author announcement.
Primary link: https://xiaomeng-yang.github.io/Prompt2Effect/
Paper: https://arxiv.org/abs/2606.13971
Code reproduction: https://github.com/LukeLIN-web/Prompt2Effect

## Media plan

1. `01-facing-your-older-self.gif` — main GIF you created; announcement + pain point + amortized tuning.
2. `06-results-card.jpg` — preliminary results / cost + IID/OOD metrics.
3. `02-method.jpg` — method pipeline: train on multiple LoRA effects, weight-driven input, joint hypernetwork processing, SVD-canonicalized LoRA prediction.
4. `03-weight-driven-analysis.jpg` — base-weight vs LoRA-update compressibility analysis.
5. `04-svd-ablation.jpg` — SVD-canonicalized prediction training curve.
6. `05-homepage-featured.jpg` — effect example / amortized-efficiency follow-up visual.
7. `07-composition-card.jpg` — composition example card from project-page videos.
8. Optional: no media, or reuse `02-method.jpg`; future-work note on Multimodal2Effect.

## Thread text

### 1/8 — attach `01-facing-your-older-self.gif`

📣️📣️📣️ Prompt2Effect accepted to ECCV 2026!

Effect tuning needs LoRA finetuning per effect. Imagine thousands of server requests.

We propose amortized tuning: train on many LoRA effects, then generate LoRA for unseen effects in 3.3s from text.

https://xiaomeng-yang.github.io/Prompt2Effect/

### 2/8 — attach `06-results-card.jpg`

2/ Check our preliminary results!

One generated LoRA already improves effect execution over the base I2V model and approaches a trained LoRA. For OOD effects, using P2E as init lets ~100 steps approach a 1000-step LoRA (~10× faster).

### 3/8 — attach `02-method.jpg`

3/ Method in detail: train a hypernetwork on multiple LoRA effects at once.

It reads the effect prompt, layer metadata, and compressed frozen base weights, then emits LoRA weights — amortizing the cost vs training each effect independently.

### 4/8 — attach `03-weight-driven-analysis.jpg`

4/ Why include base weights?

A LoRA update is not absolute — it is a residual relative to W₀. Conditioning on W₀ gives each predicted adapter the target layer’s input/output geometry, which makes generation much more reliable.

### 5/8 — attach `04-svd-ablation.jpg`

5/ Another key trick: SVD-canonicalized prediction.

Raw LoRA factors are ambiguous: BA = (BR)(R⁻¹A). We instead predict a canonical SVD form of ΔW, reducing redundancy and stabilizing large-scale LoRA generation.

### 6/8 — attach `05-homepage-featured.jpg`

6/ Amortized efficiency is the point.

Once the hypernetwork is trained, a new effect is one forward pass — no per-effect multi-GPU finetuning loop. Effect specialization becomes cheap inference instead of repeated training jobs.

### 7/8 — attach `07-composition-card.jpg`

7/ Since the output is LoRA weights, effects become composable.

Interpolating two generated adapters can blend behaviors in weight space, creating coherent mixed effects without training a new effect from scratch.

### 8/8 — optional media: none, or reuse `02-method.jpg`

8/ Future work: Multimodal2Effect.

Support both effect descriptions and visual video examples as input, so users can specify an effect by text, example video, or both.

More videos, paper, code:
https://xiaomeng-yang.github.io/Prompt2Effect/
