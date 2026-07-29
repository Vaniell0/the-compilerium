---
id: dahl-ryan
entity: person
title: Ryan Dahl
capsule: Runtime architect who built Node.js on V8 in 2009 and, ten years later, redesigned it as Deno to address the mistakes he later publicly catalogued.
domain: it
subdomain: runtimes
type: person
created: 2009
status: active
importance: medium
---

## Known for

- Created Node.js (2009): took V8 out of the browser and ran it on the server; event-driven, non-blocking I/O
- Talk «10 Things I Regret About Node.js» (JSConf EU 2018): public acknowledgement of Node's architectural mistakes
- Created Deno (2018): a rethink of Node with TypeScript out of the box, secure by default, Web API compatibility
- Created JSR (2024): a package registry for TypeScript, an alternative to npm

## Technologies shaped

- [JavaScript](../docs/nodes/javascript.md)
- [V8](../docs/nodes/v8.md)

## Key decisions

**DAHL-C001** 🟢 — Node.js (2009) made "full-stack JS" possible: V8 on the server, npm as the single package manager; this is a cultural shift, not a technical one — JS on the server was possible earlier as well

**DAHL-C002** 🟢 — in the 2018 talk Dahl named Node's key mistakes: npm (a centralised registry under a single company's control), absence of Promises in the core API from the start, refusal of browser Web APIs

**DAHL-C003** 🟠 — Dahl created Deno as an answer to his own mistakes in Node; this is a rare case where the author publicly redoes his own work; Deno did not displace Node but shifted the discussion of what a JS runtime should be

## Sources

- Dahl, R. «10 Things I Regret About Node.js», JSConf EU 2018
- deno.com/blog (official Deno blog)
- github.com/denoland/deno
