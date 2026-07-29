---
id: rwkv
entity: subject
title: RWKV
capsule: A recurrent sequence architecture that replaces the Transformer's growing KV-cache with a fixed-size WKV state updated by a delta rule — making the cost of processing one more token constant, not proportional to context length.
domain: it
subdomain: ml
type: technique
created: 2021
status: active
importance: high
---

## Timeline

- 2021 — Bo Peng (BlinkDL) publishes the first RWKV experiment on GitHub; the name stands for Receptance, Weight, Key, Value — the four learned projections in the time-mixing block
- 2023 — «RWKV: Reinventing RNNs for the Transformer Era» (Peng et al., arXiv:2305.13048): RWKV-4 trained up to 14B parameters; first peer-reviewed demonstration that a purely recurrent architecture matches Transformer perplexity at matched compute budgets
- 2023 — RWKV-5 («Eagle») introduces multi-head WKV (matrix-valued state per head); RWKV-6 («Finch») adds data-dependent decay; both expand the state update beyond the scalar-gated formula of RWKV-4
- 2024 — Linux Foundation adopts RWKV as a hosted project under the LF AI & Data umbrella; the first large community-governed open-weights RNN-class model family
- 2025 — RWKV-7 «Goose» (Peng et al., arXiv:2503.14456): state update becomes a rank-one input-dependent perturbation of the full state matrix — generalised delta rule with vector-valued gating; proven to surpass TC⁰ expressivity and to recognise all regular languages at constant depth, a complexity class barrier Transformers and diagonal-RNNs do not cross
- 2025 — RWKV World v3 corpus (3.1 T tokens, multilingual, open); RWKV-7 released at 0.19B, 0.4B, 1.5B, 2.9B on HuggingFace under the RWKV organisation; G0/G1 training runs are data-curriculum labels (G0x = <1 epoch, G1x = >1 epoch), not architectural variants
- 2025 — VisualRWKV line (BlinkDL and academic follow-ups) attaches a vision encoder before the RWKV backbone, demonstrating that the WKV state can absorb image token streams; the multimodal state is a bolt-on, not a unified format

## Ontology

- **WKV state is the load-bearing object**: at each layer, the state is a matrix of shape `[n_head, head_size, head_size]`; in RWKV-7 2.9B this is `40 × 64 × 64` per layer, 32 layers total — a fixed 10.5 MB regardless of sequence length; the Transformer's KV-cache grows linearly with context; the WKV state does not
- **Delta-rule update, not additive accumulation**: RWKV-7's update rule `S_t = S_{t-1} · (diag(w_t) + z_t^T b_t) + v_t^T k_t` couples state channels through an input-dependent low-rank perturbation; the paper frames each step as equivalent to one SGD step that trains the state to associate current keys with current values — state evolution is compute, not passive memory
- **Three learned projections per block**: time-mixing (the WKV recurrence) and channel-mixing (a pointwise feedforward) alternate in every layer; the architecture does not use self-attention; QKV in a Transformer and RWK in the time-mixing block compute different things — RWKV's R (receptance) gates whether the time-mix output is written to the residual at all
- **Token-shift as the positional mechanism**: instead of positional encodings, RWKV uses a learnable linear interpolation between the current token's embedding and the previous token's embedding before computing R, W, K, V; this is the substitute for RoPE/ALiBi and it costs one additional multiply, not a full positional encoding layer
- **Finite state is a design constraint, not a limitation to paper over**: unlike a Transformer that can in principle attend to any earlier token if the KV-cache is present, RWKV cannot revisit discarded context; this is architecturally intended — the fixed state forces compression of prior context into a summary that must carry forward what matters
- **State Tuning trains an initial WKV vector, not a trajectory**: `RWKV-PEFT` State Tuning learns a single per-layer initial WKV state prepended as a numerical prefix — it is prompt-tuning, not a training objective over state dynamics; external claims that community RWKV trains against state trajectories are false (verified against BlinkDL/RWKV-LM main branch 2026-07-25)

## Demonstrator

RWKV-7 2.9B processing a 30 000-token document uses the same fixed 10.5 MB WKV state at token 1 and at token 30 000; peak memory does not grow. A Transformer decoder-only model of similar depth, with a 4096-dimensional KV-cache across 32 layers, requires roughly `2 × 2 × 32 × 4096 × 30 000 × 2` bytes ≈ 30 GB of KV-cache in bf16 for the same sequence — it runs out of memory on consumer hardware before RWKV starts sweating. The comparison is a hardware budget story, not a quality claim: the Transformer is not wrong, it is expensive in a way RWKV is not.

## Competence

