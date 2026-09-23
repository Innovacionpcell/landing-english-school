// Descarga rating, total y reseñas de tu Perfil de Negocio (Places API New) en build.
// Resultado estático = 0 JS de terceros = Core Web Vitals intactos.
// Requiere GOOGLE_PLACES_API_KEY y GOOGLE_PLACE_ID. Si faltan o falla, conserva el JSON actual.
import { readFile, writeFile } from 'node:fs/promises';
try { process.loadEnvFile?.('.env'); } catch {}

const OUT = new URL('../src/data/reviews.json', import.meta.url);
const { GOOGLE_PLACES_API_KEY: KEY, GOOGLE_PLACE_ID: PLACE } = process.env;

if (!KEY || !PLACE) {
  console.log('[reviews] Sin GOOGLE_PLACES_API_KEY/GOOGLE_PLACE_ID → uso src/data/reviews.json existente');
  process.exit(0);
}

async function fetchLang(lang) {
  const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE}?languageCode=${lang}`, {
    headers: {
      'X-Goog-Api-Key': KEY,
      'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri,displayName',
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

try {
  const current = JSON.parse(await readFile(OUT, 'utf8'));
  const data = await fetchLang('es');
  const reviews = (data.reviews ?? [])
    .filter((r) => r.rating >= 4 && (r.originalText?.text || r.text?.text))
    .map((r) => ({
      author: r.authorAttribution?.displayName ?? 'Cliente de Google',
      photo: r.authorAttribution?.photoUri ?? null,
      authorUrl: r.authorAttribution?.uri ?? null,
      rating: r.rating,
      text: (r.originalText?.text ?? r.text?.text).trim(),
      lang: r.originalText?.languageCode ?? 'es',
      relativeTime: r.relativePublishTimeDescription ?? '',
      date: r.publishTime ?? null,
    }));
  // Conserva reseñas manuales previas si la API trae pocas (la API devuelve máx. 5)
  const merged = [...reviews];
  for (const r of current.reviews ?? []) if (!merged.some((m) => m.author === r.author)) merged.push(r);
  const out = {
    rating: data.rating ?? current.rating,
    total: data.userRatingCount ?? current.total,
    mapsUri: data.googleMapsUri ?? current.mapsUri,
    updatedAt: new Date().toISOString(),
    reviews: merged.slice(0, 9),
  };
  await writeFile(OUT, JSON.stringify(out, null, 2));
  console.log(`[reviews] OK ${out.rating}★ · ${out.total} reseñas · ${out.reviews.length} mostradas`);
} catch (e) {
  console.warn('[reviews] Falló la API, conservo el JSON actual:', e.message);
}
