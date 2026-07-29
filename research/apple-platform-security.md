---
id: apple-platform-security
entity: research
title: "Apple Platform Security"
capsule: Apple's official technical reference for the multi-layer security architecture across macOS, iOS, and Apple Silicon — the primary source for the SIP, TCC, and notarisation mechanisms.
domain: it
subdomain: systems
type: article
created: 2024
status: published
importance: high
authors: [Apple Inc.]
year: 2024
venue: developer.apple.com
url: https://developer.apple.com/documentation/security
supports: [MACOS-C007, MACOS-C008, MACOS-C009]
challenges: []
confidence: strong
---

## What it says

The guide documents three enforcement layers that together constitute Apple's platform security model: System Integrity Protection (a kernel-enforced write boundary on system paths, requiring a hardware-gated recovery-mode boot to disable), TCC (a per-app permission database with kernel enforcement and user-visible consent UX), and the notarisation + Gatekeeper chain (Developer ID signing, automated binary scanning, and a revocable first-launch ticket).

## Why it matters here

MACOS-C007, MACOS-C008, and MACOS-C009 each describe one of these three layers. The Apple Platform Security guide is the primary source for all three: it names the protected paths (C007), the TCC entitlement categories and enforcement scope (C008), and the three-step notarisation chain (C009). The same document covering all three claims is what makes a shared research note worthwhile rather than three separate in-line citations.

## Sources

- Apple Inc. *Apple Platform Security*. developer.apple.com/documentation/security (2024 edition, accessed 2026-07-28)
- Apple Developer Documentation: «System Integrity Protection»
- Apple Developer Documentation: «Protecting user data with TCC»
- Apple Developer Documentation: «Notarizing macOS software before distribution»
