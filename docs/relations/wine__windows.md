---
id: wine__windows
entity: relation
title: Wine → Windows
capsule: Wine reimplements Windows's own stable DLL boundary to run Windows binaries on Linux — the largest public reverse-engineering artifact of the Win32 ABI, built precisely because Microsoft made that boundary stable.
domain: it
subdomain: systems
type: relation
created: 1993
status: active
importance: high
from: wine
to: windows
direction: wine→windows
confidence: strong
axes:
  historical: true
  structural: true
  competence: true
---

## What this is

Wine is a from-scratch userspace reimplementation of the Win32 DLL layer ([Windows](../../docs/nodes/windows.md): kernel32.dll, ntdll.dll, user32.dll, GDI32, etc.) that allows Windows binaries to run on Linux. The structural dependency runs one way: Wine exists because of Windows's stable Win32 ABI contract; without that stability, DLL-boundary intercept would break on every Windows release.

## Claims

**WINE-WINDOWS-C001** 🟢 — Wine's DLL-boundary intercept works because Microsoft's Win32 ABI (kernel32.dll, ntdll.dll exports) has remained stable across Windows versions since 1993; the same contract that keeps 1995 Windows applications running on Windows 11 is what makes Wine's reimplementation viable across 30+ years

**WINE-WINDOWS-C002** 🟢 — Wine is the largest empirical documentation of Win32 API behaviour outside Microsoft; thirty years of Wine commits record what each undocumented or poorly-documented Win32 call actually does, with edge cases that no MSDN article captures

**WINE-WINDOWS-C003** 🟠 — Wine and WSL1 attacked the same compatibility problem from opposite sides: Wine reimplemented the Win32 DLL layer in userspace on Linux; WSL1 reimplemented the Linux syscall layer in kernel space on Windows; Wine's approach survived, WSL1's did not — the lesson is that DLL exports are more stable than NT syscall numbers

**WINE-WINDOWS-C004** 🟡 — Valve's commercial success with Proton (Wine + DXVK + vkd3d-proton) on Steam Deck (2022) demonstrated that the Win32 compatibility ceiling is high enough for mass-market gaming without a Windows licence; this is a data point about Win32 ABI stability, not about Wine's completeness

## Competence signal

A practitioner who can explain why Wine works (Win32 DLL stability, not emulation), why WSL1 failed while Wine succeeded (NT syscall instability), and what the Proton stack adds on top of Wine understands the architectural difference between stable API layers and unstable ABI layers — a distinction that appears in every OS compatibility problem.

## Sources

- Wine project: winehq.org/about
- Wine project changelog: gitlab.winehq.org/wine/wine
- Valve Proton documentation: github.com/ValveSoftware/Proton
- Microsoft Docs: «Win32 API» — docs.microsoft.com/en-us/windows/win32/
- Raymond Chen. *The Old New Thing*: decades of Win32 compatibility case studies — devblogs.microsoft.com/oldnewthing/
