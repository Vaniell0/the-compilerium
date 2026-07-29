---
id: lecun
entity: person
title: Yann LeCun
capsule: CNN pioneer at Bell Labs; Meta's chief AI scientist; the leading dissident against pure autoregressive scaling with his JEPA proposal for world-model learning.
domain: it
subdomain: ml
type: person
created: 1987
status: active
importance: high
---

## Known for

- LeNet-5 (1998): CNN for recognising handwritten digits; in production at American banks in the 90s
- Turing Award 2018 jointly with Hinton and Bengio
- JEPA (Joint Embedding Predictive Architecture, 2022+): prediction in representation space, not pixels
- V-JEPA, V-JEPA 2 (2024–2025): video self-supervised learning without decoding
- VP & Chief AI Scientist Meta; professor at NYU
- Key role in Meta's decision to release Llama 2/3 as open-weight

## Technologies shaped

- [Transformer](../docs/nodes/transformer.md)
- [PyTorch](../docs/nodes/pytorch.md)
- [JEPA](../docs/nodes/jepa.md)

## Key decisions

**LECUN-C001** 🟢 — LeNet-5 (1998) was architecturally correct; AlexNet (2012) did not invent CNN — it proved that the architecture lacked compute and data, not the idea; LeCun waited 14 years for confirmation

**LECUN-C002** 🟢 — JEPA predicts in latent space, not in pixel space; this removes the need to model all input noise — only structure; V-JEPA is used as a distillation teacher in Lumina (feature space from V-JEPA → compact student 185K)

**LECUN-C003** 🟠 — LeCun publicly argues that autoregressive next-token prediction is architecturally limited: the model does not build a world model, does not plan, does not understand causality; Sutskever argues the opposite ("next-token prediction is sufficient for understanding"); this is the main open architectural debate in AI

**LECUN-C004** 🟠 — the Turing Award 2018 went to three people with principally different views on AI risks: LeCun ("AI is not dangerous, people with it are dangerous"), Hinton (governance fear, left Google), Bengio (methodical policy engagement); one award, three incompatible positions on the consequences of what they did

**LECUN-C005** 🟡 — LeCun insists that video > text as a training signal: the volume of information in one second of video is incomparable with text, and it is on sensory density that animals and children learn; V-JEPA is the operationalisation of this thesis; if he is right, LLMs are trained on a principally impoverished signal

## Sources

- LeCun, Y. et al. «Gradient-Based Learning Applied to Document Recognition», IEEE (1998)
- LeCun, Y. «A Path Towards Autonomous Machine Intelligence» (2022, position paper)
- Meta AI: «V-JEPA: Video Joint Embedding Predictive Architecture» (2024)
- Turing Award 2018: acm.org/about/2018-turing
