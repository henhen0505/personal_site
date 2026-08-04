---
title: "This Site"
summary: "Static Astro site with no framework JavaScript. The command palette, project filtering and theme handling are hand-written vanilla JS."
tags: ["Astro", "TypeScript", "Vanilla JS", "SVG", "CSS"]
github: "https://github.com/henhen0505/personal_site"
status: "Live"
period: "July 2026 – present"
domains: ["Web"]
order: 6
---

## Constraint

No React, no Tailwind, no component library, no CSS framework. Astro ships zero JavaScript by
default and everything interactive here is written by hand against the DOM. The whole page
weighs less than a single framework runtime would before any of my own code loaded.

That constraint is the point. It's easy to look capable by importing a component library. It's
more informative to build the interactive parts and let someone read them.

The interactive parts are the command palette, the project filter and the theme handling. Each
is described below, and each is a few dozen lines you can read end to end.

## Command palette

⌘K, or Ctrl+K on Windows. Substring matching over sections, projects and external links, full
arrow-key navigation, Enter to go, Escape to close. It moves focus into the dialog on open and
returns it to the trigger element on close, and the list is an `aria-activedescendant`
listbox so a screen reader tracks the highlighted row.

## Tag filtering

The projects grid filters client-side by tag and writes the active filter into the URL query
string with `history.replaceState`, so a filtered view is a link you can send. The result count
goes through an `aria-live` region.

The filter bar ships with the `hidden` attribute set and JavaScript removes it on init. With
JavaScript off you get every project rather than a row of dead buttons.

## Theme

Light and dark, following `prefers-color-scheme` by default and remembering an explicit choice
in `localStorage`. The read happens in a blocking inline script in `<head>`, before first
paint, which is what stops the flash of the wrong theme that most hand-rolled dark modes have.

## Content

Project pages are Markdown in an Astro content collection with a Zod-typed frontmatter schema.
A missing field or a malformed URL fails the build instead of rendering a broken card. The
`github` field is optional on purpose, so a project with no public repository renders without
a link rather than pointing at a 404.

## Stack

Astro 7, static output, vanilla CSS with custom properties, no runtime dependencies. Deployed
on Vercel from `main`.
