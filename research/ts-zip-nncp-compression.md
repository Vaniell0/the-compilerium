---
id: ts-zip-nncp-compression
entity: research
title: "ts_zip and NNCP: LLM-based lossless text compression"
capsule: Bellard's two compressors ship the identity "language model = compressor" as running code — with published ratios that halve xz on natural-language text and beat the hand-tuned classical state of the art on enwik9.
domain: it
subdomain: ml
type: project
created: 2019
status: published
importance: high
authors: [Bellard, F.]
year: 2024
venue: bellard.org
url: https://bellard.org/ts_zip/
supports: [TS-ZIP-C001, TS-ZIP-C002, TS-ZIP-C003, TS-ZIP-C005, BELLARD-C003, BELLARD-C004]
challenges: []
confidence: strong
---

## What it says

Two neural compressors by Fabrice Bellard. ts_zip (2021; 2024-03-02 build uses RWKV-4 169M quantised to 8-bit) reaches 1.106 bpb on enwik8 and 1.084 bpb on enwik9 — versus xz's 1.989 and 1.707 respectively. NNCP (2019; v3.3 June 2024, Transformer backbone) reaches 0.853 bpb on enwik9, beating CMIX v19 (the previous classical state of the art at 0.892 bpb). Mechanism in both: language model emits P(next_token | context); arithmetic coder writes bits close to the entropy limit of that distribution.

## Why it matters here

TS-ZIP-C001, TS-ZIP-C002, TS-ZIP-C003: the ratios and the model size are the evidence for "LLM is a compressor" as an operational identity, not a philosophical analogy — a 169 M-parameter network really does halve xz on natural-language text using arithmetic coding, no additional trick required. TS-ZIP-C005: Bellard's move from transformer to RWKV in the 2024 build is the concrete signal that constant-cost-per-token inference matters when the consumer of probabilities reads them one byte at a time. BELLARD-C003 (single-handed AI infrastructure) and BELLARD-C004 (living counter-example to "infrastructure requires teams") upgrade from arguable pattern to verifiable fact once TS-ZIP-C001..C003 are on the board — one person shipped both compressors, one of them leads the public benchmark.

## Sources

- ts_zip page: https://bellard.org/ts_zip/ — ratios (1.106 / 1.084 bpb on enwik8 / enwik9), RWKV-4 169M 8-bit quantised, GPU-mandatory, 1 MB/s on RTX 4090
- NNCP page: https://bellard.org/nncp/ — v3.3 June 2024, Transformer, 0.853 bpb on enwik9 (compressed size 106.6 MB), 1.19 bpb on enwik8, LibNC over PyTorch
- Large Text Compression Benchmark: https://mattmahoney.net/dc/text.html — public ranking, hosts NNCP's enwik9 result and the classical baselines
- Peng, B. et al. (2023). «RWKV: Reinventing RNNs for the Transformer Era». arXiv:2305.13048 — the underlying model architecture used in ts_zip's current build
- Shannon, C. E. (1948). «A Mathematical Theory of Communication». Bell System Technical Journal — foundational identity between probability model and compressor
