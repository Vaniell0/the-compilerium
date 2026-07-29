# Contributing to The Compilerium

The Compilerium is a **structured claim database** mapping practitioner competence through subject relationships. Not an encyclopedia. The atomic unit is a **Claim** — a typed statement with a stable ID and a confidence level.

The graph is domain-open. IT is where it started; mathematics is next; further domains join without a schema change.

---

## Where to start

Every entity kind ships a `_template.md` in its directory. Templates carry
the discipline inline as HTML comments — capsule shape, claim-mix rubric,
demonstrator heuristic, source rules. Start by copying one:

- `docs/nodes/_template.md` — subject nodes
- `docs/relations/_template.md` — relations between subjects
- `research/_template.md` — research notes (evidence under claims)
- `people/_template.md` — historical figures
- `contributors/_template.md` — authors of this graph *(carries Grounds)*

Files whose slug starts with `_` are skipped by the graph builder, so
templates never appear in the SPA.

---

## Entities

Three primary kinds. A fourth (Person / Contributor) is justified by cross-cutting reference from at least three subjects.

- **Subject** (`docs/nodes/<slug>.md`) — a vertex. Any coherent body of practice: a technology, a formal theory, a methodology.
- **Relation** (`docs/relations/<a>__<b>.md`) — a first-class edge between two subjects. Not owned by either endpoint.
- **Claim** — an inline typed statement with an ID, the atomic unit of the graph.
- **Research** (`research/<slug>.md`) — evidence under Claims. Cited via `supports:` / `challenges:`.
- **Person** (`people/<slug>.md`) — historical figures already established in a subject's lineage.
- **Contributor** (`contributors/<slug>.md`) — someone who authors claims here. Distinct from Person: contributors also carry a **Grounds** section declaring where they are competent and where the gap is.

New entity kinds (Culture, Narrative, Organisation, …) are introduced only when three different subjects require them. No speculative kinds.

---

## Subject node

Frontmatter (all mandatory — the parser treats absence as an error):

```yaml
id: [slug]
entity: subject
title: [Human name]
capsule: [One sentence, domain-neutral. If you cannot write one, the subject is not ready.]
domain: it | math | ...
subdomain: [systems | compilers | languages | runtimes | web | networking | ml | ...]
type: language | runtime | tool | platform | infrastructure | theory | technique | ...
created: YYYY
status: active | legacy | experimental | stub
importance: critical | high | medium | low
```

Sections, never mixed:

- **Timeline** — dated events, people, forks, standard releases, proofs, discoveries.
- **Ontology** — what it IS structurally; core concepts; invariants.
- **Competence** — practitioner capabilities (see model below).
- **Claims** — typed statements about this subject alone.
- **Relations** — links only, no prose.
- **Sources**

### Splitting rule

One Subject = one file. `domain` + `subdomain` are facets for navigation and filtering, **not** a reason to split. A new file is warranted only when the new subject has its **own competence model** (its own four `can_*`, own `key_gap`, own reach). If competence duplicates the parent — it stays as a Claim or section inside the parent.

Example (yes-split): `wine.md` — DLL-level intercept skills, DXVK debugging, sync primitives are distinct from Linux competence.
Example (no-split): "Linux governance" — same competence as Linux; stays as Timeline/Claims inside `linux.md`.

### `stub` status

A `stub` subject exists in the graph as a legitimate endpoint for other relations, but its own content is minimal and awaits expert treatment. Better an empty scaffold than fake expertise.

---

## Relation file

Filename: alphabetical order of slugs, double underscore. Cross-domain relations use the same convention.

Frontmatter:

```yaml
id: a__b
entity: relation
from: a
to: b
direction: a→b | b→a | symmetric
confidence: strong | moderate | weak
axes:
  historical: true | false
  structural: true | false
  competence: true | false
```

Sections:

- **What this is** — 1–2 sentences, no paragraphs. Hard limit. Historical prose belongs on the endpoint's Timeline; interpretation belongs in a Narrative (once that entity lands).
- **Claims** — typed statements about this connection.
- **Competence signal** — what knowing this connection reveals about a practitioner.
- **Sources**

---

## Claim

Format:

```
**SLUG-C001** 🟢 — the statement.
```

ID: `SLUG-C001` for subjects, `A-B-C001` for relations, `SLUG-C001` for person claims.

Four types — never mix in one statement:

- 🟢 **verifiable** — has a source
- 🟡 **visible pattern** — not yet proven
- 🟠 **arguable** — should invite pushback
- 🔴 **genuinely unanswered**

Confidence: **strong / moderate / weak**. Never percentages.

**Atomicity rule.** One verb = one claim. Bundled statements must split. When splitting, preserve stable slot IDs where possible: add new claims as `C-next-number`, do not renumber existing atomic ones — existing `supports:` references stay valid.

**Cross-references are by design.** The same claim ID may be cited from research files, from other subjects, from relations, and from future Narrative entities. Duplication of a claim in a relation-file and a node-file is only a problem if the wording drifts.

---

## Competence model

Four capabilities, relative not absolute. The verbs are domain-neutral; parenthetical shows how each reads:

