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

// tag reserved for works that should appear on the homepage — excluded
// from series filter chips and from /works/series/<slug> page generation
export const HOMEPAGE_TAG = 'selected';

// collects the unique set of terms (e.g. series or tags) used across a
// collection's entries, as { slug, term } pairs, sorted alphabetically
// (T constrained to 'works' for now; add 'posts' back to the union if the
// blog collection is reintroduced)
export function getUniqueTerms<T extends CollectionEntry<'works'>>(
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
