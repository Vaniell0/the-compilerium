---
id: attention-is-all-you-need
entity: research
title: "Attention Is All You Need"
capsule: The Transformer's all-attention architecture evidences that parallelism over tokens, not improved context understanding, is why the architecture replaced LSTM.
domain: it
subdomain: ml
type: paper
created: 2017
status: published
importance: critical
authors: [Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin]
year: 2017
venue: NeurIPS 2017
url: https://arxiv.org/abs/1706.03762
supports: [TRANSFORMER-C001, TRANSFORMER-C002, TRANSFORMER-C005, BENGIO-C002]
challenges: []
confidence: strong
---

## What this is

Eight authors from Google Brain/Research proposed the Transformer architecture built entirely on self-attention without recurrence or convolutions; NeurIPS 2017; most authors subsequently left Google and founded AI companies.

## Why it matters here

TRANSFORMER-C001: the paper demonstrates parallelism as the main advantage — all tokens are processed simultaneously, so GPU utilisation rose qualitatively compared to LSTM. TRANSFORMER-C002: eight authors, most of whom founded independent AI companies — one paper drained the team that wrote it. TRANSFORMER-C005: the paper's load-bearing components (attention, 2-layer MLP, LayerNorm, residual, positional encoding) are all present; the title is a marketing choice, not a complete component list. BENGIO-C002: soft attention 2014 (Bahdanau, Cho, Bengio) is directly cited as the precursor; the architectural line traces explicitly.
