# Growth Digital — Landing web

Landing estática de **growthdigital.marketing** construida con **Astro 7**. Cero JavaScript de terceros, imágenes optimizadas en build, datos estructurados completos y formulario que entrega el lead a **n8n → CRM + correo → Google Calendar**.

| Stack | Detalle |
| --- | --- |
| Framework | Astro 7 (`output: 'static'`), islas React listas si las necesitas |
| Estilos | CSS propio con tokens (paleta Google: `#1a73e8` `#ea4335` `#fbbc04` `#34a853`), Montserrat + Roboto self-hosted |
| SEO | JSON-LD `ProfessionalService` + `Person` + `Service` + `FAQPage` + `BreadcrumbList`, hreflang es-CO / en-US, sitemap, RSS, `llms.txt`, 301 desde WordPress |
| Datos | Reseñas de Google (Places API New) e Instagram descargados en **build** → HTML estático |
| Leads | Formulario → webhook n8n → CRM (`dashboard-real`) + Gmail → página `/gracias/` con **Agenda de citas de Google Calendar** embebida |
| Deploy | Hostinger Web Apps compila desde `main` en cada push (preajuste Astro, Node 22) |

---

## 1. Puesta en marcha (PowerShell)

```powershell
# 1. Carpeta del proyecto
cd C:\Proyectos            # o la ruta que uses
git clone https://github.com/Innovacionpcell/growth-landing-web.git Growth-landing-web
cd Growth-landing-web

# (si ya descomprimiste el ZIP dentro de Growth-landing-web, en su lugar:)
# git init; git remote add origin https://github.com/Innovacionpcell/growth-landing-web.git

# 2. Node 22+  (node -v)  →  dependencias
npm install

# 3. Variables locales
Copy-Item .env.example .env
notepad .env               # pega PUBLIC_N8N_WEBHOOK_URL, PUBLIC_BOOKING_URL, etc.

# 4. Desarrollo
npm run dev                # http://localhost:4321

# 5. Build local (con reseñas/Instagram si hay keys) y vista previa
npm run build
npm run preview

# 6. Subir a GitHub → Hostinger compila y publica solo
git add -A
git commit -m "feat: landing Growth Digital"
git branch -M main
git push -u origin main
```

`npm run build:offline` construye sin llamar a las APIs (usa los JSON guardados en `src/data/`).

---

## 2. Deploy en Hostinger (Web Apps · compila desde GitHub)

Hostinger está conectado al repo y **construye Astro por su cuenta** en cada push a `main`:

- hPanel → Sitios web → growthdigital.marketing → **Despliegues**: preajuste *Astro*, rama `main`, Node 22.x, directorio raíz `./`, compilación por defecto (`npm run build` → `dist/`).
- **Variables de entorno** (hPanel → Variables de entorno): `PUBLIC_N8N_WEBHOOK_URL`, `PUBLIC_BOOKING_URL`, `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` y, opcionales, `PUBLIC_GTM_ID`, `INSTAGRAM_ACCESS_TOKEN`. Tras cambiarlas, pulsa **Redistribuir**.
- Ciclo de trabajo: editar → `git add -A; git commit -m "..."; git push` → 1–2 min → sitio actualizado.
- Para refrescar reseñas/Instagram sin cambiar código: **Redistribuir** en hPanel (vuelve a ejecutar `npm run build`).

> `public/.htaccess` solo aplica si algún día sirves `dist/` desde un hosting Apache/LiteSpeed clásico; en Web Apps la caché y compresión las gestiona la plataforma.

## 3. Formulario → n8n → CRM + correo + Calendar

**Flujo:** el visitante llena el formulario → `POST` JSON al webhook de n8n → n8n valida (honeypot, tiempo mínimo, formato), envía al **CRM** por webhook con llave, te manda **correo por Gmail**, responde `{ ok, next }` → el sitio redirige a `/gracias/?s=agenda`, donde está embebida tu **Agenda de citas de Google Calendar** (el cliente elige hora, Google envía la invitación y el Meet).

