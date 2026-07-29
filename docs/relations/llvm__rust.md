---
id: llvm__rust
entity: relation
title: LLVM → Rust
capsule: rustc uses LLVM for code generation, and by the time code reaches LLVM IR, Rust's ownership semantics are fully erased — LLVM sees typed memory operations, not borrow rules.
domain: it
subdomain: compilers
type: relation
created: 2013
status: active
importance: high
from: llvm
to: rust
direction: a→b
confidence: strong
axes:
  historical: false
  structural: true
  competence: false
---

## What this is

rustc uses LLVM for code generation. By the time code reaches LLVM IR, ownership is erased — LLVM sees typed memory operations, not ownership semantics.

## Claims

**LLVM-RUST-C001** 🟢 — rustc uses LLVM as primary backend; alternatives (GCC Codegen, Cranelift) are not the default

**LLVM-RUST-C002** 🟡 — Rust's safety guarantees are fully enforced before LLVM; LLVM has no knowledge of ownership or lifetimes

**LLVM-RUST-C003** 🟠 — the separation is deliberate: LLVM cannot help enforce Rust's safety model, and Rust cannot express ownership in generated IR

## Sources

- https://rustc-dev-guide.rust-lang.org/codegen.html
- https://doc.rust-lang.org/rustc/codegen-options/index.html
