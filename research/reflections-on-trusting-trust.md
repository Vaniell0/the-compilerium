---
id: reflections-on-trusting-trust
entity: research
title: "Reflections on Trusting Trust"
capsule: Thompson's 1984 Turing lecture evidences that compiler trust cannot be verified through source code alone — the bootstrap problem is structural, not incidental.
domain: it
subdomain: systems
type: talk
created: 1984
status: published
importance: critical
authors: [Ken Thompson]
year: 1984
venue: ACM Turing Award Lecture 1984
url: https://dl.acm.org/doi/10.1145/358198.358210
supports: [C-C004, GCC-C001, CLANG-C002]
challenges: []
confidence: strong
---

## What this is

Turing Award lecture 1983 (published 1984): Ken Thompson shows that a compiler can be modified to insert trojan programs into the code it compiles, including the next version of the compiler itself — while the source code remains clean; «you can't trust code that you did not totally create yourself».

## Why it matters

A fundamental argument about trust in software supply chains: you cannot verify a program's correctness only through its source code if the compiler is compromised. Supports future claims about C toolchain trust, bootstrap problem, and reproducible builds. A stub for person/thompson.md until it is written.
