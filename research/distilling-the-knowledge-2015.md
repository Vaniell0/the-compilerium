---
id: distilling-the-knowledge-2015
entity: research
title: "Distilling the Knowledge in a Neural Network"
capsule: Hinton 2015 formalises temperature softmax as the mechanism by which soft labels carry structural similarity information absent from hard labels.
domain: it
subdomain: ml
type: paper
created: 2015
status: published
importance: high
authors: [Hinton, Vinyals, Dean]
year: 2015
venue: NeurIPS 2014 Workshop
url: https://arxiv.org/abs/1503.02531
supports: [DISTILLATION-C001, DISTILLATION-C002, SUTSKEVER-C003]
challenges: []
confidence: strong
---

## What this is

«Distilling the Knowledge in a Neural Network», Hinton, Vinyals, Dean (2015): formalisation of knowledge distillation — soft labels at temperature T > 1 reveal «dark knowledge» (the structure of similarity between classes); a student trained on the teacher's soft outputs outperforms a student trained on hard labels; co-author — Oriol Vinyals (Google Brain, later DeepMind AlphaStar).

## Why it matters

DISTILLATION-C001: primary source for the thesis that soft labels carry structural information absent in hard labels; softmax temperature as a mechanism of «softening» the distribution. DISTILLATION-C003: Lumina V6 feature distillation — direct inheritance of this framework (cross-modal, cross-scale variant). SUTSKEVER-C003: Sutskever is among the co-authors via Vinyals; seq2seq (Sutskever, Vinyals, Le 2014) and distillation (Hinton, Vinyals, Dean 2015) belong to one collaborative cluster.
