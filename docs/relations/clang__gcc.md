---
id: clang__gcc
entity: relation
title: Clang ← GCC
capsule: Clang was created as a BSD-licensed alternative to GCC after GCC's adoption of GPL v3 in 2007 made it incompatible with Apple's proprietary toolchain requirements.
domain: it
subdomain: compilers
type: relation
created: 2007
status: active
importance: high
from: clang
to: gcc
direction: b→a
confidence: strong
axes:
  historical: true
  structural: false
  competence: false
---

## What this is

Clang was built as a BSD-licensed alternative to GCC after GCC adopted GPL v3 in 2007. The conflict was legal, not technical: Apple needed a compiler it could embed in proprietary tools without triggering GPL v3's anti-tivoization clause.

## Claims

**CLANG-GCC-C001** 🟢 — GCC's move to GPL v3 in 2007 was the triggering event for Apple's investment in Clang; the FSF explicitly designed GPL v3 to prevent locked-hardware deployment

**CLANG-GCC-C002** 🟡 — the corporate compiler ecosystem (Apple, Google, Android, FreeBSD) migrated to Clang between 2011 and 2016; GCC retained dominance in Linux distributions and GNU-aligned projects

**CLANG-GCC-C003** 🟠 — the GPL v3 / BSD split in compiler infrastructure is the clearest case where a licensing decision by an ideological actor (FSF) created the conditions for a corporate alternative to capture the ecosystem — an outcome the FSF did not intend

## Sources

- gnu.org/licenses/gpl-faq.html#Tivoization
- FSF, «Why Upgrade to GPL Version 3», gnu.org/licenses/rms-why-gplv3.html
- Apple Developer release notes, Xcode 4.1 (2011): GCC removed as default
