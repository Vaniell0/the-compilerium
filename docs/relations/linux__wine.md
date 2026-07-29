---
id: linux__wine
entity: relation
title: Linux ↔ Wine
capsule: Linux is the platform Wine runs on, and Wine is the mechanism by which Linux gained Windows-binary compatibility — a thirty-year collaboration between an unstable kernel ABI that never breaks userspace and a userspace layer that reimplements someone else's stable API.
domain: it
subdomain: systems
type: relation
created: 1993
status: active
importance: high
from: linux
to: wine
direction: symmetric
confidence: strong
axes:
  historical: true
  structural: true
  competence: false
---

## What this is

[Linux](../../docs/nodes/linux.md) provides the stable syscall ABI that Wine's userspace translation relies on; [Wine](../../docs/nodes/wine.md) provides Linux with Windows-binary compatibility. The structural pairing matters: Linux's "never break userspace" guarantee (stable syscall numbers across kernel versions) is the substrate Wine is built on — the same guarantee that makes Wine a long-lived project rather than a fragile hack.

## Claims

**LINUX-WINE-C001** 🟢 — Wine relies on Linux's stable syscall ABI ("we never break userspace"): Wine's POSIX reimplementation of Win32 calls maps to the same Linux syscall numbers across kernel versions; the guarantee that Wine's syscall layer does not break between Linux 4.x and Linux 6.x is a Linux kernel policy, not a Wine engineering achievement

**LINUX-WINE-C002** 🟢 — Linux kernel features were added specifically to support Wine/Proton: Syscall User Dispatch (merged Linux 5.11) lets Wine redirect raw NT syscall instructions that anticheat software executes outside the DLL layer; esync and fsync improvements to Linux eventfd and futex_waitv were driven by Wine's WaitForMultipleObjects translation gap

**LINUX-WINE-C003** 🟠 — Linux gained a Windows-game-playing population through Wine/Proton without modifying the Linux kernel's application model; Windows gained a Linux-developer population through WSL2 by running a full Linux kernel in a VM; the asymmetry (Wine = userspace translation; WSL2 = virtualisation) reflects which ABI was harder to implement from scratch — POSIX is easier to translate than NT

**LINUX-WINE-C004** 🟡 — Steam Deck (2022) is the most visible outcome of the Linux/Wine partnership: Valve ships a Linux-only device that plays Windows games; the gaming segment Linux was structurally absent from is now accessible via Proton without the end user touching Wine directly

## Competence signal

A practitioner who understands why Linux's stable syscall ABI is the hidden foundation of Wine, why Linux kernel features like Syscall User Dispatch were merged specifically for Wine/Proton compatibility, and how this differs from the WSL2 path in the opposite direction has a concrete model of OS-level ABI contracts and their cross-platform consequences.

## Sources

- Linux kernel: Documentation/admin-guide/syscall-user-dispatch.rst (5.11+)
- Wine project: winehq.org/about
- Valve: Steam Deck hardware — store.steampowered.com/steamdeck
- Phoronix: Wine/Proton Linux kernel patches coverage (2018–2024)
