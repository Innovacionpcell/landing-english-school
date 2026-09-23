// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://englishschool.growthdigital.marketing';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  // 100% estático: HTML pre-renderizado. El formulario habla directo con n8n.
  output: 'static',
  build: { inlineStylesheets: 'always', format: 'directory' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  image: { responsiveStyles: true },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/gracias/'),
    }),
  ],
  env: {
    schema: {
      // Webhook de n8n del flujo PROPIO de English School (formulario → correo → CRM)
      PUBLIC_N8N_WEBHOOK_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      // Google Tag Manager (opcional, carga diferida)
      PUBLIC_GTM_ID: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
});
