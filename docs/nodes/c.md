---
id: c
entity: subject
title: C
capsule: Dennis Ritchie's 1972 language for rewriting Unix — a thin specification over a fictitious abstract machine whose Undefined Behavior is not a legacy defect but the deliberate contract that lets one compiler squeeze performance from hardware Ritchie never imagined.
domain: it
subdomain: languages
type: language
created: 1972
status: active
importance: critical
---

## Timeline

- 1969 — [Ken Thompson](../../people/thompson.md) writes B at Bell Labs to develop Unix on PDP-7
- 1972 — [Dennis Ritchie](../../people/ritchie.md) creates C from B, adding types; the PDP-11 is the reference machine
- 1973 — Unix kernel rewritten in C; the language proves itself as portable OS-implementation tool
- 1978 — K&R book: *The C Programming Language*; the informal standard for eleven years
- 1989 — ANSI C (C89/C90): first formal standard; the preprocessor codified as a separate token language
- 1999 — C99: inline functions, variable-length arrays (VLAs), `//` comments, complex number support
- 2011 — C11: threads, atomics, alignment control — bolt-on concurrency, poorly adopted by the ecosystem
- 2017 — C17: bugfix release; no new features
- 2024 — C23: `_BitInt`, `constexpr`, `nullptr`, `#embed`; first standard since C99 to add semantically new vocabulary

## Ontology

- Specifies a fictitious abstract machine (not a PDP-11, not any real processor): the language's memory model, execution order, and type system define an imaginary target; real hardware is a downstream detail
- Undefined Behavior (UB) is a contract term, not a defect: where the standard says "behavior is undefined", the compiler is licensed to assume the condition cannot occur; this assumption is what enables autovectorisation, alias analysis, and dead-store elimination
- The preprocessor is a separate language: `#include`, `#define`, and macro expansion run before parsing; the resulting token stream bears no syntactic relationship to the source text
- libc is not C: the standard library is fractured across implementations (glibc, musl, macOS libSystem, Windows msvcrt, newlib); the language and its runtime are separately replaceable
- "C ABI" is computing's only universal handshake: every language that links to foreign code defines C calling conventions as its foreign-function interface ground truth — not because C is special, but because nothing else stabilised first

## Competence

```
can_explain:    understands C as abstract machine, not portable assembly;
                knows what UB is and why it exists as a deliberate contract;
                can distinguish the language from the preprocessor from libc

can_apply:      writes idiomatic C, manages memory correctly,
                understands what the compiler does with their code;
                recognises UB patterns in real code (signed overflow,
                null dereference, strict aliasing violations)

can_extend:     writes compiler-aware C (intrinsics, memory models,
                UB exploitation); contributes to libc, kernel, or compiler;
                understands the difference between -fno-strict-aliasing
                and fixing the aliasing violation

can_teach:      can explain why UB is a feature, why assembly still exists
                below C, why every language eventually speaks C ABI,
                and what the C abstract machine actually specifies

reach:
  can_explain:    low
  can_apply:      high
  can_extend:     very low
  can_teach:      very low

key_gap: can_explain — most C practitioners believe they write for hardware
         directly; few understand the abstract machine they are actually
         targeting, or that UB is a compiler optimisation contract rather
         than a collection of bugs
```

## Claims

**C-C001** 🟢 — C was created to rewrite Unix on PDP-11 hardware, not to become a universal foundation; the universality came from Unix's success, not from any portability ambition in the original design

**C-C002** 🟢 — every performance-critical C project (Linux kernel, glibc, libsodium) still contains hand-written assembly; C is not the lowest level, and compilers have always generated code that can be beaten by a skilled assembly programmer in critical loops

**C-C003** 🟢 — C's compiler ecosystem fragmented libc rather than unifying it: glibc, musl, macOS libSystem, Windows msvcrt, and newlib are incompatible runtime stacks; code that links against one does not trivially link against another; "portable C" depends on portable libc, not just portable language

**C-C004** 🟠 — C is not close to the machine; it is close to the *PDP-11 abstract machine of 1972*; modern hardware (superscalar execution, out-of-order pipelines, NUMA memory, SIMD units) shares almost nothing with C's sequential, flat-memory model — the compiler's job is to bridge that gap, and it does so by exploiting UB as freedom to rearrange

**C-C005** 🟠 — C is not a simple language; the language specification is small, but the *semantics* — integer promotions, sequence points, strict aliasing, trap representations — are famously hard; most working C programmers have a mental model that diverges from the standard in ways that matter for correctness

**C-C006** 🟡 — C11's thread and atomic model (pthreads-style API bolted on via `<threads.h>` and `<stdatomic.h>`) was poorly adopted: compiler support lagged, major codebases continued using POSIX pthreads directly, and the `<threads.h>` wrapper was optional until C23 implementations; the adoption curve inverts C11's intent

**C-C007** 🔴 — C's abstract machine became computing's de facto universal ABI: every language either compiles through C, through LLVM (which is C-shaped at its IR boundary), or defines C FFI as its ground truth — whether this lock-in is structural or contingent on no alternative stabilising first remains a genuine open question

## Demonstrator

The demonstrator for C's "UB as contract" thesis is any GCC or Clang build of a simple signed-overflow loop with `-O2`: the compiler legally *removes the loop entirely* because signed integer overflow is UB and therefore the standard allows the compiler to assume it never occurs. The resulting binary does not execute the loop body. This is not a bug — it is the contract. Every autovectorisation and alias-analysis optimisation rests on the same foundation. The Linux kernel disables the most aggressive UB assumptions via `-fno-strict-aliasing` and `-fwrapv` precisely because kernel code depends on the behaviour the standard refuses to define (see [C → Linux](../relations/c__linux.md), C-LINUX-C003).

## Relations

- [C → LLVM](../relations/c__llvm.md)
- [C ↔ C++](../relations/c__c-plus-plus.md)
- [C → Linux](../relations/c__linux.md)
- [C → Windows](../relations/c__windows.md)
- [C → WebAssembly](../relations/c__webassembly.md)

## Sources

- Ritchie, D. M. (1993). *The Development of the C Language*. ACM HOPL-II. bell-labs.com/usr/dmr/www/chist.html
- Kernighan, B. & Ritchie, D. (1978). *The C Programming Language*. Prentice Hall
- ISO/IEC 9899:2011 (C11). open-std.org/jtc1/sc22/wg14/
- ISO/IEC 9899:2023 (C23). open-std.org/jtc1/sc22/wg14/
- Lattner, C. & Adve, V. (2004). *What Every C Programmer Should Know About Undefined Behavior*. blog.llvm.org/2011/05/what-every-c-programmer-should-know.html
- Linux kernel Documentation/process/coding-style.rst (on -fno-strict-aliasing and -fwrapv rationale)
