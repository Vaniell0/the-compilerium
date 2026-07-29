---
id: llvm__mlir
entity: relation
title: LLVM → MLIR
capsule: MLIR is a framework for building intermediate representations developed inside LLVM; it adds layers above LLVM IR but lowers to it at the bottom, not replacing it.
domain: it
subdomain: compilers
type: relation
created: 2018
status: active
importance: medium
from: llvm
to: mlir
direction: a→b
confidence: strong
axes:
  historical: false
  structural: true
  competence: false
---

## What this is

MLIR (Multi-Level IR) is a framework for building IRs, developed inside LLVM. It does not replace LLVM IR — it typically lowers to it at the bottom.

## Claims

**LLVM-MLIR-C001** 🟢 — MLIR is an LLVM sub-project, created by Chris Lattner while at Google

**LLVM-MLIR-C002** 🟡 — MLIR adoption is concentrated in ML stacks (XLA, TensorFlow, IREE), not general-purpose languages

**LLVM-MLIR-C003** 🟠 — MLIR does not resolve the C-shaped assumptions of LLVM IR; it adds layers above them, the bottom stays the same

**LLVM-MLIR-C004** 🔴 — will MLIR become the primary target for general-purpose language frontends, or remain specialised?

## Sources

- https://mlir.llvm.org/
- Lattner, C. et al. (2020). *MLIR: Scaling Compiler Infrastructure for Domain Specific Computation*
