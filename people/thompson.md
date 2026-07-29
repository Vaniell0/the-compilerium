---
id: thompson
entity: person
title: Ken Thompson
capsule: Co-creator of Unix, B and (later) Go at Bell Labs and Google; the 1984 Turing lecture 'Reflections on Trusting Trust' still defines what compiler trust means.
domain: it
subdomain: systems
type: person
created: 1966
status: active
importance: critical
---

## Known for

- Co-author of Unix (1969) with Dennis Ritchie at Bell Labs
- Wrote the first version of Unix in PDP-7 assembly in three weeks while his wife was on vacation
- Created B (predecessor of C) and co-created C
- Invented regular expressions in their modern form (1968); grep is his tool
- Co-author of UTF-8 (1992) with Rob Pike
- Co-author of the Go language (2009) with Rob Pike and Robert Griesemer at Google
- Author of «Reflections on Trusting Trust» (1984, Turing Award): a compiler that hides a backdoor in itself and in any compiler it compiles

## Technologies shaped

- [C](../docs/nodes/c.md)
- [Linux](../docs/nodes/linux.md)

## Key decisions

**THOMPSON-C001** 🟢 — «Reflections on Trusting Trust» (1984) described an attack via the chain of trust in a compiler; in 2024 the xz-backdoor implemented similar logic via the chain of trust in a maintainer — 40 years later

**THOMPSON-C002** 🟢 — UTF-8 (Thompson & Pike, 1992) was designed in one night on a paper napkin in a restaurant; became the universal encoding of the Internet not through a standard, but through technical superiority

**THOMPSON-C003** 🟠 — Thompson created Go in 2009 as a reaction to C++'s complexity at Google: a simple compiled language with GC and goroutines; the same motivation as Rust — C++ became too complex — but the opposite solution: simplicity instead of formal guarantees

## Sources

- Thompson, K. «Reflections on Trusting Trust», CACM (1984)
- Ritchie, D. & Thompson, K. «The UNIX Time-Sharing System», CACM (1974)
- Pike, R. & Thompson, K. «Hello World», UTF-8 history
