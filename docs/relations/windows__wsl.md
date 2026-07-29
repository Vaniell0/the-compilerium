---
id: windows__wsl
entity: relation
title: Windows ↔ WSL
capsule: The NT kernel hosting a Linux kernel inside its own hypervisor — and the engineering sequence that reveals which ABI is easier to ship than to emulate.
domain: it
subdomain: systems
type: relation
created: 2016
status: active
importance: high
from: windows
to: wsl
direction: a→b
confidence: strong
axes:
  historical: true
  structural: true
  competence: false
---

## What this is

WSL is the mechanism by which Windows acquired Linux developer workflows without replacing its kernel. The architectural sequence — translation (WSL1) abandoned for virtualisation (WSL2) — is a record of what the NT kernel cannot do cheaply and what Hyper-V can.

## Claims

**WINDOWS-WSL-C001** 🟢 — WSL1 ran inside the NT kernel via the LXSS/lxcore.sys driver; its syscall translations were NT kernel code, not userspace; Linux processes appeared in the Windows process table with a Linux personality — a design with no equivalent on the Linux side

**WINDOWS-WSL-C002** 🟢 — WSL2 runs on Hyper-V: the same Type-1 hypervisor that Windows itself sits on since Windows 8; Windows is the root partition, the WSL2 Linux kernel runs in a utility VM alongside it — both are Hyper-V guests at different privilege levels

**WINDOWS-WSL-C003** 🟠 — the POSIX/NTFS semantic gap (NTFS mandatory locking vs POSIX unlink-while-open) that broke WSL1 filesystem performance is a Windows architectural constraint, not a Linux one; WSL2 solves it by moving Linux I/O entirely inside the VM (ext4 vhdx), giving up cross-boundary filesystem performance to gain correctness

**WINDOWS-WSL-C004** 🟡 — WSL2 is the highest-integration Linux environment Microsoft has shipped under Windows; Docker Desktop, VS Code Remote, GPU passthrough, and systemd support are productisation layers on top of a generic Hyper-V VM that no third-party VM product matched within the Windows UI

## Competence signal

A practitioner who can explain why WSL1 required LXSS to live in the NT kernel while Wine lives entirely in userspace, and why WSL2's move to Hyper-V solved the filesystem semantics problem that translation could not — understands the boundary between ABI emulation and kernel virtualisation.

## Sources

- Microsoft DevBlogs: «WSL 2 Architecture» devblogs.microsoft.com/commandline/wsl-2-is-now-available-in-windows-insiders/
- Russinovich, M. & Solomon, D. *Windows Internals* (7th ed., 2017)
- Microsoft Docs: «WSL 2 FAQ» docs.microsoft.com/en-us/windows/wsl/faq
