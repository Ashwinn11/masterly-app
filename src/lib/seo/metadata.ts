import type { Metadata } from 'next';

interface MetadataProps {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    image?: string;
    noIndex?: boolean;
}

export function generatePageMetadata({
    title,
    description,
    path,
    keywords = [],
    image = '/icon.png',
    noIndex = false,
}: MetadataProps): Metadata {
    const url = `https://masterlyapp.in${path}`;

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
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
        },
    };
}
