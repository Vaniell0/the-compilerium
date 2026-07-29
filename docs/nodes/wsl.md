---
id: wsl
entity: subject
title: Windows Subsystem for Linux
capsule: A compatibility bridge that started as a syscall translation layer (WSL1, 2016) and was replaced by a real Linux kernel in a Hyper-V VM (WSL2, 2019) — the engineering admission that reimplementing the Linux ABI costs more than shipping the kernel.
domain: it
subdomain: systems
type: platform
created: 2015
status: active
importance: high
---

## Timeline

- 2015 — WSL1 announced at Build 2016; internal codename Astoria (repurposed from an abandoned Android app compatibility project); LXSS driver intercepts Linux syscall numbers in NT kernel space; no Linux kernel binary present
- 2016 — WSL1 general availability in Windows 10 Anniversary Update; targets developer workflows (bash, grep, git, Python) — not production Linux servers
- 2018 — WSL1 hits architectural ceilings: inotify unreliable, /proc semantics incomplete, fork() emulated via NtCreateProcess (no copy-on-write), POSIX file delete semantics incompatible with NTFS mandatory locking
- 2019 — WSL2 announced at Build 2019; radical shift: real Linux kernel in a dedicated Hyper-V utility VM; filesystem crossings via 9P over vsock (Plan 9 protocol); no shared address space with Windows
- 2020 — WSL2 general availability in Windows 10 2004; WSL1 still supported as a compatibility path
- 2021 — WSLg ships: Linux GUI applications via a Wayland compositor inside WSL2, composited into Windows via RDP; GPU passthrough via /dev/dxg (paravirtualised interface to Windows GPU driver)
- 2022 — systemd support enabled in WSL2; CUDA support via GPU passthrough; WSL2 now hosts production ML workloads under Windows
- 2023 — Microsoft-maintained Linux kernel fork (`linux-msft-wsl`) becomes the primary WSL2 kernel; shipping custom kernel patches upstream

## Demonstrator

`wsl --distribution Ubuntu --exec inotifywait -m /tmp` produces live filesystem events from a real Linux kernel inotify implementation — something WSL1 could never do reliably. WSL1's inotify emulation missed events because NTFS does not expose the same notification model; WSL2's inotify works because it runs the real kernel on an ext4 vhdx. The demonstrator proves the thesis: the architectural pivot was driven by correctness, not by performance benchmarks — translation can handle simple syscalls but cannot faithfully reproduce kernel semantics that depend on data structures NT does not have.

## Ontology

- WSL1: kernel-space syscall translation (LXSS/lxcore.sys driver in NT); Linux syscall numbers intercepted, remapped to NT equivalents; no Linux kernel binary; fork() emulated via NtCreateProcess with manual address-space copy — structurally slower than copy-on-write
- WSL2: real Linux kernel (linux-msft-wsl fork) in a Hyper-V utility VM; two OS kernels on one machine sharing hardware via a Type-1 hypervisor; no shared address space, no shared filesystem — two distinct OS instances
- Cross-boundary filesystem: WSL2 accesses Windows NTFS via 9P protocol over vsock (a distributed filesystem protocol from Plan 9); every stat/open/read crossing the boundary involves 9P serialisation — the source of WSL2's cross-filesystem I/O penalty
- Networking: NAT by default (WSL2 gets a private subnet behind the Windows stack); bridged mode is opt-in; two network stacks means DNS, port forwarding, and firewall rules must be configured independently
- Memory: vmmemwsl daemon with Linux memory ballooning against Hyper-V; Linux does not see actual host RAM, over-reserves, and returns pages when Windows asks — the mechanism by which two OS kernels share RAM without deadlock
- WSLg: Wayland compositor inside the VM pipes GUI output over RDP to Windows' compositor; GPU passthrough via /dev/dxg exposes the Windows GPU driver to Linux processes through a paravirtualised interface
- The "translation ceiling": WSL1's failure on inotify, ptrace, filesystem case-sensitivity, and /proc semantics is not a list of bugs but evidence of a structural limit — any syscall translation layer that must faithfully reproduce semantics built on alien kernel data structures will eventually fail at that boundary

## Competence

