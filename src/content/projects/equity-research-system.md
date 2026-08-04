---
title: "Event-Driven Equity Research System"
summary: "Backend that routes typed corporate events to independent signal handlers, with a cumulative-abnormal-return backtester and 369 tests."
tags: ["Python", "Pydantic", "FMP API", "REST APIs", "pytest"]
github: "https://github.com/henhen0505/failure-first"
status: "369 tests passing"
period: "September 2025 – present"
domains: ["Backend", "Quant", "AI/LLM"]
order: 2
---

## What it does

Ingests corporate events (earnings, analyst ratings, FDA decisions), converts them into typed
records and routes each one to independent signal handlers over a publish/consume message bus.
Handlers don't know about each other, so a new signal is a new subscriber rather than an edit
to a dispatch block.

## Architecture

- **Ingestion** — pulls from the FMP API with retry logic and schema validation at the
  boundary, so malformed upstream data fails at the edge instead of halfway through a
  computation.
- **Event bus** — publish/consume routing with dead-letter handling for events no handler
  accepts, plus scheduled orchestration.
- **Signal handlers** — independent consumers, each producing one component of a weighted
  conviction score.
- **Backtester** — computes cumulative abnormal returns across 1, 5, 10 and 20-day horizons
  over 62 event windows.
- **LLM layer** — agents that turn source material into structured research output. Every
  model response is validated against a typed Pydantic schema and rejected on failure before
  anything downstream consumes it.

## Tests

**369** passing, covering schema enforcement and failure paths rather than happy paths alone.

## What went wrong, and what I did about it

Two findings from reviewing my own work are worth more than the feature list.

**The backtest was entering trades before the signal existed.** Entry was set at day 0 minus 1
relative to the event. That is not observable at decision time, and it quietly inflates every
return in the study. Entry moved to day 0 plus 2 and the numbers got worse and became real.

**One signal component doesn't work.** The contagion component tested null and wrong-signed
against tradeable entry (t = -2.42 at the 5-day horizon). Rather than leave it in at a reduced
weight, it's shelved at weight zero and the remaining components were redistributed. A signal
that points the wrong way is not a weak signal.

## Limitations

Of the 62 event windows, only 27 carry response data and fewer still have non-null CAR. The
backtest is a methodology under test and not a validated edge. Coverage is three names.
