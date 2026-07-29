---
id: wsl-architecture
entity: research
title: WSL1 vs WSL2 architectural comparison
capsule: "WSL1's syscall-translation architecture vs WSL2's virtualisation architecture evidences that POSIX semantics are structurally translatable but performance-costly at the syscall boundary."
domain: it
subdomain: systems
type: survey
created: 2019
status: published
importance: high
authors: [Microsoft WSL Team]
year: 2019
venue: Microsoft DevBlogs
url: https://devblogs.microsoft.com/commandline/a-deep-dive-into-how-wsl-allows-windows-to-access-linux-files/
supports: [WSL-C001, WSL-C002, WSL-C003, WSL-C007, LINUX-WINDOWS-C007, LINUX-WSL-C001, WINDOWS-WSL-C001, WINDOWS-WSL-C002]
challenges: []
confidence: strong
---

## What this is

Architectural comparison of WSL1 and WSL2: WSL1 translates Linux syscalls into NT calls in kernel space via the lxcore.sys driver; WSL2 runs a real Linux kernel inside a Hyper-V utility VM with access to the host filesystem via 9P.

## Why it matters here

WSL-C001 — WSL1 implemented syscall translation in kernel space: every fork(), mmap(), epoll() was intercepted by lxcore.sys and translated into equivalent NT primitives. fork() was emulated via NtCreateProcess with manual address-space copying, which made it fundamentally slower than native Linux (Copy-on-Write via vm_fork was absent).

LINUX-WINDOWS-C007 + WSL-C007 — NTFS and POSIX file semantics are incompatible at the design level: NTFS returns Sharing Violation when deleting an open file; POSIX allows unlink() of an open inode (the file lives until the last descriptor is closed). WSL1 could not hide this from kernel space; WSL2 solves it by moving the Linux filesystem (ext4) into a separate vhdx disk inside the VM.

WSL-C004 + WSL-C006 — crossfs operations in WSL2 degrade sharply because access to host NTFS files goes through the 9P protocol over vsock; every stat(), open(), read() involves serialisation/deserialisation of 9P packets. The memory ballooning daemon inside the WSL2 VM dynamically returns RAM to the host, adding latency variance under intensive I/O.
