---
id: a__b
entity: relation
title: A ↔ B
capsule: [One sentence, mandatory. If you cannot write one, the relation is not ready.]
domain: it
subdomain: [systems | compilers | languages | runtimes | web | networking | ml | ...]
type: relation
created: YYYY
status: active | legacy | experimental | stub
importance: critical | high | medium | low
from: a
to: b
direction: a→b | b→a | symmetric
confidence: strong | moderate | weak
axes:
  historical: true | false
  structural: true | false
  competence: true | false
---

<!--
RELATION SANITY CHECK
  A relation earns its own file only if it carries claims that don't fit
  in either endpoint alone. If the interesting content sits on one side,
  put it there and drop the relation to a link in that endpoint's Relations
  section.

  Example that earns its file: linux__windows — 12 claims about opposite
  ABI bets, Shellshock vs UAC pattern, WSL2 vs Proton asymmetry — none of
  which is a Linux fact or a Windows fact on its own.

  Example that would not: "python__setuptools" — the packaging story
  belongs inside python.md.
-->

## What this is

[1–2 sentences max. No paragraphs. Historical prose goes to the endpoint's Timeline; interpretation goes to a Narrative.]

## Claims

**A-B-C001** 🟢 — one verb per claim. Atomicity is enforced by lint.
**A-B-C002** 🟡 — ...
**A-B-C003** 🟠 — ...
**A-B-C004** 🔴 — ...

<!--
RELATION CLAIM DISCIPLINE
  Same 🟢🟡🟠🔴 rubric as Subject claims. See docs/nodes/_template.md
  for the full ladder.

  Prefer claims that name a mechanism the *pair* exhibits:
    - opposite bets on the same axis (linux__windows: ABI stability)
    - asymmetric translation (Wine vs WSL2)
    - shared pattern with different substrates (Shellshock ↔ UAC bypass)
-->

## Competence signal

[One line: what does knowing this connection reveal about a practitioner's depth?]

## Sources

- ...
