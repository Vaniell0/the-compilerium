---
id: pytorch
entity: subject
title: PyTorch
capsule: Meta AI's Python tensor library with a dynamic computation graph — not a deep learning library and not a replacement for an inference runtime — that won the research community by making the forward pass debuggable with a plain Python debugger.
domain: it
subdomain: ml
type: infrastructure
created: 2016
status: active
importance: critical
---

## Timeline

- mid-2000s — Torch (Lua): Ronan Collobert, Yann LeCun et al. at IDIAP/NYU; tensor operations + autograd in Lua on top of a C library; the same C tensor library that PyTorch later inherited
- 2015 — TensorFlow 1.x (Google Brain/DeepMind): define-then-run; the graph is declared, then handed to a runtime for execution; debugging requires `tf.Session`, `tf.debugging`, and graph-level inspection tools
- 2016 — PyTorch public release: Adam Paszke, Soumith Chintala et al. at Meta AI (then Facebook AI Research); Python-native, define-by-run; the graph is built by the Python interpreter on each forward pass; September 2016
- 2019 — TorchScript: PyTorch's first serialisation mechanism; compiles a restricted Python subset to a static graph for export; a separate authoring mode, not backward-compatible with standard PyTorch code
- 2019 — TensorFlow 2.0: adds eager execution (dynamic graph) to match PyTorch's ergonomics; by this point the research pipeline — papers, code, tutorials, reproducibility scripts — is written in PyTorch
- 2022 — torch.compile announced in PyTorch 2.0: TorchDynamo intercepts Python bytecode, TorchInductor lowers the captured graph to Triton-generated GPU kernels; define-by-run is preserved at authoring time, compilation happens at first execution; the API does not change
- 2022 — PyTorch Foundation under the Linux Foundation: governance moves from Meta; funding from AMD, Amazon, Google, Meta, Microsoft, Nvidia
- 2023 — most arXiv ML papers cite PyTorch; HuggingFace Transformers defaults to PyTorch; Meta LLaMA, OpenAI training stacks PyTorch-native

## Ontology

- **Tensor, not deep learning framework**: the load-bearing primitive is a multi-dimensional array with a device (CPU/CUDA/MPS) and dtype; neural network layers are one use; everything else — optimisation, symbolic computation, signal processing — is also available
- **Define-by-run (dynamic graph)**: the computation graph is an artefact of executing Python; each call to `.forward()` traces a new graph through the same Python code; no separate compile step before the first run
- **Autograd tape**: every tensor operation where `requires_grad=True` is recorded to a tape (the grad_fn chain on the output tensor); `.backward()` walks the tape in reverse and applies the chain rule; the tape is a Python object — `tensor.grad_fn` — not a black box
- **Gradient accumulation, not overwrite**: gradients are added to `.grad` on each `.backward()` call; `.zero_grad()` is a reset, not a convenience; without it, gradients from successive calls sum, silently distorting training
- **torch.compile is not TorchScript**: TorchScript required authoring in a restricted Python dialect; torch.compile captures standard Python bytecode via TorchDynamo, runs the graph through TorchInductor, and compiles Triton kernels — the user's code does not change
- **Training runtime ≠ inference runtime**: autograd tape is needed for training; at inference the tape is an overhead; ONNX, TorchScript, and torch.export are serialisation paths to inference runtimes (ORT, TensorRT, CoreML) that run without it

## Demonstrator

Set a breakpoint inside a `.forward()` method and run the training loop in the Python debugger: the breakpoint fires, locals are inspectable, the graph is being constructed by the interpreter in the current call frame. Do the same in TensorFlow 1.x: the breakpoint shows an unexecuted `tf.Operation` object, not values — the graph has not run yet. The ergonomic gap is observable in five minutes on any tutorial model. This is the mechanism behind PYTORCH-C001.

## Competence

