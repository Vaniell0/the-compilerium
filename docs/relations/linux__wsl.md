---
id: linux__wsl
entity: relation
title: Linux ↔ WSL
capsule: The Linux kernel shipping inside a Microsoft product — and the asymmetry that Wine translated Win32 in userspace while Microsoft needed a full Linux VM to translate Linux at all.
domain: it
subdomain: systems
type: relation
created: 2016
status: active
importance: high
from: linux
to: wsl
direction: a→b
confidence: strong
axes:
  historical: true
  structural: true
  competence: false
---

## What this is

WSL makes the Linux kernel a dependency of Windows. The structural asymmetry is precise: Wine translates Win32 in userspace (no kernel required); WSL1 tried to translate the Linux kernel ABI in kernel space (and hit the ceiling); WSL2 ships the real Linux kernel (admission that translation does not scale).

## Claims

**LINUX-WSL-C001** 🟢 — WSL2 runs the linux-msft-wsl kernel fork — a real Linux kernel with Microsoft patches for Hyper-V integration, /dev/dxg GPU passthrough, and WSLg Wayland support; the kernel is open source and accepts upstream contributions

**LINUX-WSL-C002** 🟠 — the Wine ↔ WSL asymmetry is architecturally precise: Wine translates Win32 API calls in userspace without a Windows kernel because the Win32 DLL boundary is stable; WSL1 could not translate the Linux kernel ABI in kernel space because the Linux kernel ABI includes semantics (inotify, ptrace, copy-on-write fork, POSIX file deletion) that have no NT primitive — the depth of the Linux ABI is what made translation impractical

**LINUX-WSL-C003** 🟡 — the linux-msft-wsl kernel is a concrete reversal of the historical direction: from 2016 onward Microsoft maintains a Linux kernel fork, publishes it publicly, and ships it to millions of Windows developers; the CBL-Mariner distro (Azure) and WSL2 kernel are two data points in Microsoft's transition from "Linux is a cancer" (Ballmer 2001) to Linux as infrastructure

## Competence signal

A practitioner who can explain why Wine needed no Windows kernel while WSL needed a real Linux kernel — and map this to the stability difference between Win32 DLLs and the Linux syscall/kernel-internal ABI — understands why ABI depth is the decisive variable in compatibility layer design.

## Sources

- Microsoft: WSL Kernel repository — github.com/microsoft/WSL2-Linux-Kernel
- Wine project: winehq.org/about
- Microsoft DevBlogs: «A Deep Dive into WSL» devblogs.microsoft.com/commandline/a-deep-dive-into-how-wsl-allows-windows-to-access-linux-files/
