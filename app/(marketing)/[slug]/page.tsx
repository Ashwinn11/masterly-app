import { notFound } from 'next/navigation';
import { seoPages } from '@/lib/seo/content';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { SEOTemplate } from '@/components/seo';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return seoPages.map((page) => ({
    slug: page.slug,
  }));
}

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

export default async function SEOPage({ params }: Props) {
  const { slug } = await params;
  const page = seoPages.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  return <SEOTemplate data={page} />;
}
