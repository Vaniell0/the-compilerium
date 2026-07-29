---
id: linux__windows
entity: relation
title: Linux ↔ Windows
capsule: Two opposite architectural bets on what a kernel should do — expose hardware minimally with an unstable ABI, or abstract hardware fully with a stable one — swapping competitive segments over forty years without swapping kernels.
domain: it
subdomain: systems
type: relation
created: 1991
status: active
importance: critical
from: linux
to: windows
direction: symmetric
confidence: strong
axes:
  historical: true
  structural: true
  competence: true
---

## What this is

Linux and Windows are two opposite architectural bets on what a kernel should do — expose hardware minimally with an unstable ABI, or abstract hardware fully with a stable one — that have swapped competitive segments over forty years while keeping opposite kernels.

## Claims

**LINUX-WINDOWS-C001** 🟢 — Windows maintains a stable binary driver ABI (drivers from XP often run on Windows 11); Linux intentionally has no stable kernel ABI (documented in `stable-api-nonsense.rst`); both are deliberate architectural choices with opposite consequences

**LINUX-WINDOWS-C002** 🟢 — Windows added Linux via hardware virtualization (WSL2, see `wsl.md`) while Linux added Windows binaries via userspace API translation (Proton, see `wine.md`); the direction that required a VM reveals which ABI is harder to implement on top of the other — POSIX is easier to translate than NT

**LINUX-WINDOWS-C003** 🟢 — firmware update tools (SSDs, NVMe controllers, USB firmware) are predominantly Windows-only because vendors write a signed Windows driver that programs the device directly and distributes the binary only through the Windows toolchain

**LINUX-WINDOWS-C004** 🟠 — Windows's stable ABI created vendor adoption at the cost of legacy debt; Linux's unstable ABI created upstream pressure at the cost of vendor friction; neither is technically superior — they optimise for different governance models

**LINUX-WINDOWS-C005** 🟢 — Linux migrated into Windows's gaming segment (Steam Deck, Proton) while Windows migrated into Linux's developer segment (WSL2, Windows Terminal); both now compete in territory the other used to own exclusively, without adopting the other's architecture

**LINUX-WINDOWS-C006** 🟠 — the exokernel (MIT, 1995) defines the logical extreme of the Linux position: kernel manages only hardware multiplexing, all OS abstractions live in user-space library OSes; Linux sits between Windows (full abstraction) and exokernel (zero abstraction) — the spectrum reveals the argument is about *where* to draw the abstraction boundary, not whether one exists

**LINUX-WINDOWS-C007** 🟢 — POSIX file semantics allow deleting or renaming an open file (the descriptor remains valid until closed, pointing to the inode); NTFS enforces mandatory file locking (deleting an open file returns Sharing Violation) — a structural incompatibility that surfaced most sharply in WSL1's emulation attempt (see `wsl.md`)

**LINUX-WINDOWS-C008** 🟢 — Linux syscall numbers are stable across kernel versions ("never break userspace"); Windows NT syscall numbers change between builds, which is why Microsoft requires applications to route calls through DLLs (kernel32.dll, ntdll.dll, user32.dll) rather than issue raw syscalls

**LINUX-WINDOWS-C009** 🟢 — the firmware Windows-only lock-in is economic rather than technical: Linux has the hardware capability but lacks the binary protocol outside the Windows tool — Linux is locked out by vendor economics, not driver capability

**LINUX-WINDOWS-C010** 🟢 — Shellshock (CVE-2014-6271, CVSS 9.8) originated in a bash usability feature — function export via environment variables to compose shell environments across processes; a parser bug executed appended code, turning the feature into remote code execution across CGI, SSH ForceCommand, and DHCP client scripts

**LINUX-WINDOWS-C011** 🟢 — the Windows UAC auto-elevation bypass exploits a UX relaxation: certain executables auto-elevate without a prompt (fodhelper.exe, eventvwr.exe) and read from HKCU registry that any standard user can write; a payload key plus a whitelisted executable yields an Administrator token with no dialog and no CVE assigned — the vector is an architectural consequence of the concession, not a code defect

**LINUX-WINDOWS-C012** 🟡 — Shellshock and the UAC auto-elevation bypass follow the same pattern: a usability relaxation whose invariant was never enforced becomes a security hole; the pattern generalises across both platforms and is not a Linux-only or Windows-only phenomenon

## Competence signal

A practitioner who can explain why firmware tools are Windows-only (vendor economics, not driver capability), why the Windows-to-Linux migration required a VM while the Linux-to-Windows migration used userspace translation, why Shellshock and UAC auto-elevation follow the same "usability relaxation → CVE" pattern, and where exokernels sit in the same design space — understands OS architecture, not just OS history.

## Sources

- Kroah-Hartman, G. `Documentation/process/stable-api-nonsense.rst`
- Engler, D., Kaashoek, M.F., O'Toole, J. «Exokernel: An Operating System Architecture for Application-Level Resource Management», SOSP 1995
- Microsoft Docs: «WSL 2 Architecture»
- Valve: «Steam Deck Hardware»
- NVD: CVE-2014-6271 (Shellshock)
- HADESS: «User Account Control/Uncontrol: Mastering the Art of Bypassing Windows UAC»
