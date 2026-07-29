---
id: tcp-ip
entity: subject
title: TCP/IP
capsule: A pair of 1981 RFCs that became planetary infrastructure by encoding one wrong assumption — address = identity — and whose entire subsequent history is a 40-year sequence of bolt-ons to compensate for it.
domain: it
subdomain: networking
type: infrastructure
created: 1983
status: active
importance: critical
---

## Timeline

- 1969 — ARPANET: the first packet-switched network; NCP (Network Control Protocol) — the predecessor
- 1974 — Cerf & Kahn «A Protocol for Packet Network Intercommunication»: RFC 675; first description of TCP
- 1981 — IPv4 (RFC 791), TCP (RFC 793): final specification; address = 32-bit identifier of a machine's network interface
- 1983 — «Flag Day»: ARPANET switches over to TCP/IP; the assumption «address = machine» becomes infrastructure
- 1984 — DNS (RFC 882/883): names on top of addresses; first bolt-on for the missing identity layer
- 1986 — internet congestion collapse: throughput of ARPANET falls by a factor of ~1000 during peak load; TCP's ack-clocking mechanism had no rate control
- 1988 — Van Jacobson publishes «Congestion Avoidance and Control» (SIGCOMM 1988): slow start + AIMD (additive increase / multiplicative decrease) becomes TCP Tahoe; the internet recovers
- 1990 — TCP Reno: fast retransmit + fast recovery; the baseline most implementations shipped for a decade
- 1995 — NAT (RFC 1631): a surrogate for the shortage of IPv4 addresses; the address ceases to be globally unique
- 1999 — TLS 1.0 (RFC 2246): identity bolt-on over addresses via certificate authorities
- 2003 — ICE (RFC 8445 finalised 2018): NAT traversal; yet another compensation layer
- 2006 — CUBIC (Linux default from 2.6.19): cubic growth function in congestion window; optimised for high-bandwidth-delay-product networks; the dominant algorithm in servers for 15+ years
- 2021 — QUIC (RFC 9000): connection migration; session continuity over changing addresses; see [QUIC](quic.md)
- 2026 — IPv6 >50% of Google traffic for the first time; migration took 25 years

## Ontology

- **Address = location, not identity**: a 32-bit IPv4 address identifies a machine's interface in a specific network; location and identity coincided in 1981 because all computers were fixed and institutionally owned; everything that follows breaks this coincidence
- **Best-effort delivery**: IP does not guarantee delivery, ordering, or deduplication; TCP adds reliability via sequence numbers, ACK, and retransmit; UDP leaves best-effort as-is
- **Stateless routing**: each packet is routed independently; intermediate nodes hold no connection state; this lets the network scale but makes session identity a problem for endpoints
- **Congestion control is tuned, not solved**: TCP's AIMD loop controls throughput but is not derived from first principles for modern heterogeneous paths; every decade brings a new algorithm (Tahoe → Reno → CUBIC → BBR) because the previous one underperformed on new network topologies
- **Port as multiplexer**: a 16-bit port number distinguishes services on one address; (IP, port) is a conditional endpoint, not an identity, not a cryptographic proof
- **Bolt-on pattern**: every broken assumption spawns a new layer — DNS (names ≠ addresses), NAT (addresses ran out), TLS (address ≠ identity), VPN (private addresses unreachable), QUIC migration (address changes mid-session), service mesh (pods don't know who's who)

## Competence

```
can_explain:    what a 3-way handshake is; why UDP ≠ unreliable;
                why NAT exists; what BGP is at the idea level;
                why TCP needed congestion control added in 1988

can_apply:      raw socket programming; TCP server/client;
                UDP with a manual reliability layer;
                reading tcpdump/Wireshark output

can_extend:     write a transport plugin on top of UDP (like ICE, like QUIC);
                implement custom congestion control;
                participate in IETF transport working groups

can_teach:      explain why QUIC over ICE deterministically breaks;
                why DNS is a bolt-on, not a foundation;
                what would have changed if the address had been a crypto key since 1983

reach:
  can_explain:    very high
  can_apply:      high
  can_extend:     very low
  can_teach:      very low

key_gap: can_explain — most understand the mechanics of the three-way handshake
         but do not know that TCP's congestion control was added post-hoc in 1988
         after the internet collapsed, or that the algorithm has been replaced
         multiple times since; "TCP just works" is not a description of the protocol
         but of decades of tuning
```

