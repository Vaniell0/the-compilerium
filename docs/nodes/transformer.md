---
id: transformer
entity: subject
title: Transformer
capsule: A neural-network architecture built from dot products and MLPs — not a new kind of AI, not a brain analogue — that won because it parallelises across tokens on a GPU, and whose O(n²) memory cost is the load-bearing constraint that every successor architecture tries to escape.
domain: it
subdomain: ml
type: technique
created: 2017
status: active
importance: critical
---

## Timeline

- 1997 — LSTM (Hochreiter & Schmidhuber): gating to fight vanishing gradient; the standard sequence model for the next 20 years
- 2014 — soft attention for encoder-decoder translation (Bahdanau, Cho, Bengio): first attention mechanism as a weighted sum over encoder states; computationally limited because it ran on top of an RNN
- 2017 — «Attention Is All You Need» (Vaswani et al., Google Brain/Research): 8 authors; replaces all recurrence with self-attention; NeurIPS 2017; arXiv:1706.03762
- 2018 — BERT (Devlin et al., Google): encoder-only; masked language model pretraining; bidirectional attention
- 2018 — GPT-1 (OpenAI): decoder-only; causal (autoregressive) mask; language model pretraining
- 2019 — T5 (Raffel et al., Google): encoder-decoder; unified text-to-text framing
- 2020 — GPT-3: 175B parameters; Kaplan et al. scaling laws show predictable improvement with compute; decoder-only dominance begins
- 2020 — ViT (Dosovitskiy et al., Google): image patches as tokens; Transformer for vision without convolutions
- 2022 — FlashAttention (Dao et al.): IO-aware reordering of matrix operations; no change to the mathematics; 2–4× memory savings, 2–4× wallclock speedup on long sequences
- 2023 — LLaMA (Touvron et al., Meta): open decoder-only family; makes large-scale decoder-only training reproducible outside hyperscalers
- 2023 — Mamba (Gu & Dao): state space model with selective scan; sub-quadratic alternative; first architecture competitive with Transformers at scale

## Ontology

- **What self-attention computes**: Q, K, V = three learned linear projections of each input token; score = softmax(QKᵀ / √d_k) · V; for every position this is a weighted sum over all other positions; not recursion, not a search — a weighted average
- **Multi-head = parallel attention channels**: h heads each run in a reduced dimension (d_k = d_model / h); the architecture concatenates their outputs; each head can attend to a different relational pattern, but calling them "syntax head" or "coreference head" is retrospective interpretation, not design
- **The MLP is half the compute**: each attention layer is followed by a two-layer feedforward network with expansion factor 4; the "attention is all you need" title is a paper marketing choice — attention, MLP, LayerNorm, residual connections, and positional encoding are all load-bearing
- **Positional encoding patches a structural gap**: self-attention is permutation-invariant by construction; position information is added back explicitly — sinusoidal (original), learned (BERT), RoPE (relative, current standard), ALiBi (no added vectors); the need for positional encoding is a design cost, not a feature
- **Three deployment variants**: encoder-only (BERT, bidirectional attention) for classification; decoder-only (GPT, LLaMA, causal mask) for generation; encoder-decoder (T5) for conditioned generation; post-2020 practice is almost entirely decoder-only for language
- **O(n²) is the structural price**: attention computes n² pairs for a sequence of length n; this is fine for short sequences; for long sequences it is the memory bottleneck (FlashAttention attacks the memory-access pattern), the compute bottleneck (RWKV, Mamba, RetNet attack the arithmetic), or both

## Demonstrator

A 2017-era Transformer trained on a translation task generates sequences by running Q, K, V projections across all tokens in a single GPU kernel — the entire batch of 32 or 64 sequences proceeds in parallel, with no loop over time steps. Contrast against an LSTM on the same task: the hidden state at step t depends on step t-1; the GPU sits at ~30% utilisation waiting for the sequential dependency to resolve. The architecture switch is observable as a 3× GPU utilisation improvement with no change to the training data or objective. This is what "parallelism" means in TRANSFORMER-C001.

## Competence

