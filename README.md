# English School Medellín — Landing

Landing estática de **englishschool.growthdigital.marketing** (Astro 7). Base: `growth-landing-web`, sin blog/Soro, portal, agenda, reseñas ni Instagram.

| | |
| --- | --- |
| Framework | Astro 7, `output: 'static'`, 0 JS de terceros (GTM opcional y diferido) |
| Marca | Navy `#2F3185` · rojo decorativo `#E22623` · rojo CTA `#B81F1C` · amarillo `#EDE549` (un acento sobre navy) · fondo `#F7F8FC` · texto `#1C1E4A` |
| Tipos | Source Serif 4 (títulos, 600–700) + Public Sans (texto, 400–700), self-hosted, subset latin, `font-display: optional` + fallbacks métricos |
| SEO | JSON-LD `EducationalOrganization`+`LocalBusiness` (NAP = ficha de Google), `Course` por programa, `FAQPage`, `WebSite`/`WebPage`; areaServed Medellín, Valle de Aburrá y Oriente Antioqueño; sitemap, `llms.txt`, robots con bots de IA |
| Indexación | **`noindex` global** mientras `SITE.indexable = false` en `src/config/site.ts` |
| Leads | Formulario → `PUBLIC_N8N_WEBHOOK_URL` (flujo n8n propio) → `/gracias/`. Sin webhook, el lead sale por WhatsApp prellenado |
| WhatsApp | Botón flotante + CTAs leen `SITE.whatsappNumber` |
| Deploy | Hostinger Web App (Node.js) conectada a GitHub, despliegue automático desde `main` |

## Dónde se cambia cada cosa

- **Datos del cliente (NAP, WhatsApp, horario, programas, redes, cobertura):** `src/config/site.ts` — los `TODO` son placeholders.
- **Textos:** `src/config/copy.ts`.
- **Logo:** hoy la marca es texto (`src/components/Brand.astro`) y los íconos/`logo-english-school.png` son un monograma "ES" provisional. Reemplazar con el logo real.
- **Publicar en Google:** cuando el cliente apruebe → `indexable: true`, commit, push y enviar sitemap en Search Console.

## Desarrollo (PowerShell)

```powershell
cd C:\Proyectos\Landing-english-school
npm install
Copy-Item .env.example .env
npm run dev        # http://localhost:4321
npm run build      # genera dist/
```