## Claims

**TCP-IP-C001** 🟢 — RFC 791 (IPv4) and RFC 793 (TCP) were finalised in September 1981; the «Flag Day» transition of ARPANET to TCP/IP on 1 January 1983 fixed the address-as-machine-identifier model into infrastructure before scale or mobility were properties of the network

**TCP-IP-C002** 🟢 — in 1986 ARPANET experienced throughput collapse by a factor of ~1000 under load; TCP had no rate control; Van Jacobson's 1988 paper introduced slow start and AIMD, which became TCP Tahoe and stabilised the network — congestion control is not inherent to TCP, it was retrofitted after observed collapse

**TCP-IP-C003** 🟢 — CUBIC (Linux 2.6.19, 2006) uses a cubic growth function for the congestion window rather than linear additive increase, optimised for high-bandwidth high-delay paths; it became the Linux default and dominated server-side deployments for over a decade without changing the AIMD structure Jacobson defined

**TCP-IP-C004** 🟠 — «TCP just works» is false: every decade of the internet's history has produced a new congestion-control algorithm (Tahoe, Reno, CUBIC, BBR) because the previous one misbehaved on the topology at hand; the stability of TCP is the stability of the tuning process, not the stability of the protocol

**TCP-IP-C005** 🟠 — «The internet is decentralised» is a myth: the routing substrate is ~75,000 autonomous systems (ASes), but the majority of global traffic transits a handful of Tier-1 providers (AT&T, Lumen, NTT, Telia…) and three hyperscalers (Google, Meta, Amazon) whose private backbone networks are separate from and larger than the public internet

**TCP-IP-C006** 🟡 — accumulated infrastructural cost of one 1981 assumption: DNS registrars between you and a name, certificate authorities between you and identity, VPN vendors between you and a private network, service mesh vendors between your services, cloud egress pricing between you and users; every toll booth is rent on a missing foundation

**TCP-IP-C007** 🟠 — QUIC and ICE deterministically conflict when composed: both claim session-continuity on path change with incompatible assumptions about who controls the UDP source address; ICE changes the nominated path, QUIC starts its migration procedure, ICE has already finished — two correct state machines, one collision; see [QUIC](quic.md)

**TCP-IP-C008** 🔴 — whether BBR (Google, 2016) or a successor will become the universal congestion-control algorithm is open; BBR is throughput-optimal on Google's private network but causes documented unfairness against CUBIC flows in shared internet paths; no algorithm simultaneously satisfies efficiency, fairness, and low latency at internet scale

## Relations

- [TCP/IP ↔ QUIC](../relations/tcp-ip__quic.md)

## Sources

- Cerf, V., Kahn, R. «A Protocol for Packet Network Intercommunication», IEEE (1974)
- Postel, J. «Internet Protocol», RFC 791 (1981)
- Postel, J. «Transmission Control Protocol», RFC 793 (1981)
- Jacobson, V. «Congestion Avoidance and Control», SIGCOMM 1988
- Ha, S., Rhee, I., Xu, L. «CUBIC: A New TCP-Friendly High-Speed TCP Variant», ACM SIGOPS Operating Systems Review (2008)
- Iyengar, J., Thomson, M. «QUIC: A UDP-Based Multiplexed and Secure Transport», RFC 9000 (2021)
- Gill, P. et al. «Dumb-Bell vs. AS-Level Internet Topology», IMC 2008 (internet topology and AS concentration)
