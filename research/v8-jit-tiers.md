---
id: v8-jit-tiers
entity: research
title: "V8 JIT tier architecture: Sparkplug (2021) and Maglev (2023)"
capsule: Two V8 engineering blog posts that together document the four-tier JIT ladder and the speculative-optimisation + deoptimisation mechanism.
domain: it
subdomain: runtimes
type: blog
created: 2023
status: published
importance: high
authors: [Swirski L., Verwaest T.]
year: 2023
venue: v8.dev/blog
url: https://v8.dev/blog/maglev
supports: [V8-C001, V8-C002, V8-C006]
challenges: []
confidence: strong
---

## What it says

The Sparkplug post (2021, Swirski et al.) introduces a baseline JIT that compiles Ignition bytecode directly to machine code with no IR pass — fast to compile, no optimisation overhead, occupies the tier between interpreter and optimising JIT. The Maglev post (2023, Verwaest et al.) introduces the mid-tier JIT and describes the full four-tier ladder: Ignition (interpreter) → Sparkplug (baseline) → Maglev (mid-tier) → TurboFan (top-tier). Both posts explain why each tier exists: cold code runs in Ignition, warm code gets a cheap compiled form from Sparkplug, hot code gets the full sea-of-nodes treatment from TurboFan (with Maglev as an intermediate step that avoids TurboFan's high compilation cost on moderately-hot functions).

## Why it matters here

V8-C001 (first production JIT, 2008) is contextualised by the tier history: V8 shipped with Full Codegen, then Crankshaft, and the Ignition+TurboFan rebuild (2016) is the architectural break that enabled all subsequent tiers. V8-C002 (one engine for JS and WASM) is evidenced by the Maglev post's description of TurboFan as the shared backend for both languages. V8-C006 (JIT = speculation) is the mechanism described in both posts: each tier installs deoptimisation guards; when a guard fires, V8 falls back to the previous tier — the fast path is only possible because the exit path exists.

## Sources

- Swirski, L. et al. «Sparkplug — a non-optimizing JavaScript compiler». v8.dev/blog/sparkplug (2021)
- Verwaest, T. et al. «Maglev — V8's Fastest Optimizing JIT». v8.dev/blog/maglev (2023)
