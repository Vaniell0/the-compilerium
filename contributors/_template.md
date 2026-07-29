---
id: [slug]
entity: contributor
title: [Display name or handle]
capsule: [One sentence. Who you are in relation to this graph, in one line.]
domain: it
subdomain: [systems | compilers | languages | runtimes | web | networking | ml | ...]
type: person
created: YYYY
status: active
importance: medium
handle: [optional pseudonym]
---

<!--
CONTRIBUTOR NODE PURPOSE
  A contributor node is a prerequisite for authoring claims in the graph.
  Every PR references its author's contributor slug. This template is
  Person + Grounds; the Grounds section is the load-bearing addition.
-->

## Timeline

- YYYY-MM — shipped-thing: what it does, in one line

<!--
TIMELINE DISCIPLINE (contributor version)
  Ship dates, not employment dates. One line per artifact you shipped
  under your own name. If you cannot name what an entry did in one line,
  it does not belong here.
-->

## Ontology

- [How you work, in one bullet]
- [What you build from vs. what you contribute to]

## Competence

```
can_explain:  [what explaining looks like for you specifically]
can_apply:    [what applying looks like]
can_extend:   [what extending looks like]
can_teach:    [what teaching looks like]

reach:
  can_explain:  very high | high | low | very low
  can_apply:    ...
  can_extend:   ...
  can_teach:    ...

key_gap: [where you stop and why — reference one of the four can_* verbs]
```

## Grounds

- Named gaps: [where you are NOT competent. Be specific — "not the JS ecosystem", "historical figures known secondhand". This makes your claims inspectable.]

<!--
GROUNDS DISCIPLINE
  This is what separates a contributor from a person node. The purpose
  is to make every claim you make in the graph *inspectable at the source*.
  A reviewer must be able to read Grounds and know which of your claims
  to trust cold and which to push back on.

  Two failure modes to avoid:
    - False humility: "I know nothing" — useless; every claim becomes suspect.
    - False confidence: no gaps listed — makes claims un-inspectable.

  Good shape: 2–4 specific gaps, each naming a domain you are visibly
  active in without matching depth.
-->

## Claims

**[SLUG]-C001** 🟢 — ...

<!--
CONTRIBUTOR CLAIMS
  Same 🟢🟡🟠🔴 rubric as Subject claims. See docs/nodes/_template.md.
  Contributor claims tend to be about *how you work*, not about the
  subjects. If your claim is about a subject, put it in the subject's
  node file and cite yourself in the PR metadata instead.
-->

## Sources

- ...
