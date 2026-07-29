---
id: pytorch-neurips-2019
entity: research
title: "PyTorch: An Imperative Style, High-Performance Deep Learning Library"
capsule: The paper that documented PyTorch's design decisions — define-by-run, autograd tape, operator overloading — as a system, not a product announcement.
domain: it
subdomain: ml
type: paper
created: 2019
status: published
importance: critical
authors: [Paszke A., Gross S., Massa F., Lerer A., Bradbury J., Chanan G., Killeen T., Lin Z., Gimelshein N., Antiga L., Desmaison A., Kopf A., Yang E., DeVito Z., Raison M., Tejani A., Chilamkurthy S., Steiner B., Fang L., Bai J., Chintala S.]
year: 2019
venue: NeurIPS
url: https://arxiv.org/abs/1912.01703
supports: [PYTORCH-C001, PYTORCH-C002]
challenges: []
confidence: strong
---

## What it says

The paper describes PyTorch as an imperative-style tensor library: every operation executes immediately and the graph is implicit in the Python call stack. The autograd engine records operations to a tape of `Function` nodes linked by `Variable` edges; `.backward()` walks the tape in topological order. The paper explicitly frames the ergonomic design (Python-native, debugger-compatible) as the primary differentiator — not throughput.

## Why it matters here

PYTORCH-C001 claims that define-by-run is the mechanism behind research adoption — that the Python debugger working is the specific advantage over TensorFlow 1.x's define-then-run. This paper documents that mechanism from the authors themselves: section 3.1 names «imperative style» and «Python interpreter integration» as design goals, not incidental properties. PYTORCH-C002 (ecosystem inertia) is supported indirectly: the paper's citation count and its role as the canonical reproducibility reference in NeurIPS 2019 papers confirm that the ecosystem was already committed to PyTorch before TensorFlow 2 arrived.

## Sources

- Paszke, A. et al. «PyTorch: An Imperative Style, High-Performance Deep Learning Library», NeurIPS (2019). arXiv:1912.01703. proceedings.neurips.cc/paper/2019/hash/bdbca288fee7f92f2bfa9f7012727740-Abstract.html
