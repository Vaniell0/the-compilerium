---
id: c-plus-plus__rust
entity: relation
title: C++ ↔ Rust
capsule: C++ and Rust share a domain (systems programming, no GC, manual memory) and a backend (LLVM), but their memory models, type systems, and intellectual traditions are unrelated.
domain: it
subdomain: languages
type: relation
created: 2010
status: active
importance: high
from: c-plus-plus
to: rust
direction: symmetric
confidence: strong
axes:
  historical: false
  structural: true
  competence: true
---

## What this is

C++ and Rust share a domain (systems programming, no GC, manual memory) and a backend (LLVM). Their memory models, type systems, and intellectual traditions are unrelated.

## Claims

**C-PLUS-PLUS-RUST-C001** 🟢 — both target systems programming with no GC and manual memory control; both use LLVM as primary backend

**C-PLUS-PLUS-RUST-C002** 🟡 — the "Rust replaces C++" narrative misrepresents both: Rust adds compile-time safety contracts; C++ adds zero-cost abstraction without compile-time constraints

**C-PLUS-PLUS-RUST-C003** 🟠 — for programmers who manage memory correctly, the borrow checker is overhead; C++ with discipline achieves equivalent safety without compile-time friction

**C-PLUS-PLUS-RUST-C005** 🟡 — the safety cost is not zero in either language: Rust shifts it to compile-time friction; C++ shifts it to CI infrastructure (sanitizers, fuzzing, integration tests) — both paths are expensive

**C-PLUS-PLUS-RUST-C006** 🟡 — the two languages can coexist in the same project at different trust levels: C++ for expert-owned core, Rust for externally-authored plugins or bindings

**C-PLUS-PLUS-RUST-C007** 🔴 — will Rust expand into OS kernels and embedded as tooling matures, or will C++ remain dominant wherever the borrow checker fights the programmer?

## Sources

- https://rustc-dev-guide.rust-lang.org/
- Klabnik, S., Nichols, C. «The Rust Programming Language» (2019, 2nd ed.)
