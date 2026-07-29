---
id: windows
entity: subject
title: Windows
capsule: The NT kernel Dave Cutler brought from DEC VMS in 1993 — not DOS with a graphical shell but a proper object-model OS that has run every version of Windows since XP, now sitting under its own Type-1 hypervisor since Windows 8.
domain: it
subdomain: systems
type: platform
created: 1993
status: active
importance: critical
---

## Timeline

- 1988 — Dave Cutler leaves DEC after VMS; joins Microsoft with his core VMS team to design a new OS from scratch
- 1993 — Windows NT 3.1: Cutler ships NT; HAL, object model, Executive Services, subsystem architecture all lifted conceptually from VMS
- 1994 — NT kernel: hybrid designation formalised — not monolithic (Linux), not pure microkernel (Mach); Executive Services run in kernel mode but are logically separated components
- 2001 — Windows XP: NT kernel becomes the consumer OS; DOS/Windows 9x line (which ran on top of MS-DOS) ends with Windows Me; the popular "Windows is DOS" conflation frozen by this era's memory
- 2007 — Windows Vista: UAC (User Account Control) introduced; the auto-elevation concession and its bypass pattern documented in [Linux ↔ Windows](../relations/linux__windows.md) as LINUX-WINDOWS-C011
- 2012 — Windows 8 / Hyper-V 3.0: Windows begins running as a root partition over its own Type-1 hypervisor
- 2015 — [WSL1](wsl.md): Windows Subsystem for Linux — translation of Linux syscalls into NT calls via LXSS driver; no Linux kernel present
- 2018 — VBS (Virtualization Based Security): Hyper-V isolates the Secure Kernel from the normal Windows kernel; trust boundary drops below ring 0
- 2019 — [WSL2](wsl.md): real Linux kernel in a Hyper-V utility VM alongside Windows
- 2021 — Windows 11: TPM 2.0 and VBS mandatory hardware requirements; VBS-on-by-default enforced across new installs
- 2022 — HVCI (Hypervisor-Protected Code Integrity): unsigned kernel code cannot execute even from kernel mode
- 2024 — Win32 at 30+ years: a 1995 32-bit Win32 application often runs unchanged on Windows 11; the stability contract has held longer than most software engineers' careers

## Demonstrator

Win32 thirty-year binary stability: a 32-bit Windows application compiled in 1995 using the Win32 API often runs without modification on Windows 11 in 2024. This is not accidental — the Win32 subsystem was explicitly designed as a stable ABI layer insulating application developers from NT syscall churn (NT syscalls are unstable across builds; see LINUX-WINDOWS-C008 in [Linux ↔ Windows](../relations/linux__windows.md)). The demonstrator is any vintage executable that still runs: Notepad from NT 3.51, 16-bit Windows apps via WoW64. The thesis: Win32 stability is a deliberate engineering contract, not legacy inertia.

## Ontology

- **NT kernel**: hybrid architecture — HAL (Hardware Abstraction Layer) → Kernel → Executive Services (Memory Manager, Object Manager, I/O Manager, Process Manager) → Subsystem layer (Win32, [WSL](wsl.md)); Executive runs in kernel mode but is logically separated from the microkernel layer
- **Win32**: the stable API contract since 1993; applications do not call NT syscalls directly (they change between builds) — they call kernel32.dll/ntdll.dll, which are the stable bridge; [Wine](wine.md) intercepts exactly here
- **Hyper-V**: Type-1 hypervisor that launches before Windows; Windows itself is the privileged root partition; ring -1 below the Windows kernel since Windows 8
- **Registry**: hierarchical configuration database with transactional writes and ACLs; not a flat INI-file replacement — a structured store with security descriptors on every key
- **NTFS mandatory locking**: unlike POSIX (delete/rename open files freely), NTFS returns Sharing Violation on deleting an open file; structural incompatibility with POSIX that drove the [WSL1](wsl.md) → [WSL2](wsl.md) pivot

## Competence

```
can_explain:    knows that NT is not DOS-derived and can trace Cutler → VMS → NT;
                knows the Hyper-V model (Win8+) and why Win32 ≠ NT syscalls;
                understands the Registry as a transactional ACL-protected DB

can_apply:      writes Windows kernel-mode drivers (WDM/WDF);
                works with Win32 API and NT native API;
                understands IRQL (Interrupt Request Level) as an analogue of Linux preemption

can_extend:     develops filter drivers, minifilters;
                understands Windows security model (token, ACL, integrity levels, VBS)

can_teach:      explains why the DOS lineage ended with Me/98;
                contrasts stable ABI (Windows) vs unstable ABI (Linux)
                as two deliberate architectural choices with different consequences;
                walks the Hyper-V / VBS / HVCI stack from hardware up

reach:
  can_explain:    moderate
  can_apply:      very low
  can_extend:     very low
  can_teach:      very low

key_gap: can_explain — most Windows practitioners know the UI; few know that the NT
         kernel is VMS-derived, that Win32 is a stability shim over unstable NT
         syscalls, or that Hyper-V sits below Windows since Win8
```

