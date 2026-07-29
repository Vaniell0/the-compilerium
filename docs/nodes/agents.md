---
id: agents
entity: subject
title: AI Agents
capsule: An LLM-based system that perceives an environment, selects actions from a tool set, and re-plans from observations — the point where a language model stops being a text generator and starts being a policy operating over state.
domain: it
subdomain: ml
type: technique
created: 2023
status: active
importance: high
---

## Timeline

- 1986–1990s — Belief-Desire-Intention (BDI) agents and multi-agent systems (Wooldridge & Jennings): classical "rational agent" framework; agents defined by goals, beliefs, and plans; no learning component; deliberative architectures
- 2022 — ReAct (Yao et al., arXiv:2210.03629): interleaved Reasoning and Acting in a single prompt chain; the pattern that nearly all subsequent LLM agents follow; tested on HotpotQA, Fever, and interactive web tasks
- 2023 — AutoGPT (Gravitas, open source): the cultural moment; "LLM + tool loop + self-prompting" assembled into an autonomous agent; demonstrated recursive planning without fine-tuning; crashed loudly in production but mainstreamed the idea
- 2024 — Anthropic Computer Use (Claude 3.5 Sonnet): first production-grade model that takes screenshots, moves a cursor, and types; GUI becomes a tool surface; demonstrated on multi-step desktop tasks
- 2024 — Model Context Protocol (MCP, Anthropic): open standard for connecting LLMs to tools, data sources, and services; the plumbing that makes agents tool-agnostic
- 2024 — Devin (Cognition Labs): SWE-agent framing; autonomous coding agent targeting end-to-end software engineering tasks; first agent product to claim software-engineer-level code generation
- 2024 — Google I/O keynote: Google frames agents as the industry direction for the next product cycle; Gemini agent capabilities as the flagship; the "year of the agent" framing enters industry discourse
- 2024 — SWE-Bench Verified (OpenAI): a curated subset of SWE-Bench where human reviewers confirm that the issue is genuinely solved; coding-agent SOTA moved from ~15% to ~50%+ on this benchmark in roughly 18 months
- 2024–2025 — o1 / o3 (OpenAI), DeepSeek R1: reasoning models that expand test-time compute; their long internal chain-of-thought resembles planning; whether this constitutes agency is definitionally contested

## Ontology

- **Policy on a substrate**: an agent is a policy (the LLM) that maps observations to actions; the substrate is whatever environment exposes observations and accepts actions — a file system, a browser, an API, a terminal; without an environment to act on, an LLM is not an agent
- **The ReAct step**: in production agents the LLM is called in a loop — Thought (LLM reasons about current state) → Action (LLM selects a tool call) → Observation (tool returns a result) → repeat; this loop is not in the model's weights; it lives in the orchestration wrapper
- **Tool set = action space**: what an agent can do is exactly the set of tools its orchestrator exposes; agents do not improvise new capabilities — they call the tools they are given; expanding capability means adding tools, not retraining the model
- **Memory is external**: in the baseline design the LLM has no persistent memory — only the context window; agent memory is implemented by appending observations to the context (short-term), writing to a vector store (long-term retrieval), or updating a structured state; none of these are native to the Transformer
- **Agent vs chatbot**: a chatbot produces text from text; an agent produces text that is parsed as a tool call, executes it, and observes the result; the distinction is architectural — the execution loop and the environment interface, not the model or the prompt
- **Agent vs function-calling**: function-calling is a single LLM response that selects a tool; an agent is a multi-step loop where each observation changes what the model does next; function-calling is one iteration of the ReAct step, not the loop itself

## Demonstrator

SWE-Bench Verified: a benchmark of real GitHub issues from popular Python repositories; each task requires reading code, diagnosing a bug, writing a patch, and passing the project's own test suite. In early 2024 the best coding agents resolved roughly 15% of verified issues. By mid-2025 SOTA is above 50%. The benchmark is run programmatically — the agent gets a terminal, a repo, and a problem statement; no human is in the loop during evaluation. The trajectory of the numbers is the clearest public signal that LLM-agent capability is improving at engineering tasks, and the remaining 50% is where the architectural limits of the current ReAct-over-LLM design are most visible.

## Competence

```
can_explain:  what the ReAct loop is and why the orchestrator, not
              the model, implements it; why an LLM with function-calling
              is not yet an agent; why memory is not in the model

can_apply:    wire an LLM to a tool set using a ReAct-style orchestrator;
              instrument the observation-action loop; debug tool failures
              from partial transcripts; evaluate agent trajectories on
              SWE-Bench-style tasks

can_extend:   design multi-agent topologies (orchestrator + specialists);
              add persistent memory via retrieval; integrate world-model
              substrates for longer-horizon planning

can_teach:    explain why "just give the LLM more tools" is not the same
              as long-horizon planning; explain the benchmark gap between
              ReAct agents and what software engineers actually do

reach:
  can_explain:    high
  can_apply:      low
  can_extend:     very low
  can_teach:      very low

key_gap: can_apply — many practitioners can describe the ReAct pattern
         but cannot instrument a real agent loop, distinguish tool-failure
         from model-failure in a transcript, or evaluate whether an agent
         actually completed a task vs got stuck in a plausible-looking loop
```

