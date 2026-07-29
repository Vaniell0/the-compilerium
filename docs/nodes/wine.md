---
id: wine
entity: subject
title: Wine
capsule: A userspace reimplementation of Win32 DLLs that intercepts at the DLL boundary — not a CPU emulator, not a virtual machine — and the thirty-year reverse-engineering artifact that documented the Win32 ABI more completely than any single Microsoft source.
domain: it
subdomain: systems
type: runtime
created: 1993
status: active
importance: high
---

## Timeline

- 1993 — Bob Amstadt starts Wine ("Wine Is Not an Emulator"); first goal: run 16-bit Windows 3.x applications on Linux without Windows; the name is a direct joke on the "emulator" label that sticks to Wine despite being false
- 1994 — first public release; community-driven reimplementation of Win32 DLLs begins accumulating
- 2005 — CodeWeavers commercialises Wine as CrossOver; funds significant upstream development; first sustainable business model around Wine
- 2008 — Wine 1.0 released — 15 years after the project started; the delay reflects the scope: Win32 is a 30-year-old moving target with undocumented behaviours
- 2018 — Valve announces Proton at Steam Play launch: a Wine fork bundling DXVK + vkd3d-proton + game-specific tunings, targeting native Steam game compatibility on Linux
- 2018 — esync (eventfd-based synchronisation) — Zebediah Figura et al: eliminates wineserver round-trip stutter but exhausts per-process file-descriptor limits on complex games
- 2019 — fsync (futex_waitv-based) merged: near-zero synchronisation overhead, no fd exhaustion; resolves the WaitForMultipleObjects semantics gap that POSIX does not natively support
- 2020 — DXVK stabilises as the reference Direct3D 9/10/11 → Vulkan translator (Philip Rebohle)
- 2021 — Syscall User Dispatch merged in Linux 5.11: kernel-supported redirect for raw NT syscall instructions; enables anticheat compatibility by letting Wine handle syscalls that games invoke directly, bypassing the DLL layer
- 2022 — Steam Deck ships; [Linux](linux.md) + Proton become the gaming OS for a mass-market device without a Windows licence
- 2022 — Wine 7.0 with significant Valve/CodeWeavers upstream contributions
- 2023 — Proton Experimental ships Direct3D 12 support via vkd3d-proton at parity with many native Windows benchmarks

## Demonstrator

A 1995-era 32-bit Windows application running under Wine on Linux without modification: the DLL-boundary intercept works because the same Win32 API that Microsoft stabilised for application developers is the layer Wine reimplements. The demonstrator is any vintage binary that runs: Minesweeper from Windows 95, classic games, legacy productivity tools. Secondary demonstrator: `WINEDEBUG=+all wine <application>` produces a trace of every Win32 API call the application makes — a real-time read of the Win32 ABI in action. This is the thesis: Wine works because Win32 is stable enough to reimplement, not because Windows is easy to emulate.

## Ontology

