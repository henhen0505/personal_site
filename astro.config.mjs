// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // Set to the current Vercel URL so canonical and og:url resolve and link
  // previews work when the site is pasted into email or Slack. Change this
  // when a custom domain is attached.
  site: 'https://personal-site-xi-kohl.vercel.app',
});
