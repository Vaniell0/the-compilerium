---
id: torvalds
entity: person
title: Linus Torvalds
capsule: Author of Linux (1991) and Git (2005) — the pair of tools whose combined dominance of servers, mobile, embedded and version control is arguably the largest per-person software footprint in history.
domain: it
subdomain: systems
type: person
created: 1991
status: active
importance: critical
---

## Known for

- Created Linux in 1991 as a hobby project at University of Helsinki
- Chose GPL v2 for Linux; explicitly rejected GPL v3 when FSF released it in 2007
- Created Git in 2005 in two weeks after BitKeeper revoked free access to the Linux project
- Linux Foundation Fellow since 2011: salary from LF, not any single corporation

## Technologies shaped

- [Linux](../docs/nodes/linux.md)

## Key decisions

**TORVALDS-C001** 🟢 — chose GPL v2, not GPL v3: anti-tivoization clause would have prevented Linux in locked hardware; Android, most IoT, and embedded Linux exist because of this choice

**TORVALDS-C002** 🟢 — no stable kernel ABI policy: explicitly documented in `stable-api-nonsense.rst`; forces all vendors to upstream or maintain perpetually

**TORVALDS-C003** 🟡 — created Git as a two-week side project to solve Linux's own version control crisis; became the dominant VCS for all software development

**TORVALDS-C004** 🟠 — Linux's governance depends on Torvalds' personal authority; there is no formal succession plan; this is simultaneously the project's strongest stability factor and its deepest long-term risk

## Sources

- Torvalds, L. (1991). comp.os.minix original announcement
- «Just for Fun: The Story of an Accidental Revolutionary» (2001)
- linux-kernel mailing list archives, lkml.org
