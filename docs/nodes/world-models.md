---
id: world-models
entity: subject
title: World Models
capsule: A learned internal model of environment dynamics — encoding how states evolve under actions — that lets an agent predict, plan, or reason without interacting with the world directly; not a synonym for "large pre-trained model", and not yet proven to be implicit in LLM weights.
domain: it
subdomain: ml
type: technique
created: 1990
status: active
importance: high
---

## Timeline

- 1990 — Schmidhuber, J. «Making the World Differentiable»: technical report proposing a neural network that learns a predictive model of its environment; the agent trains a separate controller on top of the learned model; marks the entry of the term into ML
- 1991 — Schmidhuber «A Possibility for Implementing Curiosity and Boredom in Model-Building Neural Controllers»: formalises the idea of an internal model as a substrate for intrinsic motivation; curiosity = prediction error of the world model
- 2018 — Ha, D. & Schmidhuber, J. «World Models» (arXiv:1803.10122): VAE compresses observations into latent codes; MDN-RNN predicts next latent code given action; controller acts in the latent rollout without interacting with the environment; naming paper for the modern era of the field; agent trained purely inside a "dream" achieves competitive scores on CarRacing-v0
- 2019 — DreamerV1 (Hafner et al., arXiv:1912.01603): end-to-end latent-dynamics RL; recurrent state-space model learns to reconstruct observations; actor-critic trained entirely on imagined trajectories; competitive with model-free agents on DeepMind Control Suite
- 2020 — DreamerV2 (Hafner et al.): discrete latent representations (categorical); improved reconstruction; state-of-the-art on Atari 100k with fewer environment interactions than model-free baselines
- 2022 — LeCun «A Path Towards Autonomous Machine Intelligence»: explicit world-model framing for the JEPA architecture; argues that autoregressive next-token prediction cannot construct a causal dynamics model; see [JEPA](jepa.md)
- 2023 — DreamerV3 (Hafner et al., arXiv:2301.04104): fixed hyperparameters across 7 domains including Minecraft, BSuite, Atari, DM Control; first algorithm to collect the diamond in Minecraft from pixels without task-specific tuning; the "one algorithm, many domains" result that made latent-dynamics-with-imagination a serious research bet
- 2023 — I-JEPA (Assran et al., CVPR): representation-space prediction for images; no pixel reconstruction; see [JEPA](jepa.md)
- 2024 — DeepMind Genie (Bruce et al.): trained on internet videos; generates action-controllable interactive environments from a single image prompt; 11B parameter spatiotemporal transformer; first large-scale demonstration that a world model can be learned without explicit action labels
- 2024 — V-JEPA (Bardes et al., Meta AI, arXiv:2404.08471): video variant of JEPA; representation-space prediction for video; see [JEPA](jepa.md)
- 2024 — OpenAI Sora: text-to-video diffusion model; OpenAI frames it as a "world simulator"; the claim that video generation without action-conditioning constitutes a dynamics model is disputed (see Claims)
- 2024 — Google I/O keynote: Google DeepMind positions world models as the substrate for the next generation of AI agents; claim that scalar reward + token distributions are insufficient for long-horizon planning becomes the public-facing framing for frontier-lab roadmap bets
- 2024 — Genie 2 (DeepMind): extension of Genie; generates 3D environments playable from a single image; longer temporal coherence; broadens the action-controllable video-world-model line

## Ontology

- **The core triple is encoder-dynamics-decoder**: an encoder maps observation o_t to latent state s_t; a dynamics model f predicts s_{t+1} from s_t and action a_t; a decoder optionally maps s_{t+1} back to observation space; planning happens by unrolling f, not by interacting with the environment
- **Reconstruction-based vs. representation-space prediction**: Dreamer decodes back to pixel/observation space at training time — the dynamics model must predict a latent that can reconstruct what the next frame looks like; JEPA predicts in a lower-dimensional embedding without reconstruction — the EMA teacher has already abstracted pixel-level noise away; both are called world models, but the learning target differs structurally
- **Action-conditioning is load-bearing**: a generative model that predicts the next video frame without action input is a video prior, not a dynamics model; the capacity to simulate the effect of counterfactual actions is what makes imagination useful for planning; Genie learns pseudo-actions from video without labels, Dreamer takes explicit actions, Sora does neither
- **Latent space planning replaces rollout**: in model-based RL the agent rolls out f(s_t, a_t) → s_{t+1} for k steps inside the model, evaluates the imagined trajectory with a value function, and updates the policy; no environment interaction is required during these k steps; sample efficiency is the central argument — fewer real-environment steps needed
- **World model ≠ foundation model**: a pre-trained language model is called a world model informally because it encodes facts about the world; a dynamics model encodes how states transition under actions; these are different things; a model that interpolates documents does not necessarily simulate counterfactual consequences of actions

## Demonstrator

DreamerV3 (Hafner et al., 2023): the same hyperparameter configuration trains on Minecraft (first-person 3D), Atari (2D arcade), DeepMind Control Suite (continuous control), and BSuite (tabular), achieving the diamond in Minecraft from pixels — a task human children solve but that had resisted model-free RL — without any task-specific tuning. This is the existence proof for the claim that a latent dynamics model can generalise across domains where reward signal is sparse and observations are high-dimensional. The result is public, the code is open, and the Minecraft diamond had been an open RL benchmark challenge for years.

## Competence

