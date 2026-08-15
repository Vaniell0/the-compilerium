---
id: distillation__jepa
entity: relation
title: Knowledge Distillation ↔ JEPA
capsule: Both techniques share the teacher/student + EMA target-network structure, but distillation transfers a teacher's output distribution to a student, while JEPA uses the teacher purely to produce stable embedding targets — it is self-distillation on masked inputs, not on the full output space.
domain: it
subdomain: ml
type: relation
created: 2021
status: active
importance: high
from: distillation
to: jepa
direction: symmetric
confidence: moderate
axes:
  historical: true
  structural: true
  competence: true
---

## What this is

JEPA's EMA teacher is the same collapse-prevention mechanism that self-distillation papers (BYOL, DINO) introduced: a slowly-drifting copy of the student encoder produces stable targets that the student pursues without collapsing to a constant representation. The difference is that distillation targets the teacher's output distribution (class probabilities or logits), while JEPA targets the teacher's intermediate representations on masked patches — the teacher never classifies, it only embeds.

## Claims

**DISTILLATION-JEPA-C001** 🟢 — DINO (Caron et al., ICCV 2021) and I-JEPA (Assran et al., CVPR 2023) both use an EMA teacher: in DINO the teacher produces a softened class-prediction distribution (response-based distillation without labels); in I-JEPA the teacher produces patch embeddings for masked regions (feature-based distillation on masked inputs); both cite the EMA weight update as the structural fix against representation collapse

**DISTILLATION-JEPA-C002** 🟢 — standard distillation requires a pretrained teacher: the teacher is trained to convergence first, then its outputs supervise the student; JEPA (and BYOL/DINO) requires no pretrained teacher because the teacher IS the student's EMA — the distillation signal bootstraps from the model being trained; this removes the two-stage training cost that limits standard distillation

**DISTILLATION-JEPA-C003** 🟡 — the prediction target distinguishes the families at the structural level: response-based distillation matches logits across the full output space; JEPA matches embeddings of masked patches in latent space; the JEPA target is never decoded to pixel space — the teacher has already abstracted away texture and lighting, which is what makes the learning signal structurally cleaner than MAE's pixel target

**DISTILLATION-JEPA-C004** 🟠 — framing JEPA as "just self-distillation" erases what is distinctive: distillation's objective is to shrink a model while preserving performance; JEPA's objective is to learn representations of spatial structure without any pretraining teacher — the mechanism is shared but the purpose and the target differ; treating them as the same technique confuses the tool with the goal

**DISTILLATION-JEPA-C005** 🟠 — V-JEPA (Bardes et al. 2024) can itself serve as a distillation teacher: a frozen V-JEPA encoder trained on video can supply soft feature-map targets to a compact image-only student via cross-modal feature-based distillation; this is a composition of both techniques, not a choice between them — but the evidence that this composition outperforms training the student from scratch on images alone is not yet systematic

**DISTILLATION-JEPA-C006** 🔴 — whether JEPA-style masked-representation prediction provides a better self-supervised pretraining objective than DINO-style full-view self-distillation at large scale (1B+ parameters, large video datasets) is not settled; both achieve competitive transfer performance on different evaluation protocols, and the evaluation benchmarks are not fully overlapping

## Competence signal

A practitioner who understands this relation can explain exactly why the EMA teacher in JEPA is not the same operation as a response-based distillation teacher — the EMA teacher never classifies, never sees the masked region, and produces embeddings not distributions — and can state when you would choose JEPA pretraining over DINO over standard distillation based on what you have (a pretrained model, a large unlabelled dataset, a fixed deployment budget).

## Sources

- Caron, M. et al. «Emerging Properties in Self-Supervised Vision Transformers» (DINO), ICCV (2021)
- Assran, M. et al. «Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture» (I-JEPA), CVPR (2023). arXiv:2301.08243
- Bardes, A. et al. «Revisiting Feature Prediction for Learning Visual Representations from Video» (V-JEPA), Meta AI (2024). arXiv:2404.08471
- Grill, J.-B. et al. «Bootstrap Your Own Latent» (BYOL), NeurIPS (2020). arXiv:2006.07733
- Hinton, G., Vinyals, O., Dean, J. «Distilling the Knowledge in a Neural Network», NIPS Workshop (2014). arXiv:1503.02531
