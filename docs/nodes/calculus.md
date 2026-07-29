---
id: calculus
entity: subject
title: Calculus
capsule: The mathematics of continuous change — limits, derivatives, and integrals — whose chain rule is what reverse-mode autodiff mechanises when training a neural network.
domain: math
subdomain: analysis
type: theory
created: 1687
status: stub
importance: critical
---

## Timeline

- 1665–1687 — Newton: fluxions and fluents — differential calculus developed in private manuscripts; «Principia Mathematica» (1687) uses geometric equivalents; no published notation
- 1675–1684 — Leibniz: independent invention; publishes first (1684) with the d/dx and ∫ notation that survives to today; the priority dispute with Newton is the archetypal simultaneous-invention case in mathematics
- 1821 — Cauchy: «Cours d'Analyse» — the first rigorous ε-δ foundation for limits; continuity and differentiability defined precisely; infinitesimals removed from the foundations
- 1870s — Weierstrass: completes the rigorization program; constructs a continuous nowhere-differentiable function, collapsing the intuition that continuity implies differentiability
- 1902 — Lebesgue: measure-theoretic integration; extends the Riemann integral to a vastly broader class of functions; the basis of modern probability theory and functional analysis
- 1966 — Robinson: «Non-Standard Analysis» — infinitesimals rehabilitated rigorously using model theory; confirms that Leibniz's intuition was not wrong, only insufficiently formalised

## Ontology

- **Limit**: the foundational primitive; all of calculus is built on lim(x→a) f(x); Cauchy's ε-δ definition makes this rigorous without invoking infinitesimals
- **Derivative**: the limit of the difference quotient; measures instantaneous rate of change; for vector-valued functions, the derivative is the Jacobian matrix
- **Integral**: accumulation of infinitesimal increments; Riemann integral works for continuous functions; Lebesgue integral handles measure-zero irregularities and is required for probability theory
- **Fundamental theorem of calculus**: differentiation and integration are inverse operations for continuous functions; the two halves of the subject are one subject
- **Chain rule**: (f ∘ g)′(x) = f′(g(x)) · g′(x); the mechanical fact that makes reverse-mode autodiff possible — backpropagation is the chain rule applied recursively to a computational graph

## Competence

```
can_explain:  what a limit is and why it is needed; what a derivative
              measures; the statement of the fundamental theorem; why the
              chain rule is what backprop computes

can_apply:    differentiate and integrate standard functions by hand;
              compute partial derivatives and gradients; apply the chain
              rule to composite functions

can_extend:   work in infinite-dimensional function spaces (Fréchet/Gateaux
              derivatives); derive the calculus of variations; prove
              convergence using real analysis (Rudin-level)

can_teach:    connect the chain rule to the backprop algorithm concretely —
              draw the computational graph, annotate derivatives, reproduce
              the backward pass without a framework

reach:
  can_explain:  very low
  can_apply:    very low
  can_extend:   very low
  can_teach:    very low

key_gap: can_extend — most practitioners can apply differentiation rules
         and run autograd but cannot work outside standard smooth functions
         or reason about the analysis underlying convergence guarantees
```

## Claims

**CALC-C001** 🟢 — the fundamental theorem of calculus states that for a continuous function f on [a,b], the function F(x) = ∫ₐˣ f(t)dt is differentiable and F′(x) = f(x); differentiation and integration are inverse operations, a result that unifies the two halves of the subject

**CALC-C002** 🟢 — the chain rule for differentiable compositions (f ∘ g)′(x) = f′(g(x))·g′(x) is what reverse-mode automatic differentiation mechanises: backpropagation is the chain rule applied in reverse topological order over a computational graph, accumulating products of local Jacobians

**CALC-C003** 🟡 — the Newton/Leibniz priority dispute (1699–1716) is one of the clearest historical cases of simultaneous independent invention; both developed the core ideas in the 1660s–70s, published at different times under different pressures; the dispute poisoned British/continental mathematical exchange for a generation

## Relations

- Nodes: [Backpropagation](backprop.md) — the entire backprop algorithm is an application of the chain rule; the derivative is the thing computed
- Nodes: [Information Theory](information-theory.md) — Shannon entropy is a functional; its maximum-entropy derivation uses calculus of variations; continuous entropy is an integral
- Nodes: [Mathematical Optimization](optimization.md) — gradient descent requires the derivative; second-order methods require the Hessian; calculus supplies both
- Nodes: [Probability](probability.md) — continuous probability distributions are defined via density functions integrated against Lebesgue measure; expectation is an integral
- Nodes: [Transformer](transformer.md) — the softmax function and its gradient (used in every attention layer backward pass) are standard calculus applied to exponentials

## Sources

- Spivak, M. «Calculus», 4th ed., Publish or Perish (2008) — rigorous single-variable treatment; the standard for careful undergraduates
- Apostol, T. M. «Calculus», vols I–II, 2nd ed., Wiley (1967–1969) — classical rigorous presentation; integrates linear algebra with calculus in vol. II
- Rudin, W. «Principles of Mathematical Analysis», 3rd ed., McGraw-Hill (1976) — «Baby Rudin»; the standard real analysis text; begins where calculus ends
- Courant, R. & John, F. «Introduction to Calculus and Analysis», vols I–II, Springer (1989) — geometric intuition alongside rigour; historically important
- Robinson, A. «Non-Standard Analysis», rev. ed., Princeton (1996) — the rigorous rehabilitation of infinitesimals via model theory
