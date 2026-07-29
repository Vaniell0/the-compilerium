# The Compilerium

A structured claim database mapping practitioner competence through subject relationships.

The atomic unit is a **Claim**: a typed statement with a stable ID, a confidence level, and a source. Not an article. Not an opinion.

```
LINUX-C003 🟢 — the absence of a stable kernel ABI is documented policy in
stable-api-nonsense.rst: the only way to not break is to upstream.
```

From any claim you can reach: its evidence, its sources, the subject it belongs to, related claims in other subjects, and the research that grounds it.

---

## Structure

| Layer | What it contains |
|-------|-----------------|
| **Subjects** `docs/nodes/` | A vertex in the map — technology, formal theory, methodology. Timeline, ontology, competence, claims. |
| **Relations** `docs/relations/` | First-class edges between subjects. Not owned by either endpoint. |
| **People** `people/` | Historical figures — decisions, lineage, what they got right and wrong. |
| **Contributors** `contributors/` | Authors of this graph. Each carries a *Grounds* section — where they are competent, where the gap is. |
| **Research** `research/` | Papers, talks, primary sources that back specific claims. |

Domains are open. IT is where the graph started; mathematics is the next planned domain. Cross-domain relations are first-class.

---

## The competence model

Every subject carries four capabilities — relative, not absolute:

```
can_explain    articulate what it is and why it matters
can_apply      use it to solve real problems
can_extend     contribute new material to the subject itself
can_teach      bring another practitioner to competence
```

With `reach` estimates — how widespread each capability is among practitioners. Every subject has a `key_gap` entry: where most practitioners stop, and why.

---

## Confidence levels

Every claim is typed:

| Type | Meaning |
|------|---------|
| 🟢 | Verifiable — has a source |
| 🟡 | Visible pattern — not yet proven |
| 🟠 | Arguable — should invite pushback |
| 🔴 | Genuinely unanswered |

Overall confidence on a claim: **strong / moderate / weak**. Never percentages.

---

## Current state

- **22** subjects
- **18** relations
- **14** people
- **13** research documents

Branches so far: systems (C, C++, Rust, Clang, LLVM, GCC, MLIR), platforms (Linux, macOS, Windows, Wine, WSL), web (JS, V8, WASM), ML (PyTorch, Transformer, Distillation, JEPA), networking (TCP/IP, QUIC), languages (Python).

---

## What this is not

- Not a wiki — there are no neutral summaries.
- Not a tutorial — competence levels are descriptive, not prescriptive.
- Not finished — the map grows through conversation, pushback, and primary sources.

---

## Contributing

Claims are the contribution unit. A good contribution is:

- A new claim with a source (`🟢`)
- A challenge to an existing claim with a counter-source
- A relation between two subjects that aren't yet connected

Every contributor publishes a **contributor node** declaring their range of competence — so that the standing behind each claim is inspectable at the source.

[CONTRIBUTING.md](CONTRIBUTING.md) — full data model, PR rules, merge policy, glossary.

[CC BY 4.0 + MIT](LICENSE)
