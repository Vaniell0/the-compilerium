---
id: hinton
entity: person
title: Geoffrey Hinton
capsule: The practitioner who made backpropagation matter — 1986 Nature paper, 2012 AlexNet supervision, 2015 knowledge distillation — and, in 2024, a Nobel laureate in Physics for foundational neural-network work.
domain: it
subdomain: ml
type: person
created: 1972
status: active
importance: critical
---

## Known for

- Backpropagation (1986, with Rumelhart and Williams) — not a discovery of the mathematics, but the first demonstration that it works for multilayer networks on real tasks
- Boltzmann machines (1983) — early generative models, the basis for RBM and deep belief nets
- Dropout (2014, with Srivastava et al.) — the simplest regularisation that turned out to be universally effective
- AlexNet (2012, with Krizhevsky and Sutskever) — won ImageNet by a margin that changed the industry
- Google DNNresearch acquisition (2013) — Google bought three people for ~$44M; Hinton, Krizhevsky, Sutskever
- Turing Award (2018) — jointly with LeCun and Bengio as the "fathers of deep learning"
- Left Google (May 2023) — to speak freely; not a technical fear, a governance fear

## Technologies shaped

- [Python](../docs/nodes/python.md)
- [PyTorch](../docs/nodes/pytorch.md)
- [Transformer](../docs/nodes/transformer.md)
- [Knowledge Distillation](../docs/nodes/distillation.md)

## Key decisions

**HINTON-C001** 🟢 — backprop (Rumelhart, Hinton, Williams, 1986) did not invent the mathematics of backpropagation — it was known earlier (Werbos, 1974); it showed that it works for training multilayer networks on real tasks; the difference between "mathematically correct" and "empirically works" turned out to be decisive

**HINTON-C002** 🟢 — AlexNet won ImageNet 2012 with top-5 error 15.3% vs 26.2% for the next participant; not an improvement — a regime change; two GTX 580s were a critical resource: GPU training on commodity hardware was what made the experiment possible at all

**HINTON-C003** 🟢 — Sutskever was Hinton's student in Toronto, co-author of AlexNet; later chief scientist of OpenAI, GPT-3/4, the attempt to fire Altman (2023), founded SSI (Safe Superintelligence); the line Hinton → Sutskever → GPT → OpenAI drama traces directly

**HINTON-C004** 🟠 — Hinton spent 40 years proving that neural networks work while the mainstream CS community rejected them; being right on the horizon of decades against institutional consensus is itself a claim about how scientific communities evaluate non-dominant paradigms

**HINTON-C005** 🟠 — leaving Google (2023) is commonly read as "got scared of AGI"; more accurately: he was tired and feared governance, not technology; his specific phrasing in interviews — "what Erdogan, Putin, or Trump will do with this", not the paperclip maximizer; fear of a stupid or malicious official with a powerful instrument; this is confirmed by what happened next: OpenAI lifted the ban on military use, Anthropic takes money from Amazon while holding a "safe" public position — exactly the governance failure he named

**HINTON-C006** 🟠 — Hinton and LeCun publicly disagree: LeCun considers LLMs principally limited (no world model, no causality); Hinton believes LLMs can develop "some understanding"; both received the Turing Award for deep learning — this is a disagreement within the winners' camp, not between winners and sceptics

## Sources

- Rumelhart, D., Hinton, G., Williams, R. «Learning representations by back-propagating errors», Nature (1986)
- Krizhevsky, A., Sutskever, I., Hinton, G. «ImageNet Classification with Deep Convolutional Neural Networks», NeurIPS (2012)
- MIT Technology Review: «Geoffrey Hinton tells us why he's now scared of the tech he helped build» (2023)
- Hinton, G. interview CBS News (May 2023): «I'm frightened by what I built»
