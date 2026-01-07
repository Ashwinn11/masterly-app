import { SEOPageData } from './content';
import { seoPages } from './content';

/**
 * Internal Linking Algorithm
 *
 * Best practices:
 * - Fast keyword overlap scoring (O(n*m) complexity)
 * - Returns 3-5 most relevant pages
 * - Falls back to random selection if no matches
 * - Doesn't add build time overhead
 */

interface RelatedPage {
  slug: string;
  title: string;
  description: string;
  score: number;
}

/**
 * Calculate keyword overlap score between two pages
 * Returns a score between 0 and 1
 */
function calculateOverlapScore(
  currentKeywords: string[],
  otherKeywords: string[]
): number {
  if (!currentKeywords.length || !otherKeywords.length) return 0;

  // Normalize keywords (lowercase, remove special chars)
  const normalize = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();

  const currentWords = new Set(
    currentKeywords.flatMap((k) => normalize(k).split(/\s+/))
  );
  const otherWords = new Set(
    otherKeywords.flatMap((k) => normalize(k).split(/\s+/))
  );

  // Calculate Jaccard similarity (intersection / union)
  const intersection = new Set([...currentWords].filter((x) => otherWords.has(x)));
  const union = new Set([...currentWords, ...otherWords]);

  return union.size > 0 ? intersection.size / union.size : 0;
}

/**
 * Find related pages based on keyword overlap
 * Returns 3-5 most relevant pages
 */
export function findRelatedPages(
  currentPage: SEOPageData,
  maxResults: number = 5
): RelatedPage[] {
  const otherPages = seoPages.filter((p) => p.slug !== currentPage.slug);

  // Calculate scores for all other pages
  const scored = otherPages
    .map((page) => ({
      slug: page.slug,
      title: page.title,
      description: page.description,
      score: calculateOverlapScore(currentPage.keywords, page.keywords),
    }))
    .filter((page) => page.score > 0); // Only pages with keyword overlap

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Return top N pages
  const topMatches = scored.slice(0, maxResults);

  // Fallback: if no matches, return random pages (better than no internal links)
  if (topMatches.length === 0) {
    const fallbackCount = Math.min(maxResults, otherPages.length);
    const shuffled = [...otherPages].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, fallbackCount).map((page) => ({
      slug: page.slug,
      title: page.title,
      description: page.description,
      score: 0, // No actual keyword overlap
    }));
  }

  return topMatches;
}

/**
 * Generate internal link data for RelatedLinks component
 */
export function generateInternalLinks(currentSlug: string) {
  const currentPage = seoPages.find((p) => p.slug === currentSlug);

  if (!currentPage) {
    return [];
  }

  const relatedPages = findRelatedPages(currentPage, 5);

  return relatedPages.map((page) => ({
    href: `/${page.slug}`,
    label: page.title,
    description: page.description,
  }));
}

/**
 * Calculate hub-and-spoke structure for site architecture
 * Returns hub pages with their related spoke pages
 */
export function buildHubStructure() {
  const hubs = [
    {
      slug: 'medical-school-study-app',
      title: 'Medical School Study Hub',
      keywords: ['medical', 'usmle', 'anatomy', 'pharmacology', 'nclex'],
    },
    {
      slug: 'law-school-study-app',
      title: 'Law School Study Hub',
      keywords: ['law', 'bar', 'lsat', 'legal', 'case'],
    },
    {
      slug: 'exam-preparation-app',
      title: 'Exam Preparation Hub',
      keywords: ['exam', 'test', 'sat', 'act', 'gre', 'gmat'],
    },
    {
      slug: 'spaced-repetition',
      title: 'Learning Science Hub',
      keywords: ['spaced', 'repetition', 'memory', 'recall', 'fsrs'],
    },
    {
      slug: 'ai-flashcard-maker',
      title: 'AI Study Tools Hub',
      keywords: ['ai', 'flashcard', 'generator', 'pdf', 'automatic'],
    },
  ];

  return hubs.map((hub) => {
    const hubPage = seoPages.find((p) => p.slug === hub.slug);
    if (!hubPage) return null;

    const spokes = seoPages
      .filter((p) => {
        if (p.slug === hub.slug) return false;
        // Check if page keywords match hub keywords
        const pageKeywordsLower = p.keywords.join(' ').toLowerCase();
        return hub.keywords.some((keyword) =>
          pageKeywordsLower.includes(keyword)
        );
      })
      .slice(0, 10) // Max 10 spokes per hub
      .map((p) => p.slug);

    return {
      hubSlug: hub.slug,
      hubTitle: hub.title,
      spokes,
    };
  }).filter((hub): hub is NonNullable<typeof hub> => hub !== null);
}
