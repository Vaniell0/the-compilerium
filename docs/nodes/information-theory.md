---
id: information-theory
entity: subject
title: Information Theory
capsule: The 1948 identity that turned "how surprising is this message" into a countable quantity of bits — the mathematical ground the compression-equals-prediction thesis stands on.
domain: math
subdomain: information-theory
type: theory
created: 1948
status: active
importance: critical
---

## Timeline

- 1928 — Hartley: information as log of the number of possible messages; the seed of the logarithmic law
- 1948 — Shannon: «A Mathematical Theory of Communication» (Bell System Technical Journal) — entropy H(X) = −Σ p(x) log₂ p(x), source coding theorem, channel coding theorem; the field is born in a single paper
- 1949 — Kraft's inequality: which codeword-length assignments correspond to prefix codes; the bridge from probability to concrete bit-strings
- 1951 — Kullback & Leibler: relative entropy D(p‖q) — the asymmetric «distance» from a true distribution to a model
- 1961 — Fano: inequality relating error probability and conditional entropy; used later as a lower bound on the risk of any classifier
- 1965 — Kolmogorov: algorithmic complexity K(x) — the length of the shortest program producing x; a definition of «information content» that does not require a probability distribution
- 1968 — Solomonoff: universal prior; formalises inductive inference as compression
- 1976 — Rissanen / Pasco (independently): arithmetic coding — the general algorithm that reaches Shannon's entropy limit for any probability model, without needing the model's structure
- 1978 — Rissanen: Minimum Description Length principle — model selection by total code length of (model + data given model)
- 1988 — Jaynes: Maximum Entropy principle formalised — under given constraints, the least biased distribution is the one of maximum entropy
- 1991 — Cover & Thomas: «Elements of Information Theory» textbook consolidates the field and becomes the standard graduate reference
- 2018 — InfoNCE (Oord et al., «Representation Learning with Contrastive Predictive Coding»): mutual information as a training objective in modern representation learning; information theory returns to ML as a first-class loss designer

## Ontology

- **Entropy is expected surprise**: H(X) = −Σ p(x) log₂ p(x); the average number of bits needed to encode one draw from X under an optimal code; a probability distribution IS a compression scheme
- **Cross-entropy is the ML loss**: H(p,q) = −Σ p(x) log₂ q(x); training a classifier with «cross-entropy loss» IS training a compressor for the true distribution p using model q; every softmax head fitted with cross-entropy is doing information-theoretic estimation
- **KL divergence measures compression waste**: D(p‖q) = H(p,q) − H(p); the excess bits paid for using distribution q when the truth is p; asymmetric, non-negative, zero iff p=q; the natural measure of «how wrong is my model»
- **Mutual information couples two variables**: I(X;Y) = H(X) − H(X|Y); how many bits knowing Y reveals about X; the objective InfoNCE and MINE estimate; symmetric, and zero iff X⫫Y
- **Source coding theorem is the compression bound**: no lossless code can compress i.i.d. draws below their entropy on average; ts_zip's ratio approaches this bound from above; classical compressors like xz are further from it because their probability model is weaker
- **The Kolmogorov branch is not statistical**: K(x) is a property of the string, not a distribution; it says compression is a proxy for structure, and there is a shortest program even for a string with no probability model; Solomonoff bridges the two by defining a universal prior weighted by 2^(−K)

## Competence

```
can_explain:  Shannon's identity H(X) = −Σ p log p; why cross-entropy
              loss and log-likelihood are the same function; why KL is
              asymmetric; the difference between statistical entropy
              (Shannon) and algorithmic complexity (Kolmogorov)

can_apply:    compute entropy of a discrete distribution by hand; read a
              cross-entropy training curve as bits per token; recognise
              that «perplexity» is 2^H — the effective vocabulary size
              the model is choosing between

can_extend:   choose an information-theoretic objective (InfoNCE, MINE,
              MDL) for a specific task; formalise a Bayesian prior using
              MaxEnt under stated constraints; design a rate-distortion
              tradeoff for a lossy compression task

can_teach:    walk a listener from «bits are surprise» to «cross-entropy
              is compression» in one hour without invoking ML jargon,
              using ts_zip or classical compression as the demonstrator

reach:
  can_explain:    low
  can_apply:      very low
  can_extend:     very low
  can_teach:      low

key_gap: can_apply — most people who understand «cross-entropy loss» in a
         framework cannot state the equivalent claim in bits per byte, or
         translate a validation loss into a compression ratio; the ML
         framework has swallowed the information-theoretic content and
         hidden it behind an API name
```

