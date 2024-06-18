import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

export default defineConfig({
  integrations: [
    react()
  ],
  output: 'server',
  adapter: netlify(),
  vite: {
    ssr: {
      noExternal: ['@radix-ui/*', '@phosphor-icons/*'],
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext'
      }
    }
  },
});
