---
id: rust
entity: subject
title: Rust
capsule: Graydon Hoare's 2006 personal project that became a systems language where memory safety is a compile-time proof, not a runtime guarantee — the borrow checker is not GC, and unsafe Rust is not safe.
domain: it
subdomain: languages
type: language
created: 2010
status: active
importance: high
---

## Timeline

- 2006 — [Graydon Hoare](../../people/hoare-graydon.md) starts Rust as a personal project; motivation is elevator firmware memory bugs, not language theory
- 2009 — Mozilla adopts and funds Rust; goal is a safe browser engine (Servo), not a general systems language
- 2010 — first public announcement; the language is still pre-type-system
- 2012 — Servo project begins: a Rust-based parallel browser engine used as the field-test for the language's safety claims
- 2015 — Rust 1.0; borrow checker stabilised; Graydon Hoare has already left Mozilla (2013) — the production language differs significantly from his original design
- 2016 — first "most loved language" on Stack Overflow Developer Survey; repeated annually through 2023
- 2019 — async/await stabilised; the compiler emits state-machine code for every async function — a coroutine transform, not a runtime scheduler
- 2022 — RFC for Rust in [Linux](linux.md) kernel accepted; first Rust abstractions merged into 6.1 (see [LINUX-C002](linux.md))
- 2022 — coordinated typo-squatting attack targets crates.io, npm, and PyPI simultaneously; crates.io's shallow vetting model exposed as a shared supply-chain risk
- 2023 — Deno 2.0 core rewritten in Rust; Bevy game engine reaches 0.12 on crates.io; Rust-in-embedded ecosystem (no_std) still thin relative to C

## Ontology

- Ownership: affine types — a value has exactly one owner; moving it invalidates the source; the compiler enforces this statically with no runtime cost
- Borrow checker: region inference at compile time; references are checked against lifetimes so a dangling pointer cannot compile — this is not GC, which runs at runtime and has no compile-time proof
- Ownership erased at MIR and then LLVM IR: safe Rust's guarantees are fully enforced before code generation; [LLVM](llvm.md) sees typed memory operations with no knowledge of borrow rules (see [LLVM → Rust](../relations/llvm__rust.md))
- Traits: structural polymorphism from Haskell typeclasses, not Java interfaces; monomorphisation at compile time produces concrete code for each type — same mechanism as C++ templates, same binary-size penalty
- unsafe block: a contract, not a licence; the programmer asserts that the memory invariants hold; the compiler stops checking; the ecosystem's C-FFI wrappers accumulate unsafe blocks that are not audited at the same rate as safe code
- No null: Option<T>; no exceptions: Result<T, E>; no implicit coercions — the type system forces all three failure modes into the call stack
- Intellectual lineage: [OCaml](https://ocaml.org)/ML (algebraic types, inference), Haskell (traits from typeclasses, Option/Result), Cyclone (region-based memory → lifetimes), [C](c.md) (systems domain, performance target) — not [C++](c-plus-plus.md)

## Competence

```
can_explain:    understands ownership as affine types, not as smart pointers;
                knows why the borrow checker exists and what "lifetime" means
                as a region inference problem; can state why GC and borrow
                checking are semantically different

can_apply:      writes idiomatic Rust; works with lifetimes and the trait system;
                understands when to reach for unsafe and what contract it imposes

can_extend:     writes correct unsafe Rust; understands the Pin/Unpin invariant
                and why async Rust concentrates pain at Send/Sync bounds;
                contributes to crates or std

can_teach:      explains Rust's intellectual lineage from ML; why it is not
                safer C++; why async Rust has coloured functions; when the
                borrow checker is an asset vs. an obstacle

reach:
  can_explain:  low
  can_apply:    moderate
  can_extend:   very low
  can_teach:    very low

key_gap: can_apply → can_explain — most Rust practitioners learn the borrow-checker
         rules by cargo-check iteration without knowing the theory; ownership is
         taught as a rule set, not as affine type theory; the gap matters most
         when writing unsafe code where the rules stop
```

## Claims

**RUST-C001** 🟢 — Rust's intellectual parents are OCaml, Haskell, and Cyclone — not [C++](c-plus-plus.md); "safer C++" is an external label applied after the fact, not the design intent; the type system derives from functional programming

**RUST-C002** 🟢 — Mozilla funded Rust to build Servo, a parallel browser engine; the safety model had a concrete engineering target (a renderer that could parallelise layout without data races), not an academic one

**RUST-C003** 🟢 — the borrow checker enforces ownership at compile time; by the time rustc emits LLVM IR, ownership semantics are fully erased — [LLVM](llvm.md) cannot enforce and does not know about Rust's safety model (LLVM-C002)

**RUST-C004** 🟡 — the borrow checker encodes what experienced systems programmers do mentally; the innovation is automating the proof, not inventing the discipline

**RUST-C005** 🟠 — "Rust is memory-safe" is true only for safe Rust; every FFI wrapper around a C library exposes an unsafe block whose correctness is inherited from the underlying C code and human audit, not from the borrow checker — the safety guarantee ends exactly at the `unsafe {}` boundary

**RUST-C006** 🟠 — async Rust has the coloured-function problem: async and sync code cannot call each other freely; Pin, lifetime bounds across .await points, and Send/Sync constraints concentrate pain in exactly the low-abstraction systems code that reaches for Rust first

**RUST-C007** 🟠 — Rust competes with [C++](c-plus-plus.md), not [C](c.md); both Rust and C++ give control plus abstraction; Rust in embedded (no_std) is still thin relative to C's ecosystem; "Rust replaces C" conflates two different problems

**RUST-C008** 🔴 — does Rust's safety model scale to OS-level programming (kernel memory, interrupt handlers, zero-copy buffers) without the borrow checker becoming a net obstacle? the Linux kernel experiment (2022–) is the first real data point, but no verdict yet

## Demonstrator

The artifact that makes the borrow-checker-is-compile-time thesis concrete: compile a program with a use-after-move and a program with a dangling reference — both fail with `rustc` before any binary is produced; run the same patterns in `unsafe {}` and `rustc` compiles both without complaint. The compiler is the proof; the generated binary is identical to what C would emit. This is the operational difference from GC: there is no runtime safety net, only a compile-time gate, and unsafe opens a hole in that gate.

Secondary demonstrator: Rust code in `drivers/gpu/drm/` in Linux 6.1 — kernel module code written in safe Rust, compiled by the same `rustc` + LLVM pipeline that erases ownership at IR, resulting in kernel object code identical in form to C-produced code.

## Relations

- [C++ ↔ Rust](../relations/c-plus-plus__rust.md)
- [LLVM → Rust](../relations/llvm__rust.md)

## Sources

- https://doc.rust-lang.org/reference/
- https://rustc-dev-guide.rust-lang.org/
- https://rustc-dev-guide.rust-lang.org/codegen.html
- Jim Blandy et al. (2021). *Programming Rust*, 2nd ed. O'Reilly.
- Klabnik, S., Nichols, C. (2019). *The Rust Programming Language*, 2nd ed. No Starch Press.
- Hoare, G. (2012). «Typesafe Systems Programming in Rust». InfoQ interview. infoq.com/interviews/graydon-hoare/
- Matsakis, N. D., Klock, F. S. (2014). «The Rust Language». ACM SIGADA Ada Letters, 34(3), 103–104.
