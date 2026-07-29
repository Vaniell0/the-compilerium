---
id: c-undefined-behavior
entity: research
title: "What Every C Programmer Should Know About Undefined Behavior"
capsule: Lattner's 2011 LLVM blog series makes the compiler-side case that UB is a deliberate optimisation contract, not a collection of bugs, and catalogs the trap doors practitioners most commonly misunderstand.
domain: it
subdomain: languages
type: blog
created: 2011
status: published
importance: high
authors: [Lattner C.]
year: 2011
venue: LLVM Project Blog
url: https://blog.llvm.org/2011/05/what-every-c-programmer-should-know.html
supports: [C-C004, C-C005, C-LINUX-C003]
challenges: []
confidence: strong
---

## What it says

A three-part series written by Chris Lattner (LLVM author) explaining how modern C compilers exploit Undefined Behavior for optimisation. Part 1 catalogs the sources of UB; Part 2 shows how the compiler uses UB as a licence to make transformations the programmer would consider surprising (signed overflow elimination, null-pointer-dereference hoisting, strict-aliasing-based alias analysis); Part 3 discusses the signed-overflow case in detail and explains why `-fwrapv` exists as an escape hatch.

## Why it matters here

C-C004 (C is close to the PDP-11 abstract machine, not real hardware) and C-C005 (C semantics are harder than C syntax) both rely on the compiler-side perspective being documented by someone with authority to speak to it. Lattner is the LLVM author writing in his compiler-engineering capacity — this is the closest thing to a canonical primary source on the compiler's view of UB. C-LINUX-C003 (Linux kernel uses -fno-strict-aliasing and -fwrapv) is directly corroborated by the series's discussion of why those flags exist and what the programmer is buying with them.

## Sources

- Lattner, C. (2011). *What Every C Programmer Should Know About Undefined Behavior*, Parts 1–3. blog.llvm.org/2011/05/what-every-c-programmer-should-know.html
