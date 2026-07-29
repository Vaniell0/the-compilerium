---
id: v8__webassembly
entity: relation
title: V8 → WebAssembly
capsule: V8 runs WebAssembly through a dedicated Liftoff + TurboFan pipeline integrated into the same engine as JavaScript — WASM is a second frontend to V8's existing JIT infrastructure, not a separate runtime.
domain: it
subdomain: runtimes
type: relation
created: 2017
status: active
importance: high
from: v8
to: webassembly
direction: a→b
confidence: strong
axes:
  historical: false
  structural: true
  competence: false
---

## What this is

V8 runs WebAssembly through a dedicated pipeline (Liftoff + TurboFan) integrated into the same engine as JavaScript. WASM is not a separate runtime — it is a second frontend to V8's existing JIT infrastructure.

## Claims

**V8-WEBASSEMBLY-C001** 🟢 — V8 compiles WASM through Liftoff (baseline, instant start) and TurboFan (optimising, runs concurrently); tier-up happens transparently — the same model as JS's Ignition→TurboFan pipeline

**V8-WEBASSEMBLY-C002** 🟡 — WASM is statically typed, so V8 needs no feedback vectors or hidden class tracking for WASM code; compilation is faster and more predictable than JS optimisation

**V8-WEBASSEMBLY-C003** 🟠 — V8 handling both JS and WASM in the same engine means the boundary between them is a function call, not a process boundary; this is architecturally clean but creates a shared-fate model: a V8 security bug affects both runtimes simultaneously

## Sources

- Clemens Backes. «Liftoff: a new baseline compiler for WebAssembly in V8» (v8.dev, 2018)
- v8.dev/blog/wasm-compilation-pipeline
