---
id: stepanov
entity: person
title: Alexander Stepanov
capsule: The mathematician-programmer who turned generic programming from an academic idea into the C++ Standard Library — and then wrote the book arguing it should be a foundational discipline of computing.
domain: it
subdomain: languages
type: person
created: 1950
status: active
importance: critical
---

## Known for

- Ada genericity work at GE (1985) — early implementation of generic algorithms in Ada; demonstrated that type-parameterised containers and algorithms were practically feasible before C++ templates existed
- STL proposal (1994, HP) — submitted to the ISO C++ committee; accepted and included in the 1998 C++ standard as the Standard Template Library; introduced iterators, containers, and algorithms as orthogonal components
- C++ STL (1998, ISO standard) — the iterator abstraction unified pointer arithmetic with abstract traversal; every container became interchangeable with every algorithm through a common interface; the design has remained stable through C++11, C++17, and C++20
- "Elements of Programming" (2009, with Paul McJones) — a rigorous mathematical treatment of generic programming; defines concepts, regular types, and algorithmic correctness from first principles; used as a reference for the C++ Concepts TS
- Adobe/A9 later career — continued work on generic algorithms and programming methodology; contributed to the thinking behind C++ Concepts standardised in C++20

## Technologies shaped

- [C++](../docs/nodes/c-plus-plus.md)
- [C](../docs/nodes/c.md)

## Key decisions

**STEPANOV-C001** 🟢 — the STL iterator design (1994) abstracted pointer arithmetic into a concept hierarchy (input, output, forward, bidirectional, random-access); this allowed the same sort() to work on arrays, vectors, deques, and any future container that satisfies the interface; the 1994 HP technical report documents the design rationale and was submitted verbatim to the ISO committee

**STEPANOV-C002** 🟢 — Stepanov chose to base STL on value semantics and copying rather than reference semantics and inheritance; this was a deliberate rejection of the object-oriented paradigm dominant in 1994; he has stated explicitly in interviews that OOP's approach to polymorphism is the wrong abstraction for algorithms

**STEPANOV-C003** 🟡 — from Ada generics (1985) through STL (1994) through "Elements of Programming" (2009), Stepanov consistently treats programming as applied mathematics: a program is correct if and only if it can be given an algebraic proof; this is a minority position in engineering culture but has produced the most durable generic-programming design in any mainstream language

**STEPANOV-C004** 🟠 — the STL's exclusion of strings as first-class containers (std::string is partially conformant but not a full container) was a pragmatic concession to the committee; Stepanov has criticised the compromise; it illustrates that the final standard was a negotiated artefact, not the pure design he proposed

**STEPANOV-C005** 🟠 — C++20 Concepts formally codified the iterator hierarchy Stepanov designed in 1994; the 26-year gap between STL's adoption and the formal concept system it assumed is itself a statement about committee-driven standardisation: the library shipped with informal semantics that were only made enforceable by the compiler a generation later

## Sources

- Stepanov, A., Lee, M. «The Standard Template Library» (HP Technical Report HPL-94-34, 1994)
- Stepanov, A., McJones, P. «Elements of Programming», Addison-Wesley (2009)
- Stepanov, A. «Short History of STL» (personal essay, 1995): http://www.stepanovpapers.com/
- ISO/IEC 14882:1998 — C++ standard including STL
- Stroustrup, B. «The Design and Evolution of C++» (1994) — context for STL committee adoption
