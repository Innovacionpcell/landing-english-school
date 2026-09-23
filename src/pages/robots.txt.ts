import type { APIRoute } from 'astro';

// Buscadores clásicos + rastreadores de IA (ChatGPT, Claude, Perplexity, Gemini, Bing/Copilot, Apple).
// Los permitimos explícitamente: queremos aparecer en respuestas de IA, no solo en Google.
const AI_BOTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',            // OpenAI (entrenamiento, búsqueda, navegación)
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai', // Anthropic
  'PerplexityBot', 'Perplexity-User',                    // Perplexity
  'Google-Extended', 'Googlebot', 'Googlebot-Image',     // Google + Gemini
  'Bingbot', 'msnbot',                                   // Bing / Copilot
  'Applebot', 'Applebot-Extended',                       // Apple Intelligence / Siri
  'DuckAssistBot', 'Amazonbot', 'meta-externalagent', 'CCBot', 'Bytespider',
];

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site);
  const llms = new URL('llms.txt', site);
  const body = [
    '# growthdigital.marketing — indexación abierta para buscadores y asistentes de IA',
    `# Resumen legible por máquinas: ${llms}`,
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /gracias/',
    'Disallow: /en/thanks/',
    '',
    ...AI_BOTS.flatMap((ua) => [`User-agent: ${ua}`, 'Allow: /', '']),
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
};
