---
id: llvm-cgo-2004
entity: research
title: "LLVM: A Compilation Framework for Lifelong Program Analysis & Transformation"
capsule: The 2004 CGO paper that introduced LLVM IR as a typed SSA representation for analysis across the full program lifetime, not just at compile time.
domain: it
subdomain: compilers
type: paper
created: 2004
status: published
importance: critical
authors: [Lattner C., Adve V.]
year: 2004
venue: CGO 2004 (International Symposium on Code Generation and Optimization)
url: https://llvm.org/pubs/2004-01-30-CGO-LLVM.html
supports: [LLVM-C001, LLVM-C002, LLVM-C004]
challenges: []
confidence: strong
---

## What it says

Lattner and Adve describe LLVM as a compilation framework designed around a persistent, typed, SSA-form intermediate representation. The key claim is that IR survives past compile time — it can be used for link-time, install-time, and runtime optimisation, making it a "lifelong" analysis target rather than a transient internal representation discarded after code generation.

## Why it matters here

LLVM-C001 is grounded directly in this paper: the typed SSA IR and its UB-carrying semantics are described here, not inferred post-hoc. LLVM-C002 (ownership erasure at the IR boundary in rustc) is consistent with the design intent — IR is language-agnostic by construction. LLVM-C004 (why new languages target LLVM) is supported by the paper's framing of IR as a shared optimisation substrate: the value proposition was stated in 2004 and the Rust/Julia/Zig adoption confirms it.

## Sources

- Lattner, C. & Adve, V. (2004). *LLVM: A Compilation Framework for Lifelong Program Analysis & Transformation*. CGO 2004. llvm.org/pubs/2004-01-30-CGO-LLVM.html
