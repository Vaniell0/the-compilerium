---
id: linux__macos
entity: relation
title: Linux ↔ macOS
capsule: Linux and macOS share a POSIX heritage but represent opposite architectural philosophies — Linux is a minimum kernel with a horizontal ecosystem, macOS is a vertical stack controlled by one company.
domain: it
subdomain: systems
type: relation
created: 2001
status: active
importance: high
from: linux
to: macos
direction: symmetric
confidence: strong
axes:
  historical: true
  structural: true
  competence: true
---

## What this is

Linux and macOS share a POSIX heritage (both run Unix userland programs) but represent opposite architectural philosophies: Linux is a minimum kernel with a horizontal ecosystem; macOS is a vertical stack from silicon to browser engine controlled by one company.

## Claims

**LINUX-MACOS-C001** 🟢 — both Linux and macOS are POSIX-compatible; a C program written for one typically compiles on the other with minor changes

**LINUX-MACOS-C002** 🟡 — Linux distributes governance (GPL v2, distributed maintainership, no CLA); macOS concentrates it (Apple controls compiler, kernel, toolchain, hardware, browser engine)

**LINUX-MACOS-C003** 🟠 — Linux's horizontal model (minimum kernel + ecosystem plugins) and macOS's vertical model (full-stack integration) are both successful but optimise for different things: Linux for ubiquity, macOS for coherence

## Sources

- Kroah-Hartman, G. `Documentation/process/stable-api-nonsense.rst`
- Amit Singh. *Mac OS X Internals* (2006)