## Claims

**WINDOWS-C001** 🟢 — NT kernel is a hybrid architecture: not a monolith (Linux) and not a microkernel (Mach); Executive Services run in kernel mode but are logically separated from the microkernel layer — the hybrid label names an internal boundary, not a marketing position

**WINDOWS-C002** 🟢 — since Windows 8, Windows runs as a root partition on top of its own Type-1 hypervisor (Hyper-V); the hypervisor launches before Windows and the Windows kernel itself runs in a privileged VM

**WINDOWS-C003** 🟢 — Microsoft maintains a stable binary ABI for kernel-mode drivers: a driver written for Windows XP often runs on Windows 11; this stability contract is enforced by keeping the Windows Driver Model (WDM/KMDF) interface frozen across major kernel versions

**WINDOWS-C004** 🟢 — Dave Cutler designed NT under the direct influence of DEC VMS: the object model, IRQL hierarchy, HAL design, and executive-subsystem separation are VMS lineage; the NT kernel shares no ancestry with MS-DOS, which ended as a consumer platform with Windows Me (2000)

**WINDOWS-C005** 🟠 — the mass-audience belief that "Windows is slow because it's bloated" conflates NT kernel overhead with the userspace stack (telemetry agents, Defender real-time scanning, Windows Update service, superfetch); the NT kernel is a well-engineered hybrid; the perceived slowness lives in the layer above it ⚠

**WINDOWS-C006** 🟠 — the Registry is a hierarchical key-value database with transactional writes and per-key ACLs — not a flat INI replacement; the pain users associate with it is the tooling (regedit, opaque key paths) and the absence of a per-application namespace, not the data model itself

**WINDOWS-C007** 🟠 — Windows's stable driver ABI and Linux's unstable ABI are not a technical accident but two deliberate architectural decisions with opposite consequences: Windows gained hardware vendor adoption at the cost of accumulating binary legacy; Linux gained upstream pressure at the cost of vendor friction — neither is technically superior

**WINDOWS-C008** 🟡 — firmware tools (SSD updates, NVMe controllers, USB firmware) are predominantly Windows-only because vendors write a signed Windows driver that programs the device directly; from Linux the same firmware is inaccessible not due to driver capability gaps but due to absence of the binary protocol outside the Windows toolchain

**WINDOWS-C009** 🟡 — VBS/HVCI (2018/2022) push the effective trust boundary below the Windows kernel: with HVCI enforcing signed code in ring 0 and the Secure Kernel isolated by Hyper-V, "kernel compromise" no longer implies full system compromise — a hardening model with no structural equivalent in the mainline Linux kernel

**WINDOWS-C010** 🔴 — as [WSL2](wsl.md) and Hyper-V mature, does the boundary between "Windows" and "Linux" collapse at the system level — both running as VMs on the same hypervisor — or does kernel architecture remain a fundamental separation regardless of virtualisation layers?

## Relations

- [Linux ↔ Windows](../relations/linux__windows.md)
- [C → Windows](../relations/c__windows.md)
- [Wine → Windows](../relations/wine__windows.md)
- [Windows ↔ WSL](../relations/windows__wsl.md)

## Sources

- Russinovich, M. & Solomon, D. *Windows Internals* (7th ed., 2017)
- Custer, H. *Inside Windows NT* (Microsoft Press, 1992) — primary source on Cutler's VMS design influence
- Dave Cutler interview: channel9.msdn.com/Blogs/TheChannel9Team/Dave-Cutler-Windows-Azure-is-his-Magnum-Opus
- Microsoft Docs: «Windows Driver Kit (WDK)»
- Microsoft Docs: «Virtualization Based Security (VBS)»
- Microsoft Docs: «Hypervisor-Protected Code Integrity (HVCI)»
- WSL2 architecture: devblogs.microsoft.com/commandline/wsl-2-is-now-available-in-windows-insiders/
- Raymond Chen. *The Old New Thing* — decades of Win32 compatibility case studies: devblogs.microsoft.com/oldnewthing/
