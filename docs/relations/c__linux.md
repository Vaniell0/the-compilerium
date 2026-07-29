---
id: c__linux
entity: relation
title: C → Linux
capsule: Linux is written in C, and this choice directly determined its portability across architectures — C's abstract machine model is the mechanism, not an accident.
domain: it
subdomain: systems
type: relation
created: 1991
status: active
importance: critical
from: c
to: linux
direction: a→b
confidence: strong
axes:
  historical: true
  structural: true
  competence: false
---

## What this is

Linux is written in C. This is not an implementation detail — the choice of C determined Linux's portability across architectures and made it possible for the kernel to compile on any hardware without modification.

## Claims

**C-LINUX-C001** 🟢 — Linux kernel is written in C (with assembly for architecture-specific code); portability across CPU architectures is a direct consequence of C's abstract machine model

**C-LINUX-C002** 🟡 — Rust was added to Linux in 2022 as a second implementation language; C remains the primary language; this is the first time Linux's single-language policy has been relaxed in 31 years

**C-LINUX-C003** 🟠 — C's undefined behavior as an optimization contract creates security-relevant ambiguity in kernel code; the Linux kernel maintains its own dialect of C with strict aliasing disabled and specific compiler flags to constrain UB

## Sources

- linux/Documentation/process/coding-style.rst
- Corbet, J. et al. *Linux Device Drivers* (3rd ed.)
- Wedson Almeida Filho. «Rust in the Linux Kernel», linux.conf.au 2022
