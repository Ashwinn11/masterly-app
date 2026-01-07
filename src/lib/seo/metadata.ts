import type { Metadata } from 'next';

interface MetadataProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

/**
 * Generate page metadata following Next.js 15 best practices
 *
 * Best practices followed:
 * - Absolute URLs for canonical and OG tags
 * - Proper OG image dimensions (1200x630)
 * - Twitter card optimization
 * - Robot directives for crawl control
 * - Full URL paths for images
 */
export function generatePageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = '/icon.png',
  noIndex = false,
}: MetadataProps): Metadata {
  const baseUrl = 'https://masterlyapp.in';
  const url = `${baseUrl}${path}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Masterly AI',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

