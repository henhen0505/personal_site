import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    // Only set this when the repo is actually public. A 404 on a portfolio
    // link is worse than no link.
    github: z.string().url().optional(),
    status: z.string(),
    period: z.string(),
    // Drives the filter bar on the projects grid. Keep the vocabulary small and
    // reuse existing values, since every new value adds a button.
    domains: z.array(z.enum(['Web', 'Backend', 'AI/LLM', 'Data', 'Quant'])).nonempty(),
    // Lower sorts first. Controls the order of the projects grid.
    order: z.number(),
  }),
});

export const collections = { projects };