## Claims

**AGENTS-C001** 🟢 — the ReAct pattern (Yao et al., arXiv:2210.03629) interleaves chain-of-thought reasoning with tool-action steps in a single prompt chain; the paper tested it on HotpotQA, FEVER, and ALFWorld and showed measurable improvement over pure reasoning (CoT) and pure acting baselines; it is the template most production agent orchestrators follow

**AGENTS-C002** 🟢 — SWE-Bench Verified SOTA for coding agents rose from roughly 15% to above 50% between early 2024 and mid-2025; the benchmark requires an agent to read a real GitHub repo, diagnose a bug, write a patch, and pass the project's own test suite with no human in the loop during evaluation

**AGENTS-C003** 🟢 — Anthropic Computer Use (Claude 3.5 Sonnet, 2024) demonstrated a model completing multi-step GUI tasks by processing screenshots as observations and producing structured action outputs (mouse move, click, keypress); the environment interface is a standard desktop — no custom API, no SDK

**AGENTS-C004** 🟡 — MCP (Model Context Protocol, 2024) is converging on a defacto standard for tool-to-agent integration across vendors; if adoption continues, agent capability will decouple from the underlying model — the same tool ecosystem will be accessible to any MCP-compatible LLM; whether this actually happens depends on vendor participation sustaining beyond Anthropic's own ecosystem

**AGENTS-C005** 🟠 — most shipped agent systems in 2024-2025 are the ReAct pattern with a longer prompt and a larger tool set; the orchestration architecture, the loop structure, and the reasoning scaffold are nearly identical to Yao et al. 2022; the novelty is the models and the tools, not the agent architecture itself

**AGENTS-C006** 🟠 — whether reasoning models (o1, o3, DeepSeek R1) are agents depends on the definition: if "agent" requires acting on an external environment, they are not agents by default; if "agent" is defined by behaviour (autonomously working toward a goal over multiple reasoning steps), they qualify; the debate is a definitional one, not an empirical one, and the definition chosen shapes which architecture bets look correct

**AGENTS-C007** 🟠 — whether an LLM-only agent without a persistent world model can perform genuine long-horizon planning is not established; current agents solve multi-step tasks by re-attending to a growing context, not by maintaining an internal model of world state; the distinction matters for tasks where the observation window is too narrow to hold all relevant state

**AGENTS-C008** 🔴 — whether the current industry bet on agents as the deployment frontier (per Google I/O 2024, Anthropic, OpenAI messaging) pays off in the LLM-only substrate, or whether the ceiling is hit before agents are useful for the tasks that justify the investment (long-horizon software engineering, scientific research, autonomous system operation), is the live open question; the answer likely depends on whether the world-model layer arrives before the product window closes

**AGENTS-C009** 🟠 — LLMs pretrained only on text, when handed interfaces to environments they were not designed for (Docker containers with bash shells, GUI screenshots via Computer Use, browser DOMs), demonstrate emergent grounding: behavioural competence with file systems, processes, command semantics, and GUI state that was never an explicit training objective; the mechanism is that compression pressure over technical documentation and code (see the compression-equals-prediction thesis) produced weights encoding command semantics, and the environment interface simply exposes them to actionable use; this pattern is empirical evidence that internal task representation emerges as a byproduct of large-scale compression, complementing rather than replacing the explicit world-model path (see [Agents ↔ World Models](../relations/agents__world-models.md))

## Relations

- Nodes: [Transformer](transformer.md) — the LLM substrate that current agents use as their policy; the Transformer's KV-cache context limit is a structural constraint on how much state an agent can hold without external memory
- Nodes: [JEPA](jepa.md) — JEPA-style world models are a candidate substrate for the next agent generation, where prediction in representation space replaces token-level re-prompting for planning
- Relations: [agents ↔ world models](../relations/agents__world-models.md)
- Relations: [agents ↔ transformer](../relations/agents__transformer.md)

## Sources

- Yao, S. et al. «ReAct: Synergizing Reasoning and Acting in Language Models». arXiv:2210.03629 (2022)
- Wooldridge, M. *An Introduction to MultiAgent Systems* (2nd ed.). Wiley (2009)
- Anthropic. «Introducing computer use, a new Claude 3.5 Sonnet, and Claude 3.5 Haiku». anthropic.com/news/3-5-models-and-computer-use (2024)
- Anthropic. Model Context Protocol. modelcontextprotocol.io (2024)
- Google I/O 2024 keynote — agents framing as industry direction
- OpenAI. «Introducing SWE-Bench Verified». openai.com/index/introducing-swe-bench-verified (2024)
