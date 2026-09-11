---
title: "Market Data Engine"
summary: "C++ parser for the NASDAQ ITCH 5.0 binary protocol with order-book reconstruction across 5 symbols at ~550 MB/sec, backed by 61 GoogleTest cases."
tags: ["C++", "MySQL", "GoogleTest", "NASDAQ ITCH 5.0"]
status: "Complete"
period: "July – August 2026"
domains: ["Backend", "Data"]
order: 2.5
---

## What it does

Parses the NASDAQ ITCH 5.0 binary protocol feed, reconstructs live order books and persists
the results into MySQL for analytics queries.

## Parser

A C++ parser reads raw ITCH 5.0 messages and reconstructs order books across **5** symbols
from **55,748** messages at approximately **550 MB/sec** throughput.

## Persistence and analytics

A MySQL persistence layer handles batch ingestion and order-book snapshot capture. Analytics
queries compute VWAP, rolling volatility, bid-ask spread and depth, and order-to-trade ratio
over real NASDAQ tick data.

| Metric | Value |
|---|---|
| Symbols tracked | 5 |
| Raw messages parsed | 55,748 |
| Parser throughput | ~550 MB/sec |
| GoogleTest cases | 61 |

## Tests

**61** GoogleTest cases covering the parser and order-book reconstruction.