```
can_explain:    what the autograd tape is; why .zero_grad() is a reset
                not a convenience; why define-by-run means the Python
                debugger works; why torch.compile is not TorchScript

can_apply:      training loop, custom loss, custom nn.Module,
                gradient checkpointing, mixed precision (torch.amp),
                multi-GPU via torch.distributed

can_extend:     custom autograd Function (forward/backward);
                custom CUDA kernel via torch.utils.cpp_extension;
                torch.compile with custom backends or graph breaks;
                replacing PyTorch inference runtime with ORT/TensorRT

can_teach:      explain why define-by-run won over define-then-run;
                explain why TF2 eager mode did not reverse the ecosystem
                shift; explain training vs inference runtime separation

reach:
  can_explain:    high
  can_apply:      high
  can_extend:     very low
  can_teach:      low

key_gap: can_explain — most practitioners know how to call .backward()
         but cannot state that the tape is a Python object, what happens
         on a second .backward() without retain_graph=True, or why
         PyTorch is the right training runtime but not necessarily the
         right inference runtime
```

## Claims

**PYTORCH-C001** 🟢 — PyTorch won research adoption over TensorFlow 1.x through a single ergonomic difference: define-by-run means the Python debugger works on the forward pass; TensorFlow 1.x required `tf.Session.run()` to execute, making the graph opaque at authoring time; the error messages, the breakpoints, the print statements all stopped working — researchers switched, not because PyTorch was faster, but because they could see what was happening

**PYTORCH-C002** 🟢 — TensorFlow 2.0 (2019) added eager execution four years after PyTorch shipped define-by-run; the switch did not recover the research ecosystem: by 2019 the reproducibility pipeline (papers, codebases, tutorials) was in PyTorch; an ecosystem switches on reproducibility inertia, not on feature parity

**PYTORCH-C003** 🟡 — HuggingFace Transformers defaulting to PyTorch pulled production workloads behind the research ecosystem; most fine-tuning and inference infrastructure built after 2019 is PyTorch-native by inheritance, not by deliberate choice

**PYTORCH-C004** 🟠 — «PyTorch is a deep learning library» is a category error: PyTorch is a tensor computation library with reverse-mode automatic differentiation; neural network layers (`nn.Module`, optimisers, loss functions) are one package on top; calling it a deep learning library hides that the autograd machinery is the relevant invention, and that tensors are the load-bearing primitive

**PYTORCH-C005** 🟠 — «PyTorch 2.0 is a rewrite» is wrong: torch.compile adds a compiler path on top of the same eager-mode runtime; the autograd tape, the Module API, the optimizer interface are unchanged; existing PyTorch code runs under torch.compile with one added line and the same semantics — the performance difference is a compilation artefact, not an API change

**PYTORCH-C006** 🟠 — separating training runtime from inference runtime is the architectural default, not an optimisation: the autograd tape is overhead at inference; ONNX export, torch.export, and TorchScript exist specifically to strip the tape before deployment; running PyTorch eager mode in production under load is a choice that should be explained, not a default

**PYTORCH-C007** 🔴 — whether torch.compile closes the performance gap with JAX/XLA on large-scale training (not inference) is not settled: JAX's functional API and XLA compiler were co-designed from the start; TorchInductor is a compiler bolted onto an eager runtime; whether the gap narrows further or stabilises at current levels depends on open compiler research

## Relations

- Research: [PyTorch NeurIPS 2019](../../research/pytorch-neurips-2019.md)
- People: [Yann LeCun](../../people/lecun.md) — Torch lineage (mid-2000s Lua-based predecessor)
- Nodes: [Transformer](transformer.md) — dominant architecture for PyTorch-native research (LLaMA, BERT, GPT families)
- Nodes: [Distillation](distillation.md) — teacher-student training loop implemented in PyTorch in all major distillation papers
- Nodes: [LLVM](llvm.md) — TorchInductor lowers captured graphs to Triton, which compiles via LLVM

## Sources

- Paszke, A. et al. «PyTorch: An Imperative Style, High-Performance Deep Learning Library», NeurIPS (2019). arXiv:1912.01703
- Abadi, M. et al. «TensorFlow: A System for Large-Scale Machine Learning», OSDI (2016)
- PyTorch 2.0 release blog: pytorch.org/blog/pytorch-2.0-release
- PyTorch Foundation announcement: pytorch.org/blog/pytorch-foundation (September 2022)
