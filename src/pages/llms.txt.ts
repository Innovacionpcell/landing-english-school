// Resumen para motores de IA (ChatGPT, Perplexity, Gemini, Claude)
import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { copy as c } from '../config/copy';
export const GET: APIRoute = () => {
  const body = `# ${SITE.name}

> ${c.meta.description}

${SITE.gbpName} es una academia de inglés con sede en ${SITE.address.street}, ${SITE.address.neighborhood}, ${SITE.address.city} (Antioquia, Colombia). Ofrece clases presenciales en su sede y clases virtuales en vivo para Medellín, el Valle de Aburrá (${SITE.areaServed.valleDeAburra.join(', ')}) y el Oriente Antioqueño (${SITE.areaServed.oriente.join(', ')}). Niveles del MCER de A1 a C1. Prueba de nivel gratuita.

## Programas
${SITE.programs.map((p) => `- ${p.name} (${p.audience}, nivel ${p.level}, ${p.modes.map((m) => c.programs.modes[m].toLowerCase()).join(' y ')}): ${p.description}`).join('\n')}

## Contacto
- Web: ${SITE.url}/
- Prueba de nivel: ${SITE.url}/#prueba
- Teléfono / WhatsApp: ${SITE.phone}
- Horario: ${SITE.hoursDisplay}
- Google Maps: ${SITE.mapsUrl}
${SITE.email ? `- Correo: ${SITE.email}\n` : ''}`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
