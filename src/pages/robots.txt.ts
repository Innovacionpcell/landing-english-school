import type { APIRoute } from 'astro';
import { SITE } from '../config/site';

// Buscadores + rastreadores de IA permitidos explícitamente (visibilidad en respuestas de IA).
// Mientras SITE.indexable = false, cada página lleva <meta robots noindex>: el rastreo sigue
// permitido para que Google VEA el noindex (bloquear aquí dejaría URLs indexadas sin contenido).
const AI_BOTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Googlebot',
  'Bingbot', 'Applebot', 'Applebot-Extended',
];

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site);
  const body = [
    `# ${SITE.url.replace('https://', '')}${SITE.indexable ? '' : ' — en revisión (noindex)'}`,
    `# Resumen para IA: ${new URL('llms.txt', site)}`,
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /gracias/',
    '',
    ...AI_BOTS.flatMap((ua) => [`User-agent: ${ua}`, 'Allow: /', 'Disallow: /gracias/', '']),
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
