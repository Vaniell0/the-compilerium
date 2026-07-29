---
id: optimization
entity: subject
title: Mathematical Optimization
capsule: The discipline of finding the minimum (or maximum) of a function over a feasible set — the engine that turns a loss into trained parameters when combined with calculus and linear algebra.
domain: math
subdomain: optimization
type: theory
created: 1788
status: stub
importance: high
---

## Timeline

- 1788 — Lagrange: «Mécanique analytique» — multipliers for equality-constrained optimisation; the technique that now bears his name
- 1847 — Cauchy: steepest descent as a numerical method; first publication of what becomes gradient descent
- 1939/1951 — Karush (1939 master's thesis), Kuhn & Tucker (1951 published): KKT conditions — necessary conditions for optimality under inequality constraints; generalise Lagrange multipliers to the inequality case
- 1947 — Dantzig: simplex method for linear programming; efficient exact optimisation over polytopes; opens the field of mathematical programming
- 1970 — Boyd & Vandenberghe era begins; convex analysis matures into a practical engineering discipline (textbook published 2004)
- 1983 — Nesterov: accelerated gradient methods with provably optimal O(1/k²) convergence for smooth convex problems; momentum in modern deep learning inherits this idea

## Ontology

- **Objective function**: the scalar quantity being minimised; its landscape — convex bowl, saddle, flat valley — determines which algorithms work
- **Feasible set**: the set of allowed parameter values; unconstrained optimisation is the special case where the feasible set is all of ℝⁿ
- **Convexity**: a function is convex if its epigraph is a convex set; convex problems over convex sets have no local optima that are not global, making them tractable in theory
- **Duality**: every constrained optimisation problem has a dual whose optimal value bounds the primal; strong duality (primal = dual) holds for convex problems under mild conditions (Slater's condition)
- **First- vs second-order methods**: gradient descent uses ∇f (O(n)); Newton's method uses ∇²f (O(n²) per step); quasi-Newton (L-BFGS) approximates the Hessian for large n

## Competence

```
can_explain:  what a gradient is and why following its negative finds a
              local minimum; what convexity guarantees; what KKT conditions
              say about constrained optima; why SGD works at all

can_apply:    implement gradient descent and SGD; recognise a convex problem;
              use a standard solver (CVXPY, SciPy) on a constrained problem

can_extend:   design a custom solver for a structured problem; prove
              convergence rates; handle non-smooth objectives (subgradients,
              proximal methods); work with duality in practice

can_teach:    take a practitioner from «minimise the loss» to the landscape
              geometry and make the connection to the ML training loop explicit

reach:
  can_explain:  very low
  can_apply:    very low
  can_extend:   very low
  can_teach:    very low

key_gap: can_extend — most ML practitioners treat optimisation as a black
         box (pick Adam, tune lr, done); the gap to understanding convergence
         proofs or designing custom objectives is large
```

## Claims

**OPT-C001** 🟢 — for convex functions over convex feasible sets, any local minimum is a global minimum; gradient descent with a sufficiently small step size converges to the global optimum; this guarantee vanishes entirely for non-convex objectives such as neural network loss surfaces

**OPT-C002** 🟢 — the KKT conditions (Karush 1939, Kuhn & Tucker 1951) are necessary for optimality at any regular point of a constrained problem with inequality constraints; they reduce to Lagrange's conditions when all constraints are equalities

**OPT-C003** 🟡 — non-convex optimisation in deep learning succeeds empirically not because the loss landscape is convex but because in high-dimensional parameter spaces saddle points are escapable by SGD noise and because overparameterisation creates wide, flat minima; whether this constitutes a theoretical understanding of why training converges is contested

## Relations

- Nodes: [Backpropagation](backprop.md) — backprop computes the gradient ∇L that gradient descent consumes; the two are complementary: backprop finds the direction, optimisation decides the step
- Nodes: [Information Theory](information-theory.md) — maximum entropy is a constrained optimisation problem: maximise H(p) subject to moment constraints; the Lagrange multipliers are the exponential family natural parameters
- Nodes: [Transformer](transformer.md) — Adam (the default transformer optimiser) is an adaptive gradient method; its update rule is an approximation of second-order information using squared gradients
- Nodes: [RWKV](rwkv.md) — same training loop as transformer; optimisation landscape differs because the WKV recurrence creates long-range gradient dependencies

## Sources

- Boyd, S. & Vandenberghe, L. «Convex Optimization», Cambridge (2004) — free online; the standard reference for convex theory and applications
- Nocedal, J. & Wright, S. J. «Numerical Optimization», 2nd ed., Springer (2006) — algorithms: GD, Newton, quasi-Newton, constrained methods
- Bertsekas, D. P. «Nonlinear Programming», 3rd ed., Athena Scientific (2016) — rigorous treatment including duality and KKT theory
- Nesterov, Y. «Introductory Lectures on Stochastic Optimization», Springer (2004) — accelerated methods and complexity theory
- Dantzig, G. B. «Linear Programming and Extensions», Princeton (1963) — historical and foundational for LP and the simplex method
