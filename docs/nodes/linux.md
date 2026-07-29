---
id: linux
entity: subject
title: Linux
capsule: A monolithic-modular GPL v2 kernel whose deliberately unstable driver ABI and distributed maintainership sustain the largest cross-corporate open-source ecosystem.
domain: it
subdomain: systems
type: platform
created: 1991
status: active
importance: critical
---

## Timeline

- 1991 — Linus Torvalds, 21 years old, posts an announcement to comp.os.minix: "just a hobby, won't be big and professional like gnu"
- 1992 — Linux switches to GPL v2
- 1994 — Linux 1.0; modular architecture of loadable drivers
- 1996 — Linux 2.0; SMP support; beginning of corporate interest
- 2003 — SCO Group files suit against IBM; the Linux Foundation (then OSDL) consolidates as a buffer
- 2004 — Harald Welte founds gpl-violations.org; first successful GPL suits
- 2007 — cgroups merged into 2.6.24 (originating from Google's Process Containers work) — CPU, memory, I/O accounting per group of processes; the second half of the container primitive after namespaces (started 2002, kernel 2.4.19)
- 2008 — FSF vs Cisco/Linksys: settlement requires appointing a Free Software Director and opening sources
- 2010 — first US precedent: permanent injunction against Westinghouse for GPL violation in BusyBox
- 2011 — Linux Foundation Fellowship: Torvalds and Greg KH receive salaries from LF, not from corporations
- 2011 — Fabrice Bellard's jslinux runs a full Linux kernel inside an in-browser x86 emulator (see [bellard](../../people/bellard.md), [ts_zip](ts-zip.md) for the same one-person pattern)
- 2013 — Docker: bundles namespaces + cgroups + a layered filesystem into a distribution format; the kernel primitives from 2002–2007 become the substrate of the cloud industry
- 2014 — extended BPF (eBPF) merged into 3.15: a verified JIT for kernel-space programs; later reshapes observability (bcc, bpftrace), networking (Cilium), and security (LSM BPF)
- 2022 — RFC for Rust in Linux accepted; first Rust code in 6.1 (December 2022)
- 2024 — CVE-2024-3094: xz/liblzma backdoor via social engineering against a burned-out maintainer
- 2025 — ~1780 organisations actively contribute; none dominates

## Ontology

- Monolithic kernel with loadable modules: scheduler, VM, IPC — core; everything else — plugins
- GPL v2: copyleft ratchet, a transitive obligation to open sources upon distribution
- No stable kernel ABI — deliberately: the only way to have a supported driver is to upstream it
- Distributed maintainership: dozens of subsystems, dozens of maintainers, dozens of jurisdictions
- Linux Foundation as a game-theoretic buffer: competing corporations fund shared infrastructure

## Competence

```
can_explain:    understands the difference monolith+modules vs microkernel;
                knows why there is no stable ABI and what it means for drivers;
                understands GPL v2 as a legal mechanism, not just a licence

can_apply:      writes loadable kernel modules; works with kernel APIs;
                understands the kernel memory model and kernel-space constraints

can_extend:     upstreams patches via LKML; works with subsystem maintainers;
                understands Documentation/process/

can_teach:      explains why Linux survived alongside capital;
                can unpack each of the seven defences and their mechanism

reach:
  can_explain:    moderate
  can_apply:      low
  can_extend:     very low
  can_teach:      very low

key_gap: can_apply → can_explain
         most Linux practitioners don't know why there is no stable ABI
         and that GPL v2 differs from v3 strategically, not only legally
```

## Claims

**LINUX-C001** 🟢 — GPL v2 created legal precedents (Cisco 2008, Westinghouse 2010) that made violation economically expensive — this is a ratchet mechanism, not a moral position

**LINUX-C002** 🟢 — Torvalds explicitly refused to switch to GPL v3: the anti-tivoization clause would have banned Linux in closed hardware

**LINUX-C003** 🟢 — the absence of a stable kernel ABI is codified in `Documentation/process/stable-api-nonsense.rst`: the only way not to break is to enter mainline; this is anti-enclosure built into the architecture

**LINUX-C004** 🟡 — the Linux Foundation as a game-theoretic equilibrium: 15 platinum members (Microsoft, Google, Intel, IBM, Meta, AWS, Huawei...) block each other; leaving means losing influence over the infrastructure your own business depends on

**LINUX-C005** 🟠 — GPL v2 (not GPL v3) is a strategic choice in favour of maximum distribution over maximum user freedom; the FSF lost the ideological position, but the GPL v2 ratchet works

**LINUX-C006** 🔴 — Linux governance rests on the personal authority of Torvalds and Greg KH; there is no formal process of leadership succession

**LINUX-C007** 🟠 — without the GPL v2 refusal there would be no Android, most IoT and embedded: the GPL v3 anti-tivoization clause would have made Linux legally incompatible with locked-down consumer hardware

**LINUX-C008** 🔴 — the xz/liblzma backdoor (CVE-2024-3094) showed that social engineering against a burned-out solo maintainer is scalable; the trust model behind distributed maintainership assumes non-adversarial contributors and does not defend against a patient long-form attacker

**LINUX-C009** 🟢 — namespaces (2002+, kernel 2.4.19) and cgroups (2007, kernel 2.6.24, from Google) are the two kernel primitives that together define a container; Docker (2013) packaged them into a distribution model and Kubernetes (2014) built orchestration on top — the reason "the cloud runs on Linux" is not brand preference but a specific pair of syscalls no other kernel exposed at the same time

**LINUX-C010** 🟡 — eBPF is the practical resolution of the "no stable ABI" problem: the kernel refuses to stabilise driver interfaces but ships a stable API for verified programs, so third parties extend the kernel from userspace-controlled bytecode instead of upstreaming modules — observability, networking, and security modules migrated onto eBPF within a decade

**LINUX-C011** 🟠 — the container substrate is how Linux ate its own competitive position: the kernel refused to grow application-level abstractions, so Docker and Kubernetes built those abstractions in userspace, and Linux is now worth learning primarily as the substrate underneath them, not as the OS you develop against directly

## Relations

- [C → Linux](../relations/c__linux.md)
- [Clang → Linux](../relations/clang__linux.md)
- [Linux ↔ Windows](../relations/linux__windows.md)
- [Linux ↔ macOS](../relations/linux__macos.md)

## Sources

- Torvalds, L. (1991). comp.os.minix announcement. groups.google.com/g/comp.os.minix
- Kroah-Hartman, G. `Documentation/process/stable-api-nonsense.rst`
- Linux Foundation, «2024 Linux Kernel Development Report»
- Freund, A. (2024). oss-security mailing list, CVE-2024-3094
- gpl-violations.org case archive
