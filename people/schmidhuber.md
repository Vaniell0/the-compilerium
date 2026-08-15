---
id: schmidhuber
entity: person
title: Jürgen Schmidhuber
capsule: The IDSIA director whose LSTM (1997) became the dominant sequence model for a decade — and whose sustained priority-claim campaign forced the field to confront how credit is assigned in deep learning.
domain: it
subdomain: ml
type: person
created: 1963
status: active
importance: high
---

## Known for

- LSTM (1997, with Sepp Hochreiter) — Long Short-Term Memory; solved the vanishing-gradient problem in RNNs; remained the state-of-the-art sequence model from ~2013 through ~2017 for speech, translation, and handwriting recognition
- Highway Networks (2015, with Srivastava and Greff) — introduced gated shortcut connections in deep networks; published months before residual networks (He et al., 2015); Schmidhuber has argued priority for the residual-connection idea
- Connectionist Temporal Classification (CTC, 2006, with Graves et al.) — enabled end-to-end training of sequence-to-sequence models without pre-segmented data; used in early speech recognition systems at Google and Baidu
- Neural Turing Machines / memory-augmented networks — theoretical work at IDSIA on differentiable memory in the 1990s, predating similar architectures by a decade
- GAN priority dispute — Schmidhuber has publicly claimed that his 1990s work on "Generative Adversarial Networks" predates Goodfellow's 2014 paper; the claim is contested
- Turing Award omission controversy — Schmidhuber has contested the 2018 Turing Award given to Hinton, LeCun, and Bengio without including him, citing LSTM and other contributions

## Technologies shaped

- [Transformer](../docs/nodes/transformer.md)

## Key decisions

**SCHMIDHUBER-C001** 🟢 — LSTM (Hochreiter and Schmidhuber, 1997) was published in Neural Computation with a mathematical analysis of the vanishing-gradient problem; the paper was largely ignored for 15 years and then became the most-cited RNN architecture in history once GPU training made it practical; the gap between publication (1997) and widespread adoption (~2013) is a documented case of correct-but-premature research

**SCHMIDHUBER-C002** 🟢 — Highway Networks (Srivastava, Greff, Schmidhuber, ICML 2015) introduced gated skip connections; ResNets (He et al., CVPR 2016) dropped the gating and achieved better empirical results; whether this constitutes priority for the residual-connection idea is debated, but the temporal sequence is documented

**SCHMIDHUBER-C003** 🟠 — Schmidhuber chose to prosecute priority disputes publicly and persistently (blog posts, conference talks, open letters); this is unusual in academic culture, where priority is typically adjudicated by citation; the strategy made him a controversial figure but also forced citation practices in deep learning to become more historically careful

**SCHMIDHUBER-C004** 🟠 — running IDSIA as a European lab outside the US academic-industry pipeline (no Google Brain, no OpenAI affiliation) meant that LSTM's commercialisation was captured by others; Schmidhuber's complaints about credit may partly reflect that institutional affiliation, not just publication date, determines who receives the public narrative

## Sources

- Hochreiter, S., Schmidhuber, J. «Long Short-Term Memory», Neural Computation 9(8) (1997)
- Srivastava, R.K., Greff, K., Schmidhuber, J. «Training Very Deep Networks», NeurIPS (2015)
- Graves, A., Fernández, S., Gomez, F., Schmidhuber, J. «Connectionist Temporal Classification», ICML (2006)
- Schmidhuber, J. «Critique of Honda Prize for Dr. Hinton» and related public statements (2020–): https://people.idsia.ch/~juergen/
- Schmidhuber, J. «Deep Learning in Neural Networks: An Overview», Neural Networks (2015)
