import type { CollectionEntry } from 'astro:content';

export function slugify(term: string): string {
  return term
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function humanize(slug: string): string {
  return slug.replace(/-/g, ' ');
}

// collects the unique set of terms (e.g. series or tags) used across a
// collection's entries, as { slug, term } pairs, sorted alphabetically
export function getUniqueTerms<T extends CollectionEntry<'works'> | CollectionEntry<'posts'>>(
  entries: T[],
  getTerms: (entry: T) => string[],
): { slug: string; term: string }[] {
  const bySlug = new Map<string, string>();
  for (const entry of entries) {
    for (const term of getTerms(entry)) {
      bySlug.set(slugify(term), term);
    }
  }
  return [...bySlug.entries()]
    .map(([slug, term]) => ({ slug, term }))
    .sort((a, b) => a.term.localeCompare(b.term));
}
