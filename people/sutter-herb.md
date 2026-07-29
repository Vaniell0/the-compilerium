---
id: sutter-herb
entity: person
title: Herb Sutter
capsule: The C++ committee chair who predicted the concurrency inflection point in 2005 — and has spent two decades steering the language toward safety and modernity without breaking the installed base.
domain: it
subdomain: languages
type: person
created: 1966
status: active
importance: high
---

## Known for

- "The Free Lunch Is Over" (2005, Dr. Dobb's Journal) — essay predicting that CPU clock-speed scaling was ending and that software would have to exploit parallelism; accurate within 18 months; became required reading for the concurrency wave
- Guru of the Week (GotW) column (1998–) — weekly C++ puzzles published on Usenet and later online; shaped how a generation of C++ programmers learned idiomatic C++; collected in the "Exceptional C++" book series
- ISO C++ standards committee chair (WG21, 2002–) — led the committee through C++11 (the major modern revision), C++14, C++17, C++20, and C++23; C++11 introduced move semantics, lambdas, variadic templates, and std::thread
- CppCon (2014, co-founder) — the primary annual C++ conference; replaced the older C++ standards meetings as the community gathering point
- cppfront / Cpp2 (2022–) — an experimental front-end that transpiles a safer C++ syntax to standard C++; demonstrates that a safer surface can sit on top of the existing ABI; under active development as of 2025
- Microsoft Principal Architect for C++ — contributed to Visual C++ toolchain and the Windows SDK C++ interface

## Technologies shaped

- [C++](../docs/nodes/c-plus-plus.md)
- [C](../docs/nodes/c.md)

## Key decisions

**SUTTER-C001** 🟢 — "The Free Lunch Is Over" (2005) was published before the Intel Core Duo shipped; Sutter's argument was based on thermal and power-density physics, not benchmarks; within two years Intel had publicly abandoned the 10 GHz roadmap and pivoted to multicore; the essay is one of the most precisely timed technical predictions in software commentary

**SUTTER-C002** 🟢 — C++11 (ISO 2011) introduced std::thread, std::atomic, and a memory model as part of the standard for the first time; before C++11, multi-threaded C++ relied on platform APIs (pthreads, Win32 threads) with no standardised semantics; this was a decade-long committee effort that Sutter chaired; the memory model is documented in the standard and in Boehm and Adve (2008)

**SUTTER-C003** 🟡 — Sutter has consistently chosen incremental improvement over clean-break redesign: cppfront is a transpiler to existing C++, not a new language; C++11–23 preserve backward compatibility with C++98 code; the pattern across 20+ years of committee work is: extend the envelope without breaking the installed base

**SUTTER-C004** 🟠 — cppfront (2022) is Sutter's answer to Rust's safety argument: that safety can be achieved with a better C++ dialect rather than a new language; the experiment is ongoing and unresolved; it represents a genuine engineering bet that ABI compatibility and the C++ ecosystem are worth preserving even at the cost of a more complex safety story

**SUTTER-C005** 🟠 — chairing WG21 for over two decades while employed by Microsoft creates a structural conflict of interest that Sutter has navigated publicly; Microsoft's compiler (MSVC) has been a conformance laggard on some features; whether committee direction has favoured Microsoft-implementable features is an open question in the C++ community

## Sources

- Sutter, H. «The Free Lunch Is Over», Dr. Dobb's Journal (2005): http://www.gotw.ca/publications/concurrency-ddj.htm
- Sutter, H. «Exceptional C++», Addison-Wesley (1999); «More Exceptional C++» (2001)
- Boehm, H.-J., Adve, S. «Foundations of the C++ Concurrency Memory Model», PLDI (2008)
- ISO/IEC 14882:2011 — C++11 standard
- Sutter, H. cppfront repository: https://github.com/hsutter/cppfront
- CppCon proceedings archive: https://github.com/CppCon
