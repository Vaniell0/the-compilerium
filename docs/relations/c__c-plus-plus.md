---
id: c__c-plus-plus
entity: relation
title: C ↔ C++
capsule: C++ was built on C's syntax and machine model but added Simula's object model, making them related but not mutually compatible languages.
domain: it
subdomain: languages
type: relation
created: 1983
status: active
importance: high
from: c
to: c-plus-plus
direction: symmetric
confidence: strong
axes:
  historical: true
  structural: true
  competence: false
---

## What this is

C++ was built on C's syntax and machine model but added a second parent: Simula's object model. The two languages share a compiler toolchain and freely mix in practice, but have different philosophical foundations.

## Claims

**C-C-PLUS-PLUS-C001** 🟢 — C and C++ are not the same language; programs valid in C are not always valid C++ and vice versa

**C-C-PLUS-PLUS-C002** 🟡 — the perception that C++ "extends" C leads most developers to treat C as a subset of C++, which it is not

**C-C-PLUS-PLUS-C003** 🟠 — C's simplicity gives it a stable ABI; C++'s abstractions make a stable ABI structurally impossible — the two languages have opposite answers to the question of what a compiled binary should look like

**C-C-PLUS-PLUS-C004** 🔴 — as C++ grows (C++20, C++23), does the overlap with C shrink in practice — or do they continue to coexist indefinitely as layers in the same codebase?

## Sources

- Stroustrup, B. (1994). *The Design and Evolution of C++*
- https://www.open-std.org/jtc1/sc22/wg14/ (C standard)
- https://isocpp.org/
