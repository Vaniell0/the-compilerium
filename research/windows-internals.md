---
id: windows-internals
entity: research
title: "Windows Internals (Russinovich & Solomon) + Inside Windows NT (Custer)"
capsule: The two canonical primary sources for NT kernel architecture — Custer's 1992 account of Cutler's VMS-derived design and Russinovich & Solomon's 7th edition — together ground the claims that NT is a hybrid kernel with VMS lineage and a stable driver ABI.
domain: it
subdomain: systems
type: book
created: 1992
status: published
importance: critical
authors: [Custer H., Russinovich M., Solomon D.]
year: 2017
venue: Microsoft Press
url: https://learn.microsoft.com/en-us/sysinternals/resources/windows-internals
supports: [WINDOWS-C001, WINDOWS-C002, WINDOWS-C003, WINDOWS-C004]
challenges: []
confidence: strong
---

## What it says

Two books, one lineage. Helen Custer's *Inside Windows NT* (1992) documents Cutler's original design directly: the HAL, the object model, the IRQL hierarchy, and the executive-subsystem separation are explicitly traced to Cutler's VMS work at DEC. Russinovich & Solomon's *Windows Internals* (7th ed., 2017) continues that documentation through the Hyper-V era: kernel object model, executive layers, the Type-1 hypervisor topology (Windows as a root partition), and the driver model with its stability guarantees.

## Why it matters here

WINDOWS-C001 — the hybrid designation (not monolith, not microkernel) is Russinovich & Solomon's own framing, grounded in the Executive Services architecture documented across Part I.

WINDOWS-C002 — the Hyper-V root-partition topology (Windows itself as a privileged VM since Windows 8) is documented in Chapter 9 of the 7th edition.

WINDOWS-C003 — the stable driver ABI contract is documented in the WDM/KMDF architecture chapters; Russinovich & Solomon explain how the object model and I/O Manager interface were frozen to preserve binary compatibility.

WINDOWS-C004 — Custer (1992) is the primary source for the VMS lineage: Cutler's team came from DEC, brought VMS concepts (object model, IRQL, executive layering) wholesale, and explicitly did not follow Unix design. The NT/DOS independence claim — that NT shares no codebase with MS-DOS — is documented in both books.

## Sources

- Custer, H. *Inside Windows NT*. Microsoft Press, 1992.
- Russinovich, M., Solomon, D., Ionescu, A. *Windows Internals* (7th ed.). Microsoft Press, 2017.
- Dave Cutler interview, Channel 9 / Microsoft Learn: channel9.msdn.com/Blogs/TheChannel9Team/Dave-Cutler-Windows-Azure-is-his-Magnum-Opus
