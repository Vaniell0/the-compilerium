---
id: ts-zip
entity: subject
title: ts_zip
capsule: A file compressor that turns a language model into an arithmetic coder — the clean demonstration that "predict the next token" and "compress the text" are the same operation, not two related ideas.
domain: it
subdomain: ml
type: tool
created: 2021
status: active
importance: high
---

## Timeline

- 1948 — Shannon: information content of a symbol equals −log₂ P(symbol); a probability model IS a compression scheme
- 1976 — Rissanen / Pasco: arithmetic coding — encodes any sequence at the entropy limit given a probability model, without needing to know the model's structure
- 2019 — Bellard releases NNCP: first neural compressor to top the Large Text Compression Benchmark; establishes the neural-compressor category
- 2021 — Bellard releases ts_zip: pairs a small transformer LM with arithmetic coding, ships as a practical CLI, not a benchmark experiment
- 2024 — ts_zip current build (2024-03-02) switches the LM to RWKV-4 169M, quantised to 8-bit, evaluated in BF16; GPU-mandatory, ~1 MB/s on RTX 4090
- 2024 — NNCP v3.3 (June 2024): Transformer backbone; leads the Large Text Compression Benchmark, beating hand-tuned classical compressors on enwik9

## Ontology

- The LM is a probability engine, not a magic box: at each byte position it outputs P(next_token | context); the arithmetic coder consumes those probabilities and emits bits close to the theoretical minimum
- Compression ratio IS perplexity: bits written per byte equals the LM's cross-entropy on the file plus a small arithmetic-coder overhead — one number, two names
- Symmetric decoder: the same LM weights are needed to decompress; the model is a shared codebook between sender and receiver, not part of the archive
- Frozen model at compress time: no learning during compression — the intelligence was baked in at training; ts_zip only reads out probabilities that already exist
- Ratio is bounded by what the LM understands: text whose structure the LM has seen compresses well, uniform noise does not compress at all (a competent LM outputs near-uniform probabilities on random bytes and the coder cannot do better than the raw input)

## Competence

```
can_explain:   understands that a language model IS a compressor;
               can state Shannon's identity in one sentence and
               name arithmetic coding as the missing bridge

can_apply:     compiles ts_zip and compresses a file; understands
               the model must be present at both ends

can_extend:    retrains the underlying LM on a target text domain
               to shift the compression ratio; understands why
               domain-tuned LMs beat general ones at compression

can_teach:     walks a listener from "next-token prediction" to
               "bits per byte" as the same number, and shows why
               perplexity IS the ratio, not just correlated with it

reach:
  can_explain:  very low
  can_apply:    very low
  can_extend:   very low
  can_teach:    very low

key_gap: can_explain — most people who hear "LLM as compressor" never run the tool; the identity stays a slogan instead of a working intuition
```

## Claims

**TS-ZIP-C001** 🟢 — the 2024-03-02 build uses RWKV-4 169M quantised to 8-bit as the language model — a network smaller than a smartphone browser compresses text better than any classical compressor

**TS-ZIP-C002** 🟢 — on enwik8 ts_zip reaches 1.106 bits per byte versus xz's 1.989; on enwik9, 1.084 versus 1.707 — the LLM roughly halves the compressed size of natural-language text compared to the industry-standard classical tool

**TS-ZIP-C003** 🟢 — the mechanism is Shannon 1948 plus arithmetic coding 1976 plus a modern LM — no new invention, only new components in a very old identity

**TS-ZIP-C004** 🟠 — ts_zip is the cleanest counter-example to «LLM is a magic prediction toy»: the same probabilities that let a chatbot guess the next word compress the file behind it, and the ratio proves the guessing works

**TS-ZIP-C005** 🟡 — Bellard's switch from transformer to RWKV in the current build fits the access pattern: compression reads probabilities one byte at a time, and RWKV's constant-cost-per-token profile matches that shape better than a transformer that recomputes over a growing context

**TS-ZIP-C006** 🟠 — ts_zip is impractical as a daily-driver replacement for xz (GPU-mandatory, ~1 MB/s) — it is a demonstrator of an identity, not a product; treating it as a product misses the point Bellard is making

**TS-ZIP-C007** 🔴 — whether the identity «better predictor = better compressor» extends to non-text modalities in a useful way is open — image and audio compression already use domain-specific probability models, but a general multimodal LM has not yet been shown to beat them at their own game

## Relations

- (none yet — future: ts-zip ↔ rwkv, ts-zip ↔ transformer, ts-zip ↔ distillation)

## Sources

- Bellard, F. ts_zip. bellard.org/ts_zip/ (accessed 2026-07-28)
- Bellard, F. NNCP: Lossless Data Compression with Neural Networks. bellard.org/nncp/
- Shannon, C. E. (1948). «A Mathematical Theory of Communication». Bell System Technical Journal
- Rissanen, J. (1976). «Generalized Kraft Inequality and Arithmetic Coding». IBM J. Res. Dev.
- Large Text Compression Benchmark. mattmahoney.net/dc/text.html
- Peng, B. et al. (2023). «RWKV: Reinventing RNNs for the Transformer Era». arXiv:2305.13048
