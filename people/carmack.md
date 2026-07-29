---
id: carmack
entity: person
title: John Carmack
capsule: The engine programmer who pushed real-time 3D rendering from academia into mass-market software — and who open-sourced his engines before it was industry practice.
domain: it
subdomain: systems
type: person
created: 1970
status: active
importance: high
---

## Known for

- Wolfenstein 3D (1992, id Software) — ray-casting engine on x86 DOS; first mass-market first-person shooter; popularised the shareware distribution model
- Doom (1993, id Software) — BSP tree rendering, sector-based geometry, networked deathmatch over serial/modem; shareware episode distributed freely, sequels sold; changed game distribution permanently
- Quake (1996, id Software) — fully polygonal 3D engine, software renderer with id-specific optimisations including the fast inverse-square-root approximation; first engine to support hardware OpenGL acceleration; introduced the BSP/PVS pipeline that influenced game engines for a decade
- Open-sourcing the Quake engine (1999) — GPL release of Quake source; unusual in a commercial-games context; directly enabled Valve's GoldSrc engine (Half-Life), the entire Quake modding ecosystem, and the open-source engine lineage
- Armadillo Aerospace (2000–2013) — personal rocketry venture; reached Lunar Lander Challenge finals; liquidated assets when focus shifted to VR
- Oculus CTO (2013–2019) — technical lead during the Rift development; left after acquisition by Facebook over creative-direction disagreements
- Keen Technologies (2023–) — founded to pursue AGI; Carmack's stated goal is to build general intelligence with a small, focused team

## Technologies shaped

- [C](../docs/nodes/c.md)
- [C++](../docs/nodes/c-plus-plus.md)
- [Windows](../docs/nodes/windows.md)

## Key decisions

**CARMACK-C001** 🟢 — the fast inverse-square-root in Quake III Arena (attributed to id Software, 1999; code shipped in the public source release) replaced a hardware divide with a Newton-Raphson approximation using a magic constant (0x5f3759df); it was 4x faster on contemporary hardware; this is the most-documented example of game-engine numerical trickery and has been analysed exhaustively in the literature

**CARMACK-C002** 🟢 — Carmack released Quake source under GPL in 1999 and subsequently released Doom, Quake II, and Quake III source; this was against prevailing commercial-games practice; the decision enabled Half-Life (GoldSrc), OpenArena, and a generation of open-source game engines; Carmack stated the rationale publicly: the code has more value to the world than as a competitive asset

**CARMACK-C003** 🟡 — across every major project — Wolfenstein's ray-caster, Doom's BSP renderer, Quake's OpenGL path, Armadillo's rocket avionics, Oculus's latency pipeline — Carmack works from first principles on the performance-critical path rather than adopting available libraries; the pattern is consistent enough to be a methodology, not a preference

**CARMACK-C004** 🟠 — Carmack's pivot to AGI (Keen Technologies, 2023) after a career in graphics and VR is publicly framed as following the same problem: intelligence is the hardest optimisation problem; this is a coherent narrative but it elides that game-engine optimisation is bounded (30 fps is enough) while AGI has no defined stopping criterion; the analogy may be motivating rather than technically precise

**CARMACK-C005** 🟠 — leaving Oculus/Meta in 2019 over creative disagreements illustrates a recurring tension: Carmack operates best in a small technical team with direct control over the critical path; large-organisation dynamics (Meta acquired Oculus in 2014 for $2B) systematically remove that control; the pattern at id, Armadillo, and Oculus is consistent

## Sources

- Abrash, M. «Graphics Programming Black Book», Coriolis (1997) — documents Carmack's BSP and PVS techniques
- Carmack, J. .plan files archive (1995–2000): https://github.com/ENOTTY/Carmack-Doom-Quake-plan-files
- Quake source release, id Software (1999): https://github.com/id-Software/Quake
- Lowood, H. «Game Engines and Game History», Kinephanos (2014)
- Carmack, J. Twitter/X thread on departure from Meta (2022): https://x.com/ID_AA_Carmack
- Keen Technologies announcement (2023): https://x.com/ID_AA_Carmack/status/1607426843603959810
