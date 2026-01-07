import { MetadataRoute } from 'next'
import { seoPages } from '@/lib/seo/content'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://masterlyapp.in'
    const currentDate = new Date()

    const staticPages: MetadataRoute.Sitemap = [
        // Homepage - Highest priority
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        // Authentication pages
        {
            url: `${baseUrl}/login`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        // Help and support - Public page
        {
            url: `${baseUrl}/help`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        // Legal pages - Public pages
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.4,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.4,
        },
    ]

    const programmaticPages: MetadataRoute.Sitemap = seoPages.map((page) => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
    }))

    return [...staticPages, ...programmaticPages]
}
