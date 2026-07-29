---
id: bengio
entity: person
title: Yoshua Bengio
capsule: Deep-learning theorist whose 1990s attention-mechanism work anticipated the transformer, later a leading voice on AI existential safety.
domain: it
subdomain: ml
type: person
created: 1991
status: active
importance: high
---

## Known for

- Word embeddings (2003, JMLR): distributed representations of words in a neural language model — 9 years earlier than Word2Vec
- Soft attention in seq2seq (Bahdanau, Cho, Bengio 2014): direct architectural ancestor of the Transformer
- GAN (Goodfellow et al. 2014): Goodfellow was his student
- Formalization of the vanishing gradient problem (1994): theoretical basis for LSTM and GRU
- Deep Learning textbook (Goodfellow, Bengio, Courville 2016): academic standard
- Turing Award 2018 jointly with Hinton and LeCun
- Founder of Mila (Quebec AI Institute): the largest academic AI institute in the world
- Chair of the International Scientific Report on AI Safety (2023+)

## Technologies shaped

- [Transformer](../docs/nodes/transformer.md)
- [PyTorch](../docs/nodes/pytorch.md)

## Key decisions

**BENGIO-C001** 🟢 — «Neural Probabilistic Language Model» (2003) introduced continuous word representations in a neural language model — what would later be called word embeddings; Word2Vec (Mikolov 2013) is a more efficient implementation of the same idea; GPT owes Bengio 2003 as much as Transformer owes attention 2014

**BENGIO-C002** 🟢 — Bahdanau, Cho, Bengio (2014): soft attention in an encoder-decoder RNN for translation — «learn to align input and output words via learnable weights»; this is the direct conceptual precursor to self-attention in Transformer; without the 2014 paper there is no "Attention is All You Need" 2017

**BENGIO-C003** 🟠 — In 2023 Bengio took a third position in the AI safety debate: not "everything is fine" (LeCun) and not "I'm tired and I quit" (Hinton), but methodical policy engagement — International AI Safety Report, testimony before the US Senate, EU, UK Parliament; an academic researcher takes public responsibility for the consequences of his field

**BENGIO-C004** 🟠 — Bengio deliberately remained in an academic position (Mila, non-profit) declining numerous corporate offers; his argument: open academic science is a necessary counterweight to closed industrial labs; this is a governance choice, not a career one

**BENGIO-C005** 🟡 — «Learning Long-Term Dependencies with Gradient Descent is Difficult» (1994) formalised vanishing gradient as a mathematical problem; LSTM (1997) is the engineering answer by Hochreiter & Schmidhuber; Transformer (2017) is an architectural bypass: remove recursion instead of fighting its consequences

## Sources

- Bengio, Y. et al. «A Neural Probabilistic Language Model», JMLR (2003)
- Bahdanau, D., Cho, K., Bengio, Y. «Neural Machine Translation by Jointly Learning to Align and Translate», arxiv 1409.0473 (2014)
- Goodfellow, I., ..., Bengio, Y. «Generative Adversarial Networks», NeurIPS (2014)
- Bengio, Y., Simard, P., Frasconi, P. «Learning Long-Term Dependencies with Gradient Descent is Difficult», IEEE (1994)
- International AI Safety Report: gov.uk/government/publications/international-scientific-report-on-the-safety-of-advanced-ai
