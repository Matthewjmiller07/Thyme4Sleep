// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  // includeFiles bundles the paid Reset to Rest PDF (private/, never public/) into the server function
  adapter: netlify({ includeFiles: ['./private/**/*'] }),
  integrations: [react()],
  redirects: {
    '/packages': '/pricing',
    '/packages/': '/pricing',
    '/packaging': '/pricing',
    '/packaging/': '/pricing',
  },
});