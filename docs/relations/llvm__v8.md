---
id: llvm__v8
entity: relation
title: LLVM ↔ V8
capsule: LLVM and V8 are structurally analogous shared optimizing backends — LLVM for AOT systems compilation, V8 for JIT web execution — built independently for different constraints but solving the same architectural problem.
domain: it
subdomain: compilers
type: relation
created: 2008
status: active
importance: medium
from: llvm
to: v8
direction: symmetric
confidence: strong
axes:
  historical: false
  structural: true
  competence: false
---

## What this is

LLVM and V8 are structurally analogous: both are shared optimizing backends that many languages target, both use intermediate representations with optimization passes, both dominate their respective ecosystems. They were built independently for different constraints.

## Claims

**LLVM-V8-C001** 🟡 — LLVM (AOT, systems) and V8 (JIT, web) solve the same problem in different domains: a shared optimizing backend that makes the choice of source language less important than what the runtime does with it

**LLVM-V8-C002** 🟡 — both use tiered compilation strategies: LLVM has -O0/-O1/-O2/-O3; V8 has Ignition/Sparkplug/Maglev/TurboFan; the principle is identical — compile fast first, optimize later when it matters

**LLVM-V8-C003** 🟠 — LLVM IR is C-shaped (flat memory, raw pointers, UB as optimization contract); V8's internal IR is JS-shaped (hidden classes, feedback vectors, tagged values); the source language leaves a structural imprint on the IR even in supposedly language-agnostic backends

## Sources

- Lattner, C. & Adve, V. (2004). LLVM paper
- v8.dev/blog/maglev (TurboFan sea-of-nodes description)
