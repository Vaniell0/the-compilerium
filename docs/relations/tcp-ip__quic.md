---
id: tcp-ip__quic
entity: relation
title: TCP/IP ↔ QUIC
capsule: QUIC is TCP's replacement engineered around every 1981 assumption that broke — session identity over UDP, connection migration across addresses, encryption as a native layer rather than TLS bolted on top.
domain: it
subdomain: networking
type: relation
created: 2021
status: active
importance: high
from: tcp-ip
to: quic
direction: tcp-ip→quic
confidence: strong
axes:
  historical: true
  structural: true
  competence: true
---

## What this is

QUIC is the first transport protocol to reach IETF standardisation (RFC 9000, 2021) that treats TCP's address-as-identity assumption as a bug to fix, not a constraint to work around; every architectural difference from TCP compensates for a specific bolt-on that accumulated between 1981 and 2020.

## Claims

**TCP-IP-QUIC-C001** 🟢 — QUIC runs over UDP by deployment necessity, not architectural preference: middlebox ossification (NAT, firewalls, load balancers) makes shipping a new IP-layer protocol impossible, so QUIC was designed to look like UDP on the wire while implementing transport-layer semantics above.

**TCP-IP-QUIC-C002** 🟢 — QUIC bundles TLS 1.3 into the connection handshake: a 1-RTT connection establishment for new connections and 0-RTT for resumed ones — no separate TCP handshake plus TLS handshake round-trips, which was the accumulated cost of layering TLS on top of TCP since 1999.

**TCP-IP-QUIC-C003** 🟢 — QUIC connections are identified by a connection ID chosen by the endpoint, not by the (source-IP, source-port, dest-IP, dest-port) 4-tuple TCP uses; this is what enables connection migration — a mobile client switching from Wi-Fi to cellular keeps the same connection, whereas TCP resets it.

**TCP-IP-QUIC-C004** 🟠 — QUIC and ICE (RFC 8445) both claim session continuity on path change with incompatible assumptions about who controls the UDP source address: ICE nominates a new path while QUIC starts its own migration procedure, producing two correct state machines that collide — see TCP-IP-C007.

**TCP-IP-QUIC-C005** 🟡 — QUIC displaces TCP for HTTP traffic first (HTTP/3 is QUIC's flagship use case, standardised as RFC 9114 in 2022); non-HTTP QUIC use is still emerging and depends on library maturity outside of Google's and Cloudflare's stacks.

**TCP-IP-QUIC-C006** 🔴 — does QUIC replace TCP in the long run, or does it stay confined to the web tier while TCP remains the transport for everything else (SSH, SMTP, database wire protocols, custom binary services)? The middleware and library ecosystem lag is the load-bearing question.

## Competence signal

Knowing this connection means the practitioner can name at least one specific TCP assumption (address=identity, TLS-as-layered, 4-tuple connection identity) that QUIC deliberately inverts, rather than describing QUIC as "TCP but faster" or "HTTP/3's transport." Reveals whether the practitioner sees transport protocols as a stack of accumulated bolt-ons vs. as timeless engineering.

## Sources

- Iyengar, J., Thomson, M. «QUIC: A UDP-Based Multiplexed and Secure Transport», RFC 9000 (2021)
- Bishop, M. «HTTP/3», RFC 9114 (2022)
- Langley, A. et al. «The QUIC Transport Protocol: Design and Internet-Scale Deployment», SIGCOMM 2017 — Google's operational experience deploying QUIC pre-standardisation.
