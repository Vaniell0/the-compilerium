---
id: jacobson-congestion-1988
entity: research
title: "Congestion Avoidance and Control"
capsule: The 1988 SIGCOMM paper that retrofitted rate control onto TCP after the internet collapsed, introducing slow start and AIMD as the first principled congestion-control algorithm.
domain: it
subdomain: networking
type: paper
created: 1988
status: published
importance: critical
authors: [Jacobson V.]
year: 1988
venue: SIGCOMM 1988
url: https://ee.lbl.gov/papers/congavoid.pdf
supports: [TCP-IP-C002, TCP-IP-C004, TCP-IP-C008]
challenges: []
confidence: strong
---

## What it says

Jacobson observed that in October 1986 the throughput of a 32 kbps ARPANET path fell from 32 kbps to 40 bps — a factor of roughly 1000 — because TCP senders had no mechanism to reduce their send rate under congestion. The paper introduces two algorithms: slow start (exponential window growth from one segment on connection open, to probe available capacity without flooding the network) and congestion avoidance (additive increase / multiplicative decrease, AIMD, after detecting loss). Together these became TCP Tahoe and stabilised the ARPANET. The paper is explicit that these algorithms were not part of the original TCP specification — they were retrofitted after collapse.

## Why it matters here

TCP-IP-C002 is grounded directly in this paper: the 1986 collapse event and the retrofitted Tahoe algorithms are described here, not inferred. TCP-IP-C004 (the myth that «TCP just works») is dismantled by the paper's own framing — the network was unusable without these additions, and the additions are outside RFC 793. TCP-IP-C008 (open question about whether any algorithm can simultaneously satisfy efficiency, fairness, and low latency) is set up by the AIMD design: CUBIC and BBR are later refinements of the same problem Jacobson left open.

## Sources

- Jacobson, V. (1988). *Congestion Avoidance and Control*. SIGCOMM 1988. ee.lbl.gov/papers/congavoid.pdf
