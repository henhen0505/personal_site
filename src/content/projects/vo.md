---
title: "VO — Vol Surface Mispricing Detector"
summary: "Research pipeline that fits an SSVI implied-volatility surface and flags deviations at low-OI strikes. It has produced zero candidates so far, and the write-up says so."
tags: ["Python", "SciPy", "NumPy", "SSVI", "Options"]
status: "Phase 1 complete"
period: "May 2026"
domains: ["Quant", "Data"]
order: 4
---

## What it does

Pulls the current option chain for a single name, fits a Gatheral-Jacquier (2014) SSVI
implied-volatility surface to the liquid strikes, then flags ask-IV deviations at
low-open-interest strikes that exceed a bootstrap-derived, per-slice detection threshold.
Runs three falsification tests (adjacent-strike placebo, quote-quality stratification,
bootstrap survival rate) on every run.

This is a detection and falsification pipeline, not a trading engine. It places no orders.

## Architecture

- `data/` — Data adapters (yfinance for Phase 1, Polygon.io stub for Phase 2), forward-price
  calculation, liquidity filters. All market-data access isolated behind a DataAdapter ABC.
- `surface/` — SSVI calibration (SLSQP), bootstrap standard-error bands, no-arbitrage checks.
- `detection/` — New/low-OI strike classification and deviation signal computation.
- `falsification/` — Placebo, quote-quality split, and bootstrap survival tests.
- `config.py` — All tunable parameters in one place.

## Results

Single live run on INTC (2026-05-23):

| Metric | Value |
|---|---|
| Liquid strikes calibrated | 175 |
| Maturity slices | 6 |
| SSVI RMSE (total-variance space) | 0.004230 |
| Candidates detected | 0 |

Zero candidates because all 411 INTC options carried OI >= 10. The pipeline uses OI < 10 as
its proxy for "newly listed," and INTC had no qualifying strikes. This is a data limitation
(yfinance provides only current OI snapshots, not historical chain data), not a code failure.

The RMSE is from a single yfinance snapshot. It is not reproducible from this repo alone.

## Honest limitations

1. The hypothesis this project was built to test has never been tested. The pipeline has
   produced zero candidates, so the detection path has never run against a real positive.
2. The placebo control is quasi-in-sample for well-populated slices (removing 1 of ~30 points
   barely moves a 3-parameter fit). The 0.6% FPR means "the detector does not false-positive
   on strikes already consistent with the surface," not that it has a calibrated type-I rate.
3. All results come from one snapshot of one ticker. No claim of generality.
4. Testing the actual thesis (newly listed strikes, not just low-OI) requires historical chain
   data from Polygon.io, which is Phase 2 scope.

## Tests

163 passing (`python -m pytest tests/ -q`). The math layer (BSM inversion, SSVI calibration,
bootstrap) was always covered; the 2026-07-13 remediation added 20 tests to detection and
falsification.

## Status

Phase 1 complete (single-name PoC). Phase 2 scoped: Polygon.io historical adapter, expansion
to 50-100 names, American-option IV correction, and simulation-based placebo calibration.
