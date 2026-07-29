---
id: dxvk-vulkan-translation
entity: research
title: DXVK — Direct3D 9/10/11 to Vulkan translation
capsule: "DXVK evidences that a userspace Direct3D-to-Vulkan translation layer can reach native-parity performance for AAA games on Linux without kernel or Windows components."
domain: it
subdomain: systems
type: project
created: 2018
status: published
importance: medium
authors: [Philip Rebohle (doitsujin)]
year: 2018
venue: GitHub
url: https://github.com/doitsujin/dxvk
supports: [WINE-C002, WINE-C005]
challenges: []
confidence: strong
---

## What this is

DXVK translates Direct3D 9/10/11 to Vulkan as a shared library in userspace; in several scenarios performance on Linux exceeds native Windows because Mesa's Vulkan drivers carry less overhead than the D3D runtime on Windows.

## Why it matters here

WINE-C002 — the classic Wine problem with DirectX was not architectural API incompatibility but the threading model: OpenGL (Wine's historical Direct3D backend) has a single-threaded context, while D3D11 was designed for multi-threaded command lists. This forced serialisation of GPU commands and produced a hard CPU bottleneck in wine-wgl. Vulkan is ideologically close to D3D12/D3D11 — explicit memory management, command buffer recording, command queues — so translating D3D11 → Vulkan via DXVK preserves the multi-threaded model without serialisation, eliminating the CPU bottleneck.

WINE-C005 — the bottleneck was not a Wine translation problem per se but a mismatch between the threading models of OpenGL and D3D11; picking the right backend in a userspace translation layer fundamentally changed performance without any change to the kernel or ABI, which is why Proton on Linux sometimes matches or exceeds native Windows.