## Claims

**INFO-THEORY-C001** 🟢 — Shannon's source coding theorem (1948) states that any lossless code for i.i.d. draws from X has average length ≥ H(X); the bound is achievable in the limit; no algorithm — classical or neural — can compress below entropy on average without loss

**INFO-THEORY-C002** 🟢 — cross-entropy loss and negative log-likelihood are the same function: −Σ p(x) log q(x) minimised over q reduces to fitting the log-probabilities of the observed labels; every classification head trained with cross-entropy is doing maximum-likelihood estimation, and its loss reported in nats or bits is a direct compression measure

**INFO-THEORY-C003** 🟢 — arithmetic coding (Rissanen 1976, Pasco 1976) achieves the entropy bound given any probability model, decoupling «how good is the model» from «how good is the coder»; this decoupling is what allows ts_zip to plug a neural LM into a classical coder unchanged

**INFO-THEORY-C004** 🟡 — Kolmogorov complexity is uncomputable but the intuition it names — «shorter description = more structure» — is the operational principle behind every practical compression benchmark; the theoretical impossibility does not prevent the practical usefulness of the frame

**INFO-THEORY-C005** 🟠 — the identity «better predictor = better compressor» is stronger than its ML framing usually admits: it is not a metaphor, it is Shannon's theorem plus arithmetic coding; when Bellard's ts_zip halves xz's ratio on natural text, the LM is not «being creative» — it is estimating a distribution closer to the true source, and the coder converts that estimate into bits mechanically

**INFO-THEORY-C006** 🟠 — the Maximum Entropy principle (Jaynes) is philosophically contested as a prior-selection rule: critics argue it smuggles in a metric on parameter space (the choice of coordinates matters), Bayesians propose reference priors as a rival principle; the debate is live in statistics and rarely surfaces in ML practice where MaxEnt is invoked without justification

**INFO-THEORY-C007** 🔴 — whether information-theoretic quantities (mutual information, entropy of representations) are the right *training* objective for representation learning is open: InfoNCE succeeds empirically but its MI estimate is bounded by log(batch_size); alternative objectives (contrastive without MI framing, non-contrastive like BYOL) work equally well, suggesting the information-theoretic story may be a post-hoc rationalisation of what actually works

## Relations

- Nodes: [ts_zip](ts-zip.md) — the cleanest demonstrator that Shannon 1948 plus arithmetic coding 1976 plus a modern LM equals compression; ts_zip's bits-per-byte is the theory's number, not an analogy
- Nodes: [Backpropagation](backprop.md) — cross-entropy loss is the information-theoretic quantity that backprop minimises; every trained classifier is a compressor under a probability model
- Nodes: [Distillation](distillation.md) — KL divergence between teacher and student distributions is the transferred quantity; the temperature parameter of soft targets is exactly the Shannon-entropy softmax with a chosen scale
- Nodes: [Transformer](transformer.md) — the softmax head over the vocabulary is the MaxEnt distribution under the constraints the logits impose; the model's cross-entropy on the validation set IS its compression rate on that data
- Nodes: [RWKV](rwkv.md) — same objective, different substrate; the WKV state compresses history into a fixed-size sufficient statistic — information-theoretically, a lossy representation of the past optimised for future prediction

## Sources

- Shannon, C. E. «A Mathematical Theory of Communication», Bell System Technical Journal (1948)
- Cover, T. M. & Thomas, J. A. «Elements of Information Theory», 2nd ed., Wiley (2006) — the standard textbook
- Rissanen, J. «Generalized Kraft Inequality and Arithmetic Coding», IBM Journal of Research and Development (1976)
- MacKay, D. J. C. «Information Theory, Inference, and Learning Algorithms», Cambridge (2003) — free online, treats ML and info theory as one subject
- Jaynes, E. T. «Probability Theory: The Logic of Science», Cambridge (2003) — MaxEnt argued in depth
- Oord, A., Li, Y., Vinyals, O. «Representation Learning with Contrastive Predictive Coding», arXiv:1807.03748 (2018) — InfoNCE