- `can_explain` — articulate what it is and why it matters _(IT: describe the runtime model; Math: state the theorem and its role)_
- `can_apply` — use it to solve real problems _(IT: implement code with it; Math: use the theorem to prove or compute something)_
- `can_extend` — contribute new material to the subject itself _(IT: write a new library, add a language feature; Math: prove new results, generalise the theory)_
- `can_teach` — bring another practitioner to competence

Reach scale: `very high | high | low | very low`. `key_gap` must reference one of the four `can_*` verbs — not ad-hoc labels like "awareness".

---

## Research

Frontmatter (all mandatory):

```yaml
id: [slug]
entity: research
title: "..."
authors: [...]
year: YYYY
venue: [journal | conference | preprint | ...]
url: https://...
supports: [SLUG-C001, ...]
challenges: [SLUG-C002, ...]
confidence: strong | moderate | weak
```

Sections: **What it says** (2–3 lines, not an abstract) / **Why it matters here** / **Sources**.

`supports:` and `challenges:` IDs must exist in the graph. Broken refs are a lint error.

---

## Person vs Contributor

`people/*.md` — **historical figures** with an established body of work (Torvalds, Hinton, Ritchie, …).

`contributors/*.md` — **authors of this graph**.

Both carry the **identity block** (`id`, `entity`, `title`, `capsule`, `domain`, `subdomain`, `type: person`, `created`, `status`, `importance`) — see the Identity block section below.

Contributors additionally require:

- A mandatory section **Grounds** — "where I'm competent, where the gap is, why I'm daring anyway". This makes the standing of every claim inspectable at the source.
- Optional `handle` frontmatter field if publishing under a pseudonym.

A Contributor node is a prerequisite for authoring claims in the graph.

---

## Identity block (universal)

Every entity file — Subject, Relation, Person, Contributor, Research — carries the same ten identity fields in its frontmatter:

```yaml
id: [slug]
entity: subject | relation | person | contributor | research
title: [human name]
capsule: [one sentence — if you cannot write one, the entity is not ready]
domain: it | math | ...
subdomain: [systems | compilers | languages | runtimes | web | networking | ml | ...]
type: [entity-specific — see below]
created: YYYY
status: [entity-specific — see below]
importance: critical | high | medium | low
```

Entity-specific values:

- **Subject / Contributor**: `type` = language | runtime | tool | platform | infrastructure | theory | technique | person; `status` = active | legacy | experimental | stub
- **Relation**: `type: relation`; `status` = active | legacy | experimental | stub
- **Person**: `type: person`; `status` = active | legacy | deceased
- **Research**: `type` = paper | preprint | talk | rant | survey | project | essay | article | book | blog; `status` = published | preprint | draft

Missing identity fields are a lint error.

Entity-specific fields (`from/to/direction/confidence/axes` for Relation; `authors/year/venue/url/supports/challenges/confidence` for Research; `handle` for Contributor; `born` for Person) are added on top of the identity block.

---

## Session process

Never generate content alone and present it as finished. The cycle:

1. A contributor picks a subject or connection.
2. Explanation is exchanged — teacher role, assume the reader knows how things work but not the culture/history.
3. The other side asks, pushes back, adds perspective.
4. A claim or hypothesis emerges from the conversation.
5. Only then: write to file.

---

## Pull request rules

Every PR MUST attach:

1. The author's contributor node (added in the same PR if new, or referenced by id).
2. The list of claim IDs added or modified.
3. Optional: nominate reviewers whose competence range covers the claims.

**One PR = one node, one relation, one narrative, or one correction.** Bundled PRs get split at review.

---

## File conventions

- Slug: lowercase, no spaces. `llvm.md`, `c-plus-plus.md`, `lambda-calculus.md`.
- Relation filename: alphabetical order, double underscore. `c__llvm.md`, `category-theory__haskell.md`.
- Claim IDs: `LLVM-C001`, `C-LLVM-C001`.
- No percentages anywhere.
- No comments in files.
- Timeline ≠ Ontology ≠ Competence — never in the same section.

---

## Tone

- Start with a question, never with a conclusion.
- No long paragraphs — if a thought needs more than 3 lines, it belongs in a Claim.
- Defend the quality of the map, not any particular claim.
- When challenged: "Interesting. Is there a source or example? If so, it's a reason to update the map."
- Hypothesis must be genuinely arguable — if it wouldn't make someone push back, it's an observation.
- No "best language" (or "best theory") framings.
- Critique claims, not people.

---

## Glossary

- **Subject** — a vertex in the map. Any coherent body of practice.
- **Relation** — a first-class edge between two subjects.
- **Claim** — a typed atomic statement (🟢🟡🟠🔴) with a stable ID.
- **Timeline** — dated events. History, not interpretation.
- **Ontology** — structural definition. What the subject IS.
- **Competence** — what practitioners can do with the subject, in four capabilities.
- **Reach** — how widespread each capability is among practitioners.
- **Key gap** — where most practitioners stop, and why.
- **Domain** — a high-level territory (`it`, `math`, …). Subjects can belong to multiple.
- **Subdomain** — a fine-grained facet within a domain.
- **Axis** (on relations) — `historical | structural | competence`. Boolean per axis.
- **Confidence** — `strong | moderate | weak`.
- **Practitioner** — anyone who engages with the subject seriously. Domain-neutral replacement for "developer".
- **Contributor** — a practitioner who authors claims in this graph and carries a contributor node.
