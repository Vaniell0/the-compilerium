---
id: sutskever
entity: person
title: Ilya Sutskever
capsule: AlexNet co-author, seq2seq inventor, OpenAI co-founder and Chief Scientist through the GPT lineage; departed 2024 to build Safe Superintelligence.
domain: it
subdomain: ml
type: person
created: 2012
status: active
importance: high
---

## Known for

- AlexNet (2012): co-author with Krizhevsky and Hinton; top-5 error 15.3% vs 26.2% for second place — the start of the deep learning revolution
- seq2seq LSTM (Sutskever, Vinyals, Le 2014): encoder-decoder for machine translation; direct ancestor of LLMs before the Transformer
- «Distilling the Knowledge in a Neural Network» (Hinton, Vinyals, Dean 2015): co-author; formalisation of knowledge distillation
- Co-founder of OpenAI (December 2015); Chief Scientist until May 2024
- GPT lineage (GPT-1 → GPT-4): scientific leadership of the programme under the thesis «scaling works»
- November 2023: a key figure in the OpenAI board's attempt to remove Sam Altman; publicly recanted within days
- Founder of Safe Superintelligence Inc. (SSI, June 2024) with Daniel Gross and Daniel Levy
- PhD under Geoffrey Hinton (University of Toronto, 2013): «Training Recurrent Neural Networks»

## Technologies shaped

- [Transformer](../docs/nodes/transformer.md)
- [PyTorch](../docs/nodes/pytorch.md)

## Key decisions

**SUTSKEVER-C001** 🟢 — AlexNet (2012) won ImageNet with a top-5 error gap of 15.3% vs 26.2% — not just a victory, but a margin of half; Sutskever was co-author with Krizhevsky and Hinton; one paper launched the investment and research boom that led to modern AI

**SUTSKEVER-C002** 🟢 — seq2seq LSTM (2014) — Sutskever, Vinyals, Le — introduced the encoder-decoder architecture for arbitrary sequence-to-sequence tasks; before the Transformer this was the machine translation standard; ideologically the direct ancestor of LLMs: «read everything, then generate»

**SUTSKEVER-C003** 🟢 — «Distilling the Knowledge in a Neural Network» (Hinton, Vinyals, Dean 2015) — Sutskever was among the co-authors; the paper introduced temperature softmax for soft labels and the term knowledge distillation as a distinct method; Lumina V6 (V-JEPA teacher → 185K student) is a direct application

**SUTSKEVER-C004** 🟠 — Sutskever: «next-token prediction is sufficient for understanding» — the argument: accurate prediction of arbitrary text is impossible without building a causal model of the world inside the network; this is the direct opposite of LeCun's position («autoregressive is principally limited»); the main open architectural debate in AI

**SUTSKEVER-C005** 🟠 — November 2023: Sutskever supported the board in firing Altman, then within days publicly recanted and apologised; six months later he left and founded SSI — an organisation where safety cannot be «an add-on» to product; this is the behaviour of a person convinced of AGI proximity who believes that late-era OpenAI misprioritised

**SUTSKEVER-C006** 🟡 — Hinton → Sutskever → GPT → ChatGPT → AGI race: one academic lineage (Toronto neuroscience → deep learning betting → OpenAI → GPT programme) explains more about the architecture of the current AI landscape than any corporate narrative; SSI is a continuation of the same bet but in isolation from product pressure

## Sources

- Krizhevsky, A., Sutskever, I., Hinton, G. «ImageNet Classification with Deep Convolutional Neural Networks», NeurIPS (2012)
- Sutskever, I., Vinyals, O., Le, Q. «Sequence to Sequence Learning with Neural Networks», NeurIPS (2014)
- Hinton, G., Vinyals, O., Dean, J. «Distilling the Knowledge in a Neural Network» (2015)
- Brown, T. et al. «Language Models are Few-Shot Learners» (GPT-3), NeurIPS (2020)
- Safe Superintelligence Inc. manifesto: ssi.inc (2024)
