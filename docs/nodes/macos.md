---
id: macos
entity: subject
title: macOS
capsule: A proprietary OS whose open Darwin foundation runs iOS, macOS, and Apple TV identically — the same XNU kernel on every Apple device isn't convergence by accident, it's the enforcement mechanism behind Apple's platform control.
domain: it
subdomain: systems
type: infrastructure
created: 2001
status: active
importance: high
---

## Timeline

- 1969 — Mach microkernel started at CMU; BSD userland — UC Berkeley
- 1985 — NeXT founded by Steve Jobs after leaving Apple; NeXTSTEP built on Mach + BSD
- 1996 — Apple buys NeXT for $429M; gets XNU, Objective-C runtime, Interface Builder
- 2001 — Mac OS X 10.0: first public release on XNU; Darwin (kernel + userland) opened under APSL
- 2007 — iPhone OS: the same XNU on ARM; iOS and macOS diverge in UI but not in kernel
- 2011 — Darwin open source releases slow down; Apple stops publishing sources in sync
- 2012 — OS X Mountain Lion: TCC (Transparency, Consent, Control) framework introduced; apps must request user permission for camera, microphone, location, contacts, and file access
- 2015 — OS X El Capitan: System Integrity Protection (SIP) introduced; even root cannot modify /System, /usr, /bin, /sbin or loaded kernel extensions without booting into recovery mode
- 2019 — macOS Catalina: notarisation becomes mandatory for all software distributed outside the App Store; Gatekeeper checks the notarisation ticket before first launch
- 2020 — macOS Big Sur: kernel extensions (kexts) officially deprecated; System Extensions run in userspace and use DriverKit, EndpointSecurity, and NetworkExtension frameworks
- 2020 — Apple Silicon M1: transition from x86 to ARM64; macOS and iOS now on one ISA, one XNU, one toolchain
- 2024 — EU DMA formally requires opening iOS to alternative browser engines; Apple creates barriers within compliance

## Demonstrator

Mandatory notarisation (Catalina, 2019): Apple's automated scanning service must issue a ticket before any software — including software sold outside the App Store — can run on a user's machine; Gatekeeper checks the ticket at first launch and Apple can revoke it remotely. The ticket is the concrete artefact that proves the thesis: platform control is not a brand preference but an enforceable infrastructure gate. See MACOS-C009.

## Ontology

- **XNU**: hybrid kernel — Mach microkernel (IPC, task/thread abstraction, virtual memory) + BSD personality (POSIX API, networking, VFS) in a single address space; not a Unix clone and not a Linux fork
- **Darwin**: the open layer (XNU + userland utilities); commercial macOS = Darwin + closed UI stack (Cocoa, Metal, CoreGraphics)
- **Apple Silicon**: a single ISA (ARM64) for macOS and iOS → one binary, one toolchain ([Clang](clang.md)/[LLVM](llvm.md)), one kernel
- **App Store gatekeeping**: mandatory notarisation for macOS distribution outside App Store since Catalina; on iOS — exclusive distribution channel until DMA
- **WebKit lock-in**: WebKit is mandatory for all browsers on iOS (App Store policy until DMA); on macOS — de facto via Safari dominance

## Competence

```
can_explain:    that XNU is not Linux and not pure BSD;
                the difference between Darwin (open) and macOS (closed);
                why Apple Silicon unified macOS and iOS architecturally

can_apply:      develop for macOS/iOS using the Apple toolchain (Xcode, Clang, Metal);
                understand the differences between kernel extensions (kext) and System Extensions

can_extend:     work with Darwin/XNU at the source level;
                understand Mach IPC and BSD layer interaction

can_teach:      explain Apple's vertical integration as an architectural strategy;
                contrast Linux (horizontal) and macOS (vertical) approaches

reach:
  can_explain:    low
  can_apply:      high
  can_extend:     very low
  can_teach:      very low

key_gap: can_apply → can_explain
         most macOS developers use the toolchain fluently but don't know what's
         inside XNU; most don't know that iOS and macOS share one kernel
```

## Claims

**MACOS-C001** 🟢 — XNU is a hybrid kernel: Mach microkernel + BSD personality in a single address space; not a Unix clone and not a Linux fork

