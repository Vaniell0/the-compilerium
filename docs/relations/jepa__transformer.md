---
id: jepa__transformer
entity: relation
title: JEPA ↔ Transformer
capsule: JEPA often uses a Transformer as its encoder substrate but replaces the Transformer's generation objective with representation-space prediction — making the contest between them an objective contest, not a substrate contest; I-JEPA is a Transformer inside a JEPA.
domain: it
subdomain: ml
type: relation
created: 2023
status: active
importance: high
from: jepa
to: transformer
direction: symmetric
confidence: moderate
axes:
  historical: false
  structural: true
  competence: true
---

## What this is

I-JEPA (Assran et al. 2023) uses a ViT encoder — a Transformer — as its context and target encoder; the Transformer is the substrate, JEPA is the training objective. LeCun's argument is not that Transformers are architecturally wrong, but that autoregressive next-token prediction (the Transformer's dominant objective) cannot build causal world models; JEPA is the alternative objective proposal, and it currently runs on the same Transformer encoders it is positioned against.

## Claims

**JEPA-TRANSFORMER-C001** 🟢 — I-JEPA (Assran et al., CVPR 2023) uses a Vision Transformer (ViT-H/14) as both context encoder and EMA target encoder; the Transformer is not replaced by JEPA — it is used as the backbone; the JEPA contribution is the training objective (predict masked-patch embeddings from visible-patch embeddings) not the architecture; a practitioner who says "JEPA vs. Transformer" as a substrate comparison is misreading the paper

**JEPA-TRANSFORMER-C002** 🟢 — autoregressive Transformer language models (GPT, LLaMA, Claude) are trained with next-token cross-entropy prediction over discrete token sequences; I-JEPA is trained to predict continuous patch embeddings of masked regions from visible context; the two objectives produce structurally different representations: autoregressive LMs produce causal token distributions, JEPA encoders produce spatial structure representations; they have not been compared on the same benchmark at matched compute budgets

**JEPA-TRANSFORMER-C003** 🟡 — LeCun's 2022 position paper explicitly names autoregressive sequence prediction as the target of his critique: he argues that predicting every token, including unpredictable noise tokens, forces the model to model irreducible variance rather than structure; JEPA sidesteps this by predicting in embedding space, where the EMA teacher has already abstracted away unpredictable details; the critique is architectural and has not been empirically falsified at scale

**JEPA-TRANSFORMER-C004** 🟡 — V-JEPA 2 (Meta AI 2025) adds an action-prediction head to the JEPA architecture to enable robot planning; the video encoder in V-JEPA 2 is a Transformer; the extension to planning uses the Transformer's spatial representations as the world-state substrate; this is the architecture LeCun's thesis predicts should eventually replace LLM-based agents, but the evidence so far is on robotics benchmarks, not on general-purpose language or reasoning tasks

**JEPA-TRANSFORMER-C005** 🟠 — framing JEPA as "LeCun's rival to the Transformer" conflates an architectural debate with a training-objective debate: JEPA is not an architecture — it is a recipe (predict representations of masked inputs using an EMA teacher); it currently RUNS ON a Transformer; the debate between LeCun and Sutskever is about whether autoregressive scaling can give rise to planning and world-modelling, not about whether attention is a bad substrate — and that debate has not produced a decisive empirical result

**JEPA-TRANSFORMER-C006** 🟠 — autoregressive Transformers and JEPA occupy different evaluation niches: Transformers are benchmarked on language generation, reasoning, and instruction-following; JEPA is benchmarked on visual representation transfer and sample efficiency; there is currently no shared evaluation benchmark on which both have been run at matched compute — the comparison is argued from first principles, not measured from data

**JEPA-TRANSFORMER-C007** 🔴 — whether a JEPA-based model trained at frontier scale (1T+ FLOPs, large multimodal datasets) can match autoregressive Transformer-based models on language understanding or planning benchmarks is entirely open; the claim that JEPA-style representation learning scales to language is LeCun's thesis, not a demonstrated result; V-JEPA operates in the video domain and has not been evaluated as a language model

## Competence signal

A practitioner who understands this relation can state precisely what I-JEPA uses a Transformer for (encoder substrate), what JEPA changes relative to an autoregressive Transformer (the training objective, not the architecture), and why LeCun's 2022 argument does not imply that attention is wrong — it implies that next-token prediction is the wrong objective, a claim that is still contested at scale.

## Sources

- LeCun, Y. «A Path Towards Autonomous Machine Intelligence» (2022). OpenReview
- Assran, M. et al. «Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture» (I-JEPA), CVPR (2023). arXiv:2301.08243
- Bardes, A. et al. «Revisiting Feature Prediction for Learning Visual Representations from Video» (V-JEPA), Meta AI (2024). arXiv:2404.08471
- Bardes, A. et al. «V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning», Meta AI (2025)
- Vaswani, A. et al. «Attention Is All You Need», NeurIPS (2017). arXiv:1706.03762
- Dosovitskiy, A. et al. «An Image Is Worth 16×16 Words: Transformers for Image Recognition at Scale» (ViT), ICLR (2021)
