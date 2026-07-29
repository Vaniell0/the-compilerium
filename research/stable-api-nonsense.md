---
id: stable-api-nonsense
entity: research
title: Stable API Nonsense — Kroah-Hartman on Linux's deliberate lack of stable ABI
capsule: "Kroah-Hartman's 'Stable API Nonsense' evidences that Linux's deliberate lack of a stable in-kernel ABI is a governance mechanism, not an oversight — it forces vendor upstreaming."
domain: it
subdomain: systems
type: rant
created: 2012
status: published
importance: high
authors: [Greg Kroah-Hartman]
year: 2012
venue: kernel.org docs
url: https://www.kernel.org/doc/html/latest/process/stable-api-nonsense.html
supports: [LINUX-WINDOWS-C001, LINUX-C003]
challenges: []
confidence: strong
---

## What this is

Official Linux kernel document by Greg Kroah-Hartman explaining why Linux deliberately does not maintain a stable kernel ABI for driver modules; out-of-tree drivers break on kernel updates by design; this is a policy decision, not a technical shortcoming.

## Why it matters here

LINUX-WINDOWS-C001 + LINUX-C003 — the document is the primary source for the thesis that Linux's "no stable ABI" is not an oversight but a deliberate stance. Windows WHQL and the stable KMDF are the opposite architectural choice. The contrast maps two different philosophies of who bears responsibility for compatibility: kernel-team (Windows) or vendor-in-tree (Linux).
