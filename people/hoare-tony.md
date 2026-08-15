---
id: hoare-tony
entity: person
title: Tony Hoare
capsule: The theorist who gave computing Quicksort, the axiomatic basis for program correctness, and the concurrency primitives — CSP and monitors — that Go's channels and Erlang's actors are still built on.
domain: it
subdomain: languages
type: person
created: 1934
status: active
importance: critical
---

## Known for

- Quicksort (1959, published 1962) — invented as a student at Moscow State University; the partition-based in-place sort that remains the standard general-purpose sort in most standard libraries five decades later
- Hoare logic (1969) — axiomatic semantics for imperative programs using preconditions, postconditions, and invariants (Hoare triples {P} C {Q}); the formal basis for program verification, model checking, and modern type-system correctness proofs
- Monitors (1974) — a synchronisation primitive combining a mutex and condition variables into a structured unit; adopted in Java (synchronized blocks), C# (Monitor class), and most concurrent object-oriented languages
- CSP — Communicating Sequential Processes (1978 paper, 1985 book) — a process algebra for concurrent systems based on synchronous message passing over named channels; the direct inspiration for Go's goroutines and channels, Erlang's actor model, and the occam language
- Turing Award lecture "The Emperor's Old Clothes" (1980) — a critique of software complexity; argued that complexity is not inevitable but chosen; influenced the minimalist design philosophy in systems software
- "Billion-Dollar Mistake" (2009 QCon talk) — Hoare's public retrospective on inventing the null reference in ALGOL W (1965); stated it was a mistake that cost the industry vast debugging effort; the talk accelerated the shift toward Option/Maybe types in modern languages

## Technologies shaped

- [C++](../docs/nodes/c-plus-plus.md)
- [Rust](../docs/nodes/rust.md)

## Key decisions

**HOARE-C001** 🟢 — Hoare logic (1969) introduced the {P} C {Q} triple as the unit of correctness reasoning; this allowed formal proofs of program correctness independent of execution; it is the basis for every subsequent formal-verification system including Coq, Isabelle/HOL, separation logic, and the Rust borrow checker's safety proofs; the 1969 CACM paper has been cited over 5,000 times

**HOARE-C002** 🟢 — CSP (1978) chose synchronous rendezvous as the primitive communication model: a send and a receive complete together or neither does; this is more restrictive than asynchronous message passing but eliminates an entire class of race conditions; Go's channels inherit this model directly; the 1978 CACM paper and 1985 book are the documented sources

**HOARE-C003** 🟢 — the null reference was introduced in ALGOL W (1965) as a convenience: a single sentinel value for "no object here" that could be assigned to any pointer type; Hoare stated in 2009 that the feature was unnecessary given a proper type system with optional types, and that he included it because it was easy to implement; the retrospective is on record at QCon 2009

**HOARE-C004** 🟡 — across Quicksort, Hoare logic, monitors, and CSP, the recurring move is to find the minimal formal structure that eliminates a class of errors: partition eliminates random-access swaps, triples eliminate informal reasoning about state, monitors eliminate ad-hoc locking, CSP eliminates shared-memory races; the pattern is consistent across four decades

**HOARE-C005** 🟠 — "The Emperor's Old Clothes" (1980 Turing Award lecture) argued that the complexity of Ada (then under development) was dangerous; Hoare was on record opposing the design choices of a major NATO-sponsored language effort; the lecture is read as either prescient minimalism or as the view of a theorist who underestimated engineering constraints; both readings are defensible

**HOARE-C006** 🟠 — CSP's synchronous model was less influential in the 1980s–1990s than asynchronous models (UNIX pipes, sockets, Erlang mailboxes allow buffering); its resurgence in Go (2009) and its influence on Rust's async design suggests that the synchronous model's safety properties become more valuable as concurrency bugs become more expensive — a case where the right abstraction waited for the right performance context

## Sources

- Hoare, C.A.R. «Algorithm 64: Quicksort», CACM 4(7) (1961)
- Hoare, C.A.R. «An Axiomatic Basis for Computer Programming», CACM 12(10) (1969)
- Hoare, C.A.R. «Monitors: An Operating System Structuring Concept», CACM 17(10) (1974)
- Hoare, C.A.R. «Communicating Sequential Processes», CACM 21(8) (1978)
- Hoare, C.A.R. «Communicating Sequential Processes» (book), Prentice Hall (1985): http://www.usingcsp.com
- Hoare, C.A.R. Turing Award Lecture «The Emperor's Old Clothes», CACM 24(2) (1981)
- Hoare, C.A.R. «Null References: The Billion Dollar Mistake», QCon London (2009): https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/
