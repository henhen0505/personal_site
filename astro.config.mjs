// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // site: left unset until Henry picks a real domain — see BaseLayout.astro,
  // canonical/og:url tags are skipped entirely while this is unset.
});
