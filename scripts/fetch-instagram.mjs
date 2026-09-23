// Descarga tus últimos 6 posts de Instagram en build y guarda las imágenes localmente
// (las URLs del CDN de IG caducan). Requiere INSTAGRAM_ACCESS_TOKEN (Instagram API with Instagram Login,
// cuenta profesional). Sin token → la sección muestra el bloque de marca personal.
import { writeFile, mkdir, readdir, unlink } from 'node:fs/promises';
try { process.loadEnvFile?.('.env'); } catch {}

const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const DIR = new URL('../src/assets/instagram/', import.meta.url);
const OUT = new URL('../src/data/instagram.json', import.meta.url);

if (!TOKEN) {
  console.log('[instagram] Sin INSTAGRAM_ACCESS_TOKEN → sección en modo marca personal');
  process.exit(0);
}

try {
  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
  const res = await fetch(`https://graph.instagram.com/me/media?fields=${fields}&limit=12&access_token=${TOKEN}`);
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const { data = [] } = await res.json();
  await mkdir(DIR, { recursive: true });
  for (const f of await readdir(DIR)) if (f.endsWith('.jpg')) await unlink(new URL(f, DIR));
  const posts = [];
  for (const m of data) {
    const src = m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url;
    if (!src) continue;
    const img = await fetch(src);
    if (!img.ok) continue;
    const file = `${m.id}.jpg`;
    await writeFile(new URL(file, DIR), Buffer.from(await img.arrayBuffer()));
    posts.push({ id: m.id, file, permalink: m.permalink, caption: (m.caption ?? '').slice(0, 140), type: m.media_type, date: m.timestamp });
    if (posts.length === 6) break;
  }
  await writeFile(OUT, JSON.stringify({ updatedAt: new Date().toISOString(), posts }, null, 2));
  console.log(`[instagram] OK ${posts.length} posts`);
  // Renueva el token de larga duración (60 días) en cada build
  await fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${TOKEN}`).catch(() => {});
} catch (e) {
  console.warn('[instagram] Falló, conservo lo existente:', e.message);
}
