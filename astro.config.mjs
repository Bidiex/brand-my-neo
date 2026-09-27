// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages: https://bidiex.github.io/brand-my-neo/
export default defineConfig({
  site: 'https://bidiex.github.io',
  base: '/brand-my-neo',
  trailingSlash: 'ignore',
  // Español en la raíz (/), inglés en /en/
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false },
  },
});
