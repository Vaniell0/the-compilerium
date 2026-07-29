---
id: gcc
entity: subject
title: GCC (GNU Compiler Collection)
capsule: The GNU project's compiler suite (C, C++, Fortran, Objective-C, Go, D, Ada) — the reference free-software compiler for over three decades, licensed under GPL v3, whose long dominance shaped the culture of open-source toolchains.
domain: it
subdomain: compilers
type: tool
created: 1987
status: stub
importance: high
---

## Timeline

- 1987 — Richard Stallman releases GCC 1.0 as the GNU Project's C compiler
- 1992 — GCC 2.0 adds C++ support (initially G++)
- 1997 — egcs fork over pace-of-development disagreements
- 1999 — egcs becomes official GCC (merger)
- 2007 — GCC 4.3: switch to GPL v3
- 2010 — GCC 4.6: growing competition from Clang/LLVM
- 2015 — GCC 5.1: default C++14 mode

## Ontology

- Multi-language compiler front-ends sharing common middle-end and back-end
- GENERIC / GIMPLE / RTL intermediate representations
- GPL v3: strong copyleft; historically the default system compiler on Linux
- Plugin API added late (GCC 4.5) — deliberately restrained to protect the GPL boundary
- Culturally paired with GNU Binutils, glibc, GDB — the GNU toolchain stack

## Competence

```
can_explain:    understands the difference between GENERIC, GIMPLE, RTL;
                knows why GCC delayed plugin architecture and how it relates to GPL strategy

can_apply:      builds and installs GCC from source;
                debugs miscompilations using -fdump-tree and -fdump-rtl

can_extend:     writes GCC plugins;
                contributes patches to gcc-patches@

can_teach:      contrasts GCC's monolithic middle-end with LLVM's library architecture

reach:
  can_explain:    low
  can_apply:      moderate
  can_extend:     very low
  can_teach:      very low

key_gap: can_apply → can_explain
         most Linux users build with gcc daily but cannot describe why the GCC internal IRs exist
         or why the plugin API arrived so late and so cautiously
```

## Claims

**GCC-C001** 🟢 — GCC delayed a plugin API until 4.5 (2010) as a deliberate stance to protect GPL boundaries: unrestricted plugin loading would let proprietary code link with the compiler and weaken copyleft enforcement

**GCC-C002** 🟡 — the GPL v3 switch in GCC 4.3 (2007) and the rise of Clang/LLVM (permissive licence) are historically linked: Apple, FreeBSD, and other actors uncomfortable with GPL v3 accelerated LLVM adoption

## Relations

- [Clang ↔ GCC](../relations/clang__gcc.md)

## Sources

- gcc.gnu.org
- GCC release history: gcc.gnu.org/releases.html
- Stallman, R. «GCC and Copyleft»
