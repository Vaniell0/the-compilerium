---
id: javascript__webassembly
entity: relation
title: JavaScript ↔ WebAssembly
capsule: WebAssembly was designed to run alongside JavaScript in the browser, not replace it — JS handles DOM and Web API integration while WASM handles performance-critical computation.
domain: it
subdomain: web
type: relation
created: 2017
status: active
importance: high
from: javascript
to: webassembly
direction: symmetric
confidence: strong
axes:
  historical: false
  structural: true
  competence: false
---

## What this is

WebAssembly was designed to run alongside JavaScript in the browser, not replace it. JS calls into WASM for performance-critical code; WASM calls back into JS for DOM access and Web APIs. The boundary between them is the integration point.

## Claims

**JAVASCRIPT-WEBASSEMBLY-C001** 🟢 — WebAssembly cannot access the DOM directly; it calls JavaScript functions to interact with the browser; JS remains the mandatory integration layer between WASM and the browser environment

**JAVASCRIPT-WEBASSEMBLY-C002** 🟡 — the JS↔WASM boundary has a cost: crossing it requires marshalling values (numbers cross cheaply, strings and objects require serialisation); architectures that minimise boundary crossings perform better

**JAVASCRIPT-WEBASSEMBLY-C003** 🟠 — WASM confirms the correct architectural position for JS: as the integration layer connecting native-speed computation (WASM) to browser APIs (DOM, Web APIs); not as the computation layer itself

## Sources

- webassembly.org/docs/js/
- Lin Clark, «Making WebAssembly even faster: Firefox's new streaming and tiering compiler» (Mozilla Hacks, 2018)
