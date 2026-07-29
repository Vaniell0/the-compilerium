---
id: karpathy
entity: person
title: Andrej Karpathy
capsule: The engineer-teacher who showed that a 200-line Python file plus a large model is a legitimate software stack — and built the CS231n / nanoGPT pedagogical corpus to prove it.
domain: it
subdomain: ml
type: person
created: 1986
status: active
importance: high
---

## Known for

- CS231n (2015, Stanford) — the lecture series that trained a generation of deep-learning practitioners; freely released on YouTube and became the de-facto entry point to computer vision with neural networks
- "Software 2.0" essay (2017, Medium) — articulated that learned weights are a new kind of program: write the dataset, not the code; shaped how the industry frames model-driven engineering
- Tesla Autopilot (2017–2022) — director of AI; drove the move from radar+lidar fusion to camera-only "vision only" approach, a contested engineering call with safety implications
- nanoGPT (2022) — a GPT-2 reproduction in ~300 lines of PyTorch; turned transformer implementation from graduate-course content into a weekend project
- "Let's build GPT from scratch" (2023, YouTube) — 3-hour video, the most-watched transformer implementation walkthrough; part of a series including makemore, micrograd, and minbpe
- Eureka Labs (2024) — founded to build AI-native education; first product is LLM101n, a course where an LLM is the teacher

## Technologies shaped

- [Python](../docs/nodes/python.md)
- [PyTorch](../docs/nodes/pytorch.md)
- [Transformer](../docs/nodes/transformer.md)

## Key decisions

**KARPATHY-C001** 🟢 — nanoGPT reproduces GPT-2 training in ~300 lines without any abstraction library; Karpathy chose to write it flat rather than extend an existing framework, making the architecture directly inspectable — the repo accumulated 40k+ GitHub stars, confirming that pedagogical minimalism has an audience not served by full-scale frameworks

**KARPATHY-C002** 🟢 — at Tesla (2017–2022) Karpathy championed removing radar and relying on cameras alone; this was a departure from industry consensus that redundant sensors were necessary for safety-critical driving; Tesla shipped camera-only Autopilot in May 2021; the decision remains disputed among autonomous-driving researchers

**KARPATHY-C003** 🟡 — across CS231n, nanoGPT, micrograd, and makemore, the recurring choice is to strip every dependency and rebuild from first principles rather than wrap an existing library; the pattern suggests a teaching philosophy: understanding is only possible if you can hold the whole system in your head

**KARPATHY-C004** 🟠 — Karpathy's "Software 2.0" framing (2017) was prescient about the shift toward learned systems, but it treats the dataset as the new source code without a complete theory of how to version, debug, or audit it; the claim opened a productive direction without solving the tooling gap it named

## Sources

- Karpathy, A. «Software 2.0», Medium (2017): https://karpathy.medium.com/software-2-0-a64152b37c35
- CS231n: Convolutional Neural Networks for Visual Recognition, Stanford (2015–): http://cs231n.stanford.edu
- nanoGPT repository: https://github.com/karpathy/nanoGPT
- «Let's build GPT: from scratch, in code, spelled out», YouTube (2023): https://youtu.be/kCc8FmEb1nY
- Eureka Labs announcement (2024): https://eurekalabs.ai
