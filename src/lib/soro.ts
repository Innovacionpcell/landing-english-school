/**
 * Artículos del blog de Soro IA, leídos EN BUILD desde el mismo script del embed
 * (Soro incrusta `var SORO_ARTICLES = [...]` con título, slug, extracto, imagen y fecha).
 * Así el home muestra los últimos artículos como HTML estático (SEO, cero JS) y,
 * si Soro no responde durante el build, el sitio se construye igual sin ellos.
 */
import { SITE } from '../config/site';

export interface SoroArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  date: string;     // texto ya formateado por Soro
  isoDate: string;  // ISO 8601
  url: string;      // /blog/?post=<slug>
}

let cache: Promise<SoroArticle[]> | null = null;

export function getSoroArticles(): Promise<SoroArticle[]> {
  if (!cache) cache = load();
  return cache;
}

async function load(): Promise<SoroArticle[]> {
  const src = (SITE as { soroEmbed?: string }).soroEmbed;
  if (!src) return [];
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(src, { signal: ctrl.signal, headers: { 'user-agent': 'Mozilla/5.0 (growthdigital.marketing build)', referer: `${SITE.url}/blog/` } });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const js = await res.text();
    const m = js.match(/var\s+SORO_ARTICLES\s*=\s*(\[[\s\S]*?\]);\s*\n/);
    if (!m) return [];
    const raw = JSON.parse(m[1]) as Array<Record<string, unknown>>;
    const list = raw
      .filter((a) => a && typeof a.slug === 'string' && typeof a.title === 'string')
      .map((a) => ({
        id: String(a.id ?? a.slug),
        slug: String(a.slug),
        title: String(a.title),
        excerpt: String(a.excerpt ?? ''),
        image: typeof a.image === 'string' && /^https?:\/\//.test(a.image) ? a.image : undefined,
        date: String(a.date ?? ''),
        isoDate: String(a.isoDate ?? ''),
        url: `/blog/?post=${encodeURIComponent(String(a.slug))}`,
      }))
      .sort((a, b) => (b.isoDate > a.isoDate ? 1 : b.isoDate < a.isoDate ? -1 : 0));
    console.log(`[soro] ${list.length} artículo(s) leídos del embed`);
    return list;
  } catch (e) {
    console.warn('[soro] No se pudieron leer los artículos del embed:', (e as Error).message);
    return [];
  }
}
