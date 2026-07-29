---
id: distillation
entity: subject
title: Knowledge Distillation
capsule: A training recipe that regularises a small network via a larger network's softened output probabilities — not a compression technique, and not a transfer of knowledge; the big model still had to be trained first.
domain: it
subdomain: ml
type: technique
created: 2006
status: active
importance: high
---

## Timeline

- 2006 — Buciluă, Caruana, Niculescu-Mizil «Model Compression» (KDD): first systematic method for training a small network to mimic an ensemble; the term «distillation» is not yet used
- 2014/2015 — Hinton, Vinyals, Dean «Distilling the Knowledge in a Neural Network» (NIPS 2014 Workshop, arXiv:1503.02531): softmax with temperature T > 1 as the transfer mechanism; names «dark knowledge»; teacher-student framing formalised
- 2015 — FitNets (Romero et al.): distillation via intermediate feature maps, not only final outputs
- 2019 — DistilBERT (Sanh et al., Hugging Face): BERT 110 M → 66 M parameters; 97% of BERT's GLUE score; 60% faster at inference; the canonical production worked example
- 2021 — DINO (Caron et al., Meta): self-distillation without labelled data; the teacher is an exponential moving average of the student weights
- 2021 — Knowledge Distillation Survey (Gou et al., IJCV): taxonomy of response-based / feature-based / relation-based approaches

## Ontology

- **Teacher / student**: the teacher is a large pretrained network whose outputs are used as training signal; the student is a smaller network trained from scratch to match those outputs; neither model transfers weights — only the output distribution is shared
- **Soft labels via temperature softmax**: at temperature T > 1 the teacher's output probability distribution spreads across all classes rather than concentrating on the argmax; a teacher outputting «cat 0.8, dog 0.15, chair 0.001» tells the student that cats resemble dogs more than chairs — information absent from a hard «cat» label
- **Three distillation regimes**: response-based (match logits), feature-based (match intermediate activations), relation-based (match pairwise similarity between examples); these are engineering choices, not a progression
- **Teacher absent at inference**: after training, only the student is deployed; the teacher's parameters are not stored in the final model or archive — they are discarded
- **Self-distillation**: teacher = a moving average or dropout ensemble of the student itself (DINO, BYOL); no pretrained teacher is required; same regularisation mechanism via softer targets

## Demonstrator

DistilBERT: a 66 M parameter network that retains 97% of BERT-base's GLUE score. The thesis is that soft labels carry class-similarity information hard labels do not. The proof is that you cannot reach that performance by training 66 M parameters on the same hard-labelled data — the gap is precisely what soft-label supervision provides (Sanh et al. 2019 report this comparison directly).

## Competence

```
can_explain:  what soft labels are; why temperature T > 1 spreads the
              distribution; why the teacher is absent at inference;
              difference between response-based and feature-based distillation

can_apply:    teacher-student training loop with KL divergence on soft outputs;
              temperature hyperparameter selection; feature-map distillation
              via MSE on intermediate layers

can_extend:   self-distillation (DINO-style EMA teacher);
              cross-modal distillation (video teacher → image student);
              distillation combined with quantisation for edge deployment

can_teach:    can explain why a student trained with soft labels outperforms
              the same architecture trained without them — and why this does
              not mean "knowledge was transferred"

reach:
  can_explain:    moderate
  can_apply:      low
  can_extend:     very low
  can_teach:      very low

key_gap: can_explain — most practitioners know "distillation = small copies
         large"; few can state what soft labels add over hard labels, or know
         that the teacher is absent at inference
```

## Claims

**DISTILLATION-C001** 🟢 — Hinton, Vinyals, and Dean (2015) showed that a soft probability distribution over all classes at T > 1 carries similarity information absent from hard labels: a teacher assigning «cat 0.8, dog 0.15» tells the student that cats and dogs share structure; a student trained on these soft targets outperforms the same architecture trained on hard labels

**DISTILLATION-C002** 🟢 — DistilBERT (Sanh et al. 2019) retained 97% of BERT-base's GLUE score at 40% smaller parameter count and 60% faster inference; this is the canonical measurement showing distillation scales to large pretrained language models

**DISTILLATION-C003** 🟡 — cross-modal distillation generalises the teacher-student pattern to different input domains: a large video-trained teacher can supply soft feature-map targets to a smaller image-only student; whether the performance gap relative to supervised training remains consistent across modalities is not yet systematically characterised

**DISTILLATION-C004** 🟠 — «distillation compresses a model» is a category error: distillation trains a new, smaller model from scratch using soft labels; the large teacher still had to be trained, and its training cost is unchanged; distillation only lowers inference cost — and only if you had already paid to train the teacher

**DISTILLATION-C005** 🟠 — «distillation transfers knowledge» is a misleading framing: the mechanism is regularisation via softer targets, not transport of a substance; the student learns from the shape of the teacher's output distribution, the same way a student trained on label-smoothed hard targets learns from a gentler gradient signal

**DISTILLATION-C006** 🟠 — DistilBERT's 97% GLUE performance at 40% size is remarkable but not characteristic of distillation in general: BERT is a classification-dominated benchmark suite with aligned label spaces; distilling open-ended generative models (GPT-scale, instruction-tuned LLMs) is substantially harder because there is no fixed output space to soften, and the evidence for equivalent soft-label gains is thinner

**DISTILLATION-C007** 🔴 — how far the student can be shrunk before soft-label supervision stops compensating for lost capacity is not characterised; DistilBERT's 40% reduction is an empirical data point, not a known bound, and whether it generalises across architectures and task types is an open question

## Relations

- People: [Geoffrey Hinton](../../people/hinton.md)

## Sources

- Buciluă, C., Caruana, R., Niculescu-Mizil, A. «Model Compression», KDD (2006)
- Hinton, G., Vinyals, O., Dean, J. «Distilling the Knowledge in a Neural Network», NIPS Deep Learning Workshop (2014) / arXiv:1503.02531
- Sanh, V. et al. «DistilBERT, a distilled version of BERT», arXiv:1910.01108 (2019)
- Romero, A. et al. «FitNets: Hints for Thin Deep Nets», ICLR (2015)
- Caron, M. et al. «Emerging Properties in Self-Supervised Vision Transformers» (DINO), ICCV (2021)
- Gou, J. et al. «Knowledge Distillation: A Survey», IJCV (2021)
