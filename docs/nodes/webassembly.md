---
id: webassembly
entity: subject
title: WebAssembly
capsule: A stack-based binary ISA that turns the browser into a language-agnostic compilation target — not a replacement for JavaScript, not a programming language, and increasingly not even a browser technology.
domain: it
subdomain: web
type: infrastructure
created: 2017
status: active
importance: high
---

## Timeline

- 2011 — [Fabrice Bellard](../../people/bellard.md) runs full x86 Linux in a browser via jslinux, using hand-rolled x86 emulation in JS; the demonstrator exists six years before the standard
- 2013 — asm.js (Mozilla): a strict subset of JS with type annotations that a JS engine can AOT-compile; proves direct-to-JIT paths work and motivates a proper standard
- 2015 — WebAssembly announced as a W3C Community Group project; joint design by Mozilla, Google, Microsoft, and Apple — same four vendors whose disagreements had stalled web standards for a decade
- 2017 — WebAssembly MVP ships simultaneously in Chrome, Firefox, Safari, and Edge; first synchronous four-browser rollout of a major web standard; [V8](v8.md) implements it as Liftoff + TurboFan
- 2019 — W3C ratifies WebAssembly 1.0 as a full standard; WASI (WebAssembly System Interface) announced — capability-based access to files, network, clocks, outside the browser
- 2019 — Fastly Compute@Edge ships: WASM as the edge-compute unit of isolation, replacing per-request V8 isolates
- 2022 — WasmGC proposal advances: garbage-collected object types in the WASM type system, enabling Java, Kotlin, and Dart to target WASM without bundling a runtime
- 2023 — WASM Component Model reaches MVP: a language-neutral interface definition layer; the "portable ABI" bet for plugin systems (Extism, Wasmtime, Wasmer)
- 2024 — WASI Preview 2 finalises the component model; Cloudflare Workers, Fastly, and Fermyon run production WASM workloads at scale

## Ontology

- Stack-based virtual ISA with structured control flow: WASM has no arbitrary jumps — all branches are structured (`block`, `loop`, `if`); the verifier can prove forward-branch termination, which eliminates an entire class of gadget-based exploits before execution starts
- Linear memory model: a flat byte array like C's; WASM code accesses it through i32 byte offsets; designed so that C and Rust pointer arithmetic maps directly without rewriting; no GC in the base spec
- Typed by design, but not a type system for humans: i32, i64, f32, f64, funcref, externref — four numeric types plus reference types; this is a machine type system, not a safety guarantee for application code
- WASM is a compilation target, not a programming language: nobody writes WASM by hand at scale — [C](c.md)/[C++](c-plus-plus.md) via Emscripten, [Rust](rust.md) via wasm-pack, AssemblyScript (TS-like) via its own compiler; the `.wat` text format exists for debugging, not authoring
- WASI is the actual attack surface: the ISA is sandboxed by construction; what a WASM module can do is entirely determined by which WASI import functions the host grants; the sandbox holds only as well as the capability policy is written
- WASM outside the browser is the roadmap driver: Fastly Compute@Edge, Cloudflare Workers, Envoy filters, Extism plugin systems — these use cases now shape the standard more than browser performance does

## Competence

```
can_explain:    knows why WASM exists alongside JS (compilation target, not replacement);
                understands the difference between WASM linear memory and JS heap;
                can name the ISA's structural control-flow constraint and what it rules out

can_apply:      compiles C/C++ to WASM via Emscripten or Rust via wasm-pack;
                works with the JS↔WASM import/export boundary;
                understands the WASI capability model at the policy level

can_extend:     writes WASM modules with manual memory management;
                understands the component model interface format;
                knows the constraints (no direct DOM, no native threads in base spec)

can_teach:      explains WASM as the LLVM IR of the web — typed portable IR,
                language-agnostic compilation target; connects jslinux (2011) and
                asm.js (2013) as the pre-standard proof-of-concept line; explains
                why "WASM replaces JS" is the wrong frame
```

```
reach:
  can_explain:    low
  can_apply:      low
  can_extend:     very low
  can_teach:      very low

key_gap: can_explain — most practitioners know "WASM is faster than JS"
         as a slogan; few can say that WASM has predictable performance
         without warmup while JS with warmup often matches or beats it,
         that WASM cannot touch the DOM at all, or that the standard's
         current roadmap is driven by edge compute rather than browser use cases
```

