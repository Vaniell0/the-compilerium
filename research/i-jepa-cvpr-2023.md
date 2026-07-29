---
id: i-jepa-cvpr-2023
entity: research
title: "Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture"
capsule: The first empirical JEPA paper — shows that predicting masked patch embeddings with an EMA teacher trains faster than reconstructing pixels on the same ImageNet task.
domain: it
subdomain: ml
type: paper
created: 2023
status: published
importance: high
authors: [Assran M., Duval Q., Misra I., Bojanowski P., Vincent P., Rabbat M., LeCun Y., Ballas N.]
year: 2023
venue: CVPR
url: https://arxiv.org/abs/2301.08243
supports: [JEPA-C001, JEPA-C002]
challenges: []
confidence: strong
---

## What it says

I-JEPA trains an image encoder by masking large regions of an image and learning to predict their EMA-teacher embeddings from visible context patches, without any pixel reconstruction. On ImageNet linear evaluation, I-JEPA reaches MAE-comparable accuracy at roughly 5× fewer training epochs. The paper reports the result in Table 1, with the ImageNet-1K checkpoint released publicly on the Meta AI GitHub repository.

## Why it matters here

JEPA-C001 (EMA teacher produces stable embedding targets at fewer epochs than pixel reconstruction) is directly evidenced by Table 1 of this paper: the linear-probe accuracy comparison between I-JEPA and MAE at matched epoch counts is the measurement behind the claim. JEPA-C002 (EMA teacher prevents collapse by providing a slowly-drifting target) is described in Section 3.2 of the paper, which explains the exponential moving average weight update rule and the role it plays in keeping targets stable while the student encoder trains.

## Sources

- Assran, M. et al. «Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture», CVPR (2023). arXiv:2301.08243. github.com/facebookresearch/ijepa
