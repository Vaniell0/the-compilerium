---
id: quic
entity: subject
title: QUIC
capsule: A user-space transport protocol that runs over UDP with built-in TLS, per-stream multiplexing, and connection migration — a deliberate escape from TCP ossification via network middleboxes.
domain: it
subdomain: networking
type: infrastructure
created: 2013
status: stub
importance: high
---

## Timeline

- 2013 — Jim Roskind at Google prototypes QUIC as a UDP-based transport for Chrome-to-Google servers
- 2016 — QUIC deployed on YouTube and Google Search; measurable latency wins over TCP+TLS
- 2018 — IETF QUIC Working Group standardises a rewritten version
- 2021 — RFC 9000 (QUIC), RFC 9001 (QUIC-TLS), RFC 9002 (QUIC loss recovery) published
- 2022 — RFC 9114 (HTTP/3) published — HTTP over QUIC
- 2023 — QUIC v2 (RFC 9369) for version-negotiation and greasing

## Ontology

- Runs over UDP: escapes middlebox interference that ossified TCP
- Built-in TLS 1.3: handshake and transport are entangled by design
- Per-stream multiplexing: no head-of-line blocking across independent streams (unlike TCP+HTTP/2)
- Connection ID: connections survive IP address changes (mobile handoff, NAT rebinding)
- Runs in userspace: lets endpoints evolve the transport without kernel updates

## Competence

```
can_explain:    understands why TCP ossified and why UDP was the escape hatch;
                explains the QUIC connection-ID and migration model

can_apply:      configures HTTP/3 endpoints;
                debugs QUIC with qlog / qvis

can_extend:     implements a QUIC stack (quiche, msquic, s2n-quic);
                participates in IETF QUIC WG

can_teach:      contrasts QUIC's userspace evolvability with TCP's middlebox constraints

reach:
  can_explain:    low
  can_apply:      low
  can_extend:     very low
  can_teach:      very low

key_gap: awareness → can_explain
         many know HTTP/3 uses QUIC; few know that QUIC's UDP substrate is a deliberate response
         to twenty years of TCP calcification at middleboxes
```

## Claims

**QUIC-C001** 🟢 — QUIC runs on UDP because middleboxes (firewalls, NATs, load balancers) accumulated assumptions about TCP that made new TCP options undeployable; UDP was chosen not for performance but for evolvability

**QUIC-C002** 🟢 — QUIC integrates TLS 1.3 into the transport handshake, collapsing the TCP+TLS two-round-trip setup into effectively one round trip (or zero, with 0-RTT resumption)

**QUIC-C003** 🟡 — moving the transport into userspace shifts CPU cost from kernel to application; whether this offsets the latency wins under sustained load is still contested in the literature

## Relations

_(none currently mapped — QUIC awaits relation files with TCP-IP, HTTP/3, TLS)_

## Sources

- RFC 9000, 9001, 9002, 9114
- Langley, A. et al. «The QUIC Transport Protocol: Design and Internet-Scale Deployment», SIGCOMM 2017
- Roskind, J. «QUIC design document» (Google, 2013)