## Demonstrator

Fastly Compute@Edge running production WASM: a sandboxed module with a capability-granted set of WASI imports, no DOM, no Node runtime, executes in under 1 ms cold-start. This is the same WASM binary format as the browser, running in a Wasmtime interpreter, proving that the standard's scope is the portable-binary-isolation problem — not "making the browser faster." The demonstrator for the pre-standard era is [Bellard](../../people/bellard.md)'s jslinux (2011): a full x86 Linux kernel in a browser tab before any standard existed, built on asm.js as the compilation substrate.

## Claims

**WASM-C001** 🟢 — WebAssembly is a compilation target, not a programming language: typed portable IR for the browser in the same sense that [LLVM](llvm.md) IR is typed portable IR for systems — stable, standardised, language-agnostic

**WASM-C002** 🟢 — all four major browsers (Chrome, Firefox, Safari, Edge) shipped the WebAssembly MVP simultaneously in 2017 — the first synchronous four-vendor rollout of a major web standard; the W3C ratified the spec in 2019

**WASM-C003** 🟢 — in V8, WASM compiles through Liftoff (baseline, instant start) and TurboFan (optimising, same backend as JS); WASM is a second frontend to [V8](v8.md)'s existing JIT infrastructure, not a separate runtime (see [V8 → WebAssembly](../relations/v8__webassembly.md))

**WASM-C004** 🟢 — [Fabrice Bellard](../../people/bellard.md) demonstrated full x86 Linux in a browser in 2011 via jslinux, six years before the WASM standard shipped; asm.js was the substrate — proof that "run an OS in the browser" is an engineering question, not a research question

**WASM-C005** 🟠 — "WASM replaces JavaScript" is wrong by design: WASM has no DOM access, no Web API bindings, no async I/O — a WASM module must call JS functions to reach the browser environment; JS remains the mandatory integration layer between WASM and the DOM (see [JavaScript ↔ WebAssembly](../relations/javascript__webassembly.md))

**WASM-C006** 🟠 — "WASM is faster than JS" is the wrong frame: WASM has predictable performance without JIT warmup; JS with a warm JIT often matches or beats WASM for polymorphic-heavy code; the practical advantage of WASM is cold-start predictability and elimination of deoptimisation cliffs, not raw throughput

**WASM-C007** 🟠 — "WASM is sandboxed by design" conflates two separate things: the ISA prevents arbitrary memory access and gadget exploitation (structural guarantee); what a WASM module can actually do is determined entirely by which WASI import functions the host grants — misconfigured capabilities are the real attack surface, not the ISA

**WASM-C008** 🟡 — Emscripten (Alon Zakai, 2010) compiled C/C++ to asm.js using [LLVM](llvm.md) as the middle layer six years before the WASM standard; the same pipeline (LLVM → WASM) is now the official C/C++ path, making Emscripten a historical accident that became infrastructure

**WASM-C009** 🔴 — WASI Preview 2 and the component model are the "portable ABI" bet: if WASM becomes the standard unit of isolation for plugins and edge compute, does it displace Docker's role as the dominant packaging format for untrusted compute units — or does the container ecosystem absorb WASM as just another OCI artifact?

## Relations

- [JavaScript ↔ WebAssembly](../relations/javascript__webassembly.md)
- [V8 → WebAssembly](../relations/v8__webassembly.md)
- [C → WebAssembly](../relations/c__webassembly.md)

## Sources

- WebAssembly Core Specification 1.0. W3C. webassembly.github.io/spec/core/ (2019)
- Haas, A. et al. (2017). «Bringing the Web up to Speed with WebAssembly». PLDI 2017. doi:10.1145/3062341.3062363
- Zakai, A. (2011). «Emscripten: An LLVM-to-JavaScript Compiler». OOPSLA 2011
- Lin Clark. «A cartoon intro to WebAssembly» (Mozilla Hacks, 2017). hacks.mozilla.org
- WASI spec: github.com/WebAssembly/WASI
- Fastly Compute@Edge: developer.fastly.com/learning/compute/
- Bellard, F. jslinux.bellard.org (2011, asm.js; 2019, WASM x86_64)