```
can_explain:    understands WSL1 syscall-translation vs WSL2 virtualization;
                knows why WSL1 hit the translation ceiling (inotify, fork cost,
                POSIX/NTFS semantics incompatibility);
                knows 9P/NAT/ballooning as the price of running two OS kernels

can_apply:      installs and configures WSL2 as a development environment;
                debugs cross-boundary filesystem performance;
                tunes .wslconfig for memory and CPU limits;
                uses WSLg for Linux GUI apps

can_extend:     contributes to linux-msft-wsl kernel patches;
                works with WSLg or GPU passthrough integration;
                builds custom WSL2 distributions

can_teach:      explains why Microsoft abandoned translation for virtualization;
                positions Wine / WSL1 / WSL2 as three points on the
                translation-vs-VM axis — and why the VM won at the kernel level
                while userspace translation (Wine) still wins for Win32 apps

reach:
  can_explain:    low
  can_apply:      moderate
  can_extend:     very low
  can_teach:      very low

key_gap: can_explain — WSL2 is a common developer environment; few of its users
         can explain why Microsoft pivoted away from WSL1 (translation ceiling,
         not a quality decision), why 9P is the filesystem protocol, or why
         Wine's userspace translation succeeded where WSL1's kernel translation failed
```

## Claims

**WSL-C001** 🟢 — WSL1 translated Linux syscalls into NT calls in kernel mode without a Linux kernel binary present; the LXSS driver intercepted Linux syscall numbers and routed them through the NT syscall table; fork() was emulated via NtCreateProcess with manual address-space copying, with no copy-on-write

**WSL-C002** 🟢 — WSL2 runs a real Linux kernel in a dedicated Hyper-V utility VM alongside Windows; the two OS kernels share hardware via the Type-1 hypervisor with no shared address space

**WSL-C003** 🟢 — WSL2 accesses the Windows filesystem via 9P protocol over vsock — a distributed filesystem protocol originally designed for Plan 9; there is no shared filesystem, only a VM-to-VM RPC channel; cross-boundary I/O pays serialisation cost per call

**WSL-C004** 🟠 — "WSL runs Linux natively on Windows" is false in both generations: WSL1 translated syscalls imperfectly (inotify, ptrace, POSIX delete semantics all had structural limits); WSL2 runs Linux in a Hyper-V VM — the word "native" hides an architectural cost (Hyper-V memory reservation, 9P filesystem crossings, separate network stack) that matters the moment you do I/O across the boundary

**WSL-C005** 🟠 — Microsoft's shift from WSL1 to WSL2 is an engineering admission that reimplementing the Linux ABI is not economically viable: the translation layer required continuous patching for every Linux kernel feature with no NT equivalent; the honest answer was to ship the real kernel — the same conclusion Wine reached in reverse (Win32 in userspace is viable; NT syscalls are not)

**WSL-C006** 🟠 — "WSL2 is just a VM" undersells the productisation: Hyper-V memory ballooning, GPU passthrough via /dev/dxg, WSLg Wayland→RDP compositing, VS Code Remote, Docker Desktop integration, and systemd support make WSL2 a tighter host-guest pairing than any generic VM; calling it "just a VM" misses why it displaced purpose-built Linux VMs for developer workflows

**WSL-C007** 🟢 — POSIX file semantics (open, delete, rename an open file — descriptor remains valid until closed) and NTFS mandatory locking are structurally incompatible; WSL1's emulation of POSIX delete semantics on NTFS caused filesystem performance degradation and was one architectural driver behind the WSL2 shift to an ext4 vhdx inside the VM

**WSL-C008** 🟡 — WSLg (GUI apps in WSL2) uses a Wayland compositor inside the WSL2 VM piped over RDP to Windows; GPU passthrough via /dev/dxg exposes the Windows GPU driver to Linux applications through a paravirtualised interface; the full graphics stack crosses three layers (Linux app → Wayland → RDP → Windows compositor)

**WSL-C009** 🔴 — as WSL2 and Hyper-V mature, the boundary between "Windows" and "Linux" narrows to hypervisor scheduling: both OSes run as VMs on the same Type-1 hypervisor; whether kernel architecture remains a fundamental separation or collapses into a workload-routing question for the hypervisor is unanswered

## Relations

- [Linux ↔ WSL](../relations/linux__wsl.md)
- [Windows ↔ WSL](../relations/windows__wsl.md)
- [Linux ↔ Windows](../relations/linux__windows.md)
- [Wine → Windows](../relations/wine__windows.md)

## Sources

- Microsoft DevBlogs: «A Deep Dive into WSL2» devblogs.microsoft.com/commandline/a-deep-dive-into-how-wsl-allows-windows-to-access-linux-files/
- Microsoft DevBlogs: «WSL 2 is now available in Windows Insiders» devblogs.microsoft.com/commandline/wsl-2-is-now-available-in-windows-insiders/
- Microsoft: WSL Kernel repository — github.com/microsoft/WSL2-Linux-Kernel
- Plan 9 9P protocol specification — 9p.io/sys/man/5/INDEX.html
- Microsoft Docs: «WSLg architecture» github.com/microsoft/wslg
- Phoronix: WSL1 vs WSL2 filesystem benchmarks (2020–2024)
