---
id: mlir
entity: subject
title: MLIR (Multi-Level Intermediate Representation)
capsule: An LLVM subproject that generalises the IR concept into a family of dialects, letting domain-specific compilers (ML, hardware synthesis, database query) reuse infrastructure while keeping their own semantics.
domain: it
subdomain: compilers
type: infrastructure
created: 2019
status: stub
importance: high
---

## Timeline

- 2019 — Chris Lattner and Google's TensorFlow team announce MLIR at CGO
- 2020 — MLIR moves into the main LLVM monorepo
- 2021 — CIRCT (Chip Intermediate Representations and Tools) launches, targeting hardware design
- 2022 — Torch-MLIR bridges PyTorch to MLIR dialects
- 2023 — Mojo language announces MLIR as its middle-end

## Ontology

- Dialects: a hierarchy of typed IRs where each dialect defines its own ops, types, and rewrites
- Reusable passes: analyses and transformations parameterise over dialect interfaces, not concrete ops
- Progressive lowering: high-level dialects (linalg, tensor) lower stepwise into low-level ones (llvm, gpu)
- Pattern rewriting: declarative DAG-to-DAG rewrites via TableGen or C++
- Aims explicitly at the domain-specific compiler explosion: ML, quantum, hardware, database

## Competence

```
can_explain:    understands the dialect abstraction and progressive lowering;
                knows how MLIR differs from monolithic IRs like LLVM IR

can_apply:      writes MLIR dialects and passes;
                uses TableGen for ops and patterns

can_extend:     contributes upstream dialects;
                designs new lowering pipelines

can_teach:      positions MLIR against LLVM IR and against custom in-house IRs

reach:
  can_explain:    very low
  can_apply:      very low
  can_extend:     very low
  can_teach:      very low

key_gap: awareness → can_explain
         most compiler engineers have heard of MLIR but cannot articulate
         what problem the dialect abstraction actually solves
```

## Claims

**MLIR-C001** 🟢 — MLIR's dialect abstraction lets a single infrastructure host multiple domain-specific IRs with shared passes, contrasting with LLVM IR's one-size-fits-all model that produced awkward embeddings for ML and hardware compilers

**MLIR-C002** 🟡 — the proliferation of domain-specific compilers in the 2020s (ML frameworks, chip design, database query planners) validates the design bet: shared infrastructure across dialects is more scalable than each domain reinventing its own IR

## Relations

- [LLVM ↔ MLIR](../relations/llvm__mlir.md)

## Sources

- Lattner, C. et al. «MLIR: A Compiler Infrastructure for the End of Moore's Law» (2020)
- mlir.llvm.org
- LLVM Developers' Meeting talks on MLIR
