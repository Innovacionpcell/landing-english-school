// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://growthdigital.marketing';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  // 100% estático: HTML pre-renderizado, sin servidor Node. El formulario habla directo con n8n.
  output: 'static',
  build: { inlineStylesheets: 'always', format: 'directory' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  image: { responsiveStyles: true, remotePatterns: [{ protocol: 'https' }] },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/gracias/') && !page.includes('/en/thanks/'),
      i18n: { defaultLocale: 'es', locales: { es: 'es-CO', en: 'en-US' } },
    }),
  ],
  // URLs antiguas de WordPress con tráfico en Search Console (sept 2026) → destino equivalente
  redirects: {
    '/contacto': '/#agenda',
    '/consultoria-gratis': '/#agenda',
    '/proyectos': '/#soluciones',
    '/servicios-posicionamiento-web-en-google': '/#soluciones',
    '/portal-clientes': 'https://portal.growthdigital.marketing/',
    '/glob-2': '/blog/',
    '/category/seo': '/blog/',
    '/seo': '/blog/',
    '/seo/el-nuevo-seo-en-2025-como-dominar-google-sin-morir-en-el-intento': '/blog/',
  },
  env: {
    schema: {
      // Webhook de n8n que recibe el formulario (valida → CRM → correo → responde)
      PUBLIC_N8N_WEBHOOK_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      // Página de reservas de Google Calendar (Agenda de citas) que se embebe en /gracias
      PUBLIC_BOOKING_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      // Google Tag Manager (opcional, carga diferida)
      PUBLIC_GTM_ID: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
});
