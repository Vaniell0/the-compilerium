---
id: stroustrup
entity: person
title: Bjarne Stroustrup
capsule: Designer of C++ (1979–), the language that carried Simula's object model into C's machine model and now stewards fifty years of legacy under an ISO committee.
domain: it
subdomain: languages
type: person
created: 1979
status: active
importance: high
---

## Known for

- Created "C with Classes" (1979) at Bell Labs, which became C++ in 1983
- Articulated the zero-cost abstraction principle
- Author of *The C++ Programming Language* (1985) and *The Design and Evolution of C++* (1994)

## Technologies shaped

- [C++](../docs/nodes/c-plus-plus.md)

## Key decisions

**STROUSTRUP-C001** 🟢 — combined Simula's object model with C's performance model; the two parents of C++ are not C and "more C"

**STROUSTRUP-C002** 🟢 — zero-cost abstractions: "what you don't use, you don't pay for; what you do use, you couldn't hand-code any better"

**STROUSTRUP-C003** 🟡 — chose never to break backwards compatibility with C; every standard adds, nothing is removed

**STROUSTRUP-C004** 🟠 — the decision to maintain C compatibility is the direct cause of C++'s ABI instability and std::string's uncorrectable design

## Sources

- Stroustrup, B. (1994). *The Design and Evolution of C++*
- https://www.stroustrup.com/hopl2.pdf
