---
title: "PathPulse"
summary: "eBPF TCP observability agent that hooks into kernel connect, state-transition and retransmit paths to classify connection outcomes without application instrumentation."
tags: ["C", "Go", "eBPF (CO-RE)", "Linux"]
status: "In progress"
period: "August 2026 – Present"
domains: ["Systems", "Backend"]
order: 0.5
---

## What it does

A Linux TCP flight recorder. Kernel-side eBPF probes observe outbound TCP connection
lifecycle and retransmission signals, attribute them to the process that opened the socket,
and surface a workload-to-destination health view -- without touching application code.

The north-star question: when a service starts timing out, can an operator identify within
one minute which workload is affected, which destination degraded, and whether the evidence
is failed establishment, slow establishment, or retransmission activity?

## Kernel hooks

**4** eBPF kernel hooks (`fentry`, `fexit`, `tp_btf`) attached to TCP connect,
state-transition and retransmit paths. Written in C against CO-RE (Compile Once, Run
Everywhere) so the probes load on any kernel with BTF support, without per-kernel header
rebuilds.

## State machine

A lock-free atomic state machine classifies exactly one outcome per tracked connection.
Validated by exhaustive permutation testing over every reachable hook-firing ordering --
the guarantee is that no interleaving of the four hooks can produce a double-classification
or a lost connection.

## Bugs found

A null-address bug where `fentry` on `tcp_connect` fires before the kernel assigns a local
address to the socket. Fixed by splitting address capture: `fentry` reads the remote address
(available at call time) and `fexit` reads the local address (assigned by the time the
function returns).

## Limitations

This project is in its initial phase. The resume claims above describe what is built and
tested; the broader goal (cgroup attribution, destination health aggregation, operator-facing
dashboard) is scoped but not yet implemented.
