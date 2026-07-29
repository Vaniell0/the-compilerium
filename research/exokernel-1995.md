---
id: exokernel-1995
entity: research
title: Exokernel — an OS architecture for application-level resource management
capsule: "The 1995 exokernel paper defines the logical extreme of the minimal-kernel position — kernel manages hardware multiplexing only, all OS abstractions live in userspace library OSes."
domain: it
subdomain: systems
type: paper
created: 1995
status: published
importance: high
authors: [Engler, Kaashoek, O'Toole]
year: 1995
venue: SOSP 1995
url: https://dl.acm.org/doi/10.1145/224056.224076
supports: [LINUX-WINDOWS-C006]
challenges: []
confidence: strong
---

## What this is

Engler, Kaashoek, O'Toole, «Exokernel: An Operating System Architecture for Application-Level Resource Management», SOSP 1995. MIT. The kernel does one thing — safely multiplex physical hardware between applications. All OS abstractions (virtual memory, filesystems, scheduler) live in userspace libraries (libOS); each application chooses its OS implementation.

## Why it matters here

LINUX-WINDOWS-C006 — exokernel is the theoretical pole of "minimum abstraction"; Windows NT is the opposite pole ("maximum managed abstractions"); Linux sits between them, giving up stable ABI but keeping kernel-space abstractions. Placing exokernel on the axis lets one position WSL2 and Proton correctly: WSL2 = Hyper-V VM with a full Linux kernel (adds an abstraction layer); Proton = userspace translation (moves abstractions to userspace, closer to the exokernel end). Both are compromises between the poles.
