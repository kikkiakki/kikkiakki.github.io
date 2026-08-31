import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number(),
      image: image(),
      // tag a piece with one or more series to have it appear on the
      // matching /works/series/<slug> page
      series: z.array(z.string()).default([]),
      medium: z.string().optional(),
    }),
});

// TODO: different types of collections can be added
// const posts = defineCollection({
//   loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
//   schema: z.object({
//     title: z.string(),
//     date: z.date(),
//     // tag a post to have it appear on the matching /blog/tag/<slug> page
//     tags: z.array(z.string()).default([]),
//     description: z.string().optional(),
//     draft: z.boolean().default(false),
//   }),
// });

export const collections = { works };
