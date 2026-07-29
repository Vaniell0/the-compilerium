---
id: c__webassembly
entity: relation
title: C → WebAssembly
capsule: WebAssembly was designed as a compilation target for C and C++, and its linear memory model and type system are direct consequences of that design constraint.
domain: it
subdomain: languages
type: relation
created: 2017
status: active
importance: high
from: c
to: webassembly
direction: a→b
confidence: strong
axes:
  historical: true
  structural: true
  competence: false
---

## What this is

WebAssembly was designed to be a compilation target for C and C++. The memory model, type system, and linear address space are shaped by the requirement that existing C code compile to WASM without rewriting.

## Claims

**C-WEBASSEMBLY-C001** 🟢 — WASM's linear memory model maps directly to C's flat address space; C pointers become WASM i32 offsets into a single linear memory buffer; this is not coincidence — it is the design constraint

**C-WEBASSEMBLY-C002** 🟢 — Emscripten (Alon Zakai, 2010) compiled C/C++ to asm.js (the WASM predecessor) using LLVM as the middle layer; this pipeline predates the WASM standard by six years and defined the C→WASM path

**C-WEBASSEMBLY-C003** 🟡 — WASM has no garbage collector in its base spec (GC proposal is separate); this means languages with GC (Java, Python, Go) must either ship their runtime in the WASM binary or wait for the GC proposal; C and Rust compile cleanly because they have no runtime GC

**C-WEBASSEMBLY-C004** 🟠 — WASM validates the C memory model as the universal low-level substrate: even in a memory-safe browser sandbox, the lowest layer uses manual flat memory; safety is enforced by the sandbox boundary, not by the type system

## Sources

- WebAssembly Specification: «Memory» section, webassembly.github.io/spec
- Zakai, A. «Emscripten: An LLVM-to-JavaScript Compiler» (OOPSLA 2011)
- WebAssembly GC proposal: github.com/WebAssembly/gc