```
can_explain:    what the Q/K/V dot-product computes;
                why positional encoding is needed;
                why O(n²) matters for long sequences;
                why the win over LSTM was parallelism, not expressiveness

can_apply:      implement scaled dot-product attention from scratch;
                implement multi-head attention and a Pre-LN residual block;
                choose encoder-only vs decoder-only for a task type

can_extend:     FlashAttention memory layout; RoPE vs sinusoidal;
                custom positional encodings for graph-structured inputs;
                attention pooling vs CLS for sequence-level representations

can_teach:      explain the O(n²) bottleneck and when it is and isn't binding;
                explain why ViT needs more data than a CNN;
                explain why "attention is thinking" is wrong

reach:
  can_explain:    high
  can_apply:      low
  can_extend:     very low
  can_teach:      very low

key_gap: can_explain — most practitioners know that a Transformer uses
         attention but cannot state what the dot product computes, why
         positional encoding is needed, or why the architecture won (it is
         a parallelism story, not a context-understanding story)
```

## Claims

**TRANSFORMER-C001** 🟢 — the Transformer replaced LSTM because it parallelises across tokens: LSTM processes one time step per sequential step (GPU waits at each step); Transformer processes all tokens simultaneously; GPU utilisation rose from ~30% (LSTM) to near 100% (Transformer); the win is a hardware-utilisation story, not a "better context understanding" story

**TRANSFORMER-C002** 🟢 — «Attention Is All You Need» (Vaswani et al., 2017) was written by 8 people at Google Brain/Research; most subsequently left Google and founded AI companies (Aidan Gomez → Cohere, Llion Jones → Sakana AI, Noam Shazeer → Character.AI); one paper launched the industry and simultaneously drained the team that wrote it

**TRANSFORMER-C003** 🟡 — post-2020 scaling laws (Kaplan et al. 2020, Hoffmann et al. 2022 «Chinchilla») showed that Transformer performance scales predictably with compute, data, and parameters; this made the architecture matter at industrial scale; the architecture itself did not change between 2017 and GPT-4

**TRANSFORMER-C004** 🟡 — ViT requires substantially more data than a CNN on the same vision task because Transformer has no inductive bias: a convolutional kernel is applied identically at every position (translational invariance by construction); ViT must learn this from examples; the practical response is either large-scale pretraining or distillation from a large ViT teacher

**TRANSFORMER-C005** 🟠 — «Attention Is All You Need» names only attention; the load-bearing components also include 2-layer MLPs (half the parameters), LayerNorm (Pre-LN in practice, not the Post-LN in the original paper), residual connections (what lets the network be deep), and positional encoding (what makes order visible to a permutation-invariant operation); removing any one breaks the architecture

**TRANSFORMER-C006** 🟠 — «attention is thinking» anthropomorphises a weighted average: at each position the mechanism computes a dot product, applies softmax, and returns a weighted sum of value vectors; the weights are not symbolic, not causal, not retrieved from memory — they are a learned similarity score applied to a linear combination; the metaphor makes the mechanism harder to reason about, not easier

**TRANSFORMER-C007** 🟠 — the Transformer's O(n²) memory cost is not solved by FlashAttention: FlashAttention reorders matrix operations to stay in SRAM instead of writing intermediate results to HBM; it reduces memory bandwidth and peak memory, but the number of floating-point operations is unchanged; RWKV, Mamba, RetNet, and ring attention are the architectures that actually change the scaling exponent

**TRANSFORMER-C008** 🔴 — whether sub-quadratic alternatives (Mamba, RWKV) can match full-attention Transformers on long-context tasks requiring global dependencies across distant positions is not settled; current evidence is favourable at moderate lengths but full parity at 128K+ token context is not demonstrated

## Relations

- People: [Geoffrey Hinton](../../people/hinton.md) — soft attention lineage via Bahdanau (Hinton's lab)
- Research: [Attention Is All You Need](../../research/attention-is-all-you-need.md)

## Sources

- Vaswani, A. et al. «Attention Is All You Need», NeurIPS (2017). arXiv:1706.03762
- Dosovitskiy, A. et al. «An Image Is Worth 16×16 Words», ICLR (2021)
- Dao, T. et al. «FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness», NeurIPS (2022)
- Kaplan, J. et al. «Scaling Laws for Neural Language Models», arXiv:2001.08361 (2020)
- Hoffmann, J. et al. «Training Compute-Optimal Large Language Models» (Chinchilla), NeurIPS (2022)
- Gu, A., Dao, T. «Mamba: Linear-Time Sequence Modeling with Selective State Spaces» (2023)
