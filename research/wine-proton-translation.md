---
id: wine-proton-translation
entity: research
title: Wine and Proton — userspace translation of the Win32 API
capsule: "Wine and Proton evidence that userspace Win32 API translation — no kernel, no VM — can carry 25+ years of Windows binaries to Linux with near-native performance for games."
domain: it
subdomain: systems
type: survey
created: 2023
status: published
importance: high
authors: [Wine Project, Valve Corporation]
year: 2023
venue: Wine Project docs
url: https://www.winehq.org/about
supports: [WINE-C001, WINE-C002, WINE-C003, WINE-C005, WINE-C007, LINUX-WINDOWS-C002, LINUX-WINDOWS-C008, WSL-C003]
challenges: []
confidence: strong
---

## What this is

Wine and Proton translate the Win32 API into Linux syscalls in userspace: applications call Wine's reimplementations of kernel32.dll, ntdll.dll, and friends, which map internally to POSIX. No kernel-space code involved.

## Why it matters here

WINE-C001 + LINUX-WINDOWS-C008 — Linux syscall ABI is stable ("we don't break userspace"); Windows NT syscalls (NtCreateFile, NtAllocateVirtualMemory) change between builds and are deliberately undocumented, so Microsoft routes applications through Win32 DLLs. Wine exploits the same routing: it intercepts at the DLL boundary because that layer is stable, not at the syscall boundary.

WSL-C003 — WSL1, in contrast, tried to intercept at the syscall level; this required reverse-translating undocumented NT primitives and kept breaking on Windows updates. This is one of the architectural reasons Microsoft pivoted to WSL2's virtualization approach.

WINE-C005 — Proton (Valve's Wine fork) adds DXVK (DirectX → Vulkan), Steam Linux Runtime (isolated container with glibc), and esync/fsync patches; the combination runs thousands of Windows games on Linux without kernel modifications — evidence that the userspace ABI (Win32 DLL exports) is a sufficiently stable foundation for a full compatibility layer.
