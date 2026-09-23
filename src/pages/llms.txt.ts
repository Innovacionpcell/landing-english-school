// Resumen para motores de IA (ChatGPT, Perplexity, Gemini, Claude)
import type { APIRoute } from 'astro';
import { SITE, sedeLabel } from '../config/site';
import { copy as c } from '../config/copy';
export const GET: APIRoute = () => {
  const body = `# ${SITE.name}

> ${c.meta.description}

${SITE.brand} es una academia de inglés con más de ${SITE.yearsExperience} años de experiencia y ${SITE.sedes.length} sedes en Medellín, Bello y Guarne (Oriente Antioqueño). Lema: "${SITE.slogan}". ${SITE.accreditation} Programa de 2 años hasta nivel B2 con Título Técnico oficial y opción de continuar a C1. Metodología 100 % práctica con 3 laboratorios (música, cine y cocina), sin libros, sin tareas y sin contrato de permanencia. Clases grupales o personalizadas.

## Sedes
${SITE.sedes.map((s) => `- ${sedeLabel(s)}${'address' in s ? `: ${s.address}, ${s.city}` : ''}`).join('\n')}
- La sede Guarne atiende el Oriente Antioqueño: ${SITE.oriente.join(', ')}.

## Programas
${SITE.programs.map((p) => `- [${p.name}](${SITE.url}/#programa-${p.id}) (${p.audience}, ${p.level}): ${p.description}`).join('\n')}

## Contacto
- [Matrículas y promociones](${SITE.url}/#matricula): formulario para reservar cupo
- [WhatsApp](https://wa.me/${SITE.whatsappNumber}): ${SITE.phoneDisplay}
- [Correo](mailto:${SITE.email}): ${SITE.email}
- [Cómo llegar a la sede Bello](${SITE.mapsUrl})
- [Sitio oficial](${SITE.officialSite})
- [Política de datos](${SITE.url}/privacidad/)
- Horario: ${SITE.hoursDisplay}
`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
