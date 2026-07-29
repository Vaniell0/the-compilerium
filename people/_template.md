---
id: [slug]
entity: person
title: [Full Name]
capsule: [One sentence, mandatory. If you cannot write one, the person is not ready.]
domain: it
subdomain: [systems | compilers | languages | runtimes | web | networking | ml | ...]
type: person
created: YYYY
status: active | legacy | deceased
importance: critical | high | medium | low
---

<!--
PERSON vs CONTRIBUTOR
  This template is for historical figures with an established public body
  of work. If the entity being added is an author of claims in *this*
  graph, use contributors/ instead — that template additionally requires
  a Grounds section declaring competence range and gaps.
-->

## Known for

- ...

<!--
KNOWN FOR DISCIPLINE
  One line per shipped artifact / result: year, name, what it changed.
  Bad:  "worked on distributed systems at Google."
  Good: "cgroups (2007): CPU/memory/IO accounting per process group,
         later became the C in Docker's LxC."
-->

## Technologies shaped

- [technology](../docs/nodes/slug.md)

<!--
AUTO-POPULATED "OWN WORK"
  Do not list contributed artifacts here just to show them. If a subject
  node's body prose mentions this person, the SPA's Own Work section
  will surface it automatically via backlinks. This section is for the
  handful of technologies the person is inseparable from, not a résumé.
-->

## Key decisions

**[SLUG]-C001** 🟢 — ...
**[SLUG]-C002** 🟡 — ...
**[SLUG]-C003** 🟠 — ...

<!--
KEY DECISIONS DISCIPLINE
  Frame each as a choice under constraint, not a biography line.
  Bad:  "Bellard released QuickJS in 2019."
  Good: "Bellard builds every project as a minimal implementation:
         TCC compiles C in seconds without optimisations; QuickJS is
         a full ES2023 engine in 210 KB; jslinux is Linux without
         native code — the pattern repeats in every project."

  Same 🟢🟡🟠🔴 rubric as Subject claims. See docs/nodes/_template.md.
-->

## Sources

- ...
