// Resumen para motores de IA (ChatGPT, Perplexity, Gemini, Claude) → visibilidad en búsquedas con IA
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config/site';
import { t } from '../i18n/copy';
export const GET: APIRoute = async () => {
  const c = t('es');
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const body = `# ${SITE.name}

> ${c.meta.description}

Agencia de marketing digital integral con sede en Medellín, Colombia (${SITE.address.street}). Fundada por ${SITE.founder.name} (${SITE.founder.jobTitle}, con ${SITE.founder.certificate.name} – ${SITE.founder.certificate.issuer}). Atiende clientes en Colombia, Estados Unidos, España, Suiza y Latinoamérica en español e inglés, de forma remota. No vende paquetes: diseña soluciones por nicho a partir de un diagnóstico, usando tecnología propia (CRM, portal de clientes, analítica con IA, programación de redes y automatizaciones n8n).

## Soluciones
${c.solutions.items.map((s) => `- ${s.t}: ${s.d}`).join('\n')}

## Contacto
- Web: ${SITE.url}/
- Agenda de diagnóstico: ${SITE.url}/#agenda
- Portal de clientes: ${SITE.portalUrl}
- Perfil de Negocio en Google (4.9★): ${SITE.mapsUrl}
- Teléfono / WhatsApp: ${SITE.phone}
- Correo: ${SITE.email}
${SITE.social.map((s) => `- ${s.label}: ${s.url}`).join('\n')}

## Blog
${posts.map((p) => `- [${p.data.title}](${SITE.url}/blog/${p.id}/): ${p.data.description}`).join('\n')}
`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