```
can_explain:  what the encoder-dynamics-decoder triple computes;
              why latent-space rollouts improve sample efficiency;
              difference between reconstruction-based (Dreamer) and
              representation-space (JEPA) world models;
              why action-conditioning distinguishes a dynamics model
              from a generative video model

can_apply:    implement a recurrent state-space model and train
              an actor-critic on imagined trajectories (Dreamer
              architecture); embed a VAE encoder and MDN-RNN in
              a training loop; evaluate a policy on imagined vs
              real rollouts

can_extend:   new dynamics architectures (diffusion-based latent
              prediction, discrete vs continuous state spaces);
              action-free world model pretraining (Genie-style);
              bridging world models and language-conditioned planning

can_teach:    explain why world models are not just "big neural nets
              trained on video"; explain the Dreamer vs JEPA split;
              explain why Sora-as-world-model is a contested framing;
              explain the "agents need world models" bet and why it
              is not yet an empirical result

reach:
  can_explain:  high
  can_apply:    very low
  can_extend:   very low
  can_teach:    low

key_gap: can_explain — most practitioners who know the term "world model"
         cannot distinguish reconstruction-based from representation-space
         prediction, or state why action-conditioning is the load-bearing
         property that separates dynamics models from video generators
```

## Claims

**WM-C001** 🟢 — Ha & Schmidhuber (2018) trained a controller entirely inside a latent "dream" generated by a VAE + MDN-RNN world model, then transferred the controller to the real CarRacing-v0 environment without additional environment interaction; the result showed that a policy can be learned in imagination if the latent dynamics model is accurate enough

**WM-C002** 🟢 — DreamerV3 (Hafner et al., 2023) uses fixed hyperparameters across 7 distinct domains including Minecraft from pixels; it is the first algorithm reported to collect the Minecraft diamond without task-specific tuning; the mechanism is an actor-critic trained entirely on imagined latent trajectories produced by a recurrent state-space model

**WM-C003** 🟢 — DeepMind Genie (Bruce et al., 2024) learns action-controllable interactive environments from unlabelled internet videos by inferring latent actions without explicit action supervision; the model takes a single image as input and generates a playable environment; the paper is public and the DeepMind blog posts a demo

**WM-C004** 🟡 — the practical advantage of world models over model-free RL — fewer real-environment interactions to reach a target performance — holds clearly in low-data regimes (Atari 100k) and in environments where simulation is expensive; in environments where environment interaction is cheap (GPU-simulated physics), the sample efficiency advantage shrinks and model-free baselines close the gap

**WM-C005** 🟠 — OpenAI's description of Sora as a "world simulator" blurs the boundary between a video generative model and a dynamics model: Sora is conditioned on text prompts, not on actions in a state space; it does not expose a mechanism for simulating the consequence of a counterfactual action from a given state; calling it a world model is a framing choice, not a technical claim, and the ML community has not reached consensus on whether pixel generation without action-conditioning qualifies

**WM-C006** 🟠 — the reconstruction-based approach (Dreamer) and the representation-space approach (JEPA) are both legitimately called world models, but they make different architectural bets: Dreamer bets that pixel-level reconstruction pressure forces the latent space to capture dynamics-relevant structure; JEPA bets that an EMA teacher abstracts pixel noise away so the predictor can focus on structure; whether reconstruction is a useful auxiliary signal or wasted capacity is a live methodological argument with no settled empirical answer at scale

**WM-C007** 🟠 — the industry claim "agents need world models to plan" (Google I/O 2024 keynote framing) is a strategic bet, not an empirical result: many production agents that plan — including LLM-based tool-use agents — ship without an explicit learned dynamics model; the claim conflates "useful for planning" with "architecturally necessary for planning", and the latter has not been demonstrated

**WM-C008** 🔴 — whether the dynamics knowledge implicit in a large language model's weights — the model's ability to predict what happens next in a described scenario — is functionally equivalent to an explicit latent dynamics model for the purposes of multi-step planning, or whether the two must be architecturally distinct for reliable counterfactual simulation, is an open question; no experiment has tested explicit vs implicit world model representations at matched compute budgets on the same planning benchmark

## Relations

- Nodes: [JEPA](jepa.md) — JEPA is LeCun's world-model-in-representation-space architecture; V-JEPA 2 adds action prediction, making it the closest JEPA variant to an explicit dynamics model
- Nodes: [Transformer](transformer.md) — LLMs as implicit world models: the debate over whether autoregressive next-token prediction in a Transformer produces a latent dynamics model or merely a text prior (see WM-C008)
- Relations: [agents — world models](../relations/agents__world-models.md)
- Relations: [JEPA — world models](../relations/jepa__world-models.md)
- Relations: [RWKV — world models](../relations/rwkv__world-models.md)

## Sources

- Schmidhuber, J. «Making the World Differentiable», Technical Report FKI-126-90, TU München (1990)
- Ha, D., Schmidhuber, J. «World Models», arXiv:1803.10122 (2018)
- Hafner, D. et al. «Dream to Control: Learning Behaviors by Latent Imagination» (DreamerV1), ICLR (2020). arXiv:1912.01603
- Hafner, D. et al. «Mastering Atari with Discrete World Models» (DreamerV2), ICLR (2021). arXiv:2010.02193
- Hafner, D. et al. «Mastering Diverse Domains through World Models» (DreamerV3), arXiv:2301.04104 (2023)
- LeCun, Y. «A Path Towards Autonomous Machine Intelligence», OpenReview position paper (2022)
- Bruce, J. et al. «Genie: Generative Interactive Environments», DeepMind (2024). deepmind.google/discover/blog/genie-generative-interactive-environments/
- Bardes, A. et al. «Revisiting Feature Prediction for Learning Visual Representations from Video» (V-JEPA), Meta AI (2024). arXiv:2404.08471
- Google I/O 2024 keynote — Demis Hassabis framing of world models as the substrate for AI agents
