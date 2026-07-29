---
id: linear-algebra
entity: subject
title: Linear Algebra
capsule: The arithmetic of transformations — vector spaces and linear maps give the language in which every neural network layer, attention matrix, and gradient step is literally written.
domain: math
subdomain: algebra
type: theory
created: 1844
status: stub
importance: critical
---

## Timeline

- 1844 — Grassmann: «Die lineale Ausdehnungslehre» — the first systematic treatment of vector spaces as abstract objects, largely ignored for decades
- 1858 — Cayley: matrix algebra and the general theory of matrix multiplication; eigenvalues enter through the characteristic equation
- 1888 — Peano: axiomatic definition of a vector space, decoupling the concept from coordinates
- 1942 — Halmos: «Finite-Dimensional Vector Spaces» — modern coordinate-free presentation that became the pedagogical standard
- 1965 — Golub: numerical algorithms for the SVD in stable floating-point arithmetic; SVD becomes computationally practical
- 1983 — Golub & Van Loan: «Matrix Computations» — the reference text for numerical linear algebra; BLAS/LAPACK formalize the computational substrate

## Ontology

- **Vector space**: a set closed under linear combination over a field; the primitive object; coordinates are a choice of basis, not the thing itself
- **Linear map**: a structure-preserving map between vector spaces; every matrix is a linear map, but linear maps are prior — matrices are representations
- **Eigenstructure**: eigenvectors and eigenvalues characterise how a map deforms space along invariant directions; the spectral theorem says real symmetric maps decompose cleanly along orthogonal axes
- **Matrix factorisations**: SVD, QR, LU are not tricks — they are canonical decompositions that make numerical computation stable and interpretable; SVD is the foundation of PCA and low-rank approximation

## Competence

```
can_explain:  what a vector space is axiomatically; why matrix multiplication
              is not commutative; what eigenvalues measure; why SVD exists
              and what its factors mean

can_apply:    multiply matrices and invert small systems by hand; compute
              a low-rank SVD approximation for dimensionality reduction;
              recognise when a problem reduces to a linear system

can_extend:   choose the right factorisation (SVD vs QR vs Cholesky) for
              a numerical task; derive the gradient of a matrix-valued
              function; work in infinite-dimensional Hilbert spaces

can_teach:    carry a practitioner from «matrices are arrays of numbers»
              to «linear maps on vector spaces» and make the abstraction
              earn its keep via a concrete ML example

reach:
  can_explain:  very low
  can_apply:    very low
  can_extend:   very low
  can_teach:    very low

key_gap: can_extend — a practitioner trained via ML tutorials can multiply
         matrices and run SVD, but cannot reason about the geometry of the
         map or derive new results; the gap from user to contributor is wide
```

## Claims

**LINALG-C001** 🟢 — the singular value decomposition exists for any real or complex matrix M = UΣVᵀ; the singular values are the square roots of the eigenvalues of MᵀM; SVD is the computational foundation of PCA, low-rank approximation, and pseudo-inverse solvers

**LINALG-C002** 🟢 — the spectral theorem (for real symmetric matrices): every real symmetric matrix is diagonalisable with orthonormal eigenvectors and real eigenvalues; attention score matrices and covariance matrices are symmetric and their geometry is fully determined by their spectrum

**LINALG-C003** 🟡 — numerical linear algebra as implemented in BLAS/LAPACK is the invisible substrate under PyTorch, TensorFlow, and JAX; the performance of every matrix multiply in a forward pass is determined by cache-blocked BLAS routines, not the framework; this means hardware-level optimisation of matrix operations sets the practical ceiling on training throughput

## Relations

- Nodes: [Transformer](transformer.md) — attention is a sequence of matrix multiplications; Q, K, V projections are linear maps; the scaled dot-product is a bilinear form
- Nodes: [RWKV](rwkv.md) — the WKV operator's recurrence involves outer products and matrix accumulation; linear attention variants factor the attention matrix explicitly
- Nodes: [Backpropagation](backprop.md) — the Jacobian of a layer is a matrix; gradient computation is matrix-vector multiplication along the computational graph
- Nodes: [PyTorch](pytorch.md) — torch.Tensor operations compile down to BLAS calls; autograd tracks linear-algebraic operations symbolically
- Nodes: [Information Theory](information-theory.md) — entropy of a multivariate Gaussian is (1/2) log det(2πeΣ); the determinant is a linear-algebraic quantity

## Sources

- Strang, G. «Introduction to Linear Algebra», 5th ed., Wellesley-Cambridge (2016) — standard undergraduate text, computational emphasis
- Halmos, P. R. «Finite-Dimensional Vector Spaces», 2nd ed., Springer (1958) — coordinate-free treatment; the canonical abstract presentation
- Golub, G. H. & Van Loan, C. F. «Matrix Computations», 4th ed., Johns Hopkins (2013) — numerical methods reference
- Horn, R. A. & Johnson, C. R. «Matrix Analysis», 2nd ed., Cambridge (2013) — advanced treatment of eigenvalue theory and matrix functions
- Trefethen, L. N. & Bau, D. «Numerical Linear Algebra», SIAM (1997) — slim, rigorous, recommended for practitioners