**MACOS-C002** 🟢 — Apple Silicon (2020) unified macOS and iOS on a single ISA (ARM64) and a single kernel (XNU); separation between platforms is now only in UI and API, not in the system layer

**MACOS-C003** 🟢 — Apple funded [Clang](clang.md)/[LLVM](llvm.md) to move away from GCC (GPL v3); the macOS/iOS toolchain is BSD-licensed Clang, not GPL

**MACOS-C004** 🟡 — Darwin is opened strategically: enough to avoid antitrust pressure, not enough for a competitor to reproduce macOS; since 2011 Darwin open source releases have slowed

**MACOS-C005** 🟠 — macOS and [Linux](linux.md) represent opposing architectural philosophies: Linux — minimal kernel, maximal horizontal ecosystem; macOS — vertical integration from silicon (Apple Silicon) to browser engine (WebKit)

**MACOS-C006** 🔴 — Is Apple's vertical integration a sustainable long-term architecture or a fragility point: failure of any layer (silicon, OS, toolchain) cannot be replaced without disrupting the entire stack?

**MACOS-C007** 🟢 — System Integrity Protection (SIP, 2015) enforces a protected-path boundary in the kernel itself: even a root process cannot write to /System, /usr, /bin, /sbin, or modify kernel extensions; disabling SIP requires a physical reboot into recovery mode, making it a hardware-gated policy rather than a software permission

**MACOS-C008** 🟢 — TCC (Transparency, Consent, Control, 2012) is a per-app permission gate enforced by the kernel: access to camera, microphone, location, Full Disk Access, and input monitoring requires an explicit user grant stored in a protected TCC database; the enforcement is kernel-level, but the grant itself is a user-visible consent dialog — so the effective attack surface for social engineering is the UX layer, not the enforcement layer

**MACOS-C009** 🟢 — notarisation (mandatory from Catalina, 2019) requires the developer to submit a binary to Apple's automated scanning service before distribution; Gatekeeper checks the notarisation ticket at first launch and refuses to run unsigned or revoked binaries; the chain is: Developer ID signing → notarisation ticket → Gatekeeper check — three separate gates, each revocable by Apple

**MACOS-C010** 🟡 — kext deprecation (Big Sur, 2020) moves third-party kernel code from kernel space (kexts) to supervised userspace processes (System Extensions, DriverKit); the security argument is that a misbehaving or compromised System Extension cannot directly corrupt kernel memory, unlike a kext crash that takes the whole kernel down

**MACOS-C011** 🟠 — TCC bypass advisories recur across macOS releases (Objective-See publishes a running list); the shared structural pattern is that bypasses do not defeat the kernel enforcement — they leverage an already-TCC-approved parent process whose permission is inherited or laterally exploited; this is the same shape as the UAC auto-elevation bypass documented in [Linux ↔ Windows](../relations/linux__windows.md) as LINUX-WINDOWS-C012 — a usability relaxation on top of a strict enforcement model becomes the attack surface, not the enforcement itself

**MACOS-C012** 🟠 — the mass-audience belief that macOS is "inherently more secure" than other desktop OSes conflates two separate facts: Apple ships a strong default configuration (SIP, TCC, notarisation, Gatekeeper all on by default), and therefore average users encounter fewer attacks — not because the architecture is uniquely impenetrable, but because most malware targets the larger Windows user base and macOS defaults are harder to misconfigure; when targeted, macOS vulnerabilities follow the same classes as any other Unix-derived system

## Relations

- [Clang → macOS](../relations/clang__macos.md)
- [Linux ↔ macOS](../relations/linux__macos.md)

## Sources

- Amit Singh. *Mac OS X Internals: A Systems Approach* (2006)
- Apple, Darwin source: opensource.apple.com
- Apple Silicon transition technical overview, WWDC 2020
- EU DMA, Apple compliance reports 2024–2025
- Apple Platform Security guide (2024): developer.apple.com/documentation/security — covers SIP, TCC, notarisation, Gatekeeper, and Secure Enclave
- Apple Developer Documentation: «System Integrity Protection» — developer.apple.com/documentation/security/system-integrity-protection
- Apple Developer Documentation: «Protecting user data with TCC» — Transparency, Consent, and Control
- Apple Developer Documentation: «Notarizing macOS software before distribution»
- Apple Developer Documentation: «System Extensions and DriverKit» (WWDC 2019)
