---
id: llvm
entity: subject
title: LLVM
capsule: A compiler infrastructure built around a typed SSA intermediate representation — the shared backend that lets Rust, Swift, Julia, and Zig produce native code without each writing a separate optimiser, puncturing the myth that "language design" and "code generation" are the same problem.
domain: it
subdomain: compilers
type: infrastructure
created: 2003
status: active
importance: critical
---

## Timeline

- 2000 — [Chris Lattner](../../people/lattner-chris.md) begins LLVM at University of Illinois; initial focus on lifelong program analysis (the name: Low Level Virtual Machine, now a backronym)
- 2003 — First public paper (Lattner & Adve, CGO 2004 proceedings)
- 2005 — Apple hires Lattner; begins funding LLVM to replace GCC in its toolchain
- 2007 — [Clang](clang.md) announced as BSD-licensed C/C++/Objective-C frontend; Apple's GPL v3 problem becomes LLVM's production moment
- 2012 — LLVM wins ACM Software System Award
- 2013 — rustc switches to LLVM as its sole backend; Rust's borrow checker sits entirely above the IR boundary
- 2014 — LLVM Foundation established; project governance separated from Apple
- 2019 — MLIR announced as an LLVM subproject; designed to handle the multiple-abstraction-level problem LLVM IR cannot (see [LLVM → MLIR](../relations/llvm__mlir.md))
- 2022 — Zig, Mojo, and Vale all target LLVM IR as primary backend; IR-first design becomes the default assumption for new systems languages

## Ontology

- LLVM IR is the actual product: a typed, SSA-form, language-agnostic representation with explicit undefined-behaviour semantics — not a bytecode, not an assembly, not a virtual machine despite the name
- Modular pipeline: every language frontend (Clang, rustc, swiftc, Julia JIT) is independently replaceable; optimisation passes operate on IR without knowing where it came from
- Optimisation happens once for all languages: a constant-folding pass written for LLVM benefits Rust, C, Swift, and Julia simultaneously — this is the actual value proposition
- Same IR supports AOT and JIT: LLVM's MCJIT and OrcJIT subsystems run the same optimisation pipeline at runtime; Julia's JIT and Numba both use this path
- BSD-2-clause licence: permissive; this was Apple's condition for funding, and it is why corporate toolchains embed LLVM without triggering copyleft obligations

## Competence

```
can_explain:    knows why IR exists and what SSA form does;
                can describe the frontend→IR→backend pipeline and
                explain why optimisation at the IR level beats
                optimisation inside each language's compiler

can_apply:      writes a language frontend that emits valid LLVM IR;
                integrates LLVM as a JIT engine via OrcJIT or MCJIT

can_extend:     authors optimisation passes; understands IR semantics
                and the undefined-behaviour contracts that make
                aggressive optimisation legal

can_teach:      explains LLVM's design tradeoffs and historical context;
                walks a newcomer from "why not just optimise in the
                frontend" to "SSA enables dataflow analysis that is
                impossible without it"

reach:
  can_explain:    low
  can_apply:      very low
  can_extend:     very low
  can_teach:      very low

key_gap: can_explain — most practitioners know LLVM as "the thing under
         their compiler" but cannot say what SSA form is or why the IR
         exists at all; the gap between "using Rust" and "understanding
         that rustc has two distinct correctness phases separated by an
         IR boundary" is almost never crossed
```

## Claims

**LLVM-C001** 🟢 — the CGO 2004 paper (Lattner & Adve) describes LLVM IR as a typed, SSA-form representation designed for both static and JIT compilation; this is not a simplification — the IR spec is the contract the whole ecosystem targets

**LLVM-C002** 🟢 — rustc uses LLVM as its primary backend; by the time code reaches LLVM IR, Rust's ownership and borrow semantics are fully erased — LLVM sees typed memory operations, not lifetimes (see [LLVM → Rust](../relations/llvm__rust.md))

**LLVM-C003** 🟢 — Apple funded Clang and LLVM starting 2005 specifically to escape GCC's GPL v3 anti-tivoization clause; the BSD licence on LLVM/Clang was a deliberate condition of that funding, not a default (see [MACOS-C003](macos.md), [CLANG-C001](clang.md))

**LLVM-C004** 🟡 — most new compiled languages created after 2010 (Rust, Swift, Julia, Zig) chose LLVM over GCC or a custom backend; the network effect of shared optimisation passes is the structural pull, not language-designer preference

**LLVM-C005** 🟠 — LLVM IR carries assumptions inherited from C-era systems programming: flat memory, C-shaped ABI, undefined-behaviour semantics calibrated for C; languages with different models (GC, borrow-checked, effect-tracked) pay friction costs at the IR boundary — this friction is not visible to most users of those languages

**LLVM-C006** 🟠 — LLVM is the clearest counter-example to the myth that each language needs its own optimiser: the same dead-code elimination and vectorisation passes that GCC spent decades building are available to any language that emits LLVM IR — the cost is accepting LLVM's C-shaped memory model at the boundary

**LLVM-C007** 🔴 — to what extent does targeting LLVM force language designers to adapt their model to LLVM's assumptions? Rust's borrow checker sits above the boundary, but memory model mismatches (e.g. GC write barriers, algebraic effects) require either shims or a higher-level IR — which is what MLIR is designed to address

## Relations

- [C → LLVM](../relations/c__llvm.md)
- [Clang → LLVM](../relations/clang__llvm.md)
- [LLVM → Rust](../relations/llvm__rust.md)
- [LLVM → MLIR](../relations/llvm__mlir.md)
- [LLVM ↔ V8](../relations/llvm__v8.md)

## Sources

- Lattner, C. & Adve, V. (2004). *LLVM: A Compilation Framework for Lifelong Program Analysis & Transformation*. CGO 2004. llvm.org/pubs/2004-01-30-CGO-LLVM.html
- LLVM Language Reference Manual. llvm.org/docs/LangRef.html
- Lattner, C. (2002). *LLVM: An Infrastructure for Multi-Stage Optimization*. MSc thesis, University of Illinois.
- clang.llvm.org/features.html
- mlir.llvm.org/
- rustc-dev-guide.rust-lang.org/codegen.html
