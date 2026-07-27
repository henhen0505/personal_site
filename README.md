# henryyu.dev

Personal portfolio site. Built with [Astro](https://astro.build), no client-side framework.

## Stack

- Astro 7 (static output)
- Vanilla CSS, no UI framework
- Content collections for project write-ups (`src/content/projects/`)
- Two small inline scripts: theme toggle (dark/light, persisted to `localStorage`) and mobile nav

No backend, no database, no CMS, no analytics.

## Pages

- `/` — home
- `/about` — bio
- `/projects` — project grid
- `/projects/[slug]` — project detail, rendered from `src/content/projects/*.md`
- `/resume` — resume + PDF download

Adding a project is a new markdown file in `src/content/projects/`, no new page code required.

## Development

```sh
npm install
npm run dev       # localhost:4321
npm run build     # outputs to ./dist
npm run preview   # preview the production build locally
```
