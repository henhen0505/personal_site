---
title: "Market Data Engine"
summary: "C++ parser for the NASDAQ ITCH 5.0 binary protocol with order-book reconstruction across 5 symbols at ~550 MB/sec, backed by 61 GoogleTest cases."
tags: ["C++", "MySQL", "GoogleTest", "NASDAQ ITCH 5.0", "CMake", "vcpkg"]
github: "https://github.com/henhen0505/nasdaq-itch-orderbook"
status: "Complete"
period: "May – August 2026"
domains: ["Backend", "Data"]
order: 2.5
---

## What it does

Parses the NASDAQ ITCH 5.0 binary protocol feed, reconstructs live order books and persists
the results into MySQL for analytics queries. Built with C++17, CMake and vcpkg;
mysql-connector-cpp for the persistence layer.

## Parser

A C++ parser reads raw ITCH 5.0 messages and reconstructs order books across **5** symbols
from **55,748** messages at approximately **550 MB/sec** throughput.

## Persistence and analytics

A MySQL persistence layer handles batch ingestion and order-book snapshot capture, with a
measured **~36x** throughput improvement from batched vs. unbatched inserts.

Six analytics queries run over real NASDAQ tick data: VWAP, rolling volatility, bid-ask
spread and depth, order-to-trade ratio, and volume profile.

| Metric | Value |
|---|---|
| Symbols tracked | 5 |
| Raw messages parsed | 55,748 |
| Parser throughput | ~550 MB/sec |
| Batch vs. unbatched insert speedup | ~36x |
| GoogleTest cases | 61 (45 offline + 16 live-MySQL) |

## Tests

**61** GoogleTest cases: **45** offline (parser, order-book reconstruction, message handling)
and **16** requiring a live MySQL instance (persistence layer, analytics queries).
