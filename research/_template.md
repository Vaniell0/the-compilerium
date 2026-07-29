---
id: [slug]
entity: research
title: "[Full title]"
capsule: [One sentence, mandatory. If you cannot write one, the paper is not ready.]
domain: it
subdomain: [systems | compilers | languages | runtimes | web | networking | ml | ...]
type: [paper | preprint | talk | rant | survey | project | essay | article | book | blog]
created: YYYY
status: published | preprint | draft
importance: critical | high | medium | low
authors: [Last F., Last F., ...]
year: YYYY
venue: [journal | conference | preprint | book | blog | rant | project | ...]
url: https://...
supports: [SLUG-C001, A-B-C002]
challenges: []
confidence: strong | moderate | weak
---

<!--
WHEN TO WRITE A RESEARCH NOTE
  A research note is worth writing when it evidences a specific claim ID
  in the graph. If no claim in `supports:` or `challenges:` names it,
  the note has no home — do not orphan.

  Prefer one strong tie over many weak ones. ts-zip-nncp-compression
  supports 6 claims because each one references a distinct verifiable
  fact from bellard.org.

DO NOT INVENT SOURCES
  If a "canonical paper" for a claim does not exist as a single citable
  document, do not fabricate one. Better: leave the claim with its
  in-body Sources citation and no research note, than manufacture a
  survey that isn't real.
-->

## What it says

[2–3 lines. Not an abstract — the load-bearing claim, in the graph's own vocabulary.]

## Why it matters here

[Which subject-claims this evidences (or challenges) and why the tie is not incidental. Reference IDs listed in `supports:` / `challenges:`.]

<!--
WHY IT MATTERS DISCIPLINE
  Write in the graph's vocabulary, not the paper's. Bad: "the authors
  show that X approximates Y under conditions Z." Good: "TS-ZIP-C001..C003
  and BELLARD-C003 upgrade from arguable pattern to verifiable fact once
  the ratios are on the board."

  If you cannot map the paper to specific claim IDs, either add the
  claims first or drop the note.
-->

## Sources

- [Full citation, DOI, or link]
