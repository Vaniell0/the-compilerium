---
id: rust-ownership-model
entity: research
title: "The Rust Language (Matsakis & Klock, 2014)"
capsule: The first peer-reviewed description of Rust's ownership and borrow-checking model, explaining affine types and region inference as the compile-time mechanism behind memory safety.
domain: it
subdomain: languages
type: paper
created: 2014
status: published
importance: high
authors: [Matsakis N.D., Klock F.S.]
year: 2014
venue: ACM SIGADA Ada Letters, 34(3), 103–104
url: https://dl.acm.org/doi/10.1145/2692956.2663188
supports: [RUST-C001, RUST-C003, RUST-C004]
challenges: []
confidence: moderate
---

## What it says

Matsakis and Klock describe Rust's ownership model as an application of affine types and region inference: each value has exactly one owner, borrows are checked against compile-time regions (lifetimes), and the result is a memory-safety proof that runs entirely before code generation. The paper explicitly locates the intellectual debt to Cyclone (region-based memory) and to functional type systems, not to C++.

## Why it matters here

RUST-C001 (intellectual lineage from ML/Cyclone, not C++) and RUST-C004 (borrow checker automates what experienced programmers do mentally) are both arguable patterns without this paper; the SIGADA record upgrades them to verifiable claims grounded in the language designers' own published description. RUST-C003 (ownership erased at IR) is consistent with the paper's account of the borrow checker as a front-end phase — the paper does not discuss LLVM IR directly, so RUST-C003 is additionally supported by rustc-dev-guide.rust-lang.org/codegen.html.

⚠ Confidence is moderate: the paper is real and the DOI is correct, but it is a two-page short paper — the full borrow-checker mechanism is described in more detail in the rustc-dev-guide and in later papers (e.g. Weiss et al., RustBelt, POPL 2018). User should verify the specific claim wording survives expert review.

## Sources

- Matsakis, N. D., Klock, F. S. (2014). «The Rust Language». ACM SIGADA Ada Letters, 34(3), 103–104. https://dl.acm.org/doi/10.1145/2692956.2663188
- https://rustc-dev-guide.rust-lang.org/codegen.html (ownership erasure at IR boundary)
