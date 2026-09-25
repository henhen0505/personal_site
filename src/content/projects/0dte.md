---
title: "0DTE Options Research Engine"
summary: "Paper-trading engine for same-day-expiry SPY options: Heston stochastic-volatility pricing, FDR-corrected signal generation, and Monte Carlo variance reduction."
tags: ["Python", "Heston", "Monte Carlo", "Options Pricing", "pytest"]
github: "https://github.com/henhen0505/0dte"
status: "Paper-trading, no live capital deployed"
period: "2026 – Present"
domains: ["Quant", "Backend", "Data"]
order: 3.5
---

## What it does

Research and paper-trading engine for same-day-expiry (0DTE) SPY options. Prices options
under a calibrated Heston stochastic-volatility model, compares model prices against live
market quotes to flag mispricing, and logs -- optionally executes -- paper trades against
live or historical market data. This variant runs pure Heston stochastic volatility with
jump-diffusion explicitly disabled (`ENABLE_JUMPS_0DTE = False`); the jump-diffusion model
exists in the codebase but isn't part of the current pricing path.

## Architecture

- `core/` -- clock/session-time utilities, RNG, time-grid helpers
- `models/` -- Heston, jump-diffusion, mean-reversion stochastic models
- `pricing/` -- Black-Scholes closed-form pricing, Greeks, portfolio Greeks, transaction costs
- `calibration/` -- Heston/jump calibrators, regime detection, vol seasonality, IV provenance
- `signals/` -- signal generation, backtesting, FDR/Bonferroni multiple-comparison correction
- `trading/` -- orchestration, paper trader, risk manager, EOD reporting
- `ito_pnl/` -- Ito P&L decomposition and attribution
- `vrp/` -- realized-vol estimation and an OU-calibrated variance risk premium signal
- `variance_reduction/` -- antithetic variates, control variates, moment matching for Monte Carlo
- `diagnostics/` -- data quality and staleness analysis
- `benchmarks/` -- American vs. European pricing comparisons
- `data/` -- market data adapters (IBKR, tastytrade, yfinance)

## Statistical rigor

Signal generation runs FDR/Bonferroni correction across candidate signals rather than reading
raw p-values off each one in isolation -- a multiple-comparisons check most backtests skip.
Monte Carlo pricing uses antithetic variates, control variates and moment matching for
variance reduction rather than raw path simulation.

## Configuration

Current Heston parameters (`config.py`): `kappa=3.0` (fixed), `theta_v=0.04`, `sigma_v=0.3`,
`rho=-0.7`, `v0=0.04`. Risk-free rate 5%, SPY dividend yield 1.3%. Jump-diffusion disabled in
this variant.

## Tests

**36** test files under `pytest`, covering the Heston characteristic function and path
simulation, Black-Scholes and portfolio Greeks, jump models, FDR correction, regime
detection, IV provenance, staleness instrumentation, and paper-trade execution.

## Limitations

This is a research and paper-trading engine -- no live capital has been deployed. Pricing
accuracy and signal win rate are open questions this project is built to answer, not settled
results, and none are claimed here.
