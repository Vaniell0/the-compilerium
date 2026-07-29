---
id: bellard
entity: person
title: Fabrice Bellard
capsule: Systems polymath behind QEMU, FFmpeg, TinyCC and JSLinux — proof that one person can carry a production-grade emulator, media codec, C compiler, and browser-hosted OS.
domain: it
subdomain: systems
type: person
created: 1997
status: active
importance: high
---

## Known for

- FFmpeg (2000): universal media codec framework; became the de facto standard for media processing
- QEMU (2003): machine emulator via dynamic binary translation (TCG — Tiny Code Generator)
- TCC (2002): Tiny C Compiler — compiles itself in seconds, fits into a few hundred kilobytes
- jslinux (2011): full x86 Linux in the browser via asm.js; in 2019 ported to WASM, x86_64, AVX-512
- QuickJS (2019): compact JavaScript engine; Micro QuickJS — JS for microcontrollers
- TextSynth (2020+): proprietary LLM inference server and API; [ts_zip](../docs/nodes/ts-zip.md) — text compression via LLM
- NNCP (2021): neural network compressor, leads the Large Text Compression Benchmark

## Technologies shaped

- [Linux](../docs/nodes/linux.md)
- [WebAssembly](../docs/nodes/webassembly.md)
- [C](../docs/nodes/c.md)

## Key decisions

**BELLARD-C001** 🟢 — Bellard builds every project as a minimal implementation: TCC compiles C in seconds without optimisations; QuickJS is a full ES2023 engine in 210 KB; jslinux is Linux without native code; the pattern repeats in every project

**BELLARD-C002** 🟢 — jslinux (2011) was proof of concept 6 years before WebAssembly standardisation: asm.js as proto-WASM made it possible to run a full Linux kernel in the browser; the site was updated in 2026 with support for x86_64, AVX-512, APX

**BELLARD-C003** 🟢 — Bellard builds AI infrastructure single-handed: TextSynth Server (REST API for LLM), ts_zip (LLM compression, RWKV-4 169M, halves xz on natural text), NNCP (Transformer compressor, leads Large Text Compression Benchmark on enwik9 at 0.853 bpb) — the same pattern as FFmpeg for media: a minimal core doing what «requires much greater resources»

**BELLARD-C004** 🟠 — Bellard is a living counter-example to the thesis that large-scale infrastructure requires teams: FFmpeg (Netflix, TikTok, YouTube use his code), QEMU (foundation of cloud virtualisation), jslinux, QuickJS — all built by one person in his spare time

## Sources

- bellard.org (updated 2026-03-09)
- Bellard, F. «QEMU, a Fast and Portable Dynamic Translator», USENIX 2005
- Bellard, F. «TCC: Tiny C Compiler», bellard.org/tcc/
- textsynth.com
