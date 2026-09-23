import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog en Markdown: n8n + IA puede publicar creando un .md vía GitHub API
// (commit → deploy automático). Ver README > "Blog automatizado".
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      // Sin .max(): un artículo automático con título largo no debe romper el deploy (n8n ya recorta a 70/160)
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      lang: z.enum(['es', 'en']).default('es'),
      category: z.string().default('Marketing digital'),
      tags: z.array(z.string()).default([]),
      // Imagen local (./foto.jpg) o URL https (artículos publicados por n8n/Soro); Astro la optimiza en build
      cover: image().or(z.string().url()).optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
      aiAssisted: z.boolean().default(false),
      // Destacado en el home (sección Blog). Si no hay destacados se muestran los más recientes.
      featured: z.boolean().default(false),
      // Origen del artículo: 'manual' | 'soro' | 'n8n'
      source: z.string().default('manual'),
    }),
});

// Reservado para la futura Growth Academy (cursos/lecciones)
const academy = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/academy' }),
  schema: z.object({ title: z.string(), description: z.string(), order: z.number().default(0), draft: z.boolean().default(true) }),
});

export const collections = { blog, academy };
