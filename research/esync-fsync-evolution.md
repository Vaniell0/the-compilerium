---
id: esync-fsync-evolution
entity: research
title: Wine synchronisation evolution — wineserver → esync → fsync
capsule: "The wineserver → esync → fsync progression evidences that upstreaming Linux kernel primitives (eventfd, futex_waitv) is the mechanism by which Wine closed the Windows-emulation performance gap."
domain: it
subdomain: systems
type: article
created: 2023
status: published
importance: medium
authors: [Valve, Collabora, Linux kernel community]
year: 2023
venue: Phoronix
url: https://www.phoronix.com/news/Futex-Waitv-Wine-Proton-Perf
supports: [WINE-C003]
challenges: []
confidence: strong
---

## What this is

Evolution of Wine's synchronisation primitives from wineserver as a central IPC broker, through esync (eventfd), to fsync (Linux 5.16's futex_waitv). Each step removed a specific bottleneck without changing the userspace translation architecture.

## Why it matters here

WINE-C003 — Windows NT exposes WaitForMultipleObjects: waiting on many kernel objects (mutex, event, semaphore) in a single syscall. Wine historically implemented it through wineserver: a broker process contacted via Unix socket per synchronisation operation. Two context switches (client → wineserver → client) per WaitForSingleObject made games with heavy sync usage stutter every few seconds.

Esync (2018, Zebediah Figura) replaced the wineserver round-trip with Linux eventfd — file descriptors accessible via poll()/select(). Freezes disappeared, but thousands of file descriptors per process hit ulimit -n on games with many threads.

Fsync (2021, Valve/Collabora) uses futex_waitv — a syscall added in Linux 5.16 specifically at Proton's request — allowing waits on an arbitrary set of futex objects in a single syscall without allocating file descriptors. Zero resource consumption relative to esync, minimum input lag, behaviour close to native Windows.

The path shows that IPC bottlenecks in a compatibility layer are resolved through cooperation with the upstream kernel, not through complication of userspace code.
