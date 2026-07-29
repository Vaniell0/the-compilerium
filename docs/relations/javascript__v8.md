---
id: javascript__v8
entity: relation
title: JavaScript → V8
capsule: V8 is one implementation of the ECMAScript standard, and its JIT compiler (2008) is what made JavaScript viable for server-side use — the language design did not change, the runtime did.
domain: it
subdomain: runtimes
type: relation
created: 2008
status: active
importance: critical
from: javascript
to: v8
direction: a→b
confidence: strong
axes:
  historical: true
  structural: true
  competence: false
---

## What this is

V8 is Google's implementation of the ECMAScript standard. JavaScript as a language and V8 as its dominant runtime are often conflated — but they are separable: SpiderMonkey (Firefox) and JavaScriptCore (Safari/WebKit) implement the same standard differently.

## Claims

**JAVASCRIPT-V8-C001** 🟢 — V8 is not JavaScript; it is one implementation of ECMAScript; SpiderMonkey (Mozilla) and JavaScriptCore (Apple) are competing implementations of the same standard

**JAVASCRIPT-V8-C002** 🟢 — V8's JIT (2008) is why JavaScript became viable for server-side use; the language design did not change — the runtime did

**JAVASCRIPT-V8-C003** 🟡 — V8 and LLVM are structurally analogous: both are shared optimizing backends that multiple languages target; the difference is V8 compiles at runtime (JIT) while LLVM compiles ahead of time (AOT)

## Sources

- ECMAScript specification: tc39.es/ecma262/
- SpiderMonkey: spidermonkey.dev
- JavaScriptCore: webkit.org/blog (JSC category)
