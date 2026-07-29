---
id: lattner-chris
entity: person
title: Chris Lattner
capsule: Compiler architect whose LLVM, Clang, Swift and MLIR reshaped what a production compiler infrastructure looks like — now building Mojo at Modular.
domain: it
subdomain: compilers
type: person
created: 2000
status: active
importance: critical
---

## Known for

- Created LLVM (2000) as a research project at University of Illinois
- Created Clang (2007) at Apple as a BSD-licensed frontend for LLVM
- Created Swift (2010) at Apple, built on Clang/LLVM infrastructure
- Co-created MLIR (2019) at Google; moved to SiFive, then Tesla AI, then Modular
- Created Mojo (2022) at Modular: Python-syntax systems language targeting AI hardware

## Technologies shaped

- [LLVM](../docs/nodes/llvm.md)
- [Clang](../docs/nodes/clang.md)

## Key decisions

**LATTNER-C001** 🟢 — designed LLVM as a modular pipeline (frontend → IR → backend), not a monolith; this made it reusable across languages and targets

**LATTNER-C002** 🟢 — chose BSD license for LLVM and Clang at Apple's direction; this was the licensing condition that allowed corporate adoption

**LATTNER-C003** 🟡 — Lattner's career traces the full arc of compiler infrastructure becoming AI infrastructure: LLVM → Swift → MLIR → Mojo; each step moved closer to hardware-level compute

**LATTNER-C004** 🟠 — MLIR was designed to solve a problem LLVM cannot: multiple levels of abstraction in the same compilation pipeline; this is the missing layer between ML frameworks and hardware

## Sources

- Lattner, C. & Adve, V. (2004). *LLVM: A Compilation Framework for Lifelong Program Analysis & Transformation*
- lattner.com/resume.html
- MLIR: mlir.llvm.org/docs/Rationale/Rationale/
