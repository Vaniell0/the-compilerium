---
id: c__llvm
entity: relation
title: C → LLVM
capsule: LLVM's IR inherits C's assumptions about flat memory and pointer semantics because C was the dominant model of portable systems code when LLVM was designed in 2003.
domain: it
subdomain: compilers
type: relation
created: 2003
status: active
importance: high
from: c
to: llvm
direction: a→b
confidence: strong
axes:
  historical: true
  structural: true
  competence: false
---

## What this is

LLVM was designed in a world where C defined portable systems code. Its IR inherits that worldview — not by copying C, but by inheriting the assumptions of a dominant paradigm.

## Claims

**C-LLVM-C001** 🟠 — LLVM IR's C-shaped assumptions reflect the only model of "safe portability" that existed in 2003

**C-LLVM-C002** 🔴 — would LLVM IR look fundamentally different if ML-family languages had dominated systems programming in 2003?

## Sources

- Lattner, C. & Adve, V. (2004). *LLVM: A Compilation Framework for Lifelong Program Analysis & Transformation*
- https://llvm.org/docs/LangRef.html
