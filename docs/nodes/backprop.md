---
id: backprop
entity: subject
title: Backpropagation
capsule: The reverse-mode autodiff pass that turns "predict better next time" into a concrete change to weights — the mechanism that makes every architecture in this cluster a trainable object rather than a mathematical description.
domain: it
subdomain: ml
type: technique
created: 1970
status: active
importance: critical
---

## Timeline

- 1673 — Leibniz: the chain rule of differentiation as a symbolic identity
- 1970 — Seppo Linnainmaa (Master's thesis, Helsinki): reverse-mode automatic differentiation with error-accumulation over a computation graph — the algorithm as we run it today, published in Finnish
- 1974 — Paul Werbos (PhD thesis, Harvard): applies reverse-mode autodiff to layered neural networks; framework understood but disregarded
- 1986 — Rumelhart, Hinton, Williams: «Learning representations by back-propagating errors» (Nature) — same mathematics, but with empirical demonstration on multilayer perceptrons learning distributed representations; the paper that mattered
- 1989 — LeCun: LeNet handwritten-digit recognition — first production-adjacent backprop training on convolutional layers
- 2006 — Hinton et al: deep belief networks and layerwise pretraining — a bridge across the 1990s "vanishing gradient" plateau
- 2010–2012 — GPU-trained backprop crosses the threshold: Ciresan (2010, MNIST), AlexNet (2012, ImageNet); the algorithm did not change, the hardware did
- 2015 — He et al: residual connections — a structural fix for the vanishing-gradient problem, making very deep backprop-trained networks stable
- 2016 — Chen, Xu, Zhang, Guestrin: gradient checkpointing (arXiv:1604.06174) — trades compute for memory by re-running the forward pass; the technique that made training big models tractable on limited GPUs
- 2017 — PyTorch (Meta AI): dynamic-graph autograd built into Python; the framework that made hand-written backprop obsolete for practitioners
- 2018 — JAX (Google): `grad(f)` as a first-class transformation; reverse-mode autodiff as a compiler pass rather than a runtime engine
- 2022 — FlashAttention (Dao et al): a hand-written CUDA kernel for the attention gradient — evidence that hand-tuned backward passes still beat the general autograd path at scale

## Ontology

- **Reverse-mode autodiff, not "backprop the algorithm"**: what people call backpropagation is one application (neural nets) of the chain rule mechanised over a computation DAG; the DAG is built during the forward pass, gradients are accumulated along its edges in reverse topological order; nothing here is neural-net-specific
- **The forward pass caches activations**: the price of reverse-mode is memory — every intermediate value used by a differentiable op must be retained until its gradient is computed; this cache is what gradient checkpointing throws away and recomputes
- **A loss is a scalar**: backprop needs a single scalar output; the loss function collapses whatever the network produces into one number, and ∇θ of that scalar is what the optimizer consumes; if the objective is not a differentiable scalar, backprop does not apply
- **Backprop is not the learning rule — it is the derivative-computer**: what happens with the gradient (SGD, Adam, LAMB, Lion) is the optimizer's job; backprop's contract is «given a scalar loss and a set of parameters, return ∂L/∂θ»
- **Every trainable architecture in this graph is downstream of backprop**: Transformer, RWKV, JEPA, distillation, agents-with-fine-tuning — none of them describe a training procedure; they describe a differentiable computation whose weights backprop is expected to fill in

## Competence

```
can_explain:  chain rule over a DAG, forward pass caches activations,
              backward pass accumulates gradients in reverse topological
              order; why a single scalar loss is required; why the gradient
              is not the update

can_apply:    hand-write backprop for a 2-layer MLP without a framework;
              verify with numerical gradient; debug a NaN or exploding-
              gradient in a real model by inspecting per-layer gradient
              norms; know when to reach for gradient clipping / checkpoint

can_extend:   write a custom autograd Function (forward + backward);
              choose between recompute and store for memory-constrained
              training; select mixed-precision (bf16/fp16) with an eye
              to gradient-range preservation

can_teach:    walk a listener from ∂L/∂θ_i for one weight to ∇θL for
              the whole model without invoking the framework as a black
              box; show why softmax + cross-entropy have a joint
              gradient that cancels beautifully

reach:
  can_explain:    medium
  can_apply:      low
  can_extend:     very low
  can_teach:      very low

key_gap: can_apply — a working practitioner can invoke `.backward()` but
         cannot debug a training run that produces NaN gradients, cannot
         distinguish an exploding gradient from a vanishing one by
         reading logs, and defaults to lowering the learning rate rather
         than reading the actual gradient statistics
```

## Claims

**BACKPROP-C001** 🟢 — reverse-mode automatic differentiation was published in Linnainmaa's 1970 Master's thesis (Helsinki), applied to neural networks in Werbos's 1974 PhD thesis; the 1986 Rumelhart-Hinton-Williams paper's contribution was empirical demonstration that it works on multilayer networks with distributed representations, not the mathematics — the priority record matters when arguing whether deep learning is «new»

**BACKPROP-C002** 🟢 — every mainstream training framework (PyTorch, JAX, TensorFlow 2.x, MLX) implements reverse-mode autodiff as the differentiation primitive; TensorFlow 1.x's static-graph model was the outlier that ceded the platform to PyTorch — dynamic autograd matches Python's execution model and no framework that fought this has kept market share

**BACKPROP-C003** 🟢 — gradient checkpointing (Chen et al., arXiv:1604.06174) reduces memory from O(N) to O(√N) in the number of layers by re-running the forward pass at chosen boundaries during backward; without checkpointing, training networks above a certain depth is memory-bound rather than compute-bound

**BACKPROP-C004** 🟡 — hand-written backward kernels (FlashAttention, xFormers, Liger) consistently beat framework-generated autograd paths at scale — the pattern repeats every generation: the general algorithm is competitive, the specific kernel is faster; the frontier of training performance lives in the gap between «autograd works» and «autograd is optimal»

**BACKPROP-C005** 🟠 — when the training set contains one class and labels are constant (all y=1, «is this a cat»), backprop shapes f to learn *intra-class variation on the data manifold* — the model captures how cats differ from other cats, not what makes something not-a-cat; «not-cat» is not a category the network represents, it is our interpretation of 1−y; adding a second class (dogs) does not add one dimension — it reshapes the entire representation so the model no longer calls a seal a cat; this is why negative examples and contrastive objectives are not «more data» but «a different manifold»

**BACKPROP-C006** 🟠 — backprop's requirement of differentiability is why hard discrete decisions (argmax, sample-from-distribution, quantise) get replaced by soft substitutes (softmax with temperature, Gumbel-softmax, straight-through estimator, reparameterisation trick); the algorithm's shape constrains what architectures are viable — a family of interesting non-differentiable models is unreachable by gradient descent and drops out of practice not on merit but on trainability

**BACKPROP-C007** 🟠 — the empirical bet that stochastic gradient descent with mini-batches reaches good minima in high-dimensional non-convex landscapes was heresy in 1990s optimisation theory; what turned out to matter is that critical points in high dimensions are overwhelmingly saddle points, not local minima, and SGD escapes them along low-curvature directions — the theoretical story caught up with the engineering practice a decade after the practice worked

**BACKPROP-C008** 🔴 — whether biological neurons implement anything computationally analogous to backprop is open: candidates include feedback alignment (Lillicrap et al., 2016), predictive coding (Whittington & Bogacz, 2017), and equilibrium propagation (Bengio & Fischer, 2017); backprop works at industrial scale but its plausibility as a brain model remains contested — the algorithm is not evidence about how the target of the analogy actually learns

## Relations

- Nodes: [PyTorch](pytorch.md) — the framework carrying the practical autograd implementation; the pair evolved together and the framework choice is now inseparable from the training story
- Nodes: [Transformer](transformer.md) — trained end-to-end by backprop through attention; FlashAttention is a hand-tuned backward pass for the specific case
- Nodes: [RWKV](rwkv.md) — same objective, different substrate; the WKV recurrence must remain differentiable through the state update for training to compose
- Nodes: [Distillation](distillation.md) — teacher-student loss is scalar, gradient flows through the student only; the teacher is `.detach()`-ed
- Nodes: [ts_zip](ts-zip.md) — the compressor is downstream of a network *already trained* by backprop; the frozen weights are what the arithmetic coder reads out

## Sources

- Linnainmaa, S. «The representation of the cumulative rounding error of an algorithm as a Taylor expansion of the local rounding errors», Master's thesis, University of Helsinki (1970)
- Werbos, P. «Beyond Regression: New Tools for Prediction and Analysis in the Behavioral Sciences», PhD thesis, Harvard (1974)
- Rumelhart, D., Hinton, G., Williams, R. «Learning representations by back-propagating errors», Nature (1986)
- Chen, T., Xu, B., Zhang, C., Guestrin, C. «Training Deep Nets with Sublinear Memory Cost», arXiv:1604.06174 (2016)
- Dao, T. et al. «FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness», arXiv:2205.14135 (2022)
- Lillicrap, T. et al. «Random synaptic feedback weights support error backpropagation for deep learning», Nature Communications (2016)
- Baydin, A. et al. «Automatic Differentiation in Machine Learning: a Survey», JMLR (2018)
