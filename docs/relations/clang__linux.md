---
id: clang__linux
entity: relation
title: Clang → Linux
capsule: Clang gained the ability to compile the Linux kernel around 2017–2018 and became the default for the Android kernel, coexisting with GCC along a licensing fault line.
domain: it
subdomain: compilers
type: relation
created: 2017
status: active
importance: medium
from: clang
to: linux
direction: a→b
confidence: strong
axes:
  historical: false
  structural: true
  competence: false
---

## What this is

Linux was historically compiled with GCC. Clang gained the ability to compile the Linux kernel around 2017–2018; the Android kernel switched to Clang/LLVM as its primary compiler. The two toolchains now coexist for the same codebase.

## Claims

**CLANG-LINUX-C001** 🟢 — the Android kernel (a Linux fork) is compiled with Clang/LLVM by default since Android 12; Google migrated away from GCC for Android kernel development

**CLANG-LINUX-C002** 🟡 — the Linux kernel uses GCC extensions (typeof, statement expressions, designated initialisers) that both GCC and Clang support; the kernel is not written in standard C — it uses a specific dialect

**CLANG-LINUX-C003** 🟠 — the coexistence of GCC and Clang for Linux kernel compilation is a consequence of the GPL v2 / BSD licensing split: GCC (GPL) remains the reference compiler; Clang (BSD) enables corporate toolchain control without GPL obligations

## Sources

- Android Open Source Project: «Clang/LLVM», source.android.com
- Nick Desaulniers. «The Linux Kernel's Clang/LLVM support», linux.conf.au 2019