### 1) Crear la fuente en tu CRM (dashboard-real)
CRM → **Fuentes / Forms → Nueva fuente**: nombre `Landing growthdigital.marketing`, proveedor `Formulario`. Copia el **token**: la URL del webhook es
`https://portal.growthdigital.marketing/api/crm/webhook/<token>`. (Requiere dashboard-real ≥ v31.10.31, que entiende `servicioInteres`, `leadCalificado`, `etapa` y datos de cita.)

### 2) Importar en n8n
1. `n8n → Workflows → Import from file` → `n8n/lead-to-crm-calendar.json`.
2. **Settings → Variables**: `GD_CRM_WEBHOOK_URL` = la URL con token del paso 1.
3. Nodo **Aviso a mi correo (Gmail)** → selecciona tu credencial Gmail OAuth2.
4. Nodo **Webhook formulario** → Options → *Allowed Origins (CORS)* ya trae `https://growthdigital.marketing`. Activa el workflow y copia la **Production URL** → variable `PUBLIC_N8N_WEBHOOK_URL` en Hostinger → Redistribuir.
5. Importa también `n8n/cita-agendada-a-crm.json` (trigger de Google Calendar sobre el calendario "Citas Growth Digital"): cuando alguien reserva, te avisa y mueve el lead a la etapa **Cita agendada** con la reunión como actividad.

### Payload que recibe el CRM (`POST` JSON plano)
```json
{ "nombre": "…", "email": "…", "telefono": "…", "empresa": "…", "ubicacion": "Medellín, Colombia",
  "servicioInteres": "Google/Meta Ads | Diseño Web SEO/SEM | Automatización con IA | Marketing Integral | Pregunta general",
  "leadCalificado": true, "mensaje": "…", "form": "Formulario landing", "landing_page": "/",
  "utm_source": "…", "utm_medium": "…", "utm_campaign": "…", "gclid": "…", "fbclid": "…", "idioma": "es" }
```
Para la cita se añaden `etapa: "Cita agendada"`, `citaInicio`, `citaFin`, `citaMeet`, `citaLink`. Respuestas: `201` creado · `200 updated:true` cita registrada · `409` duplicado (mismo correo/teléfono en un lead ya existente; no es error).

### Agenda de citas de Google Calendar
Sirve una agenda ya existente (Google Calendar → barra lateral → **Páginas de reservas** → clic → lápiz) o una nueva (**Crear → Agenda de citas**). Ajustes recomendados: 30 min · disponibilidad L–V 9–12 / 14–17 en **zona horaria America/Bogotá** (los invitados del extranjero ven las horas convertidas a la suya) · **aviso mínimo 24 h** (evita reservas para el mismo día) · máximo 30 días de anticipación · margen 15 min · Google Meet · formulario con Teléfono/WhatsApp, Empresa, Ciudad y país, servicio. **Compartir → Página de reservas** → esa URL va en `PUBLIC_BOOKING_URL`.

En `n8n/cita-agendada-a-crm.json` el trigger escucha el calendario donde la agenda guarda las reservas (puede ser el principal); el nodo Code deja pasar solo reservas (invitado externo + `PALABRA_CLAVE` del título). Ajusta `PALABRA_CLAVE` al título de tu agenda.

Sin `PUBLIC_N8N_WEBHOOK_URL`, el formulario abre WhatsApp con el mensaje prellenado (no se pierde ningún lead mientras configuras n8n).

---

## 4. Reseñas de Google (Places API New)

