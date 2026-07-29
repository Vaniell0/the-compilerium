---
id: webassembly-pldi-2017
entity: research
title: "Bringing the Web up to Speed with WebAssembly"
capsule: The PLDI 2017 paper by the four-vendor design team that defines the WASM type system, structured control flow, and linear memory model — the canonical primary source for what WASM is and why it is designed that way.
domain: it
subdomain: web
type: paper
created: 2017
status: published
importance: high
authors: Haas A., Rossberg A., Schuff D., Titzer B., Holman M., Gohman D., Wagner L., Zakai A., Bastien J.
year: 2017
venue: PLDI 2017 (ACM SIGPLAN Conference on Programming Language Design and Implementation)
url: https://dl.acm.org/doi/10.1145/3062341.3062363
supports: [WASM-C001, WASM-C002, WASM-C007]
challenges: []
confidence: strong
---

## What it says

The paper specifies WASM as a stack-based typed ISA with structured control flow (no arbitrary jumps), a linear memory model sized for C pointer arithmetic, and a validation algorithm that proves type safety and memory safety at load time. Authors are from Mozilla, Google, Apple, and Microsoft — confirming the four-vendor co-design described in WASM-C002.

## Why it matters here

WASM-C001 (WASM as typed portable IR, not a programming language) is the paper's central design statement: the authors explicitly frame WASM as a compilation target with a machine-level type system, not an application language. WASM-C002 (simultaneous four-vendor rollout) is grounded by the author affiliations — the paper is the output of the joint design group. WASM-C007 (structured control flow eliminates gadgets) is the paper's security argument: the absence of arbitrary jumps is a theorem, not a policy — the verifier proves it at validation time.

## Sources

- Haas, A. et al. (2017). «Bringing the Web up to Speed with WebAssembly». PLDI 2017. doi:10.1145/3062341.3062363
