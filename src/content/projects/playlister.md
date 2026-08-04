---
title: "Playlister — Full-Stack Web App"
summary: "MERN playlist app with JWT sessions, ownership-based authorization and a database layer that swaps MongoDB for PostgreSQL behind one interface."
tags: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL", "JWT"]
status: "Complete"
period: "October 2025"
domains: ["Web", "Backend"]
order: 3
---

## What it does

A playlist manager: create playlists, search a song catalog, reorder and edit tracks, undo any
of it. React front end, Express API, JWT-authenticated sessions.

## Authorization

Every auth, playlist and song REST endpoint checks ownership before it acts. A logged-in user
can read and mutate their own playlists and nothing else. The check is on the server, not
hidden behind a disabled button in the UI.

## Swappable persistence

The interesting part. The server talks to a database abstraction layer with two
implementations behind one interface, MongoDB through Mongoose and PostgreSQL through
Sequelize. Switching between them is a single environment flag and requires no controller
changes.

Writing it twice against one interface forced the query surface to stay narrow. Anything a
controller wanted that only one database could do cheaply was a design smell worth fixing at
the interface instead.

## Undo and redo

Edits go through a `jsTPS` transaction stack, so every reversible action is a transaction
object with `doTransaction` and `undoTransaction`. Reordering, renaming and deleting are all
undoable through the same path rather than through per-action special cases.

## Search

Multi-field AND-filtered search across the catalog, with song metadata pulled from the YouTube
Data API.

## Tests

Unit tested with `Vitest`.

## Why there's no repository link

This started as a course project. The repository stays private for academic-integrity reasons.
I'm happy to walk through the code directly.