```
can_explain:  what the WKV state is and why it is constant-size;
              what the delta-rule update does that RWKV-4's scalar
              decay did not; why token-shift substitutes for
              positional encoding; what the TC⁰ expressivity result
              means for which problems RWKV-7 can and cannot solve

can_apply:    run RWKV-7 in RNN mode (one token at a time, carrying
              state forward explicitly); persist and reload state
              across turns; fine-tune with RWKV-PEFT LoRA or State
              Tuning; compare perplexity at matched compute against
              a Transformer baseline

can_extend:   design training losses over WKV state trajectories;
              implement server-side session-persistent WKV with
              snapshot/rollback semantics; apply multi-slot LoRA to
              the WKV state for working-memory width experiments;
              probe state dynamics (stable rank, RMS, delta norm)
              per-layer to test state-as-computation hypotheses

can_teach:    explain why RWKV's O(1) per-token cost is not free
              (it trades recall over long contexts for constant
              memory); explain why State Tuning is prompt-tuning and
              not trajectory training; explain the TC⁰ expressivity
              gap between RWKV-7 and diagonal-RNN / Transformer

reach:
  can_explain:  high
  can_apply:    low
  can_extend:   very low
  can_teach:    very low

key_gap: can_explain — most practitioners who have heard of RWKV
         know it is "an RNN that scales like a Transformer" but
         cannot state what the WKV state actually is, why its size
         is fixed, or what the delta-rule update computes vs. what
         RWKV-4's diagonal decay did; the constant-memory advantage
         is routinely described without the corresponding caveat
         that it comes from lossy compression of prior context
```

## Claims

**RWKV-C001** 🟢 — RWKV-7's WKV state size is fixed at `n_head × head_size × head_size` per layer regardless of sequence length; for the 2.9B World3 model this is `40 × 64 × 64 = 163 840` elements per layer, 32 layers total, approximately 10.5 MB in bf16 at any context length (Peng et al., arXiv:2503.14456, Appendix E)

**RWKV-C002** 🟢 — RWKV-7 surpasses TC⁰ expressivity and recognises all regular languages at constant depth; Theorem 2 (Appendix D.1 of arXiv:2503.14456) shows RWKV-7 solves an NC¹-complete problem under AC⁰ reductions; Transformers and diagonal-transition RNNs are limited to TC⁰ under standard complexity conjectures — this is the formal gap the delta-rule closes

**RWKV-C003** 🟢 — the standard RWKV training objective is next-token cross-entropy plus L2Wrap (a ~10⁻⁴-scale logit spike suppressor); no auxiliary state losses, contrastive terms, or reinforcement signals are part of the upstream pretrain; verified against BlinkDL/RWKV-LM `RWKV-v5/train.py` at commit 846b08c1 (2025-03-17)

**RWKV-C004** 🟡 — the RWKV-7 paper's per-step framing («equivalent to a single SGD step that trains the state to output desired values for current keys») invites a stronger reading: that multi-token state evolution accumulates SGD-like optimisation across a sequence; this sequence-scope extension is not stated in the paper (§2 confines the claim to a single step) and has not been empirically measured in the literature

**RWKV-C005** 🟠 — both RWKV and the Transformer have state, but the states are different in kind: the Transformer KV-cache grows with every token and is never updated — past key-value pairs are written once and retrieved verbatim; the RWKV WKV state stays constant-size and is updated at every token via the delta rule; calling KV-cache «recurrence» collapses a distinction that matters for memory cost, for what the model can revisit, and for how context compression happens

**RWKV-C006** 🟠 — the WKV state functions structurally as a compressed world model of the token neighbourhood encountered so far: it encodes associations between keys and values the model has seen, weighted by learned decay; whether this compression retains the semantic structure needed for long-horizon planning — not just next-token prediction — is an architectural bet that current benchmarks do not cleanly test; the argument is plausible from the delta-rule framing but is not demonstrated at frontier scale

**RWKV-C007** 🟠 — for agents requiring long-horizon planning, RWKV's finite state is arguably a better fit than a Transformer with external memory: the state is continuously updated and never grows; the Transformer with a retrieval augment requires cache management, retrieval latency, and a context assembly step that must fit within the quadratic attention budget; this framing is coherent but depends on the state compression being semantically faithful across the relevant horizon, which is not the same as being memory-efficient

**RWKV-C008** 🔴 — whether a fixed-size WKV state can sustain the semantic compression needed for long-horizon planning at frontier-model scale is an open question; at high context densities (many semantically distinct events per token budget), the fixed state may lose critical associations that a growing KV-cache would preserve verbatim; current evidence is favourable at moderate context lengths but the regime where compression breaks is not characterised

## Relations

- [RWKV vs Transformer](../relations/rwkv__transformer.md)
- [RWKV and world models](../relations/rwkv__world-models.md)
- Nodes: [Transformer](transformer.md) — RWKV is the primary sub-quadratic alternative discussed in TRANSFORMER-C007 and TRANSFORMER-C008
- Nodes: [JEPA](jepa.md) — both JEPA and RWKV engage the «world model» framing from different angles; JEPA predicts in representation space, RWKV compresses context into recurrent state

## Sources

- Peng, B. et al. «RWKV: Reinventing RNNs for the Transformer Era», EMNLP (2023). arXiv:2305.13048
- Peng, B. et al. «RWKV-7 "Goose" with Expressive Dynamic State Evolution» (2025). arXiv:2503.14456v2
- BlinkDL/RWKV-LM GitHub repository. Commit 846b08c1 (2025-03-17). https://github.com/BlinkDL/RWKV-LM
- JL-er/RWKV-PEFT. State Tuning implementation. https://github.com/JL-er/RWKV-PEFT
- RWKV community-map.md, noesis project (Vaniell0/noesis, 2026-07-25) — boundary between community RWKV and noesis-specific extensions; used to scope what belongs in this node
