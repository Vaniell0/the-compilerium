---
id: [slug]
entity: subject
title: [Human name]
capsule: [One sentence, domain-neutral, mandatory. If you cannot write one, the subject is not ready.]
domain: it
subdomain: [systems | compilers | languages | runtimes | web | networking | ml | ...]
type: [language | runtime | tool | platform | infrastructure | theory | technique | ...]
created: YYYY
status: active | legacy | experimental | stub
importance: critical | high | medium | low
---

<!--
CAPSULE DISCIPLINE
  Ts-zip reference: "A file compressor that turns a language model into an
  arithmetic coder — the clean demonstration that 'predict the next token'
  and 'compress the text' are the same operation, not two related ideas."

  Structure that works for a mass audience:
    [what it is, in one concrete noun]
    [the identity or mechanism it makes visible]
    [the myth it punctures — optional but preferred]

  If the capsule reads like a Wikipedia lead ("X is a Y that does Z"),
  rewrite it. It has to earn its slot on the index page.
-->

## Timeline

- YYYY — event

<!--
TIMELINE DISCIPLINE
  Dated events only. Each line one fact.
  Prefer 6–12 events; sparse timelines look like stubs, dense ones lose signal.
  Cross-links belong here: "(see [other-node](other.md))" is the right shape.
  Do NOT put interpretation here — that goes in Ontology or Claims.
-->

## Ontology

- Structural definition. What it IS, not how it is used.

<!--
ONTOLOGY DISCIPLINE
  5–7 bullets. Each bullet punctures a common misconception if possible.
  E.g., ts-zip Ontology bullet: "The LM is a probability engine, not a
  magic box: at each byte position it outputs P(next_token | context)."
  If a bullet reads as neutral description, ask whether it is worth the slot.
-->

## Competence

```
can_explain:  [what explaining this looks like]
can_apply:    [what using it to solve real problems looks like]
can_extend:   [what contributing new material to the subject looks like]
can_teach:    [what bringing another practitioner to competence looks like]

reach:
  can_explain:  very high | high | low | very low
  can_apply:    ...
  can_extend:   ...
  can_teach:    ...

key_gap: [where most practitioners stop and why — reference one of the four can_* verbs]
```

## Claims

**[SLUG]-C001** 🟢 — verifiable, has a source. One verb per claim.
**[SLUG]-C002** 🟡 — visible pattern, not yet proven.
**[SLUG]-C003** 🟠 — arguable, should invite pushback.
**[SLUG]-C004** 🔴 — genuinely unanswered.

<!--
CLAIM-MIX RUBRIC (from ts-zip + linux verticals)

  A polished node carries a claim ladder, not a claim heap:

    🟢 mechanism  — how the thing works, verifiable
    🟢 measurement — a number, a court case, a shipped release
    🟡 pattern     — reinterpretation that is not yet proven
    🟠 critique    — opinion the author is willing to defend under pushback
    🔴 open        — genuinely unanswered; risk or future

  Typical shape: 3× 🟢, 1–2× 🟡, 1–2× 🟠, 1× 🔴.

ONE VERB PER CLAIM
  Bundled statements split. If a claim contains "and" as the load-bearing
  connective, it is two claims.

SOURCES-PER-CLAIM RULE
  Every 🟢 claim must be defensible from Sources or from a research/*.md
  file listing this claim ID in `supports:`. If neither exists, downgrade
  to 🟡 or find the citation.

MASS-AUDIENCE ANGLE
  At least one claim should read as a myth-buster.
  Bad:  "X is a technique for Y."
  Good: "X is the cleanest counter-example to «Y is magic»."
  This is what makes the graph provocative rather than encyclopedic.

DEMONSTRATOR HEURISTIC
  A subject sharpens when there is one artifact whose existence proves
  the main thesis: ts_zip proves LLM=compressor; jslinux proves Linux
  is portable enough to live in a browser. If a subject has no
  demonstrator, look for one before adding more claims.
-->

## Relations

- [label](../relations/a__b.md)

## Sources

- ...
