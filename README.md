# personal site

Personal portfolio site. Built with [Astro](https://astro.build), no client-side framework.

Live at https://personal-site-xi-kohl.vercel.app

## Stack

- Astro 7 (static output), deployed on Vercel from `main`
- Vanilla CSS with custom properties, no UI framework
- Content collections for project write-ups (`src/content/projects/`), Zod-typed frontmatter
- No runtime dependencies, no backend, no database, no CMS, no analytics

## Interactive parts

Everything interactive is hand-written vanilla JS in an inline `<script>`. There is no
framework runtime on the page.

- **Theme toggle** — reads `localStorage` then `prefers-color-scheme` in a blocking head
  script, so there is no flash of the wrong theme.
- **Command palette** — Ctrl/Cmd+K. Substring match over sections, projects and links, with
  arrow-key navigation and focus restore on close (`src/components/CommandPalette.astro`).
- **Project filter** — filters the grid by domain and writes the active filter to the URL query
  string. Ships `hidden` and is revealed by script, so a no-JS visitor sees every project
  rather than dead buttons. Chips are generated only for domains that have projects, so no
  filter can return an empty grid.

## Structure

- `/` — single page: home, about, experience, projects, resume
- `/projects/[slug]` — project detail, rendered from `src/content/projects/*.md`

Adding a project is a new markdown file in `src/content/projects/`. No page code changes. Set
`github` only when the repo is actually public; the field is optional so a private project
renders without a dead link.

Copy in `src/data/profile.ts` and the project markdown should match the resume and transcript.
Nothing goes on the site that can't be checked against one of those.

## Development

```sh
npm install
npm run dev       # localhost:4321
npm run build     # outputs to ./dist
npm run preview   # preview the production build locally
```