- Userspace translation: Win32 API calls intercepted at the DLL boundary (kernel32.dll, ntdll.dll, user32.dll, etc.), reimplemented in userspace; no VM, no NT kernel, no kernel driver
- DLL-boundary intercept works because Microsoft's DLL layer is a stable interface, while NT syscall numbers change between builds — the same reason applications on [Windows](windows.md) must go through DLLs rather than issue raw NT syscalls
- [DXVK](https://github.com/doitsujin/dxvk): sibling project translating Direct3D 9/10/11 API calls to Vulkan by generating SPIR-V shaders and mapping DirectX resource semantics onto Vulkan's explicit-management model
- vkd3d-proton: sibling project translating Direct3D 12 to Vulkan; ships inside Proton, not inside Wine core
- Synchronisation primitives evolved: wineserver (userspace IPC bottleneck) → esync (Linux eventfd) → fsync (Linux futex_waitv, native multi-object wait); each step moved synchronisation closer to kernel primitives to close the WaitForMultipleObjects gap
- Syscall User Dispatch: Linux 5.11 kernel primitive that marks code regions from which raw syscall instructions are redirected to userspace signal handlers, letting Wine emulate NT syscalls that anticheats invoke directly — outside the DLL layer Wine normally owns
- Proton is not Wine: Valve's fork adds DXVK, vkd3d-proton, Steam Linux Runtime, and a game-compatibility database; Wine alone does not get you triple-A gaming

## Competence

```
can_explain:    understands why Wine is not an emulator;
                explains why DLL-boundary intercept scales while
                WSL1's kernel-space intercept did not;
                knows the D3D → Vulkan translation model of DXVK;
                distinguishes Wine from Proton

can_apply:      installs and uses Proton or vanilla Wine;
                debugs missing DLL calls with WINEDEBUG;
                tunes DXVK / VKD3D environment variables for target games

can_extend:     submits Wine or DXVK patches;
                writes DLL reimplementations;
                contributes to Proton Experimental

can_teach:      explains the userspace-translation vs kernel-space-translation
                vs VM trilemma (Wine vs WSL1 vs WSL2) and why the userspace
                path succeeded; positions Wine as a reverse-engineering artifact,
                not a compatibility workaround

reach:
  can_explain:    low
  can_apply:      moderate
  can_extend:     very low
  can_teach:      very low

key_gap: can_explain — Proton is used widely on Steam Deck; most users cannot
         explain why intercepting at the DLL boundary works while WSL1's
         kernel-space intercept against the same target failed, or that
         Proton and Wine are distinct projects with different maintainers
```

## Claims

**WINE-C001** 🟢 — Wine intercepts at the DLL boundary in userspace, not at the syscall boundary; this works because Microsoft's Win32 DLL layer (kernel32.dll, ntdll.dll) is a stable interface while NT syscall numbers change between builds — the same architectural fact that forces Windows applications themselves to route calls through DLLs rather than issue raw NT syscalls

**WINE-C002** 🟢 — DXVK translates Direct3D 9/10/11 API calls to Vulkan by generating SPIR-V shaders and mapping DirectX resource semantics onto Vulkan's explicit-management model; vkd3d-proton extends this to Direct3D 12; neither is part of Wine core — they are separate projects bundled by Proton

**WINE-C003** 🟢 — Wine's synchronisation primitives evolved wineserver (IPC bottleneck) → esync (Linux eventfd, eliminates stutter but exhausts fd limits) → fsync (Linux futex_waitv, near-zero overhead); each step moved synchronisation from userspace IPC toward native kernel primitives to close the WaitForMultipleObjects semantics gap that POSIX does not expose

**WINE-C004** 🟢 — anticheat systems bypassed the DLL boundary by executing NT syscall instructions directly via inline assembly; Wine required Linux kernel support (Syscall User Dispatch, merged Linux 5.11) to redirect raw syscall instructions from "Windows code" regions to userspace signal handlers that emulate NT syscall semantics

**WINE-C005** 🟠 — "Wine is an emulator" is the longest-running misconception about the project: Wine does not emulate a CPU, does not run a virtual x86 machine, and does not simulate Windows kernel behaviour — it reimplements the Win32 API in userspace; the "not an emulator" distinction is not marketing but a precise architectural claim about where the boundary sits

**WINE-C006** 🟠 — "Wine can run any Windows software" has been false for all thirty-plus years of the project's existence: kernel-level anticheats (BattlEye, Easy Anti-Cheat) work on Linux only because their vendors enabled a server-side flag — not because Wine implemented the kernel driver; DRM schemes, device drivers, and 16-bit COM-dependent applications remain outside Wine's practical coverage

**WINE-C007** 🟠 — "Wine is what makes Steam Deck work" conflates Wine with Proton: Proton adds DXVK (DirectX → Vulkan), vkd3d-proton (D3D12 → Vulkan), a Steam Linux Runtime container, game-specific patches, and a compatibility database curated by Valve; Wine is the translation substrate but the gap between Wine and a working triple-A gaming experience is large enough that Valve treats it as a separate engineering product

**WINE-C008** 🟡 — in some benchmarks Proton runs games faster than native Windows because Vulkan drivers on Linux carry less overhead than the Windows DirectX driver stack; this is a contingent result dependent on driver quality and game workload, not a structural advantage of translation over native execution

**WINE-C009** 🔴 — Wine is thirty-plus years of reverse-engineering the Win32 ABI into a public codebase; it is the largest empirical documentation of Win32 behaviour outside Microsoft — but as [Windows](windows.md) shifts toward WinUI 3, UWP, and kernel APIs that have no DLL boundary equivalent, the question of whether Wine's DLL-intercept model extends to the next generation of Windows applications is unanswered

## Relations

- [Linux ↔ Wine](../relations/linux__wine.md)
- [Wine → Windows](../relations/wine__windows.md)
- [Linux ↔ Windows](../relations/linux__windows.md)
- [Windows ↔ WSL](../relations/windows__wsl.md)

## Sources

- Wine project: winehq.org/about
- Wine project changelog: gitlab.winehq.org/wine/wine
- DXVK: github.com/doitsujin/dxvk
- vkd3d-proton: github.com/HansKristian-Work/vkd3d-proton
- Valve Proton documentation: github.com/ValveSoftware/Proton
- Linux kernel changelog: Syscall User Dispatch (5.11+) — kernel.org/doc/html/latest/admin-guide/syscall-user-dispatch.html
- Phoronix: Proton vs native Windows benchmarks (2020–2024)
- Wine Headquarters: «What is Wine?» winehq.org/about
