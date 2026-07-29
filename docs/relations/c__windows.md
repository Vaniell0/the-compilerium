---
id: c__windows
entity: relation
title: C → Windows
capsule: Windows NT was written in C, and its entire API surface — Win32, WinRT, and the driver model — exposes C-callable interfaces as the canonical ABI.
domain: it
subdomain: systems
type: relation
created: 1993
status: active
importance: high
from: c
to: windows
direction: a→b
confidence: strong
axes:
  historical: true
  structural: true
  competence: false
---

## What this is

The Windows NT kernel was written in C with isolated x86 assembly. The Windows API surface is C-first: Win32, WinRT, and the driver model all expose C-callable interfaces as the canonical ABI. C is the layer through which userspace, drivers, and the kernel contract is expressed.

## Claims

**C-WINDOWS-C001** 🟢 — Windows NT (1993) was written in C by David Cutler's team from DEC; the kernel, HAL, and Executive Services are C; this continues the tradition set by Unix where C is the correct language for OS implementation

**C-WINDOWS-C002** 🟢 — the Windows driver model (WDM/KMDF) exposes a C API; writing a kernel-mode driver means writing C structs, calling C functions, and following C calling conventions; higher-level languages are not supported in kernel mode without a C shim

**C-WINDOWS-C003** 🟡 — Windows' stable binary driver ABI is expressible in C; it depends on C struct layout, C calling conventions, and the absence of name mangling; a C++ driver compiles but must suppress C++ ABI features that would break the stability guarantee

**C-WINDOWS-C004** 🟠 — the reason firmware tools are Windows-only is not "Windows supports C and Linux doesn't" — both kernels are C; it is that the vendor's signed Windows driver directly programs hardware and the binary is distributed only through the Windows toolchain; C is neutral here, distribution policy is not

## Sources

- Cutler, D. «Inside Windows NT» (Helen Custer, Microsoft Press, 1992)
- Microsoft Docs: «Kernel-Mode Driver Architecture Design Guide»
- Windows Driver Kit (WDK) documentation
