---
title: "The Drop"
summary: "Full-stack event discovery platform for EDM/rave events with a weighted deduplication pipeline, JWT auth, and 986 tests -- shipped in REVIEW_ONLY mode until false-merge rates are validated."
tags: ["TypeScript", "React", "Node.js", "Express", "PostgreSQL", "Drizzle ORM", "Vitest", "AWS CDK"]
github: "https://github.com/henhen0505/the-drop"
status: "In progress"
period: "September 2026 – Present"
domains: ["Web", "Backend"]
order: 0.8
---

## What it does

Aggregates EDM and rave events from Ticketmaster and community submissions, deduplicates them
into one canonical listing per real-world event, and serves a discovery interface. The core
technical problem is deduplication: different sources spell the same venue, artist and title
differently, and a naive match either misses duplicates or merges distinct events.

## Deduplication pipeline

Events pass through four stages:

1. **Text normalization** -- strips filler phrases, normalizes casing.
2. **Candidate finding** -- narrows to events within +/-1 day, same city, before any scoring.
3. **Weighted composite scoring** -- venue match (0.30), date match (0.25), artist overlap via
   Jaccard similarity (0.25), title similarity via trigram matching (0.20).
4. **Three-band decision routing** -- AUTO_MERGE (>=0.85), REVIEW (0.55--0.84), NO_MATCH
   (<0.55).

An **external-ID fast path** skips scoring entirely for known-event re-syncs (O(1) lookup).

A **same-venue-adjacent-date guard** forces events at the same venue on consecutive nights
(e.g. a Friday/Saturday residency) to REVIEW regardless of score, to prevent merging two
distinct nights.

## REVIEW_ONLY mode

Auto-merge is implemented but **disabled** (`DEDUP_AUTO_MERGE_ENABLED=false`). Everything
scoring >=0.55 goes to an admin review queue instead. The pipeline ships in this mode until
false-merge rates are validated against real event data.

Field-level merge rules use source priority (Admin > Ticketmaster > Community) with per-field
provenance tracking in JSONB columns.

## Auth

Custom JWT authentication: httpOnly/Secure/SameSite=Strict refresh cookies, in-memory access
tokens (never localStorage), CSRF tokens, bcrypt-12, token rotation with reuse detection.

## Stack

Turborepo + npm workspaces monorepo. Backend: Node.js/Express/TypeScript, Drizzle ORM,
PostgreSQL 16 (tsvector/ts_rank full-text search, pg_trgm trigram similarity, advisory locks
for concurrent dedup). Frontend: React/Vite/TypeScript, react-router-dom v6,
@tanstack/react-query v5. Infra: AWS CDK (VPC, RDS, Elastic Beanstalk, S3+CloudFront,
EventBridge+SQS).

## Tests

**986** total (**919** backend, **67** frontend), both suites Vitest.

Nearly all tests run against mocked dependencies (fake Drizzle transaction object,
axios-mock-adapter). This does not prove the system works end-to-end against real
infrastructure. The dedup pipeline, schema migrations, auth flow, full-text search,
autocomplete, admin merge and audit logging were separately verified against a running
PostgreSQL instance. Two real bugs -- a port collision and a JWT_SECRET config validation
failure -- were found only through that live verification, not the mocked suite.
