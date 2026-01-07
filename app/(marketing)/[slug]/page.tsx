import { notFound } from 'next/navigation';
import { seoPages } from '@/lib/seo/content';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { SEOTemplate } from '@/components/seo';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params at build time
export async function generateStaticParams() {
  return seoPages.map((page) => ({
    slug: page.slug,
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = seoPages.find((p) => p.slug === slug);

  if (!page) {
    return {};
  }

  return generatePageMetadata({
    title: `${page.title} | Masterly AI`,
    description: page.heroSubtitle,
    path: `/${page.slug}`,
    keywords: page.keywords,
  });
}

// ISR: Revalidate pages every hour (content doesn't change frequently)
// This balances freshness with build performance
export const revalidate = 3600; // 1 hour in seconds

export default async function SEOPage({ params }: Props) {
  const { slug } = await params;
  const page = seoPages.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  return <SEOTemplate data={page} />;
}