1. [Google Cloud Console](https://console.cloud.google.com/) → tu proyecto → **APIs y servicios → Biblioteca → “Places API (New)” → Habilitar**.
2. **Credenciales → Crear credencial → Clave de API** → *Restringir clave* → API: Places API (New).
3. Place ID: <https://developers.google.com/maps/documentation/places/web-service/place-id> (busca “Growth Digital Medellín”). Formato `ChIJ…`.
4. Secrets `GOOGLE_PLACES_API_KEY` y `GOOGLE_PLACE_ID`. `npm run build` descarga rating, total y hasta 5 reseñas → `src/data/reviews.json`.

Mientras no haya key, edita `src/data/reviews.json` a mano (pega tus mejores reseñas) — la sección ya muestra **4.9★ · 72 reseñas** y el botón a tu ficha.

## 5. Instagram

Sección con tus últimos 6 posts. Necesita **Instagram API with Instagram Login** (Meta for Developers → app → Instagram → token de larga duración de la cuenta profesional `@growthdigital24`) → secret `INSTAGRAM_ACCESS_TOKEN`. El script descarga las imágenes a `src/assets/instagram/` (las URLs del CDN caducan) y renueva el token en cada build. Sin token, la sección muestra el bloque de marca personal con enlace al perfil.

## 6. Blog (y automatización con IA + n8n)

Los posts son Markdown en `src/content/blog/` con frontmatter:

```md
---
title: "Máx. 70 caracteres"
description: "Máx. 160 caracteres"
pubDate: 2026-09-21
category: "SEO local"
tags: ["Medellín", "Google Maps"]
cover: "./imagen.jpg"      # opcional, junto al .md
coverAlt: "Descripción de la imagen"
aiAssisted: true            # muestra la nota de transparencia
---
```

### Soro IA → blog (automático)
Soro escribe el artículo y lo envía por **webhook** a n8n; n8n lo convierte a Markdown y hace commit en `src/content/blog/<slug>.md`; Hostinger reconstruye y el artículo queda como **página estática** (`/blog/<slug>/`, con schema BlogPosting, sitemap y RSS). No se usa el embed JS de Soro: renderiza en el navegador, no lo indexa igual Google y baja el 100/100 de rendimiento.

1. n8n → Import `n8n/soro-a-blog.json` → nodo **Normalizar artículo** → cambia `TOKEN`. Nodos GitHub → credencial *GitHub API* (token personal con permiso `Contents: write` sobre `growth-landing-web`). Publish.
2. Soro → Integrations → **Webhook / Custom**: URL `https://automation.growthdigital.marketing/webhook/soro-blog`, cabecera `x-webhook-token: <TOKEN>` (o `?token=<TOKEN>` en la URL si no permite cabeceras).
3. El artículo llega como `featured: false`; para mostrarlo en el home edita el `.md` y pon `featured: true` (máx. 6 destacados; si hay menos de 3 se completan con los más recientes).

Listado del blog: cuadrícula 3 columnas × 6 filas (18 por página) → `/blog/`, `/blog/pagina/2/`, … Portadas: local (`./foto.jpg`, optimizada) o URL https (se usa tal cual; no rompe el build si el CDN falla).

**Automatizar con n8n (otra IA):** genera el artículo con Claude/OpenAI → nodo **GitHub → Create file** en `src/content/blog/<slug>.md` (rama `main`) → el push dispara el deploy. Idempotencia: usa el slug como nombre de archivo. Para migrar los posts actuales de WordPress: exporta con la REST API (`/wp-json/wp/v2/posts`) y conviértelos a Markdown (`npx wp2md` o un nodo Code) — luego agrega sus URLs antiguas a `redirects` en `astro.config.mjs` y a `public/.htaccess`.

## 7. Estructura

```
src/
  config/site.ts        ← NAP, redes, horario, geo (única fuente de verdad del schema y el footer)
  i18n/copy.ts          ← TODOS los textos ES/EN
  lib/schema.ts         ← JSON-LD
  layouts/Base.astro    ← <head>, meta, OG, hreflang, GTM diferido
  components/sections/  ← Hero, Approach, Solutions, Method, Tech, Reviews, About, Instagram, BlogTeaser, Faq, Contact
  content/blog/         ← posts Markdown
  data/reviews.json · instagram.json
  pages/ index · en/ · blog/ · gracias · privacidad · 404 · rss.xml · robots.txt · llms.txt
n8n/                    ← workflows importables
public/.htaccess        ← HTTPS, 301, caché, cabeceras de seguridad
```

### Pendientes tuyos (marcados `TODO` en `src/config/site.ts`)
- Coordenadas exactas del pin de tu ficha (`geo`).
- URL corta “Compartir” de la ficha (`mapsUrl`) y enlace directo a escribir reseña (`reviewUrl`).
- Confirmar horario de atención.
