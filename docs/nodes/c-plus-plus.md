---
id: c-plus-plus
entity: subject
title: C++
capsule: Bjarne Stroustrup's 1983 language that grafted Simula's object model onto C's machine model — and has grown by pure accretion ever since, because ABI stability makes removing anything impossible.
domain: it
subdomain: languages
type: language
created: 1983
status: active
importance: critical
---

## Timeline

- 1967 — Simula created in Norway: first language with classes and inheritance
- 1979 — [Bjarne Stroustrup](../../people/stroustrup.md) creates "C with Classes" at Bell Labs, combining C's machine model with Simula's object system
- 1983 — renamed C++; first external release
- 1985 — Cfront 1.0: the first C++ compiler translated C++ source to C, then compiled with the host C compiler; C++ ran as C for its first decade
- 1989 — C++ 2.0: multiple inheritance, abstract classes
- 1994 — Erwin Unruh demonstrates that C++ templates are Turing-complete at compile time by encoding a prime-number computation in template instantiation errors
- 1998 — C++98: first ISO standard; STL included
- 2011 — C++11: move semantics, lambdas, auto, threads — the standard that split the language into "old C++" and "modern C++"; the 2011 change to std::string's small-string optimisation broke ABI across libstdc++ versions, requiring the `_GLIBCXX_USE_CXX11_ABI` dual-ABI toggle still in use today
- 2017 — C++17: std::string_view, structured bindings, if constexpr
- 2020 — C++20: concepts, coroutines, modules, ranges — modules still compile unevenly across [Clang](clang.md), GCC, and MSVC in 2024
- 2023 — C++23: ongoing additions

## Ontology

- Zero-cost abstractions: abstractions compile away; you pay only for what you use — Stroustrup's foundational design principle
- Growth by accretion: each standard adds; nothing is removed; ABI stability makes removal a fiction even when the committee deprecates
- No single owner: ISO committee governs the standard; no BDFL; design by consensus across competing corporate interests
- "C++" is not one language: embedded, game engines, HPC, and finance use incompatible subsets sharing syntax but not idioms; a Google C++ style guide bans features a Bloomberg C++ codebase depends on
- Templates are compile-time program transformation, not generics: the template mechanism is an accidental Turing-complete meta-language — CRTP, SFINAE, expression templates, and concepts are all instances of this, not features of a generics system

## Competence

```
can_explain:    understands C++'s two parents; knows what zero-cost abstraction means
                and why ABI instability is structural, not fixable by the committee

can_apply:      writes modern C++ (C++17/20); understands move semantics,
                RAII, template basics, knows which std features to avoid

can_extend:     writes template metaprogramming, understands ABI implications,
                reads compiler output; contributes to libraries or compilers

can_teach:      can explain why std::string cannot be fixed, why C and C++
                are not the same language, why the committee works the way it does

reach:
  can_explain:    low
  can_apply:      high
  can_extend:     very low
  can_teach:      very low

key_gap: can_apply → can_explain
         most C++ practitioners use the language productively without understanding
         ABI stability as the structural force that makes the language grow but
         never shrink, or why templates are a compile-time Turing machine rather
         than a generics system
```

## Claims

**CPP-C001** 🟢 — C++ was not designed as a C extension; it was created to add Simula's object model to C's performance model — the two parents are C and Simula, not C and "more C" (see [STROUSTRUP-C001](../../people/stroustrup.md))

**CPP-C002** 🟢 — C++ templates are Turing-complete at compile time; Unruh's 1994 prime-number computation encoded in template instantiation errors is the demonstrator — this is compile-time program transformation, not a generics system

**CPP-C003** 🟢 — the 2011 std::string ABI break forced libstdc++ to ship a dual-ABI toggle (`_GLIBCXX_USE_CXX11_ABI`) that is still required today; this is the mechanism by which a single standard library class becomes permanently uncorrectable

**CPP-C004** 🟡 — std::string_view (C++17) exists because std::string's design cannot be corrected without breaking ABI; it is an additive workaround to an unfixable class, not a replacement

**CPP-C005** 🟠 — "C++ is a superset of C" is false since C99: variable-length arrays, `restrict`, and designated initializers are valid C99 but not valid C++; programs valid in one are not always valid in the other (see [C ↔ C++](../relations/c__c-plus-plus.md))

**CPP-C006** 🟠 — "Modern C++ is safe" conflates safer with safe: iterator invalidation, lifetime bugs in coroutines (dangling references to stack frames), and the ABI-stability lock are all live in C++23; [Rust](rust.md)'s safety model is compile-time by construction, not by discipline

**CPP-C007** 🟠 — C++'s complexity is not the ISO committee's fault; it is structural: nothing is ever removed because ABI stability would require coordinated linker and toolchain upgrades across every binary consumer — deprecation is a committee fiction, removal is a deployment problem

**CPP-C008** 🔴 — cpp2/cppfront (Herb Sutter) and Carbon (Google) both propose C++ successors that preserve existing code; whether any successor language can carry C++'s installed base without inheriting its ABI constraints is unresolved

## Demonstrator

The `_GLIBCXX_USE_CXX11_ABI` linker flag, required in production builds on Linux whenever mixing code compiled against old and new libstdc++, is the artifact proving the ABI-stability thesis. It is not a workaround — it is the permanent operational cost of the 2011 std::string fix. Any C++ developer who has debugged an ODR violation or a symbol-mangling mismatch between shared libraries has encountered the mechanism CPP-C003 describes.

## Relations

- [C ↔ C++](../relations/c__c-plus-plus.md)
- [C++ ↔ Rust](../relations/c-plus-plus__rust.md)

## Sources

- Stroustrup, B. (1994). *The Design and Evolution of C++*. Addison-Wesley.
- https://www.stroustrup.com/hopl2.pdf
- Unruh, E. (1994). «Prim-Zahlen (Prime Numbers)». Original C++ template metaprogram: erwin-unruh.de/primorig.html
- Veldhuizen, T. (1995). «Using C++ Template Metaprograms». C++ Report, 7(4): 36–43. Reprinted in *C++ Gems* (Lippman, ed., 1996). Author's page: cs.indiana.edu/~tveldhui/papers/Template-Metaprograms/meta-art.html
- Vandevoorde, D., Josuttis, N. M., Gregor, D. (2017). *C++ Templates: The Complete Guide*, 2nd ed. Addison-Wesley — chapter 23 on metaprogramming history and mechanism.
- https://isocpp.org/
- GCC docs, «Dual ABI». gcc.gnu.org/onlinedocs/libstdc++/manual/using_dual_abi.html
- Sutter, H. cppfront project. github.com/hsutter/cppfront
