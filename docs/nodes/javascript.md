---
id: javascript
entity: subject
title: JavaScript
capsule: A 10-day language prototype frozen into a web standard — whose deployment at scale rests on V8's JIT engineering, not on any property of the language itself.
domain: it
subdomain: languages
type: language
created: 1995
status: active
importance: critical
---

## Timeline

- 1995 — Brendan [Eich](../../people/eich.md) creates the language in 10 days at Netscape; brief: "make it look like Java"; working name Mocha, then LiveScript
- 1996 — Microsoft releases JScript — an incompatible implementation for IE; the browser-war fork that forced standardisation
- 1997 — ECMAScript 1.0 via ECMA; "JavaScript" remains a trademark of Sun Microsystems (later Oracle)
- 1999 — ES3: regular expressions, try/catch, the version that ran the web for a decade
- 2008 — Google releases [V8](v8.md): first production JIT compiler for JS; forced SpiderMonkey and JavaScriptCore into a JIT arms race
- 2009 — Ryan [Dahl](../../people/dahl-ryan.md) takes V8 and releases Node.js; JS leaves the browser; npm registry created same year
- 2009 — ES5: `strict mode`, `JSON.parse`, `Object.create`; cleaning the worst ES3 edges
- 2012 — Microsoft releases TypeScript 0.8: structural types as an erasable superset of JS
- 2015 — ES6/ES2015: arrow functions, `let`/`const`, Promises, classes (sugar), template literals, modules; the largest cleanup of the language
- 2017 — [WebAssembly](webassembly.md) MVP ships in all major browsers simultaneously; JS gains a native-speed companion inside the same runtime
- 2017 — async/await: syntactic sugar over Promises; synchronous-looking code over the event loop
- 2019 — Ryan Dahl releases Deno: TypeScript out of the box, no npm, Web-compatible APIs
- 2020 — Oracle still owns the "JavaScript" trademark; ECMAScript continues under TC39

## Ontology

- Intellectual parents: Scheme (closures, first-class functions) + Self (prototype-based inheritance) + Java (syntax — a marketing decision, not an architectural one)
- Prototypal OOP: object inherits from object, not from class; ES6 `class` is syntactic sugar over prototypes, not a new object model
- Single-threaded event loop: a constraint of the browser's DOM threading model, not a property of the language; Web Workers exist precisely because JS is insufficient for CPU work
- "JavaScript" — a trademark of Oracle (acquired via Sun in 2010); the open standard is ECMAScript under TC39; conflating them hides corporate leverage over a name
- V8 (Google), SpiderMonkey (Mozilla), JavaScriptCore (Apple/WebKit) — three independent implementations of the same ECMAScript standard
- TypeScript — erasable structural types compiled away before execution; at runtime there is no TypeScript, only JavaScript

## Competence

```
can_explain:    knows the pedigree (Scheme + Self, not Java);
                understands that Oracle owns the trademark;
                explains event loop as a constraint of the DOM, not a language property;
                can state why "JS is a scripting language" is wrong at scale

can_apply:      writes idiomatic JS/TS; works with Workers, WASM bindings,
                WebSocket; knows when JS is the right tool and when it is not

can_extend:     writes V8 addons or Deno extensions; understands where the JS runtime
                interacts with native code; understands TC39 stage process

can_teach:      explains why "full-stack JS" is an architectural mistake
                and where the JS domain boundary is; shows WASM as the
                escape hatch, not the replacement

reach:
  can_explain:    very high
  can_apply:      very high
  can_extend:     low
  can_teach:      low

key_gap: can_explain — most JS practitioners know the syntax but not
         the pedigree, and treat "JS everywhere" as an architectural
         conclusion rather than an ecosystem accident
```

## Claims

**JS-C001** 🟢 — Brendan Eich created JavaScript in 10 days at Netscape in 1995 under a marketing brief to "make it look like Java"; the working name was Mocha, then LiveScript

**JS-C002** 🟢 — "JavaScript" is a trademark of Oracle (via Sun Microsystems); the open standard is called ECMAScript; Oracle has no meaningful governance role in TC39 but retains the name

**JS-C003** 🟢 — V8's JIT (2008) is what made JS fast enough for server-side use; Node.js (2009) moved V8 outside the browser; "full-stack JS" became possible because of [V8](v8.md), not because of any language property

**JS-C004** 🟡 — Safari/WebKit on iOS (App Store required WebKit for all third-party browsers until EU DMA 2024) created a browser monopoly on the most lucrative consumer platform; Apple's motive — a weak web protects the 30% App Store commission

**JS-C005** 🟠 — "JS is a scripting language" is wrong at production scale: large frontend codebases (React, Angular, Next.js) are JIT-compiled runtimes; the scripting label is accurate for a 50-line event handler, not for a 200k-line SPA

**JS-C006** 🟠 — TypeScript is not a different language: it compiles to JS and erases all type annotations before execution; at runtime there is no TypeScript, only JavaScript with better error messages during development

**JS-C007** 🟠 — the npm registry's flatness and permissiveness are structural, not accidental: any account can publish any name, transitive dependency trees of hundreds of packages are normal, and supply-chain attacks (leftpad 2016, event-stream 2018) are a direct consequence of those design choices, not exceptional failures

**JS-C008** 🟢 — JavaScript's intellectual parents are Scheme (closures, first-class functions) and Self (prototype-based inheritance); the Java-like syntax was a Netscape marketing decision

**JS-C009** 🟠 — the correct architectural position for JS is the integration boundary: a thin layer connecting browser UI to native systems via [WebAssembly](webassembly.md), WebSocket, or WebRTC; when business logic migrates into a native daemon, JS is reduced to transport plus DOM — removing the memory and correctness cost of running server-shaped code inside V8

**JS-C010** 🔴 — as [WebAssembly](webassembly.md) matures (WASI, component model, WasmGC): does JS remain necessary as the browser's integration layer, or does the ecosystem converge on WASM-first with JS only for progressive enhancement?

## Demonstrator

The demonstrator is the TC39 stage process itself: a 10-day prototype has been in continuous retcon for 25 years across seven major editions, each one patching assumptions that were never in the original design. The HOPL IV history (Wirfs-Brock & Eich, 2020) documents this explicitly — "JavaScript at 20" reads as a catalogue of decisions that were not made in 1995 but had to be invented backward.

## Relations

- [JavaScript → V8](../relations/javascript__v8.md)
- [JavaScript ↔ WebAssembly](../relations/javascript__webassembly.md)

## Sources

- Eich, B. «JavaScript at 20» (2015), blog.brendaneich.com
- Wirfs-Brock, A. & Eich, B. (2020). «JavaScript: The First 20 Years». HOPL IV, ACM. doi:10.1145/3386327
- ECMAScript specification: tc39.es/ecma262/
- Dahl, R. «10 Things I Regret About Node.js», JSConf EU 2018
- nolanlawson.com «Safari is the new IE» (2015, updated 2021)
- npmjs.com registry; left-pad incident post-mortem (azer's blog, March 2016)
