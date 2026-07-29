---
id: probability
entity: subject
title: Probability
capsule: Kolmogorov's 1933 axioms turned "how likely" into a measure on a σ-algebra — the formal ground on which every statistical model, Bayesian update, and learned distribution stands.
domain: math
subdomain: probability
type: theory
created: 1713
status: stub
importance: critical
---

## Timeline

- 1713 — Bernoulli (Jacob): «Ars Conjectandi» — law of large numbers proved for the first time; probability as a limit of observed frequency
- 1812 — Laplace: «Théorie analytique des probabilités» — systematic Bayesian-style reasoning (the term did not yet exist); prior × likelihood ∝ posterior appears in all but name
- 1933 — Kolmogorov: «Grundbegriffe der Wahrscheinlichkeitsrechnung» — probability axiomatised as a measure on a σ-algebra summing to 1; frequency and belief interpretations both satisfy the axioms
- 1950 — Feller: «An Introduction to Probability Theory and Its Applications» vol. I — the pedagogical standard for a generation; discrete and continuous cases unified
- 1988 — Pearl: «Probabilistic Reasoning in Intelligent Systems» — Bayesian networks give a graphical language for conditional independence; probabilistic graphical models enter CS

## Ontology

- **Probability space**: a triple (Ω, F, P) — sample space, σ-algebra of events, measure summing to 1; "random" is defined relative to this structure, not intuitively
- **Random variable**: a measurable function from Ω to a value space; expectation is integration against the probability measure P
- **Conditional independence**: X ⫫ Y | Z; the structural primitive for factoring joint distributions and the basis of graphical models; distinct from marginal independence
- **Bayes' rule**: P(A|B) = P(B|A)P(A)/P(B); not a theorem with content — a tautology about conditional probability — but the engine of all Bayesian inference

## Competence

```
can_explain:  Kolmogorov's axioms and why they unify frequency and belief;
              what expectation is as an integral; what conditional
              independence means structurally; Bayes' rule as identity

can_apply:    compute expectations and variances for standard distributions;
              apply Bayes' rule to update a discrete prior; read a
              probabilistic graphical model and identify independence claims

can_extend:   work with measure-theoretic probability beyond discrete cases;
              design a probabilistic model and derive its marginals and
              conditionals; reason about exchangeability, de Finetti, martingales

can_teach:    take a practitioner from coin-flip intuition to the
              measure-theoretic definition and back; explain why the
              frequentist/Bayesian split is philosophical, not mathematical

reach:
  can_explain:  very low
  can_apply:    very low
  can_extend:   very low
  can_teach:    very low

key_gap: can_extend — practitioners learn to use standard distributions and
         run Bayes' rule but cannot construct or critique novel probabilistic
         models; measure theory is the invisible wall
```

## Claims

**PROB-C001** 🟢 — Kolmogorov's axioms (1933) define probability as a σ-additive measure on a σ-algebra with P(Ω)=1; both frequentist and Bayesian interpretations of probability satisfy these axioms, so the axioms do not settle the philosophical dispute — they only constrain the mathematics

**PROB-C002** 🟢 — Bayes' rule P(A|B) = P(B|A)P(A)/P(B) follows directly from the definition of conditional probability; it is mathematically trivial but epistemologically central: every learned model that outputs a distribution is implicitly performing this update

**PROB-C003** 🟡 — the frequentist/Bayesian divide is a philosophical disagreement about what probability *refers to* (long-run frequency vs. degree of belief), not a mathematical one; both camps use Kolmogorov's axioms, and in large-data regimes their predictions converge; the debate surfaces practically when choosing priors or interpreting confidence intervals

## Relations

- Nodes: [Information Theory](information-theory.md) — Shannon entropy H(X) = −Σ p(x) log p(x) is a functional of a probability distribution; mutual information and KL divergence are probabilistic quantities
- Nodes: [Backpropagation](backprop.md) — cross-entropy loss is the negative log-likelihood of the model's predictive distribution; training is maximum likelihood estimation
- Nodes: [Transformer](transformer.md) — the softmax over logits defines a categorical distribution; language model training is maximum likelihood over this distribution
- Nodes: [JEPA](jepa.md) — joint-embedding architectures implicitly model conditional distributions; predictive coding is Bayesian inference under a generative model
- Nodes: [World Models](world-models.md) — a world model is a learned conditional distribution P(next state | current state, action); planning under uncertainty is probabilistic inference

## Sources

- Kolmogorov, A. N. «Grundbegriffe der Wahrscheinlichkeitsrechnung», Springer (1933); English tr. «Foundations of the Theory of Probability», Chelsea (1956)
- Feller, W. «An Introduction to Probability Theory and Its Applications», vol. I, 3rd ed., Wiley (1968)
- Billingsley, P. «Probability and Measure», 3rd ed., Wiley (1995) — measure-theoretic treatment; standard graduate reference
- Casella, G. & Berger, R. L. «Statistical Inference», 2nd ed., Duxbury (2002) — bridges probability and statistics; covers frequentist and Bayesian methods
- Pearl, J. «Probabilistic Reasoning in Intelligent Systems», Morgan Kaufmann (1988)
